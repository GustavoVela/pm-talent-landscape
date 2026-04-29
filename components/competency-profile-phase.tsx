"use client"

import React, from "react"
import { SectionHeader, NarrativeText, Blockquote, AnimatedSection } from "./section-primitives"
import { ChartWrapper } from "./chart-wrapper"
import { CompetencyMacroRadar } from "./charts/competency-macro-radar"
import { CompetencyCountryInteractive } from "./charts/competency-country-interactive"
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
              <span className="font-semibold text-foreground">Nota de lectura: </span>
              Los datos de esta sección provienen de 2,836 descripciones de empleo publicadas en LinkedIn. Lo que se mide es la frecuencia con la que los anunciantes solicitan una habilidad, no el nivel real de competencia de los PMs en cada mercado. Son señales de demanda de contratación, no calificaciones de desempeño.
            </div>
            <p>
              Las habilidades base de gestión de producto —metodologías ágiles, roadmapping, discovery— son el punto de partida definitorio: todos los registros de esta muestra son roles en Product Management, por lo que la presencia de estas competencias debería ser del 100%. El 92% que refleja el dato es un artefacto de extracción: algunas publicaciones no contenían el suficiente detalle textual para que el pipeline identificara estas etiquetas de forma explícita. Las variaciones relevantes entre mercados se expresan en los conocimientos y habilidades solicitados en cinco ejes adicionales: negocio, tecnología, datos, diseño (UX/UI) e inteligencia artificial.
            </p>
            <h3 className="text-xl font-bold text-foreground mb-4 mt-8">Comparativa Regional: lo que solicitan los anunciantes en EE. UU. vs. Latinoamérica</h3>
            <ul className="space-y-4 my-6">
              <li><strong>La brecha más amplia está en IA y Datos.</strong> Las publicaciones de empleo en EE. UU. incluyen requerimientos de IA en el <strong>36.2%</strong> de los casos, frente al <strong>26.1%</strong> en Latinoamérica — una diferencia de 10.1 puntos. En Datos, la brecha es de 6.3 puntos (56.2% vs. 49.9%). Esto refleja que las empresas que contratan en EE. UU. ya incorporaron estas competencias como criterio de filtro con mayor frecuencia. Si ese criterio indica que los PMs allí son más hábiles en IA, o simplemente que el mercado lo pide más por presión competitiva o tendencia, es una pregunta que esta base de datos no puede responder.</li>
              <li><strong>La paridad técnica es el dato contraintuitivo.</strong> La diferencia en competencias Técnicas entre EE. UU. (39.7%) y Latinoamérica (38.0%) es de apenas 1.7 puntos — estadísticamente irrelevante a estas escalas. Ambos mercados solicitan competencias técnicas con frecuencia casi idéntica. Lo que sí varía es el tipo de habilidad: SQL aparece como requisito en el <strong>8.9%</strong> de las vacantes en LATAM frente al <strong>4.6%</strong> en EE. UU. Esto sugiere que los anunciantes en la región orientan la demanda técnica hacia la extracción y consulta directa de datos, mientras que en EE. UU. puede concentrarse en otras áreas. Un análisis granular de etiquetas técnicas confirmaría esta hipótesis.</li>
              <li><strong>El perfil Unicornio es minoritario en ambos mercados.</strong> Solo el <strong>8.8%</strong> de las publicaciones en EE. UU. y el <strong>5.3%</strong> en Latinoamérica incluyen simultáneamente los cinco dominios (Business + Technical + Data + AI + UX/UI). No es el perfil estándar que el mercado contrata; es lo que solicita una fracción de las empresas que buscan la mayor cobertura posible en un solo rol. La columna 🦄 en la tabla a continuación cuantifica esto por país.</li>
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
                <strong>Perú (N=73)</strong> — <span className="inline-flex items-center gap-1 text-muted-foreground text-sm">⚠️ <em>Con 73 publicaciones, el margen de error implícito supera los 10 puntos en la mayoría de los ejes. Los valores de Perú se incluyen para completar el mapa regional, pero no se usan como base comparativa en los análisis de esta sección.</em></span>
              </li>
            </ul>
            <h3 className="text-xl font-bold text-foreground mb-4 mt-10">Contexto detrás de los números</h3>
            <ul className="space-y-4 mb-4">
              <li><strong>La demanda técnica en LATAM y EE. UU. no es la misma, aunque tenga el mismo porcentaje.</strong> La paridad en el eje Técnico no implica que los anunciantes soliciten lo mismo. La mayor frecuencia de SQL en LATAM (8.9% vs. 4.6% en EE. UU.) sugiere que las empresas de la región esperan que el PM acceda directamente a los datos. En EE. UU., el mismo eje puede concentrarse en habilidades distintas. Esta hipótesis está parcialmente sustentada, pero requiere un análisis de etiquetas más exhaustivo para ser concluyente.</li>
              <li><strong>Business más alto en EE. UU. que en LATAM.</strong> EE. UU. solicita habilidades de negocio en el 73.6% de sus publicaciones frente al 67.7% de Latinoamérica. Esto no dice nada sobre la orientación de negocio real de los PMs en cada región; dice que los anunciantes en EE. UU. lo explicitan más en sus job descriptions. En mercados con mayor formalización de los procesos de contratación, la descripción de criterios suele ser más detallada.</li>
              <li><strong>La brecha en IA es la señal con mayor relevancia práctica.</strong> De todas las diferencias observadas, los 10.1 puntos en IA entre EE. UU. y Latinoamérica tienen la mayor implicación para quienes toman decisiones de desarrollo profesional o diseño de equipos. No porque los PMs latinoamericanos sean menos capaces en este dominio, sino porque las empresas que contratan ya lo están incorporando como criterio con notablemente mayor frecuencia en un mercado que históricamente anticipa los estándares de la región.</li>
            </ul>
          </NarrativeText>

          <AnimatedSection delay={200}>
            <div className="mt-16">
              <Blockquote>
                <p>Los datos de esta sección son señales de demanda, no evaluaciones de talento. Muestran qué están pidiendo las empresas en sus publicaciones, no qué tan buenos son los PMs en cada mercado. Lo que sí es concluyente: no existe un perfil único de PM en las Américas. Los anunciantes en Brasil y EE. UU. solicitan autonomía analítica con mayor frecuencia; los de Colombia incorporan más diseño; los de Chile y EE. UU. son quienes más frecuentemente buscan el perfil completo. Para quienes toman decisiones de contratación o de desarrollo de carrera, la tabla adjunta ofrece el diagnóstico por mercado.</p>
              </Blockquote>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
