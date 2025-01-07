//lib/validations/user-profile.ts

import * as z from "zod"

export const userProfileSchema = z.object({
  dateOfBirth: z.date().nullable(), // Change to nullable instead of optional
  gender: z.enum(['male', 'female']).nullable(),
  relationshipStatus: z.enum(['Single', 'Married', "It's Complicated"]).nullable(),
  countryOfOrigin: z.string().min(2).max(100).nullable(),
  bio: z.string().max(500).nullable(),
})

export const updateUserProfileSchema = userProfileSchema.partial()

export type UserProfileFormValues = z.infer<typeof userProfileSchema>
export type UpdateUserProfileFormValues = z.infer<typeof updateUserProfileSchema>