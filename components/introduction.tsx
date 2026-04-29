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
import { Lightbulb, Monitor } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, ArrowRight } from "lucide-react"

const domains = [
  {
    icon: Brain,
    title: "Inteligencia Artificial: De la Generación al Valor Real",
    description: (
      <div className="space-y-4 mt-2 text-foreground/80">
        <p>
          De Uso Superficial a Integración Estructural: La IA no es solo un chat que escribe textos (GenAI); la exigencia del mercado trasciende el uso básico de interfaces conversacionales, requiere comprender e integrar modelos algorítmicos.
        </p>
        <ul className="space-y-3 list-disc pl-5">
          <li><strong>Modelos Predictivos:</strong> El PM debe entender cómo usar el ML para predecir comportamientos (ej. riesgo de crédito o abandono). Aquí es donde la IA impacta directamente en el balance financiero del negocio.</li>
          <li><strong>Diseño de Evals:</strong> Como los modelos son probabilísticos, tienes que crear tus propios &quot;exámenes&quot; (evaluaciones) para medir si las respuestas son precisas y seguras.</li>
          <li><strong>Gestión de Agentes:</strong> Dejas de gestionar solo personas para orquestar agentes de IA. Esto exige dar instrucciones (prompts) perfectas y contexto de negocio que la máquina no tiene.</li>
          <li><strong>Automatización y Apalancamiento:</strong> Delegar sistemáticamente las tareas administrativas y repetitivas a agentes de IA. En niveles avanzados, el PM transita de gestionar proyectos a &quot;gestionar flotas de agentes&quot;, lo que requiere precisión en la delegación y proveer contexto de negocio innegociable a los sistemas.</li>
          <li><strong>Maximalismo de Modelos:</strong> Construir productos anticipando la evolución de la tecnología, evitando invertir recursos en arquitecturas pesadas para solucionar limitaciones temporales que las futuras actualizaciones de los modelos resolverán inherentemente.</li>
        </ul>
      </div>
    )
  },
  {
    icon: Code,
    title: "Conocimiento Técnico: Entender las Tuberías",
    description: (
      <div className="space-y-4 mt-2 text-foreground/80">
        <p>No necesitas programar el producto final, pero sí entender cómo se conectan las piezas, tener fluidez estructural y conocer las restricciones técnicas para maximizar los recursos del equipo de ingeniería.</p>
        <ul className="space-y-3 list-disc pl-5">
          <li><strong>Pensamiento Sistémico y Trade-offs:</strong> Comprender el diseño de bases de datos, APIs y arquitecturas cloud para debatir objetivamente las compensaciones técnicas (ventajas y desventajas) de escalabilidad. Un PM que no entiende las limitaciones técnicas actúa como un intermediario ineficiente.</li>
          <li><strong>Prototipado Radical:</strong> Utilizar herramientas de generación de código impulsadas por IA para traducir documentos de requisitos en prototipos funcionales rápidos, validando lógicas y reduciendo la ambigüedad antes de la fase formal de ingeniería.</li>
          <li><strong>Cálculo de Trade-offs:</strong> Tienes que saber si lo que pides toma dos horas o dos meses. Esa intuición técnica te permite priorizar con realismo.</li>
        </ul>
      </div>
    )
  },
  {
    icon: ChartBar,
    title: "Análisis de Datos: Autonomía Radical",
    description: (
      <div className="space-y-4 mt-2 text-foreground/80">
        <p>
          <span className="font-semibold text-foreground">Causalidad sobre Correlación: </span>
          El PM es la máxima autoridad sobre el comportamiento del producto. La exigencia se centra en el rigor analítico.
        </p>
        <ul className="space-y-3 list-disc pl-5">
          <li><strong>SQL:</strong> No esperes dos semanas a que un analista te libre un reporte. Aprende a tirar tus propias consultas para tomar decisiones el mismo día.</li>
          <li><strong>Causalidad Real:</strong> No te conformes con ver que un número subió. Tienes que entender por qué ocurrió y si tu producto fue la causa real o solo una coincidencia.</li>
          <li><strong>Escepticismo de Datos:</strong> Si un gráfico se ve demasiado bien, probablemente está mal. Cuestiona la fuente y busca el error antes de celebrar.</li>
        </ul>
      </div>
    )
  },
  {
    icon: Briefcase,
    title: "Visión de Negocio: Rentabilidad y Viabilidad",
    description: (
      <div className="space-y-4 mt-2 text-foreground/80">
        <p>Ingeniería hace que funcione; tú haces que el negocio sobreviva y gane dinero.</p>
        <ul className="space-y-3 list-disc pl-5">
          <li><strong>Pricing es Producto:</strong> El precio no lo pone finanzas al final. Tú diseñas el producto sabiendo cuánto está dispuesto a pagar el cliente.</li>
          <li><strong>Fosos Estratégicos:</strong> Pregúntate: &quot;¿Por qué no nos pueden copiar esto mañana?&quot;. Construye ventajas difíciles de replicar, como datos exclusivos o barreras legales.</li>
          <li><strong>Contexto de Industria:</strong> Debes dominar la regulación y el lenguaje del sector para ver oportunidades donde otros ven problemas técnicos.</li>
          <li><strong>Alineación Comercial (Go-To-Market):</strong> Conectar el roadmap técnico con las proyecciones de ingresos y la estrategia de comercialización (GTM), asegurando que el producto resuelva el problema y se posicione efectivamente frente al cliente.</li>
        </ul>
      </div>
    )
  },
  {
    icon: PaintBrush,
    title: "Diseño y UX/UI: El Criterio es el Filtro",
    description: (
      <div className="space-y-4 mt-2 text-foreground/80">
        <p>Con la reducción del costo de ejecución técnica, la decisión crítica recae en la jerarquía y la calidad de la experiencia.</p>
        <ul className="space-y-3 list-disc pl-5">
          <li><strong>Definir el Perímetro:</strong> No le digas al diseñador qué color usar. Dile qué problema tiene que resolver y cuáles son los límites.</li>
          <li><strong>Criterio de Producto e Intuición Calibrada:</strong> Desarrollar un criterio agudo basado en el uso extensivo de software para simplificar interfaces, establecer configuraciones predeterminadas óptimas y reducir la carga cognitiva del usuario final.</li>
          <li><strong>Wireframes de Claridad:</strong> Usa esquemas visuales para que todo el equipo vea lo mismo y evitar interpretaciones erróneas de documentos de texto.</li>
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
              <div className="flex justify-center mb-8">
                <Badge variant="outline" className="gap-2 px-4 py-2 text-xs font-medium text-muted-foreground border-border/60 bg-background/80 backdrop-blur-sm rounded-full shadow-sm">
                  <Monitor className="h-3.5 w-3.5" />
                  Las gráficas interactivas se disfrutan mejor desde un ordenador
                </Badge>
              </div>
            </AnimatedSection>

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

            <AnimatedSection delay={250}>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-[#0077b5] hover:bg-[#006396] text-white"
                  onClick={() => window.open('https://www.linkedin.com/in/gustavo-vela/', '_blank')}
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  Conectar en LinkedIn
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => {
                    document.getElementById('phase-demographics')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Vamos a los datos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
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
                  Para sustituir las anécdotas por evidencia, extraje y analicé 3,471 ofertas de trabajo reales de las últimas semanas (todas las que pude conseguir) desde Estados Unidos hasta el sur del continente. Este análisis sirve como un faro basado en datos para anticipar hacia dónde se mueve el estándar de nuestra profesión. Miramos el mercado de Estados Unidos no para medir un &quot;rezago&quot;, sino como una máquina del tiempo que nos permite identificar las competencias que se convertirán en el estándar de nuestros mercados en los próximos 12 a 24 meses. <span className="font-semibold text-foreground">Si sigues leyendo, podrás descubrir las habilidades que más están pidiendo actualmente y cómo se están transformando las expectativas del mercado.</span>
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
                  El origen de este marco de referencia no nació en la ejecución operativa. En septiembre de 2019, durante un proyecto en Barcelona, asistí por casualidad a un webinar impartido por el CEO de la compañía: &apos;Deployment of Strategic AI in the Enterprise: Crossing the Chasm&apos;. El mensaje central fue definitivo: la adopción de Inteligencia Artificial no es una carrera tecnológica de velocidad, sino una maratón de transformación estructural y cultural.
                </p>

                <p>
                  Avanzando al presente, el mayor riesgo que observo en el ecosistema de Latinoamérica —desde Colombia hasta México— es la parálisis. Las empresas, especialmente las medianas, se estancan buscando &quot;la guía definitiva&quot; o &quot;la verdad absoluta&quot; para implementar IA, arriesgándose a perder competitividad de forma acelerada.
                </p>

                <p>
                  Hace unos meses, tuve la oportunidad de exponer esta problemática en el foro de Product Management de <a href="https://www.product-latam.com/summit" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline hover:text-primary transition-colors">Product-LatAm</a> (impulsado por Capital One). Mi argumento fue: el Product Manager, por su naturaleza polivalente, debe ser el catalizador que inicie esta transformación desde adentro. Para lograrlo, las fronteras tradicionales entre Ingeniería, Diseño y Producto deben colapsar. La ejecución pura ha dejado de ser el cuello de botella; la ventaja competitiva ahora reside en el <span className="font-semibold text-foreground">Criterio de Producto (Product Taste)</span> y en la evolución hacia el <span className="font-semibold text-foreground">&quot;Full-Stack Builder&quot;</span>, un perfil que domina cinco ejes estratégicos:
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

            <AnimatedSection delay={250}>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mt-12">
                <p>
                  Como adelanto de los resultados: la demanda real por este perfil integral 🦄 —que domine los cinco ejes transversales además del conocimiento fundacional de producto— <span className="font-medium italic text-foreground">choca con el hype actual y con mi marco mental</span>, representando solo el 6.45% de las ofertas. Su concentración es ligeramente mayor en Estados Unidos (8.8%), marcando la pauta hacia la que probablemente evolucionará la industria.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="mt-12 w-full">
                <Alert className="w-full border-primary/20 bg-background shadow-sm">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-muted-foreground text-[15px] leading-relaxed">
                    <p><span className="text-foreground font-semibold mr-1">¿Quieres explorar esto a detalle?</span> Si te interesa profundizar en cómo el PM puede liderar esta adopción táctica, puedes descargar la presentación de Product-LatAm: <a href="https://www.linkedin.com/feed/update/urn:li:activity:7401464764436254720/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">aquí</a>.</p>
                  </AlertDescription>
                </Alert>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}
