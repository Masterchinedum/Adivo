// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/CompletionDialog.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { TestCompletionResponse } from "@/types/tests/test-attempt"

interface CompletionDialogProps {
  testId: string
  attemptId: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CompletionDialog({
  testId,
  attemptId,
  isOpen,
  onOpenChange
}: CompletionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleComplete = async () => {
    try {
      setIsSubmitting(true)
      const response = await fetch(`/api/tests/attempt/${attemptId}/complete`, {
        method: "POST"
      })

      const data: TestCompletionResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to complete test")
      }

      if (data.success && data.result) {
        toast.success("Test completed successfully!")
        router.push(`/tests/${testId}/attempt/${attemptId}/results`)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to complete test")
      onOpenChange(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Complete Test</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to complete this test? You won't be able to change your answers after submission.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleComplete}
            disabled={isSubmitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? "Submitting..." : "Complete Test"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}