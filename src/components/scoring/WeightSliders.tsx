import { RotateCcw } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { DEFAULT_SCORING_CONFIG } from "../../config/scoring";

interface WeightSlidersProps {
  compact?: boolean;
}

export function WeightSliders({ compact = false }: WeightSlidersProps) {
  const { weights, setWeight, resetWeights } = useAppStore();

  const dimensions = DEFAULT_SCORING_CONFIG.dimensions;
  const total = dimensions.reduce((s, d) => s + (weights[d.id] ?? d.weight), 0);
  const isBalanced = total === 100;

  const handleNormalize = () => {
    if (total === 0) return;
    dimensions.forEach((d) => {
      const current = weights[d.id] ?? d.weight;
      setWeight(d.id, Math.round((current / total) * 100));
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className={`font-medium text-gray-200 ${compact ? "text-xs" : "text-sm"}`}>
          Pesos por Dimensión
        </h3>
        <div className="flex items-center gap-2">
          {!isBalanced && (
            <button
              onClick={handleNormalize}
              className="rounded-md bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-400 transition-colors hover:bg-amber-500/20"
            >
              Normalizar a 100%
            </button>
          )}
          <button
            onClick={resetWeights}
            className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-amber-400"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>
      </div>

      {dimensions.map((dim) => {
        const value = weights[dim.id] ?? dim.weight;
        return (
          <div key={dim.id}>
            <div className="mb-1 flex items-center justify-between">
              <span className={`text-gray-400 ${compact ? "text-[10px]" : "text-xs"}`}>
                {dim.label}
              </span>
              <span
                className={`font-medium ${compact ? "text-[10px]" : "text-xs"} ${
                  value === 0 ? "text-gray-600" : "text-gray-300"
                }`}
              >
                {value}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={value}
                onChange={(e) => setWeight(dim.id, Number(e.target.value))}
                className="scoring-slider flex-1"
              />
            </div>
          </div>
        );
      })}

      <div
        className={`flex items-center justify-between rounded-lg px-3 py-2 ${
          isBalanced
            ? "bg-emerald-500/5 text-emerald-400"
            : "bg-amber-500/5 text-amber-400"
        }`}
      >
        <span className="text-xs font-medium">Total</span>
        <span className="text-sm font-bold">{total}%</span>
      </div>
    </div>
  );
}
