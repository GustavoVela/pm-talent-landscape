"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, Code, ChartBar, PaintBrush, Brain } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const domains = [
  {
    icon: Brain,
    title: "Inteligencia Artificial",
    description: (
      <div className="space-y-4 mt-2 text-foreground/80">
        <p className="font-semibold text-foreground">De Uso Superficial a Integración Estructural:</p>
        <p>La exigencia del mercado trasciende el uso básico de interfaces conversacionales; requiere comprender e integrar modelos algorítmicos.</p>
        <ul className="space-y-3 list-disc pl-5">
          <li><strong>Las Evaluaciones (Evals) reemplazan a los PRDs:</strong> Los Modelos de Lenguaje (LLMs) operan por probabilidad, no de forma determinista. Escribir requisitos estáticos es insuficiente. La nueva competencia técnica del PM es diseñar &quot;Evals&quot;: crear conjuntos de pruebas rigurosas y automatizadas para cuantificar el éxito, medir el progreso y acotar el comportamiento del modelo.</li>
          <li><strong>Automatización y Apalancamiento:</strong> Delegar sistemáticamente las tareas administrativas y repetitivas a agentes de IA. En niveles avanzados, el PM transita de gestionar proyectos a &quot;gestionar flotas de agentes&quot;, lo que requiere precisión en la delegación y proveer contexto de negocio innegociable a los sistemas.</li>
          <li><strong>Maximalismo de Modelos:</strong> Construir productos anticipando la evolución de la tecnología, evitando invertir recursos en arquitecturas pesadas para solucionar limitaciones temporales que las futuras actualizaciones de los modelos resolverán inherentemente.</li>
        </ul>
      </div>
    )
  },
  {
    icon: Code,
    title: "Conocimiento Técnico",
    description: (
      <div className="space-y-4 mt-2 text-foreground/80">
        <p className="font-semibold text-foreground">Arquitectura y Prototipado:</p>
        <p>No se requiere escribir código de producción, pero sí fluidez estructural para maximizar los recursos del equipo de ingeniería.</p>
        <ul className="space-y-3 list-disc pl-5">
          <li><strong>Pensamiento Sistémico y Trade-offs:</strong> Comprender el diseño de bases de datos, APIs y arquitecturas cloud para debatir objetivamente las compensaciones técnicas (ventajas y desventajas) de escalabilidad. Un PM que no entiende las limitaciones técnicas actúa como un intermediario ineficiente.</li>
          <li><strong>Prototipado Radical (Vibe Coding):</strong> Utilizar herramientas de generación de código impulsadas por IA para traducir documentos de requisitos en prototipos funcionales rápidos, validando lógicas y reduciendo la ambigüedad antes de la fase formal de ingeniería.</li>
        </ul>
      </div>
    )
  },
  {
    icon: ChartBar,
    title: "Análisis de Datos",
    description: (
      <div className="space-y-4 mt-2 text-foreground/80">
        <p className="font-semibold text-foreground">Causalidad sobre Correlación:</p>
        <p>El PM es la máxima autoridad sobre el comportamiento del producto. La exigencia se centra en el rigor analítico.</p>
        <ul className="space-y-3 list-disc pl-5">
          <li><strong>Métricas Causales y de Proxy:</strong> Superar el monitoreo de promedios globales. Se exige identificar indicadores predictivos a corto plazo y establecer relaciones causales para responder operativamente a la pregunta: &quot;¿Y ahora qué hacemos al respecto?&quot;.</li>
          <li><strong>Análisis de Casos Límite:</strong> Complementar la información cuantitativa con retroalimentación cualitativa, buscando anomalías y estados de fallo (ej. tasas de error ocultas) aplicando un escepticismo estadístico estructurado (Ley de Twyman).</li>
        </ul>
      </div>
    )
  },
  {
    icon: Briefcase,
    title: "Visión de Negocio",
    description: (
      <div className="space-y-4 mt-2 text-foreground/80">
        <p className="font-semibold text-foreground">Viabilidad y Foso Estratégico:</p>
        <p>Ingeniería garantiza la factibilidad; diseño la usabilidad; el PM es responsable de la viabilidad financiera y legal del modelo comercial.</p>
        <ul className="space-y-3 list-disc pl-5">
          <li><strong>Monetización y Estrategia Competitiva:</strong> Comprender la &quot;disposición a pagar&quot; del mercado desde el día uno y dominar los modelos de precios (pricing). Conocer las ventajas competitivas de la industria (economías de red, regulaciones, barreras de entrada).</li>
          <li><strong>Alineación Comercial (Go-To-Market):</strong> Conectar el roadmap técnico con las proyecciones de ingresos y la estrategia de comercialización (GTM), asegurando que el producto resuelva el problema y se posicione efectivamente frente al cliente.</li>
        </ul>
      </div>
    )
  },
  {
    icon: PaintBrush,
    title: "Diseño y UX/UI",
    description: (
      <div className="space-y-4 mt-2 text-foreground/80">
        <p className="font-semibold text-foreground">Restricciones y Product Taste:</p>
        <p>Con la reducción del costo de ejecución técnica, la decisión crítica recae en la jerarquía y la calidad de la experiencia.</p>
        <ul className="space-y-3 list-disc pl-5">
          <li><strong>Dibujar el perímetro del problema:</strong> El PM no debe imponer soluciones predefinidas; su rol es definir restricciones funcionales claras mediante esquemas visuales (wireframes), permitiendo al equipo de diseño ejecutar soluciones innovadoras dentro de esos límites.</li>
          <li><strong>Criterio de Producto e Intuición Calibrada:</strong> Desarrollar un criterio agudo basado en el uso extensivo de software para simplificar interfaces, establecer configuraciones predeterminadas óptimas y reducir la carga cognitiva del usuario final.</li>
        </ul>
      </div>
    )
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
      <section id="intro" className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-background to-background dark:from-slate-900"></div>
        <div className="container relative z-10 mx-auto px-4 text-center md:px-6 md:py-20 lg:py-28">
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
                  Hola, soy <span className="font-semibold text-foreground">Gustavo Vela Zúñiga</span>. Llevo 18 años construyendo y escalando productos digitales, operando siempre en la misma intersección: donde la complejidad técnica y el análisis de datos se cruzan con la rentabilidad del negocio. Encantado de saludarles y, sobre todo, de abrir el debate sobre los hallazgos de este análisis.
                </p>
                
                <p>
                  Hoy, el Product Management atraviesa una mutación acelerada. Lo que encontrarán en las siguientes secciones no pretende ser una guía definitiva ni una verdad absoluta sobre la industria; es, más bien, un <span className="font-semibold text-foreground">proxy pragmático</span> —sustentado en la extracción de unos cuantos de miles de ofertas de trabajo reales— diseñado para ayudarles a entender mejor los movimientos actuales del mercado laboral.
                </p>
                
                <p>
                  <span className="font-semibold text-foreground">El objetivo es traducir datos en respuestas útiles</span>: ¿Qué competencias están exigiendo activamente las empresas hoy en día? ¿Qué habilidades están perdiendo peso? Y, el punto más crítico en la actualidad: si antes nos interesaba la Inteligencia Artificial como un complemento, ¿es este el momento en el que debemos correr a capacitarnos porque el mercado ya lo exige como una barrera de entrada?
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
                  Este análisis nació de un choque directo entre la teoría y la práctica. Hace unas semanas, conversaba con una colega que buscaba activamente integrarse como Product Manager en el ecosistema tecnológico de México. Mi recomendación fue categórica: hoy, entender y saber construir con Inteligencia Artificial ya no es un valor agregado, es la barrera de entrada para competir al más alto nivel. Sin embargo, su respuesta fue el primer golpe de realidad:
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
                  Existía una discrepancia brutal entre la narrativa de las empresas de frontera y la realidad operativa de los departamentos de reclutamiento en Latinoamérica. Ante la duda de si mi visión como profesional de datos estaba sesgada por una &quot;burbuja&quot; de industria, decidí dejar de lado las impresiones personales y procesar los números.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={250}>
                <p>
                  Para sustituir las anécdotas por evidencia, extraje y analicé miles de ofertas de trabajo reales desde Estados Unidos hasta el sur del continente. Este análisis sirve como un faro basado en datos para anticipar hacia dónde se mueve el estándar de nuestra profesión. Miramos el mercado de Estados Unidos no para medir un &quot;rezago&quot;, sino como una máquina del tiempo que nos permite identificar las competencias que se convertirán en el estándar de nuestros mercados en los próximos 12 a 24 meses. <span className="font-semibold text-foreground">Si sigues leyendo, podrás descubrir las habilidades que más están pidiendo actualmente y cómo se están transformando las expectativas del mercado.</span>
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
            
            {/* Accordion Domains */}
            <AnimatedSection delay={200}>
              <Accordion type="single" collapsible className="w-full">
                {domains.map((domain, index) => {
                  const Icon = domain.icon
                  return (
                    <AccordionItem value={`domain-${index}`} key={index} className="border-border/50">
                      <AccordionTrigger className="hover:no-underline hover:text-primary transition-colors">
                        <div className="flex items-center gap-4 text-left">
                          <div className="p-2 bg-muted/50 rounded-md">
                            <Icon className="h-5 w-5 text-foreground/80" />
                          </div>
                          <div>
                            <span className="font-semibold text-lg">{domain.title}</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground leading-relaxed pl-[3.25rem]">
                        {domain.description}
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
