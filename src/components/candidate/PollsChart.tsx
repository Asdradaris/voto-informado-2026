import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { PollData } from "../../types";
import { Card } from "../ui/Card";
import { formatDate } from "../../lib/utils";

const pollsterColors: Record<string, string> = {
  datum: "#F5A623",
  ipsos: "#70A1FF",
  cpi: "#2ED573",
  iep: "#A29BFE",
  otro: "#666680",
};

interface PollsChartProps {
  polls: PollData[];
  negativeImage: number | null;
}

export function PollsChart({ polls, negativeImage }: PollsChartProps) {
  if (polls.length === 0) {
    return (
      <p className="text-sm text-gray-500">Sin datos de encuestas disponibles</p>
    );
  }

  const chartData = polls.map((p) => ({
    name: p.pollster.toUpperCase(),
    percentage: p.percentage,
    pollster: p.pollster,
    date: p.date,
    sampleSize: p.sampleSize,
    marginOfError: p.marginOfError,
  }));

  return (
    <div className="space-y-4">
      {/* Bar chart */}
      <Card>
        <h4 className="mb-4 text-sm font-medium text-gray-300">
          Intención de Voto por Encuestadora
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barSize={40}>
            <XAxis
              dataKey="name"
              tick={{ fill: "#B8B8CC", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#666680", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              domain={[0, "auto"]}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                background: "#151530",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#E8E8F0" }}
              itemStyle={{ color: "#B8B8CC" }}
              formatter={(value) => [`${value}%`, "Intención"]}
            />
            <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={pollsterColors[entry.pollster] ?? pollsterColors.otro}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Negative image */}
      {negativeImage !== null && (
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">
                Imagen Negativa
              </p>
              <p className="text-xs text-gray-500">
                Porcentaje de ciudadanos que no votarían por este candidato
              </p>
            </div>
            <div className="text-right">
              <span
                className={`text-3xl font-bold ${
                  negativeImage >= 60
                    ? "text-red-400"
                    : negativeImage >= 40
                    ? "text-orange-400"
                    : "text-amber-400"
                }`}
              >
                {negativeImage}%
              </span>
            </div>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${negativeImage}%`,
                backgroundColor:
                  negativeImage >= 60
                    ? "#FF4757"
                    : negativeImage >= 40
                    ? "#FF8C00"
                    : "#FFA502",
              }}
            />
          </div>
        </Card>
      )}

      {/* Detail cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {polls.map((poll, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        pollsterColors[poll.pollster] ?? pollsterColors.otro,
                    }}
                  />
                  <p className="text-sm font-medium capitalize text-gray-200">
                    {poll.pollster}
                  </p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {formatDate(poll.date)}
                </p>
              </div>
              <span className="text-xl font-bold text-amber-400">
                {poll.percentage}%
              </span>
            </div>
            <div className="mt-2 flex gap-3 text-[10px] text-gray-500">
              <span>n = {poll.sampleSize.toLocaleString()}</span>
              <span>&plusmn; {poll.marginOfError}%</span>
            </div>
            <p className="mt-1 text-[10px] text-gray-600">{poll.source}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
