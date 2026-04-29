"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface NavItem {
  id: string
  label: string
  number: string
}

const navItems: NavItem[] = [
  { id: "intro", label: "Inicio", number: "00" },
  { id: "detonante", label: "El detonante", number: "01" },
  { id: "marco-mental", label: "Marco mental", number: "02" },
  { id: "phase-demographics", label: "Anatomía de los Datos", number: "03" },
  { id: "phase-competency", label: "Perfil de competencias", number: "04" },
  { id: "phase-quadrant", label: "Desenredando la Complejidad", number: "05" },
  { id: "phase-ai-adoption", label: "La Lupa en la Adopción", number: "06" },
  { id: "elefante", label: "El Elefante", number: "07" },
  { id: "conclusion", label: "Conclusión", number: "08" },
]

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("intro")
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Determine active section
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      }))

      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const offsetTop = section.element.offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      window.history.pushState(null, "", `#${id}`)
    }
  }

  return (
    <nav 
      className={cn(
        "fixed right-6 top-1/2 z-40 -translate-y-1/2 transition-all duration-300",
        "hidden lg:block",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
      )}
    >
      <div className="flex flex-col items-end gap-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={cn(
              "group flex items-center gap-3 transition-all duration-200",
            )}
          >
            <span 
              className={cn(
                "text-xs font-medium transition-all duration-200 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
                activeSection === item.id && "opacity-100 translate-x-0"
              )}
            >
              {item.label}
            </span>
            <div className="flex items-center gap-2">
              <span 
                className={cn(
                  "text-[10px] font-mono transition-colors duration-200",
                  activeSection === item.id 
                    ? "text-foreground" 
                    : "text-muted-foreground/50 group-hover:text-muted-foreground"
                )}
              >
                {item.number}
              </span>
              <div 
                className={cn(
                  "h-2 w-2 rounded-full border transition-all duration-200",
                  activeSection === item.id 
                    ? "bg-foreground border-foreground scale-125" 
                    : "border-muted-foreground/40 group-hover:border-muted-foreground group-hover:scale-110"
                )}
              />
            </div>
          </button>
        ))}
      </div>
    </nav>
  )
}

// Export function to add new nav items dynamically
export function addNavItem(item: NavItem) {
  navItems.push(item)
}
