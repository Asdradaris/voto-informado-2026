import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { candidates } from "@/data/candidates";
import { formatNumber } from "@/lib/utils";

interface VoteConfirmationProps {
  candidateId: string;
  voteNumber: number | null;
}

export function VoteConfirmation({ candidateId, voteNumber }: VoteConfirmationProps) {
  const candidate = candidates.find((c) => c.id === candidateId);

  if (!candidate) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3"
    >
      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
      <div>
        <p className="text-sm font-medium text-emerald-300">
          Votaste por {candidate.name}
        </p>
        {voteNumber && (
          <p className="text-xs text-emerald-400/60">
            Tu voto #{formatNumber(voteNumber)}
          </p>
        )}
      </div>
    </motion.div>
  );
}
