// app/(dashboards)/admindash/tests/_components/test-form/form-submit.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface FormSubmitProps {
  isSubmitting: boolean
}

export const FormSubmit = ({ isSubmitting }: FormSubmitProps) => {
  return (
    <div className="flex justify-end">
      <Button 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "Creating..." : "Create Test"}
      </Button>
    </div>
  )
}