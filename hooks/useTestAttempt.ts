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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Sending an empty JSON object
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

  // Get current attempt status and details
  const getAttemptDetails = useCallback(async () => {
    if (!attemptId) return null
    try {
      setIsLoading(true)
      const response = await fetch(`/api/tests/${testId}/attempt/${attemptId}`)
      if (!response.ok) throw new Error('Failed to get attempt details')
      return await response.json()
    } catch (error) {
      toast.error('Failed to get attempt details')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [testId, attemptId])

  // Resume existing attempt
  const resumeAttempt = useCallback(async (existingAttemptId: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/tests/${testId}/attempt/${existingAttemptId}`)
      if (!response.ok) throw new Error('Failed to resume test')
      
      const data = await response.json()
      setAttemptId(existingAttemptId)
      setStatus(data.status)
      return data
    } catch (error) {
      toast.error('Failed to resume test')
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [testId])

  return {
    attemptId,
    status,
    isLoading,
    startAttempt,
    completeAttempt,
    abandonAttempt,
    getAttemptDetails,
    resumeAttempt
  }
}