"use client"

import { AnimatedSection } from "./section-primitives"

export function ClosingPhase() {
  return (
    <section id="closing-phase" className="border-t border-border/40">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">

          <AnimatedSection>
            <div className="mb-12">
              <span className="text-sm font-medium text-muted-foreground">06</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Algunas ideas para cerrar
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-16">

              <p>
                Uno de los hallazgos que más me hizo pensar fue el del perfil integral. Llevo años convencido de que un PM de alto impacto debería dominar los seis dominios —Core PM, Técnico, Datos, Negocio, UX/UI e IA— y en mi experiencia liderando equipos de producto y otro tipo de equipos siempre ha sido difícil encontrar a alguien que los cubra todos. Lo que no esperaba era que el mercado tampoco los esté pidiendo todos al mismo tiempo: solo el <span className="font-semibold text-foreground">6.45% de las vacantes</span> exigen esa cobertura completa. Eso me obligó a recalibrar. No porque el perfil integral sea equivocado, sino porque el mercado masivo todavía no lo refleja. Sigue siendo un ideal hacia el que tiene sentido construir, pero con la claridad de que es la excepción, no la norma de contratación.
              </p>

              <p>
                La segunda reflexión es sobre el hype. Cuando escuchas podcasts de gente de Anthropic u OpenAI, o a los líderes de frontera de la industria, es fácil entrar en un estado de ansiedad. Parece que la IA avanza tan rápido que en seis meses cualquier profesional que no esté construyendo con modelos quedará fuera del mercado laboral. Los datos dicen otra cosa. <span className="font-semibold text-foreground">En Latinoamérica, el mercado laboral no está corriendo a buscar roles de Product Management expertos en IA.</span> Parte de la razón es estructural: muchos de los ejecutivos que lideran las compañías —el C-Level y los líderes que definen las prioridades de contratación— todavía no comprenden con precisión cómo estas tecnologías impactan la rentabilidad, la productividad o los indicadores de su negocio. El hype que consumimos no se corresponde con lo que el mercado regional está exigiendo hoy.
              </p>

              <p>
                Dicho esto, sería un error leer eso como una señal para postergar. La brecha de más de 10 puntos porcentuales en demanda de competencias de IA entre EE. UU. y Latinoamérica no es permanente. Es una fotografía de un proceso de adopción que tiene dirección clara. Lo que hoy es diferencial en LATAM, será estándar. El cuándo es incierto; que ocurrirá, no lo es.
              </p>

              {/* Blockquote */}
              <div className="relative border-l-2 border-foreground/20 pl-6 py-2 my-8">
                <p className="text-xl font-medium text-foreground">
                  No es momento de entrar en caos. Es momento de aprender con foco.
                </p>
              </div>

              <p>
                Mi recomendación práctica: empieza por hacerte una auditoría honesta usando la <span className="font-semibold text-foreground">Taxonomía de Dominios y Competencias</span> de la Sección 04. Ese diagrama desglosa los seis dominios en sus competencias constitutivas y llega hasta el nivel de habilidades específicas. La pregunta que tienes que hacerte frente a cada nodo no es "¿lo conozco?" sino "¿puedo operar con eso en un contexto de negocio real?". La brecha entre ambas respuestas es tu plan de desarrollo. Después, aprovecha el contexto de tu empresa actual para construir conocimiento en las áreas que identifiques como brechas: los proyectos en curso son el mejor laboratorio.
              </p>

              <p>
                Una aclaración importante: integrar competencias de IA no cancela lo que ya sabes. Lo amplifica. Los datos muestran que las vacantes con requerimientos de IA también exigen Datos y habilidades Técnicas con mayor frecuencia que las vacantes sin IA. No son dominios en competencia; son complementarios. Empezar a aprender IA sin entender APIs, sin leer datos, sin criterio de negocio produce un perfil superficial. Construir en la dirección contraria —consolidar lo que ya tienes y agregar IA como capa de apalancamiento— produce un perfil sólido.
              </p>

              <p>
                Y los datos también ofrecen un incentivo concreto: las vacantes con requerimientos de IA muestran un <span className="font-semibold text-foreground">diferencial salarial medible</span>. Anticiparse a que una competencia se vuelva estándar tiene valor económico directo. No es solo una cuestión de relevancia a largo plazo.
              </p>

              <p>
                He dejado este dashboard público —con todos los filtros activos— para que puedas usarlo como herramienta de trabajo real. Explora tu industria, tu país, tu nivel de seniority. El código está abierto para quien quiera auditar la metodología, extenderla o iterar sobre ella: rastrear cómo se mueven estos requerimientos en el tiempo, cómo avanza el mercado en cada región, qué dominios ganan o pierden peso. Cuanta más gente construya sobre esto, mejor será la data disponible para que todos tomemos decisiones más informadas sobre el desarrollo de nuestras carreras.
              </p>

            </div>
          </AnimatedSection>

          {/* Final Question */}
          <AnimatedSection delay={250}>
            <div className="rounded-xl border border-border/50 bg-muted/20 p-8 text-center mb-16">
              <p className="text-lg text-foreground leading-relaxed max-w-2xl mx-auto">
                La próxima vez que actualices tu CV o decidas qué aprender, no adivines. Hazte la pregunta incómoda:
              </p>
              <p className="text-xl font-bold text-foreground mt-4">
                ¿Mis competencias y habilidades específicas actuales me van a mantener relevante en tres años?
              </p>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
