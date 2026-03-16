import type { ScoringConfig } from "../types";

export const DEFAULT_SCORING_CONFIG: ScoringConfig = {
  totalWeight: 100,
  dimensions: [
    {
      id: "legal",
      label: "Historial Legal / Judicial",
      description:
        "Procesos activos, sentencias, investigaciones, denuncias constitucionales",
      icon: "Scale",
      weight: 30,
      criteria: [
        {
          id: "legal-procesos",
          label: "Procesos penales activos",
          description:
            "0 = múltiples procesos graves activos, 10 = sin procesos",
          maxScore: 10,
        },
        {
          id: "legal-sentencias",
          label: "Sentencias y antecedentes",
          description:
            "0 = sentencias graves, 10 = historial completamente limpio",
          maxScore: 10,
        },
        {
          id: "legal-transparencia",
          label: "Transparencia judicial",
          description:
            "0 = oculta información, 10 = totalmente transparente",
          maxScore: 10,
        },
      ],
    },
    {
      id: "proposals",
      label: "Propuestas y Plan de Gobierno",
      description: "Calidad, viabilidad y coherencia de propuestas",
      icon: "ClipboardList",
      weight: 30,
      criteria: [
        {
          id: "prop-viabilidad",
          label: "Viabilidad técnica y económica",
          description:
            "¿Son realizables las propuestas? ¿Tienen sustento técnico?",
          maxScore: 10,
        },
        {
          id: "prop-especificidad",
          label: "Especificidad y detalle",
          description:
            "¿Son concretas o solo declarativas? ¿Tienen metas medibles?",
          maxScore: 10,
        },
        {
          id: "prop-coherencia",
          label: "Coherencia con trayectoria",
          description: "¿Su historial respalda lo que propone?",
          maxScore: 10,
        },
      ],
    },
    {
      id: "patrimony",
      label: "Patrimonio y Conflictos de Interés",
      description:
        "Transparencia patrimonial, fuentes de financiamiento, conflictos",
      icon: "Banknote",
      weight: 25,
      criteria: [
        {
          id: "pat-transparencia",
          label: "Transparencia patrimonial",
          description:
            "¿Declara coherente? ¿Hay discrepancias entre ingresos y estilo de vida?",
          maxScore: 10,
        },
        {
          id: "pat-conflictos",
          label: "Conflictos de interés",
          description:
            "¿Sus negocios se beneficiarían de su posición? ¿Hay vínculos problemáticos?",
          maxScore: 10,
        },
        {
          id: "pat-financiamiento",
          label: "Financiamiento de campaña",
          description:
            "¿De dónde viene el dinero? ¿Hay aportes cuestionados?",
          maxScore: 10,
        },
      ],
    },
    {
      id: "viability",
      label: "Viabilidad Electoral y Gobernabilidad",
      description:
        "Capacidad real de ganar y de gobernar efectivamente",
      icon: "BarChart3",
      weight: 15,
      criteria: [
        {
          id: "via-electoral",
          label: "Posición en encuestas",
          description: "Intención de voto, tendencia, rechazo",
          maxScore: 10,
        },
        {
          id: "via-equipo",
          label: "Equipo técnico y político",
          description:
            "¿Tiene cuadros preparados? ¿Quiénes son sus vicepresidentes y asesores?",
          maxScore: 10,
        },
        {
          id: "via-gobernabilidad",
          label: "Capacidad de gobernabilidad",
          description:
            "¿Puede articular con el Congreso? ¿Tiene alianzas viables?",
          maxScore: 10,
        },
      ],
    },
  ],
};
