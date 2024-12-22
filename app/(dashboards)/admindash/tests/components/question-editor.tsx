// app/(dashboards)/admindash/tests/components/question-editor.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QuestionType, QuestionTypeEnum } from "@/types/test"

export function QuestionEditor() {
  const [questions, setQuestions] = useState<Partial<QuestionType>[]>([])

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        type: QuestionTypeEnum.MULTIPLE_CHOICE,
        order: questions.length,
        options: []
      }
    ])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Questions</h3>
        <Button onClick={addQuestion} type="button">
          Add Question
        </Button>
      </div>

      {questions.map((question, index) => (
        <div key={index} className="space-y-2 p-4 border rounded-md">
          <Input
            placeholder="Question text"
            value={question.text}
            onChange={(e) => {
              const newQuestions = [...questions]
              newQuestions[index].text = e.target.value
              setQuestions(newQuestions)
            }}
          />
          <Select
            value={question.type}
            onValueChange={(value) => {
              const newQuestions = [...questions]
              newQuestions[index].type = value as QuestionTypeEnum
              setQuestions(newQuestions)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select question type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={QuestionTypeEnum.MULTIPLE_CHOICE}>
                Multiple Choice
              </SelectItem>
              <SelectItem value={QuestionTypeEnum.CHECKBOX}>
                Checkbox
              </SelectItem>
              <SelectItem value={QuestionTypeEnum.SCALE}>
                Scale
              </SelectItem>
              <SelectItem value={QuestionTypeEnum.TEXT}>
                Text
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  )
}