"use client"

import { AnimatedSection } from "./section-primitives"
import { AiPenetrationChart } from "./charts/ai-penetration-chart"
import { AiSeniorityChart } from "./charts/ai-seniority-chart"
import { AiCityChart } from "./charts/ai-city-chart"

export function AiPhase() {
  return (
    <section id="ai-phase" className="border-t border-border/40 bg-muted/10">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="mb-12">
              <span className="text-sm font-medium text-muted-foreground">05</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                La Era de la Inteligencia Artificial
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-16">
              <p>
                El rol del Product Manager está experimentando una transformación radical impulsada por la IA. 
                Ya no se trata solo de gestionar procesos, sino de convertirse en un "Full-Stack Builder". 
                Pero, ¿es esto una realidad en el mercado laboral actual o simplemente una tendencia teórica?
              </p>
              <p>
                Nuestros datos demuestran que la integración de la IA no es uniforme. La brecha de demanda 
                entre Estados Unidos y Latinoamérica supera los 10 puntos porcentuales. Un mercado anticipa 
                lo que el otro requerirá muy pronto: lo que hoy es una ventaja competitiva en LATAM, será 
                un requisito estándar innegociable en los próximos 18 a 24 meses.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="rounded-xl border border-border/50 bg-background p-6 shadow-sm mb-8">
              <div className="mb-0">
                <h3 className="text-xl font-semibold text-foreground">
                  Penetración de IA en Roles de Producto
                </h3>
              </div>
              <AiPenetrationChart />
              <AiSeniorityChart />
              <AiCityChart />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
