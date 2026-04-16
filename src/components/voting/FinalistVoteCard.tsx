import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { BinaryVoteCount } from "@/types";

interface FinalistVoteCardProps {
  finalist: BinaryVoteCount;
  hasVoted: boolean;
  votedFor: string | null;
  isVoting: boolean;
  onVote: (candidateId: string) => void;
}

export function FinalistVoteCard({
  finalist,
  hasVoted,
  votedFor,
  isVoting,
  onVote,
}: FinalistVoteCardProps) {
  const isChosen = votedFor === finalist.candidateId;
  const isRejected = hasVoted && !isChosen;

  // Color legible sobre fondo oscuro: RLA navy → azul más brillante
  const displayColor =
    finalist.candidateId === "rafael-lopez-aliaga"
      ? "#60a5fa"
      : finalist.partyColor;

  return (
    <motion.div
      layout
      className={[
        "relative flex flex-col overflow-hidden rounded-2xl border transition-all",
        isRejected
          ? "opacity-35 grayscale"
          : "cursor-pointer",
        isChosen
          ? "border-opacity-60 ring-2 ring-offset-2 ring-offset-gray-950"
          : "border-white/[0.08] hover:border-opacity-40",
      ].join(" ")}
      style={{
        borderColor: isRejected ? undefined : `${displayColor}40`,
        ...(isChosen && { boxShadow: `0 0 24px ${displayColor}30` }),
      }}
      whileHover={!hasVoted && !isVoting ? { scale: 1.02 } : {}}
      whileTap={!hasVoted && !isVoting ? { scale: 0.98 } : {}}
    >
      {/* Foto */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
        <img
          src={finalist.photo}
          alt={finalist.candidateName}
          className="h-full w-full object-cover object-top"
        />
        {/* Overlay de partido */}
        <div
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ backgroundColor: displayColor }}
        />

        {/* Checkmark si ya votó por este */}
        {isChosen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full"
            style={{ backgroundColor: displayColor }}
          >
            <Check className="h-4 w-4 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-bold text-gray-100">{finalist.candidateName}</h3>
          <p className="text-xs" style={{ color: displayColor }}>
            {finalist.partyName}
          </p>
        </div>

        {/* Botón de voto */}
        {!hasVoted && (
          <button
            onClick={() => onVote(finalist.candidateId)}
            disabled={isVoting}
            className="mt-auto w-full rounded-xl py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
            style={{ backgroundColor: displayColor }}
          >
            {isVoting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border border-white/30 border-t-white" />
                Registrando…
              </span>
            ) : (
              `Votar por ${finalist.candidateName.split(" ")[0]}`
            )}
          </button>
        )}

        {isChosen && (
          <p className="mt-auto text-center text-xs text-gray-400">
            Tu voto registrado
          </p>
        )}
      </div>
    </motion.div>
  );
}
