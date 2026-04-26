"use client"

import React, from "react"
import { SectionHeader, NarrativeText, Blockquote, AnimatedSection } from "./section-primitives"
import { ChartWrapper } from "./chart-wrapper"
import { CompetencyMacroRadar } from "./charts/competency-macro-radar"
import { CompetencyCountryInteractive } from "./charts/competency-country-interactive"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { FLAGS } from "@/lib/data"

export function CompetencyProfilePhase() {
  return (
    <section id="phase-competency" className="border-t border-border/40">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            number="05"
            title="Perfil Competencial (Estados Unidos vs. Latinoamérica)"
            subtitle="¿Existe un perfil de habilidades estandarizado, o los requisitos varían de forma medible entre mercados?"
          />

          <NarrativeText>
            <p>
              A partir de las 2,836 vacantes de Product Management analizadas, el primer indicador claro es que las habilidades base de producto (Core PM: metodologías ágiles, roadmapping, discovery) son un estándar global, exigiéndose en más del 92% de los casos. Las variaciones reales que definen el perfil se encuentran en la adopción tecnológica y el análisis de datos.
            </p>
            <h3 className="text-xl font-bold text-foreground mb-4 mt-8">¿El perfil varía entre Estados Unidos y Latinoamérica?</h3>
            <p>
              Sí, los datos evidencian que el mercado estadounidense exige una mayor profundidad técnica y analítica, distanciándose de Latinoamérica principalmente en dos frentes:
            </p>
            <ul className="space-y-4 my-6">
              <li><strong>Inteligencia Artificial:</strong> Es el área con la mayor brecha porcentual del estudio. Estados Unidos requiere habilidades de IA en el 36.2% de sus vacantes, mientras que el promedio en Latinoamérica es del 23.7% (una diferencia de 12.5 puntos). Esto indica que la integración de IA es un requerimiento más consolidado en EE. UU.</li>
              <li><strong>Análisis de Datos (Data):</strong> En EE. UU. el 56.2% de las posiciones exigen competencias analíticas, superando el 47.6% de LatAm. El mercado maduro espera mayor autonomía del PM para interactuar con bases de datos y procesar métricas sin depender exclusivamente de un área de soporte.</li>
            </ul>
          </NarrativeText>

          {/* Radar Charts Grid */}
          <AnimatedSection delay={150}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-16">
              <ChartWrapper
                id="chart-radar-macro"
                title="Comparativa por regiones"
                description="💡 Tip: Haz clic en las zonas geográficas de la leyenda para encenderlas o apagarlas y aislar tu comparación."
                interpretation="El abismo de la Inteligencia Artificial (36.2% vs 23.7%) y la Fluidez Analítica (56.2% vs 47.6%) son las fracturas más violentas. Allá exigen autonomía técnica para interrogar el Data Warehouse por ti mismo."
                className="h-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-lg"
              >
                <CompetencyMacroRadar />
              </ChartWrapper>

              <ChartWrapper
                id="chart-radar-country"
                title="Comparativa por países"
                description="💡 Tip: Haz clic en los países de la leyenda para encenderlos o apagarlos y aislar tu comparación."
                interpretation="Brasil es la locomotora técnica y analítica del sur. Colombia sorprende liderando UX/UI y adopción de IA. Chile y Perú muestran un mercado corporativo tradicional hiper-enfocado en Business. México actúa como el puente equilibrado."
                className="h-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 shadow-lg"
              >
                <CompetencyCountryInteractive />
              </ChartWrapper>
            </div>
          </AnimatedSection>

          <NarrativeText>
            <h3 className="text-xl font-bold text-foreground mb-4 mt-8">Comparativa interna: Diagnóstico por países en Latinoamérica</h3>
            <p className="mb-6">
              Al desglosar la región, los datos demuestran que las necesidades de contratación no son uniformes y cambian según el país:
            </p>
            <ul className="space-y-4 mb-8">
              <li><strong>Brasil (Muestra: 626 vacantes):</strong> Es el mercado con mayor volumen en la región y el que presenta mayor exigencia analítica. Su requerimiento en Datos alcanza el 53.2% (el porcentaje más cercano a Estados Unidos) y lidera los requisitos Técnicos en la región con un 39.1%.</li>
              <li><strong>Colombia (Muestra: 201 vacantes):</strong> Destaca por estar orientado hacia la adopción tecnológica y el diseño. Lidera la tabla regional en requerimientos de IA (27.9%) y presenta la exigencia más alta en temas de UX/UI (38.8%).</li>
              <li><strong>México (Muestra: 415 vacantes):</strong> Presenta un perfil equilibrado. Mantiene un requerimiento estable tanto en habilidades de Negocio (66.3%) como Técnicas (38.8%), alineándose con los promedios de la región. Sin embargo, su exigencia en IA (23.1%) y Datos (43.1%) es menor al compararlo con Colombia y Brasil, respectivamente.</li>
              <li><strong>Chile (Muestra: 182 vacantes) y Perú (Muestra: 73 vacantes):</strong> <span className="text-muted-foreground text-sm flex items-center gap-1 my-1"><span className="inline-block" title="Muestra menor a 200 vacantes. Los porcentajes pueden reflejar un comportamiento concentrado en las industrias predominantes de la región.">ℹ️</span> <em>Nota estadística: Muestra menor a 200 vacantes.</em></span> Ambos países muestran una fuerte inclinación hacia la gestión comercial. Tienen las exigencias más altas en habilidades de Business (Chile con 70.9% y Perú con 69.9%), pero registran los requerimientos más bajos en rubros tecnológicos. Perú es el país que menos exige IA (16.4%) y competencias Técnicas (26.0%).</li>
            </ul>
          </NarrativeText>

          <AnimatedSection delay={200}>
            <div className="mt-16">
              <Blockquote>
                <p>💡 <strong>El Insight Final:</strong> Los datos confirman que no existe un solo perfil de PM. Los requerimientos de contratación varían objetivamente dependiendo del mercado geográfico. Para los profesionales que buscan oportunidades remotas en Estados Unidos o aplicar en mercados de alto volumen como Brasil, los números indican que es necesario nivelar y priorizar las competencias en Análisis de Datos e Inteligencia Artificial.</p>
              </Blockquote>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
