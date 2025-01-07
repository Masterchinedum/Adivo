//lib/contexts/ProfileCompletionContext.tsx

"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from "@clerk/nextjs"
import type { UserProfile } from "@/types/user-profile"

interface ProfileCompletionContextType {
  isProfileComplete: boolean
  showProfileDialog: boolean
  setShowProfileDialog: (show: boolean) => void
  userProfile: UserProfile | null
  refreshProfile: () => Promise<void>
}

const ProfileCompletionContext = createContext<ProfileCompletionContextType | undefined>(undefined)

export function ProfileCompletionProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { user, isLoaded: isUserLoaded } = useUser()
  const [isProfileComplete, setIsProfileComplete] = useState(true)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/dashboard/profile')
      if (!response.ok) throw new Error('Failed to fetch profile')
      const profile = await response.json()
      setUserProfile(profile)
      
      // Check if all required fields are filled
      const isComplete = Boolean(
        profile?.dateOfBirth &&
        profile?.gender &&
        profile?.relationshipStatus &&
        profile?.countryOfOrigin &&
        profile?.bio
      )
      
      setIsProfileComplete(isComplete)
      setShowProfileDialog(!isComplete)
    } catch (error) {
      console.error('Error fetching profile:', error)
      setIsProfileComplete(false)
    }
  }

  useEffect(() => {
    if (isUserLoaded && user) {
      fetchProfile()
    }
  }, [isUserLoaded, user])

  const value = {
    isProfileComplete,
    showProfileDialog,
    setShowProfileDialog,
    userProfile,
    refreshProfile: fetchProfile
  }

  return (
    <ProfileCompletionContext.Provider value={value}>
      {children}
    </ProfileCompletionContext.Provider>
  )
}

export function useProfileCompletion() {
  const context = useContext(ProfileCompletionContext)
  if (context === undefined) {
    throw new Error('useProfileCompletion must be used within a ProfileCompletionProvider')
  }
  return context
}