import { DEFAULT_SCORING_CONFIG } from "../../config/scoring";
import { useAppStore } from "../../store/useAppStore";
import {
  calculateDimensionScore,
  calculateTotalScore,
  getScoreColor,
  getScoreLabel,
} from "../../lib/scoring-engine";
import { ProgressBar } from "../ui/ProgressBar";
import { Scale, ClipboardList, Banknote, BarChart3 } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Scale,
  ClipboardList,
  Banknote,
  BarChart3,
};

interface ScoringPanelProps {
  candidateId: string;
}

export function ScoringPanel({ candidateId }: ScoringPanelProps) {
  const { scores, setScore } = useAppStore();
  const candidateScores = scores.filter((s) => s.candidateId === candidateId);
  const totalScore = calculateTotalScore(
    DEFAULT_SCORING_CONFIG,
    candidateScores
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-100">Mi Evaluación</h3>
        <div className="text-right">
          <div
            className="text-2xl font-bold"
            style={{ color: getScoreColor(totalScore) }}
          >
            {Math.round(totalScore * 10) / 10}
          </div>
          <div className="text-xs text-gray-400">{getScoreLabel(totalScore)}</div>
        </div>
      </div>

      <ProgressBar value={totalScore} size="lg" />

      <div className="space-y-5">
        {DEFAULT_SCORING_CONFIG.dimensions.map((dimension) => {
          const Icon = iconMap[dimension.icon] ?? Scale;
          const { rawScore } = calculateDimensionScore(
            dimension,
            candidateScores
          );

          return (
            <div key={dimension.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-gray-200">
                  {dimension.label}
                </span>
                <span className="ml-auto text-xs text-gray-500">
                  Peso: {dimension.weight}%
                </span>
              </div>

              <div className="space-y-2 pl-6">
                {dimension.criteria.map((criterion) => {
                  const existing = candidateScores.find(
                    (s) => s.criterionId === criterion.id
                  );
                  const value = existing?.score ?? 0;

                  return (
                    <div key={criterion.id}>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="text-xs text-gray-400">
                          {criterion.label}
                        </label>
                        <span className="min-w-[2.5rem] text-right text-xs font-medium text-gray-300">
                          {value}/10
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={1}
                        value={value}
                        onChange={(e) =>
                          setScore({
                            candidateId,
                            dimensionId: dimension.id,
                            criterionId: criterion.id,
                            score: Number(e.target.value),
                            timestamp: new Date().toISOString(),
                          })
                        }
                        className="scoring-slider w-full"
                        title={criterion.description}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="pl-6">
                <ProgressBar value={rawScore} max={10} showLabel size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
