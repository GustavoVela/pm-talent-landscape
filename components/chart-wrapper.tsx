"use client"

import { useRef } from "react"
import { DownloadSimple } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartWrapperProps {
  id: string
  title: string
  description?: string
  interpretation: string
  children: React.ReactNode
}

export function ChartWrapper({
  id,
  title,
  description,
  interpretation,
  children,
}: ChartWrapperProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  const downloadChart = async () => {
    if (!chartRef.current) return

    // ECharts instance is typically attached to the div
    const chartDiv = chartRef.current.querySelector("div[echarts]") || chartRef.current.firstElementChild?.firstElementChild
    if (!chartDiv) return;

    try {
      // Import echarts dynamically to avoid SSR issues
      const echarts = await import('echarts');
      const echartsInstance = echarts.getInstanceByDom(chartDiv as HTMLElement);
      
      if (echartsInstance) {
        const url = echartsInstance.getDataURL({
          type: "png",
          pixelRatio: 2,
          backgroundColor: "#fff",
        })
        const link = document.createElement("a")
        link.download = `${id}-chart.png`
        link.href = url
        link.click()
      }
    } catch (e) {
      console.error("Failed to download chart", e)
    }
  }

  return (
    <section id={id} className="scroll-mt-20 py-8">
      <Card className="mx-auto max-w-5xl overflow-hidden">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-2">{description}</CardDescription>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadChart}
            className="shrink-0"
          >
            <DownloadSimple className="mr-2 h-4 w-4" />
            Descargar
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div ref={chartRef} className="min-h-[400px] w-full">
            {children}
          </div>
          <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
            <h4 className="mb-2 text-sm font-semibold text-foreground">
              Interpretación
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {interpretation}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
