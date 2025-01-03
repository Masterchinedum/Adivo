// components/CategoryProgress.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { type TestAttemptQuestion } from "@/types/tests/test-attempt-question"

interface CategoryProgressProps {
  questions: TestAttemptQuestion[]
  currentQuestion: number
}

interface CategoryProgress {
  name: string
  total: number
  answered: number
}

export function CategoryProgress({ 
  questions,
  currentQuestion 
}: CategoryProgressProps) {
  // Group questions by category
  const categories = questions.reduce<Record<string, CategoryProgress>>((acc, question) => {
    const categoryId = question.question.categoryId || 'uncategorized'
    if (!acc[categoryId]) {
      acc[categoryId] = {
        name: question.question.category?.name || 'Uncategorized',
        total: 0,
        answered: 0
      }
    }
    acc[categoryId].total++
    if (question.isAnswered) {
      acc[categoryId].answered++
    }
    return acc
  }, {})

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Category Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(categories).map(([id, category]) => (
          <div key={id} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{category.name}</span>
              <span className="text-muted-foreground">
                {category.answered}/{category.total} Questions
              </span>
            </div>
            <Progress 
              value={(category.answered / category.total) * 100} 
              className="h-2"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}