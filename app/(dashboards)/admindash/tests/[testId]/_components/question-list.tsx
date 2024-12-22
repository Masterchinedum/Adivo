// app/(dashboards)/admindash/tests/[testId]/_components/question-list.tsx
"use client"

import { useState } from "react"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuestionItem } from "./question-item"
import { QuestionType } from "@/types/test"
import { toast } from "react-hot-toast"

interface QuestionListProps {
  testId: string
  categoryId: string
  questions: QuestionType[]
}

export const QuestionList = ({ testId, categoryId, questions: initialQuestions }: QuestionListProps) => {
  const [questions, setQuestions] = useState<QuestionType[]>(initialQuestions)
  const [isLoading, setIsLoading] = useState(false)

  const addQuestion = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admindash/tests/${testId}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: "New Question",
          type: "multiple_choice",
          categoryId,
          order: questions.length
        })
      })

      if (!response.ok) throw new Error("Failed to create question")

      const newQuestion = await response.json()
      setQuestions(prev => [...prev, newQuestion])
      toast.success("Question added")
    } catch (error) {
      console.error(error)
      toast.error("Failed to add question")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Questions</h4>
        <Button
          onClick={addQuestion}
          variant="outline"
          size="sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          Add Question
        </Button>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <QuestionItem
            key={question.id}
            testId={testId}
            question={question}
            onUpdate={(updatedQuestion) => {
              setQuestions(questions.map(q =>
                q.id === updatedQuestion.id ? updatedQuestion : q
              ))
            }}
            onDelete={(deletedId) => {
              setQuestions(questions.filter(q => q.id !== deletedId))
            }}
          />
        ))}
        {questions.length === 0 && (
          <div className="text-center text-sm text-muted-foreground p-4">
            No questions yet. Click "Add Question" to create one.
          </div>
        )}
      </div>
    </div>
  )
}