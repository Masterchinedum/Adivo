// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/NavigationControls.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"

interface NavigationControlsProps {
  testId: string
  attemptId: string
  currentQuestionNumber: number
  totalQuestions: number
  answeredQuestions: number
  canGoNext: boolean
  canGoPrevious: boolean
  onNext: () => void
  onPrevious: () => void
}

export function NavigationControls({
  testId,
  attemptId,
  currentQuestionNumber,
  totalQuestions,
  answeredQuestions,
  canGoNext,
  canGoPrevious,
  onNext,
  onPrevious,
}: NavigationControlsProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const router = useRouter()

  const handleCompleteTest = async () => {
    try {
      const res = await fetch(`/api/tests/attempt/${attemptId}/complete`, {
        method: 'POST',
      })

      if (!res.ok) throw new Error('Failed to complete test')

      router.push(`/tests/${testId}/attempt/${attemptId}/results`)
    } catch (error) {
      console.error('Error completing test:', error)
    }
  }

  return (
    <>
      <div className="bg-white py-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              onClick={onPrevious}
              disabled={!canGoPrevious}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={onNext}
              disabled={!canGoNext}
            >
              Next
            </Button>
            <span className="text-sm text-muted-foreground hidden md:inline">
              Question {currentQuestionNumber} of {totalQuestions}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {answeredQuestions} of {totalQuestions} answered
            </span>
            <Button
              onClick={() => setShowConfirmDialog(true)}
              disabled={answeredQuestions < totalQuestions}
            >
              Complete Test
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Test?</DialogTitle>
            <DialogDescription>
              {answeredQuestions < totalQuestions ? (
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-4 w-4" />
                  You have {totalQuestions - answeredQuestions} unanswered questions
                </div>
              ) : (
                "Are you sure you want to complete the test?"
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCompleteTest}>
              Complete Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}