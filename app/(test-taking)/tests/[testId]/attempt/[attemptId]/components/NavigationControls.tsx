// components/NavigationControls.tsx
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NavigationControlsProps {
  currentQuestion: number
  totalQuestions: number
  onNext: () => void
  onPrevious: () => void
}

export function NavigationControls({
  currentQuestion,
  totalQuestions,
  onNext,
  onPrevious
}: NavigationControlsProps) {
  return (
    <div className="flex justify-between items-center border-t mt-8 pt-6">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Question {currentQuestion + 1} of {totalQuestions}
      </span>

      <Button
        onClick={onNext}
        disabled={currentQuestion === totalQuestions - 1}
        className="gap-2"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}