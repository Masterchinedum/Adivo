//lib/utils/validation.ts

import type { UserProfile } from "@/types/user-profile"
import { userProfileSchema } from "@/lib/validations/user-profile"

export function getProfileErrors(profile: UserProfile | null): string[] {
  if (!profile) return ["Profile not found"]

  try {
    userProfileSchema.parse(profile)
    return []
  } catch (error) {
    if (error instanceof Error) {
      return [error.message]
    }
    return ["Invalid profile data"]
  }
}

export function isProfileValid(profile: UserProfile | null): boolean {
  return getProfileErrors(profile).length === 0
}