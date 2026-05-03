"use client"

/**
 * AiPhase — Sección 05: El Product Management en la Era de la IA
 *
 * Presenta el análisis completo de la penetración de Inteligencia Artificial
 * en los roles de producto de la muestra. Responde 5 preguntas de investigación:
 *
 *   1. ¿Qué porcentaje de vacantes incluye requerimientos de IA? (por región)
 *   2. ¿Qué habilidades específicas de IA son las más demandadas?
 *   3. ¿Cómo varía la penetración por seniority, ciudad, industria y tipo de rol?
 *   4. ¿En qué se diferencia el perfil de un rol con IA vs. sin IA?
 *   5. ¿Existe un diferencial salarial medible al dominar competencias de IA?
 */

// ─── Primitivos de layout ─────────────────────────────────────────────────────────
import { AnimatedSection } from "./section-primitives"

// ─── Gráficas de penetración ────────────────────────────────────────────────────────
import { AiPenetrationChart } from "./charts/ai-penetration-chart"
import { AiSeniorityChart } from "./charts/ai-seniority-chart"
import { AiCityChart } from "./charts/ai-city-chart"
import { AiIndustryChart } from "./charts/ai-industry-chart"
import { AiRoleChart } from "./charts/ai-role-chart"
import { AiSkillsRankingChart } from "./charts/ai-skills-ranking-chart"

// ─── Gráficas comparativas: IA vs. no-IA ─────────────────────────────────────────
import { AiVsNonAiRadar } from "./charts/ai-vs-nonai-radar"
import { AiSalaryPremiumChart } from "./charts/ai-salary-premium-chart"

export function AiPhase() {
  return (
    <section id="ai-phase" className="border-t border-border/40 bg-muted/10">
      <div className="container mx-auto px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="mb-12">
              <span className="text-sm font-medium text-muted-foreground">05</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                La Era de la Inteligencia Artificial
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-16">
              <p>
                El rol del Product Manager está experimentando una transformación impulsada por la adopción de Inteligencia Artificial. La industria no deja de hablar de IA, pero, ¿qué tanto de esto es ruido mediático y qué tanto es una realidad exigida en las contrataciones de hoy?
              </p>
              <p>
                Para responder esto, aislamos exclusivamente las vacantes que exigen conocimientos en IA para analizar cómo se comporta esta demanda en el mundo real. Es crucial entender que aquí no medimos la 'adopción de la IA en la industria', sino un factor mucho más pragmático: qué tan frecuente es que las empresas te soliciten saber de IA para contratarte.
              </p>
              <p>
                Nuestros datos demuestran que esta exigencia no se distribuye de manera uniforme, y puede variar acorde con un conjunto de variables. Las gráficas de esta sección están diseñadas para ayudarte a responder preguntas como:
              </p>
              <ul className="list-disc list-outside pl-6 space-y-2 mt-4 text-base">
                <li>¿Qué porcentaje real de las vacantes actuales exige competencias de IA en los diferentes mercados?</li>
                <li>¿Las empresas exigen IA principalmente a roles directivos, o también se pide a todos los niveles?</li>
                <li>¿Qué sectores o industrias están liderando la búsqueda de talento con IA?</li>
                <li>¿Dominar estas competencias te ofrece un diferencial ('premium') en tu compensación salarial?</li>
                <li>Y lo más importante: ¿en qué se diferencia el perfil de una vacante para un PM tradicional frente a uno que tiene un requerimiento en IA?</li>
              </ul>
              <p className="mt-4">
                A continuación, desglosamos los datos para que saques tus propias conclusiones:
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="rounded-xl border border-border/50 bg-background p-6 shadow-sm mb-8">
              <div className="mb-0">
                <h3 className="text-xl font-semibold text-foreground">
                  ¿Qué porcentaje de vacantes exigen competencias de IA en el mercado actual?
                </h3>
              </div>
              <AiPenetrationChart />
              <AiSeniorityChart />
              <AiCityChart />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2 pt-8 border-t border-border/50">
                <AiIndustryChart />
                <AiRoleChart />
              </div>

              {/* PM con IA vs sin IA — radar comparativo */}
              <div className="mt-8 pt-8 border-t border-border/50">
                <AiVsNonAiRadar />
              </div>

              {/* Salary Premium Chart */}
              <div className="mt-8 pt-8 border-t border-border/50">
                <AiSalaryPremiumChart />
              </div>

              {/* AI Skills Ranking — last chart in section */}
              <div className="mt-8 pt-8 border-t border-border/50">
                <AiSkillsRankingChart />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
