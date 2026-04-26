"use client"

import { AnimatedSection } from "./section-primitives"
import Image from "next/image"
import { GithubLogo, LinkedinLogo, ArrowSquareOut } from "@phosphor-icons/react"

export function Conclusion() {
  const linkedinUrl = "https://www.linkedin.com/in/gustavo-vela/"
  const githubUrl = "https://github.com/GustavoVela/pm-talent-landscape"
  const profileImage = "https://media.licdn.com/dms/image/v2/D4E03AQGX6nV2oMzC8g/profile-displayphoto-crop_800_800/B4EZ0M81ysHUAI-/0/1774038774403?e=1778716800&v=beta&t=Ko07etYOzdTZ_CwgiR6QSZts9CeRL5THeDzTap8MDro"

  return (
    <section id="conclusion" className="border-t border-border/40">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          {/* Section Header — matching style */}
          <AnimatedSection>
            <div className="mb-12">
              <span className="text-sm font-medium text-muted-foreground">Conclusión</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Construye tu foso competitivo
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-16">
              <p>
                Mi amiga tenía razón en su contexto geográfico inmediato. Pero la visión panorámica es irrefutable: <span className="font-semibold text-foreground">El futuro del Product Management ya llegó, simplemente está mal distribuido.</span>
              </p>
              <p>
                Lo que hoy es un requisito técnico base en EE. UU., será el estándar mínimo operativo en CDMX, Bogotá o São Paulo en los próximos <span className="font-semibold text-foreground">18 a 24 meses</span>. El PM que solo se dedicaba a gestionar metodologías ágiles será reemplazado velozmente por la automatización.
              </p>
              <p>
                El mercado ya está pagando por <span className="font-semibold text-foreground">orquestadores</span>: personas con alta agencia, curiosidad implacable, y el sentido común comercial y técnico para saber qué problemas vale la pena resolver. La ejecución se comoditizó; tu <span className="font-semibold text-foreground">&quot;Product Taste&quot;</span> y tu visión de negocio son tu foso defensivo.
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

          {/* External Links — using same card style */}
          <AnimatedSection delay={200}>
            <div className="grid sm:grid-cols-2 gap-4 mb-16">
              <a
                href="#"
                className="group relative flex items-center gap-4 rounded-xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1"
              >
                <ArrowSquareOut className="h-5 w-5 text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    Talent Taxonomy Dashboard
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Versión HTML interactiva · Datos abiertos
                  </p>
                </div>
              </a>

              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 rounded-xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1"
              >
                <GithubLogo className="h-5 w-5 text-muted-foreground/60 transition-colors duration-300 group-hover:text-foreground shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    Repositorio en GitHub
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Código fuente · Metodología · Auditable
                  </p>
                </div>
              </a>
            </div>
          </AnimatedSection>

          {/* Final Question */}
          <AnimatedSection delay={250}>
            <div className="rounded-xl border border-border/50 bg-muted/20 p-8 text-center mb-16">
              <p className="text-lg text-foreground leading-relaxed max-w-2xl mx-auto">
                La próxima vez que actualices tu CV o decidas qué aprender el fin de semana, no adivines. Entra al portal y hazte la pregunta incómoda:
              </p>
              <p className="text-xl font-bold text-foreground mt-4">
                ¿Mis habilidades actuales me van a mantener relevante en tres años?
              </p>
              <p className="text-muted-foreground mt-6">
                ¿Sientes que en tu empresa ya te están exigiendo este rol híbrido &quot;Full-Stack&quot; o seguimos estancados en la era del gestor tradicional? Estaré leyendo sus hallazgos en los comentarios. 👇
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
