import { BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useBinaryPoll } from "@/hooks/useBinaryPoll";
import { BinaryVoteBar } from "@/components/voting/BinaryVoteBar";
import { POLL_QUESTION } from "@/config/finalists";

export function ResultsPage() {
  const { counts, totalVoters, isOpen, isLoading } = useBinaryPoll();

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500/30 border-t-amber-500" />
      </div>
    );
  }

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
          {POLL_QUESTION} — resultados en tiempo real.
        </p>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6">
        <BinaryVoteBar
          counts={counts}
          totalVoters={totalVoters}
          isClosed={!isOpen}
        />
      </div>

      {isOpen && (
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
        Encuesta ciudadana no oficial. Sin valor estadístico formal. 1 dispositivo = 1 voto. Resultados en tiempo real.
      </p>
    </section>
  );
}
