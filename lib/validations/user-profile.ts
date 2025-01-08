//lib/validations/user-profile.ts

import * as z from "zod"

// Minimum age requirement (13 years)
const MIN_AGE = 13
const MAX_BIO_LENGTH = 500

// Function to check if a date indicates the user is at least MIN_AGE years old
function isOldEnough(dateStr: string | Date): boolean {
  const birthDate = new Date(dateStr)
  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1 >= MIN_AGE
  }
  return age >= MIN_AGE
}

export const profileCompletionSchema = z.object({
  dateOfBirth: z
    .union([z.string(), z.date(), z.null()])
    .nullable()
    .transform((val) => {
      if (!val) return null;
      if (val instanceof Date) return val;
      return new Date(val);
    })
    .refine((date) => !date || isOldEnough(date), {
      message: `You must be at least ${MIN_AGE} years old to use this service.`
    }),

  gender: z
    .enum(['male', 'female'])
    .nullable(),

  relationshipStatus: z
    .enum(['Single', 'Married', "In a relationship", "It's Complicated"])
    .nullable(),

  countryOfOrigin: z
    .string()
    .min(2, "Country name must be at least 2 characters")
    .max(100, "Country name cannot exceed 100 characters")
    .nullable(),
})

// Full profile schema including optional bio
export const userProfileSchema = profileCompletionSchema.extend({
  bio: z
    .string()
    .max(MAX_BIO_LENGTH, `Bio cannot exceed ${MAX_BIO_LENGTH} characters`)
    .nullable()
    .optional(),
})

export type ProfileCompletionFormValues = z.infer<typeof profileCompletionSchema>
export type UserProfileFormValues = z.infer<typeof userProfileSchema>