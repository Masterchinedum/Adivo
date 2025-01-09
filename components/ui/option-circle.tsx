// components/ui/option-circle.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface OptionCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  selected?: boolean
  groupColor?: string
  disabled?: boolean
}

const sizeMap = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14"
}

export function OptionCircle({
  size = "md",
  selected = false,
  groupColor = "#2563eb", // Default blue color
  disabled = false,
  className,
  ...props
}: OptionCircleProps) {
  return (
    <div
      className={cn(
        "relative rounded-full border-2 transition-all duration-200",
        sizeMap[size],
        selected && "bg-opacity-20",
        disabled && "opacity-50 cursor-not-allowed",
        "hover:shadow-md cursor-pointer",
        className
      )}
      style={{
        borderColor: groupColor,
        backgroundColor: selected ? groupColor : 'transparent'
      }}
      {...props}
    >
      {selected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Check 
            className="text-white" 
            size={size === "sm" ? 16 : size === "md" ? 20 : 24} 
          />
        </div>
      )}
    </div>
  )
}