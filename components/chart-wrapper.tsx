"use client"

import { useRef } from "react"
import { DownloadSimple } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ChartWrapperProps {
  id: string
  title: string
  description?: string
  interpretation?: string
  className?: string
  controls?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

export function ChartWrapper({
  id,
  title,
  description,
  interpretation,
  className,
  controls,
  footer,
  children,
}: ChartWrapperProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  const downloadChart = async () => {
    if (!chartRef.current) return

    const chartDiv = chartRef.current.querySelector("div[echarts]") || chartRef.current.firstElementChild?.firstElementChild
    if (!chartDiv) return;

    try {
      const echarts = await import('echarts');
      const echartsInstance = echarts.getInstanceByDom(chartDiv as HTMLElement);
      
      if (echartsInstance) {
        const url = echartsInstance.getDataURL({
          type: "png",
          pixelRatio: 2,
          backgroundColor: "#ffffff",
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
    <div id={id} className={`scroll-mt-20 ${className || ''}`}>
      <Card className="mx-auto overflow-hidden h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
          {description && (
            <CardDescription className="mt-1">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4 flex-1 flex flex-col">
          <div className="flex flex-row items-center justify-between gap-4">
            <div>{controls}</div>
            <Button
              variant="outline"
              size="icon"
              onClick={downloadChart}
              title="Descargar gráfica"
              className="shrink-0 h-8 w-8"
            >
              <DownloadSimple className="h-4 w-4" />
            </Button>
          </div>
          
          <div ref={chartRef} className="w-full flex-1">
            {children}
          </div>

          {interpretation && (
            <>
              <Separator className="my-2" />
              <p className="text-sm font-medium leading-relaxed text-foreground">
                {interpretation}
              </p>
            </>
          )}
        </CardContent>
        {footer && (
          <CardFooter className="text-xs text-muted-foreground pt-0">
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
