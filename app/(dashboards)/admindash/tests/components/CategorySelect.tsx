// app/(dashboards)/admindash/tests/components/CategorySelect.tsx
"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import type { TestFormValues } from "@/lib/validations/tests"

interface CategorySelectProps {
  form: UseFormReturn<TestFormValues>
  questionIndex: number
  categories: Array<{
    id?: string
    name: string
    description?: string
  }>
}

export function CategorySelect({ form, questionIndex, categories }: CategorySelectProps) {
  return (
    <FormField
      control={form.control}
      name={`questions.${questionIndex}.categoryId`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value || ""} // Ensure a string value
            defaultValue=""
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {categories.map((category) => (
                <SelectItem 
                  key={category.id || category.name} 
                  value={category.id || category.name} // Ensure a string value
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}