# Sesión 03 — Investigación Keiko + Componente LegalTimeline

**Fecha:** 13 de abril de 2026  
**Rama:** main  
**Spec:** `spec/claude-code-prompt-investigacion-keiko.md`

---

## Contexto

La investigación profunda de Keiko Fujimori (guardada en `src/data/research/investigacion-keiko-fujimori.md`) reveló que el perfil cargado en `src/data/candidates/keiko-fujimori.ts` estaba desactualizado en múltiples dimensiones críticas.

El cambio más importante: el **Caso Cócteles fue anulado por el Tribunal Constitucional el 2 de octubre de 2025** (Sentencia 185/2025, Exp. 02109-2024-PHC/TC, mayoría 5-2) y archivado formalmente por el Poder Judicial el 13 de enero de 2026. El proceso judicial vivo es una **nueva investigación preparatoria por lavado de activos vinculada a la campaña 2021**, formalizada el 30 de septiembre de 2025, que incluye a Keiko Fujimori, sus dos vicepresidentes (Galarreta y Torres) y a Fuerza Popular como persona jurídica.

---

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/types/candidate.ts` | + interfaz `RunningMate`; campo opcional `runningMates?: RunningMate[]` en `Candidate` |
| `src/data/candidates/keiko-fujimori.ts` | Reescrito completo con datos verificados al 13/04/2026 |

## Archivos creados / reescritos

| Archivo | Descripción |
|---------|-------------|
| `src/components/candidate/LegalTimeline.tsx` | Reescrito completo — ver Tarea 2 |

---

## Tarea 1 — Actualización de `keiko-fujimori.ts`

### Correcciones de datos básicos

| Campo | Antes | Después |
|-------|-------|---------|
| Educación (grado 1) | `Boston University` | `Stony Brook University (SUNY)` + nota de estadía Boston |
| Educación (grado 2, año) | `2001` | `2008` |
| `negativeImage` | `77.4` (CELAG) | `54` (IEP marzo 2026) |
| `investigationStatus` | `"en_progreso"` | `"completo"` |
| `lastUpdated` | `"2026-03-18"` | `"2026-04-13"` |

### `legalHistory` — reemplazado por completo

5 registros verificados, en orden de importancia procesal:

| ID | Tipo | Status | Severidad | Descripción |
|----|------|--------|-----------|-------------|
| `kf-caso-cocteles-archivado` | `proceso_penal` | `archivado` | 5 | Caso Cócteles. Anulado TC 02/10/2025 (Sentencia 185/2025). Archivado PJ 13/01/2026. Fuente: TC oficial. |
| `kf-investigacion-2021` | `investigacion_fiscal` | `activo` | 4 | Nueva investigación preparatoria lavado de activos campaña 2021. Formalizada 30/09/2025. Incluye plancha completa y partido. **Proceso vivo.** |
| `kf-prision-preventiva` | `prision_preventiva` | `resuelto` | 3 | ~16.5 meses de prisión preventiva entre oct 2018 y may 2020. TC declaró violación a libertad personal. |
| `kf-multa-jne-2026` | `otro` | `resuelto` | 2 | Multa JNE S/ 163,350 + 10% financiamiento semestral (Res. N.° 0529-2026-JNE, 28/03/2026). Vales de pavo, canastas navideñas, merchandising. Infracción "muy grave". |
| `kf-omisiones-dj` | `otro` | `resuelto` | 1 | Omisión de 3,500 acciones Summit Products S.A.C. y Kyara9 E.I.R.L. Anotación marginal JEE Lima Centro 1 (Res. N.° 01408-2026-JEE-LIC1/JNE, 19/02/2026). |

Eliminados del historial anterior: registros `kf-lavado-activos` (desactualizado), `kf-obstruccion` y `kf-falsos-aportantes` (subsumidos o no vigentes post-archivo del TC).

### `patrimony` — reemplazado con datos de la DJ 18/12/2025

| Ítem | Valor declarado |
|------|----------------|
| Ingresos sector público | S/ 0 |
| Ingresos sector privado | S/ 271,853.45 anuales (presidenta FP, fondos públicos) |
| Rentas tercera categoría | S/ 45,597 (anotación marginal feb 2026) |
| Bienes inmuebles | **Ninguno declarado** |
| Bienes muebles | 1 vehículo Subaru Forester 2017 — S/ 115,998 — **embargado** |
| Acciones | 3,500 Summit Products S.A.C. + Kyara9 E.I.R.L. (omitidas; corregidas por anotación marginal) |

Eliminado: mención de "departamento en La Molina" (no existe en la declaración jurada real).

### `conflicts` — actualizado

Añadidos:
- Leyes 32108 y 32130 aprobadas por Fuerza Popular que debilitaron persecución del lavado de activos y levantaron medidas restrictivas contra Fujimori (resolución juez Verástegui, 18/09/2024)
- Plancha presidencial completa imputada en mismo proceso fiscal activo

### `redFlags` — 8 alertas con severidades actualizadas

| # | Severidad | Título |
|---|-----------|--------|
| 1 | `critico` | Investigación fiscal activa por lavado de activos (campaña 2021) |
| 2 | `critico` | Fórmula presidencial completa imputada en mismo proceso |
| 3 | `alto` | Caso Cócteles archivado, no resuelto en juicio |
| 4 | `alto` | 54% de antivoto — la más rechazada del país en cuatro elecciones |
| 5 | `medio` | 16.5 meses de prisión preventiva histórica |
| 6 | `medio` | Multa JNE muy grave por uso indebido de fondos públicos |
| 7 | `medio` | Discurso de fraude electoral del jefe de campaña |
| 8 | `medio` | Patrimonio declarado notoriamente austero sin justificación clara |

### `runningMates` — nuevo campo (tipo extendido)

Requirió agregar `RunningMate` en `src/types/candidate.ts`:

```typescript
export interface RunningMate {
  position: "1er VP" | "2do VP";
  name: string;
  description: string;
  legalNote?: string;
}
```

| VP | Nombre | Nota legal |
|----|--------|------------|
| 1er VP | Luis Galarreta Velarde | Expresidente del Congreso (2017-2018). Imputado investigación preparatoria 2021. Postula simultáneamente al Parlamento Andino. |
| 2do VP | Miguel "Miki" Torres Morales | Jefe de campaña. Autor del discurso del "ejército de personeros". Imputado investigación preparatoria 2021. Encabeza lista FP al Senado. |

### `polls` — resultados de primera vuelta añadidos

| Pollster | Fecha | % | Fuente |
|----------|-------|---|--------|
| Datum | 10/03/2026 | 10.9% | Datum Marzo II |
| Ipsos | 06/03/2026 | 14.2% | Ipsos / Perú21 Simulacro |
| IEP | 11/03/2026 | 9.4% | IEP Marzo (antivoto: 54%) |
| Ipsos | 12/04/2026 | 17.1% | Conteo rápido 95.7% |
| Datum | 12/04/2026 | 16.8% | Conteo rápido |
| ONPE | 12/04/2026 | **16.95%** | **1,635,345 votos — resultado oficial (57% actas)** |

### `sources` — 15 fuentes con URLs verificables

Principales adiciones:
- Sentencia TC 185/2025: `tc.gob.pe/jurisprudencia/2025/02109-2024-HC.pdf`
- JNE Voto Informado: `votoinformado.jne.gob.pe/hoja-vida/1366/10001088`
- Plan de gobierno FP: `fuerzapopular.com.pe/wp-content/uploads/2026/02/Plan-de-Gobierno-Reforzado_V2.pdf`
- RPP Noticias, OjoPúblico, IDL Reporteros, El Comercio, La República/PerúCheck, Infobae Perú

---

## Tarea 2 — Reescritura de `LegalTimeline.tsx`

El componente existía en versión simple (lista plana sin filtros, sin collapse, sin Framer Motion, sin expand de descripción). Fue reescrito completamente.

### Firma del componente

```typescript
export interface LegalTimelineProps {
  records: LegalRecord[];
  maxItemsBeforeCollapse?: number;  // default: 5
  showFilters?: boolean;             // default: true
}
```

La integración en `CandidatePage.tsx` ya pasaba `records={candidate.legalHistory}` — no requirió cambios en la página.

### Features implementadas

**Filtros por status**
- Botones pill: Todos · Activos · Archivados · Resueltos · En apelación
- Cada filtro muestra su conteo entre paréntesis
- Filtros con conteo 0 se ocultan automáticamente
- Al cambiar filtro se resetea el collapse

**Agrupación por año**
- Separador tipográfico (`text-xs tracking-widest uppercase`) con línea divisoria
- Los eventos dentro de cada año se ordenan cronológicamente inverso
- Años ordenados de más reciente a más antiguo

**Nodos de color por severidad**
- Severity 5 → `#D63031` con glow `rgba(214,48,49,0.45)`
- Severity 4 → `#FF4757` con glow `rgba(255,71,87,0.35)`
- Severity 3 → `#FFA502`
- Severity 2 → `#F5A623`
- Severity 1 → `#6B7280`

**Cards de evento**
- Badge de status (color semántico) + badge de tipo
- Puntos de severidad (`●●●○○`) con color por severidad
- Título + descripción (truncada a 200 caracteres con botón "Ver más" por item, `useState` local)
- Footer: fecha formateada + fuente clickeable con `ExternalLink` (nueva pestaña, `rel="noopener noreferrer"`) + entidades vinculadas (ocultas en mobile)

**Collapse de items**
- Muestra los primeros `maxItemsBeforeCollapse` registros
- Botón "Ver historial completo (N más)" para expandir
- Botón "Colapsar historial" para volver a colapsar

**Animaciones Framer Motion**
- `AnimatePresence` + `motion.div` en cada item
- `initial: { opacity: 0, y: 12 }` → `animate: { opacity: 1, y: 0 }`
- Stagger: `delay: Math.min(i * 0.05, 0.3)` — máximo 300ms total
- `duration: 0.22`, `ease: "easeOut"`

**Empty states**
- Sin records en absoluto: card verde con `CheckCircle` ("Sin procesos legales registrados")
- Sin records en filtro activo: texto centrado muted ("Sin registros legales en esta categoría")

### Estructura visual resultante

```
[Todos (5)] [Activos (1)] [Archivados (1)] [Resueltos (3)]

  2026 ─────────────────────────────────────────────────
  │
  ● Multa JNE de S/ 163,350...                [Resuelto] [Otro]  ●●○○○ 2/5
  │  28 mar 2026 | JNE → Resolución N.° 0529-2026-JNE ↗
  │
  ● Omisión de acciones en declaración jurada  [Resuelto] [Otro]  ●○○○○ 1/5
     19 feb 2026 | JEE Lima Centro 1 ↗

  2025 ─────────────────────────────────────────────────
  │
  ● Investigación preparatoria — campaña 2021  [Activo] [Investigación Fiscal]  ●●●● 4/5
  │  30 sep 2025 | RPP Noticias / OjoPúblico ↗
  │
  ● Caso Cócteles — campañas 2011 y 2016      [Archivado] [Proceso Penal]  ●●●●● 5/5
     01 ago 2017 | TC — Sentencia 185/2025 ↗

  [Ver historial completo (1 más)]
```

---

## Checklist de verificación

- [x] `keiko-fujimori.ts` refleja resultado primera vuelta (16.95%, 1,635,345 votos)
- [x] Caso Cócteles aparece como `status: "archivado"` con referencia a Sentencia 185/2025
- [x] Nueva investigación preparatoria 2021 aparece como `status: "activo"`
- [x] Patrimonio refleja Subaru embargado y ausencia de inmuebles
- [x] Multa JNE de S/ 163,350 en historial legal
- [x] Vicepresidentes Galarreta y Torres registrados con imputación fiscal en `runningMates`
- [x] 8 red flags con severidades apropiadas (2 críticos, 3 altos, 3 medios)
- [x] `negativeImage: 54` (IEP marzo 2026)
- [x] 15 fuentes con URLs verificables
- [x] `investigationStatus: "completo"`
- [x] `LegalTimeline.tsx` reescrito y compila sin errores
- [x] Filtros (Todos / Activos / Archivados / Resueltos) funcionan con conteos
- [x] Agrupación por año con separadores tipográficos
- [x] Descripción truncada a 200 chars con "Ver más" por item
- [x] Fuentes clickeables con `ExternalLink` (nueva pestaña)
- [x] Collapse: muestra 5, botón para expandir el resto
- [x] Animaciones Framer Motion con stagger máx 300ms
- [x] Empty state para lista vacía y filtro vacío
- [x] Integración en `CandidatePage.tsx` sin cambios (ya usaba `records={candidate.legalHistory}`)
- [x] `tsc --noEmit` sin errores (0 warnings)
- [x] `RunningMate` en `src/types/candidate.ts` como interfaz + campo opcional `runningMates?` en `Candidate`

## Pendiente

- [ ] Verificar visualmente en mobile < 400px (entidades vinculadas ocultas en mobile intencional)
- [ ] Aplicar mismo patrón de investigación a `rafael-lopez-aliaga.ts` (próxima sesión)
- [ ] Considerar mostrar `runningMates` en el perfil del candidato (actualmente en los datos pero sin renderizado en `CandidatePage.tsx`)
