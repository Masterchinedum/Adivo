//app/(test-taking)/tests/[testId]/components/StartTestButton.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { startTestAttemptSchema } from "@/lib/validations/test-attempt"
import { toast } from "sonner"

interface StartTestButtonProps {
  testId: string
  disabled?: boolean
}

export function StartTestButton({ testId, disabled }: StartTestButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function startTest() {
    try {
      setIsLoading(true)
      
      // Validate input
      const input = startTestAttemptSchema.parse({ testId })
      
      // Create test attempt
      const response = await fetch("/api/test-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      })

      if (!response.ok) {
        throw new Error("Failed to start test")
      }

      const data = await response.json()
      
      // Redirect to test taking page
      router.push(`/tests/${testId}/attempt/${data.testAttempt.id}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      className="w-full" 
      onClick={startTest}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Starting..." : "Start Test"}
    </Button>
  )
}