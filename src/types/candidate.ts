export interface Candidate {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  party: Party;
  photo: string;
  age: number;
  birthplace: string;
  profession: string;
  education: Education[];
  politicalHistory: string;

  proposals: Proposal[];
  legalHistory: LegalRecord[];
  patrimony: PatrimonyRecord[];
  conflicts: ConflictOfInterest[];

  polls: PollData[];
  negativeImage: number | null;
  tier: "top" | "mid" | "low";

  redFlags: RedFlag[];
  runningMates?: RunningMate[];

  sources: Source[];
  lastUpdated: string;
  investigationStatus: "completo" | "en_progreso" | "pendiente";
  notes: string;
}

export interface RunningMate {
  position: "1er VP" | "2do VP";
  name: string;
  description: string;
  legalNote?: string;
}

export interface Party {
  name: string;
  acronym: string;
  color: string;
  ideology: string;
  foundedYear: number;
  congressSeats?: number;
  logoUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
  verified: boolean;
  notes?: string;
}

export interface Proposal {
  area: ProposalArea;
  title: string;
  summary: string;
  details?: string;
  feasibility: "alta" | "media" | "baja" | "sin_evaluar";
  sourceUrl?: string;
}

export type ProposalArea =
  | "seguridad"
  | "economia"
  | "educacion"
  | "salud"
  | "infraestructura"
  | "medio_ambiente"
  | "anticorrupcion"
  | "justicia"
  | "politica_social"
  | "tecnologia"
  | "trabajo"
  | "agricultura"
  | "relaciones_exteriores"
  | "reforma_estado"
  | "otro";

export interface LegalRecord {
  id: string;
  type:
    | "proceso_penal"
    | "proceso_civil"
    | "investigacion_fiscal"
    | "sentencia"
    | "prision_preventiva"
    | "inhabilitacion"
    | "denuncia_constitucional"
    | "otro";
  status: "activo" | "archivado" | "resuelto" | "apelacion" | "profugo";
  title: string;
  description: string;
  date: string;
  severity: 1 | 2 | 3 | 4 | 5;
  source: Source;
  relatedEntities?: string[];
}

export interface PatrimonyRecord {
  type: "ingreso" | "propiedad" | "empresa" | "deuda" | "otro";
  description: string;
  estimatedValue?: number;
  verified: boolean;
  discrepancy?: string;
  source?: Source;
}

export interface ConflictOfInterest {
  description: string;
  severity: "alto" | "medio" | "bajo";
  entities: string[];
  source?: Source;
}

export interface RedFlag {
  type: "legal" | "patrimonio" | "conflicto" | "credibilidad" | "conducta";
  severity: "critico" | "alto" | "medio";
  title: string;
  description: string;
  source?: Source;
}

export interface PollData {
  pollster: "datum" | "ipsos" | "cpi" | "iep" | "otro";
  date: string;
  percentage: number;
  sampleSize: number;
  marginOfError: number;
  source: string;
}

export interface Source {
  name: string;
  url: string;
  date: string;
  type:
    | "oficial"
    | "medio_verificado"
    | "investigacion"
    | "encuestadora"
    | "documento_publico"
    | "otro";
  reliability: "alta" | "media" | "baja";
}
