//app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/QuestionDisplay.tsx

import { useState } from "react"
import { type TestAttemptQuestion } from "@/types/tests/test-attempt-question"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionDisplayProps {
  question?: TestAttemptQuestion
  attemptId: string
}

export function QuestionDisplay({ question, attemptId }: QuestionDisplayProps) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    question?.selectedOptionId ?? undefined
  )

  const handleOptionSelect = async (optionId: string) => {
    try {
      setSelectedOption(optionId)
      
      const response = await fetch(`/api/tests/attempt/${attemptId}/questions`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          questionId: question?.id,
          selectedOptionId: optionId
        })
      })

      if (!response.ok) {
        throw new Error("Failed to save answer")
      }
    } catch (error) {
      console.error("Error saving answer:", error)
      // Revert selection on error
      setSelectedOption(question?.selectedOptionId ?? undefined)
    }
  }

  if (!question) return null

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{question.question.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedOption}
          onValueChange={handleOptionSelect}
          className="space-y-3"
        >
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