import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ExternalLink } from "lucide-react";
import type { LegalRecord } from "../../types";
import { Badge } from "../ui/Badge";
import { formatDate } from "../../lib/utils";

const statusConfig: Record<
  LegalRecord["status"],
  { variant: "danger" | "success" | "warning" | "info" | "critical"; label: string }
> = {
  activo: { variant: "danger", label: "Activo" },
  archivado: { variant: "info", label: "Archivado" },
  resuelto: { variant: "success", label: "Resuelto" },
  apelacion: { variant: "warning", label: "En apelación" },
  profugo: { variant: "critical", label: "Prófugo" },
};

const typeLabels: Record<LegalRecord["type"], string> = {
  proceso_penal: "Proceso Penal",
  proceso_civil: "Proceso Civil",
  investigacion_fiscal: "Investigación Fiscal",
  sentencia: "Sentencia",
  prision_preventiva: "Prisión Preventiva",
  inhabilitacion: "Inhabilitación",
  denuncia_constitucional: "Denuncia Constitucional",
  otro: "Otro",
};

const filterOptions = [
  { id: "todos", label: "Todos" },
  { id: "activo", label: "Activos" },
  { id: "archivado", label: "Archivados" },
  { id: "resuelto", label: "Resueltos" },
  { id: "apelacion", label: "En apelación" },
] as const;

type FilterId = (typeof filterOptions)[number]["id"];

function severityNodeColor(severity: LegalRecord["severity"]): string {
  if (severity >= 5) return "#D63031";
  if (severity >= 4) return "#FF4757";
  if (severity >= 3) return "#FFA502";
  if (severity >= 2) return "#F5A623";
  return "#6B7280";
}

function severityGlow(severity: LegalRecord["severity"]): string {
  if (severity >= 5) return "0 0 8px 2px rgba(214,48,49,0.45)";
  if (severity >= 4) return "0 0 6px 2px rgba(255,71,87,0.35)";
  return "none";
}

interface SeverityDotsProps {
  severity: LegalRecord["severity"];
}

function SeverityDots({ severity }: SeverityDotsProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{ color: i < severity ? severityNodeColor(severity) : undefined }}
          className={i < severity ? "" : "text-white/20"}
        >
          ●
        </span>
      ))}
    </div>
  );
}

interface RecordCardProps {
  record: LegalRecord;
}

const DESCRIPTION_LIMIT = 200;

function RecordCard({ record }: RecordCardProps) {
  const [expanded, setExpanded] = useState(false);
  const truncated = record.description.length > DESCRIPTION_LIMIT && !expanded;
  const displayDescription = truncated
    ? record.description.slice(0, DESCRIPTION_LIMIT).trimEnd() + "…"
    : record.description;

  const config = statusConfig[record.status];
  const nodeColor = severityNodeColor(record.severity);

  return (
    <div className="flex gap-3 sm:gap-4">
      {/* Node */}
      <div className="relative z-10 flex shrink-0 flex-col items-center">
        <div
          className="mt-1 h-4 w-4 rounded-full border-2 border-[#0D0D20]"
          style={{
            backgroundColor: nodeColor,
            boxShadow: severityGlow(record.severity),
          }}
        />
      </div>

      {/* Card */}
      <div className="mb-6 flex-1 rounded-xl border border-white/[0.06] bg-[#0D0D20] p-4 last:mb-0">
        {/* Top row */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={config.variant}>{config.label}</Badge>
          <Badge>{typeLabels[record.type]}</Badge>
          <div className="ml-auto flex items-center gap-2 text-[10px] text-gray-500">
            <SeverityDots severity={record.severity} />
            <span>{record.severity}/5</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="mt-2 text-sm font-semibold text-gray-100">
          {record.title}
        </h4>

        {/* Description */}
        <p className="mt-1 text-sm leading-relaxed text-gray-400">
          {displayDescription}
        </p>
        {record.description.length > DESCRIPTION_LIMIT && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            {expanded ? "Ver menos" : "Ver más"}
          </button>
        )}

        {/* Footer */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span>{formatDate(record.date)}</span>
          {record.source && (
            <>
              <span className="text-white/10">|</span>
              {record.source.url ? (
                <a
                  href={record.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-amber-400/70 hover:text-amber-400 transition-colors"
                >
                  {record.source.name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span>{record.source.name}</span>
              )}
            </>
          )}
          {record.relatedEntities && record.relatedEntities.length > 0 && (
            <>
              <span className="text-white/10">|</span>
              <span className="hidden sm:inline">
                Vinculados: {record.relatedEntities.join(", ")}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export interface LegalTimelineProps {
  records: LegalRecord[];
  maxItemsBeforeCollapse?: number;
  showFilters?: boolean;
}

export function LegalTimeline({
  records,
  maxItemsBeforeCollapse = 5,
  showFilters = true,
}: LegalTimelineProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("todos");
  const [showAll, setShowAll] = useState(false);

  if (records.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
        <CheckCircle className="h-5 w-5 text-emerald-400" />
        <div>
          <p className="text-sm font-medium text-emerald-400">
            Sin procesos legales registrados
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            No se encontraron procesos judiciales, investigaciones fiscales ni sentencias en fuentes públicas
          </p>
        </div>
      </div>
    );
  }

  const filtered =
    activeFilter === "todos"
      ? records
      : records.filter((r) => r.status === activeFilter);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const visible = showAll ? sorted : sorted.slice(0, maxItemsBeforeCollapse);
  const hasMore = sorted.length > maxItemsBeforeCollapse;

  // Group by year
  const byYear: Record<number, LegalRecord[]> = {};
  for (const record of visible) {
    const year = new Date(record.date).getFullYear();
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(record);
  }
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      {/* Filters */}
      {showFilters && (
        <div className="mb-5 flex flex-wrap gap-2">
          {filterOptions.map((f) => {
            const count =
              f.id === "todos"
                ? records.length
                : records.filter((r) => r.status === f.id).length;
            if (count === 0 && f.id !== "todos") return null;
            return (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id);
                  setShowAll(false);
                }}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  activeFilter === f.id
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                    : "border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200"
                }`}
              >
                {f.label}
                {count > 0 && (
                  <span className="ml-1 opacity-60">({count})</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Empty filtered state */}
      {sorted.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500">
          Sin registros legales en esta categoría
        </p>
      )}

      {/* Timeline by year */}
      <div className="space-y-6">
        {years.map((year) => (
          <div key={year}>
            {/* Year separator */}
            <div className="mb-4 flex items-center gap-3">
              <span className="font-space-grotesk text-xs font-semibold tracking-widest text-gray-500 uppercase">
                {year}
              </span>
              <div className="flex-1 border-t border-white/[0.06]" />
            </div>

            {/* Events for this year */}
            <div className="relative pl-2">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06]" />

              <AnimatePresence initial={false}>
                {byYear[year].map((record, i) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      duration: 0.22,
                      delay: Math.min(i * 0.05, 0.3),
                      ease: "easeOut",
                    }}
                  >
                    <RecordCard record={record} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Collapse toggle */}
      {hasMore && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 w-full rounded-xl border border-white/[0.06] py-2.5 text-sm text-gray-400 transition-colors hover:border-white/10 hover:text-gray-200"
        >
          Ver historial completo ({sorted.length - maxItemsBeforeCollapse} más)
        </button>
      )}
      {hasMore && showAll && (
        <button
          onClick={() => setShowAll(false)}
          className="mt-4 w-full rounded-xl border border-white/[0.06] py-2.5 text-sm text-gray-400 transition-colors hover:border-white/10 hover:text-gray-200"
        >
          Colapsar historial
        </button>
      )}
    </div>
  );
}
