// hooks/useTestAttempt.ts
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { TestStatus } from '@/types/answers/testAttempt'

interface UseTestAttemptProps {
  testId: string
}

export function useTestAttempt({ testId }: UseTestAttemptProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [status, setStatus] = useState<TestStatus>(TestStatus.IN_PROGRESS)

  // Start a new test attempt
  const startAttempt = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/tests/${testId}/attempt`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Failed to start test')
      }

      const data = await response.json()
      setAttemptId(data.id)
      setStatus(TestStatus.IN_PROGRESS)
      return data.id
    } catch (error) {
      toast.error('Failed to start test')
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [testId])

  // Complete the test attempt
  const completeAttempt = useCallback(async () => {
    if (!attemptId) return

    try {
      setIsLoading(true)
      const response = await fetch(`/api/tests/${testId}/attempt/${attemptId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: TestStatus.COMPLETED })
      })

      if (!response.ok) {
        throw new Error('Failed to complete test')
      }

      setStatus(TestStatus.COMPLETED)
      router.push(`/tests/${testId}/result?attemptId=${attemptId}`)
    } catch (error) {
      toast.error('Failed to complete test')
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [testId, attemptId, router])

  // Abandon the test attempt
  const abandonAttempt = useCallback(async () => {
    if (!attemptId) return

    try {
      setIsLoading(true)
      await fetch(`/api/tests/${testId}/attempt/${attemptId}/abandon`, {
        method: 'PATCH'
      })
      setStatus(TestStatus.ABANDONED)
      router.push('/tests')
    } catch (error) {
      toast.error('Failed to abandon test')
    } finally {
      setIsLoading(false)
    }
  }, [testId, attemptId, router])

  return {
    attemptId,
    status,
    isLoading,
    startAttempt,
    completeAttempt,
    abandonAttempt
  }
}