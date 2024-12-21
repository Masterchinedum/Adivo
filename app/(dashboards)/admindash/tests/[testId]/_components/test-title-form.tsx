// app/(dashboards)/admindash/tests/[testId]/_components/test-title-form.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TestTitleFormProps {
  initialData: {
    title: string;
    id: string;
  }
}

export const TestTitleForm = ({ initialData }: TestTitleFormProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialData.title)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await fetch(`/api/admindash/tests/${initialData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      })
      router.refresh()
      setIsEditing(false)
    } catch (error) {
      console.error(error)
    }
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