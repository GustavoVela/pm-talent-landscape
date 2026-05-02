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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
                title="¿Qué ciudades concentran las vacantes?"
                
                interpretation={
                  <div className="flex flex-col gap-2.5">
                    <span>De las 2,836 vacantes validadas, 1,958 (69%) se ubican en hubs urbanos específicos, con São Paulo y CDMX liderando LatAm. Las 878 vacantes restantes (31%) se consolidan como 'Otra (Nivel País)'. Este volumen agrupa tanto posiciones donde el reclutador estipuló únicamente el país (típico en esquemas remotos a nivel nacional) como ciudades de muy baja emisión, evidenciando un mercado de talento altamente distribuido fuera de las capitales.</span>
                    <div className="h-px w-full bg-border/50" />
                    <a href="https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/groupings/locations_grouping.md" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline text-[13px] w-fit">
                      Diccionario de estandarización geográfica ↗
                    </a>
                  </div>
                }
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
                title="¿Qué roles de Product Management contemplamos?"
                interpretation={
                  <div className="flex flex-col gap-2.5">
                    <span>Dada la extrema variación en los títulos originales de las vacantes, estandarizamos cientos de nomenclaturas en 10 categorías macro. El 47.5% del talento base opera estrictamente bajo la etiqueta 'Product Manager' (1,348 roles), seguido por 'Product Owner' con el 20.6%. Esta consolidación demuestra que, aunque la especialización crece (ej. Product Ops o PMM), casi el 70% de la demanda sigue anclada a los roles tradicionales de ejecución central.</span>
                    <div className="h-px w-full bg-border/50" />
                    <a href="https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/groupings/jobs_grouping.md" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline text-[13px] w-fit">
                      Diccionario de estandarización de cargos ↗
                    </a>
                  </div>
                }
                className="h-full"
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
                title="¿Qué nivel de experiencia exigen las vacantes disponibles?"
                interpretation="El mercado de Producto presenta una fuerte barrera de entrada. Al desagregar todos los niveles, observamos que el 63.5% de la demanda se concentra en ejecución ('Mid-Level' con 923 vacantes y 'Senior' con 878). En el plano de liderazgo estratégico, los roles de 'Director' (318) y 'Ejecutivo' (226) conforman casi el 20% del mercado, mientras que las vacantes 'Junior' representan apenas el 12.5%. Las empresas rara vez forman talento desde cero."
                className="h-full"
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
                title="¿En qué industrias están disponibles las vacantes?"
                interpretation={
                  <div className="flex flex-col gap-2.5">
                    <span>Mapeamos las 489 etiquetas crudas del ecosistema en 15 macro-sectores estandarizados. La concentración es altísima: el 59.5% del mercado está dominado por Tecnología/Software (1,130 vacantes) y Servicios Financieros/FinTech (558 vacantes). El tercer pilar lo compone Retail & E-Commerce (260 vacantes). Esta tripleta confirma que la digitalización financiera y transaccional sigue siendo el motor absoluto de empleabilidad para los PMs.</span>
                    <div className="h-px w-full bg-border/50" />
                    <a href="https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/groupings/industry_grouping.md" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline text-[13px] w-fit">
                      Diccionario de estandarización de industrias ↗
                    </a>
                  </div>
                }
                className="h-full"
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
                title="¿Qué tipo de contrato ofrecen estas vacantes?"
                interpretation="La abrumadora mayoría de las posiciones exigen exclusividad bajo modalidad 'Full-time' (2,539 vacantes, ~90%). Esto desmitifica la supuesta tendencia de la disciplina hacia un modelo freelance o fraccional ('Fractional PM'). El mercado nos dice claramente que el rol de Product Manager, al manejar datos sensibles y ejecución crítica de negocio, sigue siendo considerado una pieza estructural in-house."
                className="h-full"
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
                Este apartado detalla la estructura de la muestra procesada, estableciendo el origen y la segmentación del análisis. Los datos provienen de ofertas de empleo activas en LinkedIn durante las últimas semanas, cubriendo vacantes en Estados Unidos, Brasil, México, Colombia, Chile y Perú. 
              </p>
              <p>
                Para garantizar una lectura limpia y estadísticamente válida, el procesamiento requirió la estandarización de la información extraída. Esto implicó crear agrupaciones metodológicas para homologar miles de variantes ruidosas en categorías clave como las <strong>ciudades</strong>, los <strong>cargos de Product Management</strong>, las <strong>industrias</strong> y la amplia taxonomía de <strong>habilidades y competencias</strong>. 
              </p>
              <p>
                En cada gráfica analítica dentro del carrusel, encontrarás un enlace de acceso directo al <em>Diccionario de estandarización</em> correspondiente, permitiéndote auditar cómo se agruparon exactamente los datos originales.
              </p>
            </NarrativeText>

          {/* Stat Cards */}
          <AnimatedSection delay={150}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
              <StatCard value="3,471" label="Vacantes evaluadas" sublabel="(Fuente: LinkedIn)." />
              <StatCard value="2,836" label="Roles válidos de Product Management" sublabel={<>(Post-filtro IA: <a href="https://github.com/GustavoVela/pm-talent-landscape/blob/main/analysis/prompt/prompt.md" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">Ver prompt</a>).</>} />
              <StatCard 
                value="4,629" 
                label={
                  <div className="flex items-center justify-center gap-1.5">
                    Skills únicas
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger type="button" className="cursor-help inline-flex">
                          <InfoIcon className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[280px] text-xs leading-relaxed p-3" side="top">
                          <strong>Variantes lingüísticas:</strong> La multiplicidad de títulos y requerimientos se debe a la extracción cruda de descripciones originales en tres idiomas simultáneos (inglés, español y portugués).
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                } 
                sublabel="extraídas y procesadas." 
              />
              <StatCard value="6" label="Mercados analizados" sublabel="(EE. UU., BR, MX, CO, CL, PE)." />
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
