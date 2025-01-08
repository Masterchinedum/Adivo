// lib/utils/profile.ts

import type { UserProfile } from "@/types/user-profile"

export interface ProfileCompletionStatus {
  isComplete: boolean
  missingFields: string[]
  profile: UserProfile | null
  completionPercentage: number
}

const REQUIRED_FIELDS = {
  dateOfBirth: "Date of Birth",
  gender: "Gender",
  relationshipStatus: "Relationship Status",
  countryOfOrigin: "Country of Origin"
} as const

export function isProfileComplete(profile: UserProfile | null): ProfileCompletionStatus {
  if (!profile) {
    return {
      isComplete: false,
      missingFields: Object.values(REQUIRED_FIELDS),
      profile: null,
      completionPercentage: 0
    }
  }

  const missingFields = Object.entries(REQUIRED_FIELDS)
    .filter(([key]) => !profile[key as keyof UserProfile])
    .map(([, label]) => label)

  const completionPercentage = Math.round(
    ((Object.keys(REQUIRED_FIELDS).length - missingFields.length) / 
    Object.keys(REQUIRED_FIELDS).length) * 100
  )

  return {
    isComplete: missingFields.length === 0,
    missingFields,
    profile,
    completionPercentage
  }
}

export function getProfileCompletionPercentage(profile: UserProfile | null): number {
  if (!profile) return 0

  const requiredFields = ['dateOfBirth', 'gender', 'relationshipStatus', 'countryOfOrigin']
  const filledFields = requiredFields.filter(field => Boolean(profile[field as keyof UserProfile]))
  
  return Math.round((filledFields.length / requiredFields.length) * 100)
}