// app/(test-taking)/tests/[testId]/attempt/[attemptId]/page.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { type TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import { LoadingState } from "./_components/LoadingState"
import { TestHeader } from "./_components/TestHeader"
import { CategoryTabs } from "./_components/CategoryTabs"
import { QuestionCard } from "./_components/QuestionCard"
import { NavigationControls } from "./_components/NavigationControls"
import { CompletionDialog } from "./_components/CompletionDialog"

interface TestAttemptPageProps {
  params: Promise<{
    testId: string
    attemptId: string
  }>
}

export default function TestAttemptPage({ params }: TestAttemptPageProps) {
  const [questions, setQuestions] = useState<TestAttemptQuestion[]>([])
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("")
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [attemptId, setAttemptId] = useState<string>("")
  const [testId, setTestId] = useState<string>("")
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)

  const fetchQuestions = useCallback(async () => {
    if (!attemptId) return

    try {
      const response = await fetch(`/api/tests/attempt/${attemptId}/questions`)
      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Failed to fetch questions")

      setQuestions(data.questions)
      if (data.questions.length > 0) {
        setCurrentQuestionId(data.questions[0].id)
        setCurrentCategoryId(data.questions[0].question.categoryId || "uncategorized")
      }
    } catch (error) {
      console.error("Failed to load questions:", error)
    } finally {
      setIsLoading(false)
    }
  }, [attemptId])

  const handleAnswerSelect = useCallback(async (questionId: string, optionId: string) => {
    try {
      const response = await fetch(`/api/tests/attempt/${attemptId}/questions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, selectedOptionId: optionId })
      })

      if (!response.ok) throw new Error("Failed to save answer")

      setQuestions(prev => prev.map(q => 
        q.id === questionId 
          ? { ...q, selectedOptionId: optionId, isAnswered: true }
          : q
      ))
    } catch (error) {
      console.error("Error saving answer:", error)
    }
  }, [attemptId])

  // Resolve params since they're a Promise
  useEffect(() => {
    params.then(resolvedParams => {
      setAttemptId(resolvedParams.attemptId)
      setTestId(resolvedParams.testId)
    })
  }, [params])

  // Fetch questions when attemptId is available
  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  if (isLoading) return <LoadingState />

  // Group questions by category
  const questionsByCategory = questions.reduce((acc, question) => {
    const categoryId = question.question.categoryId || "uncategorized"
    if (!acc[categoryId]) {
      acc[categoryId] = {
        id: categoryId,
        name: question.question.category?.name || "Uncategorized",
        questions: [],
        totalQuestions: 0,
        answeredQuestions: 0
      }
    }
    acc[categoryId].questions.push(question)
    acc[categoryId].totalQuestions++
    if (question.isAnswered) {
      acc[categoryId].answeredQuestions++
    }
    return acc
  }, {} as Record<string, {
    id: string
    name: string
    questions: TestAttemptQuestion[]
    totalQuestions: number
    answeredQuestions: number
  }>)

  const categories = Object.values(questionsByCategory)
  const currentCategory = questionsByCategory[currentCategoryId]
  const totalQuestions = questions.length
  const answeredQuestions = questions.filter(q => q.isAnswered).length
  const currentCategoryProgress = currentCategory 
    ? (currentCategory.answeredQuestions / currentCategory.totalQuestions) * 100
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-6 pb-24">
        <TestHeader
          title="Test Taking"
          currentCategory={currentCategory?.name || ""}
          totalQuestions={totalQuestions}
          answeredQuestions={answeredQuestions}
          currentCategoryProgress={currentCategoryProgress}
        />

        <div className="container max-w-7xl mx-auto px-4 mt-6">
          <div className="mb-6">
            <CategoryTabs
              categories={categories}
              currentCategoryId={currentCategoryId}
              onCategoryChange={setCurrentCategoryId}
            />
          </div>

          <main className="space-y-6">
            {currentCategory?.questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={{
                  id: question.questionId,
                  title: question.question.title,
                  options: question.question.options.map(opt => ({
                    id: opt.id,
                    text: opt.text
                  }))
                }}
                questionNumber={index + 1}
                selectedOption={question.selectedOptionId || undefined}
                isAnswered={question.isAnswered}
                onAnswerSelect={(optionId) => handleAnswerSelect(question.questionId, optionId)}
              />
            ))}
          </main>
        </div>

        <div className="mt-6">
          <NavigationControls
            testId={testId}
            attemptId={attemptId}
            currentQuestionNumber={questions.findIndex(q => q.id === currentQuestionId) + 1}
            totalQuestions={totalQuestions}
            answeredQuestions={answeredQuestions}
            canGoNext={questions.findIndex(q => q.id === currentQuestionId) < questions.length - 1}
            canGoPrevious={questions.findIndex(q => q.id === currentQuestionId) > 0}
            onNext={() => {
              const currentIndex = questions.findIndex(q => q.id === currentQuestionId)
              if (currentIndex < questions.length - 1) {
                setCurrentQuestionId(questions[currentIndex + 1].id)
                setCurrentCategoryId(questions[currentIndex + 1].question.categoryId || "uncategorized")
              }
            }}
            onPrevious={() => {
              const currentIndex = questions.findIndex(q => q.id === currentQuestionId)
              if (currentIndex > 0) {
                setCurrentQuestionId(questions[currentIndex - 1].id)
                setCurrentCategoryId(questions[currentIndex - 1].question.categoryId || "uncategorized")
              }
            }}
          />
        </div>
      </div>

      <CompletionDialog
        isOpen={showCompletionDialog}
        onOpenChange={setShowCompletionDialog}
        testId={testId}
        attemptId={attemptId}
        questions={questions}
      />
    </div>
  )
}