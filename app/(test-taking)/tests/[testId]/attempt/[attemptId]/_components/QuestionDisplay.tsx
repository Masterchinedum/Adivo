//app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/QuestionDisplay.tsx

import { type TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionDisplayProps {
  question?: TestAttemptQuestion
  attemptId: string
}

export function QuestionDisplay({ question, attemptId }: QuestionDisplayProps) {
  if (!question) return null

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{question.question.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue={question.selectedOptionId}>
          {question.question.options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id}>{option.text}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}