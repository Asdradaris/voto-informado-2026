-- =============================================
-- VOTO INFORMADO 2026 — Segunda Vuelta Binaria
-- Migración: 003_binary_poll_second_round
-- =============================================
-- Fecha: 2026-04-13
-- Contexto: La encuesta pasa de 36 candidatos con rondas semanales
-- a una encuesta binaria única (Keiko vs RLA) hasta el 6 de junio.

-- =============================================
-- PASO 1: Archivar datos de primera vuelta
-- =============================================

CREATE TABLE citizen_votes_archive_round1 AS
SELECT * FROM citizen_votes;

CREATE TABLE citizen_suggestions_archive_round1 AS
SELECT * FROM citizen_suggestions;

CREATE TABLE voting_rounds_archive_round1 AS
SELECT * FROM voting_rounds;

-- Limpiar tablas operativas
TRUNCATE citizen_votes;
TRUNCATE citizen_suggestions;
TRUNCATE voting_rounds;

-- =============================================
-- PASO 2: Rediseñar esquema para encuesta binaria
-- =============================================

-- Eliminar columna voting_round (ya no aplica en encuesta única)
ALTER TABLE citizen_votes DROP COLUMN IF EXISTS voting_round;

-- Agregar constraint: solo los 2 finalistas son candidate_id válidos
ALTER TABLE citizen_votes
  ADD CONSTRAINT valid_finalist
  CHECK (candidate_id IN ('keiko-fujimori', 'rafael-lopez-aliaga'));

-- Cambiar UNIQUE constraint: 1 fingerprint = 1 voto total (no por ronda)
ALTER TABLE citizen_votes DROP CONSTRAINT IF EXISTS citizen_votes_fingerprint_voting_round_key;
ALTER TABLE citizen_votes ADD CONSTRAINT unique_fingerprint UNIQUE (fingerprint);

-- Actualizar índice de performance (ya no filtra por ronda)
DROP INDEX IF EXISTS idx_citizen_votes_round;
DROP INDEX IF EXISTS idx_citizen_votes_candidate;
CREATE INDEX idx_citizen_votes_candidate ON citizen_votes(candidate_id);

-- Mismo tratamiento a suggestions
ALTER TABLE citizen_suggestions DROP COLUMN IF EXISTS voting_round;
DROP INDEX IF EXISTS idx_citizen_suggestions_round;
CREATE INDEX idx_citizen_suggestions_created ON citizen_suggestions(created_at DESC);

-- voting_rounds ya no se usa — dejarla vacía pero no borrar
-- (compatibilidad con código legacy; se limpia en migración futura)

-- =============================================
-- PASO 3: Vista materializada binaria
-- =============================================

DROP MATERIALIZED VIEW IF EXISTS vote_counts;

CREATE MATERIALIZED VIEW vote_counts AS
SELECT
  candidate_id,
  COUNT(*) AS total_votes,
  COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER (), 0) AS percentage
FROM citizen_votes
GROUP BY candidate_id;

CREATE UNIQUE INDEX idx_vote_counts_candidate ON vote_counts(candidate_id);

-- Función de refresco (sin CONCURRENTLY en índice único simple)
CREATE OR REPLACE FUNCTION refresh_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY vote_counts;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- El trigger ya existe de la migración 002; si no existe, crearlo
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_refresh_vote_counts'
  ) THEN
    CREATE TRIGGER trigger_refresh_vote_counts
      AFTER INSERT ON citizen_votes
      FOR EACH STATEMENT
      EXECUTE FUNCTION refresh_vote_counts();
  END IF;
END;
$$;
