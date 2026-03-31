import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { candidates } from "@/data/candidates";
import { CandidateVoteChip } from "./CandidateVoteChip";

interface CandidateVoteGridProps {
  votedFor: string | null;
  disabled: boolean;
  onVote: (candidateId: string) => void;
}

export function CandidateVoteGrid({
  votedFor,
  disabled,
  onVote,
}: CandidateVoteGridProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleCandidates = showAll ? candidates : candidates.slice(0, 8);

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6">
      <h3 className="mb-1 text-sm font-semibold text-gray-200">
        {disabled ? "Tu voto fue registrado" : "Elige al candidato que quieres que investiguemos a profundidad:"}
      </h3>
      {!disabled && (
        <p className="mb-4 text-xs text-gray-500">
          Un solo voto por ronda. Sin registro. Sin datos personales.
        </p>
      )}

      <motion.div
        layout
        className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
      >
        <AnimatePresence mode="popLayout">
          {visibleCandidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <CandidateVoteChip
                candidateId={candidate.id}
                name={candidate.name}
                party={candidate.party.acronym || candidate.party.name}
                partyColor={candidate.party.color}
                photo={candidate.photo}
                isSelected={votedFor === candidate.id}
                disabled={disabled}
                onVote={onVote}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {candidates.length > 8 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 flex w-full items-center justify-center gap-1 text-xs text-amber-400/70 transition-colors hover:text-amber-400"
        >
          {showAll ? (
            <>
              Ver menos <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Ver todos ({candidates.length} candidatos) <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
