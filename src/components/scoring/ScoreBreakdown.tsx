import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useAppStore } from "../../store/useAppStore";
import { calculateDimensionScore, getScoreColor } from "../../lib/scoring-engine";
import { DEFAULT_SCORING_CONFIG } from "../../config/scoring";

interface ScoreBreakdownProps {
  candidateId: string;
}

export function ScoreBreakdown({ candidateId }: ScoreBreakdownProps) {
  const { scores, weights } = useAppStore();
  const candidateScores = scores.filter((s) => s.candidateId === candidateId);

  if (candidateScores.length === 0) return null;

  const config = {
    ...DEFAULT_SCORING_CONFIG,
    dimensions: DEFAULT_SCORING_CONFIG.dimensions.map((d) => ({
      ...d,
      weight: weights[d.id] ?? d.weight,
    })),
  };

  const data = config.dimensions.map((dim) => {
    const { rawScore, weightedScore } = calculateDimensionScore(dim, candidateScores);
    return {
      name: dim.label.split("/")[0].trim().split(" ").slice(0, 2).join(" "),
      raw: Math.round(rawScore * 10) / 10,
      weighted: Math.round(weightedScore * 10) / 10,
      weight: dim.weight,
    };
  });

  return (
    <div>
      <h4 className="mb-3 text-xs font-medium text-gray-400">
        Desglose por dimensión
      </h4>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} layout="vertical" barSize={14}>
          <XAxis
            type="number"
            domain={[0, 10]}
            tick={{ fill: "#666680", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#B8B8CC", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={80}
          />
          <Tooltip
            contentStyle={{
              background: "#151530",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "8px",
              fontSize: "11px",
            }}
            formatter={(value, name) => [
              `${value}${name === "raw" ? "/10" : "pts"}`,
              name === "raw" ? "Score" : "Ponderado",
            ]}
          />
          <Bar dataKey="raw" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={getScoreColor(entry.raw * 10)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
