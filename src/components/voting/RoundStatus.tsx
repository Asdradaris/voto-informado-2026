import { Clock, CheckCircle2, Search, Lock } from "lucide-react";
import { LiveCounter } from "./LiveCounter";
import type { VotingRound } from "@/types";

interface RoundStatusProps {
  round: VotingRound | null;
  totalVoters: number;
  status: "open" | "voted" | "closed" | "investigating";
  isConnected: boolean;
}

function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
  });
}

export function RoundStatus({ round, totalVoters, status, isConnected }: RoundStatusProps) {
  if (!round) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Lock className="h-4 w-4" />
        No hay ronda activa
      </div>
    );
  }

  const statusConfig = {
    open: {
      icon: Clock,
      label: "Ronda abierta",
      color: "text-amber-400",
      dotColor: "bg-amber-400",
    },
    voted: {
      icon: CheckCircle2,
      label: "Ya votaste",
      color: "text-emerald-400",
      dotColor: "bg-emerald-400",
    },
    closed: {
      icon: Lock,
      label: "Ronda cerrada",
      color: "text-gray-400",
      dotColor: "bg-gray-400",
    },
    investigating: {
      icon: Search,
      label: "Investigando...",
      color: "text-purple-400",
      dotColor: "bg-purple-400",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      <div className={`flex items-center gap-2 ${config.color}`}>
        <Icon className="h-4 w-4" />
        <span className="font-medium">{config.label}</span>
      </div>

      <span className="text-gray-600">·</span>

      <span className="text-gray-400">
        Ronda {round.roundNumber}
      </span>

      <span className="text-gray-600">·</span>

      <span className="text-gray-500">
        Cierra: {formatDateShort(round.endsAt)}
      </span>

      <span className="text-gray-600">·</span>

      <span className="font-mono text-gray-400">
        <LiveCounter value={totalVoters} className="text-amber-400" /> votos
      </span>

      {isConnected && (
        <span className="flex items-center gap-1 text-[10px] text-emerald-500/60">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          EN VIVO
        </span>
      )}
    </div>
  );
}
