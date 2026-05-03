"use client"

import React from "react"
import { SectionHeader, NarrativeText, Blockquote, AnimatedSection } from "./section-primitives"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { ChartWrapper } from "./chart-wrapper"
import { CompetencyRegionRadar } from "./charts/competency-region-radar"
import { CompetencyCountryRadar } from "./charts/competency-country-radar"
import { CompetencySunburstChart } from "./charts/competency-sunburst-chart"
import { CompetencyDataTable } from "./competency-data-table"
import { SkillsIndustryHeatmap } from "./charts/skills-industry-heatmap"
import { AiMarketShift } from "./ai-market-shift"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { FLAGS } from "@/lib/data"

export function CompetencyProfilePhase() {
  return (
    <section id="phase-competency" className="border-t border-border/40">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            number="04"
            title="Perfil de competencias"
            subtitle="¿Existe un perfil de competencias estandarizado, o las habilidades específicas varían de forma medible entre mercados?"
          />

          <AnimatedSection>
            <NarrativeText>
              <p>
                Los datos de esta sección provienen de 2,836 descripciones de empleo. Lo que se mide es la frecuencia con la que las empresas solicitan una habilidad específica —es decir, señales puras de demanda de contratación en el mercado—, y no el nivel de destreza real de los diferentes roles en Product Management.
              </p>
              <p className="mt-4">
                Bajo esta premisa, las competencias del Dominio Core PM —metodologías ágiles, roadmapping, discovery— son el punto de partida definitorio. Todos los registros de la muestra son roles en Product Management; el 92% de adopción base refleja simplemente que un 8% de las vacantes tienen descripciones demasiado genéricas para extraer estas habilidades específicas. Las verdaderas variaciones estratégicas entre mercados se expresan en los conocimientos que se exigen en cinco dominios adicionales: negocio, tecnología, datos, diseño (UX/UI) e Inteligencia Artificial. Es preciso señalar que el dominio de negocio no solo comprende las disciplinas tradicionales que se aprenderían típicamente en un MBA, sino que también involucra activamente todas las habilidades específicas relacionadas con el <em>expertise</em> o conocimiento profundo de una industria en particular.
              </p>
            </NarrativeText>
          </AnimatedSection>

          {/* Radar Charts Grid */}
          <AnimatedSection delay={150}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-16">
              <ChartWrapper
                id="chart-radar-macro"
                title="Comparativa por regiones"
                helpText="El radar muestra el perfil de competencias promedio exigido en cada zona geográfica (LATAM, US, Global). Cuanto más al exterior cae el vértice, más frecuente es ese dominio en las vacantes de esa región. Haz clic en los nombres de la leyenda para aislar una región y ver su perfil puro sin ruido visual."
                className="h-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-lg"
              >
                <CompetencyRegionRadar />
              </ChartWrapper>

              <ChartWrapper
                id="chart-radar-country"
                title="Comparativa por países"
                helpText="Cada país tiene un perfil de demanda distinto — no todos los mercados piden lo mismo ni en la misma proporción. Un vértice más alejado del centro indica que ese dominio se menciona con mayor frecuencia en ese país. Haz clic en la leyenda para activar o desactivar países y comparar solo los que te interesan."
                className="h-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-lg"
              >
                <CompetencyCountryRadar />
              </ChartWrapper>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <CompetencyDataTable />
          </AnimatedSection>

          <NarrativeText>
            <h3 className="text-xl font-bold text-foreground mb-4 mt-16">Lo que solicitan los equipos de reclutamiento en EE. UU. vs. Latinoamérica</h3>
            <ul className="list-disc pl-5 space-y-4 my-6">
              <li><strong>La brecha más amplia está en IA y Datos.</strong> Las publicaciones en EE. UU. incluyen requerimientos de IA en el <strong>36.2%</strong> de los casos, frente al <strong>26.1%</strong> en Latinoamérica — 10.1 puntos de diferencia. En Datos, la brecha es de 6.3 puntos (56.2% vs. 49.9%). Esto refleja que los equipos de reclutamiento en EE. UU. ya incorporaron estas competencias como criterio de filtro con mayor frecuencia. Si eso implica que los profesionales allí son más capaces en estas áreas, o simplemente que el mercado las pide más por presión competitiva o tendencia, es una pregunta que esta base de datos no puede responder.</li>
              <li><strong>La paridad técnica es el dato contraintuitivo — y lo que se pide no es lo mismo.</strong> La diferencia en el eje Técnico entre EE. UU. (39.7%) y Latinoamérica (38.0%) es de apenas 1.7 puntos. Sin embargo, al revisar las habilidades individuales, la naturaleza de la demanda diverge. En EE. UU., las habilidades técnicas más solicitadas son APIs (9.1%), arquitectura de sistemas (1.5%), pipelines de datos (1.2%), cloud (AWS 2.5%, Azure 1.7%, GCP 1.0%) y plataformas de datos como Snowflake o Databricks. En Latinoamérica, SQL lidera con 8.9% frente al 4.6% en EE. UU. Esta diferencia es consistente con una hipótesis razonable: en mercados más maduros, la infraestructura de datos ya está construida —dashboards, plataformas de analítica, equipos de Data Science dedicados— y el PM no necesita consultar bases de datos directamente. En Latinoamérica, donde esa infraestructura aún está en construcción en muchas empresas, el mercado solicita que el propio PM pueda extraer sus propios datos. Los datos de SQL apoyan esta lectura, aunque no la comprueban de forma definitiva.</li>
              <li><strong>El perfil Unicornio es minoritario — y no lo piden las empresas que uno esperaría.</strong> Solo el <strong>8.8%</strong> de las publicaciones en EE. UU. y el <strong>5.3%</strong> en Latinoamérica solicitan simultáneamente los cinco dominios de conocimiento. En EE. UU., lo piden empresas como Meta, BetterUp, Pinterest, Automation Anywhere o Samba TV. En Latinoamérica, predominan empresas brasileras de escala (Serasa Experian, Creditas, Bees Brasil) y algunas chilenas (Banco Falabella, Global66). Son empresas con productos digitales maduros y complejos — no organizaciones en etapa temprana. El perfil completo parece ser una decisión de arquitectura de equipo, no un estándar de contratación masivo. Este hallazgo fue uno de los más sorprendentes del análisis: el perfil integral es menos frecuente de lo que esperaba, algo que va en tensión directa con el <a href="#marco-mental" className="underline underline-offset-2 text-foreground font-medium hover:opacity-70 transition-opacity">marco mental con el que llegué a estos datos</a>.</li>
            </ul>
          </NarrativeText>

          <NarrativeText>
            <h3 className="text-xl font-bold text-foreground mb-4 mt-8">Desglose por países: lo que pide cada mercado</h3>
            <p className="mb-6">
              Al desagregar la región, las señales de demanda no son uniformes. Cada mercado muestra un perfil de solicitudes distinto:
            </p>
            <ul className="list-disc pl-5 space-y-5 mb-8">
              <li>
                <strong>Brasil (N=626)</strong> — Los anunciantes brasileños solicitan competencias analíticas con mayor frecuencia que el resto de la región: Datos al 53.2% y Técnico al 39.1%, ambos los más cercanos a EE. UU. en la tabla. En Business (64.9%) y UX/UI (37.4%) converge con Colombia, formando un patrón similar entre los dos mercados de mayor volumen.
              </li>
              <li>
                <strong>Colombia (N=201)</strong> — La anomalía más llamativa de la tabla: los anunciantes locales incluyen UX/UI en el <strong>38.8%</strong> de sus publicaciones — el valor más alto de toda la tabla, por encima de EE. UU. (36.0%). Al mismo tiempo, es el país hispanohablante donde los avisos solicitan IA con mayor frecuencia (27.9%). La diferencia de <strong>8.4 puntos</strong> entre Colombia y México en UX/UI es la mayor brecha entre países con muestras comparables. Una hipótesis plausible: la composición de industrias que publica en Colombia —con presencia relevante de fintech y empresas de producto digital— puede presionar hacia este perfil, pero los datos de industria no permiten confirmarlo.
              </li>
              <li>
                <strong>México (N=415)</strong> — El mercado con el perfil de solicitudes más equilibrado: Business (66.3%), Técnico (38.8%), sin anomalías marcadas. El rezago relativo aparece en IA (23.1%) y Datos (43.1%), por debajo de Brasil y Colombia en ambos dominios. Tasa de Unicornio: 2.4% — la segunda más baja de la región.
              </li>
              <li>
                <strong>Chile (N=182)</strong> — Los anunciantes chilenos solicitan Business en el <strong>70.9%</strong> de sus publicaciones, el segundo valor más alto de toda la tabla después de EE. UU. (73.6%). Su tasa de Unicornio (6.0%) supera el promedio regional (5.3%) y es comparable a Brasil (6.1%). La muestra de 182 vacantes está en el límite estadístico recomendable; los patrones son descriptivos, no proyectables con alta confianza.
              </li>
              <li>
                <strong>Perú (N=73)</strong> — ⚠️ Con 73 publicaciones, el margen de error implícito supera los 10 puntos en la mayoría de los dominios. Los valores de Perú se incluyen para completar el mapa regional, pero no se usan como base comparativa en los análisis de esta sección.
              </li>
            </ul>
          </NarrativeText>

          {/* MOVED: Heatmap goes BEFORE Sunburst */}
          <NarrativeText>
            <h3 className="text-xl font-bold text-foreground mb-4 mt-8">¿Qué pide cada sector?</h3>
            <p className="mb-6">
              El perfil de competencias que el mercado exige no es uniforme: cambia radicalmente según la industria en la que operes. Un PM en el sector financiero enfrenta una demanda completamente distinta a uno en entretenimiento o manufactura. Este mapa de calor permite comparar sector por sector el peso relativo de cada dominio en las vacantes analizadas, revelando dónde existe mayor ventaja competitiva según el perfil individual.
            </p>
          </NarrativeText>

          <AnimatedSection delay={200}>
            <div className="mb-16">
              <SkillsIndustryHeatmap />
            </div>
          </AnimatedSection>

          <NarrativeText>
            <h3 className="text-xl font-bold text-foreground mb-4 mt-8">¿Qué competencias y habilidades específicas conforman cada dominio?</h3>
            <div className="space-y-4 mb-8">
              <p>
                Esta visualización está diseñada principalmente como una herramienta estratégica para profesionales en diferentes roles de Product Management. Permite auditar el perfil personal para identificar qué competencias y habilidades específicas desarrollar con el fin de avanzar en la carrera, dependiendo del mercado objetivo. De forma secundaria, funciona como un mapa para equipos de People y tomadores de decisiones que buscan alinear sus descripciones de puesto con la taxonomía real que exige la industria.
              </p>
              <p>
                A nivel estructural, los datos siguen una jerarquía estricta: las <strong>habilidades específicas</strong> (herramientas y técnicas puntuales) se agrupan en <strong>competencias</strong> (áreas de conocimiento), las cuales finalmente conforman los grandes <strong>dominios</strong>. Aunque en este gráfico cada habilidad específica fue anidada en la competencia donde su contexto de uso es más frecuente, la realidad es que muchas de ellas son transversales.
              </p>
              <p>
                Por ejemplo: <em>SQL</em> pertenece a la competencia de "Bases de Datos" en el dominio de Datos, pero es igualmente crucial como competencia de "Ingeniería" en el dominio Técnico. <em>Python</em> es un lenguaje de programación (Técnico) y una herramienta analítica (Datos). <em>Machine Learning</em> es la base del dominio de IA, pero en el mercado también se solicita como capacidad predictiva (Datos) o conocimiento de infraestructura (Técnico).
              </p>
              <p>
                Los porcentajes interactivos que observarás al hacer clic en las divisiones de la gráfica reflejan el peso de la habilidad en todo el conjunto de la muestra, independientemente de si la herramienta fue asignada exclusivamente a una sola competencia o dominio visualmente.
              </p>
              <p>
                <strong>¿Cómo usar este mapa para tu carrera?</strong> Si, por ejemplo, decides que necesitas fortalecer tu perfil en el <strong>Dominio Técnico</strong>, al explorar esa sección notarás que las dos competencias con mayor volumen de demanda son <em>APIs & Integrations</em> y <em>Databases & Storage</em>.
              </p>
              <p>
                La conclusión táctica es clara: si un profesional de producto busca adquirir <em>expertise</em> técnico para elevar su competitividad, el punto de partida óptimo no es aprender a programar desde cero, sino comprender a profundidad cómo funcionan las APIs y el intercambio de datos. Dominar esta competencia es la ruta más eficiente para hacer <em>match</em> empírico con un abanico mucho más amplio de ofertas laborales en el mercado actual.
              </p>
            </div>
          </NarrativeText>

          <AnimatedSection delay={250}>
            <div className="mt-8">
              <ChartWrapper
                id="chart-taxonomia-competencias"
                title="Taxonomía de Dominios y Competencias"
                helpText="Usa los controles de abajo para activar o desactivar dominios. Haz clic en cualquier dominio (Business, Datos, IA…) para entrar en detalle: verás todas sus competencias y las habilidades específicas que lo componen. El tamaño de cada competencia refleja su peso relativo dentro del dominio — cuanto más grande, más frecuente es esa competencia en las publicaciones analizadas."
                className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-lg"
              >
                <div className="flex flex-col">
                  <CompetencySunburstChart />
                  <div className="mt-6 mb-2">
                    <div className="w-full h-px bg-border/60 mb-5" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 px-2">
                      {[
                        { label: 'Diccionario de estandarización de competencias Core PM', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/groupings/core_pm_skills_grouping.md' },
                        { label: 'Diccionario de estandarización de competencias de Datos', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/groupings/data_skills_grouping.md' },
                        { label: 'Diccionario de estandarización de competencias de IA', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/groupings/ai_skills_grouping.md' },
                        { label: 'Diccionario de estandarización de competencias de Negocio', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/groupings/business_skills_grouping.md' },
                        { label: 'Diccionario de estandarización de competencias Técnicas', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/groupings/technical_skills_grouping.md' },
                        { label: 'Diccionario de estandarización de competencias de UX/UI', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/groupings/ux_ui_skills_grouping.md' },
                      ].map(({ label, url }) => (
                        <a
                          key={label}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline text-[14px] w-fit flex items-center"
                        >
                          {label} <span className="ml-1 text-xs">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </ChartWrapper>
            </div>
          </AnimatedSection>


          
          {/* AiMarketShift inserted exactly here as the analytical conclusion to Section 4 */}
          <AnimatedSection delay={350}>
            <AiMarketShift />
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
