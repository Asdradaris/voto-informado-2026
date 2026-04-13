import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, AlertTriangle, Lock, ExternalLink } from "lucide-react";
import { useBinaryPoll } from "@/hooks/useBinaryPoll";
import { useSuggestions } from "@/hooks/useSuggestions";
import { POLL_QUESTION, POLL_SUBTITLE } from "@/config/finalists";
import { BinaryVoteBar } from "./BinaryVoteBar";
import { FinalistVoteCard } from "./FinalistVoteCard";
import { SuggestionInput } from "./SuggestionInput";
import { SuggestionFeed } from "./SuggestionFeed";

export function VotingSection() {
  const {
    counts,
    hasVoted,
    votedFor,
    totalVoters,
    isOpen,
    closesAt,
    isLoading,
    castVote,
  } = useBinaryPoll();

  const {
    suggestions,
    isLoading: suggestionsLoading,
    isSubmitting,
    canSuggest,
    submitSuggestion,
  } = useSuggestions();

  const [isVoting, setIsVoting] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  const handleVote = useCallback(
    async (candidateId: string) => {
      setVoteError(null);
      setIsVoting(true);
      const result = await castVote(candidateId);
      setIsVoting(false);
      if (result.error && result.error !== "already_voted") {
        setVoteError(result.message || "Error al votar");
      }
    },
    [castVote]
  );

  const closeDateStr = closesAt.toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500/30 border-t-amber-500" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 py-8">

      {/* ── Header ── */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400/70">
            Encuesta Ciudadana en Vivo
          </span>
        </div>

        <h2 className="font-display text-3xl font-bold leading-tight text-gray-100 sm:text-4xl">
          {POLL_QUESTION}
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-gray-400">
          {POLL_SUBTITLE}
        </p>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          {isOpen ? (
            <>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Abierta hasta el {closeDateStr} · {totalVoters.toLocaleString("es-PE")} votos registrados
            </>
          ) : (
            <>
              <Lock className="h-3.5 w-3.5 text-gray-600" />
              Encuesta cerrada · Votación oficial el 7 de junio
            </>
          )}
        </div>
      </div>

      {/* ── Error ── */}
      <AnimatePresence>
        {voteError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400"
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {voteError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sección de votación ── */}
      {isOpen && (
        <>
          {!hasVoted ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {counts.map((finalist) => (
                <FinalistVoteCard
                  key={finalist.candidateId}
                  finalist={finalist}
                  hasVoted={hasVoted}
                  votedFor={votedFor}
                  isVoting={isVoting}
                  onVote={handleVote}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-4 text-sm text-emerald-400"
            >
              Registramos tu voto. Los resultados siguen actualizándose en vivo.
            </motion.div>
          )}

          {/* Cards de resultado en estado "ya votó" (mini, desactivadas) */}
          {hasVoted && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {counts.map((finalist) => (
                <FinalistVoteCard
                  key={finalist.candidateId}
                  finalist={finalist}
                  hasVoted={hasVoted}
                  votedFor={votedFor}
                  isVoting={false}
                  onVote={() => {}}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Resultados en vivo (siempre visibles) ── */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6">
        <h3 className="mb-4 text-sm font-semibold text-gray-300">
          {isOpen ? "Resultados en tiempo real" : "Resultados finales"}
        </h3>
        <BinaryVoteBar
          counts={counts}
          totalVoters={totalVoters}
          isClosed={!isOpen}
        />
      </div>

      {/* ── Estado cerrado: CTA ── */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3 rounded-2xl border border-amber-500/10 bg-amber-500/5 p-6 text-center"
        >
          <p className="font-semibold text-gray-200">Encuesta cerrada · Resultados finales</p>
          <a
            href="https://www.onpe.gob.pe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300"
          >
            Ir al voto oficial
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      )}

      {/* ── Sugerencias ciudadanas ── */}
      <SuggestionInput
        canSuggest={canSuggest && isOpen}
        isSubmitting={isSubmitting}
        onSubmit={submitSuggestion}
      />
      <SuggestionFeed suggestions={suggestions} isLoading={suggestionsLoading} />

      {/* ── Disclaimer ── */}
      <p className="text-center text-[10px] leading-relaxed text-gray-600">
        Encuesta ciudadana no oficial. Sin valor estadístico formal. 1 dispositivo = 1 voto. Resultados en tiempo real.
      </p>
    </section>
  );
}
