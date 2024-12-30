// components/test/QuestionCard.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { OptionsList } from "./OptionsList"
import type { Question } from "@/types/tests/question"

interface QuestionCardProps {
  question: Question
  selectedOptionId?: string
  onSelectOption: (optionId: string) => void
  isSubmitting?: boolean
}

export function QuestionCard({
  question,
  selectedOptionId,
  onSelectOption,
  isSubmitting
}: QuestionCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-lg font-semibold">{question.title}</h2>
      </CardHeader>
      <CardContent>
        <OptionsList
          options={question.options || []} // Add fallback empty array
          selectedOptionId={selectedOptionId}
          onSelect={onSelectOption}
          disabled={isSubmitting}
        />
      </CardContent>
    </Card>
  )
}