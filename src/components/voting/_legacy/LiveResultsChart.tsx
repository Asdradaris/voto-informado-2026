import { motion, AnimatePresence } from "framer-motion";
import { LiveCounter } from "./LiveCounter";
import type { VoteCount } from "@/types";

interface LiveResultsChartProps {
  counts: VoteCount[];
  totalVoters: number;
  votedFor: string | null;
  maxVisible?: number;
}

export function LiveResultsChart({
  counts,
  totalVoters,
  votedFor,
  maxVisible = 10,
}: LiveResultsChartProps) {
  const visible = counts.slice(0, maxVisible);
  const maxVotes = Math.max(...visible.map((c) => c.totalVotes), 1);

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-gray-200">
          Resultados en vivo
        </h3>
        <span className="text-xs text-gray-500">
          <LiveCounter value={totalVoters} className="font-mono text-amber-400" /> votos
        </span>
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {visible.map((candidate) => (
            <motion.div
              key={candidate.candidateId}
              layout
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="group"
            >
              <div className="mb-1 flex items-baseline justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 text-right text-xs font-bold text-gray-500">
                    {candidate.rank}.
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      votedFor === candidate.candidateId
                        ? "text-emerald-400"
                        : "text-gray-300"
                    }`}
                  >
                    {candidate.candidateName.split(" ").slice(-2).join(" ")}
                  </span>
                  <span className="text-[10px] text-gray-600">
                    {candidate.partyName}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-gray-400">
                    <LiveCounter value={candidate.totalVotes} />
                  </span>
                  <span className="w-12 text-right font-mono text-xs font-semibold text-amber-400/80">
                    {candidate.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="ml-7 h-2 overflow-hidden rounded-full bg-white/[0.04]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: candidate.partyColor }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(candidate.totalVotes / maxVotes) * 100}%`,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {counts.length > maxVisible && (
        <p className="mt-3 text-center text-[10px] text-gray-600">
          + {counts.length - maxVisible} candidatos más
        </p>
      )}
    </div>
  );
}
