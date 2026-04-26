# 📊 PM Talent Landscape

> **Análisis interactivo del panorama de talento en Product Management.**
> Explora tendencias, habilidades, datos salariales y la evolución del rol del PM en la era de la IA — con datos reales extraídos de miles de ofertas de empleo en las Américas.

<!-- ![PM Talent Landscape Preview](./public/images/preview.png) -->

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red)](#)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-339933?logo=node.js)](https://nodejs.org/)

---

## 🎯 ¿Qué es este proyecto?

**PM Talent Landscape** es una aplicación web tipo *long-form article* interactivo que presenta un análisis basado en datos del mercado laboral para Product Managers. El estudio compara la demanda de habilidades entre EE.UU. y Latinoamérica, con un enfoque especial en cómo la Inteligencia Artificial está redefiniendo el perfil del PM moderno.

El proyecto fue creado por **[Gustavo Vela Zúñiga](https://www.linkedin.com/in/gustavo-vela/)** como una herramienta de análisis y narrativa visual que combina storytelling editorial con visualizaciones de datos interactivas.

### ✨ Características principales

- 📖 **Narrativa editorial** — Experiencia de lectura tipo artículo largo con secciones animadas (scroll-driven)
- 📈 **Visualizaciones interactivas** — Gráficas basadas en ECharts con tema personalizado y soporte para descarga PNG
- 🌗 **Modo Claro / Oscuro** — Soporte completo de temas con `next-themes`
- 🧭 **Navegación flotante** — Indicadores de progreso en el lateral derecho (desktop)
- 📱 **Diseño responsive** — Optimizado para móvil, tablet y desktop
- 🔍 **SEO optimizado** — Meta tags, HTML semántico y tipografía de Geist (Google Fonts)
- 📊 **Taxonomía de habilidades** — Dataset curado con 6 dominios y cientos de skills mapeadas

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, RSC) |
| **UI Library** | [React 19](https://react.dev/) |
| **Lenguaje** | [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Estilos** | [Tailwind CSS 4](https://tailwindcss.com/) + CSS Variables (oklch) |
| **Componentes UI** | [shadcn/ui](https://ui.shadcn.com/) (estilo New York) + [Radix UI](https://www.radix-ui.com/) |
| **Gráficas** | [Apache ECharts 6](https://echarts.apache.org/) + [echarts-for-react](https://github.com/hustcc/echarts-for-react) |
| **Iconos** | [Lucide React](https://lucide.dev/) |
| **Temas** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |
| **Parseo de datos** | [PapaParse](https://www.papaparse.com/) (CSV) |
| **Package Manager** | [pnpm](https://pnpm.io/) |

---

## 📁 Arquitectura y Estructura de Carpetas

El proyecto utiliza la arquitectura **App Router** de Next.js con una separación clara entre presentación, lógica y datos.

```text
pm-talent-landscape/
├── app/                        # 🏠 App Router de Next.js
│   ├── globals.css             #    Sistema de diseño: CSS variables (oklch), temas light/dark
│   ├── layout.tsx              #    Layout raíz: fuentes Geist, ThemeProvider, Vercel Analytics
│   └── page.tsx                #    Página principal: orquesta Header → Intro → TOC → Charts → Footer
│
├── components/                 # 🧩 Componentes de la aplicación
│   ├── header.tsx              #    Barra superior sticky con autor, fecha y toggle de tema
│   ├── introduction.tsx        #    Sección Hero + narrativa editorial con animaciones scroll-driven
│   ├── floating-nav.tsx        #    Navegación lateral flotante con indicadores de sección activa
│   ├── table-of-contents.tsx   #    Tabla de contenidos dinámica para las visualizaciones
│   ├── charts-section.tsx      #    Contenedor de todas las visualizaciones de datos
│   ├── chart-wrapper.tsx       #    Wrapper reutilizable: título + gráfica + interpretación + descarga
│   ├── footer.tsx              #    Pie de página con créditos y enlace a LinkedIn
│   ├── theme-provider.tsx      #    Proveedor de tema (next-themes wrapper)
│   ├── theme-toggle.tsx        #    Botón de cambio claro/oscuro con animación de iconos
│   └── ui/                     #    ⚙️ Componentes shadcn/ui (57 componentes Radix-based)
│       ├── button.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── dialog.tsx
│       ├── toast.tsx
│       └── ...                 #    + 52 componentes más (accordion, tabs, sidebar, etc.)
│
├── analysis/                   # 📊 Datos crudos, taxonomías y prompts del pipeline de IA
│   ├── databases/              #    Listados base extraídos (industrias, roles, locations, seniorities)
│   ├── groupings/              #    Diccionarios de taxonomía y agrupación algorítmica
│   │   ├── ai_skills_grouping.md           # IA: GenAI, LLMs, Agentic AI...
│   │   ├── business_skills_grouping.md     # Negocios: finanzas, revenue...
│   │   ├── core_pm_skills_grouping.md      # Core PM: roadmapping, discovery...
│   │   ├── data_skills_grouping.md         # Datos: SQL, Python, analytics...
│   │   ├── technical_skills_grouping.md    # Técnico: APIs, cloud...
│   │   ├── ux_ui_skills_grouping.md        # UX/UI: Figma, research...
│   │   ├── jobs_grouping.md                # Roles estandarizados
│   │   ├── currencies_grouping.md          # Monedas
│   │   └── locations_grouping.md           # Geografía y países
│   └── prompt/                 #    Prompts utilizados para procesar los datos con LLMs
│
├── hooks/                      # 🪝 Custom hooks
│   ├── use-mobile.ts           #    Detección responsive (breakpoint 768px)
│   └── use-toast.ts            #    Sistema de notificaciones (toast reducer)
│
├── lib/                        # 📚 Utilidades y configuración
│   ├── echarts-theme.ts        #    Registro del tema ECharts personalizado (singleton)
│   └── utils.ts                #    Utilidad `cn()` para merge de clases Tailwind
│
├── styles/                     # 🎨 Configuración de estilos
│   ├── echarts-theme.json      #    Tema visual para ECharts (colores, tipografía, grid)
│   └── globals.css             #    Copia del sistema de diseño (referencia)
│
├── public/                     # 🖼️ Assets estáticos
│   └── images/
│       └── linkedin-logo.png   #    Logo de LinkedIn para el header
│
├── package.json                # 📦 Dependencias y scripts
├── tsconfig.json               # ⚙️ Configuración TypeScript (strict, paths @/*)
├── next.config.mjs             # ⚙️ Config Next.js (images unoptimized, TS build errors ignorados)
├── postcss.config.mjs          # ⚙️ PostCSS con plugin de Tailwind CSS 4
├── components.json             # ⚙️ Configuración de shadcn/ui (estilo New York, Lucide)
└── pnpm-lock.yaml              # 🔒 Lockfile de dependencias
```

### 🧠 Decisiones de Arquitectura

| Decisión | Razón |
|---|---|
| **App Router (no Pages Router)** | Aprovechar React Server Components, layouts anidados y la dirección futura de Next.js |
| **Carpeta por capas (no por módulos)** | Al ser un sitio de tipo artículo/dashboard, la separación por capas (`components`, `hooks`, `lib`, `data`) resulta más natural que módulos por feature |
| **shadcn/ui (no component library empaquetada)** | Control total sobre los componentes. Se copian al proyecto y se personalizan libremente |
| **ECharts (no Recharts como lib principal)** | Mayor capacidad para visualizaciones complejas, temas personalizados y exportación de imágenes. Recharts se mantiene instalado como alternativa |
| **Datos en Markdown (no JSON/CSV)** | Las taxonomías de skills están en `.md` para facilitar edición y revisión humana antes de ser procesadas |
| **oklch para colores** | Sistema de color perceptualmente uniforme, ideal para temas light/dark consistentes |

---

## 🚀 Instalación y Configuración

### Requisitos Previos

| Herramienta | Versión Mínima |
|---|---|
| **Node.js** | `>= 18.x` (se recomienda `v24.x` LTS) |
| **pnpm** | `>= 8.x` |

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/pm-talent-landscape.git
cd pm-talent-landscape

# 2. Instalar dependencias
pnpm install

# 3. Iniciar el servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en **[http://localhost:3000](http://localhost:3000)**.

### Variables de Entorno

Actualmente el proyecto **no requiere variables de entorno** para funcionar en desarrollo. Vercel Analytics se activa automáticamente solo en producción (`NODE_ENV === 'production'`).

Si en el futuro necesitas agregar variables, crea un archivo `.env.local`:

```bash
# .env.local (ejemplo futuro)
# NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|---|---|---|
| 🔧 **Desarrollo** | `pnpm dev` | Inicia el servidor de desarrollo con hot-reload |
| 🏗️ **Build** | `pnpm build` | Genera el bundle optimizado para producción |
| 🚀 **Producción** | `pnpm start` | Sirve el build de producción localmente |
| 🔍 **Lint** | `pnpm lint` | Ejecuta ESLint para revisar la calidad del código |

---

## 🎨 Sistema de Diseño

### Tipografía

El proyecto utiliza las fuentes **Geist** y **Geist Mono** de Vercel, cargadas a través de `next/font/google` para optimización automática.

### Colores y Temas

El sistema de colores usa **CSS Custom Properties** con el espacio de color `oklch` para garantizar consistencia perceptual entre el tema claro y oscuro.

```css
/* Ejemplo del sistema de tokens */
:root {
  --background: oklch(1 0 0);         /* Blanco puro */
  --foreground: oklch(0.145 0 0);     /* Negro profundo */
  --muted-foreground: oklch(0.556 0 0); /* Gris para texto secundario */
}

.dark {
  --background: oklch(0.145 0 0);     /* Negro profundo */
  --foreground: oklch(0.985 0 0);     /* Casi blanco */
}
```

### Componentes UI

Se utiliza **[shadcn/ui](https://ui.shadcn.com/)** con el estilo **New York** y la librería de iconos **Lucide**. Los componentes se encuentran en `components/ui/` y son completamente personalizables.

Para agregar nuevos componentes:

```bash
npx shadcn@latest add [nombre-del-componente]
```

---

## 📊 Datos y Taxonomía

El directorio `data/skills/` contiene la taxonomía del estudio, organizada en **6 dominios de competencia**:

| Dominio | Archivo | Categorías |
|---|---|---|
| 🤖 **Inteligencia Artificial** | `ai_skills_grouping.md` | ~30 (GenAI, LLMs, Agentic AI, MLOps...) |
| 🎯 **Core Product Management** | `core_pm_skills_grouping.md` | ~20 (Roadmapping, Discovery, GTM...) |
| 💼 **Negocios** | `business_skills_grouping.md` | Revenue, Finanzas, Partnerships... |
| 📊 **Datos** | `data_skills_grouping.md` | SQL, Python, Analytics Tools... |
| ⚙️ **Técnico** | `technical_skills_grouping.md` | APIs, Cloud, Arquitectura... |
| 🎨 **UX/UI** | `ux_ui_skills_grouping.md` | Figma, Research, Design Systems... |

Cada archivo mapea **skills crudas** (extraídas de ofertas de empleo) a **categorías estandarizadas**, permitiendo un análisis consistente a pesar de la variación en nomenclatura entre empresas y regiones.

---

## 🧩 Guía para Agregar Nuevas Visualizaciones

El proyecto está diseñado para que agregar nuevas gráficas sea un proceso estandarizado:

### 1. Crear el componente de gráfica

```tsx
// components/charts/mi-grafica.tsx
"use client"

import ReactECharts from "echarts-for-react"
import { registerTheme, THEME_NAME } from "@/lib/echarts-theme"

export function MiGrafica() {
  registerTheme()
  
  const option = {
    // ... configuración de ECharts
  }

  return <ReactECharts option={option} theme={THEME_NAME} style={{ height: 400 }} />
}
```

### 2. Envolver con `ChartWrapper`

```tsx
// En components/charts-section.tsx
<ChartWrapper
  id="mi-grafica"
  title="Título de la Gráfica"
  description="Descripción breve"
  interpretation="Análisis detallado de lo que revelan los datos..."
>
  <MiGrafica />
</ChartWrapper>
```

### 3. Registrar en la tabla de contenidos y navegación

Actualiza el array `tableOfContentsItems` en `app/page.tsx` y los `navItems` en `components/floating-nav.tsx`.

---

## 🧑‍💻 Guía de Estilo

| Regla | Convención |
|---|---|
| **Componentes** | `PascalCase` (ej. `ChartWrapper.tsx`) |
| **Archivos** | `kebab-case` (ej. `floating-nav.tsx`) |
| **Hooks** | Prefijo `use-` (ej. `use-mobile.ts`) |
| **Clases CSS** | Tailwind CSS utilities + tokens del sistema de diseño |
| **Idioma del código** | Inglés para código, español para contenido editorial |
| **Imports** | Path aliases con `@/` (ej. `@/components/ui/button`) |

---

## 🚢 Deploy (Hosting Estático)

El proyecto genera un sitio **100% estático** (sin servidor Node.js) listo para subir a cualquier hosting tradicional como **Hostinger**, Netlify, GitHub Pages, etc.

### Generar el build

```bash
npm run build
```

Esto crea la carpeta **`out/`** con todo el sitio listo:

```text
out/
├── index.html          # Página principal
├── 404.html            # Página de error
├── _next/              # JS, CSS y assets optimizados
└── images/             # Imágenes estáticas
```

### Subir a Hostinger

1. Ejecuta `npm run build`
2. Sube **todo el contenido** de la carpeta `out/` al directorio `public_html/` de tu hosting
3. Listo — no necesitas Node.js, PM2, ni nada del lado del servidor

> **Tip:** Si usas un subdominio o ruta base diferente (ej. `tudominio.com/pm-talent/`), agrega `basePath: '/pm-talent'` en `next.config.mjs`.

---

## 📄 Licencia

Este proyecto es **privado**. Todos los derechos reservados © 2025 Gustavo Vela Zúñiga.

---

<p align="center">
  Hecho con 🧠 datos y ☕ café por <a href="https://www.linkedin.com/in/gustavo-vela/">Gustavo Vela Zúñiga</a>
</p>
