"use client"

import { useEffect, useRef, useState } from "react"
import { Funnel, Sparkle, TreeStructure } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsInView(true); observer.unobserve(element) }
    }, { threshold: 0.1, ...options })
    observer.observe(element)
    return () => observer.disconnect()
  }, [options])
  return { ref, isInView }
}

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView()
  return (
    <div ref={ref} className={cn("transition-all duration-700 ease-out", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const pipelineSteps = [
  {
    icon: Funnel,
    number: "01",
    title: "El Filtro de Ruido",
    subtitle: "IA como Reclutador",
    description: "El LLM leyó el contexto completo de 3,471 vacantes. ¿Es esto realmente un rol de producto? La IA descartó 635 ofertas (18.3%) — Project Managers de construcción, Marketing comercial, y otros falsos positivos. Quedaron 2,836 roles válidos.",
  },
  {
    icon: Sparkle,
    number: "02",
    title: "Extracción Abierta",
    subtitle: "Sin sesgos predefinidos",
    description: "No le dimos a la IA una lista cerrada de skills. Dejamos que extrajera libremente los términos exactos de cada JD. Resultado: 4,629 términos crudos únicos solicitados por las empresas.",
  },
  {
    icon: TreeStructure,
    number: "03",
    title: "Taxonomía Algorítmica",
    subtitle: "Diccionario maestro CTO-level",
    description: "Un script en Python (SKILL_MAPPINGS) construyó un diccionario maestro. Variables caóticas (\"AWS\", \"Nube\", \"GCP\") convergieron en cubetas como \"Cloud Computing\". Lo genérico se descartó para dejar solo competencias accionables.",
  },
]

export function AnalysisPipeline() {
  return (
    <section id="pipeline" className="border-t border-border/40 bg-muted/20">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-5xl">
          {/* Section Header — same style as 01/02 */}
          <AnimatedSection>
            <div className="mb-12">
              <span className="text-sm font-medium text-muted-foreground">03</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Las tripas del análisis
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                De &quot;Data Basura&quot; a Insights con IA
              </p>
            </div>
          </AnimatedSection>

          {/* Intro Text — same style as body copy in 01 */}
          <AnimatedSection delay={100}>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-8">
              <p>
                Cualquiera que analice datos de RR.HH. sabe que la información en crudo es <span className="font-semibold text-foreground">basura semántica</span>. Las empresas inventan títulos rimbombantes y agrupan responsabilidades sin sentido. Un filtro de palabras clave en Excel no iba a servir.
              </p>
              <p>
                Construimos un pipeline analítico robusto usando <span className="font-medium text-foreground">Google Cloud</span>, <span className="font-medium text-foreground">BigQuery</span> y los modelos de <span className="font-medium text-foreground">Gemini</span>:
              </p>
            </div>
          </AnimatedSection>

          {/* Pipeline Steps — card style matching domain cards in section 02 */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <AnimatedSection key={step.title} delay={200 + index * 100}>
                  <div className="group relative h-full rounded-xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground/60">
                        PASO {step.number}
                      </span>
                      <Icon className="h-5 w-5 text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground" />
                    </div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">
                      {step.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
