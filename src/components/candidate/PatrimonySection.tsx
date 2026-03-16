import {
  Building2,
  Wallet,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Banknote,
  Home,
  Briefcase,
  CreditCard,
} from "lucide-react";
import type { PatrimonyRecord, ConflictOfInterest } from "../../types";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { formatCurrency } from "../../lib/utils";

const typeConfig: Record<
  PatrimonyRecord["type"],
  { icon: React.ElementType; label: string; color: string }
> = {
  ingreso: { icon: Wallet, label: "Ingresos", color: "#2ED573" },
  propiedad: { icon: Home, label: "Propiedad", color: "#70A1FF" },
  empresa: { icon: Briefcase, label: "Empresa", color: "#F5A623" },
  deuda: { icon: CreditCard, label: "Deuda", color: "#FF4757" },
  otro: { icon: HelpCircle, label: "Otro", color: "#666680" },
};

interface PatrimonySectionProps {
  patrimony: PatrimonyRecord[];
  conflicts: ConflictOfInterest[];
}

export function PatrimonySection({ patrimony, conflicts }: PatrimonySectionProps) {
  if (patrimony.length === 0 && conflicts.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Sin datos patrimoniales registrados aún
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patrimony records */}
      {patrimony.length > 0 && (
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-medium text-gray-200">
            <Banknote className="h-4 w-4 text-amber-400" />
            Patrimonio Declarado
          </h4>
          {patrimony.map((record, i) => {
            const config = typeConfig[record.type];
            const Icon = config.icon;

            return (
              <Card key={i}>
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: config.color + "15" }}
                  >
                    <Icon className="h-4 w-4" style={{ color: config.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Badge>{config.label}</Badge>
                      <Badge
                        variant={record.verified ? "success" : "warning"}
                      >
                        {record.verified ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" /> Verificado
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <HelpCircle className="h-3 w-3" /> No verificado
                          </span>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300">
                      {record.description}
                    </p>
                    {record.estimatedValue && (
                      <p className="mt-1 text-sm font-medium text-amber-400">
                        Valor estimado: {formatCurrency(record.estimatedValue)}
                      </p>
                    )}
                    {record.discrepancy && (
                      <div className="mt-2 flex items-start gap-2 rounded-lg bg-amber-500/5 p-2.5">
                        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                        <p className="text-xs text-amber-400/80">
                          {record.discrepancy}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Conflicts of interest */}
      {conflicts.length > 0 && (
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-medium text-gray-200">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            Conflictos de Interés
          </h4>
          {conflicts.map((conflict, i) => (
            <Card key={i}>
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    conflict.severity === "alto"
                      ? "bg-red-500/10"
                      : conflict.severity === "medio"
                      ? "bg-orange-500/10"
                      : "bg-amber-500/10"
                  }`}
                >
                  <Building2
                    className={`h-4 w-4 ${
                      conflict.severity === "alto"
                        ? "text-red-400"
                        : conflict.severity === "medio"
                        ? "text-orange-400"
                        : "text-amber-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <Badge
                    variant={
                      conflict.severity === "alto"
                        ? "danger"
                        : conflict.severity === "medio"
                        ? "warning"
                        : "info"
                    }
                  >
                    Severidad: {conflict.severity}
                  </Badge>
                  <p className="mt-2 text-sm text-gray-300">
                    {conflict.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {conflict.entities.map((entity, j) => (
                      <span
                        key={j}
                        className="rounded-md bg-white/[0.04] px-2 py-0.5 text-xs text-gray-400"
                      >
                        {entity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
