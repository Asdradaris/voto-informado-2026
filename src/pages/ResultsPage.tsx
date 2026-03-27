import { useRealtimeVotes } from "@/hooks/useRealtimeVotes";
import { useVoting } from "@/hooks/useVoting";
import { LiveResultsChart } from "@/components/voting/LiveResultsChart";
import { RoundStatus } from "@/components/voting/RoundStatus";
import { VotingTimeline } from "@/components/voting/VotingTimeline";
import { BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export function ResultsPage() {
  const { currentRound, votedFor, roundStatus } = useVoting();
  const roundNumber = currentRound?.roundNumber ?? 1;
  const { counts, totalVoters, isConnected } = useRealtimeVotes(roundNumber);

  return (
    <section className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-amber-400" />
          <h2 className="text-lg font-bold text-gray-100 sm:text-xl">
            Resultados de la Encuesta
          </h2>
        </div>
        <p className="text-sm text-gray-400">
          Resultados en tiempo real de la encuesta ciudadana.
        </p>
      </div>

      <RoundStatus
        round={currentRound}
        totalVoters={totalVoters}
        status={roundStatus}
        isConnected={isConnected}
      />

      <VotingTimeline currentRound={currentRound} />

      <LiveResultsChart
        counts={counts}
        totalVoters={totalVoters}
        votedFor={votedFor}
        maxVisible={counts.length}
      />

      {roundStatus === "open" && (
        <div className="text-center">
          <Link
            to="/encuesta"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500/15 px-4 py-2 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/25"
          >
            Votar ahora
          </Link>
        </div>
      )}

      <p className="text-center text-[10px] leading-relaxed text-gray-600">
        Encuesta ciudadana voluntaria y no oficial. 1 dispositivo = 1 voto por ronda.
      </p>
    </section>
  );
}
