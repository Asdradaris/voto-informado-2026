import type { Candidate } from "../../types";

export const carlosAlvarez: Candidate = {
  id: "carlos-alvarez",
  name: "Carlos Álvarez",
  firstName: "Carlos",
  lastName: "Álvarez",
  party: {
    name: "País para Todos",
    acronym: "PPT",
    color: "#8B5CF6",
    ideology: "Centro, independiente",
    foundedYear: 2024,
    congressSeats: 0,
  },
  photo: "",
  age: 57,
  birthplace: "Lima",
  profession: "Actor, comediante",
  education: [
    {
      degree: "Actor profesional",
      institution: "Carrera artística autodidacta",
      year: 1990,
      verified: true,
      notes:
        "Reconocido como el imitador político más popular del Perú. Más de 30 años de carrera artística en televisión, teatro y shows en vivo.",
    },
  ],
  politicalHistory:
    "Sin experiencia política previa en ningún cargo público. Conocido como el imitador político más popular del Perú, famoso por sus personificaciones de presidentes y políticos. Su programa de televisión satirizó a la clase política peruana durante más de dos décadas. Candidato outsider que capitaliza el hartazgo ciudadano con la clase política tradicional. Su candidatura ha sido comparada con la de otros artistas-políticos latinoamericanos. Primera postulación a cargo público.",

  proposals: [
    {
      area: "anticorrupcion",
      title: "Gobierno transparente y rendición de cuentas",
      summary:
        "Transmisión en vivo de sesiones de Consejo de Ministros. Portal de transparencia con datos abiertos sobre contratos y gastos del Estado en tiempo real.",
      details:
        "La transmisión en vivo es factible y ya se practica parcialmente. El portal de datos abiertos requiere inversión tecnológica significativa pero es implementable.",
      feasibility: "alta",
    },
    {
      area: "anticorrupcion",
      title: "Revocatoria express para funcionarios corruptos",
      summary:
        "Simplificar el proceso de revocatoria de autoridades con denuncias comprobadas de corrupción. Reducir firmas y plazos necesarios.",
      details:
        "Requiere reforma constitucional. Riesgo de uso político para desestabilizar autoridades legítimas. Constitucionalistas advierten sobre potencial abuso del mecanismo.",
      feasibility: "baja",
    },
    {
      area: "politica_social",
      title: "Gobierno cercano al pueblo",
      summary:
        "Cabildos abiertos mensuales en cada región. Presupuesto participativo ampliado. Consultas ciudadanas vinculantes para grandes decisiones.",
      feasibility: "media",
    },
    {
      area: "economia",
      title: "Apoyo a emprendedores y economía popular",
      summary:
        "Formalización con incentivos para comerciantes y emprendedores informales. Microcréditos con tasas preferenciales a través de Banco de la Nación.",
      feasibility: "media",
    },
    {
      area: "economia",
      title: "Tope a sueldos de funcionarios",
      summary:
        "Ningún funcionario público ganará más de 15 UIT mensuales (~S/ 74,250). Ahorro reinvertido en programas sociales.",
      details:
        "Propuesta popular pero de impacto fiscal limitado. El ahorro real sería marginal frente al presupuesto total. Riesgo de fuga de talento del sector público.",
      feasibility: "alta",
    },
    {
      area: "seguridad",
      title: "Policía comunitaria y prevención",
      summary:
        "Modelo de policía comunitaria en los 50 distritos más peligrosos. Programas de reinserción para jóvenes en riesgo.",
      feasibility: "media",
    },
    {
      area: "educacion",
      title: "Educación cívica y valores democráticos",
      summary:
        "Fortalecer la enseñanza de educación cívica, historia peruana y valores democráticos en el currículo escolar.",
      feasibility: "alta",
    },
    {
      area: "salud",
      title: "Salud mental como prioridad nacional",
      summary:
        "Centros de salud mental comunitarios en todos los distritos. Atención psicológica gratuita para víctimas de violencia.",
      feasibility: "media",
    },
  ],

  legalHistory: [],

  patrimony: [
    {
      type: "ingreso",
      description:
        "Ingresos como artista, conductor de televisión, shows en vivo y eventos corporativos. Carrera artística de más de 30 años con ingresos regulares del medio artístico.",
      verified: true,
    },
    {
      type: "propiedad",
      description:
        "Vivienda en Lima. Vehículo de uso personal. Patrimonio modesto acorde a carrera artística.",
      verified: true,
    },
  ],

  conflicts: [],

  polls: [
    {
      pollster: "datum",
      date: "2026-03-08",
      percentage: 5.0,
      sampleSize: 1501,
      marginOfError: 2.5,
      source: "Datum Internacional - Marzo 2026",
    },
    {
      pollster: "ipsos",
      date: "2026-03-06",
      percentage: 8.9,
      sampleSize: 1200,
      marginOfError: 2.8,
      source: "Ipsos Perú / Perú21 - Simulacro Marzo 2026 (votos válidos)",
    },
    {
      pollster: "cpi",
      date: "2026-02-28",
      percentage: 4.5,
      sampleSize: 1500,
      marginOfError: 2.5,
      source: "CPI - Febrero 2026",
    },
  ],
  negativeImage: 25.1,
  tier: "top",

  redFlags: [
    {
      type: "credibilidad",
      severity: "alto",
      title: "Cero experiencia en gestión pública",
      description:
        "Nunca ha ocupado ningún cargo público ni de gestión. No tiene experiencia administrativa, legislativa ni ejecutiva. El salto de comediante a presidente es el más radical entre todos los candidatos.",
    },
    {
      type: "credibilidad",
      severity: "alto",
      title: "Propuestas sin sustento técnico profundo",
      description:
        "La mayoría de sus propuestas son declarativas y carecen de detalles de implementación, costeo o cronograma. Su equipo técnico no tiene visibilidad pública.",
    },
    {
      type: "credibilidad",
      severity: "medio",
      title: "Partido nuevo sin estructura ni bancada",
      description:
        "País para Todos fue fundado en 2024 y no tiene representación parlamentaria. Gobernabilidad sería extremadamente difícil sin alianzas.",
    },
    {
      type: "conducta",
      severity: "medio",
      title: "Riesgo de populismo sin capacidad de ejecución",
      description:
        "Su popularidad se basa en el carisma y el rechazo a la clase política, no en un proyecto político articulado. Precedentes de outsiders en Perú (Fujimori 1990, Castillo 2021) muestran riesgos de gobernar sin preparación.",
    },
  ],

  sources: [
    {
      name: "JNE Voto Informado",
      url: "https://votoinformado.jne.gob.pe",
      date: "2026-03-01",
      type: "oficial",
      reliability: "alta",
    },
    {
      name: "Datum Internacional",
      url: "https://www.datum.com.pe",
      date: "2026-03-08",
      type: "encuestadora",
      reliability: "alta",
    },
    {
      name: "Ipsos Perú / Perú21",
      url: "https://www.ipsos.com/es-pe",
      date: "2026-03-06",
      type: "encuestadora",
      reliability: "alta",
    },
    {
      name: "CELAG",
      url: "https://www.celag.org",
      date: "2026-03-02",
      type: "investigacion",
      reliability: "media",
    },
  ],
  lastUpdated: "2026-03-16",
  investigationStatus: "en_progreso",
  notes:
    "Candidato outsider con la mayor simpatía y menor rechazo entre los top 5, pero sin ninguna experiencia en gestión pública. Representa el voto antisistema sin carga ideológica fuerte. Su principal fortaleza es que no tiene pasado político que le juegue en contra; su principal debilidad es que no tiene equipo técnico visible ni plan de gobierno detallado. Los precedentes de outsiders en Perú son mayoritariamente negativos (Fujimori derivó en autoritarismo, Castillo en ingobernabilidad).",
};
