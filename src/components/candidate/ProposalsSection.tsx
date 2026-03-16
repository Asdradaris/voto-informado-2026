import { useState, useMemo } from "react";
import {
  Shield,
  TrendingUp,
  GraduationCap,
  Heart,
  Building2,
  Leaf,
  Scale,
  Gavel,
  Users,
  Cpu,
  Briefcase,
  Wheat,
  Globe,
  Landmark,
  HelpCircle,
} from "lucide-react";
import type { Proposal, ProposalArea } from "../../types";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

const areaConfig: Record<
  ProposalArea,
  { label: string; icon: React.ElementType; color: string }
> = {
  seguridad: { label: "Seguridad", icon: Shield, color: "#FF4757" },
  economia: { label: "Economía", icon: TrendingUp, color: "#F5A623" },
  educacion: { label: "Educación", icon: GraduationCap, color: "#70A1FF" },
  salud: { label: "Salud", icon: Heart, color: "#FF6B81" },
  infraestructura: { label: "Infraestructura", icon: Building2, color: "#7B68EE" },
  medio_ambiente: { label: "Medio Ambiente", icon: Leaf, color: "#2ED573" },
  anticorrupcion: { label: "Anticorrupción", icon: Scale, color: "#FFA502" },
  justicia: { label: "Justicia", icon: Gavel, color: "#A29BFE" },
  politica_social: { label: "Política Social", icon: Users, color: "#FF9FF3" },
  tecnologia: { label: "Tecnología", icon: Cpu, color: "#54A0FF" },
  trabajo: { label: "Trabajo", icon: Briefcase, color: "#5F27CD" },
  agricultura: { label: "Agricultura", icon: Wheat, color: "#10AC84" },
  relaciones_exteriores: { label: "Relaciones Ext.", icon: Globe, color: "#48DBFB" },
  reforma_estado: { label: "Reforma del Estado", icon: Landmark, color: "#C8D6E5" },
  otro: { label: "Otro", icon: HelpCircle, color: "#666680" },
};

const feasibilityConfig = {
  alta: { variant: "success" as const, label: "Alta viabilidad" },
  media: { variant: "warning" as const, label: "Viabilidad media" },
  baja: { variant: "danger" as const, label: "Baja viabilidad" },
  sin_evaluar: { variant: "pending" as const, label: "Sin evaluar" },
};

interface ProposalsSectionProps {
  proposals: Proposal[];
}

export function ProposalsSection({ proposals }: ProposalsSectionProps) {
  const [selectedArea, setSelectedArea] = useState<ProposalArea | "all">("all");

  const areas = useMemo(() => {
    const unique = [...new Set(proposals.map((p) => p.area))];
    return unique.sort();
  }, [proposals]);

  const filtered =
    selectedArea === "all"
      ? proposals
      : proposals.filter((p) => p.area === selectedArea);

  if (proposals.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Sin propuestas registradas aún. Pendiente de revisión del plan de gobierno.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Area filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedArea("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            selectedArea === "all"
              ? "bg-amber-500/15 text-amber-400"
              : "bg-white/[0.03] text-gray-400 hover:bg-white/[0.06]"
          }`}
        >
          Todas ({proposals.length})
        </button>
        {areas.map((area) => {
          const config = areaConfig[area];
          const count = proposals.filter((p) => p.area === area).length;
          return (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedArea === area
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-white/[0.03] text-gray-400 hover:bg-white/[0.06]"
              }`}
            >
              <config.icon className="h-3 w-3" />
              {config.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Proposals list */}
      <div className="space-y-3">
        {filtered.map((proposal, i) => {
          const area = areaConfig[proposal.area];
          const feasibility = feasibilityConfig[proposal.feasibility];
          const Icon = area.icon;

          return (
            <Card key={i}>
              <div className="flex items-start gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: area.color + "15" }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: area.color }}
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <Badge>{area.label}</Badge>
                    <Badge variant={feasibility.variant}>
                      {feasibility.label}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-100">
                    {proposal.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">
                    {proposal.summary}
                  </p>
                  {proposal.details && (
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                      {proposal.details}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
