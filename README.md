# El Product Management en la Era de la IA
### Datos reales. Menos hype. Habilidades. Futuro.

> Análisis empírico de **2,836 vacantes validadas** de roles de Product Management en **EE. UU., Brasil, México, Colombia y Chile** — extraídas de LinkedIn en abril de 2026.

[![Live Demo](https://img.shields.io/badge/Live-pm--talent--landscape.vercel.app-blue?style=flat-square)](https://pm-talent-landscape.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📖 ¿Qué es esto?

Este proyecto es un **dashboard analítico de acceso público** construido para responder una pregunta concreta: ¿qué exige realmente el mercado laboral de los profesionales de Product Management en 2026?

No es un estudio de percepciones. Es un análisis directo de **señales de demanda de contratación**: las habilidades, dominios y competencias que los equipos de reclutamiento incluyeron en sus vacantes publicadas. La muestra abarca EE. UU. como mercado de referencia y los cinco principales mercados de Latinoamérica.

---

## 🗂️ Estructura del Proyecto

```
pm-talent-landscape/
├── app/
│   ├── layout.tsx          # Root layout: fuentes, metadata SEO, Google Analytics, ThemeProvider
│   └── page.tsx            # Página principal — ensambla todas las secciones en orden
│
├── components/
│   ├── introduction.tsx            # Sección 01-02: Hero, marco mental, contexto del análisis
│   ├── demographics-phase.tsx      # Sección 03: Demografía de la muestra (carrusel de 8 gráficas)
│   ├── competency-profile-phase.tsx # Sección 04: Perfil de competencias por dominio y región
│   ├── ai-phase.tsx                # Sección 05: Penetración de IA en roles de producto
│   ├── closing-phase.tsx           # Sección 06: Reflexión de cierre
│   │
│   ├── ai-market-shift.tsx         # Bloque analítico: 3 hallazgos sobre la divergencia EE.UU./LATAM
│   ├── competency-data-table.tsx   # Tabla comparativa de dominios por región y país
│   ├── chart-wrapper.tsx           # HOC: envuelve cualquier gráfica con título, ayuda e interpretación
│   ├── section-primitives.tsx      # Componentes base reutilizables: SectionHeader, NarrativeText, etc.
│   ├── floating-nav.tsx            # Navegación flotante lateral con indicador de sección activa
│   ├── header.tsx                  # Barra superior con logo y toggle de tema
│   ├── footer.tsx                  # Pie de página con créditos y links
│   ├── theme-provider.tsx          # Wrapper de next-themes para modo claro/oscuro
│   ├── theme-toggle.tsx            # Botón de alternancia de tema
│   │
│   ├── charts/                     # Todas las visualizaciones ECharts
│   │   │
│   │   ├── — SECCIÓN 03: Demografía —
│   │   ├── sample-quality-chart.tsx    # Pie: vacantes PM vs. descartadas (filtro de ruido)
│   │   ├── sample-recency-chart.tsx    # Barras: antigüedad de las vacantes recolectadas
│   │   ├── market-country-chart.tsx    # Barras horizontales: distribución por país
│   │   ├── market-city-chart.tsx       # Barras horizontales: top ciudades con filtro por país
│   │   ├── job-titles-chart.tsx        # Barras: taxonomía de títulos de rol (con estandarización)
│   │   ├── market-seniority-chart.tsx  # Barras apiladas: niveles de seniority por región
│   │   ├── market-industry-chart.tsx   # Barras: distribución por industria
│   │   ├── market-employment-chart.tsx # Barras: tipos de contrato (Full-time, Contract, etc.)
│   │   │
│   │   ├── — SECCIÓN 04: Competencias —
│   │   ├── competency-region-radar.tsx  # Radar: perfil de dominios por región (LATAM / EE.UU. / Global)
│   │   ├── competency-country-radar.tsx # Radar: perfil de dominios por país individual
│   │   ├── competency-sunburst-chart.tsx # Sunburst: taxonomía completa Dominios > Competencias > Habilidades
│   │   ├── skills-industry-heatmap.tsx  # Mapa de calor: qué dominios prioriza cada industria
│   │   │
│   │   └── — SECCIÓN 05: IA —
│   │       ├── ai-penetration-chart.tsx    # Barras apiladas: % de vacantes con requerimiento de IA
│   │       ├── ai-seniority-chart.tsx      # Barras: penetración de IA por nivel de seniority
│   │       ├── ai-city-chart.tsx           # Barras: penetración de IA por ciudad/mercado
│   │       ├── ai-industry-chart.tsx       # Barras: penetración de IA por industria
│   │       ├── ai-role-chart.tsx           # Barras: penetración de IA por tipo de rol
│   │       ├── ai-skills-ranking-chart.tsx # Ranking: habilidades de IA más demandadas
│   │       ├── ai-vs-nonai-radar.tsx       # Radar comparativo: perfil PM con IA vs. sin IA
│   │       └── ai-salary-premium-chart.tsx # Velas: diferencial salarial por seniority (con/sin IA)
│   │
│   └── ui/                         # Componentes shadcn/ui (Alert, Card, Toggle, Tooltip, etc.)
│
├── lib/
│   ├── data.ts             # Datasets hardcodeados: ciudades, países, seniority, industrias
│   ├── echarts-theme.ts    # Tema visual personalizado para todas las gráficas ECharts
│   └── utils.ts            # Utilidades: cn() para merge de clases Tailwind
│
├── hooks/
│   ├── use-mobile.ts       # Hook: detecta viewport móvil
│   └── use-toast.ts        # Hook: sistema de notificaciones toast
│
├── public/
│   ├── images/og.png       # Imagen Open Graph para redes sociales (1200×630)
│   ├── icon.svg            # Favicon vectorial
│   ├── icon-light-32x32.png
│   ├── icon-dark-32x32.png
│   └── apple-icon.png
│
└── analysis/               # Scripts y notebooks de procesamiento de datos
```

---

## 🧱 Arquitectura y Decisiones de Diseño

### Taxonomía de tres niveles
Todo el análisis se organiza bajo un modelo jerárquico estricto:
```
Dominios → Competencias → Habilidades específicas
```
Los seis dominios son: **Core PM**, **Técnico**, **Datos**, **Negocio**, **UX/UI** e **IA**.

### `ChartWrapper` — el componente central de visualización
Cada gráfica del dashboard está envuelta en `ChartWrapper`, que provee:
- Título normalizado
- Texto de ayuda contextual ("💡 Antes de explorar")
- Controles opcionales (filtros, toggles)
- Bloque de interpretación analítica con emoji 🤓

### `section-primitives.tsx` — el sistema de diseño narrativo
Exporta los primitivos de layout que aseguran consistencia tipográfica:
- `SectionHeader` — encabezado numerado de sección
- `NarrativeText` — bloque de copy con animación de entrada
- `AnimatedSection` — wrapper con IntersectionObserver para reveal on scroll
- `Blockquote` — cita destacada con borde izquierdo
- `StatCard` — tarjeta de estadística con hover

### Visualizaciones con ECharts
Todas las gráficas usan `echarts-for-react` con renderer SVG para máxima compatibilidad. Los datos son hardcodeados en `lib/data.ts` y en los propios componentes — no hay llamadas a API en runtime.

---

## 🚀 Cómo ejecutar localmente

```bash
# Clonar el repositorio
git clone https://github.com/GustavoVela/pm-talent-landscape.git
cd pm-talent-landscape

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# → http://localhost:3000

# Build de producción
npm run build
npm start
```

**Requisitos:** Node.js 18+ y npm 9+.

---

## 🗺️ Secciones del artículo

| # | Sección | Componente principal | Contenido |
|---|---------|---------------------|-----------|
| 01 | Marco Mental | `introduction.tsx` | La hipótesis de partida y el perfil de PM que los datos pondrán a prueba |
| 02 | El Estudio | `introduction.tsx` | Metodología, fuente de datos y preguntas de investigación |
| 03 | Demografía de la Muestra | `demographics-phase.tsx` | 8 gráficas sobre composición de la muestra: país, ciudad, industria, seniority, etc. |
| 04 | Perfil de Competencias | `competency-profile-phase.tsx` | Qué dominios exige el mercado y en qué se diferencian EE. UU. y LATAM |
| 05 | La Era de la IA | `ai-phase.tsx` | Penetración real de IA en las vacantes, diferencial salarial y perfil comparativo |
| 06 | Para Cerrar | `closing-phase.tsx` | Reflexión ejecutiva: hype vs. datos, auditoría de carrera, próximos pasos |

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router, static export) |
| UI | shadcn/ui + Tailwind CSS |
| Visualizaciones | Apache ECharts via `echarts-for-react` |
| Tipografía | Nunito Sans (body) + Manrope (headings) vía Google Fonts |
| Tema | next-themes (light/dark mode) |
| Iconos | Lucide React + Phosphor Icons |
| Deploy | Vercel |

---

## 🤝 Contribuciones

El código está abierto para quien quiera:
- **Auditar la metodología** — todos los datos y la lógica de procesamiento están disponibles
- **Extender el análisis** — nuevos mercados, nuevas fechas, nuevas competencias
- **Iterar en el tiempo** — rastrear cómo evolucionan estos requerimientos en próximas ediciones

Si encuentras un error, tienes datos de otro mercado o quieres proponer mejoras, abre un issue o un PR.

---

## 📋 Changelog

### `ef803b7` — editorial: QA de consistencia, reescritura S06 y lenguaje inclusivo de roles
- Sección 01 aclara explícitamente el proceso de depuración de la muestra (3,471 → 2,836)
- Reformulación del bullet técnico SQL para reconciliar la narrativa "máquina del tiempo" con la brecha de infraestructura
- Sección 06 reescrita como reflexión ejecutiva ("Algunas ideas para cerrar")
- Lenguaje inclusivo de roles en gráficas de IA (Sección 05)

### `04f2a4c` — feat: estandarización taxonómica y refinamiento narrativo S04/S05
- Homologación de la jerarquía Dominios > Competencias > Habilidades específicas
- Rediseño de hallazgos analíticos en cajitas 🤓 con separadores de evidencia
- Título del proyecto: "El Product Management en la Era de la IA"
- Subtítulo: "Datos reales. Menos hype. Habilidades. Futuro."

---

<p align="center">
  Hecho con 🧠 datos y ☕ café por <a href="https://www.linkedin.com/in/gustavo-vela/">Gustavo Vela Zúñiga</a>
</p>
