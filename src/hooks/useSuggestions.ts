import { useEffect, useState, useCallback } from "react";
import { supabase, isDemoMode } from "@/lib/supabase";
import { useFingerprint } from "./useFingerprint";
import type { CitizenSuggestion } from "@/types";

const SUGGESTION_COUNT_KEY = "vi_suggestions_r2";

// Basic profanity filter
const BLOCKED_WORDS = [
  "mierda", "carajo", "puta", "pendejo", "cojudo", "huevón",
  "imbécil", "idiota", "estúpido",
];

function containsBlockedContent(text: string): boolean {
  const lower = text.toLowerCase();
  if (BLOCKED_WORDS.some((w) => lower.includes(w))) return true;
  if (/https?:\/\/|www\./i.test(text)) return true;
  return false;
}

function getSuggestionCount(): number {
  try {
    return Number(localStorage.getItem(SUGGESTION_COUNT_KEY) || "0");
  } catch {
    return 0;
  }
}

function incrementSuggestionCount() {
  const current = getSuggestionCount();
  localStorage.setItem(SUGGESTION_COUNT_KEY, String(current + 1));
}

export function useSuggestions() {
  const { fingerprint } = useFingerprint();
  const [suggestions, setSuggestions] = useState<CitizenSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSuggest, setCanSuggest] = useState(true);

  useEffect(() => {
    setCanSuggest(getSuggestionCount() < 3);
  }, []);

  // Fetch inicial
  useEffect(() => {
    async function fetchSuggestions() {
      if (isDemoMode) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("citizen_suggestions")
        .select("id, content, created_at")
        .order("created_at", { ascending: false })
        .limit(20);

      if (!error && data) {
        setSuggestions(
          data.map((d) => ({
            id: d.id,
            content: d.content,
            createdAt: d.created_at,
          }))
        );
      }
      setIsLoading(false);
    }

    fetchSuggestions();
  }, []);

  // Realtime
  useEffect(() => {
    if (isDemoMode) return;

    const channel = supabase
      .channel("suggestions-realtime-r2")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "citizen_suggestions" },
        (payload) => {
          const newSuggestion: CitizenSuggestion = {
            id: payload.new.id,
            content: payload.new.content,
            createdAt: payload.new.created_at,
          };
          setSuggestions((prev) => [newSuggestion, ...prev].slice(0, 20));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const submitSuggestion = useCallback(
    async (content: string): Promise<{ ok: boolean; message?: string }> => {
      const trimmed = content.trim();
      if (trimmed.length < 10) return { ok: false, message: "Escribe al menos 10 caracteres" };
      if (trimmed.length > 500) return { ok: false, message: "Máximo 500 caracteres" };
      if (containsBlockedContent(trimmed)) return { ok: false, message: "Tu sugerencia contiene contenido no permitido" };
      if (!canSuggest) return { ok: false, message: "Alcanzaste el límite de sugerencias" };

      setIsSubmitting(true);

      if (isDemoMode) {
        const newSuggestion: CitizenSuggestion = {
          id: crypto.randomUUID(),
          content: trimmed,
          createdAt: new Date().toISOString(),
        };
        setSuggestions((prev) => [newSuggestion, ...prev]);
        incrementSuggestionCount();
        setCanSuggest(getSuggestionCount() < 3);
        setIsSubmitting(false);
        return { ok: true };
      }

      try {
        const { error } = await supabase.from("citizen_suggestions").insert({
          content: trimmed,
          fingerprint: fingerprint || "anonymous",
        });

        if (error) {
          setIsSubmitting(false);
          return { ok: false, message: "Error al enviar" };
        }

        incrementSuggestionCount();
        setCanSuggest(getSuggestionCount() < 3);
        setIsSubmitting(false);
        return { ok: true };
      } catch {
        setIsSubmitting(false);
        return { ok: false, message: "Error de conexión" };
      }
    },
    [fingerprint, canSuggest]
  );

  return { suggestions, isLoading, isSubmitting, canSuggest, submitSuggestion };
}
