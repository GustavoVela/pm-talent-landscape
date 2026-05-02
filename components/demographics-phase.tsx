"use client"

import React from "react"
import { ChartWrapper } from "./chart-wrapper"
import { SectionHeader, NarrativeText, StatCard, AnimatedSection } from "./section-primitives"
import { SampleQualityChart } from "./charts/sample-quality-chart"
import { SampleRecencyChart } from "./charts/sample-recency-chart"
import { MarketCountryChart } from "./charts/market-country-chart"
import { MarketCityChart } from "./charts/market-city-chart"
import { MarketSeniorityChart } from "./charts/market-seniority-chart"
import { MarketEmploymentChart } from "./charts/market-employment-chart"
import { MarketIndustryChart } from "./charts/market-industry-chart"
import { JobTitlesChart } from "./charts/job-titles-chart"
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
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { demographicsCityData, FLAGS } from "@/lib/data"

function PhaseZeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  
  const [countryViewMode, setCountryViewMode] = React.useState<'absolute' | 'percentage'>('absolute')
  const [cityViewMode, setCityViewMode] = React.useState<'absolute' | 'percentage'>('absolute')
  const [seniorityViewMode, setSeniorityViewMode] = React.useState<'absolute' | 'percentage'>('absolute')
  const [senioritySelectedCountry, setSenioritySelectedCountry] = React.useState<string>('all')
  const [employmentViewMode, setEmploymentViewMode] = React.useState<'absolute' | 'percentage'>('absolute')
  const [employmentSelectedCountry, setEmploymentSelectedCountry] = React.useState<string>('all')
  const [industryViewMode, setIndustryViewMode] = React.useState<'absolute' | 'percentage'>('absolute')
  const [industrySelectedCountry, setIndustrySelectedCountry] = React.useState<string>('all')
  const [selectedCountry, setSelectedCountry] = React.useState<string>('all')
  const [taxonomyViewMode, setTaxonomyViewMode] = React.useState<'absolute' | 'percentage'>('absolute')
  const [taxonomySelectedCountry, setTaxonomySelectedCountry] = React.useState<string>('all')

  const countries = React.useMemo(() => {
    return [...new Set(demographicsCityData.map(d => d.country))].sort();
  }, []);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
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
                title="¿Cuántas vacantes son verdaderamente de Product Management?"
                
                interpretation="Se procesaron 3,471 posiciones iniciales. Se descartó el 18.2% (635 vacantes) por pertenecer a áreas operativas ajenas a tecnología (construcción, ventas, finanzas) bajo títulos engañosos. El análisis se ejecuta exclusivamente sobre la base purgada de 2,836 vacantes validadas de Product Management."
                className="h-full"
              >
                <SampleQualityChart />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 1 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-freshness"
                title="¿Qué tan recientes son los datos?"
                interpretation="Más del 98% de la muestra total tiene menos de cuatro semanas de antigüedad, con el 64% (1,818 vacantes) publicadas en la misma semana de recolección (13 de abril de 2026). Esta compresión temporal elimina el riesgo de incluir 'vacantes zombie' o desactualizadas, garantizando que los hallazgos reflejen estrictamente las exigencias del mercado al día de hoy."
                className="h-full"
              >
                <SampleRecencyChart />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 2 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-demografia-pais"
                title="¿Cómo se distribuye la muestra de datos por país?"
                
                interpretation="La recolección no forzó cuotas geográficas; capturó la totalidad de vacantes orgánicamente disponibles en la ventana de extracción. Estados Unidos aporta el mayor volumen (1,339 vacantes), estableciendo el benchmark de madurez. En LatAm, Brasil (626) y México (415) dominan la muestra. Es importante notar que la participación de Perú (73 vacantes) no constituye un volumen estadísticamente significativo para derivar conclusiones locales aisladas."
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
                <MarketCountryChart viewMode={countryViewMode} />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 3 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-demografia-ciudad"
                title="¿Qué ciudades y modalidades concentran las vacantes?"
                
                interpretation="São Paulo y Ciudad de México lideran los hubs urbanos en LatAm. Sin embargo, el alto volumen de vacantes categorizadas como 'Otros' en todos los mercados no es una carencia de datos, sino un hallazgo estructural: refleja la penetración de posiciones remotas o reclutamientos a nivel nacional donde las empresas ya no restringen la búsqueda a una sede metropolitana (ej. contratan 'en México', no 'en CDMX')."
                className="h-full"
                controls={
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between">
                    <div className="w-full sm:w-auto sm:min-w-[280px]">
                      {mounted ? (
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
                      ) : (
                        <div className="h-8 w-full border rounded-md" />
                      )}
                    </div>
                    <ToggleGroup type="single" variant="outline" value={cityViewMode} onValueChange={(v) => v && setCityViewMode(v as 'absolute' | 'percentage')} size="sm" className="justify-start">
                      <ToggleGroupItem value="absolute" className="text-xs h-8 px-3">Valores</ToggleGroupItem>
                      <ToggleGroupItem value="percentage" className="text-xs h-8 px-3">Porcentaje (%)</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                }
              >
                <MarketCityChart viewMode={cityViewMode} selectedCountry={selectedCountry} />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 4 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-roles-taxonomy"
                title="¿Qué títulos exactos usan las empresas para contratar?"
                interpretation="Nota temporal: Los títulos 'Product Owner' y 'Product Marketing Manager' tienen una gran participación, pero 'Product Manager' domina abrumadoramente."
                className="h-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm shadow-lg"
                controls={
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between">
                    <div className="w-full sm:w-auto sm:min-w-[280px]">
                      {mounted ? (
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
                      ) : (
                        <div className="h-8 w-full border rounded-md" />
                      )}
                    </div>
                    <ToggleGroup type="single" variant="outline" value={taxonomyViewMode} onValueChange={(v) => v && setTaxonomyViewMode(v as 'absolute' | 'percentage')} size="sm" className="justify-start">
                      <ToggleGroupItem value="absolute" className="text-xs h-8 px-3">Valores</ToggleGroupItem>
                      <ToggleGroupItem value="percentage" className="text-xs h-8 px-3">Porcentaje (%)</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                }
              >
                <JobTitlesChart selectedCountry={taxonomySelectedCountry} viewMode={taxonomyViewMode} />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 5 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-demografia-seniority"
                title="¿Qué nivel de experiencia exige el mercado?"
                interpretation="El mercado está dominado por roles Mid-Level (923) y Senior (878), conformando el 63.5% de todas las vacantes de PM validas. Las posiciones Junior o Entry-level son considerablemente menores (12.5%), lo que refleja la alta barrera de entrada a la disciplina."
                className="h-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm shadow-lg"
                controls={
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between">
                    <div className="w-full sm:w-auto sm:min-w-[280px]">
                      {mounted ? (
                        <Select value={senioritySelectedCountry} onValueChange={setSenioritySelectedCountry}>
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
                      ) : (
                        <div className="h-8 w-full border rounded-md" />
                      )}
                    </div>
                    <ToggleGroup type="single" variant="outline" value={seniorityViewMode} onValueChange={(v) => v && setSeniorityViewMode(v as 'absolute' | 'percentage')} size="sm" className="justify-start">
                      <ToggleGroupItem value="absolute" className="text-xs h-8 px-3">Valores</ToggleGroupItem>
                      <ToggleGroupItem value="percentage" className="text-xs h-8 px-3">Porcentaje (%)</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                }
              >
                <MarketSeniorityChart viewMode={seniorityViewMode} selectedCountry={senioritySelectedCountry} />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 6 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-demografia-industry"
                title="¿Qué industrias están buscando más Product Managers?"
                interpretation="El sector de Tecnología, Software y Servicios IT (1,130), junto con Servicios Financieros y FinTech (558), dominan la captura de talento (concentrando casi el 60% de los roles). Además, el comercio minorista y E-Commerce (260) se posicionan como el tercer gran competidor por talento."
                className="h-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm shadow-lg"
                controls={
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between">
                    <div className="w-full sm:w-auto sm:min-w-[280px]">
                      {mounted ? (
                        <Select value={industrySelectedCountry} onValueChange={setIndustrySelectedCountry}>
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
                      ) : (
                        <div className="h-8 w-full border rounded-md" />
                      )}
                    </div>
                    <ToggleGroup type="single" variant="outline" value={industryViewMode} onValueChange={(v) => v && setIndustryViewMode(v as 'absolute' | 'percentage')} size="sm" className="justify-start">
                      <ToggleGroupItem value="absolute" className="text-xs h-8 px-3">Valores</ToggleGroupItem>
                      <ToggleGroupItem value="percentage" className="text-xs h-8 px-3">Porcentaje (%)</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                }
              >
                <MarketIndustryChart viewMode={industryViewMode} selectedCountry={industrySelectedCountry} />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 7 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-demografia-employment"
                title="¿Bajo qué tipo de contrato operan los roles de Producto?"
                interpretation="La abrumadora mayoría de los roles son Full-time (2,539), desmitificando la tendencia al trabajo freelance puro en producto. Esto indica que el Product Manager sigue siendo considerado una pieza core interna dentro de la organización."
                className="h-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm shadow-lg"
                controls={
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between">
                    <div className="w-full sm:w-auto sm:min-w-[280px]">
                      {mounted ? (
                        <Select value={employmentSelectedCountry} onValueChange={setEmploymentSelectedCountry}>
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
                      ) : (
                        <div className="h-8 w-full border rounded-md" />
                      )}
                    </div>
                  </div>
                }
              >
                <MarketEmploymentChart selectedCountry={employmentSelectedCountry} />
              </ChartWrapper>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden xl:flex -left-16 w-12 h-12 bg-background shadow-md border-border hover:bg-muted opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:pointer-events-none transition-opacity duration-300" />
        <CarouselNext className="hidden xl:flex -right-16 w-12 h-12 bg-background shadow-md border-border hover:bg-muted opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:pointer-events-none transition-opacity duration-300" />
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
            number="03"
            title="Anatomía de los Datos"
            subtitle="¿Con qué información contamos?"
          />

          <NarrativeText>
            <p>
              Este apartado detalla la estructura de la muestra procesada para informar sobre el origen y la segmentación del análisis. Los datos provienen de ofertas de empleo en LinkedIn, cubriendo vacantes activas de las ultimas semanas en Estados Unidos, Brasil, México, Colombia, Chile y Perú. A través de las siguientes gráficas, se analiza la proporción de roles válidos, la distribución demográfica por país, los polos tecnológicos urbanos mapeados, la concentración de roles específicos de Product Management y los niveles de seniority exigidos, entre otros.
            </p>
          </NarrativeText>

          {/* Stat Cards */}
          <AnimatedSection delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
              <StatCard value="3,471" label="Vacantes evaluadas" sublabel="(Fuente: LinkedIn)." />
              <StatCard value="2,836" label="Roles válidos de Product Management" sublabel={<>(Post-filtro IA: <a href="https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/prompt/prompt.md" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Ver prompt</a>).</>} />
              <StatCard value="4,629" label="Skills únicas" sublabel="extraídas y procesadas." />
              <StatCard value="6" label="Mercados analizados" sublabel="(EE. UU., BR, MX, CO, CL, PE)." />
            </div>
          </AnimatedSection>

          {/* Charts Carousel */}
          <AnimatedSection delay={200}>
            <PhaseZeroCarousel />
          </AnimatedSection>

          {/* End of Section Note */}
          <AnimatedSection delay={250}>
            <Separator className="my-10" />
            <Alert className="bg-background border-border">
              <InfoIcon className="h-4 w-4 text-foreground" />
              <AlertTitle className="text-foreground font-medium">Nota de lectura: Procesamiento de los datos</AlertTitle>
              <AlertDescription className="text-muted-foreground mt-2">
                <ul className="list-disc pl-4 space-y-1.5 text-xs md:text-[13px] leading-relaxed">
                  <li><strong>Variantes lingüísticas:</strong> La multiplicidad de títulos y requerimientos se debe a la extracción cruda de descripciones originales en tres idiomas simultáneos (inglés, español y portugués).</li>
                  <li><strong>Duplicidad semántica:</strong> Conceptos equivalentes (ej. "Product Manager" vs "Gerente de Producto") se mantienen intactos en esta etapa para reflejar la realidad del mercado y evitar sesgos tempranos.</li>
                  <li><strong>Estandarización:</strong> Las agrupaciones, consolidación de roles y unificación de habilidades se ejecutan analíticamente en fases posteriores para garantizar una lectura limpia y concluyente.</li>
                </ul>
              </AlertDescription>
            </Alert>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
