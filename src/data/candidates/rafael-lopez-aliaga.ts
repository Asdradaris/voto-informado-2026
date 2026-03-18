import type { Candidate } from "../../types";

export const rafaelLopezAliaga: Candidate = {
  id: "rafael-lopez-aliaga",
  name: "Rafael López Aliaga",
  firstName: "Rafael",
  lastName: "López Aliaga",
  party: {
    name: "Renovación Popular",
    acronym: "RP",
    color: "#1E3A5F",
    ideology: "Derecha conservadora, ultracatólico",
    foundedYear: 2020,
    congressSeats: 13,
  },
  photo: "",
  age: 61,
  birthplace: "Lima",
  profession: "Empresario",
  education: [
    {
      degree: "Ingeniería Industrial",
      institution: "Universidad de Lima",
      year: 1987,
      verified: true,
    },
    {
      degree: "MBA",
      institution: "IE Business School (Madrid)",
      year: 1992,
      verified: true,
    },
  ],
  politicalHistory:
    "Candidato presidencial en 2021 (tercer lugar con 11.7%). Alcalde de Lima Metropolitana desde enero 2023. Empresario del sector turístico y ferroviario (PeruRail, Inka Rail, hoteles de lujo). Fundador de Renovación Popular en 2020. Miembro del Opus Dei. Ha mantenido un discurso ultraconservador alineado con sectores evangélicos y católicos tradicionales. Segunda postulación presidencial.",

  proposals: [
    {
      area: "seguridad",
      title: "Pena de muerte para violadores de menores",
      summary:
        "Propone referéndum para modificar la Constitución e implementar pena de muerte en casos de violación de menores de edad.",
      details:
        "Requiere retiro del Pacto de San José (Convención Americana de DDHH). Constitucionalistas y organismos internacionales señalan que es inviable sin salir del sistema interamericano de derechos humanos.",
      feasibility: "baja",
    },
    {
      area: "seguridad",
      title: "Militarización de la seguridad ciudadana",
      summary:
        "Despliegue de Fuerzas Armadas en zonas de alta criminalidad. Estado de emergencia extendido en Lima y principales ciudades.",
      feasibility: "media",
    },
    {
      area: "economia",
      title: "Reducción del Estado y privatizaciones",
      summary:
        "Propone privatizar Petroperú, Sedapal y otras empresas estatales. Reducir ministerios de 19 a 12. Eliminación de regulaciones que frenan la inversión.",
      details:
        "Modelo neoliberal radical. Críticos señalan que la privatización de servicios básicos como agua (Sedapal) podría afectar a poblaciones vulnerables.",
      feasibility: "media",
    },
    {
      area: "economia",
      title: "Zona económica especial y tratados comerciales",
      summary:
        "Crear zonas francas en puertos y fronteras. Negociar agresivamente nuevos TLC con foco en Asia.",
      feasibility: "media",
    },
    {
      area: "infraestructura",
      title: "Extensión del modelo de gestión municipal de Lima",
      summary:
        "Promete replicar a nivel nacional el modelo de obras rápidas implementado en la alcaldía de Lima: by-passes, pasos a desnivel, y pintado de fachadas.",
      details:
        "Críticos señalan que las obras de Lima priorizan lo visible sobre lo estructural (no hay inversión comparable en agua, saneamiento o transporte masivo).",
      feasibility: "media",
    },
    {
      area: "salud",
      title: "Hospitales del Bicentenario",
      summary:
        "Construcción de 10 hospitales especializados en regiones con mayor déficit de infraestructura sanitaria.",
      feasibility: "media",
    },
    {
      area: "educacion",
      title: "Vouchers educativos",
      summary:
        "Sistema de vouchers para que familias de bajos recursos elijan entre escuelas públicas y privadas. Modelo inspirado en Chile pre-2015.",
      details:
        "Experiencias internacionales muestran resultados mixtos. Podría debilitar la escuela pública al desviar recursos.",
      feasibility: "baja",
    },
    {
      area: "medio_ambiente",
      title: "Destrabe de proyectos mineros",
      summary:
        "Acelerar la aprobación de EIA (Estudios de Impacto Ambiental) para proyectos mineros como Tía María y Conga.",
      details:
        "Ambientalistas y comunidades locales se oponen fuertemente. Historial de conflictos sociales graves en ambos proyectos.",
      feasibility: "baja",
    },
    {
      area: "politica_social",
      title: "Defensa de la familia tradicional",
      summary:
        "Oposición a la unión civil, enfoque de género en educación y políticas de diversidad sexual. Promueve valores católicos conservadores en políticas públicas.",
      feasibility: "alta",
    },
  ],

  legalHistory: [
    {
      id: "rla-investigacion-patrimonio",
      type: "investigacion_fiscal",
      status: "activo",
      title: "Investigación por incremento patrimonial no justificado",
      description:
        "Investigación por presunto incremento patrimonial no justificado vinculado a la adquisición y crecimiento de sus empresas ferroviarias y hoteleras. Se cuestiona el origen de fondos para la compra de acciones de PeruRail y la expansión del grupo empresarial.",
      date: "2023-06-01",
      severity: 3,
      source: {
        name: "Convoca.pe",
        url: "https://convoca.pe",
        date: "2023-06-15",
        type: "investigacion",
        reliability: "alta",
      },
      relatedEntities: ["PeruRail", "Grupo López Aliaga"],
    },
    {
      id: "rla-obras-lima",
      type: "investigacion_fiscal",
      status: "activo",
      title: "Cuestionamientos a obras de la Municipalidad de Lima",
      description:
        "La Contraloría ha emitido alertas sobre sobrecostos y adjudicaciones directas en obras ejecutadas durante su gestión como alcalde de Lima. Se investigan contratos de pintado de fachadas y construcción de by-passes por montos superiores a lo presupuestado.",
      date: "2024-09-15",
      severity: 3,
      source: {
        name: "Contraloría General de la República",
        url: "https://www.contraloria.gob.pe",
        date: "2024-09-20",
        type: "oficial",
        reliability: "alta",
      },
      relatedEntities: ["Municipalidad de Lima"],
    },
    {
      id: "rla-difamacion",
      type: "proceso_penal",
      status: "resuelto",
      title: "Demandas por difamación",
      description:
        "Múltiples querellas por difamación interpuestas por periodistas y políticos por declaraciones agresivas durante campaña 2021 y gestión municipal. Algunas resueltas con conciliación.",
      date: "2021-05-01",
      severity: 2,
      source: {
        name: "Poder Judicial",
        url: "https://cej.pj.gob.pe",
        date: "2022-03-01",
        type: "oficial",
        reliability: "alta",
      },
    },
  ],

  patrimony: [
    {
      type: "empresa",
      description:
        "Grupo empresarial: PeruRail (operador ferroviario Cusco-Machu Picchu), Inka Rail, hoteles de lujo en Cusco y Valle Sagrado, inversiones inmobiliarias",
      estimatedValue: 500_000_000,
      verified: false,
      discrepancy:
        "Cuestionamientos sobre conflictos de interés entre sus negocios ferroviarios/turísticos y políticas públicas de transporte e infraestructura",
    },
    {
      type: "propiedad",
      description:
        "Múltiples propiedades inmobiliarias en Lima, Cusco y el extranjero. Departamento en Madrid. Patrimonio inmobiliario personal estimado en más de S/ 20 millones.",
      verified: true,
    },
    {
      type: "otro",
      description:
        "Participaciones accionarias en diversas empresas del sector turismo, transporte y hotelería. Estructura societaria compleja con empresas en Perú y el extranjero.",
      verified: false,
      discrepancy:
        "La estructura societaria de sus empresas no es completamente transparente. Existen cuestionamientos sobre empresas offshore vinculadas al grupo",
    },
  ],

  conflicts: [
    {
      description:
        "Como alcalde de Lima, políticas de transporte e infraestructura turística podrían beneficiar directamente a PeruRail, Inka Rail y sus hoteles. No se inhabilitó de decisiones que afectan al sector turístico-ferroviario.",
      severity: "alto",
      entities: ["PeruRail", "Inka Rail", "Municipalidad de Lima"],
    },
    {
      description:
        "Uso de la alcaldía de Lima como plataforma electoral. Obras con alta visibilidad mediática (pintado, by-passes) priorizadas sobre necesidades estructurales, interpretado como campaña anticipada.",
      severity: "medio",
      entities: ["Municipalidad de Lima", "Renovación Popular"],
    },
  ],

  polls: [
    {
      pollster: "datum",
      date: "2026-03-10",
      percentage: 11.4,
      sampleSize: 1501,
      marginOfError: 2.5,
      source: "Datum Internacional - Marzo II 2026 (campo: 6-10 Mar)",
    },
    {
      pollster: "ipsos",
      date: "2026-03-06",
      percentage: 17.2,
      sampleSize: 1200,
      marginOfError: 2.8,
      source: "Ipsos Perú / Perú21 - Simulacro Marzo 2026 (votos válidos)",
    },
    {
      pollster: "cpi",
      date: "2026-03-07",
      percentage: 13.9,
      sampleSize: 1200,
      marginOfError: 2.5,
      source: "CPI - Marzo 2026 (para RPP)",
    },
    {
      pollster: "iep",
      date: "2026-03-11",
      percentage: 11.7,
      sampleSize: 1207,
      marginOfError: 2.8,
      source: "IEP - Informe de Opinión Marzo 2026 (campo: 6-11 Mar)",
    },
  ],
  negativeImage: 57.9,
  tier: "top",

  redFlags: [
    {
      type: "conflicto",
      severity: "critico",
      title: "Conflicto de interés empresarial masivo",
      description:
        "Dueño de PeruRail, Inka Rail y cadena hotelera. Como presidente, decisiones sobre transporte, turismo e infraestructura beneficiarían directamente su patrimonio de ~US$ 500M.",
    },
    {
      type: "credibilidad",
      severity: "alto",
      title: "57.9% de imagen negativa",
      description:
        "Segundo candidato con mayor rechazo ciudadano según CELAG (marzo 2026). Figura altamente polarizante.",
    },
    {
      type: "conducta",
      severity: "alto",
      title: "Declaraciones discriminatorias y controversiales",
      description:
        "Historial extenso de declaraciones polémicas sobre género, orientación sexual, mujeres en política y religión. Ha sido denunciado por organizaciones de derechos humanos y colectivos LGBTQ+.",
    },
    {
      type: "legal",
      severity: "medio",
      title: "Alertas de Contraloría por obras en Lima",
      description:
        "La Contraloría ha emitido alertas sobre sobrecostos y adjudicaciones irregulares en obras de su gestión como alcalde. Se cuestiona el uso eficiente de recursos públicos.",
    },
    {
      type: "credibilidad",
      severity: "medio",
      title: "Obras cosméticas vs. necesidades estructurales",
      description:
        "Su gestión en Lima ha priorizado obras visibles (pintado, by-passes) sobre necesidades urgentes como agua, saneamiento y transporte masivo. Interpretado como campaña anticipada con fondos municipales.",
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
      name: "Convoca.pe",
      url: "https://convoca.pe",
      date: "2025-11-15",
      type: "investigacion",
      reliability: "alta",
    },
    {
      name: "Contraloría General de la República",
      url: "https://www.contraloria.gob.pe",
      date: "2024-09-20",
      type: "oficial",
      reliability: "alta",
    },
  ],
  lastUpdated: "2026-03-18",
  investigationStatus: "en_progreso",
  notes:
    "Lidera simulacro Ipsos con 17.2% en votos válidos. Candidato más polarizante después de Keiko Fujimori. Su principal fortaleza es la visibilidad de su gestión en Lima, pero su principal debilidad es el conflicto de interés empresarial más grande entre todos los candidatos. Su discurso ultraconservador le da una base sólida pero limita su crecimiento electoral.",
};
