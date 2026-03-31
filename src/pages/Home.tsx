import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import { motion } from "framer-motion";
import { candidates } from "../data/candidates";
import { CandidateCard } from "../components/candidate/CandidateCard";
import { SearchInput } from "../components/ui/SearchInput";
import { CountdownTimer } from "../components/ui/CountdownTimer";
import { useAppStore } from "../store/useAppStore";
import { calculateTotalScore, getScoreColor } from "../lib/scoring-engine";
import { DEFAULT_SCORING_CONFIG } from "../config/scoring";
import { ProgressBar } from "../components/ui/ProgressBar";

type SortOption = "polls" | "name" | "score";

export function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("polls");
  useDocumentTitle("Candidatos Presidenciales");
  const { scores } = useAppStore();

  const filtered = useMemo(() => {
    let result = candidates.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.party.name.toLowerCase().includes(search.toLowerCase())
    );

    result.sort((a, b) => {
      if (sort === "name") return a.lastName.localeCompare(b.lastName);
      if (sort === "score") {
        const sa = calculateTotalScore(
          DEFAULT_SCORING_CONFIG,
          scores.filter((s) => s.candidateId === a.id)
        );
        const sb = calculateTotalScore(
          DEFAULT_SCORING_CONFIG,
          scores.filter((s) => s.candidateId === b.id)
        );
        return sb - sa;
      }
      const pa = a.polls[0]?.percentage ?? 0;
      const pb = b.polls[0]?.percentage ?? 0;
      return pb - pa;
    });

    return result;
  }, [search, sort, scores]);

  const rankedCandidates = useMemo(() => {
    return candidates
      .map((c) => {
        const cs = scores.filter((s) => s.candidateId === c.id);
        if (cs.length === 0) return null;
        return {
          candidate: c,
          score: calculateTotalScore(DEFAULT_SCORING_CONFIG, cs),
        };
      })
      .filter(Boolean)
      .sort((a, b) => b!.score - a!.score) as {
      candidate: (typeof candidates)[0];
      score: number;
    }[];
  }, [scores]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Hero */}
      <div className="mb-8 text-center">
        <h1 className="font-bold tracking-tight text-gray-100" style={{ fontSize: "clamp(1.2rem, 5vw, 2.25rem)" }}>
          VOTO INFORMADO{" "}
          <span className="text-amber-400">2026</span>
        </h1>
        <p className="mt-2 text-gray-400">
          Investiga, evalúa y compara candidatos con datos verificables
        </p>
        <div className="mt-4 flex justify-center lg:hidden">
          <CountdownTimer />
        </div>
      </div>

      {/* Context Banner */}
      <div className="mb-6 rounded-xl border border-white/[0.06] bg-[#0D0D20] p-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
          <span>
            <strong className="text-gray-200">36</strong> candidatos
          </span>
          <span className="text-white/10">|</span>
          <span>
            Ninguno <strong className="text-gray-200">&gt;11%</strong>
          </span>
          <span className="text-white/10">|</span>
          <span>
            <strong className="text-gray-200">89.8%</strong> rechazo al
            Congreso
          </span>
          <span className="text-white/10">|</span>
          <span>
            <strong className="text-gray-200">23%</strong> voto blanco
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          className="flex-1"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-lg border border-white/[0.06] bg-[#0D0D20] px-3 py-2.5 text-sm text-gray-300 outline-none focus:border-amber-500/30"
        >
          <option value="polls">Ordenar: Encuestas</option>
          <option value="name">Ordenar: Nombre</option>
          <option value="score">Ordenar: Mi Score</option>
        </select>
      </div>

      {/* Candidate Grid */}
      <div className="flex flex-wrap justify-center gap-4">
        {filtered.map((candidate, i) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
          >
            <CandidateCard candidate={candidate} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-gray-500">
          No se encontraron candidatos
        </p>
      )}

      {/* Mi Ranking */}
      {rankedCandidates.length > 0 && (
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-100">
              Mi Ranking Personal
            </h2>
            <button
              onClick={() => navigate("/ranking")}
              className="text-xs text-amber-400 transition-colors hover:text-amber-300"
            >
              Ver completo →
            </button>
          </div>
          <div className="space-y-2">
            {rankedCandidates.map((item, i) => (
              <motion.div
                key={item.candidate.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                onClick={() => navigate(`/candidate/${item.candidate.id}`)}
                className="flex cursor-pointer items-center gap-4 rounded-lg border border-white/[0.06] bg-[#0D0D20] p-3 transition-colors hover:border-amber-500/20 hover:bg-[#111128]"
              >
                <span
                  className="w-8 text-center text-lg font-bold"
                  style={{ color: getScoreColor(item.score) }}
                >
                  #{i + 1}
                </span>
                <span className="flex-1 text-sm font-medium text-gray-200">
                  {item.candidate.name}
                </span>
                <ProgressBar
                  value={item.score}
                  className="w-32"
                  size="sm"
                />
                <span
                  className="w-12 text-right text-sm font-bold"
                  style={{ color: getScoreColor(item.score) }}
                >
                  {Math.round(item.score * 10) / 10}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
