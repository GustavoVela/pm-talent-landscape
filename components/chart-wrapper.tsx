"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Lightbulb } from "lucide-react"

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

  return (
    <div id={id} className="scroll-mt-20 h-full">
      <Card className={`mx-auto overflow-hidden h-full flex flex-col ${className || ''}`}>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
          {description && (
            <CardDescription className="mt-1">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-2 flex-1 flex flex-col">
          {controls && (
            <div className="w-full">
              {controls}
            </div>
          )}
          
          <div className="w-full flex-1 p-4 bg-white rounded-md">
            {children}
          </div>

          {interpretation && (
            <div className="mt-4 bg-muted/30 border border-border/50 rounded-lg p-4 flex gap-3 items-start shadow-sm transition-colors hover:bg-muted/50">
              <div className="bg-background border border-border/40 p-2 rounded-md shadow-sm shrink-0 mt-0.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Lectura Ejecutiva</span>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {interpretation}
                </p>
              </div>
            </div>
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
