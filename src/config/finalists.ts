import type { Candidate } from "../types";

export const FINALISTS_IDS = ['keiko-fujimori', 'rafael-lopez-aliaga'] as const;
export const SECOND_ROUND_DATE = new Date('2026-06-07T08:00:00-05:00');
export const IS_SECOND_ROUND_PHASE = true;

// Encuesta ciudadana binaria: abierta hasta 1 día antes del voto oficial
export const POLL_CLOSE_DATE = new Date('2026-06-06T23:59:59-05:00');

// Pregunta central de la encuesta — no suavizar, no reformular
export const POLL_QUESTION = '¿A quién consideras menos malo?';
export const POLL_SUBTITLE =
  'Reconocemos la realidad: ambos finalistas tienen altos niveles de rechazo. ' +
  'Esta encuesta mide el voto útil, no el entusiasmo.';

export function getFinalists(allCandidates: Candidate[]): Candidate[] {
  return FINALISTS_IDS
    .map((id) => allCandidates.find((c) => c.id === id))
    .filter((c): c is Candidate => c !== undefined);
}
