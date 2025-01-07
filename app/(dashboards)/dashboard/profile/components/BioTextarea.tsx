//app/(dashboards)/dashboard/profile/components/BioTextarea.tsx

"use client"

import * as React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { UseFormReturn } from "react-hook-form"
import { UserProfileFormValues } from "@/lib/validations/user-profile"

interface BioTextareaProps {
  form: UseFormReturn<UserProfileFormValues>
}

export function BioTextarea({ form }: BioTextareaProps) {
  const [charCount, setCharCount] = React.useState(0)
  const maxLength = 500

  return (
    <FormField
      control={form.control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <Textarea
                {...field}
                value={field.value ?? ''} // Convert null to empty string
                placeholder="Tell us about yourself..."
                className="resize-none"
                rows={5}
                maxLength={maxLength}
                onChange={e => {
                  setCharCount(e.target.value.length)
                  field.onChange(e)
                }}
              />
              <div className="text-xs text-muted-foreground text-right">
                {charCount}/{maxLength} characters
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}