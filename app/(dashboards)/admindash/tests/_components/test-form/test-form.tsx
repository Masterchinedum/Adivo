// app/(dashboards)/admindash/tests/_components/test-form/test-form.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TestHeader } from "./test-header"
import { CategoryList } from "./category-list"
import { FormSubmit } from "./form-submit"
import { z } from "zod"
import { createTestSchema } from "@/lib/validations/test"
import { QuestionTypeEnum } from "@/types/test"

export const TestForm = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    categories: [] as {
      id: string;
      title: string;
      description?: string;
      questions: Array<{
        id: string;
        text: string;
        type: QuestionTypeEnum;
      }>;
    }[]
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      
      // First create the test
      const response = await fetch("/api/admindash/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formState.title,
          description: formState.description
        })
      })

      if (!response.ok) {
        throw new Error("Failed to create test")
      }

      const test = await response.json()

      // Then create categories and their questions
      for (const category of formState.categories) {
        const categoryResponse = await fetch(`/api/admindash/tests/${test.id}/categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: category.title,
            description: category.description
          })
        })

        if (!categoryResponse.ok) continue

        const newCategory = await categoryResponse.json()

        // Create questions for this category
        for (const question of category.questions) {
          await fetch(`/api/admindash/tests/${test.id}/questions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...question,
              categoryId: newCategory.id
            })
          })
        }
      }

      router.push(`/admindash/tests/${test.id}`)
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 p-6">
      <TestHeader 
        title={formState.title}
        description={formState.description}
        onChange={(values) => setFormState(prev => ({...prev, ...values}))}
      />
      <CategoryList
        categories={formState.categories}
        onChange={(categories) => setFormState(prev => ({...prev, categories}))}
      />
      <FormSubmit isSubmitting={isSubmitting} />
    </form>
  )
}