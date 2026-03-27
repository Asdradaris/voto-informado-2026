import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { content, fingerprint, roundNumber } = await req.json();

    // Validate
    if (!content || !fingerprint) {
      return new Response(
        JSON.stringify({ error: "invalid", message: "Datos incompletos" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const trimmed = content.trim();

    if (trimmed.length < 10 || trimmed.length > 500) {
      return new Response(
        JSON.stringify({ error: "invalid", message: "La sugerencia debe tener entre 10 y 500 caracteres" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (containsBlockedContent(trimmed)) {
      return new Response(
        JSON.stringify({ error: "blocked", message: "Tu sugerencia contiene contenido no permitido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Rate limit: max 3 suggestions per fingerprint per round
    const { count } = await supabase
      .from("citizen_suggestions")
      .select("*", { count: "exact", head: true })
      .eq("fingerprint", fingerprint)
      .eq("voting_round", roundNumber || 1);

    if ((count ?? 0) >= 3) {
      return new Response(
        JSON.stringify({
          error: "rate_limit",
          message: "Alcanzaste el límite de sugerencias para esta ronda",
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { error: insertError } = await supabase.from("citizen_suggestions").insert({
      content: trimmed,
      fingerprint,
      voting_round: roundNumber || 1,
    });

    if (insertError) throw insertError;

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("submit-suggestion error:", err);
    return new Response(
      JSON.stringify({ error: "server_error", message: "Error interno del servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
