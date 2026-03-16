import type { Candidate } from "../../types";
import { keikoFujimori } from "./keiko-fujimori";
import { rafaelLopezAliaga } from "./rafael-lopez-aliaga";
import { alfonsoLopezChau } from "./alfonso-lopez-chau";
import { cesarAcuna } from "./cesar-acuna";
import { carlosAlvarez } from "./carlos-alvarez";

export const candidates: Candidate[] = [
  keikoFujimori,
  rafaelLopezAliaga,
  alfonsoLopezChau,
  cesarAcuna,
  carlosAlvarez,
];

export function getCandidateById(id: string): Candidate | undefined {
  return candidates.find((c) => c.id === id);
}

export function getCandidatesByTier(tier: Candidate["tier"]): Candidate[] {
  return candidates.filter((c) => c.tier === tier);
}
