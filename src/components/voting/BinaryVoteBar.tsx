import { motion } from "framer-motion";
import type { BinaryVoteCount } from "@/types";

interface BinaryVoteBarProps {
  counts: BinaryVoteCount[];
  totalVoters: number;
  isClosed?: boolean;
}

export function BinaryVoteBar({ counts, totalVoters, isClosed = false }: BinaryVoteBarProps) {
  const left = counts[0];
  const right = counts[1];

  if (!left || !right) return null;

  const leftPct = totalVoters === 0 ? 50 : left.percentage;
  const rightPct = totalVoters === 0 ? 50 : right.percentage;

  return (
    <div className="space-y-3">
      {/* Etiquetas */}
      <div className="flex items-end justify-between">
        <div className="text-left">
          <p className="text-xs font-medium text-gray-400">{left.candidateName.split(" ")[0]}</p>
          <p
            className="text-2xl font-bold tabular-nums"
            style={{ color: left.partyColor }}
          >
            {leftPct.toFixed(1)}%
          </p>
        </div>

        <div className="text-center text-[10px] text-gray-600">
          {isClosed ? "Resultados finales" : "en vivo"}
        </div>

        <div className="text-right">
          <p className="text-xs font-medium text-gray-400">
            {right.candidateName.split(" ").slice(-2).join(" ")}
          </p>
          <p
            className="text-2xl font-bold tabular-nums"
            style={{ color: "#60a5fa" /* azul más legible que #1E3A5F en oscuro */ }}
          >
            {rightPct.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Barra */}
      <div className="relative h-6 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-l-full"
          style={{ backgroundColor: left.partyColor }}
          animate={{ width: `${leftPct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.div
          className="absolute right-0 top-0 h-full rounded-r-full"
          style={{ backgroundColor: "#1E3A5F" }}
          animate={{ width: `${rightPct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Línea divisoria central */}
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-px bg-black/30" />
      </div>

      {/* Total */}
      <p className="text-center font-mono text-xs text-gray-500">
        {totalVoters.toLocaleString("es-PE")} {totalVoters === 1 ? "voto" : "votos"}
      </p>
    </div>
  );
}
