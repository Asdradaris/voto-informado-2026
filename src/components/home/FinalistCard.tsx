import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Candidate } from "../../types";

interface FinalistCardProps {
  candidate: Candidate;
  firstRoundResult: number;
}

export function FinalistCard({ candidate, firstRoundResult }: FinalistCardProps) {
  const navigate = useNavigate();
  const partyColor = candidate.party.color;

  const activeProcesses = candidate.legalHistory.filter(
    (h) => h.status === "activo"
  ).length;

  const negImg = candidate.negativeImage ?? 0;

  const metrics = [
    {
      label: "Resultado 1.ª vuelta",
      value: `${firstRoundResult.toFixed(2)}%`,
      color: "#F5A623",
    },
    {
      label: "Imagen negativa",
      value: candidate.negativeImage != null ? `${candidate.negativeImage}%` : "—",
      color: negImg >= 70 ? "#FF4757" : negImg >= 50 ? "#FFA502" : "#2ED573",
    },
    {
      label: "Procesos activos",
      value: String(activeProcesses),
      color: activeProcesses >= 3 ? "#FF4757" : activeProcesses >= 1 ? "#FFA502" : "#2ED573",
    },
  ];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={() => navigate(`/candidate/${candidate.id}`)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-[#0D0D20] transition-colors duration-200"
      style={{
        borderColor: "rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = partyColor + "60";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
      }}
    >
      {/* Party accent bar */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: partyColor }}
      />

      {/* Photo */}
      <div className="relative overflow-hidden bg-[#111128]">
        <img
          src={candidate.photo}
          alt={candidate.name}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ aspectRatio: "1 / 1", maxHeight: "280px" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D20] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Name + party */}
        <div>
          <h2
            className="font-bold leading-tight text-gray-100"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
            }}
          >
            {candidate.name}
          </h2>
          <div className="mt-1.5 flex items-center gap-2">
            <span
              className="inline-block h-3 w-1 rounded-full"
              style={{ backgroundColor: partyColor }}
            />
            <span className="text-sm text-gray-400">{candidate.party.name}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex flex-col gap-2">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{m.label}</span>
              <span
                className="font-mono text-sm font-bold tabular-nums"
                style={{ color: m.color }}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/[0.06] py-2.5 text-sm font-medium text-amber-400 transition-all duration-200 hover:border-amber-500/30 hover:bg-amber-500/5"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/candidate/${candidate.id}`);
          }}
        >
          Ver perfil completo
          <span aria-hidden>→</span>
        </button>
      </div>
    </motion.div>
  );
}
