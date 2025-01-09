// components/ui/option-circle.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface OptionCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  size: 'lg' | 'md' | 'sm'  // Changed from default 'md'
  position: number
  totalInGroup: number
  groupType: 'left' | 'middle' | 'right'
  selected?: boolean
  groupColor?: string
  disabled?: boolean
}

// Size mapping with larger differences between sizes
const sizeMap = {
  lg: "h-8 w-8 md:h-12 md:h-12 lg:h-16 lg:w-16", // Largest
  md: "h-6 w-6 md:h-10 md:w-10 lg:h-12 lg:w-12", // Medium
  sm: "h-4 w-4 md:h-8 md:w-8 lg:h-8 lg:w-8",     // Smallest
} as const;

export function OptionCircle({
  position,
  totalInGroup,
  groupType,
  selected = false,
  groupColor = "#2563eb",
  disabled = false,
  className,
  ...props
}: OptionCircleProps) {
  // Calculate size based on position and group type
  let size: 'lg' | 'md' | 'sm'
  
  if (groupType === 'middle') {
    size = 'sm'
  } else if (groupType === 'left') {
    // For left group, size decreases from left to right
    size = position === 1 ? 'lg' : position === 2 ? 'md' : 'sm'
  } else {
    // For right group, size increases from left to right
    const reversedPosition = totalInGroup - position + 1
    size = reversedPosition === 1 ? 'lg' : reversedPosition === 2 ? 'md' : 'sm'
  }

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