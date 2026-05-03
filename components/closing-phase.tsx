"use client"

import { AnimatedSection } from "./section-primitives"
import Image from "next/image"
import { GithubLogo, LinkedinLogo, ArrowSquareOut } from "@phosphor-icons/react"

export function ClosingPhase() {
  const linkedinUrl = "https://www.linkedin.com/in/gustavo-vela/"
  const githubUrl = "https://github.com/GustavoVela/pm-talent-landscape"
  const profileImage = "https://media.licdn.com/dms/image/v2/D4E03AQGX6nV2oMzC8g/profile-displayphoto-crop_800_800/B4EZ0M81ysHUAI-/0/1774038774403?e=1778716800&v=beta&t=Ko07etYOzdTZ_CwgiR6QSZts9CeRL5THeDzTap8MDro"

  return (
    <section id="closing-phase" className="border-t border-border/40">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          {/* Section Header — matching style */}
          <AnimatedSection>
            <div className="mb-12">
              <span className="text-sm font-medium text-muted-foreground">06</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Construye tu foso competitivo
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-16">
              <p>
                El rol del Product Manager está evolucionando hacia un perfil de orquestación donde la base ya no es solo metodológica. La paridad técnica entre regiones esconde matices profundos: mientras que en LATAM se espera que el PM acceda directamente a los datos (con una notable demanda de SQL), el mercado de EE. UU. ya está integrando la infraestructura de manera más nativa y priorizando otras exigencias técnicas.
              </p>
              <p>
                Sin embargo, la brecha más crítica que evidencian los datos está en la Inteligencia Artificial. Los más de 10 puntos de diferencia en la demanda de competencias en IA entre Estados Unidos y Latinoamérica son la señal con mayor relevancia práctica para quienes diseñan planes de desarrollo o equipos de producto. Un mercado históricamente anticipa los estándares del otro; lo que hoy puede parecer un diferencial competitivo en LATAM, será un requisito innegociable en los próximos <span className="font-semibold text-foreground">18 a 24 meses</span>.
              </p>
              <p>
                El futuro del Product Management requiere <span className="font-semibold text-foreground">orquestadores</span>: personas con alta agencia, una curiosidad técnica implacable, y el sentido comercial para saber qué problemas valen la pena resolver. La ejecución táctica de ceremonias ágiles se está comoditizando velozmente gracias a la automatización. Tu visión de negocio, tu capacidad para apalancar datos y tu "Product Taste" son tu verdadero foso defensivo.
              </p>

              {/* Highlighted quote — matching blockquote style */}
              <div className="relative border-l-2 border-foreground/20 pl-6 py-2 my-8">
                <p className="text-xl font-medium text-foreground">
                  No te quedes con mi palabra. Ve a ensuciarte las manos con los datos.
                </p>
              </div>

              <p>
                He habilitado este dashboard de manera pública en formato HTML para que la comunidad lo rompa, juegue con los filtros, revise su propia industria y analice su país. También he abierto el repositorio con el código para quien quiera auditar la metodología.
              </p>
            </div>
          </AnimatedSection>



          {/* Final Question */}
          <AnimatedSection delay={250}>
            <div className="rounded-xl border border-border/50 bg-muted/20 p-8 text-center mb-16">
              <p className="text-lg text-foreground leading-relaxed max-w-2xl mx-auto">
                La próxima vez que actualices tu CV o decidas qué aprender el fin de semana, no adivines. Entra al portal y hazte la pregunta incómoda:
              </p>
              <p className="text-xl font-bold text-foreground mt-4">
                ¿Mis competencias y habilidades específicas actuales me van a mantener relevante en tres años?
              </p>
            </div>
          </AnimatedSection>

          {/* Author Card */}
          <AnimatedSection delay={300}>
            <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl border border-border/50 bg-background p-6 md:p-8">
              <Image
                src={profileImage}
                alt="Gustavo Vela Zúñiga"
                width={72}
                height={72}
                className="rounded-full shrink-0"
                unoptimized
              />
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-semibold text-foreground">Gustavo Vela Zúñiga</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Head of Products · +18 años construyendo y escalando productos digitales en telecomunicaciones, logística y fintech.
                </p>
                <div className="flex items-center gap-3 mt-4 justify-center sm:justify-start">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border/50 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-border hover:text-foreground"
                  >
                    <LinkedinLogo className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border/50 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-border hover:text-foreground"
                  >
                    <GithubLogo className="h-4 w-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
