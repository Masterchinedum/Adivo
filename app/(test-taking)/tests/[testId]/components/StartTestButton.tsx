"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { TestAttemptApiResponse } from "@/types/tests/test-attempt"

interface StartTestButtonProps {
  testId: string
  disabled?: boolean
}

export function StartTestButton({ testId, disabled }: StartTestButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const startTest = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/tests/attempt", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          testId 
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to start test")
      }

      if (!data.testAttempt?.id) {
        throw new Error("Invalid response from server")
      }

      router.push(`/tests/${testId}/attempt/${data.testAttempt.id}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to start test")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={startTest} 
      disabled={disabled || isLoading}
      className="w-full"
    >
      {isLoading ? "Starting..." : "Start Test"}
    </Button>
  )
}