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
