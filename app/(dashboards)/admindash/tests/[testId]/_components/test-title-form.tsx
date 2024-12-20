// app/(dashboards)/admindash/tests/[testId]/_components/test-title-form.tsx
"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TestTitleFormProps {
  testId: string
}

export const TestTitleForm = ({ testId }: TestTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState("Untitled Test")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement title update
    setIsEditing(false)
  }

  return isEditing ? (
    <form onSubmit={onSubmit} className="space-y-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="font-bold text-2xl"
      />
      <div className="flex items-center gap-x-2">
        <Button type="submit">
          Save
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  ) : (
    <div className="flex items-center gap-x-2 font-bold text-2xl">
      <h1>{title}</h1>
      <Button
        onClick={() => setIsEditing(true)}
        variant="ghost"
        size="sm"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  )
}