import type { Candidate } from "../types";

export const FINALISTS_IDS = ['keiko-fujimori', 'rafael-lopez-aliaga'] as const;
export const SECOND_ROUND_DATE = new Date('2026-06-07T08:00:00-05:00');
export const IS_SECOND_ROUND_PHASE = true;

export function getFinalists(allCandidates: Candidate[]): Candidate[] {
  return FINALISTS_IDS
    .map((id) => allCandidates.find((c) => c.id === id))
    .filter((c): c is Candidate => c !== undefined);
}
