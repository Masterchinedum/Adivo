//app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/QuestionNavigation.tsx

import { type TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import { cn } from "@/lib/utils"

interface QuestionNavigationProps {
  questions: TestAttemptQuestion[]
  currentQuestionId: string
  onQuestionSelect: (questionId: string) => void
}

export function QuestionNavigation({ 
  questions, 
  currentQuestionId, 
  onQuestionSelect 
}: QuestionNavigationProps) {
  return (
    <nav className="border-r p-4 h-screen overflow-auto">
      <h2 className="font-semibold mb-4">Questions</h2>
      <div className="space-y-2">
        {questions.map((question, index) => (
          <button
            key={question.id}
            className={cn(
              "w-full text-left p-3 rounded-lg hover:bg-gray-100",
              question.isAnswered && "bg-green-50 hover:bg-green-100",
              question.id === currentQuestionId && "ring-2 ring-blue-500"
            )}
            onClick={() => onQuestionSelect(question.id)}
          >
            {index + 1}. {question.question.title}
          </button>
        ))}
      </div>
    </nav>
  )
}