"use client"

import React from "react"
import { ChartWrapper } from "./chart-wrapper"
import { SectionHeader, NarrativeText, StatCard, AnimatedSection } from "./section-primitives"
import { NoiseFilterChart } from "./charts/noise-filter-chart"
import { DemographyCountryChart } from "./charts/demography-country-chart"
import { DemographyCityChart } from "./charts/demography-city-chart"
import { RolesTaxonomyChart } from "./charts/roles-taxonomy-chart"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { cn } from "@/lib/utils"
import { demographicsCityData, FLAGS } from "@/lib/data"

function PhaseZeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  
  const [countryViewMode, setCountryViewMode] = React.useState<'absolute' | 'percentage'>('absolute')
  const [cityViewMode, setCityViewMode] = React.useState<'absolute' | 'percentage'>('absolute')
  const [selectedCountry, setSelectedCountry] = React.useState<string>('all')
  const [taxonomyViewMode, setTaxonomyViewMode] = React.useState<'absolute' | 'percentage'>('absolute')
  const [taxonomySelectedCountry, setTaxonomySelectedCountry] = React.useState<string>('all')

  const countries = React.useMemo(() => {
    return [...new Set(demographicsCityData.map(d => d.country))].sort();
  }, []);

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="relative w-full mx-auto my-16 group">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6 py-4">
          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 0 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-filtro-ruido"
                title="Filtro de Ruido Total: Posiciones Core vs Otras Áreas"
                
                interpretation="De las 3,471 vacantes recolectadas buscando el término 'Product Manager', el 18.2% (635 roles) resultaron ser de construcción, ventas, marketing o finanzas que usan un título engañoso. Solo las 2,836 vacantes 'Core' pasaron a nuestro análisis."
                className="h-full"
              >
                <NoiseFilterChart />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 1 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-demografia-pais"
                title="Distribución Demográfica por País y Filtro de Ruido"
                
                interpretation="Estados Unidos es el mercado dominante y el más maduro (~90% de sus vacantes de PM son reales). En contraste, México aporta mucho volumen pero con la mayor tasa de 'ruido' (~40% son de otras áreas). Colombia muestra una madurez prometedora al publicar roles de producto mucho más precisos."
                className="h-full"
                controls={
                  <div className="flex w-full justify-end">
                    <ToggleGroup type="single" variant="outline" value={countryViewMode} onValueChange={(v) => v && setCountryViewMode(v as 'absolute' | 'percentage')} size="sm" className="justify-end">
                      <ToggleGroupItem value="absolute" className="text-xs h-8 px-3">Valores</ToggleGroupItem>
                      <ToggleGroupItem value="percentage" className="text-xs h-8 px-3">Porcentaje (%)</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                }
              >
                <DemographyCountryChart viewMode={countryViewMode} />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 2 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-demografia-ciudad"
                title="Desglose de Vacantes y Filtro de Ruido por Ciudad"
                
                interpretation="São Paulo y Ciudad de México actúan como los verdaderos polos de LatAm. Curiosamente, la categoría 'Otra ciudad' lidera en muchos países y tiene una alta concentración de ruido en México, lo que indica que el talento fuera de los hubs principales aplica a roles de PM que terminan siendo operativos o comerciales."
                className="h-full"
                controls={
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between">
                    <div className="w-full sm:w-auto sm:min-w-[280px]">
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Filtrar por país..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            Todos los países
                          </SelectItem>
                          {countries.map(c => (
                            <SelectItem key={c} value={c}>
                              {FLAGS[c] || ''} <span className="ml-1">{c}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <ToggleGroup type="single" variant="outline" value={cityViewMode} onValueChange={(v) => v && setCityViewMode(v as 'absolute' | 'percentage')} size="sm" className="justify-start">
                      <ToggleGroupItem value="absolute" className="text-xs h-8 px-3">Valores</ToggleGroupItem>
                      <ToggleGroupItem value="percentage" className="text-xs h-8 px-3">Porcentaje (%)</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                }
              >
                <DemographyCityChart viewMode={cityViewMode} selectedCountry={selectedCountry} />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 3 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-roles-taxonomy"
                title="Taxonomía de Roles Principales"
                interpretation="Nota temporal: Los títulos 'Product Owner' y 'Product Marketing Manager' tienen una gran participación, pero 'Product Manager' domina abrumadoramente."
                className="h-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm shadow-lg"
                controls={
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between">
                    <div className="w-full sm:w-auto sm:min-w-[280px]">
                      <Select value={taxonomySelectedCountry} onValueChange={setTaxonomySelectedCountry}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Filtrar por país..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            Todos los países
                          </SelectItem>
                          {countries.map(c => (
                            <SelectItem key={c} value={c}>
                              {FLAGS[c] || ''} <span className="ml-1">{c}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <ToggleGroup type="single" variant="outline" value={taxonomyViewMode} onValueChange={(v) => v && setTaxonomyViewMode(v as 'absolute' | 'percentage')} size="sm" className="justify-start">
                      <ToggleGroupItem value="absolute" className="text-xs h-8 px-3">Valores</ToggleGroupItem>
                      <ToggleGroupItem value="percentage" className="text-xs h-8 px-3">Porcentaje (%)</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                }
              >
                <RolesTaxonomyChart selectedCountry={taxonomySelectedCountry} viewMode={taxonomyViewMode} />
              </ChartWrapper>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden xl:flex -left-16 w-12 h-12 bg-background shadow-md border-border hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CarouselNext className="hidden xl:flex -right-16 w-12 h-12 bg-background shadow-md border-border hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Carousel>

      <div className="flex justify-center items-center gap-3 mt-8">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              i === current ? "bg-primary w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2.5"
            )}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Ir a la gráfica ${i + 1}`}
          />
        ))}
      </div>
      
      <div className="text-center mt-3 text-sm font-medium text-muted-foreground">
        Gráfica {current + 1} de {count}
      </div>
    </div>
  )
}

export function DemographicsPhase() {
  return (
    <section id="phase-demographics" className="border-t border-border/40 bg-slate-50/50 dark:bg-slate-900/20">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            number="04"
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

          {/* Charts Carousel */}
          <AnimatedSection delay={200}>
            <PhaseZeroCarousel />
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
