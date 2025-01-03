import { useState } from "react"
import { type TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import { QuestionNavigation } from "./QuestionNavigation"
import { QuestionDisplay } from "./QuestionDisplay"
import { TestProgress } from "./TestProgress"
import { LoadingState } from "./LoadingState"

interface TestLayoutProps {
  attemptId: string
  questions?: TestAttemptQuestion[]
  isLoading: boolean
}

export function TestLayout({ attemptId, questions = [], isLoading }: TestLayoutProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState(questions[0]?.id || "")

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <div className="grid grid-cols-[300px_1fr] h-screen">
      <QuestionNavigation 
        questions={questions}
        currentQuestionId={currentQuestionId}
        onQuestionSelect={setCurrentQuestionId}
      />
      <main className="p-6 overflow-auto">
        <TestProgress total={questions.length} answered={questions.filter(q => q.isAnswered).length} />
        <QuestionDisplay 
          question={questions.find(q => q.id === currentQuestionId)} 
          attemptId={attemptId} 
        />
      </main>
    </div>
  )
}