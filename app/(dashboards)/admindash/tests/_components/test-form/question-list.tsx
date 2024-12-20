// app/(dashboards)/admindash/tests/_components/test-form/question-list.tsx
"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuestionItem } from "./question-item"

interface QuestionListProps {
  categoryId: string
}

export const QuestionList = ({ categoryId }: QuestionListProps) => {
  const [questions, setQuestions] = useState<string[]>([])

  const addQuestion = () => {
    setQuestions(prev => [...prev, `question-${prev.length}`])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Questions</h4>
        <Button 
          onClick={addQuestion}
          variant="outline" 
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>
      
      <div className="space-y-4">
        {questions.map((id) => (
          <QuestionItem key={id} id={id} />
        ))}
      </div>
    </div>
  )
}