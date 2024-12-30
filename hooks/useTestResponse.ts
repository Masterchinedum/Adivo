// hooks/useTestResponse.ts
import { useState } from 'react'
import { QuestionResponse } from '@/types/answers/questionResponse'

interface UseTestResponseProps {
  testId: string
  attemptId: string
}

export function useTestResponse({ testId, attemptId }: UseTestResponseProps) {
  const [responses, setResponses] = useState<QuestionResponse[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Save a question response
  const saveResponse = async (questionId: string, selectedOptionId: string) => {
    try {
      setIsSubmitting(true)
      const response = await fetch(
        `/api/tests/${testId}/attempt/${attemptId}/responses`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            questionId,
            selectedOptionId
          })
        }
      )
      const data = await response.json()
      
      if (!response.ok) throw new Error(data.message)
      
      setResponses(prev => [...prev, data])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save response')
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    responses,
    isSubmitting,
    error,
    saveResponse
  }
}