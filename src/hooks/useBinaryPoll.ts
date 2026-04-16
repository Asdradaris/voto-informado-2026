import { useEffect, useState, useCallback } from "react";
import { supabase, isDemoMode } from "@/lib/supabase";
import { useFingerprint } from "./useFingerprint";
import { POLL_CLOSE_DATE } from "@/config/finalists";
import type { BinaryPollState, BinaryVoteCount, CastVoteResponse } from "@/types";

const VOTED_KEY = "vi_voted_r2";
const VOTED_FOR_KEY = "vi_voted_for_r2";
const LOAD_TIME_KEY = "vi_load_time";

const FINALISTS: Pick<BinaryVoteCount, "candidateId" | "candidateName" | "partyName" | "partyColor" | "photo">[] = [
  {
    candidateId: "keiko-fujimori",
    candidateName: "Keiko Fujimori",
    partyName: "Fuerza Popular",
    partyColor: "#FF6B00",
    photo: "/candidates/fuerza_popular.webp",
  },
  {
    candidateId: "rafael-lopez-aliaga",
    candidateName: "Rafael López Aliaga",
    partyName: "Renovación Popular",
    partyColor: "#1E3A5F",
    photo: "/candidates/renovacion_popular.webp",
  },
];

function buildInitialCounts(): BinaryVoteCount[] {
  return FINALISTS.map((f) => ({ ...f, totalVotes: 0, percentage: 0 }));
}

function recalculate(counts: BinaryVoteCount[]): BinaryVoteCount[] {
  const total = counts.reduce((sum, c) => sum + c.totalVotes, 0);
  return counts.map((c) => ({
    ...c,
    percentage: total > 0 ? (c.totalVotes * 100) / total : 0,
  }));
}

function readVotedState(): { hasVoted: boolean; votedFor: string | null } {
  try {
    const hasVoted = localStorage.getItem(VOTED_KEY) === "1";
    const votedFor = localStorage.getItem(VOTED_FOR_KEY);
    return { hasVoted, votedFor };
  } catch {
    return { hasVoted: false, votedFor: null };
  }
}

export function useBinaryPoll(): BinaryPollState & {
  castVote: (candidateId: string) => Promise<CastVoteResponse>;
} {
  const { fingerprint } = useFingerprint();
  const [counts, setCounts] = useState<BinaryVoteCount[]>(buildInitialCounts);
  const [totalVoters, setTotalVoters] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [{ hasVoted, votedFor }, setVotedState] = useState(readVotedState);

  const isOpen = Date.now() < POLL_CLOSE_DATE.getTime();

  // Record page load time for timing anti-bot check
  useEffect(() => {
    try {
      localStorage.setItem(LOAD_TIME_KEY, String(Date.now()));
    } catch { /* ignore */ }
  }, []);

  const fetchCounts = useCallback(async () => {
    if (isDemoMode) {
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("vote_counts")
      .select("candidate_id, total_votes, percentage");

    if (error || !data) {
      setIsLoading(false);
      return;
    }

    setCounts((prev) => {
      const updated = prev.map((c) => {
        const match = data.find(
          (d: { candidate_id: string }) => d.candidate_id === c.candidateId
        );
        if (match) {
          return {
            ...c,
            totalVotes: Number(match.total_votes),
            percentage: Number(match.percentage),
          };
        }
        return c;
      });
      return recalculate(updated);
    });

    const total = data.reduce(
      (sum: number, d: { total_votes: number }) => sum + Number(d.total_votes),
      0
    );
    setTotalVoters(total);
    setIsLoading(false);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  // Realtime subscription
  useEffect(() => {
    if (isDemoMode) return;

    const channel = supabase
      .channel("binary-votes-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "citizen_votes" },
        (payload) => {
          const candidateId = payload.new.candidate_id as string;
          setCounts((prev) => {
            const updated = prev.map((c) =>
              c.candidateId === candidateId
                ? { ...c, totalVotes: c.totalVotes + 1 }
                : c
            );
            return recalculate(updated);
          });
          setTotalVoters((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const castVote = useCallback(
    async (candidateId: string): Promise<CastVoteResponse> => {
      if (!fingerprint) return { error: "rate_limit", message: "Cargando dispositivo…" };
      if (!isOpen) return { error: "closed", message: "La encuesta cerró el 6 de junio." };
      if (hasVoted) return { error: "already_voted", message: "Ya votaste en esta encuesta. 1 dispositivo = 1 voto." };

      let loadTime: number | undefined;
      try {
        loadTime = Number(localStorage.getItem(LOAD_TIME_KEY));
      } catch { /* ignore */ }

      const { data, error } = await supabase.functions.invoke("cast-vote", {
        body: { candidateId, fingerprint, honeypot: "", loadTime },
      });

      if (error) {
        return { error: "rate_limit", message: "Error de conexión. Intenta de nuevo." };
      }

      const response = data as CastVoteResponse;

      if (response.ok) {
        try {
          localStorage.setItem(VOTED_KEY, "1");
          localStorage.setItem(VOTED_FOR_KEY, candidateId);
        } catch { /* ignore */ }
        setVotedState({ hasVoted: true, votedFor: candidateId });
      }

      return response;
    },
    [fingerprint, isOpen, hasVoted]
  );

  return {
    counts,
    hasVoted,
    votedFor,
    totalVoters,
    isOpen,
    closesAt: POLL_CLOSE_DATE,
    isLoading,
    castVote,
  };
}
