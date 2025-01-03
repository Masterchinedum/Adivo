//app/(test-taking)/tests/[testId]/attempt/[attemptId]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { TestHeader } from "./components/TestHeader"
import { QuestionCard } from "./components/QuestionCard"
import { NavigationControls } from "./components/NavigationControls"
import { CategoryProgress } from "./components/CategoryProgress"

const Page = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState([])

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Test Header with Progress */}
        <TestHeader 
          currentQuestion={currentQuestion} 
          totalQuestions={questions.length}
        />

        {/* Category Progress */}
        <CategoryProgress 
          questions={questions}
          currentQuestion={currentQuestion} 
        />

        {/* Main Question Area */}
        <QuestionCard
          question={questions[currentQuestion]}
          isLoading={isLoading}
        />

        {/* Navigation Controls */}
        <NavigationControls
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          onNext={() => setCurrentQuestion(prev => prev + 1)}
          onPrevious={() => setCurrentQuestion(prev => prev - 1)}
        />
      </div>
    </div>
  )
}

export default Page