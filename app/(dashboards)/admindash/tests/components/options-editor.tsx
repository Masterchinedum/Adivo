// app/(dashboards)/admindash/tests/components/options-editor.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { QuestionOption } from "@/types/test"

interface OptionsEditorProps {
  options: QuestionOption[]
  onChange: (options: QuestionOption[]) => void
}

// Remove the QuestionFormProps interface as it's not used in this file

export function OptionsEditor({ options, onChange }: OptionsEditorProps) {
  const [newOption, setNewOption] = useState("")

  const handleAddOption = () => {
    if (newOption.trim() === "") return
    const updatedOptions = [...options, { id: crypto.randomUUID(), text: newOption, value: newOption }]
    onChange(updatedOptions)
    setNewOption("")
  }

  const handleOptionChange = (index: number, text: string) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, text, value: text } : option
    )
    onChange(updatedOptions)
  }

  const handleRemoveOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index)
    onChange(updatedOptions)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="New option"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
        />
        <Button type="button" onClick={handleAddOption}>
          Add Option
        </Button>
      </div>
      {options.map((option, index) => (
        <div key={option.id} className="flex items-center space-x-2">
          <Input
            value={option.text}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          <Button type="button" variant="destructive" onClick={() => handleRemoveOption(index)}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  )
}