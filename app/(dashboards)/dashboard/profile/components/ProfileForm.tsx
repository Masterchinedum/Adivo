"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { userProfileSchema, type UserProfileFormValues } from "@/lib/validations/user-profile"
import { DatePickerField } from "./DatePickerField"
import { GenderSelect } from "./GenderSelect"
import { RelationshipStatusSelect } from "./RelationshipStatusSelect"
import { CountrySelect } from "./CountrySelect"
import { BioTextarea } from "./BioTextarea"

const defaultValues: UserProfileFormValues = {
  dateOfBirth: null,
  gender: null,
  relationshipStatus: null,
  countryOfOrigin: null,
  bio: null,
}

export function ProfileForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isProfileLoaded, setIsProfileLoaded] = React.useState(false)

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: async () => {
      try {
        const response = await fetch("/api/dashboard/profile")
        if (!response.ok) {
          toast.error("Failed to load profile")
          return defaultValues
        }
        const data = await response.json()
        
        setIsProfileLoaded(true)
        return {
          dateOfBirth: data?.dateOfBirth ? new Date(data.dateOfBirth) : null,
          gender: data?.gender as UserProfileFormValues['gender'],
          relationshipStatus: data?.relationshipStatus as UserProfileFormValues['relationshipStatus'],
          countryOfOrigin: data?.countryOfOrigin || null,
          bio: data?.bio || null,
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to load profile")
        return defaultValues
      }
    }
  })

  async function onSubmit(data: UserProfileFormValues) {
    setIsLoading(true)
    try {
      const method = isProfileLoaded ? "PATCH" : "POST"
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
            <DatePickerField form={form} />
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