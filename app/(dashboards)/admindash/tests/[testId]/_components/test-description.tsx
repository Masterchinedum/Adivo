// app/(dashboards)/admindash/tests/[testId]/_components/test-description.tsx
"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface TestDescriptionProps {
  testId: string
}

export const TestDescription = ({ testId }: TestDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState("No description")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement description update
    setIsEditing(false)
  }

  return isEditing ? (
    <form onSubmit={onSubmit} className="space-y-2">
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-2"
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
    <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
      <p>{description}</p>
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