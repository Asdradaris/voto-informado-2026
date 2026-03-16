import { DEFAULT_SCORING_CONFIG } from "../config/scoring";
import { SCORE_RANGES } from "../config/constants";
import { Card } from "../components/ui/Card";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export function MethodologyPage() {
  useDocumentTitle("Metodología");
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-100">Metodología</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="mb-3 text-lg font-semibold text-gray-100">
            ¿Cómo funciona el scoring?
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            VOTO INFORMADO 2026 utiliza un algoritmo de scoring ponderado por
            dimensiones. Cada candidato es evaluado en 4 dimensiones, cada una
            con 3 criterios. El usuario asigna puntuaciones de 0 a 10 en cada
            criterio, y el sistema calcula un score total ponderado de 0 a 100.
          </p>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold text-gray-100">
            Fórmula
          </h2>
          <div className="rounded-lg bg-white/[0.03] p-4 font-mono text-sm text-amber-400">
            <p>SCORE = &Sigma; (PROMEDIO_CRITERIOS &times; PESO / 100)</p>
            <p className="mt-2 text-xs text-gray-500">
              Donde PROMEDIO_CRITERIOS = suma de criterios / n_criterios
            </p>
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold text-gray-100">
            Dimensiones y Pesos
          </h2>
          <div className="space-y-4">
            {DEFAULT_SCORING_CONFIG.dimensions.map((dim) => (
              <div key={dim.id}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-200">
                    {dim.label}
                  </h3>
                  <span className="text-sm font-bold text-amber-400">
                    {dim.weight}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{dim.description}</p>
                <ul className="mt-2 space-y-1 pl-4">
                  {dim.criteria.map((c) => (
                    <li
                      key={c.id}
                      className="text-xs text-gray-400 before:mr-2 before:text-amber-500/50 before:content-['•']"
                    >
                      <strong className="text-gray-300">{c.label}:</strong>{" "}
                      {c.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold text-gray-100">
            Escala de Interpretación
          </h2>
          <div className="space-y-2">
            {SCORE_RANGES.map((range) => (
              <div
                key={range.min}
                className="flex items-center gap-3 rounded-lg p-2"
              >
                <span
                  className="inline-block h-4 w-4 rounded-full"
                  style={{ backgroundColor: range.color }}
                />
                <span className="w-16 text-sm font-medium text-gray-300">
                  {range.min}-{range.max}
                </span>
                <span className="text-sm text-gray-400">{range.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold text-gray-100">
            Personalización
          </h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              Los pesos pueden ser ajustados en la página de Ranking para
              reflejar tus prioridades personales.
            </li>
            <li>
              Los sliders siempre deben sumar 100% para que el score sea
              coherente.
            </li>
            <li>
              Tu configuración se guarda automáticamente en tu navegador.
            </li>
          </ul>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold text-gray-100">
            Fuentes de Datos
          </h2>
          <p className="text-sm text-gray-400">
            Toda la información presentada proviene de fuentes públicas. Cada
            dato incluye su fuente para que puedas verificarlo. Las fuentes
            principales son: JNE Voto Informado, Plataforma Electoral JNE,
            Poder Judicial, encuestadoras (Datum, Ipsos, CPI) y medios de
            investigación (Convoca.pe, Ojo Público, IDL Reporteros).
          </p>
        </Card>
      </div>
    </div>
  );
}
