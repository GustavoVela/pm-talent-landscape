"use client"

import React from "react"
import { ChartWrapper } from "./chart-wrapper"
import { SectionHeader, NarrativeText, StatCard, AnimatedSection } from "./section-primitives"
import { NoiseFilterChart } from "./charts/noise-filter-chart"
import { JobsFreshnessChart } from "./charts/jobs-freshness-chart"
import { DemographyCountryChart } from "./charts/demography-country-chart"
import { DemographyCityChart } from "./charts/demography-city-chart"
import { DemographySeniorityChart } from "./charts/demography-seniority-chart"
import { DemographyEmploymentChart } from "./charts/demography-employment-chart"
import { DemographyIndustryChart } from "./charts/demography-industry-chart"
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
                id="chart-freshness"
                title="Frescura del Dataset: ¿Qué tan recientes son los datos?"
                interpretation="El 64% de las vacantes (1,818 de 2,836) fueron publicadas en la semana del 13 de abril de 2026. Más del 98% de los datos tienen menos de 4 semanas de antigüedad, lo que confirma que el análisis refleja el estado actual del mercado de talento en producto."
                className="h-full"
              >
                <JobsFreshnessChart />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 2 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-demografia-pais"
                title="Distribución de Roles de PM por País"
                
                interpretation="Estados Unidos concentra el 47.2% de todas las vacantes validadas (1,339 roles), reflejando la madurez de su mercado tecnológico. En Latinoamérica, Brasil lidera con 626 roles seguido de México (415). La distribución confirma que el análisis tiene representación real en los 6 mercados."
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
            <div className={cn("transition-all duration-500 h-full", current !== 3 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-demografia-ciudad"
                title="Top 10: Roles de PM por Ciudad"
                
                interpretation="São Paulo (290 roles consolidados) y Ciudad de México (273) son los hubs de LatAm. En EE. UU., Nueva York lidera con 240 roles y San Francisco con 173. Santiago concentra el talento en producto de Chile con 142 roles, mientras Bogotá posiciona a Colombia con 99 roles core en el mercado."
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
                <DemographyCityChart viewMode={cityViewMode} selectedCountry={selectedCountry} />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 4 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-roles-taxonomy"
                title="Taxonomía de Roles Principales"
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
                <RolesTaxonomyChart selectedCountry={taxonomySelectedCountry} viewMode={taxonomyViewMode} />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 5 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-demografia-seniority"
                title="Distribución por Nivel de Seniority"
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
                <DemographySeniorityChart viewMode={seniorityViewMode} selectedCountry={senioritySelectedCountry} />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 6 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-demografia-industry"
                title="Top 10 Industrias Contratando"
                interpretation="El sector de Servicios IT y Consultoría (422), junto con Software (355) y Fintech/Banca (381 consolidado), dominan la captura de talento. Además, gigantes como TikTok, Meta, Amazon y corporativos tradicionales (Mastercard, JPMorgan) se disputan el talento contra scale-ups locales (Nubank, MercadoLibre)."
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
                <DemographyIndustryChart viewMode={industryViewMode} selectedCountry={industrySelectedCountry} />
              </ChartWrapper>
            </div>
          </CarouselItem>

          <CarouselItem className="pl-4 md:pl-6 basis-full lg:basis-[60%] xl:basis-[55%]">
            <div className={cn("transition-all duration-500 h-full", current !== 7 ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100 shadow-xl ring-1 ring-border/50 rounded-xl")}>
              <ChartWrapper
                id="chart-demografia-employment"
                title="Distribución por Modalidad de Contrato"
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
                <DemographyEmploymentChart selectedCountry={employmentSelectedCountry} />
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
              <StatCard value="2,836" label="Roles válidos de Product Management" sublabel="(Post-filtro IA)." />
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
              <AlertTitle className="text-foreground font-medium">Nota metodológica sobre la taxonomía de roles</AlertTitle>
              <AlertDescription className="text-muted-foreground mt-2">
                <ul className="list-disc pl-4 space-y-1.5 text-xs md:text-[13px] leading-relaxed">
                  <li>La abundancia de etiquetas en la gráfica de <em>Taxonomía de Roles</em> se debe a la extracción directa de descripciones originales en tres idiomas (inglés, español y portugués).</li>
                  <li>Esta duplicidad semántica natural (ej. "Product Manager" vs "Gerente de Producto") se mantuvo intacta en la base de datos para evitar sesgos de agrupación temprana.</li>
                  <li>El "ruido" se resuelve analíticamente en fases posteriores mediante la consolidación semántica de habilidades, asegurando precisión sin alterar la evidencia cruda.</li>
                </ul>
              </AlertDescription>
            </Alert>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
