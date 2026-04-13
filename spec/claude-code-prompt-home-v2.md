# CLAUDE CODE — Prompt: Pivot Home a Segunda Vuelta

Copia-pega este prompt en Claude Code dentro del repo `voto-informado-2026`.

---

## CONTEXTO

La primera vuelta de las elecciones presidenciales de Perú 2026 ya se realizó (12 de abril). Los dos candidatos que pasan a segunda vuelta son:

1. **Keiko Fujimori** — Fuerza Popular — 16.95% (1,635,345 votos)
2. **Rafael López Aliaga** — Renovación Popular — 14.64% (1,412,263 votos)

**Segunda vuelta: 7 de junio de 2026.**

El proyecto debe pivotar de una plataforma de 36 candidatos a una herramienta especializada de comparación profunda entre los 2 finalistas. La fecha actual es **13 de abril de 2026**, quedan **55 días** hasta la segunda vuelta.

## OBJETIVO DE ESTA SESIÓN

Rediseñar completamente la página Home (`src/pages/Home.tsx`) para reflejar el nuevo contexto de segunda vuelta. Los 34 candidatos eliminados **NO deben aparecer en Home** bajo ninguna forma (ni archivo colapsado, ni banner, nada). Los datos se mantienen en el repo para acceso vía URL directa al perfil (`/candidato/:id`), pero desaparecen del flujo principal.

Enfoque: **100% segunda vuelta**. No mencionar resultados de primera vuelta en la Home.

## CAMBIOS REQUERIDOS

### 1. Config: definir finalistas

Crea `src/config/finalists.ts`:

```typescript
export const FINALISTS_IDS = ['keiko-fujimori', 'rafael-lopez-aliaga'] as const;
export const SECOND_ROUND_DATE = new Date('2026-06-07T08:00:00-05:00');
export const IS_SECOND_ROUND_PHASE = true;
```

Exporta un helper `getFinalists(allCandidates)` que filtra el array maestro de candidatos y retorna solo los dos finalistas en el orden definido.

### 2. Hook: countdown a segunda vuelta

Actualiza (o crea si no existe) `src/hooks/useCountdown.ts` para que acepte una fecha objetivo y retorne `{ days, hours, minutes, seconds, isExpired }`. Debe recalcular cada segundo con `setInterval` y limpiar en `useEffect` cleanup.

En Home, usa este hook con `SECOND_ROUND_DATE`.

### 3. Rediseño de Home

Reescribe `src/pages/Home.tsx` desde cero con esta estructura. Respeta el design system Amber Precision / Urban Night Scale (fondos `#06060F` / `#0A0A1A`, acento ámbar `#F5A623`, tipografías Space Grotesk display + Inter body + JetBrains Mono para números).

**Estructura vertical de la Home:**

```
┌─────────────────────────────────────────────┐
│ HEADER (existente, no tocar)                │
├─────────────────────────────────────────────┤
│                                             │
│  SECCIÓN 1: COUNTDOWN + CONTEXT             │
│  ─────────────────────────────              │
│  [badge]: SEGUNDA VUELTA                    │
│  7 DE JUNIO DE 2026                         │
│                                             │
│   55    12    34    08                     │
│  DÍAS  HRS  MIN  SEG                        │
│  (tipografía mono grande, color ámbar)      │
│                                             │
│  "Dos candidatos. Una decisión.             │
│   Investígalos antes de votar."             │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  SECCIÓN 2: LOS DOS FINALISTAS              │
│  ─────────────────────────────              │
│                                             │
│  ┌──────────────┐   VS   ┌──────────────┐  │
│  │              │        │              │  │
│  │  [foto KF]   │        │  [foto RLA]  │  │
│  │              │        │              │  │
│  │  KEIKO       │        │  RAFAEL      │  │
│  │  FUJIMORI    │        │  LÓPEZ       │  │
│  │              │        │  ALIAGA      │  │
│  │  Fuerza      │        │  Renovación  │  │
│  │  Popular     │        │  Popular     │  │
│  │              │        │              │  │
│  │  [metric]    │        │  [metric]    │  │
│  │  [metric]    │        │  [metric]    │  │
│  │              │        │              │  │
│  │  Ver perfil →│        │  Ver perfil →│  │
│  └──────────────┘        └──────────────┘  │
│                                             │
│  [ Comparar lado a lado → ]                 │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  SECCIÓN 3: CÓMO EVALUAR                    │
│  ─────────────────────────────              │
│  3 cards horizontales compactas:            │
│  1. Investiga — lee perfiles completos      │
│  2. Compara — ve el side-by-side            │
│  3. Evalúa — asigna tu propio score         │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  SECCIÓN 4: ENCUESTA CIUDADANA              │
│  ─────────────────────────────              │
│  Teaser del módulo de votación con CTA      │
│  a /encuesta. "¿A quién quieres que         │
│  investiguemos a más profundidad primero?"  │
│                                             │
├─────────────────────────────────────────────┤
│ FOOTER (existente)                          │
└─────────────────────────────────────────────┘
```

### 4. Componente: FinalistCard

Crea `src/components/home/FinalistCard.tsx`. Una card grande (no la `CandidateCard` compacta que ya existe) con:

- Foto grande del candidato (aspect-square, ~280px en desktop)
- Nombre en Space Grotesk bold, grande
- Partido con color del partido como accent en el border-left o pill
- 2-3 métricas clave en layout vertical:
  - Resultado 1ra vuelta (%)
  - Imagen negativa última encuesta (%)
  - Procesos legales activos (número)
- CTA "Ver perfil completo →" que navega a `/candidato/${id}`
- Border sutil que en hover cambia al color del partido
- Transición suave (0.2s ease)

Las dos cards van en un grid de 2 columnas en desktop, stack vertical en mobile (<768px). Entre ellas, en desktop, un separador visual con "VS" en tipografía display grande y color ámbar.

### 5. Componente: VSSeparator

Crea `src/components/home/VSSeparator.tsx`. Un elemento visual simple:

- En desktop: línea vertical con "VS" centrado verticalmente, tipografía display ~64px, color ámbar con glow sutil
- En mobile: línea horizontal con "VS" centrado

Usa CSS Grid `place-items: center` para el layout.

### 6. Countdown component

Crea `src/components/home/Countdown.tsx` que recibe `targetDate: Date` y renderiza los 4 bloques (días, horas, minutos, segundos) en tipografía mono grande. Cada bloque tiene:

- Número grande (clamp entre 3rem y 5rem) en color ámbar `#F5A623`
- Label debajo en uppercase pequeño (`text-xs tracking-widest`) en `text-secondary`
- Separación clara entre bloques

Anima el cambio del número de segundos con un subtle fade/scale usando Framer Motion (opcional si se puede hacer en <10 líneas).

### 7. Ocultar candidatos eliminados

**Importante:** No borres ningún archivo de `src/data/candidates/`. Los 34 candidatos eliminados siguen existiendo como datos y sus perfiles siguen siendo accesibles por URL directa (`/candidato/marisol-perez-tello` debe seguir funcionando).

Lo que cambia:
- En Home, **solo** se muestran los 2 finalistas
- El array maestro exportado desde `src/data/candidates/index.ts` **no** se toca
- Si hay algún listado `CandidateGrid` en Home actual, se elimina de Home (pero no del componente, puede seguir usándose en otras páginas si aplica)

### 8. Textos en español peninsular neutral

Todo el copy en español. Tono directo, no ceremonioso. Ejemplos:

- Badge hero: `SEGUNDA VUELTA · 7 DE JUNIO 2026`
- Tagline: `Dos candidatos. Una decisión. Investígalos antes de votar.`
- Sección "Cómo evaluar": `Investiga`, `Compara`, `Evalúa`
- CTA principal: `Comparar lado a lado →`
- CTA secundario en cards: `Ver perfil completo →`

### 9. Responsive

- Desktop (>1024px): layout descrito arriba con 2 columnas y VS al centro
- Tablet (768-1024px): igual pero con padding reducido
- Mobile (<768px): stack vertical, VSSeparator se convierte en horizontal, countdown se compacta (quizás ocultar segundos en <400px)

Testa mentalmente contra 320px, 390px, 768px, 1280px.

### 10. No tocar

- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- Rutas en `App.tsx` (los perfiles individuales siguen funcionando)
- Módulo de votación (`src/components/voting/*`) — se actualizará en otra sesión
- Archivos de datos de candidatos (`src/data/candidates/*`)
- Design tokens (`src/config/theme.ts`)

## ORDEN DE EJECUCIÓN

1. Lee primero estos archivos para entender el estado actual: `src/pages/Home.tsx`, `src/data/candidates/index.ts`, `src/config/theme.ts`, `src/hooks/useCountdown.ts` (si existe)
2. Crea `src/config/finalists.ts`
3. Crea/actualiza `src/hooks/useCountdown.ts`
4. Crea `src/components/home/Countdown.tsx`
5. Crea `src/components/home/VSSeparator.tsx`
6. Crea `src/components/home/FinalistCard.tsx`
7. Reescribe `src/pages/Home.tsx`
8. Verifica que compile sin errores (`npm run build` o `tsc --noEmit`)
9. Corre el dev server y haz un check visual rápido

## VERIFICACIÓN FINAL

Antes de dar por terminada la sesión, confirma:

- [ ] La Home solo muestra a Keiko Fujimori y Rafael López Aliaga
- [ ] El countdown apunta al 7 de junio de 2026 y actualiza en vivo
- [ ] Las URLs `/candidato/keiko-fujimori` y `/candidato/rafael-lopez-aliaga` siguen funcionando
- [ ] Las URLs de candidatos eliminados (ej. `/candidato/marisol-perez-tello`) siguen funcionando por acceso directo
- [ ] No hay warnings de TypeScript
- [ ] El diseño respeta el design system existente (colores, tipografías, espaciados)
- [ ] Responsive funciona en mobile (<400px no se rompe nada)

## NO HAGAS

- No implementes la investigación profunda de Keiko o RLA en esta sesión (eso es otra sesión separada)
- No modifiques el módulo de encuesta ciudadana (otra sesión)
- No borres ningún archivo de datos
- No agregues dependencias nuevas (usa lo que ya hay: Framer Motion, Recharts, lucide-react, etc.)
- No agregues "archivo de primera vuelta" ni banners de resultados ni nada que distraiga del enfoque en los 2 finalistas

---

**Empieza leyendo los archivos listados en el paso 1 y reporta qué encuentras antes de escribir código.**
