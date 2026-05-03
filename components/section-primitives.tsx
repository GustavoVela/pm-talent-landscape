"use client"

/**
 * section-primitives.tsx
 *
 * Sistema de primitivos de layout y narrativa compartidos por todas las secciones
 * del dashboard. Garantiza consistencia tipográfica, de animación y de estructura
 * a lo largo de todo el artículo.
 *
 * Exporta:
 *   - AnimatedSection  — wrapper con reveal-on-scroll via IntersectionObserver
 *   - SectionHeader    — encabezado numerado de sección (01, 02, 03...)
 *   - NarrativeText    — bloque de copy con espaciado y tipografía estándar
 *   - Blockquote       — cita destacada con borde izquierdo
 *   - StatCard         — tarjeta de estadística con hover animado
 *   - ChartPlaceholder — placeholder visual durante desarrollo (no visible en producción)
 */

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

// ─── AnimatedSection ──────────────────────────────────────────────────────────

/**
 * Wrapper que aplica una animación de entrada (fade + slide-up) cuando el
 * elemento entra en el viewport. Usa IntersectionObserver con threshold 0.1.
 * La animación se dispara una sola vez (unobserve tras primera intersección).
 *
 * @param delay - Retardo en milisegundos antes de iniciar la transición (default: 0)
 */
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsInView(true); observer.unobserve(element) }
    }, { threshold: 0.1, ...options })
    observer.observe(element)
    return () => observer.disconnect()
  }, [options])
  return { ref, isInView }
}

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView()
  return (
    <div ref={ref} className={cn("transition-all duration-700 ease-out", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

/**
 * Encabezado de sección con número, título y subtítulo.
 * Usado al inicio de cada sección principal (03 Demografía, 04 Competencias, etc.)
 */
interface SectionHeaderProps {
  /** Número de sección como string ("03", "04"...) */
  number: string
  /** Título principal de la sección */
  title: string
  /** Pregunta o subtítulo que define el foco analítico de la sección */
  subtitle: string
}

export function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <AnimatedSection>
      <div className="mb-12">
        <span className="text-sm font-medium text-muted-foreground">{number}</span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </AnimatedSection>
  )
}

// ─── Blockquote ───────────────────────────────────────────────────────────────

/**
 * Cita destacada con borde izquierdo. Usada para afirmaciones clave
 * o reflexiones del autor que merecen énfasis visual.
 */
interface BlockquoteProps {
  children: React.ReactNode
}

export function Blockquote({ children }: BlockquoteProps) {
  return (
    <AnimatedSection>
      <div className="relative border-l-2 border-foreground/20 pl-6 py-2">
        <div className="text-xl font-medium text-foreground">
          {children}
        </div>
      </div>
    </AnimatedSection>
  )
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

/**
 * Tarjeta de estadística con animación hover. Usada en la sección de
 * Introducción para mostrar métricas clave de la muestra.
 */
interface StatCardProps {
  /** El número o valor principal a destacar (ej. "2,836", "31%") */
  value: string
  /** Etiqueta descriptiva del valor */
  label: React.ReactNode | string
  /** Contexto adicional en texto más pequeño (opcional) */
  sublabel?: React.ReactNode | string
}

export function StatCard({ value, label, sublabel }: StatCardProps) {
  return (
    <div className="group relative h-full rounded-xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1 text-center">
      <p className="text-3xl font-bold text-foreground tracking-tight">
        {value}
      </p>
      <div className="text-sm font-medium text-foreground mt-2">{label}</div>
      {sublabel && (
        <div className="text-xs text-muted-foreground mt-1">{sublabel}</div>
      )}
    </div>
  )
}

// ─── NarrativeText ────────────────────────────────────────────────────────────

/**
 * Contenedor de bloques de copy narrativo. Aplica la tipografía, espaciado
 * y animación de entrada estándar del artículo.
 * Usar para párrafos de análisis, listas y contenido textual de cada sección.
 */
interface NarrativeTextProps {
  children: React.ReactNode
  /** Retardo de animación de entrada en ms (default: 0) */
  delay?: number
}

export function NarrativeText({ children, delay = 0 }: NarrativeTextProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
        {children}
      </div>
    </AnimatedSection>
  )
}

// ─── ChartPlaceholder ─────────────────────────────────────────────────────────

/**
 * Placeholder visual para gráficas en desarrollo.
 * No debería aparecer en producción; es una ayuda durante el proceso de build.
 */
export function ChartPlaceholder({
  title,
  height = "400px",
  description
}: {
  title: string
  height?: string
  description?: string
}) {
  return (
    <div className="rounded-xl border-2 border-dashed border-border/50 bg-muted/20 flex flex-col items-center justify-center text-center p-12" style={{ minHeight: height }}>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      {description && (
        <p className="text-xs text-muted-foreground/60 mt-1 max-w-sm">{description}</p>
      )}
      <p className="text-xs text-muted-foreground/40 mt-4">Las gráficas serán agregadas conforme se implementen.</p>
    </div>
  )
}

export { AnimatedSection }
