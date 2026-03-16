import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import {
  AlertTriangle,
  TrendingUp,
  ArrowRightLeft,
  Share2,
  Check,
} from "lucide-react";
import { candidates } from "../data/candidates";
import { useAppStore } from "../store/useAppStore";
import { calculateDimensionScore, getScoreColor } from "../lib/scoring-engine";
import { DEFAULT_SCORING_CONFIG } from "../config/scoring";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ProgressBar } from "../components/ui/ProgressBar";
import { CandidateAvatar } from "../components/candidate/CandidateAvatar";
import { CompareDataView } from "../components/compare/CompareDataView";
import { shareComparison } from "../lib/share";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export function ComparePage() {
  const { scores, weights } = useAppStore();
  const [searchParams] = useSearchParams();
  const initialA = searchParams.get("a") ?? candidates[0]?.id ?? "";
  const [idA, setIdA] = useState(initialA);
  const [idB, setIdB] = useState(
    searchParams.get("b") ??
      candidates.find((c) => c.id !== initialA)?.id ??
      candidates[1]?.id ??
      ""
  );
  const [shared, setShared] = useState(false);

  const config = {
    ...DEFAULT_SCORING_CONFIG,
    dimensions: DEFAULT_SCORING_CONFIG.dimensions.map((d) => ({
      ...d,
      weight: weights[d.id] ?? d.weight,
    })),
  };

  const scoresA = scores.filter((s) => s.candidateId === idA);
  const scoresB = scores.filter((s) => s.candidateId === idB);

  const candidateA = candidates.find((c) => c.id === idA);
  const candidateB = candidates.find((c) => c.id === idB);
  useDocumentTitle(
    candidateA && candidateB
      ? `${candidateA.firstName} vs ${candidateB.firstName}`
      : "Comparar Candidatos"
  );

  const radarData = config.dimensions.map((dim) => ({
    dimension: dim.label.split("/")[0].trim().split(" ").slice(0, 2).join(" "),
    fullLabel: dim.label,
    A: Math.round(calculateDimensionScore(dim, scoresA).rawScore * 10) / 10,
    B: Math.round(calculateDimensionScore(dim, scoresB).rawScore * 10) / 10,
  }));

  const totalA = config.dimensions.reduce(
    (sum, dim) => sum + calculateDimensionScore(dim, scoresA).weightedScore,
    0
  );
  const totalB = config.dimensions.reduce(
    (sum, dim) => sum + calculateDimensionScore(dim, scoresB).weightedScore,
    0
  );

  const hasScores = scoresA.length > 0 || scoresB.length > 0;

  const handleSwap = () => {
    setIdA(idB);
    setIdB(idA);
  };

  const handleShare = async () => {
    if (!candidateA || !candidateB) return;
    const success = await shareComparison(candidateA, candidateB);
    if (success) {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">
          Comparar Candidatos
        </h1>
        {candidateA && candidateB && (
          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-amber-500/30 hover:text-amber-400"
          >
            {shared ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
            {shared ? "Copiado" : "Compartir"}
          </button>
        )}
      </div>

      {/* Selector */}
      <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row">
        <select
          value={idA}
          onChange={(e) => setIdA(e.target.value)}
          className="w-full rounded-lg border border-white/[0.06] bg-[#0D0D20] px-4 py-3 text-sm text-gray-200 outline-none focus:border-amber-500/30 sm:flex-1"
        >
          {candidates.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.party.acronym})
            </option>
          ))}
        </select>

        <button
          onClick={handleSwap}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-sm text-gray-400 transition-colors hover:border-amber-500/30 hover:text-amber-400"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </button>

        <select
          value={idB}
          onChange={(e) => setIdB(e.target.value)}
          className="w-full rounded-lg border border-white/[0.06] bg-[#0D0D20] px-4 py-3 text-sm text-gray-200 outline-none focus:border-amber-500/30 sm:flex-1"
        >
          {candidates.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.party.acronym})
            </option>
          ))}
        </select>
      </div>

      {/* Candidate info cards */}
      {candidateA && candidateB && (
        <div className="mb-6 grid grid-cols-2 gap-4">
          {[
            { c: candidateA, total: totalA, hasS: scoresA.length > 0 },
            { c: candidateB, total: totalB, hasS: scoresB.length > 0 },
          ].map(({ c, total, hasS }) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="flex items-center gap-3">
                  <CandidateAvatar
                    photo={c.photo}
                    name={c.name}
                    partyColor={c.party.color}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-100">
                      {c.name}
                    </p>
                    <p className="text-xs text-gray-500">{c.party.name}</p>
                  </div>
                  {hasS && (
                    <span
                      className="text-xl font-bold"
                      style={{ color: getScoreColor(total) }}
                    >
                      {Math.round(total * 10) / 10}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.polls[0] && (
                    <Badge variant="info">
                      <TrendingUp className="h-3 w-3" />
                      {c.polls[0].percentage}%
                    </Badge>
                  )}
                  {c.redFlags.length > 0 && (
                    <Badge variant="warning">
                      <AlertTriangle className="h-3 w-3" />
                      {c.redFlags.length}
                    </Badge>
                  )}
                  {c.negativeImage && (
                    <Badge variant="danger">{c.negativeImage}% rechazo</Badge>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Score comparison */}
      {hasScores && (
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          {/* Radar Chart */}
          <Card>
            <h3 className="mb-2 text-sm font-medium text-gray-300">
              Comparación de Scores
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#FFFFFF10" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fill: "#B8B8CC", fontSize: 11 }}
                />
                <Radar
                  name={candidateA?.name ?? "A"}
                  dataKey="A"
                  stroke={candidateA?.party.color ?? "#F5A623"}
                  fill={candidateA?.party.color ?? "#F5A623"}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Radar
                  name={candidateB?.name ?? "B"}
                  dataKey="B"
                  stroke={candidateB?.party.color ?? "#70A1FF"}
                  fill={candidateB?.party.color ?? "#70A1FF"}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 text-xs">
              <span className="flex items-center gap-2 text-gray-400">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: candidateA?.party.color }}
                />
                {candidateA?.name}
              </span>
              <span className="flex items-center gap-2 text-gray-400">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: candidateB?.party.color }}
                />
                {candidateB?.name}
              </span>
            </div>
          </Card>

          {/* Side by Side Scores */}
          <Card>
            <h3 className="mb-4 text-sm font-medium text-gray-300">
              Desglose por Dimensión
            </h3>
            <div className="space-y-4">
              {config.dimensions.map((dim) => {
                const a = calculateDimensionScore(dim, scoresA).rawScore;
                const b = calculateDimensionScore(dim, scoresB).rawScore;
                const aRound = Math.round(a * 10) / 10;
                const bRound = Math.round(b * 10) / 10;

                return (
                  <div key={dim.id}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {dim.label}
                      </span>
                      <span className="text-[10px] text-gray-600">
                        peso: {dim.weight}%
                      </span>
                    </div>
                    <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-2">
                      <span
                        className="w-8 text-right text-xs font-semibold"
                        style={{ color: getScoreColor(aRound * 10) }}
                      >
                        {aRound}
                      </span>
                      <ProgressBar
                        value={a}
                        max={10}
                        size="sm"
                        color={candidateA?.party.color}
                      />
                      <span className="text-[10px] text-gray-600">vs</span>
                      <ProgressBar
                        value={b}
                        max={10}
                        size="sm"
                        color={candidateB?.party.color}
                      />
                      <span
                        className="w-8 text-xs font-semibold"
                        style={{ color: getScoreColor(bRound * 10) }}
                      >
                        {bRound}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="border-t border-white/[0.06] pt-3">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <div className="text-right">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: getScoreColor(totalA) }}
                    >
                      {Math.round(totalA * 10) / 10}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    TOTAL
                  </span>
                  <div>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: getScoreColor(totalB) }}
                    >
                      {Math.round(totalB * 10) / 10}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Data comparison (always visible) */}
      {candidateA && candidateB && (
        <Card>
          <h3 className="mb-4 text-sm font-medium text-gray-300">
            Comparación de Datos
          </h3>
          <CompareDataView candidateA={candidateA} candidateB={candidateB} />
        </Card>
      )}

      {!hasScores && candidateA && candidateB && (
        <p className="mt-4 text-center text-xs text-gray-500">
          Evalúa candidatos en sus perfiles para ver la comparación de scores y
          el radar chart.
        </p>
      )}
    </div>
  );
}
