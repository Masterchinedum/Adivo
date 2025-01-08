//app/(dashboards)/dashboard/profile/components/RelationshipStatusSelect.tsx

"use client"

import * as React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { UserProfileFormValues } from "@/lib/validations/user-profile"

interface RelationshipStatusSelectProps {
  form: UseFormReturn<UserProfileFormValues>
}

const RELATIONSHIP_STATUSES = [
  "Single",
  "Married",
  "In a relationship",
  "It's Complicated"
] as const

export function RelationshipStatusSelect({ form }: RelationshipStatusSelectProps) {
  return (
    <FormField
      control={form.control}
      name="relationshipStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Relationship Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your relationship status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {RELATIONSHIP_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
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