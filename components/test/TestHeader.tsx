// components/test/TestHeader.tsx
import { Progress } from "@/components/ui/progress"

interface TestHeaderProps {
  title: string
  currentQuestion: number
  totalQuestions: number
  timeLeft?: number
}

export function TestHeader({ 
  title, 
  currentQuestion, 
  totalQuestions,
  timeLeft 
}: TestHeaderProps) {
  const progress = (currentQuestion / totalQuestions) * 100

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4 space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{title}</h1>
          {timeLeft && (
            <div className="text-sm text-muted-foreground">
              Time left: {timeLeft}s
            </div>
          )}
        </div>
        <div className="space-y-1">
          <Progress value={progress} />
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion} of {totalQuestions}
          </div>
        </div>
      </div>
    </div>
  )
}