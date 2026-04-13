import { CheckCircle2, Circle, Search, Clock } from "lucide-react";
import type { VotingRound } from "@/types";

interface VotingTimelineProps {
  currentRound: VotingRound | null;
}

interface TimelineStep {
  label: string;
  sublabel: string;
  status: "completed" | "active" | "upcoming";
  icon: typeof Clock;
}

export function VotingTimeline({ currentRound }: VotingTimelineProps) {
  if (!currentRound) return null;

  const now = new Date();
  const endsAt = new Date(currentRound.endsAt);
  const isOpen = currentRound.isActive && now < endsAt;
  const isClosed = !currentRound.isActive || now >= endsAt;
  const hasWinner = !!currentRound.winnerCandidateId;

  const steps: TimelineStep[] = [
    {
      label: `Ronda ${currentRound.roundNumber}`,
      sublabel: isOpen ? "Votación abierta" : "Votación cerrada",
      status: isOpen ? "active" : "completed",
      icon: isOpen ? Clock : CheckCircle2,
    },
    {
      label: "Cierre y conteo",
      sublabel: new Date(currentRound.endsAt).toLocaleDateString("es-PE", {
        day: "numeric",
        month: "short",
      }),
      status: isClosed ? (hasWinner ? "completed" : "active") : "upcoming",
      icon: isClosed ? CheckCircle2 : Circle,
    },
    {
      label: "Investigación",
      sublabel: hasWinner ? "En curso" : "Próximamente",
      status: hasWinner ? "active" : "upcoming",
      icon: Search,
    },
    {
      label: "Informe publicado",
      sublabel: "48h después del cierre",
      status: "upcoming",
      icon: Circle,
    },
  ];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-200">
        Proceso de esta ronda
      </h3>

      <div className="flex items-start gap-0">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-1 flex-col items-center text-center">
            {/* Connector + Icon */}
            <div className="relative flex w-full items-center justify-center">
              {i > 0 && (
                <div
                  className={`absolute left-0 right-1/2 top-1/2 h-px ${
                    step.status === "upcoming" ? "bg-white/[0.06]" : "bg-amber-500/30"
                  }`}
                />
              )}
              {i < steps.length - 1 && (
                <div
                  className={`absolute left-1/2 right-0 top-1/2 h-px ${
                    steps[i + 1].status === "upcoming"
                      ? "bg-white/[0.06]"
                      : "bg-amber-500/30"
                  }`}
                />
              )}
              <div
                className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full ${
                  step.status === "active"
                    ? "bg-amber-500/20 text-amber-400"
                    : step.status === "completed"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-white/[0.04] text-gray-600"
                }`}
              >
                <step.icon className="h-3.5 w-3.5" />
              </div>
            </div>

            <p
              className={`mt-2 text-[10px] font-medium leading-tight sm:text-xs ${
                step.status === "upcoming" ? "text-gray-600" : "text-gray-300"
              }`}
            >
              {step.label}
            </p>
            <p className="mt-0.5 text-[9px] text-gray-600 sm:text-[10px]">
              {step.sublabel}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
