// app/(dashboards)/admindash/tests/_components/test-form/form-submit.tsx
"use client"

import { Button } from "@/components/ui/button"

export const FormSubmit = () => {
  return (
    <div className="flex justify-end">
      <Button type="submit">
        Create Test
      </Button>
    </div>
  )
}