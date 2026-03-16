import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import type { CandidateRanking } from "../../types";
import type { Candidate } from "../../types";
import { Card } from "../ui/Card";
import { ProgressBar } from "../ui/ProgressBar";
import { CandidateAvatar } from "../candidate/CandidateAvatar";
import { ScoreBreakdown } from "./ScoreBreakdown";
import { getScoreColor, getScoreLabel } from "../../lib/scoring-engine";
import { useState } from "react";

const rankIcons = [Trophy, Medal, Award];
const rankColors = ["text-amber-400", "text-gray-300", "text-amber-600"];

interface RankingTableProps {
  rankings: CandidateRanking[];
  candidates: Candidate[];
}

export function RankingTable({ rankings, candidates }: RankingTableProps) {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (rankings.length === 0) {
    return (
      <Card className="text-center">
        <div className="py-8">
          <Trophy className="mx-auto mb-3 h-10 w-10 text-gray-600" />
          <p className="text-gray-400">
            Aún no has evaluado ningún candidato.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Ve al perfil de cada candidato y usa los sliders para evaluarlos.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {rankings.map((r) => {
          const candidate = candidates.find((c) => c.id === r.candidateId);
          if (!candidate) return null;

          const RankIcon = rankIcons[r.rank - 1];
          const rankColor = rankColors[r.rank - 1] ?? "text-gray-500";
          const isExpanded = expandedId === r.candidateId;

          return (
            <motion.div
              key={r.candidateId}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="overflow-hidden"
                hover
                onClick={() =>
                  setExpandedId(isExpanded ? null : r.candidateId)
                }
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center">
                    {RankIcon ? (
                      <RankIcon className={`h-6 w-6 ${rankColor}`} />
                    ) : (
                      <span className="text-lg font-bold text-gray-500">
                        #{r.rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <CandidateAvatar
                    photo={candidate.photo}
                    name={candidate.name}
                    partyColor={candidate.party.color}
                    size="sm"
                  />

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-200">
                      {candidate.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {candidate.party.name}
                    </p>
                  </div>

                  {/* Score bar */}
                  <div className="hidden w-36 sm:block">
                    <ProgressBar value={r.totalScore} size="sm" />
                  </div>

                  {/* Score number */}
                  <div className="text-right">
                    <span
                      className="text-xl font-bold"
                      style={{ color: getScoreColor(r.totalScore) }}
                    >
                      {r.totalScore}
                    </span>
                    <p className="text-[10px] text-gray-500">
                      {getScoreLabel(r.totalScore)}
                    </p>
                  </div>
                </div>

                {/* Dimension scores inline */}
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {r.dimensionScores.map((ds) => (
                    <div
                      key={ds.dimensionId}
                      className="flex items-center gap-1.5 rounded-md bg-white/[0.03] px-2 py-1"
                    >
                      <span className="text-[10px] text-gray-500">
                        {ds.dimensionId === "legal"
                          ? "Legal"
                          : ds.dimensionId === "proposals"
                          ? "Propuestas"
                          : ds.dimensionId === "patrimony"
                          ? "Patrimonio"
                          : "Viabilidad"}
                      </span>
                      <span
                        className="text-xs font-semibold"
                        style={{
                          color: getScoreColor(ds.rawScore * 10),
                        }}
                      >
                        {Math.round(ds.rawScore * 10) / 10}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Expanded breakdown */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 border-t border-white/[0.06] pt-4">
                        <ScoreBreakdown candidateId={r.candidateId} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/candidate/${r.candidateId}`);
                          }}
                          className="mt-3 text-xs text-amber-400 transition-colors hover:text-amber-300"
                        >
                          Ver perfil completo →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
