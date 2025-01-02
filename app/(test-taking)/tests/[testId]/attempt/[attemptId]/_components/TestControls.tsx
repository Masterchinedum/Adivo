// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/TestControls.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CompletionDialog } from "./CompletionDialog"
import { type TestAttemptQuestion } from "@/types/tests/test-attempt-question"

interface TestControlsProps {
  testId: string
  attemptId: string
  questions: TestAttemptQuestion[]
  onPrevious?: () => void
  onNext?: () => void
  currentQuestionIndex: number
  totalQuestions: number
}

export function TestControls({
  testId,
  attemptId,
  questions,
  onPrevious,
  onNext,
  currentQuestionIndex,
  totalQuestions
}: TestControlsProps) {
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  
  const answeredQuestions = questions.filter(q => q.isAnswered).length
  const canComplete = answeredQuestions === totalQuestions

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={onNext}
            disabled={currentQuestionIndex === totalQuestions - 1}
          >
            Next
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {answeredQuestions} of {totalQuestions} questions answered
          </span>
          <Button
            onClick={() => setShowCompletionDialog(true)}
            disabled={!canComplete}
          >
            Complete Test
          </Button>
        </div>
      </div>

      <CompletionDialog
        testId={testId}
        attemptId={attemptId}
        isOpen={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
      />
    </div>
  )
}