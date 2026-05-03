# 📊 PM Talent Landscape

> **Análisis interactivo del panorama de talento en Product Management.**
> Explora tendencias, habilidades, datos salariales y la evolución del rol del PM en la era de la IA — con datos reales extraídos de miles de ofertas de empleo en las Américas.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)

---

## 🎯 ¿Qué es este proyecto?

**PM Talent Landscape** es un *long-form article* interactivo que presenta un análisis basado en datos del mercado laboral para Product Managers. Compara la demanda de habilidades entre EE.UU. y Latinoamérica, con enfoque en cómo la Inteligencia Artificial redefine el perfil moderno.

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Estilos:** Tailwind CSS 4 + shadcn/ui + next-themes
- **Gráficas:** Apache ECharts 6

## 🚀 Instalación y Desarrollo

```bash
# 1. Clonar el repositorio
git clone https://github.com/GustavoVela/pm-talent-landscape.git
cd pm-talent-landscape

# 2. Instalar dependencias
pnpm install

# 3. Iniciar el servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en **[http://localhost:3000](http://localhost:3000)**.

## 🚢 Deploy (Hosting Estático)

El proyecto genera un sitio estático listo para subir a cualquier hosting tradicional (Hostinger, Netlify, GitHub Pages, etc.).

```bash
npm run build
```

Sube el contenido completo de la carpeta `out/` al directorio `public_html/` de tu hosting.

## 📝 Registro de Cambios y Evolución de Arquitectura

### Últimos Ajustes de UX/UI y Estructuración de Datos
* **Navegación Flotante (`Floating Nav`):** Se resolvió un conflicto de superposición (z-index) que bloqueaba la interacción con el carrusel mediante la implementación estricta de `pointer-events`. Además, se sincronizaron las etiquetas del menú con los títulos finales de cada sección (ej. "Perfil de competencias").
* **Estandarización de Gráficos (ECharts):**
  * Estandarización de tooltips y métricas utilizando exclusivamente el término "vacantes".
  * Incremento estratégico de los márgenes inferiores (`grid.bottom = '15%'`) en todos los gráficos de barras para garantizar la legibilidad del título de los ejes sin superposición de layouts.
  * Uniformidad de alturas de los contenedores (`280px` a `320px`) en los gráficos de la Sección 03 para eliminar "espacios muertos" en las tarjetas del carrusel, logrando un diseño más compacto.
* **Refactorización de Tabla de Competencias (`CompetencyDataTable`):** La lógica de visualización se dividió en dos componentes de visualización dinámica (`TableView`). Esto permite mostrar separadamente la *Comparativa Regional* y la *Comparativa por Países*, ambas ordenadas automáticamente por volumen (N) de mayor a menor sin mezclar las dimensiones del dataset original.
* **Módulo de Contexto Metodológico:** Implementación de un bloque modular (basado en `Alert` de *shadcn/ui* estandarizado a colores neutrales) para documentar y justificar técnicamente el procesamiento de lenguaje natural aplicado a la multiplicidad de títulos (inglés, español, portugués) sin afectar la limpieza visual de la sección Demográfica.
* **Evolución del Módulo de Inteligencia Artificial (Sección 05):**
  * Refactorización completa de `AiSeniorityChart` para sustituir la leyenda nativa por un sistema de filtrado multi-select custom y etiquetas directas sobre barras (`Lead/Dir/VP+`), mejorando la auto-explicabilidad visual y limpieza del gráfico. Adicionalmente, se estableció un orden duro descendente en los países.
  * Creación e integración de `AiCityChart`, una nueva gráfica paramétrica alimentada por consultas directas a BigQuery. Cuenta con lógica de filtrado cruzado por *País*, *Volumen Base (minJobs)* y *Clasificación de Ciudad (Capital vs Todas)*, empleando un sistema de controles `shadcn` unificados (`gap-3`, `flex-wrap`) que asegura consistencia y legibilidad responsive en el DOM.
  * Reincorporación estratégica de la variable "Otra ciudad" al ecosistema de datos de penetración IA para evitar sesgos estadísticos.
  * Integración directa de datos desde BigQuery para `AiSeniorityChart`, segmentando la profundidad del mercado en 4 niveles de experiencia exactos (`Junior / Mid-Level`, `Senior`, `Head / Lead`, `Director / VP / CPO`).
  * Corrección de bloqueos de renderizado y conflictos de capa (`z-index`) en menús desplegables sobre contenedores ECharts (`ai-industry-chart` y `ai-role-chart`).
  * Estandarización estética y narrativa en todos los componentes de interpretación ("💡 El hallazgo clave") de la Sección 05 empleando el componente global `Alert` de shadcn/ui.
  * Refinamiento estricto del *copywriting* analítico: transición de nomenclaturas académicas (`N=`) hacia términos humanos (`vacantes`), y enfoque de conclusiones basadas rigurosamente en *tamaños de muestra estadística* para proteger la credibilidad del dashboard.
  * Optimización de layout CSS Grid (de 1 a 2 columnas responsivas) para la presentación de los diccionarios metodológicos y diccionarios de agrupamiento taxonómico.
* **Estandarización Taxonómica y Narrativa (Secciones 04 y 05):**
  * Se homologó rigurosamente la jerarquía del modelo a tres niveles estructurales: **Dominios > Competencias > Habilidades específicas**. Se eliminaron referencias ambiguas ("ejes", "skills") para asegurar la coherencia metodológica en todo el dashboard.
  * Ajuste narrativo en la sección de competencias para reflejar a los profesionales de Producto como la audiencia principal de la visualización (crecimiento de carrera) y al equipo de People como audiencia secundaria.
  * Incorporación de un componente de insights reestructurado con un diseño limpio de tres columnas y foco en la "Evidencia de Datos" aislada por líneas divisorias, evitando recargar visualmente el DOM.
  * Migración al componente global `NarrativeText` para los textos explicativos, heredando correctamente la tipografía y estilos base de la aplicación.
  * Reubicación estructural de controles interactivos (ej. Mapa de Calor), situando los selectores del lado derecho junto a las notas metodológicas para un layout más limpio y profesional.

---

<p align="center">
  Hecho con 🧠 datos y ☕ café por <a href="https://www.linkedin.com/in/gustavo-vela/">Gustavo Vela Zúñiga</a>
</p>
