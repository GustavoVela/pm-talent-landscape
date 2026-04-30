"use client"

import React, from "react"
import { SectionHeader, NarrativeText, Blockquote, AnimatedSection } from "./section-primitives"
import { ChartWrapper } from "./chart-wrapper"
import { CompetencyMacroRadar } from "./charts/competency-macro-radar"
import { CompetencyCountryInteractive } from "./charts/competency-country-interactive"
import { SkillsSunburstChart } from "./charts/skills-sunburst-chart"
import { CompetencyDataTable } from "./competency-data-table"
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
            subtitle="¿Existe un perfil de habilidades estandarizado, o los requisitos varían de forma medible entre mercados?"
          />

          <NarrativeText>
            <div className="mb-8 p-4 rounded-lg border border-border bg-muted/30 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">📌 Nota de lectura</p>
              Las datos de esta sección provienen de 2,836 descripciones de empleo publicadas en LinkedIn. Lo que se mide es la frecuencia con la que los anunciantes solicitan una habilidad, no el nivel real de competencia de los PMs en cada mercado. Son señales de demanda de contratación, no calificaciones de desempeño.
            </div>
            <p>
              Las habilidades base de gestión de producto —metodologías ágiles, roadmapping, discovery— son el punto de partida definitorio: todos los registros de esta muestra son roles en Product Management. El 92% que aparece en la tabla refleja que el 8% restante corresponde a publicaciones con descripciones demasiado genéricas o incompletas para que el análisis extrajera estas etiquetas; no son excepciones al perfil. Las variaciones relevantes entre mercados se expresan en los conocimientos y habilidades solicitados en cinco ejes adicionales: negocio, tecnología, datos, diseño (UX/UI) e inteligencia artificial.
            </p>
            <h3 className="text-xl font-bold text-foreground mb-4 mt-8">Lo que solicitan los equipos de reclutamiento en EE. UU. vs. Latinoamérica</h3>
            <ul className="space-y-4 my-6">
              <li><strong>La brecha más amplia está en IA y Datos.</strong> Las publicaciones en EE. UU. incluyen requerimientos de IA en el <strong>36.2%</strong> de los casos, frente al <strong>26.1%</strong> en Latinoamérica — 10.1 puntos de diferencia. En Datos, la brecha es de 6.3 puntos (56.2% vs. 49.9%). Esto refleja que los equipos de reclutamiento en EE. UU. ya incorporaron estas competencias como criterio de filtro con mayor frecuencia. Si eso implica que los profesionales allí son más capaces en estas áreas, o simplemente que el mercado las pide más por presión competitiva o tendencia, es una pregunta que esta base de datos no puede responder.</li>
              <li><strong>La paridad técnica es el dato contraintuitivo — y lo que se pide no es lo mismo.</strong> La diferencia en el eje Técnico entre EE. UU. (39.7%) y Latinoamérica (38.0%) es de apenas 1.7 puntos. Sin embargo, al revisar las habilidades individuales, la naturaleza de la demanda diverge. En EE. UU., las habilidades técnicas más solicitadas son APIs (9.1%), arquitectura de sistemas (1.5%), pipelines de datos (1.2%), cloud (AWS 2.5%, Azure 1.7%, GCP 1.0%) y plataformas de datos como Snowflake o Databricks. En Latinoamérica, SQL lidera con 8.9% frente al 4.6% en EE. UU. Esta diferencia es consistente con una hipótesis razonable: en mercados más maduros, la infraestructura de datos ya está construida —dashboards, plataformas de analítica, equipos de Data Science dedicados— y el PM no necesita consultar bases de datos directamente. En Latinoamérica, donde esa infraestructura aún está en construcción en muchas empresas, el mercado solicita que el propio PM pueda extraer sus propios datos. Los datos de SQL apoyan esta lectura, aunque no la comprueban de forma definitiva.</li>
              <li><strong>El perfil Unicornio es minoritario — y no lo piden las empresas que uno esperaría.</strong> Solo el <strong>8.8%</strong> de las publicaciones en EE. UU. y el <strong>5.3%</strong> en Latinoamérica solicitan simultáneamente los cinco dominios de conocimiento. En EE. UU., lo piden empresas como Meta, BetterUp, Pinterest, Automation Anywhere o Samba TV. En Latinoamérica, predominan empresas brasileras de escala (Serasa Experian, Creditas, Bees Brasil) y algunas chilenas (Banco Falabella, Global66). Son empresas con productos digitales maduros y complejos — no organizaciones en etapa temprana. El perfil completo parece ser una decisión de arquitectura de equipo, no un estándar de contratación masivo. Este hallazgo fue uno de los más sorprendentes del análisis: el perfil integral es menos frecuente de lo que esperaba, algo que va en tensión directa con el <a href="#marco-mental" className="underline underline-offset-2 text-foreground font-medium hover:opacity-70 transition-opacity">marco mental con el que llegué a estos datos</a>.</li>
            </ul>
          </NarrativeText>

          {/* Radar Charts Grid */}
          <AnimatedSection delay={150}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-16">
              <ChartWrapper
                id="chart-radar-macro"
                title="Comparativa por regiones"
                description="💡 Tip: Haz clic en las zonas geográficas de la leyenda para encenderlas o apagarlas y aislar tu comparación."
                className="h-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-lg"
              >
                <CompetencyMacroRadar />
              </ChartWrapper>

              <ChartWrapper
                id="chart-radar-country"
                title="Comparativa por países"
                description="💡 Tip: Haz clic en los países de la leyenda para encenderlos o apagarlos y aislar tu comparación."
                className="h-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-lg"
              >
                <CompetencyCountryInteractive />
              </ChartWrapper>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <CompetencyDataTable />
          </AnimatedSection>

          <NarrativeText>
            <h3 className="text-xl font-bold text-foreground mb-4 mt-8">Desglose por países: lo que pide cada mercado</h3>
            <p className="mb-6">
              Al desagregar la región, las señales de demanda no son uniformes. Cada mercado muestra un perfil de solicitudes distinto:
            </p>
            <ul className="space-y-5 mb-8">
              <li>
                <strong>Brasil (N=626)</strong> — Los anunciantes brasileños solicitan competencias analíticas con mayor frecuencia que el resto de la región: Datos al 53.2% y Técnico al 39.1%, ambos los más cercanos a EE. UU. en la tabla. En Business (64.9%) y UX/UI (37.4%) converge con Colombia, formando un patrón similar entre los dos mercados de mayor volumen.
              </li>
              <li>
                <strong>Colombia (N=201)</strong> — La anomalía más llamativa de la tabla: los anunciantes locales incluyen UX/UI en el <strong>38.8%</strong> de sus publicaciones — el valor más alto de toda la tabla, por encima de EE. UU. (36.0%). Al mismo tiempo, es el país hispanohablante donde los avisos solicitan IA con mayor frecuencia (27.9%). La diferencia de <strong>8.4 puntos</strong> entre Colombia y México en UX/UI es la mayor brecha entre países con muestras comparables. Una hipótesis plausible: la composición de industrias que publica en Colombia —con presencia relevante de fintech y empresas de producto digital— puede presionar hacia este perfil, pero los datos de industria no permiten confirmarlo.
              </li>
              <li>
                <strong>México (N=415)</strong> — El mercado con el perfil de solicitudes más equilibrado: Business (66.3%), Técnico (38.8%), sin anomalías marcadas. El rezago relativo aparece en IA (23.1%) y Datos (43.1%), por debajo de Brasil y Colombia en ambos ejes. Tasa de Unicornio: 2.4% — la segunda más baja de la región.
              </li>
              <li>
                <strong>Chile (N=182)</strong> — Los anunciantes chilenos solicitan Business en el <strong>70.9%</strong> de sus publicaciones, el segundo valor más alto de toda la tabla después de EE. UU. (73.6%). Su tasa de Unicornio (6.0%) supera el promedio regional (5.3%) y es comparable a Brasil (6.1%). La muestra de 182 vacantes está en el límite estadístico recomendable; los patrones son descriptivos, no proyectables con alta confianza.
              </li>
              <li>
                <strong>Perú (N=73)</strong> — ⚠️ Con 73 publicaciones, el margen de error implícito supera los 10 puntos en la mayoría de los ejes. Los valores de Perú se incluyen para completar el mapa regional, pero no se usan como base comparativa en los análisis de esta sección.
              </li>
            </ul>
          </NarrativeText>

          <NarrativeText>
            <h3 className="text-xl font-bold text-foreground mb-4 mt-8">Desglose por países: lo que pide cada mercado</h3>
            <p className="mb-6">
              Al desagregar la región, las señales de demanda no son uniformes. Cada mercado muestra un perfil de solicitudes distinto:
            </p>
            <ul className="space-y-5 mb-8">
              <li>
                <strong>Brasil (N=626)</strong> — Los anunciantes brasileños solicitan competencias analíticas con mayor frecuencia que el resto de la región: Datos al 53.2% y Técnico al 39.1%, ambos los más cercanos a EE. UU. en la tabla. En Business (64.9%) y UX/UI (37.4%) converge con Colombia, formando un patrón similar entre los dos mercados de mayor volumen.
              </li>
              <li>
                <strong>Colombia (N=201)</strong> — La anomalía más llamativa de la tabla: los anunciantes locales incluyen UX/UI en el <strong>38.8%</strong> de sus publicaciones — el valor más alto de toda la tabla, por encima de EE. UU. (36.0%). Al mismo tiempo, es el país hispanohablante donde los avisos solicitan IA con mayor frecuencia (27.9%). La diferencia de <strong>8.4 puntos</strong> entre Colombia y México en UX/UI es la mayor brecha entre países con muestras comparables. Una hipótesis plausible: la composición de industrias que publica en Colombia —con presencia relevante de fintech y empresas de producto digital— puede presionar hacia este perfil, pero los datos de industria no permiten confirmarlo.
              </li>
              <li>
                <strong>México (N=415)</strong> — El mercado con el perfil de solicitudes más equilibrado: Business (66.3%), Técnico (38.8%), sin anomalías marcadas. El rezago relativo aparece en IA (23.1%) y Datos (43.1%), por debajo de Brasil y Colombia en ambos ejes. Tasa de Unicornio: 2.4% — la segunda más baja de la región.
              </li>
              <li>
                <strong>Chile (N=182)</strong> — Los anunciantes chilenos solicitan Business en el <strong>70.9%</strong> de sus publicaciones, el segundo valor más alto de toda la tabla después de EE. UU. (73.6%). Su tasa de Unicornio (6.0%) supera el promedio regional (5.3%) y es comparable a Brasil (6.1%). La muestra de 182 vacantes está en el límite estadístico recomendable; los patrones son descriptivos, no proyectables con alta confianza.
              </li>
              <li>
                <strong>Perú (N=73)</strong> — ⚠️ Con 73 publicaciones, el margen de error implícito supera los 10 puntos en la mayoría de los ejes. Los valores de Perú se incluyen para completar el mapa regional, pero no se usan como base comparativa en los análisis de esta sección.
              </li>
            </ul>
            <p className="mb-6">
              Los datos de esta sección son señales de demanda, no evaluaciones de talento. Muestran qué están pidiendo las empresas en sus publicaciones, no qué tan buenos son los profesionales en Product Management en cada mercado. Lo que sí es concluyente: no existe un perfil único en las Américas. Los anunciantes en Brasil y EE. UU. solicitan autonomía analítica con mayor frecuencia; los de Colombia incorporan más diseño; los de Chile y EE. UU. son quienes más frecuentemente buscan el perfil completo.</p>
          </NarrativeText>

          <NarrativeText>
            <h3 className="text-xl font-bold text-foreground mb-4 mt-8">Detalle y taxonomía de competencias solicitadas</h3>
            <p className="mb-6">
              Para quienes toman decisiones de contratación, o para quienes están en Product Management y quieren orientar su desarrollo hacia los ejes con mayor demanda en su mercado, el siguiente gráfico desglosa la taxonomía completa de habilidades solicitadas.
            </p>
          </NarrativeText>

          <NarrativeText>
            <div className="rounded-lg border border-border/50 bg-muted/30 px-6 py-5 text-sm text-muted-foreground leading-relaxed space-y-3">
              <p className="font-semibold text-foreground text-base">📌 Nota de lectura</p>
              <p>Las habilidades en este gráfico están clasificadas en el eje donde tienen mayor presencia, pero algunas aparecen de forma natural en más de un dominio. Esto no es un error de clasificación: refleja que ciertas habilidades son genuinamente transversales.</p>
              <p>Ejemplos concretos: <strong>SQL</strong> está en el eje de Datos (donde lidera como lenguaje de consulta), pero también aparece en el eje Técnico como habilidad de ingeniería. <strong>Python</strong> figura en Técnico como lenguaje de programación y en Datos como herramienta de análisis. <strong>Machine Learning</strong> vive en IA como disciplina central, en Datos como capacidad predictiva y en Técnico como conocimiento de infraestructura. <strong>Databricks y Snowflake</strong> aparecen tanto en la capa de ingeniería técnica como en los ecosistemas de datos.</p>
              <p>Para este gráfico, cada habilidad fue asignada al eje donde el contexto de uso era más frecuente en las publicaciones analizadas. Los porcentajes en la tabla comparativa reflejan si la habilidad fue mencionada en alguno de los ejes, no si fue asignada a uno exclusivamente.</p>
              <div className="pt-2 border-t border-border/40">
                <p className="text-xs text-muted-foreground mb-2 font-medium">Ver clasificación completa por eje →</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'IA', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/data/skills/ai_skills_grouping.md' },
                    { label: 'Datos', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/data/skills/data_skills_grouping.md' },
                    { label: 'Técnico', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/data/skills/technical_skills_grouping.md' },
                    { label: 'Negocio', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/data/skills/business_skills_grouping.md' },
                    { label: 'UX/UI', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/data/skills/ux_ui_skills_grouping.md' },
                    { label: 'Core PM', url: 'https://github.com/GustavoVela/pm-talent-landscape/blob/main/data/skills/core_pm_skills_grouping.md' },
                  ].map(({ label, url }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background px-3 py-1 text-xs font-medium text-foreground hover:border-foreground/40 hover:bg-muted transition-all duration-150"
                    >
                      <span className="opacity-60">↪</u0073pan>
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </NarrativeText>

          <AnimatedSection delay={250}>
            <div className="mt-16">
              <ChartWrapper
                id="chart-taxonomia-competencias"
                title="Taxonomía de Competencias (Sunburst)"
                description="💡 Usa los controles de abajo para activar o desactivar ejes de competencias. Haz clic en cualquier eje (Business, Datos, IA…) para entrar en detalle: verás todos sus clústeres de habilidades y las habilidades individuales que lo componen. El tamaño de cada clúster refleja su peso relativo dentro del eje — cuanto más grande, más frecuente es ese grupo de skills en las publicaciones analizadas."
                className="w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-lg"
              >
                <SkillsSunburstChart />
              </ChartWrapper>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
