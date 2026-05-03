"use client"

/**
 * ChartWrapper
 *
 * Higher-Order Component (HOC) que envuelve cualquier visualización del dashboard.
 * Provee una estructura uniforme con:
 *   - Título y descripción opcionales
 *   - Texto de ayuda contextual ("💡 Antes de explorar")
 *   - Controles interactivos opcionales (filtros, toggles)
 *   - Bloque de interpretación analítica con ícono 🤓
 *   - Footer opcional para notas metodológicas
 *
 * Uso:
 *   <ChartWrapper id="mi-grafica" title="Título" interpretation="...">
 *     <MiGrafica />
 *   </ChartWrapper>
 */

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ChartWrapperProps {
  /** ID único del elemento — usado para scroll-anchoring y accesibilidad */
  id: string
  /** Título principal de la gráfica */
  title: string
  /** Subtítulo o descripción corta (opcional) */
  description?: string
  /** Texto de interpretación analítica que aparece en el bloque 🤓 al pie */
  interpretation?: string | React.ReactNode
  /** Texto de ayuda contextual que aparece con "💡 Antes de explorar" */
  helpText?: string | React.ReactNode
  /** Clases CSS adicionales para personalizar la Card contenedora */
  className?: string
  /** Controles interactivos opcionales (ej. ToggleGroup, Select) */
  controls?: React.ReactNode
  /** Contenido del footer (ej. notas metodológicas, links) */
  footer?: React.ReactNode
  /** La visualización en sí (cualquier componente de gráfica) */
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
        <CardContent className="space-y-2 flex-1 flex flex-col pt-0 min-h-0">
          {/* Texto de ayuda contextual — aparece antes de la gráfica */}
          {helpText && (
            <div className="mb-4 w-full">
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                <span className="font-bold text-foreground">💡 Antes de explorar: </span>
                {helpText}
              </p>
              <Separator className="w-full bg-border/60" />
            </div>
          )}
          {/* Controles interactivos (filtros, toggles) — encima de la gráfica */}
          {controls && (
            <div className="w-full shrink-0">
              {controls}
            </div>
          )}

          {/* Área de la visualización */}
          <div className="w-full flex-1 min-h-0 p-0 flex flex-col justify-center bg-transparent rounded-md">
            {children}
          </div>

          {/* Bloque de interpretación analítica 🤓 */}
          {interpretation && (
            <div className="mt-4 w-full">
              <Alert className="w-full border-border/50 bg-muted/50 shadow-sm grid-cols-[auto_1fr] gap-x-3">
                <span className="text-base leading-none translate-y-[2px]">🤓</span>
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
