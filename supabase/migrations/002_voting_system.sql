-- =============================================
-- VOTO INFORMADO 2026 — Sistema de Votación Ciudadana
-- Migración: 002_voting_system
-- =============================================

-- Configuración de rondas de votación
CREATE TABLE voting_rounds (
  id SERIAL PRIMARY KEY,
  round_number INTEGER UNIQUE NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT false,
  winner_candidate_id TEXT,
  total_votes INTEGER DEFAULT 0
);

-- Tabla principal de votos
CREATE TABLE citizen_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  voting_round INTEGER DEFAULT 1,

  -- Anti-duplicado: 1 fingerprint = 1 voto por ronda
  UNIQUE(fingerprint, voting_round)
);

-- Índices para performance
CREATE INDEX idx_citizen_votes_round ON citizen_votes(voting_round);
CREATE INDEX idx_citizen_votes_candidate ON citizen_votes(candidate_id, voting_round);
CREATE INDEX idx_citizen_votes_ip_hash ON citizen_votes(ip_hash, created_at);

-- Vista materializada para contadores agregados
CREATE MATERIALIZED VIEW vote_counts AS
SELECT
  candidate_id,
  voting_round,
  COUNT(*) as total_votes,
  COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER (PARTITION BY voting_round), 0) as percentage
FROM citizen_votes
GROUP BY candidate_id, voting_round
ORDER BY total_votes DESC;

CREATE UNIQUE INDEX idx_vote_counts_candidate_round ON vote_counts(candidate_id, voting_round);

-- Sugerencias ciudadanas
CREATE TABLE citizen_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL CHECK (char_length(content) BETWEEN 10 AND 500),
  fingerprint TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  voting_round INTEGER DEFAULT 1
);

CREATE INDEX idx_citizen_suggestions_round ON citizen_suggestions(voting_round, created_at DESC);

-- Row Level Security
ALTER TABLE citizen_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE citizen_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE voting_rounds ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede insertar votos
CREATE POLICY "anyone_can_vote" ON citizen_votes
  FOR INSERT WITH CHECK (true);

-- Nadie lee votos individuales (privacidad)
CREATE POLICY "no_individual_vote_reads" ON citizen_votes
  FOR SELECT USING (false);

-- Cualquiera puede sugerir
CREATE POLICY "anyone_can_suggest" ON citizen_suggestions
  FOR INSERT WITH CHECK (true);

-- Sugerencias son públicas para lectura
CREATE POLICY "public_read_suggestions" ON citizen_suggestions
  FOR SELECT USING (true);

-- Rondas son públicas para lectura
CREATE POLICY "public_read_rounds" ON voting_rounds
  FOR SELECT USING (true);

-- Función para refrescar la vista materializada
CREATE OR REPLACE FUNCTION refresh_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY vote_counts;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para refrescar contadores después de cada voto
CREATE TRIGGER trigger_refresh_vote_counts
  AFTER INSERT ON citizen_votes
  FOR EACH STATEMENT
  EXECUTE FUNCTION refresh_vote_counts();

-- Insertar primera ronda
INSERT INTO voting_rounds (round_number, starts_at, ends_at, is_active)
VALUES (1, '2026-03-27T00:00:00-05:00', '2026-04-03T23:59:59-05:00', true);
