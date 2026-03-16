import type {
  ScoringConfig,
  UserScore,
  CandidateRanking,
  ScoringDimension,
} from "../types";

export function calculateDimensionScore(
  dimension: ScoringDimension,
  scores: UserScore[]
): { rawScore: number; weightedScore: number } {
  const dimensionScores = scores.filter(
    (s) => s.dimensionId === dimension.id
  );

  if (dimensionScores.length === 0) {
    return { rawScore: 0, weightedScore: 0 };
  }

  const rawScore =
    dimensionScores.reduce((sum, s) => sum + s.score, 0) /
    dimension.criteria.length;

  const weightedScore = (rawScore * dimension.weight) / 100;

  return { rawScore, weightedScore };
}

export function calculateTotalScore(
  config: ScoringConfig,
  scores: UserScore[]
): number {
  return config.dimensions.reduce((total, dimension) => {
    const { weightedScore } = calculateDimensionScore(dimension, scores);
    return total + weightedScore;
  }, 0);
}

export function calculateRanking(
  config: ScoringConfig,
  allScores: UserScore[],
  candidateIds: string[]
): CandidateRanking[] {
  const rankings: CandidateRanking[] = candidateIds.map((candidateId) => {
    const candidateScores = allScores.filter(
      (s) => s.candidateId === candidateId
    );

    const dimensionScores = config.dimensions.map((dimension) => {
      const { rawScore, weightedScore } = calculateDimensionScore(
        dimension,
        candidateScores
      );
      return {
        dimensionId: dimension.id,
        rawScore,
        weightedScore,
      };
    });

    const totalScore = dimensionScores.reduce(
      (sum, d) => sum + d.weightedScore,
      0
    );

    return {
      candidateId,
      totalScore: Math.round(totalScore * 10) / 10,
      dimensionScores,
      rank: 0,
    };
  });

  rankings.sort((a, b) => b.totalScore - a.totalScore);
  rankings.forEach((r, i) => {
    r.rank = i + 1;
  });

  return rankings;
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "#2ED573";
  if (score >= 60) return "#FFA502";
  if (score >= 40) return "#FF8C00";
  if (score >= 20) return "#FF4757";
  return "#D63031";
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Candidato sólido";
  if (score >= 60) return "Aceptable con reservas";
  if (score >= 40) return "Cuestionable";
  if (score >= 20) return "Red flags significativas";
  return "Problemas graves";
}
