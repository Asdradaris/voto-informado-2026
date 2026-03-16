export const ELECTION_DATE = "2026-04-12";
export const APP_NAME = "VOTO INFORMADO 2026";
export const APP_DESCRIPTION =
  "Plataforma de investigación electoral ciudadana para las elecciones generales de Perú 2026";

export const DISCLAIMER =
  "VOTO INFORMADO 2026 es una herramienta de investigación ciudadana independiente. No está afiliada a ningún partido político, candidato u organismo electoral. La información presentada proviene de fuentes públicas citadas. Los scores reflejan la evaluación personal del usuario, no una recomendación de voto. Verificar siempre la información en fuentes oficiales: votoinformado.jne.gob.pe";

export const TIER_LABELS = {
  top: "Top (>5%)",
  mid: "Medio (1-5%)",
  low: "Bajo (<1%)",
} as const;

export const SCORE_RANGES = [
  { min: 80, max: 100, color: "#2ED573", label: "Candidato sólido" },
  { min: 60, max: 79, color: "#FFA502", label: "Aceptable con reservas" },
  { min: 40, max: 59, color: "#FF8C00", label: "Cuestionable" },
  { min: 20, max: 39, color: "#FF4757", label: "Red flags significativas" },
  { min: 0, max: 19, color: "#D63031", label: "Problemas graves" },
] as const;
