import type { Candidate } from "../../types";

export const keikoFujimori: Candidate = {
  id: "keiko-fujimori",
  name: "Keiko Fujimori",
  firstName: "Keiko",
  lastName: "Fujimori",
  party: {
    name: "Fuerza Popular",
    acronym: "FP",
    color: "#FF6B00",
    ideology: "Derecha, fujimorismo",
    foundedYear: 2010,
    congressSeats: 24,
  },
  photo: "/candidates/fuerza_popular.webp",
  age: 50,
  birthplace: "Lima",
  profession: "Administradora de Empresas",
  education: [
    {
      degree: "Bachelor en Administración de Empresas",
      institution: "Boston University",
      year: 1997,
      verified: true,
    },
    {
      degree: "MBA",
      institution: "Columbia Business School",
      year: 2001,
      verified: true,
    },
  ],
  politicalHistory:
    "Primera Dama del Perú de facto durante el gobierno de su padre Alberto Fujimori (1994-2000). Congresista con la mayor votación preferencial 2006-2011. Candidata presidencial en 2011 (segunda vuelta vs. Humala, perdió 51.5% - 48.5%), 2016 (segunda vuelta vs. PPK, perdió 50.1% - 49.9%) y 2021 (segunda vuelta vs. Castillo, perdió 50.1% - 49.9%). Lideresa y fundadora de Fuerza Popular. Cuarta postulación presidencial.",

  proposals: [
    {
      area: "seguridad",
      title: "Estado de emergencia en zonas de alta criminalidad",
      summary:
        "Declarar estado de emergencia permanente en distritos con altos índices de criminalidad. Presencia militar en zonas críticas.",
      details:
        "Incluye aumento del presupuesto policial en 40%, adquisición de tecnología de vigilancia, y endurecimiento de penas para sicariato y extorsión.",
      feasibility: "media",
    },
    {
      area: "seguridad",
      title: "Lucha contra el crimen organizado",
      summary:
        "Creación de una unidad especial anticromen organizado con facultades ampliadas de investigación patrimonial",
      feasibility: "media",
    },
    {
      area: "economia",
      title: "Reactivación económica con inversión privada",
      summary:
        "Reducción de trabas burocráticas para nuevos negocios. Incentivos tributarios para inversión extranjera en minería, infraestructura y agroindustria.",
      details:
        "Propone reducir el tiempo de apertura de empresas a 48 horas y crear ventanilla única digital para trámites empresariales.",
      feasibility: "media",
    },
    {
      area: "economia",
      title: "Formalización del empleo",
      summary:
        "Régimen laboral especial para MYPES con menores costos de formalización y beneficios tributarios progresivos",
      feasibility: "media",
    },
    {
      area: "educacion",
      title: "Jornada escolar completa",
      summary:
        "Implementar jornada escolar completa en todas las escuelas públicas con alimentación incluida",
      feasibility: "media",
    },
    {
      area: "salud",
      title: "Fortalecimiento del primer nivel de atención",
      summary:
        "Construcción y equipamiento de centros de salud en zonas rurales. Telemedicina para comunidades alejadas.",
      feasibility: "media",
    },
    {
      area: "anticorrupcion",
      title: "Reforma del sistema de justicia",
      summary:
        "Cambios en la selección de fiscales y jueces. Propone que el Poder Judicial tenga presupuesto autónomo.",
      details:
        "Críticos señalan contradicción con su propio proceso legal activo y los intentos de Fuerza Popular de controlar el TC y la Fiscalía desde el Congreso.",
      feasibility: "baja",
    },
    {
      area: "infraestructura",
      title: "Programa Techo Propio ampliado",
      summary:
        "Ampliación del programa de vivienda social con subsidios directos para familias de bajos ingresos",
      feasibility: "media",
    },
    {
      area: "politica_social",
      title: "Programa de alimentación escolar",
      summary:
        "Reestructuración de Qali Warma con mejor supervisión y calidad nutricional",
      feasibility: "alta",
    },
  ],

  legalHistory: [
    {
      id: "kf-lavado-activos",
      type: "proceso_penal",
      status: "activo",
      title: "Caso Cócteles - Lavado de activos",
      description:
        "Investigación por presunto lavado de activos vinculado al financiamiento de campañas electorales de Fuerza Popular 2011 y 2016 con dinero de Odebrecht y otros aportantes ilegales. La Fiscalía solicitó 30 años y 10 meses de prisión. Se le acusa de liderar una organización criminal dentro de su partido para ocultar el origen ilícito de aportes de campaña por más de S/ 17 millones.",
      date: "2018-10-10",
      severity: 5,
      source: {
        name: "IDL Reporteros / Poder Judicial",
        url: "https://www.idl-reporteros.pe",
        date: "2024-01-15",
        type: "investigacion",
        reliability: "alta",
      },
      relatedEntities: [
        "Odebrecht",
        "Fuerza Popular",
        "Jaime Yoshiyama",
        "Vicente Silva Checa",
        "Augusto Cáceres",
        "Credicorp",
      ],
    },
    {
      id: "kf-prision-preventiva",
      type: "prision_preventiva",
      status: "resuelto",
      title: "Prisión preventiva por caso Cócteles",
      description:
        "Cumplió prisión preventiva en dos oportunidades (2018 y 2020) por riesgo de obstrucción a la justicia. Total: aproximadamente 16 meses de detención. Fue liberada por el Tribunal Constitucional en un fallo polémico con votos de magistrados vinculados a Fuerza Popular.",
      date: "2018-10-31",
      severity: 4,
      source: {
        name: "Poder Judicial",
        url: "https://cej.pj.gob.pe",
        date: "2020-05-01",
        type: "oficial",
        reliability: "alta",
      },
    },
    {
      id: "kf-obstruccion",
      type: "investigacion_fiscal",
      status: "activo",
      title: "Obstrucción a la justicia",
      description:
        "Investigación complementaria por presunta obstrucción a la justicia, incluyendo comunicaciones con testigos y coimputados para coordinar versiones durante el proceso del caso Cócteles.",
      date: "2019-06-15",
      severity: 4,
      source: {
        name: "Ministerio Público",
        url: "https://www.mpfn.gob.pe",
        date: "2019-06-15",
        type: "oficial",
        reliability: "alta",
      },
    },
    {
      id: "kf-falsos-aportantes",
      type: "investigacion_fiscal",
      status: "activo",
      title: "Falsos aportantes de campaña",
      description:
        "Personas que figuraron como aportantes de las campañas de Fuerza Popular negaron haber realizado contribuciones, lo que evidencia la estructura de lavado de dinero. Se identificaron al menos 1,200 falsos aportantes.",
      date: "2017-03-01",
      severity: 5,
      source: {
        name: "Convoca.pe",
        url: "https://convoca.pe",
        date: "2017-03-15",
        type: "investigacion",
        reliability: "alta",
      },
      relatedEntities: ["Fuerza Popular", "ONPE"],
    },
  ],

  patrimony: [
    {
      type: "ingreso",
      description:
        "Ingresos declarados como consultora y por actividad política partidaria. No ha ejercido cargo público remunerado desde 2011.",
      verified: false,
      discrepancy:
        "Cuestionamientos sobre origen de fondos para mantener actividad política permanente sin ingresos laborales regulares conocidos",
    },
    {
      type: "propiedad",
      description:
        "Departamento en La Molina. Vehículos de uso personal. Patrimonio personal declarado ante el JNE.",
      verified: true,
    },
    {
      type: "otro",
      description:
        "Su padre Alberto Fujimori acumuló patrimonio durante su gobierno que fue parcialmente recuperado por el Estado. La familia Fujimori tiene vínculos empresariales que no están completamente mapeados.",
      verified: false,
      discrepancy:
        "Falta de transparencia sobre recursos familiares y su relación con el financiamiento político",
    },
  ],

  conflicts: [
    {
      description:
        "Financiamiento de campañas 2011 y 2016 con presuntos aportes ilícitos de Odebrecht (US$ 1 millón según fiscalía) y Credicorp/Dionisio Romero (US$ 3.65 millones no declarados)",
      severity: "alto",
      entities: ["Odebrecht", "Credicorp", "Dionisio Romero Paoletti"],
    },
    {
      description:
        "Fuerza Popular controló el Congreso 2016-2021 con mayoría absoluta y fue acusada de obstruir investigaciones anticorrupción, censurar ministros y desestabilizar al gobierno de PPK y Vizcarra",
      severity: "alto",
      entities: ["Fuerza Popular", "Congreso de la República"],
    },
  ],

  polls: [
    {
      pollster: "datum",
      date: "2026-03-10",
      percentage: 10.9,
      sampleSize: 1501,
      marginOfError: 2.5,
      source: "Datum Internacional - Marzo II 2026 (campo: 6-10 Mar)",
    },
    {
      pollster: "ipsos",
      date: "2026-03-06",
      percentage: 14.2,
      sampleSize: 1200,
      marginOfError: 2.8,
      source: "Ipsos Perú / Perú21 - Simulacro Marzo 2026 (votos válidos)",
    },
    {
      pollster: "cpi",
      date: "2026-03-07",
      percentage: 7.0,
      sampleSize: 1200,
      marginOfError: 2.5,
      source: "CPI - Marzo 2026 (para RPP)",
    },
    {
      pollster: "iep",
      date: "2026-03-11",
      percentage: 9.4,
      sampleSize: 1207,
      marginOfError: 2.8,
      source: "IEP - Informe de Opinión Marzo 2026 (campo: 6-11 Mar)",
    },
  ],
  negativeImage: 77.4,
  tier: "top",

  redFlags: [
    {
      type: "legal",
      severity: "critico",
      title: "Proceso activo por lavado de activos — 30 años pedidos",
      description:
        "La Fiscalía pide 30 años y 10 meses de prisión en el caso Cócteles por liderar organización criminal para lavar aportes de Odebrecht y otros. Más de 1,200 falsos aportantes identificados.",
    },
    {
      type: "legal",
      severity: "alto",
      title: "Estuvo en prisión preventiva dos veces",
      description:
        "Cumplió ~16 meses de prisión preventiva por riesgo de obstrucción. Fue liberada por el TC en fallo polémico.",
    },
    {
      type: "credibilidad",
      severity: "critico",
      title: "77.4% de imagen negativa — la más alta de todos los candidatos",
      description:
        "Según CELAG (marzo 2026), tiene el mayor rechazo ciudadano. Ha perdido tres segundas vueltas consecutivas con márgenes cada vez más ajustados.",
    },
    {
      type: "conflicto",
      severity: "alto",
      title: "Vínculos con Odebrecht y grandes grupos económicos",
      description:
        "Financiamiento no declarado de Credicorp (US$ 3.65M) y Odebrecht (US$ 1M según fiscalía) pone en duda su independencia para gobernar.",
    },
    {
      type: "conducta",
      severity: "alto",
      title: "Obstruccionismo desde el Congreso (2016-2021)",
      description:
        "Fuerza Popular con mayoría absoluta censuró ministros, vacó a PPK, y fue acusada de obstruir la lucha anticorrupción desde el Legislativo.",
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
      name: "IDL Reporteros",
      url: "https://www.idl-reporteros.pe",
      date: "2025-12-01",
      type: "investigacion",
      reliability: "alta",
    },
    {
      name: "Convoca.pe",
      url: "https://convoca.pe",
      date: "2025-11-15",
      type: "investigacion",
      reliability: "alta",
    },
    {
      name: "Poder Judicial - CEJ",
      url: "https://cej.pj.gob.pe",
      date: "2026-01-15",
      type: "oficial",
      reliability: "alta",
    },
  ],
  lastUpdated: "2026-03-18",
  investigationStatus: "en_progreso",
  notes:
    "Candidata con mayor trayectoria electoral (4ta postulación) pero con el mayor rechazo ciudadano y el proceso legal más grave entre todos los candidatos. Ha perdido tres segundas vueltas consecutivas. Su base electoral es sólida pero tiene un techo bajo por el alto antivoto. El caso Cócteles es el proceso anticorrupción más importante vinculado a un candidato en actividad.",
};
