// app/(dashboards)/admindash/tests/components/question-form.tsx

"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QuestionTypeEnum, QuestionOption } from "@/types/test"
import { OptionsEditor } from "./options-editor"

interface QuestionFormProps {
  question: Partial<QuestionTypeEnum>
  onChange: (question: Partial<QuestionTypeEnum>) => void
}

export function QuestionForm({ question, onChange }: QuestionFormProps) {
  const [text, setText] = useState(question.text || "")
  const [type, setType] = useState<QuestionTypeEnum>(question.type || QuestionTypeEnum.MULTIPLE_CHOICE)
  const [options, setOptions] = useState<QuestionOption[]>(question.options || [])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    onChange({ ...question, text: e.target.value })
  }

  const handleTypeChange = (value: QuestionTypeEnum) => {
    setType(value)
    onChange({ ...question, type: value })
  }

  const handleOptionsChange = (newOptions: QuestionOption[]) => {
    setOptions(newOptions)
    onChange({ ...question, options: newOptions })
  }

  return (
    <div className="space-y-2 p-4 border rounded-md">
      <Input
        placeholder="Question text"
        value={text}
        onChange={handleTextChange}
      />
      <Select
        value={type}
        onValueChange={handleTypeChange}
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
      {type === QuestionTypeEnum.MULTIPLE_CHOICE && (
        <OptionsEditor options={options} onChange={handleOptionsChange} />
      )}
    </div>
  )
}