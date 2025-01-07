//app/(dashboards)/dashboard/profile/components/ProfileForm.tsx

"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { userProfileSchema, type UserProfileFormValues } from "@/lib/validations/user-profile"
import { CustomDatePicker } from "./CustomDatePicker"
import { GenderSelect } from "./GenderSelect"
import { RelationshipStatusSelect } from "./RelationshipStatusSelect"
import { CountrySelect } from "./CountrySelect"
import { BioTextarea } from "./BioTextarea"

interface ProfileFormProps {
  profile: UserProfileFormValues | null
}

const defaultValues: UserProfileFormValues = {
  dateOfBirth: undefined,
  gender: null,
  relationshipStatus: null,
  countryOfOrigin: null,
  bio: null,
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: profile || defaultValues,
  })

  async function onSubmit(data: UserProfileFormValues) {
    setIsLoading(true)
    try {
      const method = profile ? "PATCH" : "POST"
      const response = await fetch("/api/dashboard/profile", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to save profile")
      }

      toast.success("Profile saved successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CustomDatePicker form={form} />
            <GenderSelect form={form} />
            <RelationshipStatusSelect form={form} />
            <CountrySelect form={form} />
            <BioTextarea form={form} />
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}