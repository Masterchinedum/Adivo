// app/(test-taking)/tests/[testId]/attempt/[attemptId]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { type TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import { LoadingState } from "./_components/LoadingState"
import { TestHeader } from "./_components/TestHeader"
import { CategorySection } from "./_components/CategorySection"
import { QuestionNavigation } from "./_components/QuestionNavigation"

export default function TestAttemptPage({ params }: { params: { attemptId: string } }) {
  const [questions, setQuestions] = useState<TestAttemptQuestion[]>([])
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/tests/attempt/${params.attemptId}/questions`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions)
        if (data.questions.length > 0) {
          setCurrentQuestionId(data.questions[0].id)
        }
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Failed to load questions:', error)
        setIsLoading(false)
      })
  }, [params.attemptId])

  if (isLoading) return <LoadingState />

  // Group questions by category
  const questionsByCategory = questions.reduce((acc, question) => {
    const categoryId = question.question.categoryId || 'uncategorized'
    if (!acc[categoryId]) {
      acc[categoryId] = []
    }
    acc[categoryId].push(question)
    return acc
  }, {} as Record<string, TestAttemptQuestion[]>)

  return (
    <div className="min-h-screen bg-gray-50">
      <TestHeader 
        totalQuestions={questions.length} 
        answeredQuestions={questions.filter(q => q.isAnswered).length} 
      />
      
      <div className="grid grid-cols-[300px_1fr] gap-6 p-6">
        <QuestionNavigation 
          questions={questions}
          currentQuestionId={currentQuestionId}
          onQuestionSelect={setCurrentQuestionId}
        />
        
        <main className="space-y-6">
          {Object.entries(questionsByCategory).map(([categoryId, categoryQuestions]) => (
            <CategorySection
              key={categoryId}
              categoryId={categoryId}
              questions={categoryQuestions}
              currentQuestionId={currentQuestionId}
              attemptId={params.attemptId}
            />
          ))}
        </main>
      </div>
    </div>
  )
}