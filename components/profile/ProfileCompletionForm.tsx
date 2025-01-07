//components/profile/ProfileCompletionForm.tsx

"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { userProfileSchema, type UserProfileFormValues } from "@/lib/validations/user-profile"
import { CustomDatePicker } from "@/app/(dashboards)/dashboard/profile/components/CustomDatePicker"
import { GenderSelect } from "@/app/(dashboards)/dashboard/profile/components/GenderSelect"
import { RelationshipStatusSelect } from "@/app/(dashboards)/dashboard/profile/components/RelationshipStatusSelect"
import { CountrySelect } from "@/app/(dashboards)/dashboard/profile/components/CountrySelect"
import { BioTextarea } from "@/app/(dashboards)/dashboard/profile/components/BioTextarea"

interface ProfileCompletionFormProps {
  profile: UserProfileFormValues | null
  onSuccess: () => Promise<void>
}

const defaultValues: Partial<UserProfileFormValues> = {
  dateOfBirth: null,
  gender: null,
  relationshipStatus: null,
  countryOfOrigin: null,
  bio: null,
}

export function ProfileCompletionForm({ profile, onSuccess }: ProfileCompletionFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: profile || defaultValues,
  })

  async function onSubmit(data: UserProfileFormValues) {
    setIsLoading(true)
    try {
      const method = profile ? "PATCH" : "POST"
      const formattedData = {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : null,
      }

      const response = await fetch("/api/dashboard/profile", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save profile")
      }

      await onSuccess()
      toast.success("Profile saved successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomDatePicker form={form} />
        <GenderSelect form={form} />
        <RelationshipStatusSelect form={form} />
        <CountrySelect form={form} />
        <BioTextarea form={form} />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </Form>
  )
}