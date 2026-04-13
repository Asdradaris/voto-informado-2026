# PLAN DE PULIDO UI — VOTO INFORMADO 2026

## Para ejecutar con Claude Code en 1-2 sesiones
## Priorizado por: impacto en percepción × facilidad de implementación

---

## BLOQUE 1: CAMBIOS INMEDIATOS (30 min)
> Copy-paste estos prompts en Claude Code, uno por uno

### 1.1 Fotos reales de candidatos
```
Reemplaza los avatares SVG placeholder de todos los candidatos por imágenes reales.
Usa las fotos oficiales de la carpeta "image", ajusta los archivos si es necesario a archivos webp
optimizados (200x200px).

Actualiza el componente CandidateAvatar para usar las fotos reales con fallback
a las iniciales si la imagen no carga.
```

### 1.2 Fix semántica de colores
```
En el sistema de badges/pills, haz estos cambios de color:

1. Badge "En progreso" → cambiar de amarillo a azul (usa oklch(0.65 0.15 250) 
   o un azul similar). "En progreso" es un estado neutro, no una advertencia.

2. Badge "alertas" → mantener en amarillo/naranja. Esto SÍ es advertencia.

3. Si todos los candidatos tienen "En progreso", elimina ese badge completamente.
   Si todos lo tienen, no aporta información. Es ruido visual.

Asegúrate de que los colores de estado sean consistentes en toda la app:
- Verde = limpio/positivo
- Azul = neutro/info/en progreso  
- Amarillo = advertencia/precaución
- Rojo = peligro/proceso activo/crítico
```

### 1.3 Fix del CTA "Toca" → "Elige"
```
En la sección de votación (/encuesta), cambia el texto:
- DE: "Toca el candidato que quieres que investiguemos a profundidad"
- A: "Elige al candidato que quieres que investiguemos a profundidad"

"Elige" funciona tanto en mobile como en desktop.
"Toca" es lenguaje exclusivamente mobile.
```

### 1.4 Hover state en cards de candidatos
```
Las cards de candidatos en la home no tienen hover state visible.
El usuario no sabe que son clickeables. Agrega:

1. cursor: pointer en toda la card
2. En hover: border-color transiciona al color del partido del candidato
   (usa la propiedad partyColor que ya existe en los datos)
3. En hover: aparece un texto sutil "Ver perfil →" en la parte inferior
   de la card con opacity transition de 0 a 1
4. Transición suave: transition: all 0.2s ease
```

---

## BLOQUE 2: CAMBIOS DE LAYOUT (45 min)

### 2.1 Reordenar encuesta: votación primero
```
En la página /encuesta, reorganiza el orden de las secciones:

ORDEN ACTUAL (incorrecto):
1. Header/explicación
2. Status de ronda
3. Resultados en vivo (barras de 0%)
4. Sección de votación (botones)
5. Sugerencias

ORDEN NUEVO (correcto):
1. Header/explicación (mantener)
2. Status de ronda (mantener)
3. Sección de votación (SUBIR - el usuario actúa primero)
4. Resultados en vivo (BAJAR - ve el impacto después)
5. Sugerencias (mantener al final)

El principio es: ACCIÓN antes que INFORMACIÓN.
El usuario debe votar antes de ver resultados.
```

### 2.2 Fix del grid asimétrico en home
```
El grid de candidatos en la home tiene 5 cards en 3 columnas,
dejando un hueco visible en la esquina inferior derecha.

Solución: En la última fila (cuando hay menos cards que columnas),
haz que las cards restantes se centren horizontalmente en vez de
alinearse a la izquierda. Usa:

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
}

O alternativamente, usa flexbox con justify-content: center
para la última fila.

Si hay exactamente 5 candidatos, otra opción es cambiar a
grid de 2 columnas en desktop (2+2+1 centrado) que se ve
más balanceado.
```

### 2.3 Reducir espacio vacío del footer
```
El footer tiene demasiado padding-top, creando un vacío enorme
entre las cards y el footer. Reduce el padding-top del footer
o del contenedor principal. El footer debe sentirse conectado
al contenido, no flotando en el vacío.
```

---

## BLOQUE 3: COMPONENTES (45 min)

### 3.1 Custom dropdown en Comparar
```
En la página /compare, los dropdowns para seleccionar candidatos
usan <select> HTML nativo. Esto se ve genérico y en modo oscuro
el dropdown desplegado usa estilos del sistema operativo (blanco).

Reemplaza los <select> nativos por un custom dropdown component
que respete el dark theme. Usa @headlessui/react Listbox o 
construye uno simple con:

- Container dark (bg-[#0D0D20], border white/10)
- Items con hover state (bg del partido color al 10%)
- Cada item muestra: iniciales del candidato + nombre + partido
- Animación de apertura/cierre suave
- Click outside para cerrar
```

### 3.2 Color-coding en tabla de comparación
```
En la vista de comparación (/compare), cuando se comparan dos
candidatos lado a lado, los valores numéricos no tienen
indicación visual de quién está "mejor" o "peor" en cada métrica.

Para cada métrica comparada:
- El valor MÁS FAVORABLE se muestra en verde sutil
- El valor MENOS FAVORABLE se muestra en rojo sutil
- Si son iguales, ambos en color neutro

Métricas donde MÁS es mejor: intención de voto, scoring
Métricas donde MENOS es mejor: imagen negativa, procesos activos, alertas

Ejemplo: Si Keiko tiene 77.4% rechazo y López Aliaga 57.9%,
López Aliaga se muestra en verde y Keiko en rojo para esa fila.
```

---

## BLOQUE 4: RESPONSIVE CRÍTICO (30 min)

### 4.1 Fix responsive para mobile pequeño
```
Hay problemas serios en pantallas < 400px de ancho:

1. El título "VOTO INFORMADO 2026" se corta ("VOTO INFORMA...")
   → Reducir font-size en breakpoint sm o usar clamp()
   → clamp(1.2rem, 5vw, 2.25rem) para el título principal

2. Los badges se truncan y se salen del contenedor
   → Hacer que los badges hagan wrap (flex-wrap: wrap)
   → Reducir padding y font-size de badges en mobile

3. Verificar que la bottom navigation bar no se superponga
   con el contenido en iPhone SE (320px width)

4. En el perfil de candidato, el panel lateral de evaluación
   debe pasar a full-width debajo del contenido en mobile,
   no intentar ser sidebar.

Testa con estos breakpoints:
- 320px (iPhone SE)
- 375px (iPhone estándar)
- 390px (iPhone 14)
- 412px (Android común)
```

---

## BLOQUE 5: DETALLES FINALES (15 min)

### 5.1 Limpiar votos fantasma de Supabase
```
Esto es en Supabase SQL Editor, no en Claude Code.
Ejecutar DESPUÉS de confirmar que son seed data:

-- Verificar primero
SELECT MIN(created_at), MAX(created_at), COUNT(*) 
FROM citizen_votes;

-- Si confirma seed data, limpiar
TRUNCATE citizen_votes;
TRUNCATE citizen_suggestions;

-- Resetear contadores
UPDATE voting_rounds SET total_votes = 0;
```

### 5.2 Meta tags para compartir
```
Verifica que el index.html tenga Open Graph tags correctos
para que cuando alguien comparta el link en WhatsApp/Telegram,
se vea una preview atractiva:

<meta property="og:title" content="VOTO INFORMADO 2026" />
<meta property="og:description" content="Investiga, evalúa y compara 
candidatos con datos verificables. Encuesta ciudadana en vivo." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:url" content="https://votoinformado2026.asdradaris.com" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />

Si no existe /public/og-image.png, crea una imagen de 1200x630px
con el logo y tagline del proyecto sobre fondo oscuro.
```

---

## ORDEN DE EJECUCIÓN RECOMENDADO

```
Sesión 1 (hoy):
  □ 1.1 Fotos de candidatos
  □ 1.2 Fix colores de badges
  □ 1.3 "Toca" → "Elige"
  □ 1.4 Hover en cards
  □ 5.2 Meta tags OG
  → Deploy a Vercel

Sesión 2 (mañana):
  □ 2.1 Reordenar encuesta
  □ 2.2 Fix grid asimétrico
  □ 2.3 Footer spacing
  □ 4.1 Responsive mobile
  → Deploy a Vercel

Sesión 3 (si hay tiempo):
  □ 3.1 Custom dropdown
  □ 3.2 Color-coding compare
  □ 5.1 Limpiar votos Supabase
  → Deploy final

Post-deploy:
  □ Probar en iPhone real
  □ Probar compartir link en WhatsApp (preview OG)
  □ Compartir con círculo cercano
```

---

## RESULTADO ESPERADO

| Área | Antes | Después |
|---|---|---|
| Componentes UI | 7/10 | 8.5/10 |
| Colores/Semántica | 6/10 | 8/10 |
| Responsive | 5/10 | 7.5/10 |
| Experiencia votación | 6.5/10 | 8/10 |
| **Promedio global** | **6.75/10** | **8/10** |

De 6.75 a 8.0 — suficiente para compartir con confianza.
