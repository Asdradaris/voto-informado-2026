import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VALID_FINALISTS = ["keiko-fujimori", "rafael-lopez-aliaga"] as const;

// Encuesta cerrada 1 día antes del voto oficial (hora Perú UTC-5)
const POLL_CLOSE_DATE = new Date("2026-06-06T23:59:59-05:00");

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str + (Deno.env.get("HASH_SALT") || "vi2026"));
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { candidateId, fingerprint, honeypot, loadTime } = await req.json();

    // Anti-bot: honeypot
    if (honeypot) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Anti-bot: timing check (<2s = probably a bot)
    const now = Date.now();
    if (loadTime && now - loadTime < 2000) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validar inputs básicos
    if (!candidateId || !fingerprint) {
      return new Response(
        JSON.stringify({ error: "invalid", message: "Datos incompletos" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validar que el candidato sea uno de los 2 finalistas
    if (!VALID_FINALISTS.includes(candidateId as typeof VALID_FINALISTS[number])) {
      return new Response(
        JSON.stringify({ error: "invalid", message: "Candidato no válido para segunda vuelta" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validar que la encuesta esté abierta
    if (Date.now() > POLL_CLOSE_DATE.getTime()) {
      return new Response(
        JSON.stringify({ error: "closed", message: "La encuesta cerró el 6 de junio." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Hash IP para privacidad
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ipHash = await hashString(ip);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Rate limit: máximo 3 votos por IP en toda la vida de la encuesta
    const { count: votesFromIp } = await supabase
      .from("citizen_votes")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash);

    if ((votesFromIp ?? 0) >= 3) {
      return new Response(
        JSON.stringify({
          error: "rate_limit",
          message: "Se alcanzó el límite de votos desde tu red.",
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insertar voto (UNIQUE constraint en fingerprint previene duplicados)
    const { error: insertError } = await supabase.from("citizen_votes").insert({
      candidate_id: candidateId,
      fingerprint,
      ip_hash: ipHash,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        return new Response(
          JSON.stringify({
            error: "already_voted",
            message: "Ya votaste en esta encuesta. 1 dispositivo = 1 voto.",
          }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw insertError;
    }

    // Obtener total actualizado
    const { count: totalVotes } = await supabase
      .from("citizen_votes")
      .select("*", { count: "exact", head: true });

    return new Response(
      JSON.stringify({ ok: true, voteNumber: totalVotes ?? 1 }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("cast-vote error:", err);
    return new Response(
      JSON.stringify({ error: "server_error", message: "Error interno del servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
