import type { Candidate } from "../../types";

export const alfonsoLopezChau: Candidate = {
  id: "alfonso-lopez-chau",
  name: "Alfonso López Chau",
  firstName: "Alfonso",
  lastName: "López Chau",
  party: {
    name: "Ahora Nación",
    acronym: "AN",
    color: "#4A90D9",
    ideology: "Centro-izquierda, progresista",
    foundedYear: 2023,
    congressSeats: 0,
  },
  photo: "",
  age: 58,
  birthplace: "Lima",
  profession: "Economista",
  education: [
    {
      degree: "Economía",
      institution: "Universidad Nacional Mayor de San Marcos",
      year: 1990,
      verified: true,
    },
    {
      degree: "Maestría en Economía",
      institution: "Pontificia Universidad Católica del Perú",
      year: 1995,
      verified: true,
    },
    {
      degree: "Doctorado en Economía",
      institution: "Universidad Nacional Mayor de San Marcos",
      year: 2005,
      verified: true,
    },
  ],
  politicalHistory:
    "Economista, académico y docente universitario de larga trayectoria. Rector de la Universidad Nacional del Callao. Sin experiencia en cargos de elección popular previos. Candidato emergente que ha escalado en encuestas con un discurso técnico centrado en planificación económica, industrialización y desarrollo con equidad. Perfil similar al de un tecnócrata progresista. Primera postulación presidencial.",

  proposals: [
    {
      area: "economia",
      title: "Planificación económica estratégica",
      summary:
        "Modelo de desarrollo con planificación estatal estratégica sin abandonar la economía de mercado. Banco Nacional de Desarrollo para financiar industria nacional.",
      details:
        "Propone un CEPLAN fortalecido con rango ministerial. Política industrial activa enfocada en valor agregado a recursos naturales (petroquímica, metalurgia, agroindustria). No propone estatizar sectores productivos.",
      feasibility: "media",
    },
    {
      area: "economia",
      title: "Industrialización y valor agregado",
      summary:
        "Transformar la matriz productiva del Perú: de exportador primario a productor de bienes con valor agregado. Incentivos tributarios para manufactura nacional.",
      details:
        "Modelo inspirado en experiencias de Corea del Sur y Vietnam. Requiere inversión pública significativa y consenso político para cambiar el modelo extractivista.",
      feasibility: "baja",
    },
    {
      area: "educacion",
      title: "Reforma universitaria y ciencia",
      summary:
        "Triplicar presupuesto de investigación científica. Fortalecer la educación pública universitaria. Vincular universidad-empresa para transferencia tecnológica.",
      details:
        "Propone llevar la inversión en I+D del 0.13% al 1% del PBI en 5 años. Crear centros de excelencia regionales vinculados a vocaciones productivas locales.",
      feasibility: "media",
    },
    {
      area: "politica_social",
      title: "Programas sociales focalizados con medición de impacto",
      summary:
        "Rediseño integral de programas sociales con mejor focalización, eliminación de filtraciones y medición rigurosa de resultados.",
      details:
        "Sistema único de beneficiarios con datos biométricos. Evaluaciones de impacto obligatorias para continuidad de programas. Modelo basado en evidencia.",
      feasibility: "alta",
    },
    {
      area: "salud",
      title: "Sistema único de salud",
      summary:
        "Integración progresiva de EsSalud, SIS y sanidad militar/policial en un sistema universal de salud con prestaciones garantizadas.",
      details:
        "Reforma ambiciosa que requiere consenso político y presupuesto significativo. Experiencias comparadas (Reino Unido, Costa Rica) muestran viabilidad a largo plazo.",
      feasibility: "baja",
    },
    {
      area: "seguridad",
      title: "Seguridad ciudadana con enfoque integral",
      summary:
        "Combinar prevención social del delito con fortalecimiento de inteligencia policial. Reforma de la Policía Nacional con énfasis en profesionalización.",
      feasibility: "media",
    },
    {
      area: "medio_ambiente",
      title: "Transición energética y minería responsable",
      summary:
        "Diversificación de la matriz energética hacia renovables. Regalías mineras reinvertidas en desarrollo local. Consulta previa efectiva para comunidades.",
      feasibility: "media",
    },
    {
      area: "infraestructura",
      title: "Conectividad digital y descentralización",
      summary:
        "Fibra óptica nacional para cerrar brecha digital. Descentralización real del presupuesto con gobiernos regionales fortalecidos.",
      feasibility: "media",
    },
    {
      area: "anticorrupcion",
      title: "Fortalecimiento institucional anticorrupción",
      summary:
        "Autonomía presupuestal para Fiscalía y Poder Judicial. Sistema de declaraciones juradas verificables. Protección efectiva a denunciantes.",
      feasibility: "alta",
    },
  ],

  legalHistory: [],

  patrimony: [
    {
      type: "ingreso",
      description:
        "Ingresos como docente universitario titular y rector de la Universidad Nacional del Callao. Ingresos por consultorías académicas y publicaciones.",
      verified: true,
    },
    {
      type: "propiedad",
      description:
        "Vivienda familiar en el Callao. Un vehículo de uso personal. Patrimonio modesto acorde a carrera académica pública.",
      verified: true,
    },
  ],

  conflicts: [],

  polls: [
    {
      pollster: "datum",
      date: "2026-03-08",
      percentage: 5.5,
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
      percentage: 4.2,
      sampleSize: 1500,
      marginOfError: 2.5,
      source: "CPI - Febrero 2026",
    },
  ],
  negativeImage: 18.5,
  tier: "top",

  redFlags: [
    {
      type: "credibilidad",
      severity: "medio",
      title: "Sin experiencia en gestión pública ni cargos de elección",
      description:
        "Nunca ha ocupado un cargo público de elección popular. Su experiencia se limita a la gestión universitaria. La transición de rector a presidente es un salto sin precedentes exitosos en Perú.",
    },
    {
      type: "credibilidad",
      severity: "medio",
      title: "Partido nuevo sin estructura nacional consolidada",
      description:
        "Ahora Nación es un partido joven (2023) sin representación en el Congreso actual. Gobernabilidad dependería de alianzas parlamentarias inciertas.",
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
    {
      name: "Universidad Nacional del Callao",
      url: "https://www.unac.edu.pe",
      date: "2026-01-15",
      type: "oficial",
      reliability: "alta",
    },
  ],
  lastUpdated: "2026-03-16",
  investigationStatus: "en_progreso",
  notes:
    "Candidato emergente con perfil técnico-académico y sin antecedentes legales conocidos. Es el candidato con menor imagen negativa entre los top 5. Sus propuestas son las más detalladas técnicamente pero su viabilidad política es incierta al no tener bancada ni experiencia en gestión estatal. Representa una alternativa fresca frente a candidatos con alta carga negativa, lo que explica su crecimiento en encuestas.",
};
