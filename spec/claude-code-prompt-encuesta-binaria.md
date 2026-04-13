# CLAUDE CODE — Prompt: Encuesta Ciudadana Binaria (Segunda Vuelta)

Copia-pega este prompt en Claude Code dentro del repo `voto-informado-2026`.

---

## CONTEXTO

El proyecto ya pivotó su Home hacia la segunda vuelta del 7 de junio de 2026 entre **Keiko Fujimori** (Fuerza Popular) y **Rafael López Aliaga** (Renovación Popular). Ahora toca adaptar el **módulo de encuesta ciudadana** al nuevo contexto binario.

El sistema actual fue diseñado para 36 candidatos con rondas semanales de investigación. Ya no aplica. Ahora solo hay 2 opciones y el período es único y continuo.

Fecha actual: **13 de abril de 2026**. La encuesta debe quedar **abierta desde hoy hasta el 6 de junio de 2026 a las 23:59 (hora Perú)**, un día antes del voto oficial.

## OBJETIVO DE ESTA SESIÓN

Transformar el módulo de encuesta ciudadana de un sistema multi-candidato con rondas semanales a una **encuesta binaria única** con la siguiente pregunta central:

> **"¿A quién consideras menos malo?"**

El tono de la pregunta es deliberado: reconoce la realidad del electorado peruano (ambos finalistas tienen rechazos altos) y se diferencia de las encuestadoras tradicionales que preguntan "por quién votarías". Es honesto sobre el voto útil/de rechazo.

## CAMBIOS REQUERIDOS

### 1. Migración de base de datos

Crea `supabase/migrations/003_binary_poll_second_round.sql`.

**Paso 1 — Archivar datos de primera vuelta:**

```sql
-- Tabla archivo para votos de primera vuelta
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
```

**Paso 2 — Rediseñar esquema para binario:**

Ya no hay concepto de "rondas". Es una sola encuesta continua. Simplificamos:

```sql
-- Eliminar columna voting_round de citizen_votes (ya no aplica)
ALTER TABLE citizen_votes DROP COLUMN IF EXISTS voting_round;

-- Agregar constraint: solo los 2 finalistas son candidate_id válidos
ALTER TABLE citizen_votes 
  ADD CONSTRAINT valid_finalist 
  CHECK (candidate_id IN ('keiko-fujimori', 'rafael-lopez-aliaga'));

-- Cambiar UNIQUE constraint: 1 fingerprint = 1 voto total (no por ronda)
ALTER TABLE citizen_votes DROP CONSTRAINT IF EXISTS citizen_votes_fingerprint_voting_round_key;
ALTER TABLE citizen_votes ADD CONSTRAINT unique_fingerprint UNIQUE (fingerprint);

-- Mismo tratamiento a suggestions
ALTER TABLE citizen_suggestions DROP COLUMN IF EXISTS voting_round;

-- Tabla voting_rounds ya no se usa — dejarla vacía pero no borrar
-- (por si algún código legacy la consulta; luego se limpia)
```

**Paso 3 — Nueva vista materializada binaria:**

```sql
DROP MATERIALIZED VIEW IF EXISTS vote_counts;

CREATE MATERIALIZED VIEW vote_counts AS
SELECT 
  candidate_id,
  COUNT(*) as total_votes,
  COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER (), 0) as percentage
FROM citizen_votes
GROUP BY candidate_id;

-- Refresh automático cada minuto vía cron (opcional, o refresh on write)
```

### 2. Config: fecha de cierre de encuesta

Actualiza `src/config/finalists.ts` (creado en la sesión anterior) para agregar:

```typescript
// Fecha de cierre de la encuesta ciudadana: 1 día antes de la votación oficial
export const POLL_CLOSE_DATE = new Date('2026-06-06T23:59:59-05:00');

// Pregunta central de la encuesta
export const POLL_QUESTION = '¿A quién consideras menos malo?';
export const POLL_SUBTITLE = 
  'Reconocemos la realidad: ambos finalistas tienen altos niveles de rechazo. ' +
  'Esta encuesta mide el voto útil, no el entusiasmo.';
```

### 3. Tipos TypeScript

Actualiza `src/types/voting.ts`:

```typescript
export interface BinaryVoteCount {
  candidateId: 'keiko-fujimori' | 'rafael-lopez-aliaga';
  candidateName: string;
  partyName: string;
  partyColor: string;
  totalVotes: number;
  percentage: number;
}

export interface BinaryPollState {
  counts: BinaryVoteCount[];
  hasVoted: boolean;
  votedFor: string | null;
  totalVoters: number;
  isOpen: boolean;           // true si POLL_CLOSE_DATE está en el futuro
  closesAt: Date;
  isLoading: boolean;
}
```

Elimina (o marca como deprecated) los tipos `VotingRound` y cualquier referencia a `roundNumber` en los tipos activos. Los tipos legacy pueden quedar en un archivo `voting.legacy.ts` si necesitas mantener compatibilidad con el archivo histórico.

### 4. Hook: `useBinaryPoll`

Crea `src/hooks/useBinaryPoll.ts`. Reemplaza (o coexiste con) `useRealtimeVotes.ts`. Responsabilidades:

- Suscripción realtime a `citizen_votes` (sin filtro de ronda)
- Cálculo de porcentajes entre los 2 finalistas
- Chequeo de estado de apertura según `POLL_CLOSE_DATE`
- Exposición de `hasVoted` leyendo localStorage + fingerprint
- Función `castVote(candidateId)` que llama a la Edge Function

```typescript
export function useBinaryPoll(): BinaryPollState & {
  castVote: (candidateId: string) => Promise<void>;
};
```

### 5. Edge Function: simplificar `cast-vote`

Actualiza `supabase/functions/cast-vote/index.ts`:

- Eliminar toda lógica de `voting_round` / `getActiveRound`
- Validar que `candidateId` sea uno de los 2 finalistas (rechazar cualquier otro)
- Validar que `POLL_CLOSE_DATE` no haya pasado (si pasó, devolver `{ error: 'closed' }`)
- Mantener las 4 capas anti-fraude: fingerprint unique, IP rate limit, honeypot, timing check
- Los valores de rate limit: máximo 3 votos por IP hash en toda la vida de la encuesta (no 24h, porque es un solo periodo largo)

### 6. Componentes de UI

#### 6.1 Reescribir `VotingSection.tsx`

La sección principal debe mostrar, en este orden:

1. **Header de la encuesta**
   - Título grande: `ENCUESTA CIUDADANA EN VIVO`
   - Pregunta central destacada (Space Grotesk, grande): `¿A quién consideras menos malo?`
   - Subtítulo honesto sobre por qué esa pregunta
   - Estado: `Abierta hasta el 6 de junio · X votos registrados`

2. **Sección de votación** (si no ha votado)
   - Dos cards grandes lado a lado, una por cada finalista
   - Cada card: foto + nombre + partido + botón grande "Votar por [nombre]"
   - En mobile: stack vertical
   - Al hacer click: confirmación visual inmediata + animación + llamada a Edge Function
   - Si ya votó: mostrar `VoteConfirmation` con su elección marcada

3. **Resultados en vivo** (siempre visibles, aunque no haya votado)
   - Barra horizontal dividida en 2 segmentos con colores de partido
   - Porcentajes grandes a cada lado
   - Contador total de votos en el centro o encima
   - Animación suave cuando llega un voto nuevo (Framer Motion)

4. **Sugerencias ciudadanas** (se mantiene como está, solo ajustar placeholder)
   - Placeholder nuevo: `¿Qué te preocupa de esta segunda vuelta?`

#### 6.2 Nuevo: `BinaryVoteBar.tsx`

Componente para visualizar resultados binarios. Una barra horizontal con 2 segmentos proporcionales:

```
┌──────────────────────────────────────────────┐
│ KEIKO 52.3% ████████████░░░░░░░░ 47.7% RLA   │
└──────────────────────────────────────────────┘
                  2,847 votos
```

- Segmento izquierdo: color del partido de Keiko (naranja Fuerza Popular)
- Segmento derecho: color del partido de RLA (azul Renovación Popular)
- Transición suave del ancho cuando cambian los porcentajes (layout animation)
- Número total de votos debajo en tipografía mono

#### 6.3 Nuevo: `FinalistVoteCard.tsx`

Card grande clickeable para emitir voto. Diferente a `FinalistCard` (home) porque aquí el foco es la acción, no la navegación al perfil.

- Foto grande
- Nombre + partido
- Botón full-width grande: `Votar por [nombre]`
- Border del color del partido
- Hover: scale sutil + glow del color del partido
- Estado "ya votado": checkmark + desactivación visual de la card no elegida

#### 6.4 Actualizar `SuggestionInput.tsx` y `SuggestionFeed.tsx`

Cambios mínimos:
- Placeholder: `¿Qué te preocupa de esta segunda vuelta?`
- Eliminar cualquier referencia a "ronda" en los textos
- El feed muestra sugerencias cronológicamente, sin filtro de ronda

### 7. Eliminar componentes obsoletos

Estos componentes ya no se usan en el flujo de segunda vuelta. **Archívalos** moviendo a `src/components/voting/_legacy/` (no los borres, pueden ser útiles como referencia):

- `CandidateVoteGrid.tsx` (era para 36 candidatos)
- `CandidateVoteChip.tsx` (chip individual de 36)
- `RoundStatus.tsx` (ya no hay rondas)
- `VotingTimeline.tsx` (timeline de rondas)
- `LiveResultsChart.tsx` (gráfico de 36 barras — reemplazado por `BinaryVoteBar`)

Verifica que `VotePage.tsx` no los importe. Si los importa, limpia los imports.

### 8. Página `/encuesta` (VotePage)

Reescribe `src/pages/VotePage.tsx` para que sea una composición simple:

```
<VotePage>
  <PageHeader />
  <VotingSection />      {/* ahora binario */}
  <SuggestionFeed />
</VotePage>
```

Sin tabs, sin selector de ronda, sin histórico visible. Todo en una sola vista lineal.

### 9. Textos y copy

Respeta el tono directo del proyecto. Textos clave:

- **Pregunta principal:** `¿A quién consideras menos malo?`
- **Subtítulo:** `Reconocemos la realidad: ambos finalistas tienen altos niveles de rechazo. Esta encuesta mide el voto útil, no el entusiasmo.`
- **Estado abierto:** `Abierta hasta el 6 de junio · {N} votos registrados`
- **Estado cerrado:** `Encuesta cerrada · Votación oficial el 7 de junio`
- **Ya votaste:** `Registramos tu voto. Los resultados siguen actualizándose en vivo.`
- **Error ya votó:** `Ya votaste en esta encuesta. 1 dispositivo = 1 voto.`
- **Error fuera de tiempo:** `La encuesta cerró el 6 de junio.`
- **Disclaimer (pie de sección):** `Encuesta ciudadana no oficial. Sin valor estadístico formal. 1 dispositivo = 1 voto. Resultados en tiempo real.`

### 10. Estado "cerrado" post 6 de junio

Aunque faltan 54 días, implementa ya el estado cerrado para que funcione automáticamente:

- Si `Date.now() > POLL_CLOSE_DATE`:
  - No se muestran botones de votación
  - Se muestra `BinaryVoteBar` con resultados finales congelados
  - Mensaje: `Encuesta cerrada · Resultados finales`
  - CTA: `Ir al voto oficial →` (link informativo a ONPE)
- Los `SuggestionInput` también se deshabilitan en estado cerrado

## ORDEN DE EJECUCIÓN

1. Lee primero: `src/components/voting/VotingSection.tsx`, `src/hooks/useRealtimeVotes.ts`, `src/types/voting.ts`, `supabase/migrations/002_voting_system.sql`, `supabase/functions/cast-vote/index.ts`, `src/pages/VotePage.tsx`
2. Crea la migración SQL `003_binary_poll_second_round.sql`
3. Actualiza `src/config/finalists.ts` con `POLL_CLOSE_DATE` y textos
4. Actualiza tipos en `src/types/voting.ts`
5. Crea hook `useBinaryPoll.ts`
6. Simplifica Edge Function `cast-vote`
7. Crea `BinaryVoteBar.tsx` y `FinalistVoteCard.tsx`
8. Reescribe `VotingSection.tsx`
9. Actualiza `SuggestionInput.tsx` placeholder
10. Mueve componentes obsoletos a `_legacy/`
11. Reescribe `VotePage.tsx`
12. Verifica compilación: `npm run build` o `tsc --noEmit`
13. Aplica la migración a Supabase (local primero, luego producción)
14. Prueba el flujo completo: voto, resultado en vivo, sugerencia

## VERIFICACIÓN FINAL

Antes de cerrar la sesión:

- [ ] Los votos de primera vuelta están archivados en `citizen_votes_archive_round1`
- [ ] Las tablas operativas están vacías y listas para segunda vuelta
- [ ] Solo se permiten votos para `keiko-fujimori` o `rafael-lopez-aliaga`
- [ ] La pregunta visible en `/encuesta` es `¿A quién consideras menos malo?`
- [ ] Un fingerprint puede votar exactamente 1 vez (no por ronda)
- [ ] Los resultados se actualizan en vivo vía Supabase Realtime
- [ ] `BinaryVoteBar` muestra los 2 porcentajes con animación
- [ ] La fecha de cierre es 6 de junio 2026 23:59 hora Perú
- [ ] Las sugerencias ciudadanas siguen funcionando con el nuevo placeholder
- [ ] No hay warnings de TypeScript
- [ ] No quedan imports rotos a componentes movidos a `_legacy/`
- [ ] Responsive funciona en <400px (las 2 cards en stack vertical)

## NO HAGAS

- No borres los datos históricos (archívalos en tablas separadas)
- No elimines físicamente los componentes legacy (muévelos a `_legacy/`)
- No toques la Home (ya está pivotada)
- No implementes análisis automático de sugerencias (scope futuro)
- No agregues gráficos comparativos complejos — `BinaryVoteBar` es suficiente
- No pidas datos personales al votar (mantén la filosofía de cero fricción)
- No cambies el nombre de la ruta `/encuesta`

## PRINCIPIO DE DISEÑO

La encuesta binaria debe sentirse **honesta y desesperadamente clara**. La pregunta "¿A quién consideras menos malo?" es el alma del módulo — no la suavices, no la escondas, no la reformules. Es el diferenciador frente a las encuestadoras tradicionales que siguen preguntando "por quién votarías" como si el país estuviera entusiasmado con sus opciones. Reconocer la realidad es parte de informar.

---

**Empieza leyendo los archivos del paso 1 y reporta el estado actual antes de escribir código.**
