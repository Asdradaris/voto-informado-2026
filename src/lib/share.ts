import type { Candidate } from "../types";

interface ShareData {
  title: string;
  text: string;
  url: string;
}

function canShare(): boolean {
  return typeof navigator !== "undefined" && !!navigator.share;
}

async function share(data: ShareData): Promise<boolean> {
  if (canShare()) {
    try {
      await navigator.share(data);
      return true;
    } catch {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${data.text}\n${data.url}`);
        return true;
      }
    }
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(`${data.text}\n${data.url}`);
    return true;
  }
  return false;
}

export async function shareCandidate(candidate: Candidate): Promise<boolean> {
  const url = `${window.location.origin}/candidate/${candidate.id}`;
  const polls = candidate.polls[0];
  const pollText = polls ? ` (${polls.percentage}% en encuestas)` : "";

  return share({
    title: `${candidate.name} - VOTO INFORMADO 2026`,
    text: `Conoce el perfil de ${candidate.name}${pollText} — ${candidate.party.name}. Investiga antes de votar.`,
    url,
  });
}

export async function shareComparison(
  a: Candidate,
  b: Candidate
): Promise<boolean> {
  const url = `${window.location.origin}/compare?a=${a.id}&b=${b.id}`;

  return share({
    title: `${a.firstName} vs ${b.firstName} - VOTO INFORMADO 2026`,
    text: `Compara a ${a.name} (${a.party.acronym}) vs ${b.name} (${b.party.acronym}). Información verificable para votar mejor.`,
    url,
  });
}

export async function shareRanking(
  items: { name: string; score: number }[]
): Promise<boolean> {
  const lines = items
    .slice(0, 5)
    .map((item, i) => `${i + 1}. ${item.name}: ${Math.round(item.score * 10) / 10}/100`);

  return share({
    title: "Mi Ranking - VOTO INFORMADO 2026",
    text: `Mi ranking personal de candidatos:\n${lines.join("\n")}\n\nCrea tu propio ranking en:`,
    url: `${window.location.origin}/ranking`,
  });
}
