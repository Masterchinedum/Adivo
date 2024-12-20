// app/(dashboards)/admindash/tests/[testId]/_components/test-editor.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { TestTitleForm } from "./test-title-form"
import { TestDescription } from "./test-description"
import { CategoryEditor } from "./category-editor"

interface TestEditorProps {
  testId: string
}

export const TestEditor = ({ testId }: TestEditorProps) => {
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)

  const onPublish = async () => {
    try {
      setIsPublishing(true)
      // TODO: Implement publish functionality
    } catch (error) {
      console.error(error)
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="grid gap-8">
      <div>
        <TestTitleForm testId={testId} />
        <TestDescription testId={testId} />
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Test Structure</h2>
          <Button
            onClick={onPublish}
            disabled={isPublishing}
          >
            Publish Test
          </Button>
        </div>
        <CategoryEditor testId={testId} />
      </div>
    </div>
  )
}