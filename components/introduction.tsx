"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, Code, ChartBar, PaintBrush, Brain } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const domains = [
  {
    icon: Briefcase,
    number: "01",
    title: "Visión de Negocio",
    subtitle: "El foso real",
    description: "El diseño vela por la usabilidad, la ingeniería por la factibilidad, pero tú eres el único responsable de la viabilidad financiera."
  },
  {
    icon: Code,
    number: "02",
    title: "Conocimiento Técnico",
    description: "Entender arquitectura de sistemas, debatir trade-offs de escalabilidad y usar herramientas de IA para prototipar."
  },
  {
    icon: ChartBar,
    number: "03",
    title: "Fluidez en Datos",
    description: "Ser el dueño de la verdad matemática. Encontrar la causalidad real detrás del comportamiento del usuario."
  },
  {
    icon: PaintBrush,
    number: "04",
    title: "UX / UI",
    description: "Vivir en los píxeles. Diseñar flujos que reduzcan la carga cognitiva."
  },
  {
    icon: Brain,
    number: "05",
    title: "Inteligencia Artificial",
    description: "Escribir Evals rigurosos y delegar el trabajo operativo a agentes autónomos."
  }
]

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(element)
      }
    }, { threshold: 0.1, ...options })

    observer.observe(element)
    return () => observer.disconnect()
  }, [options])

  return { ref, isInView }
}

function AnimatedSection({ 
  children, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode
  className?: string
  delay?: number 
}) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isInView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export function Introduction() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />
        <div className="container relative mx-auto px-4 py-16 md:px-6 md:py-20 lg:py-28">
          <div className="mx-auto max-w-5xl">
            <AnimatedSection>
              <p className="mb-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Un análisis de datos del mercado laboral
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance leading-[1.1]">
                El PM en la Era de la IA
                <span className="block text-muted-foreground">Datos Reales, Menos Hype</span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="mt-12 space-y-6 text-lg text-muted-foreground md:text-xl leading-relaxed">
                <p>
                  Hola, soy <span className="font-semibold text-foreground">Gustavo Vela Zúñiga</span>. Durante más de 18 años me he dedicado a construir y escalar productos digitales operando siempre en la misma intersección: donde la complejidad técnica y los datos se cruzan con la rentabilidad del negocio.
                </p>
                
                <p>
                  He pasado por el despliegue masivo en telecomunicaciones, la optimización logística de última milla como VP de Producto en Frubana, y actualmente lidero la estrategia como Head of Products en Bkaya, construyendo ecosistemas Bank-as-a-Service.
                </p>
                
                <p className="text-foreground font-medium">
                  Hoy, el Product Management atraviesa una mutación acelerada. Para entenderla, decidí dejar de adivinar y empezar a medir.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section 1: El Detonante */}
      <section id="detonante" className="border-t border-border/40">
        <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-5xl">
            <AnimatedSection>
              <div className="mb-12">
                <span className="text-sm font-medium text-muted-foreground">01</span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  El detonante
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  ¿Por qué meterme en este agujero de conejo?
                </p>
              </div>
            </AnimatedSection>
            
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <AnimatedSection delay={100}>
                <p>
                  Hace unas semanas conversaba con una amiga que buscaba trabajo como Product Manager en México. Le di un consejo basado en lo que aplico a diario y lo que predican las empresas de frontera: <em className="text-foreground">&quot;Hoy, entender y saber construir con Inteligencia Artificial ya no es un plus, es tu barrera de entrada&quot;</em>.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={150}>
                <div className="relative border-l-2 border-foreground/20 pl-6 py-2">
                  <p className="text-xl font-medium text-foreground">
                    &quot;Gustavo, he revisado decenas de vacantes y tenido varias entrevistas en la región. Nadie me está exigiendo saber de IA&quot;.
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                <p>
                  Había un choque brutal entre la narrativa global y la realidad operativa del reclutamiento en Latinoamérica. ¿Estaba yo viviendo en una burbuja? Como profesional de datos, decidí extraer la información y mirar los números.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={250}>
                <p>
                  Extraje miles de ofertas de trabajo desde Estados Unidos hasta el sur del continente. El objetivo no era establecer un censo inamovible, sino usar esta data como un <span className="font-semibold text-foreground">&quot;proxy&quot; direccional</span>: un faro para anticipar hacia dónde va a volar el disco en nuestra profesión.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={300}>
                <p className="text-foreground">
                  Miramos a Estados Unidos no para medir un &quot;rezago&quot;, sino como una máquina del tiempo que nos muestra el estándar que nos exigirán en 12 a 24 meses.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Marco Mental */}
      <section id="marco-mental" className="border-t border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-5xl">
            <AnimatedSection>
              <div className="mb-12">
                <span className="text-sm font-medium text-muted-foreground">02</span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Mi marco mental
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  La evolución hacia el &quot;Full-Stack Builder&quot;
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-8">
                <p>
                  Antes de escarbar en los datos, necesitábamos definir el estándar. La premisa central de este estudio es que <span className="font-semibold text-foreground">las fronteras tradicionales entre Ingeniería, Diseño y Producto se están colapsando</span>.
                </p>
                
                <p>
                  A medida que la IA reduce drásticamente el costo de escribir código o diseñar un wireframe, la ejecución pura deja de ser el cuello de botella. El PM que solo operaba como &quot;coordinador&quot; de metodologías ágiles o administrador de tickets en Jira está desapareciendo.
                </p>
                
                <p>
                  Hoy, la habilidad que cobra un valor incalculable es el <span className="font-semibold text-foreground">&quot;Criterio de Producto&quot; (Product Taste)</span>. El mercado empuja hacia lo que llamo el <span className="font-semibold text-foreground">&quot;Full-Stack Builder&quot;</span>, un perfil orquestador que debe dominar 5 dominios:
                </p>
              </div>
            </AnimatedSection>
            
            {/* Domain Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {domains.map((domain, index) => {
                const Icon = domain.icon
                return (
                  <AnimatedSection key={domain.title} delay={200 + index * 100}>
                    <div className="group relative h-full rounded-xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground/60">
                          {domain.number}
                        </span>
                        <Icon className="h-5 w-5 text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground" />
                      </div>
                      <h3 className="mb-1 font-semibold text-foreground">
                        {domain.title}
                      </h3>
                      {domain.subtitle && (
                        <p className="mb-2 text-xs font-medium text-muted-foreground">
                          {domain.subtitle}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {domain.description}
                      </p>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
