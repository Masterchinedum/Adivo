// app/(dashboards)/admindash/tests/_components/test-form/test-form.tsx
"use client"

import { TestHeader } from "./test-header"
import { CategoryList } from "./category-list"
import { FormSubmit } from "./form-submit"

export const TestForm = () => {
  return (
    <div className="space-y-6 p-6">
      <TestHeader />
      <CategoryList />
      <FormSubmit />
    </div>
  )
}