"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Lightbulb, Compass } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ChartWrapperProps {
  id: string
  title: string
  description?: string
  interpretation?: string | React.ReactNode
  helpText?: string | React.ReactNode
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
  helpText,
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
        <CardContent className="space-y-2 flex-1 flex flex-col pt-0">
          {helpText && (
            <div className="mb-2 w-full">
              <Alert className="w-full border-sky-200/50 bg-sky-50/50 dark:bg-sky-950/20 dark:border-sky-900/50 shadow-sm py-2.5 px-3.5">
                <Compass className="h-4 w-4 text-sky-500 dark:text-sky-400" />
                <AlertDescription className="text-slate-600 dark:text-slate-300 text-[12.5px] leading-relaxed w-full font-medium">
                  {helpText}
                </AlertDescription>
              </Alert>
            </div>
          )}
          {controls && (
            <div className="w-full">
              {controls}
            </div>
          )}
          
          <div className="w-full flex-1 p-0 flex flex-col justify-center bg-transparent rounded-md">
            {children}
          </div>

          {interpretation && (
            <div className="mt-4 w-full">
              <Alert className="w-full border-border/50 bg-muted/50 shadow-sm">
                <Lightbulb className="h-4 w-4 text-primary" />
                <AlertDescription className="text-foreground text-[14px] leading-relaxed w-full">
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
