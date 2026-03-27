import { useEffect, useState, useCallback } from "react";
import { supabase, isDemoMode } from "@/lib/supabase";
import { useFingerprint } from "./useFingerprint";
import type { CitizenSuggestion } from "@/types";

const SUGGESTION_COUNT_KEY = "vi_suggestions";

const DEMO_SUGGESTIONS: CitizenSuggestion[] = [
  {
    id: "1",
    content: "Quiero saber de dónde sale la plata de López Aliaga para su campaña",
    createdAt: new Date(Date.now() - 3 * 60000).toISOString(),
    roundNumber: 1,
  },
  {
    id: "2",
    content: "Necesitamos que investiguen el caso Qali Warma y Acuña",
    createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
    roundNumber: 1,
  },
  {
    id: "3",
    content: "¿Alguien sabe si Grozo tiene conflictos de interés? No encuentro info",
    createdAt: new Date(Date.now() - 28 * 60000).toISOString(),
    roundNumber: 1,
  },
  {
    id: "4",
    content: "Me preocupa que ningún candidato hable de reforma educativa en serio",
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
    roundNumber: 1,
  },
  {
    id: "5",
    content: "Investiguen las propiedades no declaradas de Keiko Fujimori",
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
    roundNumber: 1,
  },
];

// Basic profanity filter
const BLOCKED_WORDS = [
  "mierda", "carajo", "puta", "pendejo", "cojudo", "huevón",
  "imbécil", "idiota", "estúpido",
];

function containsBlockedContent(text: string): boolean {
  const lower = text.toLowerCase();
  if (BLOCKED_WORDS.some((w) => lower.includes(w))) return true;
  // Block URLs
  if (/https?:\/\/|www\./i.test(text)) return true;
  return false;
}

function getSuggestionCount(round: number): number {
  try {
    return Number(localStorage.getItem(`${SUGGESTION_COUNT_KEY}_r${round}`) || "0");
  } catch {
    return 0;
  }
}

function incrementSuggestionCount(round: number) {
  const current = getSuggestionCount(round);
  localStorage.setItem(`${SUGGESTION_COUNT_KEY}_r${round}`, String(current + 1));
}

export function useSuggestions(roundNumber: number) {
  const { fingerprint } = useFingerprint();
  const [suggestions, setSuggestions] = useState<CitizenSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSuggest, setCanSuggest] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check limit
  useEffect(() => {
    const count = getSuggestionCount(roundNumber);
    setCanSuggest(count < 3);
  }, [roundNumber]);

  // Fetch suggestions
  useEffect(() => {
    async function fetch() {
      if (isDemoMode) {
        setSuggestions(DEMO_SUGGESTIONS);
        setIsLoading(false);
        return;
      }

      const { data, error: err } = await supabase
        .from("citizen_suggestions")
        .select("*")
        .eq("voting_round", roundNumber)
        .order("created_at", { ascending: false })
        .limit(20);

      if (!err && data) {
        setSuggestions(
          data.map((d) => ({
            id: d.id,
            content: d.content,
            createdAt: d.created_at,
            roundNumber: d.voting_round,
          }))
        );
      }
      setIsLoading(false);
    }

    fetch();
  }, [roundNumber]);

  // Realtime subscription for new suggestions
  useEffect(() => {
    if (isDemoMode) return;

    const channel = supabase
      .channel("suggestions-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "citizen_suggestions",
          filter: `voting_round=eq.${roundNumber}`,
        },
        (payload) => {
          const newSuggestion: CitizenSuggestion = {
            id: payload.new.id,
            content: payload.new.content,
            createdAt: payload.new.created_at,
            roundNumber: payload.new.voting_round,
          };
          setSuggestions((prev) => [newSuggestion, ...prev].slice(0, 20));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roundNumber]);

  const submitSuggestion = useCallback(
    async (content: string): Promise<{ ok: boolean; message?: string }> => {
      setError(null);

      // Validations
      const trimmed = content.trim();
      if (trimmed.length < 10) {
        return { ok: false, message: "Escribe al menos 10 caracteres" };
      }
      if (trimmed.length > 500) {
        return { ok: false, message: "Máximo 500 caracteres" };
      }
      if (containsBlockedContent(trimmed)) {
        return { ok: false, message: "Tu sugerencia contiene contenido no permitido" };
      }
      if (!canSuggest) {
        return { ok: false, message: "Alcanzaste el límite de sugerencias para esta ronda" };
      }

      setIsSubmitting(true);

      if (isDemoMode) {
        const newSuggestion: CitizenSuggestion = {
          id: crypto.randomUUID(),
          content: trimmed,
          createdAt: new Date().toISOString(),
          roundNumber,
        };
        setSuggestions((prev) => [newSuggestion, ...prev]);
        incrementSuggestionCount(roundNumber);
        setCanSuggest(getSuggestionCount(roundNumber) < 3);
        setIsSubmitting(false);
        return { ok: true };
      }

      try {
        const { error: err } = await supabase.from("citizen_suggestions").insert({
          content: trimmed,
          fingerprint: fingerprint || "anonymous",
          voting_round: roundNumber,
        });

        if (err) {
          setError("Error al enviar tu sugerencia");
          setIsSubmitting(false);
          return { ok: false, message: "Error al enviar" };
        }

        incrementSuggestionCount(roundNumber);
        setCanSuggest(getSuggestionCount(roundNumber) < 3);
        setIsSubmitting(false);
        return { ok: true };
      } catch {
        setIsSubmitting(false);
        return { ok: false, message: "Error de conexión" };
      }
    },
    [fingerprint, roundNumber, canSuggest]
  );

  return {
    suggestions,
    isLoading,
    isSubmitting,
    canSuggest,
    error,
    submitSuggestion,
  };
}
