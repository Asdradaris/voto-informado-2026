import type { Candidate } from "../../types";

export const cesarAcuna: Candidate = {
  id: "cesar-acuna",
  name: "César Acuña",
  firstName: "César",
  lastName: "Acuña",
  party: {
    name: "Alianza para el Progreso",
    acronym: "APP",
    color: "#00A859",
    ideology: "Centro-derecha, pragmático",
    foundedYear: 2001,
    congressSeats: 6,
  },
  photo: "",
  age: 73,
  birthplace: "La Libertad",
  profession: "Empresario educativo",
  education: [
    {
      degree: "Ingeniería Química",
      institution: "Universidad Nacional de Trujillo",
      year: 1975,
      verified: true,
    },
    {
      degree: "Maestría en Administración",
      institution: "Universidad del Pacífico",
      year: 1990,
      verified: true,
    },
    {
      degree: "Doctorado en Educación",
      institution: "Universidad Complutense de Madrid",
      year: 2002,
      verified: false,
      notes:
        "Tesis cuestionada por presunto plagio. La Complutense no anuló el título pero investigaciones periodísticas encontraron pasajes copiados textualmente sin citar fuentes.",
    },
  ],
  politicalHistory:
    "Alcalde de Trujillo (2007-2014). Gobernador Regional de La Libertad (2015-2018, dejó el cargo para postular). Candidato presidencial en 2016, excluido por el JNE tras ser grabado entregando dinero a ciudadanos durante la campaña. Fundador y dueño del consorcio educativo más grande del Perú (Universidad César Vallejo, U. Señor de Sipán, U. Autónoma del Perú). APP es uno de los partidos con mayor presencia en gobiernos regionales y locales. Tercera postulación presidencial.",

  proposals: [
    {
      area: "educacion",
      title: "Becas masivas para educación superior",
      summary:
        "Ampliar Beca 18 a 100,000 beneficiarios anuales. Crear becas especiales para carreras técnicas y STEM.",
      details:
        "Críticos señalan conflicto de interés: sus propias universidades serían receptoras de alumnos becados con fondos públicos. No se ha planteado mecanismo de recusación.",
      feasibility: "media",
    },
    {
      area: "educacion",
      title: "Infraestructura educativa nacional",
      summary:
        "Construcción y remodelación de 5,000 colegios en 5 años. Equipamiento tecnológico para escuelas rurales.",
      feasibility: "media",
    },
    {
      area: "economia",
      title: "Impulso a MYPES y emprendedores",
      summary:
        "Créditos blandos a través de banco estatal para pequeños empresarios. Reducción de impuestos para microempresas durante primeros 3 años.",
      details:
        "Propuesta recurrente en campañas peruanas. Implementación parcial en gestiones anteriores con resultados limitados por alta informalidad.",
      feasibility: "media",
    },
    {
      area: "economia",
      title: "Formalización económica con incentivos",
      summary:
        "Régimen tributario simplificado para informales. Amnistía tributaria de 2 años para nuevos formalizados.",
      feasibility: "media",
    },
    {
      area: "infraestructura",
      title: "Descentralización del presupuesto y obras regionales",
      summary:
        "Incrementar transferencias a gobiernos regionales al 40% del presupuesto. Priorizar obras de agua y saneamiento en sierra y selva.",
      details:
        "APP controla varias regiones, lo que genera cuestionamientos sobre si la descentralización beneficiaría desproporcionadamente a autoridades de su partido.",
      feasibility: "media",
    },
    {
      area: "seguridad",
      title: "Fortalecimiento policial y tecnología de vigilancia",
      summary:
        "Aumento de efectivos policiales en 30%. Cámaras de vigilancia interconectadas en las 196 capitales de provincia.",
      feasibility: "media",
    },
    {
      area: "salud",
      title: "Ampliación de cobertura de SIS",
      summary:
        "Universalizar el Seguro Integral de Salud. Construcción de 200 centros de salud en zonas de extrema pobreza.",
      feasibility: "media",
    },
    {
      area: "politica_social",
      title: "Programa de vivienda social",
      summary:
        "Construir 500,000 viviendas sociales en 5 años con subsidios directos para familias de menores recursos.",
      feasibility: "baja",
    },
    {
      area: "anticorrupcion",
      title: "Digitalización del Estado",
      summary:
        "Gobierno electrónico para reducir trámites presenciales y oportunidades de corrupción. Ventanilla única digital.",
      feasibility: "alta",
    },
  ],

  legalHistory: [
    {
      id: "ca-exclusion-2016",
      type: "otro",
      status: "resuelto",
      title: "Exclusión electoral 2016 por entrega de dinero",
      description:
        "Fue excluido de las elecciones presidenciales 2016 por el JNE tras ser grabado en video entregando dinero en efectivo a ciudadanos durante actos de campaña en Chota y otras localidades. La resolución del JNE determinó que incurrió en entrega de dádivas, prohibida por la ley electoral.",
      date: "2016-03-09",
      severity: 4,
      source: {
        name: "JNE",
        url: "https://www.jne.gob.pe",
        date: "2016-03-09",
        type: "oficial",
        reliability: "alta",
      },
      relatedEntities: ["JNE", "Alianza para el Progreso"],
    },
    {
      id: "ca-plagio",
      type: "otro",
      status: "archivado",
      title: "Presunto plagio en tesis doctoral",
      description:
        "Su tesis doctoral en la Universidad Complutense de Madrid fue cuestionada por presunto plagio tras investigaciones periodísticas que encontraron pasajes copiados textualmente. La Complutense no anuló el título, pero el caso generó daño reputacional significativo.",
      date: "2016-02-01",
      severity: 3,
      source: {
        name: "Ojo Público",
        url: "https://ojo-publico.com",
        date: "2016-02-15",
        type: "investigacion",
        reliability: "alta",
      },
    },
    {
      id: "ca-lavado-app",
      type: "investigacion_fiscal",
      status: "activo",
      title: "Investigación por financiamiento irregular de APP",
      description:
        "La Fiscalía investiga presuntas irregularidades en el financiamiento de campañas de APP a nivel regional y local. Se sospecha de aportes no declarados y uso de dinero de procedencia cuestionada para financiar candidaturas en múltiples regiones.",
      date: "2022-08-01",
      severity: 3,
      source: {
        name: "IDL Reporteros",
        url: "https://www.idl-reporteros.pe",
        date: "2022-08-15",
        type: "investigacion",
        reliability: "alta",
      },
      relatedEntities: ["Alianza para el Progreso", "ONPE"],
    },
    {
      id: "ca-sunedu",
      type: "investigacion_fiscal",
      status: "activo",
      title: "Cuestionamientos a licenciamiento de universidades UCV",
      description:
        "Investigaciones sobre presiones ejercidas desde APP en el Congreso para modificar la ley universitaria y beneficiar a universidades del consorcio Acuña. Se cuestiona la independencia del proceso de licenciamiento de SUNEDU respecto a sus instituciones.",
      date: "2023-01-15",
      severity: 3,
      source: {
        name: "Convoca.pe",
        url: "https://convoca.pe",
        date: "2023-02-01",
        type: "investigacion",
        reliability: "alta",
      },
      relatedEntities: [
        "Universidad César Vallejo",
        "SUNEDU",
        "Congreso de la República",
      ],
    },
  ],

  patrimony: [
    {
      type: "empresa",
      description:
        "Consorcio educativo más grande del Perú: Universidad César Vallejo (UCV), Universidad Señor de Sipán (USS), Universidad Autónoma del Perú (UA), colegios, institutos y centros preuniversitarios. El consorcio atiende a más de 150,000 estudiantes.",
      estimatedValue: 1_000_000_000,
      verified: false,
      discrepancy:
        "Cuestionamientos permanentes sobre cómo cualquier regulación educativa afecta directamente su patrimonio personal. No existe mecanismo de fideicomiso ciego ni separación efectiva entre sus intereses empresariales y su actividad política.",
    },
    {
      type: "propiedad",
      description:
        "Propiedades inmobiliarias en Trujillo, Lima y el extranjero. Terrenos agrícolas en La Libertad. Vehículos de lujo.",
      verified: true,
    },
    {
      type: "ingreso",
      description:
        "Dividendos del consorcio educativo. Ingresos como gobernador regional (cesó). Rentas de propiedades.",
      verified: false,
      discrepancy:
        "Los ingresos totales del consorcio educativo y la distribución de utilidades no son transparentes. La SUNAT ha realizado fiscalizaciones sin resultados públicos conocidos.",
    },
  ],

  conflicts: [
    {
      description:
        "Como dueño del consorcio educativo más grande del Perú, cualquier política sobre educación superior, licenciamiento universitario, becas públicas o regulación de pensiones educativas impacta directamente su patrimonio personal. Es el conflicto de interés más estructural entre todos los candidatos.",
      severity: "alto",
      entities: [
        "Universidad César Vallejo",
        "Universidad Señor de Sipán",
        "Universidad Autónoma del Perú",
        "SUNEDU",
      ],
    },
    {
      description:
        "APP tiene presencia en múltiples gobiernos regionales y locales, generando una red de patronazgo político-empresarial donde la expansión del consorcio educativo se ha beneficiado de decisiones de gobiernos sub-nacionales controlados por el partido.",
      severity: "alto",
      entities: ["Alianza para el Progreso", "Gobiernos regionales"],
    },
  ],

  polls: [
    {
      pollster: "datum",
      date: "2026-03-10",
      percentage: 3.8,
      sampleSize: 1501,
      marginOfError: 2.5,
      source: "Datum Internacional - Marzo II 2026 (campo: 6-10 Mar)",
    },
    {
      pollster: "ipsos",
      date: "2026-03-06",
      percentage: 8.1,
      sampleSize: 1200,
      marginOfError: 2.8,
      source: "Ipsos Perú / Perú21 - Simulacro Marzo 2026 (votos válidos)",
    },
    {
      pollster: "cpi",
      date: "2026-03-07",
      percentage: 4.4,
      sampleSize: 1200,
      marginOfError: 2.5,
      source: "CPI - Marzo 2026 (para RPP)",
    },
    {
      pollster: "iep",
      date: "2026-03-11",
      percentage: 2.7,
      sampleSize: 1207,
      marginOfError: 2.8,
      source: "IEP - Informe de Opinión Marzo 2026 (campo: 6-11 Mar)",
    },
  ],
  negativeImage: 52.3,
  tier: "top",

  redFlags: [
    {
      type: "conflicto",
      severity: "critico",
      title: "Conflicto de interés masivo en educación",
      description:
        "Dueño del consorcio educativo más grande del Perú (~US$ 1,000M, 150K+ estudiantes). Cualquier legislación sobre educación superior, becas o licenciamiento impacta directamente su patrimonio. No existe mecanismo de separación.",
    },
    {
      type: "legal",
      severity: "alto",
      title: "Excluido por entrega de dinero en elecciones 2016",
      description:
        "Fue excluido de las elecciones 2016 por el JNE tras ser grabado repartiendo dinero en campaña. Precedente grave sobre prácticas clientelistas.",
    },
    {
      type: "credibilidad",
      severity: "alto",
      title: "52.3% de imagen negativa",
      description:
        "Alto rechazo ciudadano. Percibido como representante de la vieja política y el uso del dinero para influir en la política.",
    },
    {
      type: "credibilidad",
      severity: "medio",
      title: "Tesis doctoral con presunto plagio",
      description:
        "Su doctorado en la Complutense de Madrid fue señalado por plagio. Para un candidato dueño de universidades, cuestiona su credibilidad en el ámbito que dice liderar.",
    },
    {
      type: "conducta",
      severity: "alto",
      title: "Red de patronazgo político APP en regiones",
      description:
        "APP controla múltiples gobiernos regionales y locales, generando una red donde la expansión del consorcio educativo coincide con territorios gobernados por el partido.",
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
      name: "Ojo Público",
      url: "https://ojo-publico.com",
      date: "2025-10-15",
      type: "investigacion",
      reliability: "alta",
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
  ],
  lastUpdated: "2026-03-18",
  investigationStatus: "en_progreso",
  notes:
    "Candidato con el mayor patrimonio personal entre todos los postulantes y el conflicto de interés más estructural en el sector educativo. Su partido APP tiene la mayor presencia territorial a nivel sub-nacional, lo que le da una maquinaria electoral sólida pero genera cuestionamientos sobre patronazgo. Fue excluido en 2016 por compra de votos y su doctorado fue cuestionado por plagio. A pesar de todo, mantiene base electoral en el norte del país y sectores populares.",
};
