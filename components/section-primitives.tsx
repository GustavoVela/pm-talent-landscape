"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

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

/** Section header matching the style of sections 01/02 in introduction.tsx */
interface SectionHeaderProps {
  number: string
  title: string
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

/** Blockquote matching the style from section 01 */
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

/** Simple stat display — no colored borders, matches card style from section 02 */
interface StatCardProps {
  value: string
  label: string
  sublabel?: string
}

export function StatCard({ value, label, sublabel }: StatCardProps) {
  return (
    <div className="group relative h-full rounded-xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1 text-center">
      <p className="text-3xl font-bold text-foreground tracking-tight">
        {value}
      </p>
      <p className="text-sm font-medium text-foreground mt-2">{label}</p>
      {sublabel && (
        <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
      )}
    </div>
  )
}

/** Narrative text block matching the body copy style */
interface NarrativeTextProps {
  children: React.ReactNode
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

/** Chart placeholder — dashed border, minimal */
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
