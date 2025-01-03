// components/TestHeader.tsx
import { Progress } from "@/components/ui/progress"

interface TestHeaderProps {
  currentQuestion: number
  totalQuestions: number
}

export function TestHeader({ currentQuestion, totalQuestions }: TestHeaderProps) {
  const progress = totalQuestions ? (currentQuestion / totalQuestions) * 100 : 0

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assessment in Progress</h1>
        <span className="text-muted-foreground">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}