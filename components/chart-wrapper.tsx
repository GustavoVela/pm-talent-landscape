"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Lightbulb } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-[1.1rem] md:text-xl leading-tight font-bold">{title}</CardTitle>
          {description && (
            <CardDescription className="mt-0.5 text-xs">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4 pt-0 gap-2">
          {controls && (
            <div className="w-full">
              {controls}
            </div>
          )}
          
          <div className="w-full flex-1 bg-transparent rounded-md flex flex-col">
            {children}
          </div>

          {interpretation && (
            <div className="w-full mt-auto">
              <Alert className="w-full border-border/50 bg-muted/50 shadow-sm py-2.5 px-3 [&>svg]:top-3 [&>svg]:left-3">
                <Lightbulb className="h-3.5 w-3.5 text-primary" />
                <AlertDescription className="text-foreground text-[12px] md:text-[13px] leading-snug w-full pl-5">
                  <div className="w-full">{interpretation}</div>
                </AlertDescription>
              </Alert>
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
