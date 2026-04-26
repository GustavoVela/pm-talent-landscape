"use client"

import { AnimatedSection } from "./section-primitives"
import { CheckCircle } from "@phosphor-icons/react"

const skillDomains = [
  { name: "Core PM", skills: ["Roadmapping", "Discovery", "A/B Testing", "PRDs", "Go-to-Market", "OKRs"] },
  { name: "Técnico", skills: ["APIs / REST", "SQL", "Cloud (AWS/GCP)", "System Design", "CI/CD", "Git"] },
  { name: "Datos", skills: ["Product Analytics", "Tableau/Looker", "Python", "Estadística", "Cohortes"] },
  { name: "UX/UI", skills: ["Figma", "User Research", "Wireframing", "Design Systems", "Accesibilidad"] },
  { name: "IA", skills: ["Prompt Engineering", "LLMs / GPT", "RAG", "Agentic AI", "MLOps", "Evals"] },
  { name: "Negocios", skills: ["P&L / Unit Economics", "Pricing Strategy", "Sales Enablement", "Partnerships"] },
]

export function ProfileAudit() {
  return (
    <section id="audita-tu-perfil" className="border-t border-border/40">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          {/* Section Header — matching style */}
          <AnimatedSection>
            <div className="mb-12">
              <span className="text-sm font-medium text-muted-foreground">CTA</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Audita tu Perfil
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Marca las habilidades que dominas y descubre qué tan preparado estás para el mercado que te interesa.
              </p>
            </div>
          </AnimatedSection>

          {/* Skill Checklist — using same card border style */}
          <AnimatedSection delay={100}>
            <div className="rounded-xl border border-border/50 bg-background p-6 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillDomains.map((domain) => (
                  <div key={domain.name}>
                    <h3 className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3 pb-2 border-b border-border/40">
                      {domain.name}
                    </h3>
                    <div className="space-y-1.5">
                      {domain.skills.map((skill) => (
                        <label key={skill} className="flex items-center gap-3 group cursor-pointer rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-muted/30">
                          <div className="flex items-center justify-center h-4 w-4 rounded border border-border/50 shrink-0 transition-colors group-hover:border-foreground/30">
                            <CheckCircle className="h-3 w-3 text-transparent" />
                          </div>
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {skill}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t border-border/40 text-center">
                <button className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-6 py-2.5 text-sm font-medium transition-all hover:opacity-90 active:scale-[0.98]">
                  Calcular Fit
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <p className="text-xs text-muted-foreground mt-3">
                  La funcionalidad completa se habilitará cuando los datos estén conectados
                </p>
              </div>

              {/* Result Preview */}
              <div className="mt-6 relative border-l-2 border-foreground/20 pl-6 py-2">
                <p className="text-muted-foreground italic leading-relaxed">
                  &quot;Tienes el 85% de lo necesario para ser Mid-Level en LatAm, pero estás 40% corto en &apos;Cloud Architecture&apos; si deseas aplicar a EE. UU. Tu próxima habilidad a estudiar debería ser X.&quot;
                </p>
                <p className="text-xs text-muted-foreground/60 mt-2">Ejemplo de diagnóstico</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
