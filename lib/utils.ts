/**
 * utils.ts
 *
 * Funciones de utilidad globales para el proyecto.
 * Proporciona `cn()` para fusionar de manera segura las clases de TailwindCSS
 * resolviendo conflictos mediante clsx y tailwind-merge.
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
