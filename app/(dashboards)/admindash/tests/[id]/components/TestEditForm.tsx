// app/(dashboards)/admindash/tests/[id]/components/TestEditForm.tsx
'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { TestFormFields } from '../../components/TestFormFields'
import { updateTestSchema, type UpdateTestFormValues } from '@/lib/validations/tests'
import type { Test } from '@/types/tests/test'

interface TestEditFormProps {
  test: Test
}

export function TestEditForm({ test }: TestEditFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<UpdateTestFormValues>({
    resolver: zodResolver(updateTestSchema),
    defaultValues: {
      id: test.id,
      title: test.title || '',
      description: test.description || '',
      isPublished: test.isPublished || false
    }
  })

  async function onSubmit(data: UpdateTestFormValues) {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/tests/${test.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to update test')
      }

      toast.success('Test updated successfully')
      router.refresh()
      router.push('/admindash/tests')
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TestFormFields form={form} />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Test"}
        </Button>
      </form>
    </Form>
  )
}