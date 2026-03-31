import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BarChart3, AlertTriangle } from "lucide-react";
import { useVoting } from "@/hooks/useVoting";
import { useRealtimeVotes } from "@/hooks/useRealtimeVotes";
import { useSuggestions } from "@/hooks/useSuggestions";
import { RoundStatus } from "./RoundStatus";
import { LiveResultsChart } from "./LiveResultsChart";
import { CandidateVoteGrid } from "./CandidateVoteGrid";
import { VoteConfirmation } from "./VoteConfirmation";
import { SuggestionInput } from "./SuggestionInput";
import { SuggestionFeed } from "./SuggestionFeed";
import { VotingTimeline } from "./VotingTimeline";

export function VotingSection() {
  const {
    currentRound,
    hasVoted,
    votedFor,
    voteNumber,
    isLoading,
    error,
    castVote,
    roundStatus,
  } = useVoting();

  const roundNumber = currentRound?.roundNumber ?? 1;
  const { counts, totalVoters, isConnected } = useRealtimeVotes(roundNumber);
  const {
    suggestions,
    isLoading: suggestionsLoading,
    isSubmitting,
    canSuggest,
    submitSuggestion,
  } = useSuggestions(roundNumber);

  const [voteError, setVoteError] = useState<string | null>(null);

  const handleVote = useCallback(
    async (candidateId: string) => {
      setVoteError(null);
      // Honeypot is empty for real users
      const result = await castVote(candidateId, "");
      if (result.error) {
        setVoteError(result.message || "Error al votar");
      }
    },
    [castVote]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500/30 border-t-amber-500" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-amber-400" />
          <h2 className="text-lg font-bold text-gray-100 sm:text-xl">
            Encuesta Ciudadana en Vivo
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-gray-400">
          Las encuestadoras no te preguntan. Nosotros sí.{" "}
          <span className="text-amber-400/70">Tu voto se ve en tiempo real.</span>
        </p>
      </div>

      {/* Round status */}
      <RoundStatus
        round={currentRound}
        totalVoters={totalVoters}
        status={roundStatus}
        isConnected={isConnected}
      />

      {/* Timeline */}
      <VotingTimeline currentRound={currentRound} />

      {/* Error */}
      {(error || voteError) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400"
        >
          <AlertTriangle className="h-4 w-4 shrink-0" />
          {error || voteError}
        </motion.div>
      )}

      {/* Voting Grid — acción primero */}
      {(roundStatus === "open" || roundStatus === "voted") && (
        <CandidateVoteGrid
          votedFor={votedFor}
          disabled={hasVoted}
          onVote={handleVote}
        />
      )}

      {/* Vote Confirmation */}
      {hasVoted && votedFor && (
        <VoteConfirmation candidateId={votedFor} voteNumber={voteNumber} />
      )}

      {/* Live Results — el usuario ve el impacto después de votar */}
      <LiveResultsChart
        counts={counts}
        totalVoters={totalVoters}
        votedFor={votedFor}
      />

      {/* Investigating state */}
      {roundStatus === "investigating" && currentRound?.winnerCandidateId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 text-center"
        >
          <p className="text-sm text-purple-300">
            Estamos investigando al candidato ganador. Vuelve pronto para ver el informe.
          </p>
        </motion.div>
      )}

      {/* Suggestions */}
      {(roundStatus === "voted" || roundStatus === "open") && (
        <>
          <SuggestionInput
            canSuggest={canSuggest}
            isSubmitting={isSubmitting}
            onSubmit={submitSuggestion}
          />
          <SuggestionFeed
            suggestions={suggestions}
            isLoading={suggestionsLoading}
          />
        </>
      )}

      {/* Disclaimer */}
      <p className="text-center text-[10px] leading-relaxed text-gray-600">
        Esta es una encuesta ciudadana voluntaria y no oficial. No tiene valor legal
        ni estadístico formal. Su propósito es decidir qué candidato investigamos
        primero. 1 dispositivo = 1 voto por ronda. Resultados en tiempo real.
      </p>
    </section>
  );
}
