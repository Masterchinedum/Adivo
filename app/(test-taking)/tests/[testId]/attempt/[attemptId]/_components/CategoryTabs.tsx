// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/CategoryTabs.tsx
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  totalQuestions: number
  answeredQuestions: number
}

interface CategoryTabsProps {
  categories: Category[]
  currentCategoryId: string
  onCategoryChange: (categoryId: string) => void
}

export function CategoryTabs({
  categories,
  currentCategoryId,
  onCategoryChange
}: CategoryTabsProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [showScrollButtons, setShowScrollButtons] = React.useState(false)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  // Check if scroll buttons should be shown
  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const checkScroll = () => {
      setShowScrollButtons(container.scrollWidth > container.clientWidth)
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      )
    }

    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [categories])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = direction === 'left' ? -200 : 200
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="relative flex items-center">
      {showScrollButtons && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute left-0 z-10 h-8 w-8 rounded-full",
            !canScrollLeft && "opacity-0"
          )}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-none px-8 gap-2"
      >
        {categories.map((category) => {
          const progress = Math.round(
            (category.answeredQuestions / category.totalQuestions) * 100
          )
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "flex flex-col items-start px-4 py-2 rounded-lg whitespace-nowrap transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                currentCategoryId === category.id && "bg-accent text-accent-foreground",
              )}
            >
              <span className="text-sm font-medium">{category.name}</span>
              <span className="text-xs text-muted-foreground">
                {category.answeredQuestions}/{category.totalQuestions} completed
              </span>
            </button>
          )
        })}
      </div>

      {showScrollButtons && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-0 z-10 h-8 w-8 rounded-full",
            !canScrollRight && "opacity-0"
          )}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}