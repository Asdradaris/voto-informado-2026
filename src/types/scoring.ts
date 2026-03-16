export interface ScoringConfig {
  dimensions: ScoringDimension[];
  totalWeight: 100;
}

export interface ScoringDimension {
  id: string;
  label: string;
  description: string;
  icon: string;
  weight: number;
  criteria: ScoringCriterion[];
}

export interface ScoringCriterion {
  id: string;
  label: string;
  description: string;
  maxScore: 10;
}

export interface UserScore {
  candidateId: string;
  dimensionId: string;
  criterionId: string;
  score: number;
  notes?: string;
  timestamp: string;
}

export interface CandidateRanking {
  candidateId: string;
  totalScore: number;
  dimensionScores: {
    dimensionId: string;
    rawScore: number;
    weightedScore: number;
  }[];
  rank: number;
}
