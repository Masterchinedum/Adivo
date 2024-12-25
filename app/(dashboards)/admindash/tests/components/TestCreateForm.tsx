// app/(dashboards)/admindash/tests/components/TestCreateForm.tsx
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { TestFormValues, testSchema } from "@/lib/validations/tests"
import { TestFormFields } from "./TestFormFields"

const defaultValues: Partial<TestFormValues> = {
  title: "",
  description: "",
  isPublished: false,
}

export function TestCreateForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues,
  })

  async function onSubmit(data: TestFormValues) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create test")
      }

      toast.success("Test created successfully")
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
            {isLoading ? "Creating..." : "Create Test"}
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