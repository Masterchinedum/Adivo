// app/(dashboards)/admindash/tests/[id]/components/TestEditForm.tsx
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { updateTestSchema } from "@/lib/validations/tests"
import { TestFormFields } from "./TestFormFields"
import type { Test, UpdateTestInput } from "@/types/tests/test"

interface TestEditFormProps {
  test: Test
}

export function TestEditForm({ test }: TestEditFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<UpdateTestInput>({
    resolver: zodResolver(updateTestSchema),
    defaultValues: {
      id: test.id,
      title: test.title,
      description: test.description,
      isPublished: test.isPublished,
      categories: test.categories?.map(category => ({
        id: category.id,
        name: category.name,
        description: category.description,
        scale: category.scale || 100,
        questions: category.questions?.map(question => ({
          id: question.id,
          title: question.title,
          options: question.options?.map(option => ({
            id: option.id,
            text: option.text,
            point: option.point || 0
          }))
        }))
      })) || []
    }
  });

  async function onSubmit(data: UpdateTestInput) {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/tests/${test.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error("Failed to update test")
      }

      toast.success("Test updated successfully")
      router.push("/admindash/tests")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TestFormFields form={form} />
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}