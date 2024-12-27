// app/(dashboards)/admindash/tests/[id]/components/TestFormFields.tsx
import * as React from "react"
import { UseFormReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { QuestionList } from "./QuestionList"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
// import type { UpdateTestInput } from "@/types/tests/test"
import { TestFormValues } from "@/lib/validations/tests"

interface TestFormFieldsProps {
  form: UseFormReturn<TestFormValues>
}

export function TestFormFields({ form }: TestFormFieldsProps) {
  return (
    <div className="space-y-8">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter test title" 
                {...field} 
                value={field.value || ''} 
              />
            </FormControl>
            <FormDescription>
              Give your test a clear and descriptive title.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter test description (optional)"
                {...field}
                value={field.value || ''}
                rows={4}
              />
            </FormControl>
            <FormDescription>
              Provide additional details about the test.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="isPublished"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Published</FormLabel>
              <FormDescription>
                Make this test available to users
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value || false}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <div className="border-t pt-6">
        <QuestionList form={form} />
      </div>
    </div>
  )
}