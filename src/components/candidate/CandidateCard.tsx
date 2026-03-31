import { useNavigate } from "react-router-dom";
import { AlertTriangle, TrendingUp, Star, StarOff, Scale } from "lucide-react";
import type { Candidate } from "../../types";
import { Badge } from "../ui/Badge";
import { ProgressBar } from "../ui/ProgressBar";
import { CandidateAvatar } from "./CandidateAvatar";
import { useAppStore } from "../../store/useAppStore";
import { calculateTotalScore } from "../../lib/scoring-engine";
import { DEFAULT_SCORING_CONFIG } from "../../config/scoring";

interface CandidateCardProps {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const navigate = useNavigate();
  const { scores, favorites, toggleFavorite } = useAppStore();

  const candidateScores = scores.filter(
    (s) => s.candidateId === candidate.id
  );
  const hasScores = candidateScores.length > 0;
  const totalScore = hasScores
    ? calculateTotalScore(DEFAULT_SCORING_CONFIG, candidateScores)
    : null;
  const isFavorite = favorites.includes(candidate.id);

  const latestPoll = candidate.polls.length > 0
    ? candidate.polls.reduce((a, b) =>
        new Date(a.date) > new Date(b.date) ? a : b
      )
    : null;

  return (
    <div
      className="group relative cursor-pointer rounded-xl border border-white/[0.06] bg-[#0D0D20] p-5 transition-all duration-200 hover:bg-[#111128] hover:shadow-lg"
      style={{
        // @ts-expect-error CSS custom property
        "--party-color": candidate.party.color,
      }}
      onClick={() => navigate(`/candidate/${candidate.id}`)}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = candidate.party.color + "50")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <CandidateAvatar
            photo={candidate.photo}
            name={candidate.name}
            partyColor={candidate.party.color}
            size="md"
          />
          <div>
            <h3 className="font-semibold text-gray-100">{candidate.name}</h3>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: candidate.party.color }}
              />
              <span className="text-xs text-gray-400">
                {candidate.party.name}
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-gray-500">
              {candidate.profession} · {candidate.age} años
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(candidate.id);
          }}
          className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-white/5 hover:text-amber-400"
        >
          {isFavorite ? (
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          ) : (
            <StarOff className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Legal quick indicator */}
      {candidate.legalHistory.some((r) => r.status === "activo") && (
        <div className="mt-2 flex items-center gap-1.5 rounded-md bg-red-500/5 px-2 py-1">
          <Scale className="h-3 w-3 text-red-400" />
          <span className="text-[10px] text-red-400">
            {candidate.legalHistory.filter((r) => r.status === "activo").length} proceso(s) activo(s)
          </span>
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
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
        {candidate.redFlags.length > 0 && (
          <Badge variant="warning">
            <AlertTriangle className="h-3 w-3" />
            {candidate.redFlags.length} alerta{candidate.redFlags.length > 1 ? "s" : ""}
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
              ? "Investigado"
              : "Pendiente"}
          </Badge>
        )}
      </div>

      {totalScore !== null && (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-gray-400">Mi evaluación</span>
            <span className="text-sm font-bold text-gray-200">
              {Math.round(totalScore * 10) / 10}
            </span>
          </div>
          <ProgressBar value={totalScore} size="sm" />
        </div>
      )}
      {/* Hover CTA */}
      <div className="mt-3 overflow-hidden text-center">
        <span
          className="text-xs font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ color: candidate.party.color }}
        >
          Ver perfil →
        </span>
      </div>
    </div>
  );
}
