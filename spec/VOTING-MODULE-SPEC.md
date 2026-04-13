# VOTO INFORMADO 2026 — Módulo de Votación Ciudadana

## Actualización del Sistema de Investigación Electoral

> *"La democracia no se delega. Se construye con información y participación."*

**Módulo:** Votación Ciudadana en Vivo + Sugerencias  
**Versión:** 2.1  
**Fecha:** 27 de marzo de 2026  
**Integración:** Se agrega al proyecto principal VOTO-INFORMADO-2026.md

---

## 1. CONCEPTO: MINIMALISMO RADICAL

### 1.1 Principio de Diseño

La gente no confía en las encuestadoras tradicionales porque:
- No ven el proceso (caja negra)
- No participan directamente
- Los resultados se publican días después
- Las metodologías son opacas

Nuestra encuesta ciudadana invierte todo eso:
- **El proceso es visible** (contador en tiempo real)
- **Todos participan** (sin registro, sin fricción)
- **Los resultados son instantáneos** (live feed)
- **La metodología es transparente** (1 persona = 1 voto = se ve subir)

### 1.2 La Interacción Más Simple Posible

```
PASO 1: El usuario llega a la página
PASO 2: Ve la lista de 36 candidatos con sus fotos
PASO 3: Toca UN candidato → su voto se registra
PASO 4: Ve el contador subir EN VIVO
PASO 5: (Opcional) Escribe qué le preocupa
PASO 6: Listo. Se fue. Contribuyó.

Tiempo total: < 15 segundos
Datos capturados: 1 voto + 0-1 sugerencia
Fricción: CERO (sin login, sin email, sin captcha visible)
```

### 1.3 Flujo Post-Votación

```
Semana 1 (27 marzo - 3 abril):
  → Votación abierta, contadores en vivo
  → Sugerencias se acumulan

Día 4 de abril:
  → Se cierra la votación semanal
  → Se identifica al candidato ganador de nuestra encuesta
  → Se lanza investigación profunda de ese candidato
  → Se publica el informe (formato Marisol Pérez Tello)

Semana 2 (4-11 abril):
  → Informe publicado y agregado al sistema
  → Nueva ronda de votación si hay tiempo
  → Última actualización antes del 12 de abril
```

---

## 2. ARQUITECTURA TÉCNICA

### 2.1 Stack para Tiempo Real

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND                        │
│  React + TypeScript + Tailwind                   │
│  Animaciones de contador: Framer Motion          │
│  Gráficos en vivo: Recharts con actualización    │
└──────────────────────┬──────────────────────────┘
                       │ WebSocket / Realtime
                       ▼
┌─────────────────────────────────────────────────┐
│               SUPABASE REALTIME                  │
│  PostgreSQL + Realtime subscriptions             │
│  Row Level Security (lectura pública)            │
│  Funciones Edge para anti-fraude                 │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│            ANTI-FRAUDE (Capa Ligera)             │
│  Fingerprint del navegador (FingerprintJS)       │
│  Rate limiting: 1 voto por IP cada 24h           │
│  Detección de bots (honeypot field)              │
│  Sin captcha visible (no romper la experiencia)  │
└─────────────────────────────────────────────────┘
```

### 2.2 Modelo de Datos

```sql
-- Tabla principal de votos
CREATE TABLE citizen_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id TEXT NOT NULL,           -- slug del candidato
  fingerprint TEXT NOT NULL,            -- hash del navegador
  ip_hash TEXT NOT NULL,                -- hash del IP (no guardamos IP real)
  created_at TIMESTAMPTZ DEFAULT now(),
  voting_round INTEGER DEFAULT 1,       -- ronda de votación
  
  -- Anti-duplicado: 1 fingerprint = 1 voto por ronda
  UNIQUE(fingerprint, voting_round)
);

-- Contadores agregados (vista materializada para performance)
CREATE MATERIALIZED VIEW vote_counts AS
SELECT 
  candidate_id,
  voting_round,
  COUNT(*) as total_votes,
  COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY voting_round) as percentage
FROM citizen_votes
GROUP BY candidate_id, voting_round
ORDER BY total_votes DESC;

-- Sugerencias ciudadanas
CREATE TABLE citizen_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL CHECK (char_length(content) <= 500),
  fingerprint TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  voting_round INTEGER DEFAULT 1,
  
  -- Anti-spam: máximo 3 sugerencias por fingerprint por ronda
  -- (enforced via Edge Function, no constraint)
);

-- Configuración de rondas
CREATE TABLE voting_rounds (
  id SERIAL PRIMARY KEY,
  round_number INTEGER UNIQUE NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT false,
  winner_candidate_id TEXT,             -- se llena al cerrar
  total_votes INTEGER DEFAULT 0
);

-- Row Level Security
ALTER TABLE citizen_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE citizen_suggestions ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede insertar (votar)
CREATE POLICY "anyone_can_vote" ON citizen_votes
  FOR INSERT WITH CHECK (true);

-- Solo lectura de contadores (no votos individuales)
CREATE POLICY "public_read_counts" ON citizen_votes
  FOR SELECT USING (false); -- nadie lee votos individuales

-- Cualquiera puede sugerir
CREATE POLICY "anyone_can_suggest" ON citizen_suggestions
  FOR INSERT WITH CHECK (true);

-- Sugerencias son públicas para lectura
CREATE POLICY "public_read_suggestions" ON citizen_suggestions
  FOR SELECT USING (true);
```

### 2.3 Tipos TypeScript

```typescript
// src/types/voting.ts

export interface VotingRound {
  id: number;
  roundNumber: number;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  winnerCandidateId: string | null;
  totalVotes: number;
}

export interface VoteCount {
  candidateId: string;
  candidateName: string;
  partyName: string;
  partyColor: string;
  totalVotes: number;
  percentage: number;
  rank: number;
  trend: "up" | "down" | "stable" | "new";
}

export interface CitizenSuggestion {
  id: string;
  content: string;
  createdAt: string;
  roundNumber: number;
}

export interface VotingState {
  currentRound: VotingRound | null;
  counts: VoteCount[];
  hasVoted: boolean;               // este usuario ya votó
  votedFor: string | null;         // por quién votó
  isLoading: boolean;
  lastUpdate: string;
  totalVoters: number;
}
```

### 2.4 Realtime Subscription

```typescript
// src/hooks/useRealtimeVotes.ts

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useRealtimeVotes(roundNumber: number) {
  const [counts, setCounts] = useState<VoteCount[]>([]);
  const [totalVoters, setTotalVoters] = useState(0);

  useEffect(() => {
    // Carga inicial
    fetchCounts();

    // Suscripción realtime
    const channel = supabase
      .channel('votes-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'citizen_votes',
          filter: `voting_round=eq.${roundNumber}`,
        },
        (payload) => {
          // Actualizar contador del candidato votado
          setCounts(prev => 
            prev.map(c => 
              c.candidateId === payload.new.candidate_id
                ? { ...c, totalVotes: c.totalVotes + 1 }
                : c
            ).sort((a, b) => b.totalVotes - a.totalVotes)
             .map((c, i) => ({ ...c, rank: i + 1 }))
          );
          setTotalVoters(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roundNumber]);

  return { counts, totalVoters };
}
```

---

## 3. DISEÑO DE INTERFAZ

### 3.1 Componente: Votación en Vivo

```
┌──────────────────────────────────────────────────────┐
│                                                        │
│  📊 ENCUESTA CIUDADANA EN VIVO                        │
│  ─────────────────────────────────────                 │
│  "Las encuestadoras no te preguntan.                   │
│   Nosotros sí. Tu voto se ve en tiempo real."          │
│                                                        │
│  Ronda 1 · Cierra: 3 de abril · 1,247 votos           │
│                                                        │
│  ┌─ ¿Quién debemos investigar primero? ──────────┐   │
│  │                                                │   │
│  │  1. ████████████████████ Keiko Fujimori  23.1% │   │
│  │     327 votos · Fuerza Popular                 │   │
│  │                                                │   │
│  │  2. ██████████████████   R. López Aliaga 19.8% │   │
│  │     280 votos · Renovación Popular             │   │
│  │                                                │   │
│  │  3. ████████████████     César Acuña     16.2% │   │
│  │     229 votos · APP                            │   │
│  │                                                │   │
│  │  4. ██████████████       Carlos Álvarez  12.5% │   │
│  │     176 votos · País para Todos                │   │
│  │                                                │   │
│  │  5. ████████████         López Chau       9.3% │   │
│  │     131 votos · Ahora Nación                   │   │
│  │                                                │   │
│  │  ···  Ver todos los 36 candidatos  ···         │   │
│  │                                                │   │
│  └────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─ TU VOTO ─────────────────────────────────────┐   │
│  │                                                │   │
│  │  Toca el candidato que quieres que              │   │
│  │  investiguemos a profundidad:                   │   │
│  │                                                │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │   │
│  │  │ KF   │ │ RLA  │ │ CA   │ │ CÁ   │         │   │
│  │  │  ○   │ │  ○   │ │  ○   │ │  ○   │         │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘         │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │   │
│  │  │ ALC  │ │ WG   │ │ GF   │ │ YL   │         │   │
│  │  │  ○   │ │  ○   │ │  ○   │ │  ○   │         │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘         │   │
│  │                                                │   │
│  │  + Ver todos (36 candidatos)                   │   │
│  │                                                │   │
│  └────────────────────────────────────────────────┘  │
│                                                        │
│  ── POST VOTO (aparece después de votar) ────────     │
│                                                        │
│  ✓ Votaste por César Acuña · Tu voto #230             │
│                                                        │
│  ┌─ OPCIONAL ────────────────────────────────────┐   │
│  │  ¿Qué te preocupa de estas elecciones?        │   │
│  │  ┌──────────────────────────────────────────┐ │   │
│  │  │                                          │ │   │
│  │  │  (máx 500 caracteres)                    │ │   │
│  │  │                                          │ │   │
│  │  └──────────────────────────────────────────┘ │   │
│  │                                [Enviar →]     │   │
│  └────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─ QUÉ DICE LA GENTE ──────────────────────────┐   │
│  │                                                │   │
│  │  "Quiero saber de dónde sale la plata          │   │
│  │   de López Aliaga para su campaña"             │   │
│  │   — hace 3 min                                 │   │
│  │                                                │   │
│  │  "Necesitamos que investiguen el caso           │   │
│  │   Qali Warma y Acuña"                          │   │
│  │   — hace 12 min                                │   │
│  │                                                │   │
│  │  "¿Alguien sabe si Grozo tiene conflictos      │   │
│  │   de interés? No encuentro info"               │   │
│  │   — hace 28 min                                │   │
│  │                                                │   │
│  │  ···  Ver más sugerencias  ···                 │   │
│  └────────────────────────────────────────────────┘  │
│                                                        │
└──────────────────────────────────────────────────────┘
```

### 3.2 Animaciones Clave

```typescript
// Cuando un nuevo voto llega en tiempo real:

// 1. El número del contador incrementa con spring animation
// 2. La barra de progreso se expande suavemente
// 3. Un micro-pulse de color en el candidato votado
// 4. Si cambia el ranking, las barras se reordenan con layout animation
// 5. El total de votos en el header incrementa con un tick

// Framer Motion config:
const counterSpring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const barTransition = {
  duration: 0.4,
  ease: "easeOut",
};

const rankReorder = {
  layout: true,
  transition: { duration: 0.5, ease: "easeInOut" },
};
```

### 3.3 Estados del Componente

```
ESTADO 1: "ABIERTA" (ronda activa)
  → Muestra candidatos votables
  → Contadores en vivo
  → Sugerencias habilitadas

ESTADO 2: "VOTASTE" (usuario ya votó en esta ronda)
  → Muestra su voto con ✓
  → Contadores siguen en vivo (solo lectura)
  → Puede enviar sugerencia

ESTADO 3: "CERRADA" (ronda terminada)
  → Muestra resultado final
  → Anuncia ganador
  → Link al informe de investigación (si ya publicado)
  → Countdown a próxima ronda (si hay)

ESTADO 4: "INVESTIGANDO" (entre cierre y publicación)
  → Muestra ganador
  → Barra de progreso de investigación
  → "Estamos investigando a [candidato]. Vuelve pronto."
```

---

## 4. ANTI-FRAUDE: CONFIANZA SIN FRICCIÓN

### 4.1 Filosofía

No necesitamos seguridad bancaria. Necesitamos que:
- Un usuario casual no vote 10 veces
- Un bot básico no infle números
- La gente SIENTA que es legítimo

No necesitamos prevenir a un hacker determinado (esto no es una elección oficial).

### 4.2 Capas de Protección

```
CAPA 1: Fingerprint del navegador (FingerprintJS lite)
  → Genera un ID único por dispositivo/navegador
  → 1 fingerprint = 1 voto por ronda
  → Si intenta votar de nuevo: "Ya votaste en esta ronda ✓"

CAPA 2: Rate limiting por IP (Supabase Edge Function)
  → Hasheamos el IP (no guardamos el original → privacidad)
  → Máximo 3 votos por IP cada 24h (familia/oficina)
  → Si excede: "Se alcanzó el límite desde tu red"

CAPA 3: Honeypot field
  → Campo invisible en el form (CSS hidden)
  → Si un bot lo llena → voto descartado silenciosamente
  → Cero fricción para humanos (no ven el campo)

CAPA 4: Timing check
  → Si el voto llega <2 segundos después de cargar la página
  → Probablemente es un bot → descartar
  → Humanos necesitan al menos leer la lista

CAPA 5: Transparencia como defensa
  → Los números son públicos y en vivo
  → Si hay un spike sospechoso, la misma comunidad lo nota
  → Podemos agregar un "log público" de votos (sin datos personales)
```

### 4.3 Edge Function para Votar

```typescript
// supabase/functions/cast-vote/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const { candidateId, fingerprint, honeypot, loadTime } = await req.json();

  // Anti-bot: honeypot
  if (honeypot) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
    // Silenciosamente ignorar (el bot cree que votó)
  }

  // Anti-bot: timing
  const now = Date.now();
  if (now - loadTime < 2000) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  // Hash del IP para privacidad
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const ipHash = await hashString(ip);

  // Rate limit: máx 3 votos por IP en 24h
  const recentFromIp = await countRecentVotesByIp(ipHash);
  if (recentFromIp >= 3) {
    return new Response(
      JSON.stringify({ error: "rate_limit", message: "Límite alcanzado desde tu red" }),
      { status: 429 }
    );
  }

  // Verificar ronda activa
  const activeRound = await getActiveRound();
  if (!activeRound) {
    return new Response(
      JSON.stringify({ error: "closed", message: "No hay ronda activa" }),
      { status: 400 }
    );
  }

  // Insertar voto (UNIQUE constraint previene duplicados por fingerprint)
  try {
    await supabase.from("citizen_votes").insert({
      candidate_id: candidateId,
      fingerprint,
      ip_hash: ipHash,
      voting_round: activeRound.round_number,
    });

    return new Response(
      JSON.stringify({ ok: true, voteNumber: activeRound.total_votes + 1 }),
      { status: 201 }
    );
  } catch (error) {
    if (error.code === "23505") { // unique violation
      return new Response(
        JSON.stringify({ error: "already_voted", message: "Ya votaste en esta ronda" }),
        { status: 409 }
      );
    }
    throw error;
  }
});
```

---

## 5. SUGERENCIAS CIUDADANAS

### 5.1 Diseño Minimalista

```
Un solo campo de texto, máximo 500 caracteres.
Placeholder: "¿Qué quieres saber de los candidatos?"
Sin categorías. Sin tags. Sin clasificación.
El usuario escribe lo que quiere y envía.

La clasificación la hacemos NOSOTROS después,
no el usuario. Menos fricción = más participación.
```

### 5.2 Moderación Ligera

```
- Auto-filtro de palabras ofensivas (lista básica)
- Rate limit: 3 sugerencias por fingerprint por ronda
- Longitud: 10-500 caracteres
- No se publican sugerencias con URLs (anti-spam)
- Las sugerencias se muestran cronológicamente (más recientes primero)
- No hay likes, no hay replies (no es un foro, es un buzón)
```

### 5.3 Uso de las Sugerencias

```
Las sugerencias nos sirven para:

1. PRIORIZAR investigación
   → Si 50 personas preguntan por el patrimonio de Acuña,
     eso va primero en su informe

2. DETECTAR preocupaciones reales
   → ¿La gente pregunta más por seguridad? ¿Por corrupción?
   → Eso informa qué dimensiones enfatizar

3. ENCONTRAR datos que no teníamos
   → "Vi que el candidato X tiene una empresa en Panamá"
   → Leads de investigación crowdsourced

4. GENERAR engagement
   → La gente vuelve para ver si su pregunta fue respondida
   → En el informe podemos citar: "Ustedes preguntaron sobre..."
```

---

## 6. COMPONENTES REACT

### 6.1 Nuevos Componentes

```
src/components/voting/
├── VotingSection.tsx          # Contenedor principal
├── CandidateVoteGrid.tsx      # Grid de candidatos votables
├── CandidateVoteChip.tsx      # Chip individual (foto + nombre + botón)
├── LiveResultsChart.tsx       # Barras animadas en vivo
├── LiveCounter.tsx            # Número animado que sube
├── VoteConfirmation.tsx       # Mensaje post-voto
├── RoundStatus.tsx            # Estado de la ronda (abierta/cerrada)
├── SuggestionInput.tsx        # Campo de sugerencia
├── SuggestionFeed.tsx         # Feed de sugerencias recientes
└── VotingTimeline.tsx         # Timeline de rondas (pasadas y activa)
```

### 6.2 Nuevas Páginas

```
src/pages/
├── VotePage.tsx               # Página principal de votación
└── ResultsPage.tsx            # Resultados históricos por ronda
```

### 6.3 Nuevos Hooks

```
src/hooks/
├── useRealtimeVotes.ts        # Suscripción realtime a votos
├── useVoting.ts               # Lógica de votación (cast, check, etc.)
├── useFingerprint.ts          # Generar/recuperar fingerprint
└── useSuggestions.ts          # CRUD de sugerencias
```

---

## 7. NUEVA ESTRUCTURA DE DIRECTORIOS (Actualizada)

```
voto-informado-2026/
├── ... (todo lo anterior se mantiene)
│
├── src/
│   ├── ... (todo lo anterior)
│   │
│   ├── components/
│   │   ├── ... (todo lo anterior)
│   │   └── voting/              ← NUEVO
│   │       ├── VotingSection.tsx
│   │       ├── CandidateVoteGrid.tsx
│   │       ├── CandidateVoteChip.tsx
│   │       ├── LiveResultsChart.tsx
│   │       ├── LiveCounter.tsx
│   │       ├── VoteConfirmation.tsx
│   │       ├── RoundStatus.tsx
│   │       ├── SuggestionInput.tsx
│   │       ├── SuggestionFeed.tsx
│   │       └── VotingTimeline.tsx
│   │
│   ├── pages/
│   │   ├── ... (todo lo anterior)
│   │   ├── VotePage.tsx          ← NUEVO
│   │   └── ResultsPage.tsx       ← NUEVO
│   │
│   └── hooks/
│       ├── ... (todo lo anterior)
│       ├── useRealtimeVotes.ts   ← NUEVO
│       ├── useVoting.ts          ← NUEVO
│       ├── useFingerprint.ts     ← NUEVO
│       └── useSuggestions.ts     ← NUEVO
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   └── 002_voting_system.sql  ← NUEVO
│   └── functions/
│       ├── cast-vote/
│       │   └── index.ts           ← NUEVO
│       └── submit-suggestion/
│           └── index.ts           ← NUEVO
│
└── docs/
    ├── ... (todo lo anterior)
    └── VOTING_MODULE.md           ← ESTE DOCUMENTO
```

---

## 8. ROADMAP ACTUALIZADO

### Sprint 2.5: Votación Ciudadana (Días 5-7)

```
[ ] Configurar Supabase proyecto + Realtime
[ ] Crear tablas: citizen_votes, citizen_suggestions, voting_rounds
[ ] Implementar Edge Function: cast-vote
[ ] Implementar Edge Function: submit-suggestion
[ ] Integrar FingerprintJS lite
[ ] Crear useRealtimeVotes hook
[ ] Crear useVoting hook
[ ] CandidateVoteGrid + CandidateVoteChip
[ ] LiveResultsChart con animaciones
[ ] LiveCounter con spring animation
[ ] VoteConfirmation component
[ ] SuggestionInput + SuggestionFeed
[ ] RoundStatus (abierta/cerrada/investigando)
[ ] VotePage completa
[ ] Testing de anti-fraude
[ ] Deploy y abrir primera ronda
```

---

## 9. PREGUNTA CLAVE DEL MÓDULO

La pregunta que le hacemos a la gente NO es "¿por quién vas a votar?"
(eso es lo que hacen las encuestadoras y genera desconfianza)

La pregunta es:

> **"¿Qué candidato quieres que investiguemos a profundidad?"**

Esto cambia todo:
- No estás pidiendo su voto (menos presión)
- Estás pidiendo su CURIOSIDAD (más honesto)
- El resultado es ACCIÓN (se investiga al ganador)
- La gente siente que su participación PRODUCE algo

Y la sugerencia complementaria:

> **"¿Qué te preocupa de estas elecciones?"**

Simple. Abierto. Sin categorías. Sin fricción.
Máximo 500 caracteres. Mínimo esfuerzo, máximo insight.

---

## 10. MÉTRICAS DE ÉXITO (Módulo Votación)

| Métrica | Objetivo |
|---------|----------|
| Votos en primera ronda | ≥ 500 |
| Sugerencias recibidas | ≥ 50 |
| Tasa de sugerencia post-voto | ≥ 15% |
| Tiempo promedio de interacción | < 30 segundos |
| Informe del ganador publicado | ≤ 48h después del cierre |
| Votos fraudulentos detectados | < 5% |

---

## 11. CONSIDERACIONES ÉTICAS (Módulo Votación)

### 11.1 Privacidad

```
- NO guardamos IPs reales (solo hashes)
- NO pedimos email, nombre, DNI ni ningún dato personal
- NO usamos cookies de tracking
- El fingerprint es un hash one-way (no identifica a la persona)
- Las sugerencias son anónimas
- Cumplimos con el principio de minimización de datos
```

### 11.2 Transparencia

```
- Los resultados son 100% públicos y en tiempo real
- La metodología anti-fraude está documentada (este documento)
- Si detectamos anomalías, las reportamos públicamente
- El código será open source
```

### 11.3 Disclaimer

> "Esta es una encuesta ciudadana voluntaria y no oficial.
> No tiene valor legal ni estadístico formal. Su propósito es
> decidir qué candidato investigamos primero para publicar
> un informe ciudadano. 1 dispositivo = 1 voto por ronda.
> Resultados en tiempo real."

---

*Módulo diseñado para integrarse con el proyecto principal VOTO INFORMADO 2026.*
*Construido con Claude Code. Powered by la gente.*
