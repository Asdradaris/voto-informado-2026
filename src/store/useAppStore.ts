import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserScore, ScoringDimension } from "../types";
import { DEFAULT_SCORING_CONFIG } from "../config/scoring";

interface AppState {
  scores: UserScore[];
  weights: Record<string, number>;
  favorites: string[];
  compareIds: [string, string] | null;

  setScore: (score: UserScore) => void;
  removeScore: (candidateId: string, criterionId: string) => void;
  clearCandidateScores: (candidateId: string) => void;

  setWeight: (dimensionId: string, weight: number) => void;
  resetWeights: () => void;

  toggleFavorite: (candidateId: string) => void;
  setCompare: (ids: [string, string] | null) => void;
}

const defaultWeights = Object.fromEntries(
  DEFAULT_SCORING_CONFIG.dimensions.map((d: ScoringDimension) => [d.id, d.weight])
);

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      scores: [],
      weights: { ...defaultWeights },
      favorites: [],
      compareIds: null,

      setScore: (score) =>
        set((state) => {
          const filtered = state.scores.filter(
            (s) =>
              !(
                s.candidateId === score.candidateId &&
                s.criterionId === score.criterionId
              )
          );
          return { scores: [...filtered, score] };
        }),

      removeScore: (candidateId, criterionId) =>
        set((state) => ({
          scores: state.scores.filter(
            (s) =>
              !(
                s.candidateId === candidateId &&
                s.criterionId === criterionId
              )
          ),
        })),

      clearCandidateScores: (candidateId) =>
        set((state) => ({
          scores: state.scores.filter(
            (s) => s.candidateId !== candidateId
          ),
        })),

      setWeight: (dimensionId, weight) =>
        set((state) => ({
          weights: { ...state.weights, [dimensionId]: weight },
        })),

      resetWeights: () => set({ weights: { ...defaultWeights } }),

      toggleFavorite: (candidateId) =>
        set((state) => ({
          favorites: state.favorites.includes(candidateId)
            ? state.favorites.filter((id) => id !== candidateId)
            : [...state.favorites, candidateId],
        })),

      setCompare: (ids) => set({ compareIds: ids }),
    }),
    {
      name: "voto-informado-2026",
    }
  )
);
