// components/ui/option-circle.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { getOptionSize } from "@/lib/utils/option-grouping"

interface OptionCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  position: number
  totalInGroup: number
  groupType: 'left' | 'middle' | 'right'
  selected?: boolean
  groupColor?: string
  disabled?: boolean
}

const sizeMap = {
  xl: "h-12 w-12 md:h-16 md:w-16 lg:h-24 lg:w-24", // Largest
  lg: "h-10 w-10 md:h-14 md:w-14 lg:h-20 lg:w-20", // Large
  md: "h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16",   // Medium
  sm: "h-6 w-6 md:h-10 md:w-10 lg:h-12 lg:w-12",   // Small
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
  const size = getOptionSize(groupType, position, totalInGroup);

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
            size={size === "sm" ? 16 : size === "md" ? 20 : size === "lg" ? 24 : 28} 
          />
        </div>
      )}
    </div>
  )
}