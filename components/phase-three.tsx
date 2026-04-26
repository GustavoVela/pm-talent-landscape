"use client"

import { SectionHeader, NarrativeText, ChartPlaceholder, AnimatedSection } from "./section-primitives"

export function PhaseThree() {
  return (
    <section id="fase-3" className="border-t border-border/40 bg-muted/20">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            number="P3"
            title="El Choque de Realidades"
            subtitle="La gente está harta de promedios. Una herramienta hiper-personalizada que audite tu skill-set contra el mercado real."
          />

          <NarrativeText>
            <p>
              Los promedios mienten. Un PM en <span className="font-medium text-foreground">San Francisco</span> y uno en <span className="font-medium text-foreground">Bogotá</span> viven en universos paralelos de demanda. El evaluador de brechas permite comparar <span className="font-semibold text-foreground">tu mercado objetivo</span> contra el estándar que realmente se está pidiendo.
            </p>
          </NarrativeText>

          {/* Interactive Gap Evaluator */}
          <AnimatedSection delay={150}>
            <div className="my-16 rounded-xl border border-border/50 bg-background p-6 md:p-8">
              <div className="mb-8">
                <span className="text-xs font-medium text-muted-foreground/60">HERRAMIENTA INTERACTIVA</span>
                <h3 className="mt-1 font-semibold text-foreground">Evaluador de Brechas</h3>
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Región objetivo</label>
                  <div className="rounded-lg border border-border/50 bg-muted/20 px-4 py-2.5 text-sm text-muted-foreground">
                    Seleccionar región...
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Nivel de seniority</label>
                  <div className="rounded-lg border border-border/50 bg-muted/20 px-4 py-2.5 text-sm text-muted-foreground">
                    Seleccionar nivel...
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Especialización</label>
                  <div className="rounded-lg border border-border/50 bg-muted/20 px-4 py-2.5 text-sm text-muted-foreground">
                    Cualquier rol PM...
                  </div>
                </div>
              </div>

              {/* Radar Chart Placeholder */}
              <ChartPlaceholder 
                title="Radar de habilidades: Tu perfil vs. Mercado objetivo" 
                height="400px"
                description="Gráfica de radar comparando los 6 dominios de competencia para la combinación seleccionada"
              />

              {/* Domain Progress Bars */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                {["Core PM", "Técnico", "Datos", "UX/UI", "IA", "Negocios"].map((domain) => (
                  <div key={domain} className="rounded-lg border border-border/50 bg-muted/20 p-3">
                    <p className="text-xs text-muted-foreground mb-2">{domain}</p>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-0 rounded-full bg-foreground/20 transition-all duration-700" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
