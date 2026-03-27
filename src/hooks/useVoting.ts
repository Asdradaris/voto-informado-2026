import { useState, useEffect, useCallback } from "react";
import { supabase, isDemoMode } from "@/lib/supabase";
import { useFingerprint } from "./useFingerprint";
import type { VotingRound, CastVoteResponse } from "@/types";

const VOTE_STORAGE_KEY = "vi_vote";
const LOAD_TIME_KEY = "vi_load_time";

interface VotingHook {
  currentRound: VotingRound | null;
  hasVoted: boolean;
  votedFor: string | null;
  voteNumber: number | null;
  isLoading: boolean;
  error: string | null;
  castVote: (candidateId: string, honeypot: string) => Promise<CastVoteResponse>;
  roundStatus: "open" | "voted" | "closed" | "investigating";
}

function getSavedVote(round: number): { candidateId: string; voteNumber: number } | null {
  try {
    const saved = localStorage.getItem(`${VOTE_STORAGE_KEY}_r${round}`);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function saveVote(round: number, candidateId: string, voteNumber: number) {
  localStorage.setItem(
    `${VOTE_STORAGE_KEY}_r${round}`,
    JSON.stringify({ candidateId, voteNumber })
  );
}

export function useVoting(): VotingHook {
  const { fingerprint, isLoading: fpLoading } = useFingerprint();
  const [currentRound, setCurrentRound] = useState<VotingRound | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const [voteNumber, setVoteNumber] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Record page load time for anti-bot
  useEffect(() => {
    sessionStorage.setItem(LOAD_TIME_KEY, String(Date.now()));
  }, []);

  // Fetch active round
  useEffect(() => {
    async function fetchRound() {
      if (isDemoMode) {
        const demoRound: VotingRound = {
          id: 1,
          roundNumber: 1,
          startsAt: "2026-03-27T00:00:00-05:00",
          endsAt: "2026-04-03T23:59:59-05:00",
          isActive: true,
          winnerCandidateId: null,
          totalVotes: 0,
        };
        setCurrentRound(demoRound);
        const saved = getSavedVote(1);
        if (saved) {
          setHasVoted(true);
          setVotedFor(saved.candidateId);
          setVoteNumber(saved.voteNumber);
        }
        setIsLoading(false);
        return;
      }

      const { data, error: err } = await supabase
        .from("voting_rounds")
        .select("*")
        .eq("is_active", true)
        .single();

      if (err || !data) {
        // Try to get the most recent round
        const { data: lastRound } = await supabase
          .from("voting_rounds")
          .select("*")
          .order("round_number", { ascending: false })
          .limit(1)
          .single();

        if (lastRound) {
          setCurrentRound({
            id: lastRound.id,
            roundNumber: lastRound.round_number,
            startsAt: lastRound.starts_at,
            endsAt: lastRound.ends_at,
            isActive: lastRound.is_active,
            winnerCandidateId: lastRound.winner_candidate_id,
            totalVotes: lastRound.total_votes,
          });
        }
        setIsLoading(false);
        return;
      }

      const round: VotingRound = {
        id: data.id,
        roundNumber: data.round_number,
        startsAt: data.starts_at,
        endsAt: data.ends_at,
        isActive: data.is_active,
        winnerCandidateId: data.winner_candidate_id,
        totalVotes: data.total_votes,
      };
      setCurrentRound(round);

      // Check if already voted in this round
      const saved = getSavedVote(round.roundNumber);
      if (saved) {
        setHasVoted(true);
        setVotedFor(saved.candidateId);
        setVoteNumber(saved.voteNumber);
      }

      setIsLoading(false);
    }

    if (!fpLoading) fetchRound();
  }, [fpLoading]);

  const castVote = useCallback(
    async (candidateId: string, honeypot: string): Promise<CastVoteResponse> => {
      if (!fingerprint || !currentRound) {
        return { error: "closed", message: "No se puede votar en este momento" };
      }

      if (hasVoted) {
        return { error: "already_voted", message: "Ya votaste en esta ronda" };
      }

      setError(null);

      // Demo mode
      if (isDemoMode) {
        const num = Math.floor(Math.random() * 2000) + 500;
        setHasVoted(true);
        setVotedFor(candidateId);
        setVoteNumber(num);
        saveVote(currentRound.roundNumber, candidateId, num);
        return { ok: true, voteNumber: num };
      }

      const loadTime = Number(sessionStorage.getItem(LOAD_TIME_KEY) || "0");

      try {
        const { data, error: err } = await supabase.functions.invoke("cast-vote", {
          body: { candidateId, fingerprint, honeypot, loadTime },
        });

        if (err) {
          const msg = "Error al registrar tu voto. Intenta de nuevo.";
          setError(msg);
          return { error: "closed", message: msg };
        }

        if (data.error) {
          if (data.error === "already_voted") {
            setHasVoted(true);
            setVotedFor(candidateId);
          }
          setError(data.message);
          return data as CastVoteResponse;
        }

        setHasVoted(true);
        setVotedFor(candidateId);
        setVoteNumber(data.voteNumber);
        saveVote(currentRound.roundNumber, candidateId, data.voteNumber);

        return data as CastVoteResponse;
      } catch {
        const msg = "Error de conexión. Intenta de nuevo.";
        setError(msg);
        return { error: "closed", message: msg };
      }
    },
    [fingerprint, currentRound, hasVoted]
  );

  const roundStatus = (() => {
    if (!currentRound) return "closed" as const;
    if (hasVoted) return "voted" as const;
    if (!currentRound.isActive && currentRound.winnerCandidateId)
      return "investigating" as const;
    if (!currentRound.isActive) return "closed" as const;
    return "open" as const;
  })();

  return {
    currentRound,
    hasVoted,
    votedFor,
    voteNumber,
    isLoading: isLoading || fpLoading,
    error,
    castVote,
    roundStatus,
  };
}
