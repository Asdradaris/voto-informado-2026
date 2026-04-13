# Sesión 01 — Pivot Home a Segunda Vuelta

**Fecha:** 13 de abril de 2026  
**Rama:** main  
**Spec:** `spec/claude-code-prompt-home-v2.md`

---

## Contexto

La primera vuelta se realizó el 12 de abril de 2026. Los dos candidatos que pasan a segunda vuelta son:

| Candidato | Partido | Resultado |
|-----------|---------|-----------|
| Keiko Fujimori | Fuerza Popular | 16.95% — 1,635,345 votos |
| Rafael López Aliaga | Renovación Popular | 14.64% — 1,412,263 votos |

**Segunda vuelta: 7 de junio de 2026.**

---

## Archivos creados

| Archivo | Descripción |
|---------|-------------|
| `src/config/finalists.ts` | `FINALISTS_IDS`, `SECOND_ROUND_DATE`, `IS_SECOND_ROUND_PHASE`, helper `getFinalists()` |
| `src/hooks/useCountdown.ts` | Hook genérico que acepta `targetDate` y retorna `{ days, hours, minutes, seconds, isExpired }`, `setInterval` cada segundo con cleanup |
| `src/components/home/Countdown.tsx` | 4 bloques en tipografía mono ámbar; segundos animados con Framer Motion `AnimatePresence` |
| `src/components/home/VSSeparator.tsx` | Vertical (desktop) / horizontal (mobile) con glow ámbar |
| `src/components/home/FinalistCard.tsx` | Card grande: foto, nombre, partido, 3 métricas clave, CTA; border hover con color del partido |

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/pages/Home.tsx` | Reescrito por completo — 4 secciones: Countdown, Finalistas+VS, Cómo evaluar, Encuesta ciudadana |

## Archivos NO tocados (según spec)

- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/App.tsx` (rutas intactas)
- `src/components/voting/*`
- `src/data/candidates/*`
- `src/config/theme.ts`

---

## Estructura de Home resultante

```
Header (existente)
│
├── Sección 1 — Countdown + Context
│   badge: SEGUNDA VUELTA · 7 DE JUNIO 2026
│   Contador regresivo DD:HH:MM:SS en vivo
│   Tagline: "Dos candidatos. Una decisión. Investígalos antes de votar."
│
├── Sección 2 — Los dos finalistas
│   [FinalistCard Keiko]  VS  [FinalistCard RLA]
│   CTA: "Comparar lado a lado →"  → /comparar
│
├── Sección 3 — Cómo evaluar
│   3 cards: Investiga / Compara / Evalúa
│
└── Sección 4 — Encuesta ciudadana
    Teaser con CTA → /encuesta

Footer (existente)
```

---

## Checklist de verificación

- [x] La Home solo muestra a Keiko Fujimori y Rafael López Aliaga
- [x] El countdown apunta al 7 de junio de 2026 y actualiza cada segundo
- [x] Las URLs `/candidato/keiko-fujimori` y `/candidato/rafael-lopez-aliaga` siguen funcionando
- [x] Las URLs de candidatos eliminados (ej. `/candidato/marisol-perez-tello`) siguen funcionando por acceso directo
- [x] `tsc --noEmit` sin errores ni warnings
- [x] `npm run build` exitoso (6.52 s)
- [x] El diseño respeta el design system: fondos `#06060F`/`#0D0D20`, acento `#F5A623`, Space Grotesk + JetBrains Mono
- [x] Responsive: grid 2 columnas en desktop, stack vertical en mobile, VSSeparator adapta orientación
- [x] No se agregaron dependencias nuevas (usa Framer Motion ya instalado)
- [x] No se eliminó ningún archivo de datos
