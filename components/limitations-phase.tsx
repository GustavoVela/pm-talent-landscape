"use client"

import { AnimatedSection } from "./section-primitives"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const criticisms = [
  {
    quote: "\"LinkedIn no es la realidad, los mejores puestos se cierran por networking\"",
    response: "Totalmente cierto. Este estudio no es un censo inamovible, es un proxy direccional estadísticamente riguroso. Mide la \"lista de deseos\" (wishlist) de la industria formal. Refleja la barrera de entrada que la abrumadora mayoría del talento debe cruzar.",
  },
  {
    quote: "\"Al agrupar los roles, pierdes los matices y la cultura de cada empresa\"",
    response: "El costo de la estandarización. Consolidar decenas de nomenclaturas inventadas conlleva un sesgo arquitectónico (CTO-level trade-off). Si graficaba el caos original, el dashboard sería ruido blanco. Agrupamos guiados por las responsabilidades reales que extrajo la IA, no por el ego del título corporativo.",
  },
  {
    quote: "\"Las empresas piden IA por puro FOMO, no porque realmente la usen\"",
    response: "Absolutamente. El buzzword existe. Pero la realidad es pragmática: si el algoritmo del sistema de reclutamiento (ATS) está programado para descartar CVs que no tengan experiencia en \"IA\", te quedas fuera. Tienes que pasar la puerta antes de averiguar si era humo.",
  },
  {
    quote: "\"Te olvidaste de medir los Soft Skills\"",
    response: "No las olvidé, las filtré. La IA extrajo \"excelente comunicación\" cientos de veces. Las descarté porque son el \"desde\", la base innegociable humana. Medirlas numéricamente en una vacante no aporta un diferencial; preferí enfocarme en las Hard Skills que definen el techo técnico de nuestra época.",
  },
]

export function LimitationsPhase() {
  return (
    <section id="limitations-phase" className="border-t border-border/40 bg-slate-50/50 dark:bg-slate-900/20">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="mb-12">
              <span className="text-sm font-medium text-muted-foreground">07</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                El Elefante en la Habitación
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Lo que NO cuadra y mis críticas. Como profesional de datos, el escrutinio es parte del oficio.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <Accordion type="single" collapsible className="w-full rounded-xl border border-border/50 bg-background px-6 md:px-8">
              {criticisms.map((item, index) => (
                <AccordionItem value={`criticism-${index}`} key={index} className="border-b-border/40 last:border-b-0">
                  <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline hover:text-foreground/80 py-5">
                    {item.quote}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pr-8 pb-5 text-base">
                    {item.response}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
