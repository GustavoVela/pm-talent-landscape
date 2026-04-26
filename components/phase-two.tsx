"use client"

import { ChartWrapper } from "./chart-wrapper"
import { SectionHeader, NarrativeText, Blockquote, ChartPlaceholder, AnimatedSection } from "./section-primitives"

export function PhaseTwo() {
  return (
    <section id="fase-2" className="border-t border-border/40">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            number="P2"
            title="Entendiendo la Estructura"
            subtitle="El cuello de botella del PM: ¿dónde se atasca la carrera y vale la pena especializarse técnicamente?"
          />

          <NarrativeText>
            <p>
              La industria vende la narrativa de que el Product Management es una escalera lineal: <span className="font-medium text-foreground">Junior → Mid → Senior → Lead → VP</span>. La realidad de los datos cuenta otra historia. Hay un <span className="font-semibold text-foreground">cuello de botella brutal</span> en ciertos niveles, y la especialización técnica puede ser la llave — o una trampa.
            </p>
          </NarrativeText>

          {/* Seniority Funnel */}
          <AnimatedSection delay={150}>
            <div className="my-16">
              <ChartWrapper
                id="chart-embudo-seniority"
                title="El Embudo del Seniority"
                description="Distribución de vacantes por nivel de experiencia requerido"
                interpretation="[Insight sobre el embudo — se llenará con datos reales]"
              >
                <ChartPlaceholder 
                  title="Pirámide o embudo de seniority" 
                  height="450px"
                  description="Funnel chart: Entry → Mid → Senior → Lead → Director → VP/C-Level"
                />
              </ChartWrapper>
            </div>
          </AnimatedSection>

          {/* Narrative bridge */}
          <Blockquote>
            <p>Una pregunta que todo PM se hace en algún punto de su carrera: ¿El mercado premia más al &quot;T-shaped PM&quot; o al especialista vertical en un dominio técnico?</p>
          </Blockquote>

          {/* Specialization Comparison */}
          <AnimatedSection delay={200}>
            <div className="grid md:grid-cols-2 gap-6 mt-16">
              <ChartWrapper
                id="chart-roles-core-vs-otros"
                title="Core Product vs. Otros Roles"
                description="¿Cuántos son PMs puros vs. roles especializados?"
                interpretation="[Insight sobre la proporción de roles core de producto vs especializaciones]"
              >
                <ChartPlaceholder 
                  title="Core PM vs. Especializaciones" 
                  description="Pie chart o barras comparativas"
                />
              </ChartWrapper>

              <ChartWrapper
                id="chart-compensacion-por-nivel"
                title="Compensación por Nivel y Región"
                description="¿Cuánto más gana un Technical PM vs. un PM generalista?"
                interpretation="[Insight sobre rangos salariales y el delta entre US y LatAm]"
              >
                <ChartPlaceholder 
                  title="Rangos salariales por nivel" 
                  description="Box plot o barras con rangos"
                />
              </ChartWrapper>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
