//lib/validations/user-profile.ts

import * as z from "zod"

export const userProfileSchema = z.object({
  dateOfBirth: z
    .union([z.string(), z.date(), z.null()])
    .nullable()
    .transform((val) => {
      if (!val) return null;
      // If it's already a Date object, return it
      if (val instanceof Date) return val;
      // If it's a string, convert it to Date
      return new Date(val);
    }),
  gender: z.enum(['male', 'female']).nullable(),
  relationshipStatus: z.enum(['Single', 'Married', "It's Complicated"]).nullable(),
  countryOfOrigin: z.string().min(2).max(100).nullable(),
  bio: z.string().max(500).nullable(),
})

export const updateUserProfileSchema = userProfileSchema.partial()

export type UserProfileFormValues = z.infer<typeof userProfileSchema>
export type UpdateUserProfileFormValues = z.infer<typeof updateUserProfileSchema>