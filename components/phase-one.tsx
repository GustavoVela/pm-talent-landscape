"use client"

import React from "react"
import { ChartWrapper } from "./chart-wrapper"
import { SectionHeader, NarrativeText, Blockquote, ChartPlaceholder, AnimatedSection } from "./section-primitives"

export function PhaseOne() {
  return (
    <section id="fase-1" className="border-t border-border/40 bg-muted/20">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            number="05"
            title="Validando el Terreno"
            subtitle="¿Hay trabajo? ¿Dónde está? ¿El boom del remoto sigue vivo o es un espejismo hipercompetitivo?"
          />

          <NarrativeText>
            <p>
              Antes de hablar de habilidades, el usuario necesita saber si hay trabajo, dónde está y si el <span className="font-semibold text-foreground">&quot;boom&quot; del nearshoring y el trabajo remoto</span> sigue vivo o es un espejismo hipercompetitivo.
            </p>
          </NarrativeText>

          {/* Chart Placeholder for Modalidad de Trabajo */}
          <AnimatedSection delay={200}>
            <div className="mt-16">
              <ChartWrapper
                id="chart-modalidad-trabajo"
                title="Modalidad de Trabajo: ¿Remoto, Híbrido o Presencial?"
                description="Distribución real de las modalidades de trabajo para PMs"
                interpretation="[Insight sobre modalidad — se llenará con datos reales]"
                className="h-full"
              >
                <ChartPlaceholder 
                  title="Modalidad de trabajo por región" 
                  height="450px"
                  description="Stacked bar o donut chart comparando US vs LatAm"
                />
              </ChartWrapper>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
