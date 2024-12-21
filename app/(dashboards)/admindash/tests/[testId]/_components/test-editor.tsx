// app/(dashboards)/admindash/tests/[testId]/_components/test-editor.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { TestTitleForm } from "./test-title-form"
import { TestDescription } from "./test-description"
import { CategoryEditor } from "./category-editor"
import { TestActions } from "./test-actions"
import { Test } from "@/types/test"

interface TestEditorProps {
  initialData: Test
}

export const TestEditor = ({ initialData }: TestEditorProps) => {
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)

  const onPublish = async () => {
    try {
      setIsPublishing(true)
      await fetch(`/api/admindash/tests/${initialData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: true })
      })
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <TestTitleForm 
            initialData={{
              title: initialData.title,
              id: initialData.id
            }}
          />
          <TestDescription 
            initialData={{
              description: initialData.description || "",
              id: initialData.id
            }}
          />
        </div>
        <TestActions 
          testId={initialData.id} 
          isPublished={initialData.isPublished}
        />
      </div>
      <CategoryEditor 
        testId={initialData.id}
        initialCategories={initialData.categories}
      />
    </div>
  )
}