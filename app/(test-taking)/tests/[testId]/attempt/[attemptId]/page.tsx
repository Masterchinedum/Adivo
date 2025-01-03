// app/(test-taking)/tests/[testId]/attempt/[attemptId]/page.tsx
"use client"

import { useState, useEffect } from "react"
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

  // Resolve params since they're a Promise
  useEffect(() => {
    params.then(resolvedParams => {
      setAttemptId(resolvedParams.attemptId)
      setTestId(resolvedParams.testId)
    })
  }, [params])

  // Fetch questions when attemptId is available
  useEffect(() => {
    if (!attemptId) return

    fetch(`/api/tests/attempt/${attemptId}/questions`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions)
        if (data.questions.length > 0) {
          setCurrentQuestionId(data.questions[0].id)
          setCurrentCategoryId(data.questions[0].question.categoryId)
        }
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Failed to load questions:', error)
        setIsLoading(false)
      })
  }, [attemptId])

  if (isLoading) return <LoadingState />

  // Group questions by category
  const questionsByCategory = questions.reduce((acc, question) => {
    const categoryId = question.question.categoryId || 'uncategorized'
    if (!acc[categoryId]) {
      acc[categoryId] = {
        id: categoryId,
        name: question.question.category?.name || 'Uncategorized',
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

  const handleNavigateQuestion = (direction: 'next' | 'previous') => {
    const currentIndex = questions.findIndex(q => q.id === currentQuestionId)
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
    
    if (newIndex >= 0 && newIndex < questions.length) {
      const newQuestion = questions[newIndex]
      setCurrentQuestionId(newQuestion.id)
      setCurrentCategoryId(newQuestion.question.categoryId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[144px]"> {/* Adjust for fixed header */}
      <TestHeader
        title="Test Taking"
        currentCategory={currentCategory?.name || ""}
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        currentCategoryProgress={currentCategoryProgress}
      />

      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <CategoryTabs
            categories={categories}
            currentCategoryId={currentCategoryId}
            onCategoryChange={setCurrentCategoryId}
          />
        </div>

        <main className="space-y-6 pb-24"> {/* Add padding for fixed navigation */}
          {currentCategory?.questions.map(question => (
            <QuestionCard
              key={question.id}
              question={question}
              isActive={currentQuestionId === question.id}
              attemptId={attemptId}
            />
          ))}
        </main>

        <NavigationControls
          testId={testId}
          attemptId={attemptId}
          currentQuestionNumber={questions.findIndex(q => q.id === currentQuestionId) + 1}
          totalQuestions={totalQuestions}
          answeredQuestions={answeredQuestions}
          canGoNext={questions.findIndex(q => q.id === currentQuestionId) < questions.length - 1}
          canGoPrevious={questions.findIndex(q => q.id === currentQuestionId) > 0}
          onNext={() => handleNavigateQuestion('next')}
          onPrevious={() => handleNavigateQuestion('previous')}
        />

        <CompletionDialog
          isOpen={showCompletionDialog}
          onOpenChange={setShowCompletionDialog}
          testId={testId}
          attemptId={attemptId}
          questions={questions}
        />
      </div>
    </div>
  )
}