import { useMemo, useState } from "react";
import { candidates } from "../data/candidates";
import { useAppStore } from "../store/useAppStore";
import { calculateRanking } from "../lib/scoring-engine";
import { DEFAULT_SCORING_CONFIG } from "../config/scoring";
import { Card } from "../components/ui/Card";
import { WeightSliders } from "../components/scoring/WeightSliders";
import { RankingTable } from "../components/scoring/RankingTable";
import { Share2, Check } from "lucide-react";
import { shareRanking } from "../lib/share";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export function RankingPage() {
  const { scores, weights } = useAppStore();
  const [shared, setShared] = useState(false);
  useDocumentTitle("Mi Ranking Personal");

  const config = useMemo(
    () => ({
      ...DEFAULT_SCORING_CONFIG,
      dimensions: DEFAULT_SCORING_CONFIG.dimensions.map((d) => ({
        ...d,
        weight: weights[d.id] ?? d.weight,
      })),
    }),
    [weights]
  );

  const scoredIds = [...new Set(scores.map((s) => s.candidateId))];

  const rankings = useMemo(
    () => calculateRanking(config, scores, scoredIds),
    [config, scores, scoredIds]
  );

  const handleShareRanking = async () => {
    if (rankings.length === 0) return;
    const items = rankings.map((r) => ({
      name:
        candidates.find((c) => c.id === r.candidateId)?.name ?? r.candidateId,
      score: r.totalScore,
    }));
    const success = await shareRanking(items);
    if (success) {
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">
          Mi Ranking Personal
        </h1>
        {rankings.length > 0 && (
          <button
            onClick={handleShareRanking}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-amber-500/30 hover:text-amber-400"
          >
            {shared ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
            {shared ? "Copiado" : "Compartir ranking"}
          </button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        {/* Rankings */}
        <div>
          <RankingTable rankings={rankings} candidates={candidates} />
        </div>

        {/* Weights sidebar */}
        <div>
          <Card className="sticky top-20">
            <WeightSliders />
          </Card>
        </div>
      </div>
    </div>
  );
}
