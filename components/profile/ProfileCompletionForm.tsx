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
import { useProfileCompletion } from "@/lib/contexts/ProfileCompletionContext"

interface ProfileCompletionFormProps {
  profile: UserProfileFormValues | null
}

const defaultValues: Partial<UserProfileFormValues> = {
  dateOfBirth: null,
  gender: null,
  relationshipStatus: null,
  countryOfOrigin: null,
}

export function ProfileCompletionForm({ profile }: ProfileCompletionFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const { setShowProfileDialog, refreshProfile } = useProfileCompletion()

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: profile || defaultValues,
  })

  const onSubmit = async (data: UserProfileFormValues) => {
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

      await refreshProfile()
      toast.success("Profile saved successfully")
      setShowProfileDialog(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-6"
      >
        <CustomDatePicker form={form} />
        <GenderSelect form={form} />
        <RelationshipStatusSelect form={form} />
        <CountrySelect form={form} />
        
        <Button 
          type="submit"
          className="w-full transition-all duration-200 flex items-center justify-center min-h-[2.5rem] text-base font-medium
            hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed sm:text-sm"
          disabled={isLoading || !form.formState.isDirty}
          variant="default"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            'Complete Profile'
          )}
        </Button>
      </form>
    </Form>
  )
}