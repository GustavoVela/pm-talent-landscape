"use client"

import { ChartWrapper } from "./chart-wrapper"
import { SectionHeader, NarrativeText, StatCard, ChartPlaceholder, AnimatedSection } from "./section-primitives"
import { NoiseFilterChart } from "./charts/noise-filter-chart"
import { JobsByCountryChart } from "./charts/jobs-by-country-chart"

export function PhaseZero() {
  return (
    <section id="fase-0" className="border-t border-border/40">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            number="P0"
            title="¿Con qué información contamos?"
            subtitle="El punto de partida: mapear el universo de vacantes antes de analizarlo."
          />

          <NarrativeText>
            <p>
              Antes de hablar de skills, salarios o brechas, necesitamos responder la pregunta más básica: <span className="font-semibold text-foreground">¿Cuántas vacantes se recolectaron y de dónde vienen?</span>
            </p>
            <p>
              El dataset fue construido a partir de una extracción masiva (fuente LinkedIn), cubriendo ofertas activas en <span className="font-medium text-foreground">Estados Unidos</span>, <span className="font-medium text-foreground">Brasil</span>, <span className="font-medium text-foreground">México</span>, <span className="font-medium text-foreground">Colombia</span>, <span className="font-medium text-foreground">Chile</span> y <span className="font-medium text-foreground">Perú</span>.
            </p>
          </NarrativeText>

          {/* Stat Cards */}
          <AnimatedSection delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
              <StatCard value="3,471" label="Vacantes evaluadas" sublabel="fuente LinkedIn" />
              <StatCard value="2,836" label="Roles válidos" sublabel="post-filtro IA" />
              <StatCard value="4,629" label="Skills únicas" sublabel="extraídas por IA" />
              <StatCard value="6" label="Países" sublabel="Américas" />
            </div>
          </AnimatedSection>

          {/* Two Charts Side by Side */}
          <AnimatedSection delay={200}>
            <div className="grid md:grid-cols-2 gap-6">
              <ChartWrapper
                id="chart-filtro-ruido"
                title="Filtro de Ruido: Posiciones Core vs Otras Áreas"
                description="Descarte de 'falsos positivos' usando IA"
                interpretation="Al usar el LLM para leer el contexto de 3,471 vacantes, descartamos 635 roles (18%) que mencionaban 'Product Manager' pero eran de construcción, ventas o marketing."
              >
                <NoiseFilterChart />
              </ChartWrapper>

              <ChartWrapper
                id="chart-vacantes-por-pais"
                title="Distribución de Vacantes por País"
                description="Proporción del dataset válido por mercado geográfico"
                interpretation="Estados Unidos domina el dataset con 1,339 vacantes válidas. En LatAm, Brasil y México concentran la mayor demanda, seguidos por Colombia y Chile."
              >
                <JobsByCountryChart />
              </ChartWrapper>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
