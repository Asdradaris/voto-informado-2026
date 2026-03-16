import { useState } from "react";
import {
  AlertTriangle,
  Scale,
  CheckCircle,
  ClipboardList,
} from "lucide-react";
import type { Candidate } from "../../types";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Tabs } from "../ui/Tabs";

const compareTabs = [
  { id: "overview", label: "Resumen" },
  { id: "proposals", label: "Propuestas" },
  { id: "legal", label: "Legal" },
  { id: "flags", label: "Red Flags" },
];

interface CompareDataViewProps {
  candidateA: Candidate;
  candidateB: Candidate;
}

export function CompareDataView({ candidateA, candidateB }: CompareDataViewProps) {
  const [tab, setTab] = useState("overview");

  return (
    <div>
      <Tabs tabs={compareTabs} activeTab={tab} onChange={setTab} className="mb-4" />

      {tab === "overview" && (
        <div className="space-y-3">
          <CompareRow label="Edad" a={`${candidateA.age} años`} b={`${candidateB.age} años`} />
          <CompareRow label="Profesión" a={candidateA.profession} b={candidateB.profession} />
          <CompareRow label="Partido" a={candidateA.party.name} b={candidateB.party.name} />
          <CompareRow label="Ideología" a={candidateA.party.ideology} b={candidateB.party.ideology} />
          <CompareRow
            label="Encuesta (última)"
            a={candidateA.polls[0] ? `${candidateA.polls[0].percentage}%` : "N/D"}
            b={candidateB.polls[0] ? `${candidateB.polls[0].percentage}%` : "N/D"}
            highlight="higher"
            valueA={candidateA.polls[0]?.percentage ?? 0}
            valueB={candidateB.polls[0]?.percentage ?? 0}
          />
          <CompareRow
            label="Imagen negativa"
            a={candidateA.negativeImage ? `${candidateA.negativeImage}%` : "N/D"}
            b={candidateB.negativeImage ? `${candidateB.negativeImage}%` : "N/D"}
            highlight="lower"
            valueA={candidateA.negativeImage ?? 0}
            valueB={candidateB.negativeImage ?? 0}
          />
          <CompareRow
            label="Procesos legales activos"
            a={String(candidateA.legalHistory.filter((l) => l.status === "activo").length)}
            b={String(candidateB.legalHistory.filter((l) => l.status === "activo").length)}
            highlight="lower"
            valueA={candidateA.legalHistory.filter((l) => l.status === "activo").length}
            valueB={candidateB.legalHistory.filter((l) => l.status === "activo").length}
          />
          <CompareRow
            label="Red flags"
            a={String(candidateA.redFlags.length)}
            b={String(candidateB.redFlags.length)}
            highlight="lower"
            valueA={candidateA.redFlags.length}
            valueB={candidateB.redFlags.length}
          />
          <CompareRow
            label="Propuestas registradas"
            a={String(candidateA.proposals.length)}
            b={String(candidateB.proposals.length)}
          />
          <CompareRow
            label="Investigación"
            a={statusLabel(candidateA.investigationStatus)}
            b={statusLabel(candidateB.investigationStatus)}
          />
        </div>
      )}

      {tab === "proposals" && (
        <div className="grid grid-cols-2 gap-4">
          {[candidateA, candidateB].map((c) => (
            <div key={c.id} className="space-y-2">
              <p className="text-xs font-medium text-gray-400">{c.firstName}</p>
              {c.proposals.length === 0 ? (
                <p className="text-xs text-gray-600">Sin propuestas</p>
              ) : (
                c.proposals.map((p, i) => (
                  <Card key={i} className="!p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <ClipboardList className="h-3 w-3 text-amber-400" />
                      <Badge>
                        {p.area.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-gray-200">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-gray-500">
                      {p.summary.slice(0, 100)}
                      {p.summary.length > 100 ? "..." : ""}
                    </p>
                    <Badge
                      variant={
                        p.feasibility === "alta"
                          ? "success"
                          : p.feasibility === "baja"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {p.feasibility.replace("_", " ")}
                    </Badge>
                  </Card>
                ))
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "legal" && (
        <div className="grid grid-cols-2 gap-4">
          {[candidateA, candidateB].map((c) => (
            <div key={c.id} className="space-y-2">
              <p className="text-xs font-medium text-gray-400">{c.firstName}</p>
              {c.legalHistory.length === 0 ? (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500/5 p-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-emerald-400">Sin procesos</span>
                </div>
              ) : (
                c.legalHistory.map((l) => (
                  <Card key={l.id} className="!p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <Scale className="h-3 w-3 text-red-400" />
                      <Badge
                        variant={l.status === "activo" ? "danger" : "success"}
                      >
                        {l.status}
                      </Badge>
                      <span className="ml-auto text-[10px] text-gray-500">
                        {l.severity}/5
                      </span>
                    </div>
                    <p className="text-xs font-medium text-gray-200">
                      {l.title}
                    </p>
                  </Card>
                ))
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "flags" && (
        <div className="grid grid-cols-2 gap-4">
          {[candidateA, candidateB].map((c) => (
            <div key={c.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-400">{c.firstName}</p>
                <Badge variant={c.redFlags.length === 0 ? "success" : "danger"}>
                  {c.redFlags.length} alertas
                </Badge>
              </div>
              {c.redFlags.length === 0 ? (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500/5 p-3">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-emerald-400">Sin alertas</span>
                </div>
              ) : (
                c.redFlags.map((f, i) => (
                  <Card key={i} className="!p-3">
                    <div className="mb-1 flex items-center gap-1.5">
                      <AlertTriangle
                        className={`h-3 w-3 ${
                          f.severity === "critico"
                            ? "text-red-500"
                            : f.severity === "alto"
                            ? "text-orange-400"
                            : "text-amber-400"
                        }`}
                      />
                      <Badge
                        variant={
                          f.severity === "critico"
                            ? "critical"
                            : f.severity === "alto"
                            ? "danger"
                            : "warning"
                        }
                      >
                        {f.severity}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-gray-200">
                      {f.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-gray-500">
                      {f.description.slice(0, 80)}
                      {f.description.length > 80 ? "..." : ""}
                    </p>
                  </Card>
                ))
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CompareRow({
  label,
  a,
  b,
  highlight,
  valueA,
  valueB,
}: {
  label: string;
  a: string;
  b: string;
  highlight?: "higher" | "lower";
  valueA?: number;
  valueB?: number;
}) {
  let aWins = false;
  let bWins = false;

  if (highlight && valueA !== undefined && valueB !== undefined && valueA !== valueB) {
    if (highlight === "higher") {
      aWins = valueA > valueB;
      bWins = valueB > valueA;
    } else {
      aWins = valueA < valueB;
      bWins = valueB < valueA;
    }
  }

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-lg bg-white/[0.02] px-3 py-2">
      <span
        className={`text-right text-sm ${
          aWins ? "font-semibold text-emerald-400" : "text-gray-300"
        }`}
      >
        {a}
      </span>
      <span className="text-[10px] text-gray-600">{label}</span>
      <span
        className={`text-sm ${
          bWins ? "font-semibold text-emerald-400" : "text-gray-300"
        }`}
      >
        {b}
      </span>
    </div>
  );
}

function statusLabel(s: Candidate["investigationStatus"]): string {
  switch (s) {
    case "completo":
      return "Completa";
    case "en_progreso":
      return "En progreso";
    default:
      return "Pendiente";
  }
}
