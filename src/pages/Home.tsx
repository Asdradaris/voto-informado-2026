import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import { candidates } from "../data/candidates";
import { SECOND_ROUND_DATE, getFinalists } from "../config/finalists";
import { Countdown } from "../components/home/Countdown";
import { VSSeparator } from "../components/home/VSSeparator";
import { FinalistCard } from "../components/home/FinalistCard";

const FIRST_ROUND_RESULTS: Record<string, number> = {
  "keiko-fujimori": 16.95,
  "rafael-lopez-aliaga": 14.64,
};

const HOW_TO_STEPS = [
  {
    number: "01",
    title: "Investiga",
    description: "Lee los perfiles completos: propuestas, historial legal, conflictos de interés y fuentes verificadas.",
  },
  {
    number: "02",
    title: "Compara",
    description: "Pon a los dos candidatos lado a lado en todas las dimensiones que importan.",
  },
  {
    number: "03",
    title: "Evalúa",
    description: "Asigna tu propio score por área y construye un ranking personalizado.",
  },
];

export function Home() {
  useDocumentTitle("Segunda Vuelta 2026 · Voto Informado");
  const navigate = useNavigate();
  const finalists = getFinalists(candidates);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">

      {/* ── SECCIÓN 1: COUNTDOWN ─────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
          <span
            className="text-xs font-semibold uppercase tracking-widest text-amber-400"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Segunda vuelta · 7 de junio 2026
          </span>
        </div>

        {/* Countdown */}
        <div className="mb-6">
          <Countdown targetDate={SECOND_ROUND_DATE} />
        </div>

        {/* Tagline */}
        <p
          className="mx-auto max-w-lg text-lg leading-relaxed text-gray-400"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          Dos candidatos.{" "}
          <span className="text-gray-200 font-medium">Una decisión.</span>
          {" "}Investígalos antes de votar.
        </p>
      </motion.section>

      {/* ── SECCIÓN 2: LOS DOS FINALISTAS ───────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-10"
      >
        <h2
          className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-gray-500"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          Los finalistas
        </h2>

        {/* Cards grid */}
        <div className="flex flex-col items-stretch gap-0 md:grid md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          {finalists[0] && (
            <FinalistCard
              candidate={finalists[0]}
              firstRoundResult={FIRST_ROUND_RESULTS[finalists[0].id] ?? 0}
            />
          )}
          <VSSeparator />
          {finalists[1] && (
            <FinalistCard
              candidate={finalists[1]}
              firstRoundResult={FIRST_ROUND_RESULTS[finalists[1].id] ?? 0}
            />
          )}
        </div>

        {/* CTA comparar */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/comparar")}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-8 py-3 font-semibold text-amber-400 transition-all duration-200 hover:border-amber-500/40 hover:bg-amber-500/10 hover:shadow-[0_0_20px_rgba(245,166,35,0.1)]"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Comparar lado a lado
            <span aria-hidden>→</span>
          </button>
        </div>
      </motion.section>

      {/* ── SECCIÓN 3: CÓMO EVALUAR ──────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-10"
      >
        <h2
          className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-gray-500"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          Cómo evaluar
        </h2>

        <div className="grid gap-3 sm:grid-cols-3">
          {HOW_TO_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
              className="rounded-xl border border-white/[0.06] bg-[#0D0D20] p-5"
            >
              <div
                className="mb-2 font-mono text-xs font-bold text-amber-400/50"
              >
                {step.number}
              </div>
              <h3
                className="mb-1.5 text-base font-bold text-gray-100"
                style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── SECCIÓN 4: ENCUESTA CIUDADANA ────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="mb-8"
      >
        <div className="rounded-2xl border border-white/[0.06] bg-[#0D0D20] p-6 text-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-400/60"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Encuesta ciudadana
          </p>
          <h3
            className="mb-2 text-xl font-bold text-gray-100"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            ¿A quién quieres que investiguemos a más profundidad primero?
          </h3>
          <p className="mb-5 text-sm text-gray-500">
            Tu voto ayuda a priorizar qué perfiles ampliar con más fuentes y análisis.
          </p>
          <button
            onClick={() => navigate("/encuesta")}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#151530] px-6 py-2.5 text-sm font-semibold text-gray-300 transition-all duration-200 hover:border-amber-500/20 hover:text-amber-400"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            Ir a la encuesta
            <span aria-hidden>→</span>
          </button>
        </div>
      </motion.section>

    </div>
  );
}
