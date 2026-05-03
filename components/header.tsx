"use client"

/**
 * Header
 *
 * Barra de navegación superior fija (sticky). Muestra el nombre del proyecto,
 * fecha de publicación, avatar del autor con enlace a LinkedIn, enlace al
 * repositorio en GitHub y el toggle de tema claro/oscuro.
 */

import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"
import { GithubLogo } from "@phosphor-icons/react"

export function Header() {
  const publishDate = "Abril 2026"
  const authorName = "Gustavo Vela Zuñiga"
  const linkedinUrl = "https://www.linkedin.com/in/gustavo-vela/"
  const githubUrl = "https://github.com/GustavoVela/pm-talent-landscape"
  const profileImage = "https://media.licdn.com/dms/image/v2/D4E03AQGX6nV2oMzC8g/profile-displayphoto-crop_800_800/B4EZ0M81ysHUAI-/0/1774038774403?e=1778716800&v=beta&t=Ko07etYOzdTZ_CwgiR6QSZts9CeRL5THeDzTap8MDro"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-muted/80 backdrop-blur-xl supports-[backdrop-filter]:bg-muted/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Product Management Talent Landscape
          </span>
          <span className="hidden h-4 w-px bg-border md:block" />
          <span className="hidden text-xs text-muted-foreground md:block">
            {publishDate}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-sm transition-all hover:bg-muted hover:border-border"
          >
            <GithubLogo className="h-4 w-4" />
            <span className="hidden text-xs font-medium text-foreground sm:block">
              Repositorio
            </span>
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-sm transition-all hover:bg-muted hover:border-border"
          >
            <Image
              src={profileImage}
              alt={authorName}
              width={22}
              height={22}
              className="rounded-full"
              unoptimized
            />
            <span className="hidden text-xs font-medium text-foreground sm:block">
              {authorName}
            </span>
            <Image
              src="/images/linkedin-logo.png"
              alt="LinkedIn"
              width={16}
              height={16}
              className="rounded-[3px]"
            />
          </a>
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
