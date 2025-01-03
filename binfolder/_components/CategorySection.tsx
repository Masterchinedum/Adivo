// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/CategorySection.tsx
import { type TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuestionCard } from "./QuestionCard"

interface CategorySectionProps {
  categoryId: string
  questions: TestAttemptQuestion[]
  currentQuestionId: string
  attemptId: string
}

export function CategorySection({ 
  categoryId, 
  questions, 
  currentQuestionId,
  attemptId 
}: CategorySectionProps) {
  const categoryName = categoryId === 'uncategorized' ? 'Uncategorized' : questions[0]?.question.category?.name || 'Unknown Category'

  return (
    <Card>
      <CardHeader>
        <CardTitle>{categoryName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            isActive={question.id === currentQuestionId}
            attemptId={attemptId}
          />
        ))}
      </CardContent>
    </Card>
  )
}