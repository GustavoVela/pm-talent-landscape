"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BrainCircuit } from "lucide-react"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"

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
            <Item variant="outline" size="xs" className="mt-4 bg-muted/30 hover:bg-muted/50 transition-colors">
              <ItemMedia variant="icon" className="mt-0.5">
                <BrainCircuit className="text-primary/80" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5">Lectura Ejecutiva</ItemTitle>
                <ItemDescription className="text-sm leading-relaxed text-foreground/90">
                  {interpretation}
                </ItemDescription>
              </ItemContent>
            </Item>
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
