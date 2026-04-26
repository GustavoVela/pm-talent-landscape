"use client"

import { ChartWrapper } from "./chart-wrapper"
import { SectionHeader, NarrativeText, ChartPlaceholder, AnimatedSection } from "./section-primitives"
import { Lightning, Cpu, Brain } from "@phosphor-icons/react"

export function PhaseFive() {
  return (
    <section id="fase-5" className="border-t border-border/40">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            number="09"
            title="La Lupa en la Adopción"
            subtitle="Hype vs. Deep Tech — ¿quién pide IA por FOMO y quién está literalmente construyendo el futuro del software?"
          />

          <NarrativeText>
            <p>
              La conclusión de la Inteligencia Artificial es la más polarizante. Necesitamos separar a las empresas que piden <span className="font-semibold text-foreground">&quot;IA&quot; por miedo a quedarse fuera</span>, de las empresas donde el PM está literalmente <span className="font-semibold text-foreground">construyendo el futuro del software</span>.
            </p>
          </NarrativeText>

          {/* AI Adoption Chart */}
          <AnimatedSection delay={150}>
            <div className="my-16">
              <ChartWrapper
                id="chart-adopcion-ia"
                title="Nivel de Adopción de IA por Región"
                description="¿Qué tan profundo llega el requerimiento de IA en cada mercado?"
                interpretation="[Insight sobre la brecha de adopción de IA entre US y LatAm]"
              >
                <ChartPlaceholder 
                  title="Adopción de IA: EE.UU. vs LatAm" 
                  height="450px"
                  description="Barras agrupadas mostrando profundidad de adopción"
                />
              </ChartWrapper>
            </div>
          </AnimatedSection>

          <NarrativeText delay={200}>
            <p>
              Clasificamos las menciones de IA en tres niveles de profundidad:
            </p>
          </NarrativeText>

          {/* AI Depth Levels — using same card style as domain cards */}
          <AnimatedSection delay={250}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-16">
              {[
                {
                  icon: Lightning,
                  number: "L1",
                  title: "Buzzword",
                  description: "\"Familiaridad con herramientas de IA\", \"conocimiento de ChatGPT\". Lo piden por FOMO corporativo. No cambia tu día a día.",
                },
                {
                  icon: Cpu,
                  number: "L2",
                  title: "Aplicada",
                  description: "\"Integrar features de IA en el producto\", \"trabajar con modelos ML\". Aquí el PM usa IA como herramienta dentro de su producto.",
                },
                {
                  icon: Brain,
                  number: "L3",
                  title: "Deep Tech",
                  description: "\"Diseñar pipelines de RAG\", \"evaluar LLMs\", \"agentic workflows\". El PM es arquitecto de producto AI-native. El futuro.",
                },
              ].map((level, index) => {
                const Icon = level.icon
                return (
                  <AnimatedSection key={level.number} delay={300 + index * 100}>
                    <div className="group relative h-full rounded-xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground/60">
                          {level.number}
                        </span>
                        <Icon className="h-5 w-5 text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground" />
                      </div>
                      <h3 className="mb-1 font-semibold text-foreground">
                        {level.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {level.description}
                      </p>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </AnimatedSection>

          {/* Sunburst / Treemap */}
          <AnimatedSection delay={400}>
            <ChartWrapper
              id="chart-taxonomia-ia"
              title="Taxonomía de Skills de IA"
              description="Desglose de las ~30 categorías de competencias de IA demandadas"
              interpretation="[Insight sobre cuáles subcategorías de IA son las más demandadas]"
            >
              <ChartPlaceholder 
                title="Sunburst o Treemap de Skills de IA" 
                height="500px"
                description="Visualización jerárquica de las 30 categorías de AI skills"
              />
            </ChartWrapper>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
