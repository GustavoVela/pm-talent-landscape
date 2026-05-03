"use client"

/**
 * Footer
 *
 * Pie de página del dashboard. Muestra el año actual, el nombre del autor
 * y un enlace a su perfil de LinkedIn.
 */

import { LinkedinLogo } from "@phosphor-icons/react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const authorName = "Gustavo Vela Zuñiga"
  const linkedinUrl = "https://www.linkedin.com/in/gustavo-vela/"

  return (
    <footer className="border-t border-border/40 bg-muted/30 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {currentYear} PM Talent Landscape. Análisis realizado por{" "}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              {authorName}
            </a>
          </p>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinLogo className="h-4 w-4" />
            <span>Conecta en LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
