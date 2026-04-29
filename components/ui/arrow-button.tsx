"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: "right" | "left"
  position?: "left" | "right"
  showArrow?: boolean
}

export const ArrowButton = React.forwardRef<HTMLButtonElement, ArrowButtonProps>(
  (
    { children, direction = "right", position = "right", showArrow = false, className, ...props },
    ref,
  ) => {
    const arrow = (
      <svg
        aria-label="Arrow"
        className={cn(
          "h-4 w-4 transition-transform duration-200",
          "group-hover:translate-x-1",
          direction === "left" && "rotate-180",
        )}
        fill="none"
        role="img"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )

    return (
      <button
        className={cn(
          "group relative inline-flex items-center justify-center gap-2",
          "rounded-lg px-6 py-3 text-sm font-medium",
          "bg-primary text-primary-foreground",
          "cursor-pointer overflow-hidden",
          "hover:bg-primary/90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "transition-colors",
          className,
        )}
        ref={ref}
        {...props}
      >
        {position === "left" && (
          <span
            className={cn(
              "transition-all duration-200",
              showArrow
                ? "opacity-100 w-4"
                : "opacity-0 w-0 group-hover:opacity-100 group-hover:w-4",
            )}
          >
            {arrow}
          </span>
        )}

        <span>{children}</span>

        {position === "right" && (
          <span
            className={cn(
              "transition-all duration-200",
              showArrow
                ? "opacity-100 w-4"
                : "opacity-0 w-0 group-hover:opacity-100 group-hover:w-4",
            )}
          >
            {arrow}
          </span>
        )}
      </button>
    )
  },
)

ArrowButton.displayName = "ArrowButton"

export default ArrowButton
