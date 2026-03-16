import { AlertOctagon, CheckCircle, Clock, FileWarning } from "lucide-react";
import type { LegalRecord } from "../../types";
import { Badge } from "../ui/Badge";
import { formatDate } from "../../lib/utils";

const statusConfig: Record<
  LegalRecord["status"],
  { icon: React.ElementType; variant: "danger" | "success" | "warning" | "info" | "critical"; label: string }
> = {
  activo: { icon: AlertOctagon, variant: "danger", label: "Activo" },
  archivado: { icon: CheckCircle, variant: "success", label: "Archivado" },
  resuelto: { icon: CheckCircle, variant: "success", label: "Resuelto" },
  apelacion: { icon: Clock, variant: "warning", label: "En apelación" },
  profugo: { icon: FileWarning, variant: "critical", label: "Prófugo" },
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

interface LegalTimelineProps {
  records: LegalRecord[];
}

export function LegalTimeline({ records }: LegalTimelineProps) {
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

  const sorted = [...records].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="relative space-y-0">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/[0.06]" />

      {sorted.map((record) => {
        const config = statusConfig[record.status];
        const Icon = config.icon;

        return (
          <div key={record.id} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Timeline dot */}
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.06] bg-[#0D0D20]">
              <Icon
                className={`h-4 w-4 ${
                  record.status === "activo"
                    ? "text-red-400"
                    : record.status === "profugo"
                    ? "text-red-500"
                    : record.status === "resuelto" || record.status === "archivado"
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1 rounded-xl border border-white/[0.06] bg-[#0D0D20] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={config.variant}>{config.label}</Badge>
                <Badge>{typeLabels[record.type]}</Badge>
                <div className="ml-auto flex items-center gap-1.5">
                  {Array.from({ length: 5 }, (_, j) => (
                    <div
                      key={j}
                      className={`h-1.5 w-3 rounded-full ${
                        j < record.severity
                          ? record.severity >= 4
                            ? "bg-red-500"
                            : record.severity >= 3
                            ? "bg-orange-500"
                            : "bg-amber-500"
                          : "bg-white/[0.06]"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-[10px] text-gray-500">
                    {record.severity}/5
                  </span>
                </div>
              </div>

              <h4 className="mt-2 text-sm font-semibold text-gray-100">
                {record.title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-gray-400">
                {record.description}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span>{formatDate(record.date)}</span>
                <span className="text-white/10">|</span>
                <span>Fuente: {record.source.name}</span>
                {record.relatedEntities && record.relatedEntities.length > 0 && (
                  <>
                    <span className="text-white/10">|</span>
                    <span>
                      Vinculados: {record.relatedEntities.join(", ")}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
