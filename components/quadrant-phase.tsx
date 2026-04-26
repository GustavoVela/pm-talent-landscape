"use client"

import { ChartWrapper } from "./chart-wrapper"
import { SectionHeader, NarrativeText, Blockquote, ChartPlaceholder, AnimatedSection } from "./section-primitives"

export function QuadrantPhase() {
  return (
    <section id="phase-quadrant" className="border-t border-border/40 bg-slate-50/50 dark:bg-slate-900/20">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            number="06"
            title="Desenredando la Complejidad"
            subtitle="Tienes 5 horas libres este fin de semana. ¿En qué inviertes tu tiempo? Separemos el commodity del foso competitivo."
          />

          <NarrativeText>
            <p>
              No todas las habilidades valen lo mismo. Algunas son <span className="font-semibold text-foreground">el precio de entrada</span> (las pide todo el mundo), otras son <span className="font-semibold text-foreground">tu foso defensivo</span> (pocos las tienen, muchos las necesitan). Necesitas un mapa para tomar decisiones de inversión en tu carrera.
            </p>
          </NarrativeText>

          {/* Quadrant Legend — same card style as domain cards */}
          <AnimatedSection delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-16">
              {[
                { title: "Commodity", desc: "Alta frecuencia · Baja diferenciación" },
                { title: "Diferenciador", desc: "Alta frecuencia · Alta exclusividad" },
                { title: "Emergente", desc: "Baja frecuencia · Alta exclusividad" },
                { title: "Nicho", desc: "Baja frecuencia · Baja diferenciación" },
              ].map((q) => (
                <div key={q.title} className="group relative h-full rounded-xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1 text-center">
                  <h3 className="text-sm font-semibold text-foreground">{q.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{q.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Main Quadrant Chart */}
          <AnimatedSection delay={200}>
            <ChartWrapper
              id="chart-cuadrante-magico"
              title="El Cuadrante Mágico de Skills PM"
              
              interpretation="[Insight principal del cuadrante — ¿Qué skills son commodity y cuáles construyen foso competitivo?]"
            >
              <ChartPlaceholder 
                title="Scatter Plot 2×2: Cuadrante Mágico" 
                height="500px"
                
              />
            </ChartWrapper>
          </AnimatedSection>

          {/* Actionable Takeaway */}
          <AnimatedSection delay={250}>
            <div className="mt-16">
              <Blockquote>
                <p>Las habilidades en el cuadrante Diferenciador son las que deberías priorizar. Son frecuentemente demandadas pero difíciles de encontrar: ahí está tu ventaja competitiva real.</p>
              </Blockquote>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
