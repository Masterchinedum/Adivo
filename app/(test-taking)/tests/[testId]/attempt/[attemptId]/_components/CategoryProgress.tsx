// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/CategoryProgress.tsx
"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface CategoryProgressProps {
  category: {
    name: string
    description?: string | null
    totalQuestions: number
    answeredQuestions: number
  }
}

export function CategoryProgress({ category }: CategoryProgressProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const progress = Math.round((category.answeredQuestions / category.totalQuestions) * 100)

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div>
          <h3 className="font-medium">{category.name}</h3>
          <p className="text-sm text-muted-foreground">
            {category.answeredQuestions} of {category.totalQuestions} questions completed
          </p>
        </div>
        <ChevronDown className={cn(
          "h-5 w-5 transition-transform",
          isExpanded && "transform rotate-180"
        )} />
      </button>

      <Progress value={progress} className="h-2" />

      {isExpanded && category.description && (
        <div className="text-sm text-muted-foreground pt-2 border-t">
          {category.description}
        </div>
      )}
    </div>
  )
}