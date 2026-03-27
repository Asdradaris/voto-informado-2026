import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str + (Deno.env.get("HASH_SALT") || "vi2026"));
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  // Handle CORS preflight
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

    // Validate inputs
    if (!candidateId || !fingerprint) {
      return new Response(
        JSON.stringify({ error: "invalid", message: "Datos incompletos" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Hash IP for privacy
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ipHash = await hashString(ip);

    // Create Supabase admin client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Rate limit: max 3 votes per IP in 24h
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: recentFromIp } = await supabase
      .from("citizen_votes")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", twentyFourHoursAgo);

    if ((recentFromIp ?? 0) >= 3) {
      return new Response(
        JSON.stringify({
          error: "rate_limit",
          message: "Se alcanzó el límite de votos desde tu red. Intenta mañana.",
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get active round
    const { data: activeRound } = await supabase
      .from("voting_rounds")
      .select("*")
      .eq("is_active", true)
      .single();

    if (!activeRound) {
      return new Response(
        JSON.stringify({ error: "closed", message: "No hay ronda de votación activa" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Insert vote (UNIQUE constraint prevents duplicate fingerprint per round)
    const { error: insertError } = await supabase.from("citizen_votes").insert({
      candidate_id: candidateId,
      fingerprint,
      ip_hash: ipHash,
      voting_round: activeRound.round_number,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        return new Response(
          JSON.stringify({
            error: "already_voted",
            message: "Ya votaste en esta ronda",
          }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw insertError;
    }

    // Update total votes counter
    await supabase
      .from("voting_rounds")
      .update({ total_votes: activeRound.total_votes + 1 })
      .eq("id", activeRound.id);

    return new Response(
      JSON.stringify({ ok: true, voteNumber: activeRound.total_votes + 1 }),
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
