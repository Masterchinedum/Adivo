// app/tests/[id]/attempt/page.tsx

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTestAttempt } from "@/hooks/useTestAttempt"
import { useTestResponse } from "@/hooks/useTestResponse"
import { TestHeader } from "@/components/test/TestHeader"
import { QuestionCard } from "@/components/test/QuestionCard"
import { TestNavigation } from "@/components/test/TestNavigation"
import { toast } from "sonner"

import { Question } from "@/types/tests/question"

export default function TestAttemptPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { id } = params

  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [responses, setResponses] = useState<Record<string, string>>({})

  const { attemptId, startAttempt, completeAttempt, isLoading } = useTestAttempt({
    testId: id
  })

  const { saveResponse } = useTestResponse({
    testId: id,
    attemptId: attemptId || ""
  })

  useEffect(() => {
    // Fetch test questions and start attempt
    const initializeTest = async () => {
      try {
        // Start new attempt and get questions
        const newAttemptId = await startAttempt()
        const response = await fetch(`/api/tests/${id}/questions`)
        if (!response.ok) {
          throw new Error('Failed to fetch questions')
        }
        const data = await response.json()
        setQuestions(data.questions)
      } catch (error) {
        toast.error("Failed to start test")
        router.push(`/tests/${id}`)
      }
    }

    void initializeTest()
  }, [id, startAttempt, router])

  const handleOptionSelect = async (optionId: string) => {
    const currentQuestion = questions[currentQuestionIndex]
    setResponses(prev => ({ ...prev, [currentQuestion.id]: optionId }))
    
    try {
      await saveResponse(currentQuestion.id, optionId)
    } catch (error) {
      toast.error("Failed to save response")
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      await completeAttempt()
      router.push(`/tests/${id}/result?attemptId=${attemptId}`)
    } catch (error) {
      toast.error("Failed to submit test")
    }
  }

  if (!questions.length) {
    return <div>Loading...</div>
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="container max-w-3xl py-8 space-y-8">
      <TestHeader 
        title={questions[0].title}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />

      <QuestionCard
        question={currentQuestion}
        selectedOptionId={responses[currentQuestion.id]}
        onSelectOption={handleOptionSelect}
        isSubmitting={isLoading}
      />

      <TestNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        canGoNext={!!responses[currentQuestion.id]}
        canGoPrevious={currentQuestionIndex > 0}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        isSubmitting={isLoading}
      />
    </div>
  )
}