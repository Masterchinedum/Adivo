// app/(dashboards)/admindash/tests/components/test-form.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { QuestionEditor } from "./question-editor"
import { AlertDialog, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog"
import { QuestionType } from "@/types/test"

export default function TestForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState<Partial<QuestionType>[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  
  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Validate form
      if (!title) throw new Error("Title is required")
      if (questions.length === 0) throw new Error("At least one question is required")
      
      const response = await fetch('/api/admin/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          questions: questions.map((q, index) => ({
            ...q,
            order: index,
          })),
          isPublished: publish,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create test')
      }

      const data = await response.json()
      router.push('/admindash/tests')
      router.refresh()
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Test Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Test Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <QuestionEditor
          questions={questions}
          onChange={setQuestions}
        />
      </div>

      {error && (
        <AlertDialog open={!!error} onOpenChange={() => setError("")}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{error}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={() => setError("")}>Close</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="flex justify-end gap-4">
        <Button 
          type="submit" 
          variant="outline" 
          disabled={isSubmitting}
        >
          Save as Draft
        </Button>
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={(e) => handleSubmit(e, true)}
        >
          Publish Test
        </Button>
      </div>
    </form>
  )
}