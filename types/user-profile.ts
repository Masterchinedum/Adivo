//types/user-profile.ts

export interface UserProfile {
  id: string
  dateOfBirth: Date | undefined
  gender: 'male' | 'female' | null
  relationshipStatus: 'Single' | 'Married' | "It's Complicated" | null
  countryOfOrigin: string | null
  bio: string | null
  createdAt: Date
  updatedAt: Date
  userId: string
}

export type CreateUserProfileInput = Omit<
  UserProfile,
  'id' | 'createdAt' | 'updatedAt'
>

export type UpdateUserProfileInput = Partial<CreateUserProfileInput>