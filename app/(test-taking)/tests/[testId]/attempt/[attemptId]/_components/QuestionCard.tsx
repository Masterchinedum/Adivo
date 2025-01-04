// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/QuestionCard.tsx
"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface Option {
  id: string
  text: string
}

interface Question {
  id: string
  title: string
  options: Option[]
}

interface QuestionCardProps {
  question: Question
  questionNumber: number
  selectedOption?: string
  isAnswered: boolean
  onAnswerSelect: (optionId: string) => void
}

export function QuestionCard({
  question,
  questionNumber,
  selectedOption,
  isAnswered,
  onAnswerSelect
}: QuestionCardProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOptionSelect = async (optionId: string) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    
    try {
      await onAnswerSelect(optionId)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card 
      id={`question-${questionNumber}`} // Add this ID
      className={cn(
        "transition-all duration-200",
        isAnswered && "ring-2 ring-primary/10",
      )}
    >
      <CardHeader className="border-b bg-muted/40">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
            {questionNumber}
          </span>
          <span className="text-sm text-muted-foreground">
            {isAnswered ? "Answered" : "Not answered"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-base font-medium mb-4">{question.title}</p>
        
        <RadioGroup
          value={selectedOption}
          onValueChange={handleOptionSelect}
          className="space-y-3"
          disabled={isSubmitting}
        >
          {question.options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "flex items-center space-x-2 rounded-lg border p-4 transition-colors",
                selectedOption === option.id && "border-primary bg-primary/5",
              )}
            >
              <RadioGroupItem
                value={option.id}
                id={option.id}
                className="mt-0"
              />
              <Label
                htmlFor={option.id}
                className="flex-1 cursor-pointer text-base"
              >
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}