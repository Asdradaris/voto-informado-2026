import { useEffect, useState, useCallback } from "react";
import { supabase, isDemoMode } from "@/lib/supabase";
import { candidates } from "@/data/candidates";
import type { VoteCount } from "@/types";

function buildInitialCounts(): VoteCount[] {
  return candidates.map((c, i) => ({
    candidateId: c.id,
    candidateName: c.name,
    partyName: c.party.name,
    partyColor: c.party.color,
    totalVotes: 0,
    percentage: 0,
    rank: i + 1,
    trend: "new" as const,
  }));
}

function recalculate(counts: VoteCount[]): VoteCount[] {
  const total = counts.reduce((sum, c) => sum + c.totalVotes, 0);
  return counts
    .map((c) => ({
      ...c,
      percentage: total > 0 ? (c.totalVotes * 100) / total : 0,
    }))
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .map((c, i) => ({ ...c, rank: i + 1 }));
}

export function useRealtimeVotes(roundNumber: number) {
  const [counts, setCounts] = useState<VoteCount[]>(buildInitialCounts);
  const [totalVoters, setTotalVoters] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  const fetchCounts = useCallback(async () => {
    if (isDemoMode) return;

    const { data, error } = await supabase
      .from("vote_counts")
      .select("*")
      .eq("voting_round", roundNumber);

    if (error || !data) return;

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
  }, [roundNumber]);

  useEffect(() => {
    fetchCounts();

    if (isDemoMode) return;

    const channel = supabase
      .channel("votes-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "citizen_votes",
          filter: `voting_round=eq.${roundNumber}`,
        },
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
      .subscribe((status) => {
        setIsConnected(status === "SUBSCRIBED");
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roundNumber, fetchCounts]);

  // Demo mode: start from zero, no fake data
  useEffect(() => {
    if (!isDemoMode) return;
    setIsConnected(true);
  }, []);

  return { counts, totalVoters, isConnected, refetch: fetchCounts };
}
