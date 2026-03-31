import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  ExternalLink,
  GitCompareArrows,
  GraduationCap,
  Check,
  Share2,
} from "lucide-react";
import { getCandidateById } from "../data/candidates";
import { shareCandidate } from "../lib/share";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { Tabs } from "../components/ui/Tabs";
import { CandidateAvatar } from "../components/candidate/CandidateAvatar";
import { RedFlagsBanner } from "../components/candidate/RedFlagsBanner";
import { ProposalsSection } from "../components/candidate/ProposalsSection";
import { LegalTimeline } from "../components/candidate/LegalTimeline";
import { PatrimonySection } from "../components/candidate/PatrimonySection";
import { PollsChart } from "../components/candidate/PollsChart";
import { ScoringPanel } from "../components/scoring/ScoringPanel";
import { formatDate } from "../lib/utils";
import { useDocumentTitle } from "../lib/useDocumentTitle";

const tabs = [
  { id: "propuestas", label: "Propuestas" },
  { id: "legal", label: "Historial Legal" },
  { id: "patrimonio", label: "Patrimonio" },
  { id: "encuestas", label: "Encuestas" },
  { id: "educacion", label: "Educación" },
  { id: "fuentes", label: "Fuentes" },
];

export function CandidatePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("propuestas");
  const [copied, setCopied] = useState(false);

  const candidate = getCandidateById(id ?? "");
  useDocumentTitle(candidate ? `${candidate.name} — ${candidate.party.name}` : "Candidato no encontrado");

  if (!candidate) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-400">Candidato no encontrado</p>
      </div>
    );
  }

  const latestPoll =
    candidate.polls.length > 0
      ? candidate.polls.reduce((a, b) =>
          new Date(a.date) > new Date(b.date) ? a : b
        )
      : null;

  const handleShare = async () => {
    const success = await shareCandidate(candidate);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-gray-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </button>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
        <CandidateAvatar
          photo={candidate.photo}
          name={candidate.name}
          partyColor={candidate.party.color}
          size="lg"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-100">
            {candidate.name}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-400 sm:gap-3">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: candidate.party.color }}
              />
              {candidate.party.name}
            </span>
            <Badge>{candidate.party.ideology}</Badge>
            {latestPoll && (
              <Badge variant="info">
                <TrendingUp className="h-3 w-3" />
                {latestPoll.percentage}%
              </Badge>
            )}
            {candidate.negativeImage && (
              <Badge variant="danger">
                {candidate.negativeImage}% rechazo
              </Badge>
            )}
            {candidate.investigationStatus !== "en_progreso" && (
              <Badge
                variant={
                  candidate.investigationStatus === "completo"
                    ? "success"
                    : "pending"
                }
              >
                {candidate.investigationStatus === "completo"
                  ? "Investigación completa"
                  : "Pendiente de investigar"}
              </Badge>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-400">
            {candidate.age} años · {candidate.profession} ·{" "}
            {candidate.birthplace}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/compare?a=${candidate.id}`)}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-amber-500/30 hover:text-amber-400"
          >
            <GitCompareArrows className="h-4 w-4" />
            <span className="hidden sm:inline">Comparar</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-amber-500/30 hover:text-amber-400"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {copied ? "Copiado" : "Compartir"}
            </span>
          </button>
        </div>
      </div>

      {/* Political History */}
      <Card className="mb-6">
        <p className="text-sm leading-relaxed text-gray-300">
          {candidate.politicalHistory}
        </p>
      </Card>

      {/* Red Flags */}
      {candidate.redFlags.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-200">
            Alertas ({candidate.redFlags.length})
          </h3>
          <RedFlagsBanner flags={candidate.redFlags} />
        </div>
      )}

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          <div className="mt-4">
            {activeTab === "propuestas" && (
              <ProposalsSection proposals={candidate.proposals} />
            )}

            {activeTab === "legal" && (
              <LegalTimeline records={candidate.legalHistory} />
            )}

            {activeTab === "patrimonio" && (
              <PatrimonySection
                patrimony={candidate.patrimony}
                conflicts={candidate.conflicts}
              />
            )}

            {activeTab === "encuestas" && (
              <PollsChart
                polls={candidate.polls}
                negativeImage={candidate.negativeImage}
              />
            )}

            {activeTab === "educacion" && (
              <div className="space-y-3">
                {candidate.education.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Sin datos educativos registrados
                  </p>
                ) : (
                  candidate.education.map((edu, i) => (
                    <Card key={i}>
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                          <GraduationCap className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-gray-100">
                              {edu.degree}
                            </h4>
                            <Badge
                              variant={edu.verified ? "success" : "warning"}
                            >
                              {edu.verified ? "Verificado" : "No verificado"}
                            </Badge>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-400">
                            {edu.institution} · {edu.year}
                          </p>
                          {edu.notes && (
                            <p className="mt-1 text-xs text-amber-400/80">
                              {edu.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === "fuentes" && (
              <div className="space-y-3">
                {candidate.sources.map((source, i) => (
                  <Card key={i}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-200">
                          {source.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {source.type} · Confiabilidad: {source.reliability} ·{" "}
                          {formatDate(source.date)}
                        </p>
                      </div>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-amber-400 transition-colors hover:bg-amber-500/10 hover:text-amber-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scoring Sidebar */}
        <div>
          <Card className="sticky top-20">
            <ScoringPanel candidateId={candidate.id} />
          </Card>
        </div>
      </div>

      {/* Investigator Notes */}
      {candidate.notes && (
        <Card className="mt-6">
          <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
            Notas del investigador
          </h4>
          <p className="text-sm italic text-gray-400">{candidate.notes}</p>
        </Card>
      )}

      {/* Last Updated */}
      <p className="mt-6 text-center text-xs text-gray-600">
        Última actualización: {formatDate(candidate.lastUpdated)}
      </p>
    </div>
  );
}
