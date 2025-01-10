// app/(test-taking)/tests/[testId]/attempt/[attemptId]/_components/QuestionCard.tsx
"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { OptionCircle } from "@/components/ui/option-circle"
import { cn } from "@/lib/utils"
import { groupOptions } from "@/lib/utils/option-grouping"
import { OPTION_COLORS, OPTION_LABELS } from "@/lib/constants/option-labels"

interface QuestionCardProps {
  question: {
    id: string
    title: string
    options: {
      id: string
      text: string
    }[]
  }
  questionNumber: number
  selectedOption?: string
  isAnswered: boolean
  onAnswerSelect: (optionId: string) => void
  className?: string // Add this
}

export function QuestionCard({
  question,
  questionNumber,
  selectedOption,
  isAnswered,
  onAnswerSelect,
  className // Add this
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

  // Group options using the utility function
  const { leftGroup, middleOption, rightGroup } = groupOptions(question.options)

  return (
    <Card 
      id={`question-${questionNumber}`}
      className={cn(
        "transition-all duration-200",
        isAnswered && "ring-2 ring-primary/10",
        className // Add this
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
      
      <CardContent className="p-2 sm:p-4 md:p-6">
        <p className="text-base font-medium mb-4 md:mb-8">{question.title}</p>
        
        <div className="flex flex-col items-center space-y-4 md:space-y-8">
          {/* Labels */}
          <div className="flex justify-between w-full text-xs md:text-sm text-muted-foreground px-1 md:px-2">
            <span>{OPTION_LABELS.agree[0]}</span>
            <span>{OPTION_LABELS.disagree[0]}</span>
          </div>
          
          {/* Options Display */}
          <div className="flex items-center justify-center w-full">
            {/* Left Group (Agree) */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              {leftGroup.map((option, index) => (
                <OptionCircle
                  key={option.id}
                  position={index + 1}
                  totalInGroup={leftGroup.length}
                  groupType="left"
                  selected={selectedOption === option.id}
                  groupColor={OPTION_COLORS.agree}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={isSubmitting}
                />
              ))}
            </div>

            {/* Spacing between groups */}
            <div className="w-1 sm:w-2 md:w-3" />

            {/* Middle Option (if exists) */}
            {middleOption && (
              <div className="mx-1 sm:mx-2 md:mx-3">
                <OptionCircle
                  key={middleOption.id}
                  position={1}
                  totalInGroup={1}
                  groupType="middle"
                  selected={selectedOption === middleOption.id}
                  groupColor={OPTION_COLORS.neutral}
                  onClick={() => handleOptionSelect(middleOption.id)}
                  disabled={isSubmitting}
                />
              </div>
            )}

            {/* Spacing between groups */}
            <div className="w-1 sm:w-2 md:w-3" />

            {/* Right Group (Disagree) */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              {rightGroup.map((option, index) => (
                <OptionCircle
                  key={option.id}
                  position={index + 1}
                  totalInGroup={rightGroup.length}
                  groupType="right"
                  selected={selectedOption === option.id}
                  groupColor={OPTION_COLORS.disagree}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={isSubmitting}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}