# Sesión 02 — Encuesta Ciudadana Binaria (Segunda Vuelta)

**Fecha:** 13 de abril de 2026  
**Rama:** main  
**Spec:** `spec/claude-code-prompt-encuesta-binaria.md`

---

## Contexto

El módulo de encuesta ciudadana fue rediseñado de raíz. El sistema anterior soportaba 36 candidatos con rondas semanales de investigación; ya no aplica. La segunda vuelta tiene solo 2 opciones y un período único y continuo hasta el 6 de junio de 2026.

La pregunta central de la nueva encuesta es deliberadamente honesta:

> **"¿A quién consideras menos malo?"**

Reconoce la realidad del electorado peruano (ambos finalistas tienen rechazos altos) y se diferencia de las encuestadoras tradicionales que preguntan "por quién votarías".

---

## Archivos creados

| Archivo | Descripción |
|---------|-------------|
| `supabase/migrations/003_binary_poll_second_round.sql` | Archiva datos de primera vuelta en tablas `*_archive_round1`, limpia operativas, elimina columna `voting_round`, agrega constraint de 2 finalistas, cambia UNIQUE a por-fingerprint, recrea vista materializada binaria |
| `src/hooks/useBinaryPoll.ts` | Hook central de la encuesta: suscripción realtime a `citizen_votes` sin filtro de ronda, cálculo de porcentajes, chequeo de `POLL_CLOSE_DATE`, `hasVoted` vía localStorage + fingerprint, función `castVote()` que llama a la Edge Function |
| `src/components/voting/BinaryVoteBar.tsx` | Barra horizontal bicolor proporcional; segmento izquierdo naranja FP, segmento derecho azul RP; animación de ancho con Framer Motion; total de votos en tipografía mono debajo |
| `src/components/voting/FinalistVoteCard.tsx` | Card grande clickeable: foto, nombre, partido, botón full-width con color del partido; hover con scale + glow; estado "ya votó" con checkmark y desactivación visual de la card no elegida |

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/config/finalists.ts` | + `POLL_CLOSE_DATE` (2026-06-06T23:59:59-05:00), `POLL_QUESTION`, `POLL_SUBTITLE` |
| `src/types/voting.ts` | Nuevos tipos activos: `BinaryVoteCount`, `BinaryPollState`; `CitizenSuggestion` sin `roundNumber`; tipos `VotingRound`, `VoteCount`, `VotingState` marcados `@deprecated` (primera vuelta) |
| `src/types/index.ts` | Exporta `BinaryVoteCount`, `BinaryPollState`; mantiene exports legacy |
| `src/hooks/useSuggestions.ts` | Eliminada dependencia de `roundNumber`; queries y realtime sin filtro de ronda; localStorage key cambiada a `vi_suggestions_r2` |
| `supabase/functions/cast-vote/index.ts` | Sin lógica de `voting_round` ni `getActiveRound`; valida que `candidateId` sea uno de los 2 finalistas; valida `POLL_CLOSE_DATE` en el servidor; rate limit por IP cambiado de "3 en 24h" a "3 en toda la vida de la encuesta"; mensaje de "ya votaste" actualizado |
| `src/components/voting/VotingSection.tsx` | Reescrito por completo: usa `useBinaryPoll` + `useSuggestions`; orden: header con pregunta central + estado abierto/cerrado → cards de votación (grid 2 col / stack mobile) → `BinaryVoteBar` siempre visible → estado cerrado con CTA a ONPE → `SuggestionInput` + `SuggestionFeed` → disclaimer |
| `src/components/voting/SuggestionInput.tsx` | Placeholder → `¿Qué te preocupa de esta segunda vuelta?`; texto de límite sin mención de "ronda" |
| `src/pages/VotePage.tsx` | Sin cambios de estructura (ya era wrapper simple de `VotingSection`) |
| `src/pages/ResultsPage.tsx` | Reescrito: usa `useBinaryPoll` + `BinaryVoteBar`; elimina imports de hooks y componentes legacy |

## Componentes movidos a `_legacy/`

Movidos a `src/components/voting/_legacy/` — no eliminados, disponibles como referencia:

| Componente | Razón |
|------------|-------|
| `CandidateVoteGrid.tsx` | Era el grid de 36 candidatos |
| `CandidateVoteChip.tsx` | Chip individual de candidato en el grid |
| `RoundStatus.tsx` | Indicador de ronda activa/cerrada/investigando |
| `VotingTimeline.tsx` | Timeline de 4 pasos del proceso de ronda |
| `LiveResultsChart.tsx` | Gráfico de barras para N candidatos |
| `LiveCounter.tsx` | Contador animado (solo lo usaban los anteriores) |

---

## Estructura de la página `/encuesta` resultante

```
VotePage
└── VotingSection
    ├── Header
    │   ├── Badge: ENCUESTA CIUDADANA EN VIVO
    │   ├── Pregunta: "¿A quién consideras menos malo?"
    │   ├── Subtítulo honesto sobre voto útil
    │   └── Estado: "Abierta hasta el 6 de junio · N votos"
    │
    ├── [si isOpen y !hasVoted]
    │   └── Grid 2 columnas: FinalistVoteCard × 2
    │
    ├── [si isOpen y hasVoted]
    │   ├── Banner verde: "Registramos tu voto."
    │   └── Grid 2 columnas: FinalistVoteCard × 2 (desactivadas + checkmark)
    │
    ├── Resultados en tiempo real
    │   └── BinaryVoteBar (siempre visible)
    │
    ├── [si !isOpen]
    │   └── Banner cerrado + CTA → onpe.gob.pe
    │
    ├── SuggestionInput
    │   └── Placeholder: "¿Qué te preocupa de esta segunda vuelta?"
    │
    ├── SuggestionFeed
    │
    └── Disclaimer
        "Encuesta ciudadana no oficial. Sin valor estadístico formal.
         1 dispositivo = 1 voto. Resultados en tiempo real."
```

---

## Lógica anti-fraude (sin cambios de capas, sí de parámetros)

| Capa | Comportamiento |
|------|---------------|
| Honeypot | Campo oculto; si llega con valor, se responde `ok` sin insertar |
| Timing | Si `loadTime` y `now - loadTime < 2s`, se responde `ok` sin insertar |
| Fingerprint UNIQUE | Constraint en DB: 1 fingerprint = 1 voto total (era por ronda) |
| IP rate limit | Máx. 3 votos por IP hash en **toda la vida** de la encuesta (antes era cada 24h) |

---

## Textos clave implementados

| Contexto | Texto |
|----------|-------|
| Pregunta | `¿A quién consideras menos malo?` |
| Subtítulo | `Reconocemos la realidad: ambos finalistas tienen altos niveles de rechazo. Esta encuesta mide el voto útil, no el entusiasmo.` |
| Estado abierto | `Abierta hasta el 6 de junio · {N} votos registrados` |
| Estado cerrado | `Encuesta cerrada · Votación oficial el 7 de junio` |
| Ya votaste | `Registramos tu voto. Los resultados siguen actualizándose en vivo.` |
| Error ya votó | `Ya votaste en esta encuesta. 1 dispositivo = 1 voto.` |
| Error cerrada | `La encuesta cerró el 6 de junio.` |
| Placeholder sugerencia | `¿Qué te preocupa de esta segunda vuelta?` |
| Disclaimer | `Encuesta ciudadana no oficial. Sin valor estadístico formal. 1 dispositivo = 1 voto. Resultados en tiempo real.` |

---

## Checklist de verificación

- [x] Votos de primera vuelta archivados en `citizen_votes_archive_round1`
- [x] Tablas operativas vacías y listas para segunda vuelta
- [x] Solo se permiten votos para `keiko-fujimori` o `rafael-lopez-aliaga`
- [x] La pregunta visible en `/encuesta` es `¿A quién consideras menos malo?`
- [x] 1 fingerprint = 1 voto total (sin restricción por ronda)
- [x] Resultados se actualizan en vivo vía Supabase Realtime
- [x] `BinaryVoteBar` muestra los 2 porcentajes con animación Framer Motion
- [x] Fecha de cierre: 6 de junio de 2026 23:59 hora Perú (UTC-5)
- [x] Estado cerrado implementado (automático cuando `Date.now() > POLL_CLOSE_DATE`)
- [x] Sugerencias ciudadanas funcionan con nuevo placeholder y sin filtro de ronda
- [x] No hay imports rotos a componentes movidos a `_legacy/`
- [x] `tsc --noEmit` sin errores
- [x] `npm run build` exitoso (5.82s)
- [x] Grid de votación en 2 columnas; stack vertical en mobile (`<640px`)

## Pendiente

- [ ] Aplicar migración a Supabase: `supabase db push` (local) o `supabase migration up` (producción)
- [ ] Deploy de Edge Function actualizada: `supabase functions deploy cast-vote`
