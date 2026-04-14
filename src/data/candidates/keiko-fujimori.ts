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
      institution: "Stony Brook University (SUNY)",
      year: 1997,
      verified: true,
      notes: "Estudios 1993-1997. Breve estadía en Universidad de Boston.",
    },
    {
      degree: "MBA",
      institution: "Columbia Business School",
      year: 2008,
      verified: true,
    },
  ],
  politicalHistory:
    "Keiko Sofía Fujimori Higuchi (Lima, 25 de mayo de 1975). Primera Dama del Perú de facto durante el gobierno de su padre Alberto Fujimori (1994-2000). Congresista por Lima 2006-2011, con la mayor votación preferencial del país (600,000 votos). Fundadora y presidenta de Fuerza Popular desde 2010. Candidata presidencial en 2011 (segunda vuelta, perdió 48.55% vs 51.45% ante Humala), 2016 (segunda vuelta, perdió 49.88% vs 50.12% ante PPK — diferencia de ~41,000 votos), 2021 (segunda vuelta, perdió 49.87% vs 50.13% ante Castillo — diferencia de ~44,000 votos) y 2026 (pasa a segunda vuelta del 7 de junio contra Rafael López Aliaga con 16.95% en primera vuelta). Es la primera vez en cuatro intentos que encabeza el conteo de votos válidos en primera vuelta.",

  proposals: [
    {
      area: "seguridad",
      title: "Reducción de homicidios 20% al 2031",
      summary:
        "El plan 'Perú con Orden' propone reducir la tasa nacional de homicidios en 20% para 2031 mediante patrullaje integrado PNP-FFAA, recuperación de espacios públicos y prevención juvenil.",
      feasibility: "baja",
    },
    {
      area: "seguridad",
      title: "Fuerzas Armadas en apoyo a la Policía Nacional",
      summary:
        "Convocatoria de las FFAA para apoyo en tareas de seguridad interna, intervención militar en centros penitenciarios para recuperar control carcelario y creación de unidades especializadas anti-extorsión.",
      feasibility: "media",
    },
    {
      area: "seguridad",
      title: "Expulsión de migrantes indocumentados",
      summary:
        "Propone un 'corredor humanitario' para la expulsión de migrantes en situación irregular, vinculando aumento de criminalidad a migración venezolana no regular.",
      feasibility: "baja",
    },
    {
      area: "economia",
      title: "Independencia del BCRP y consolidación fiscal",
      summary:
        "Defensa del modelo de libre mercado y la Constitución de 1993, asegurando independencia del Banco Central de Reserva del Perú y eliminación de gastos superfluos.",
      feasibility: "alta",
    },
    {
      area: "economia",
      title: "Reforma tributaria para Mypes",
      summary:
        "Prohibición de la doble sanción de cierre y multa para Mypes. Meta: reducir informalidad laboral del 80% actual al 30%, bajo el concepto de 'capitalismo popular'.",
      feasibility: "media",
    },
    {
      area: "economia",
      title: "Ventanilla Única Digital con IA",
      summary:
        "Creación de una plataforma nacional que permita realizar el 80% de los trámites empresariales en línea, eliminando más de 500 procedimientos administrativos redundantes.",
      feasibility: "media",
    },
    {
      area: "economia",
      title: "Modernización de la Ley General de Minería",
      summary:
        "Fast-track para proyectos estratégicos, plazos obligatorios de exploración y simplificación de permisos para inversión minera.",
      feasibility: "media",
    },
    {
      area: "economia",
      title: "Programa 'Capital Semilla Joven'",
      summary:
        "Fondo de emprendimiento para egresados jóvenes que buscan iniciar negocios formales.",
      feasibility: "media",
    },
    {
      area: "politica_social",
      title: "Reducir pobreza al 15% en cinco años",
      summary:
        "El plan proyecta sacar a más de un millón de peruanos de la pobreza en el período 2026-2031, con programas de transferencias condicionadas y generación de empleo formal.",
      feasibility: "baja",
    },
    {
      area: "salud",
      title: "Reducir anemia infantil al 20%",
      summary:
        "Cobertura universal de vacunación y suplementación de hierro para menores de tres años como eje de la política de primera infancia.",
      feasibility: "media",
    },
    {
      area: "educacion",
      title: "Duplicar becas educativas",
      summary:
        "Ampliación del sistema de becas universitarias y técnicas, con énfasis en regiones con mayor brecha educativa.",
      feasibility: "media",
    },
    {
      area: "anticorrupcion",
      title: "Shock Anticorrupción Digital",
      summary:
        "Trazabilidad total de compras públicas mediante plataformas digitales. El plan reconoce un déficit de infraestructura escolar de S/ 158,800 millones.",
      details:
        "Existe contradicción con el historial del partido: Fuerza Popular votó en el Congreso las leyes 32108 y 32130 que debilitaron la persecución del lavado de activos y beneficiaron directamente a Keiko Fujimori (resolución del juez Verástegui, 18 sep 2024).",
      feasibility: "baja",
    },
  ],

  legalHistory: [
    {
      id: "kf-caso-cocteles-archivado",
      type: "proceso_penal",
      status: "archivado",
      title: "Caso Cócteles — Lavado de activos campañas 2011 y 2016",
      description:
        "Investigación iniciada en agosto de 2017 por el fiscal José Domingo Pérez (Equipo Especial Lava Jato). Imputó a Fujimori por el lavado de US$ 17,307,359.72 en aportes ilícitos a las campañas presidenciales de 2011 y 2016 (Odebrecht, Credicorp y aportantes simulados). En julio de 2025, la fiscalía presentó nueva acusación pidiendo 35 años de prisión, multa de 730 días e inhabilitación de 15 años. El 2 de octubre de 2025, el Tribunal Constitucional declaró fundado el habeas corpus de la defensa y anuló todas las investigaciones por lavado de activos y organización criminal (Sentencia 185/2025, Exp. 02109-2024-PHC/TC, mayoría 5-2). El 13 de enero de 2026, el Décimo Juzgado de Investigación Preparatoria Nacional archivó formalmente el caso. Archivado, no resuelto en juicio. Se mantienen imputaciones menores por falsa declaración en procedimiento administrativo y falsedad genérica.",
      date: "2017-08-01",
      severity: 5,
      source: {
        name: "Tribunal Constitucional — Sentencia 185/2025",
        url: "https://www.tc.gob.pe/jurisprudencia/2025/02109-2024-HC.pdf",
        date: "2025-10-20",
        type: "oficial",
        reliability: "alta",
      },
      relatedEntities: [
        "Odebrecht",
        "Fuerza Popular",
        "José Domingo Pérez",
        "Giulliana Loza",
        "Credicorp",
        "Marcelo Odebrecht",
      ],
    },
    {
      id: "kf-investigacion-2021",
      type: "investigacion_fiscal",
      status: "activo",
      title: "Investigación preparatoria — Lavado de activos aportes campaña 2021",
      description:
        "Formalizada el 30 de septiembre de 2025 por la Primera Fiscalía Supraprovincial Corporativa Especializada en Delitos de Lavado de Activos (Segundo Despacho). Imputa a Keiko Fujimori, Luis Galarreta Velarde (1er VP), Miguel Torres Morales (2do VP), Lidman Miranda y al partido Fuerza Popular como persona jurídica, como presuntos coautores e integrantes de organización criminal por lavado de activos. Es el primer caso en la historia peruana en que una plancha presidencial completa está imputada en el mismo proceso por el mismo delito. Los hechos investigados son posteriores a la incorporación del delito de receptación patrimonial al Código Penal (noviembre 2016), por lo que el argumento técnico que utilizó el TC para anular el Caso Cócteles no aplica automáticamente. Proceso activo al 13 de abril de 2026.",
      date: "2025-09-30",
      severity: 4,
      source: {
        name: "RPP Noticias / OjoPúblico",
        url: "https://rpp.pe",
        date: "2025-09-30",
        type: "medio_verificado",
        reliability: "alta",
      },
      relatedEntities: [
        "Luis Galarreta Velarde",
        "Miguel Torres Morales",
        "Lidman Miranda",
        "Fuerza Popular",
      ],
    },
    {
      id: "kf-prision-preventiva",
      type: "prision_preventiva",
      status: "resuelto",
      title: "Prisiones preventivas en marco del Caso Cócteles",
      description:
        "Octubre 2018: orden de prisión preventiva por 36 meses, recluida en el penal Anexo Mujeres de Chorrillos. Liberada en noviembre 2019 por orden del TC (13 meses cumplidos). Enero 2020: nueva orden de prisión preventiva por 15 meses; cumplió 3.5 meses adicionales hasta mayo 2020 cuando una sala revocó la medida. Total: aproximadamente 16 meses y medio de privación de libertad. La sentencia 185/2025 del TC declaró que dichas medidas vulneraron su derecho a la libertad personal.",
      date: "2018-10-31",
      severity: 3,
      source: {
        name: "Poder Judicial — CEJ",
        url: "https://cej.pj.gob.pe",
        date: "2020-05-01",
        type: "oficial",
        reliability: "alta",
      },
    },
    {
      id: "kf-multa-jne-2026",
      type: "otro",
      status: "resuelto",
      title: "Multa JNE de S/ 163,350 por uso indebido de financiamiento público",
      description:
        "El 28 de marzo de 2026, el Pleno del Jurado Nacional de Elecciones confirmó mediante Resolución N.° 0529-2026-JNE la sanción impuesta por la ONPE (noviembre 2025) a Fuerza Popular por usar financiamiento público directo en compras no permitidas durante el segundo semestre de 2023: vales de pavo, canastas navideñas, polos, tomatodos, bolsas ecológicas, trofeos y servicio de máquina 360° con plataforma giratoria para contenido proselitista. Multa: 33 UIT (S/ 163,350) más pérdida del 10% del financiamiento público directo semestral. Calificada como infracción 'muy grave' bajo el artículo 36 de la Ley de Organizaciones Políticas. El recurso de apelación de Martha Chávez (representante legal del partido) fue declarado infundado. Decisión definitiva en sede administrativa.",
      date: "2026-03-28",
      severity: 2,
      source: {
        name: "JNE — Resolución N.° 0529-2026-JNE",
        url: "https://www.jne.gob.pe",
        date: "2026-03-28",
        type: "oficial",
        reliability: "alta",
      },
      relatedEntities: ["Fuerza Popular", "Martha Chávez", "ONPE"],
    },
    {
      id: "kf-omisiones-dj",
      type: "otro",
      status: "resuelto",
      title: "Omisión de acciones en declaración jurada de hoja de vida",
      description:
        "El JEE Lima Centro 1 detectó que Fujimori no declaró 3,500 acciones en Summit Products S.A.C. (empresa dada de baja en 2009) ni su participación en Kyara9 E.I.R.L. Mediante Resolución N.° 01408-2026-JEE-LIC1/JNE del 19 de febrero de 2026, el JEE dispuso anotación marginal en la hoja de vida. El JEE consideró que 'no se ha acreditado ocultamiento doloso' y archivó el procedimiento sancionador.",
      date: "2026-02-19",
      severity: 1,
      source: {
        name: "JEE Lima Centro 1 — Resolución N.° 01408-2026-JEE-LIC1/JNE",
        url: "https://votoinformado.jne.gob.pe/hoja-vida/1366/10001088",
        date: "2026-02-19",
        type: "oficial",
        reliability: "alta",
      },
    },
  ],

  patrimony: [
    {
      type: "ingreso",
      description:
        "Ingresos sector público: S/ 0. Ingresos sector privado: S/ 271,853.45 anuales brutos como presidenta de Fuerza Popular, financiados con fondos públicos asignados a partidos que superan la valla electoral. Rentas de tercera categoría (anotación marginal, febrero 2026): S/ 45,597 adicionales.",
      verified: true,
      discrepancy:
        "PerúCheck (La República) verificó como falsa la afirmación de Fujimori de que ante el JNE solo se deben declarar ingresos mensuales. El experto Fernando Tuesta y la normativa vigente exigen declarar todos los ingresos anuales brutos. Esto sugiere posibles ingresos no declarados de instituciones extranjeras durante 2024.",
      source: {
        name: "JNE Voto Informado — Declaración jurada 18/12/2025",
        url: "https://votoinformado.jne.gob.pe/hoja-vida/1366/10001088",
        date: "2025-12-18",
        type: "oficial",
        reliability: "alta",
      },
    },
    {
      type: "propiedad",
      description:
        "Bienes inmuebles: ninguno declarado. Fujimori declaró 'no tener información que reportar' sobre inmuebles a su nombre o de sociedad de gananciales. Bienes muebles: un único vehículo Subaru Forester (2017), valor declarado S/ 115,998, con la anotación de que se encuentra embargado.",
      verified: true,
      discrepancy:
        "El patrimonio declarado es notoriamente austero para alguien con 30 años en la primera línea política (excongresista, exprimera dama, candidata presidencial cuatro veces). La oposición ha cuestionado activamente la ausencia de inmuebles sin presentar evidencia concreta de propiedades ocultas.",
    },
    {
      type: "empresa",
      description:
        "3,500 acciones en Summit Products S.A.C. (empresa dada de baja en 2009) y participación en Kyara9 E.I.R.L. Inicialmente omitidas de la declaración jurada; corregidas mediante anotación marginal del JEE Lima Centro 1 (Resolución N.° 01408-2026-JEE-LIC1/JNE, 19 febrero 2026).",
      verified: true,
    },
  ],

  conflicts: [
    {
      description:
        "Las leyes 32108 y 32130 (modificaciones al Código Penal aprobadas por Fuerza Popular en el Congreso durante 2023-2024) debilitaron la persecución del lavado de activos y el crimen organizado, y beneficiaron directamente a Keiko Fujimori al permitir el levantamiento de medidas restrictivas en su contra (resolución del juez Wilson Verástegui, 18 de septiembre de 2024). Un partido que promete 'Shock Anticorrupción Digital' aprobó normas calificadas como 'pro-crimen' que lo favorecieron en proceso judicial activo.",
      severity: "alto",
      entities: ["Fuerza Popular", "Congreso de la República", "Keiko Fujimori"],
    },
    {
      description:
        "La plancha presidencial completa (Keiko Fujimori como candidata a presidenta, Luis Galarreta como 1er VP, Miguel Torres como 2do VP) está imputada en la misma investigación preparatoria activa por lavado de activos vinculada a la campaña 2021. Primera vez en la historia peruana que una fórmula presidencial completa enfrenta un proceso fiscal en curso por el mismo delito.",
      severity: "alto",
      entities: ["Keiko Fujimori", "Luis Galarreta Velarde", "Miguel Torres Morales", "Fuerza Popular"],
    },
    {
      description:
        "Financiamiento de campañas 2011 y 2016 con presuntos aportes ilícitos de Odebrecht (US$ 1M según Marcelo Odebrecht) y Credicorp/Dionisio Romero. Aunque el Caso Cócteles fue archivado por el TC, el origen de los fondos nunca fue esclarecido en juicio.",
      severity: "alto",
      entities: ["Odebrecht", "Credicorp", "Dionisio Romero Paoletti"],
    },
  ],

  polls: [
    {
      pollster: "datum",
      date: "2026-03-10",
      percentage: 10.9,
      sampleSize: 1501,
      marginOfError: 2.5,
      source: "Datum Internacional — Marzo II 2026 (campo: 6-10 mar)",
    },
    {
      pollster: "ipsos",
      date: "2026-03-06",
      percentage: 14.2,
      sampleSize: 1200,
      marginOfError: 2.8,
      source: "Ipsos Perú / Perú21 — Simulacro Marzo 2026 (votos válidos)",
    },
    {
      pollster: "iep",
      date: "2026-03-11",
      percentage: 9.4,
      sampleSize: 1207,
      marginOfError: 2.8,
      source: "IEP — Informe de Opinión Marzo 2026 (campo: 6-11 mar) — antivoto: 54%",
    },
    {
      pollster: "ipsos",
      date: "2026-04-12",
      percentage: 17.1,
      sampleSize: 0,
      marginOfError: 0,
      source: "Ipsos — Conteo rápido al 95.7% (primera vuelta 12/04/2026)",
    },
    {
      pollster: "datum",
      date: "2026-04-12",
      percentage: 16.8,
      sampleSize: 0,
      marginOfError: 0,
      source: "Datum — Conteo rápido primera vuelta 12/04/2026",
    },
    {
      pollster: "otro",
      date: "2026-04-12",
      percentage: 16.95,
      sampleSize: 0,
      marginOfError: 0,
      source: "ONPE — Resultado oficial primera vuelta 12/04/2026 (57% actas): 1,635,345 votos. Pasa a segunda vuelta del 7 de junio vs. Rafael López Aliaga.",
    },
  ],
  negativeImage: 54,
  tier: "top",

  redFlags: [
    {
      type: "legal",
      severity: "critico",
      title: "Investigación fiscal activa por lavado de activos (campaña 2021)",
      description:
        "La plancha presidencial completa — Fujimori, Galarreta y Torres — está imputada en la misma investigación preparatoria por lavado de activos formalizada el 30 de septiembre de 2025. Primera vez en la historia peruana que una fórmula entera enfrenta un proceso fiscal en curso por el mismo delito.",
    },
    {
      type: "legal",
      severity: "critico",
      title: "Fórmula presidencial completa imputada en mismo proceso",
      description:
        "Keiko Fujimori (presidenta), Luis Galarreta (1er VP) y Miguel Torres (2do VP) son coimputados en la investigación preparatoria por lavado de activos de la campaña 2021. Ningún otro partido en la primera vuelta presentó una situación equivalente.",
    },
    {
      type: "legal",
      severity: "alto",
      title: "Caso Cócteles archivado, no resuelto en juicio",
      description:
        "La anulación del TC fue por mayoría de 5-2, no por unanimidad, con dos votos en contra incluido el de la presidenta del Tribunal. Uno de los magistrados de la mayoría (Francisco Morales Saravia) está bajo investigación por presunto cohecho. El origen de los fondos de campaña nunca fue esclarecido en juicio.",
    },
    {
      type: "legal",
      severity: "medio",
      title: "16.5 meses de prisión preventiva histórica",
      description:
        "Cumplió aproximadamente 16 meses y medio de prisión preventiva entre 2018 y 2020, posteriormente declaradas violatorias de su derecho a la libertad personal por el TC. Son hechos procesales reales con impacto en su trayectoria.",
    },
    {
      type: "legal",
      severity: "medio",
      title: "Multa JNE muy grave por uso indebido de fondos públicos",
      description:
        "El JNE confirmó el 28 de marzo de 2026 una multa de S/ 163,350 más pérdida del 10% del financiamiento semestral por usar fondos del Estado para vales de pavo, canastas navideñas y merchandising electoral, calificada como infracción 'muy grave'.",
    },
    {
      type: "credibilidad",
      severity: "alto",
      title: "54% de antivoto — la más rechazada del país en cuatro elecciones",
      description:
        "Según IEP (marzo 2026), el 54% de los peruanos declara que definitivamente no votaría por ella. Es el antivoto más alto de la contienda, persistente en cuatro elecciones consecutivas. Más pronunciado en electores de 30-49 años con educación superior y en las macrozonas centro y sur.",
    },
    {
      type: "conducta",
      severity: "medio",
      title: "Discurso de fraude electoral del jefe de campaña",
      description:
        "Miguel Torres, jefe de campaña y 2do VP, afirmó en Piura que Fuerza Popular tenía un 'ejército de personeros' porque 'a nosotros no nos vuelven a robar la elección', reproduciendo la teoría del fraudismo de 2021 que nunca fue probada por ninguna instancia.",
    },
    {
      type: "patrimonio",
      severity: "medio",
      title: "Patrimonio declarado notoriamente austero sin justificación clara",
      description:
        "Declaró cero inmuebles y un único vehículo Subaru Forester embargado (S/ 115,998) como único bien relevante, con ingresos de S/ 271,853 anuales como presidenta del partido. Un perfil patrimonial inusualmente bajo para 30 años en primera línea política.",
    },
  ],

  runningMates: [
    {
      position: "1er VP",
      name: "Luis Galarreta Velarde",
      description:
        "Excongresista por Fuerza Popular (2016-2019). Expresidente del Congreso de la República (2017-2018), período de máxima confrontación con el gobierno de PPK. Secretario General de Fuerza Popular. Postula simultáneamente al Parlamento Andino.",
      legalNote:
        "Imputado en la investigación preparatoria por lavado de activos vinculada a aportes de la campaña 2021 (formalización: 30 de septiembre de 2025).",
    },
    {
      position: "2do VP",
      name: "Miguel 'Miki' Torres Morales",
      description:
        "Excongresista por Fuerza Popular (2016-2019). Jefe de campaña de Keiko Fujimori. Encabeza la lista de Fuerza Popular al Senado Nacional. Autor del discurso del 'ejército de personeros' y la teoría del fraude electoral de 2021.",
      legalNote:
        "Imputado en la misma investigación preparatoria por lavado de activos de la campaña 2021 (formalización: 30 de septiembre de 2025).",
    },
  ],

  sources: [
    {
      name: "Tribunal Constitucional — Sentencia 185/2025",
      url: "https://www.tc.gob.pe/jurisprudencia/2025/02109-2024-HC.pdf",
      date: "2025-10-20",
      type: "oficial",
      reliability: "alta",
    },
    {
      name: "JNE Voto Informado — Hoja de vida Keiko Fujimori",
      url: "https://votoinformado.jne.gob.pe/hoja-vida/1366/10001088",
      date: "2025-12-18",
      type: "oficial",
      reliability: "alta",
    },
    {
      name: "ONPE — Resultados primera vuelta 12/04/2026",
      url: "https://www.onpe.gob.pe",
      date: "2026-04-12",
      type: "oficial",
      reliability: "alta",
    },
    {
      name: "JNE — Resolución N.° 0529-2026-JNE (multa Fuerza Popular)",
      url: "https://www.jne.gob.pe",
      date: "2026-03-28",
      type: "oficial",
      reliability: "alta",
    },
    {
      name: "RPP Noticias — Investigación preparatoria campaña 2021",
      url: "https://rpp.pe",
      date: "2025-09-30",
      type: "medio_verificado",
      reliability: "alta",
    },
    {
      name: "OjoPúblico — Plancha presidencial imputada",
      url: "https://ojo-publico.com",
      date: "2025-10-01",
      type: "investigacion",
      reliability: "alta",
    },
    {
      name: "IDL Reporteros — Caso Cócteles y anulación TC",
      url: "https://www.idl-reporteros.pe",
      date: "2025-10-02",
      type: "investigacion",
      reliability: "alta",
    },
    {
      name: "El Comercio — Caso Cócteles",
      url: "https://elcomercio.pe",
      date: "2025-10-03",
      type: "medio_verificado",
      reliability: "alta",
    },
    {
      name: "La República / PerúCheck — Verificación declaraciones Fujimori",
      url: "https://larepublica.pe",
      date: "2026-02-15",
      type: "investigacion",
      reliability: "alta",
    },
    {
      name: "Infobae Perú — TC, multa JNE, declaración jurada",
      url: "https://www.infobae.com/peru",
      date: "2026-03-28",
      type: "medio_verificado",
      reliability: "alta",
    },
    {
      name: "IEP — Informe de Opinión Marzo 2026",
      url: "https://iep.org.pe",
      date: "2026-03-11",
      type: "investigacion",
      reliability: "alta",
    },
    {
      name: "Datum Internacional — Encuestas Marzo 2026",
      url: "https://www.datum.com.pe",
      date: "2026-03-10",
      type: "encuestadora",
      reliability: "alta",
    },
    {
      name: "Ipsos Perú — Encuestas y conteo rápido",
      url: "https://www.ipsos.com/es-pe",
      date: "2026-04-12",
      type: "encuestadora",
      reliability: "alta",
    },
    {
      name: "Plan de gobierno Fuerza Popular — 'Perú con Orden 2026-2031'",
      url: "https://fuerzapopular.com.pe/wp-content/uploads/2026/02/Plan-de-Gobierno-Reforzado_V2.pdf",
      date: "2026-02-01",
      type: "documento_publico",
      reliability: "alta",
    },
    {
      name: "Wikipedia — Juicio a Keiko Fujimori (cronología procesal)",
      url: "https://es.wikipedia.org/wiki/Juicio_a_Keiko_Fujimori",
      date: "2026-04-01",
      type: "otro",
      reliability: "media",
    },
  ],
  lastUpdated: "2026-04-13",
  investigationStatus: "completo",
  notes:
    "Perfil actualizado al 13 de abril de 2026 con datos de primera vuelta (16.95%, 1,635,345 votos). El cambio más importante respecto a versiones anteriores: el Caso Cócteles fue archivado por el TC el 2 de octubre de 2025 (Sentencia 185/2025, mayoría 5-2) y formalmente por el Poder Judicial el 13 de enero de 2026. El proceso judicial vivo hoy es la investigación preparatoria por lavado de activos de la campaña 2021, formalizada el 30 de septiembre de 2025, que incluye a la plancha presidencial completa y a Fuerza Popular como persona jurídica. El informe completo de investigación con fuentes primarias y análisis detallado está en src/data/research/investigacion-keiko-fujimori.md.",
};
