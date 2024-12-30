// components/test/TestNavigation.tsx
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight, 
  Check 
} from "lucide-react"

interface TestNavigationProps {
  onNext: () => void
  onPrevious: () => void
  onSubmit: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  isLastQuestion: boolean
  isSubmitting?: boolean
}

export function TestNavigation({
  onNext,
  onPrevious,
  onSubmit,
  canGoNext,
  canGoPrevious,
  isLastQuestion,
  isSubmitting
}: TestNavigationProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={onPrevious}
        disabled={!canGoPrevious || isSubmitting}
        variant="ghost"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      {isLastQuestion ? (
        <Button 
          onClick={onSubmit}
          disabled={isSubmitting}
          className="ml-auto"
        >
          <Check className="mr-2 h-4 w-4" />
          Submit Test
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canGoNext || isSubmitting}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  )
}