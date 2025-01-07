//components/profile/ProfileCompletionDialog.tsx

"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { ProfileCompletionForm } from "./ProfileCompletionForm"
import { useProfileCompletion } from "@/lib/contexts/ProfileCompletionContext"
import { Progress } from "@/components/ui/progress"
import { getProfileCompletionPercentage } from "@/lib/utils/profile"

export function ProfileCompletionDialog() {
  const { 
    showProfileDialog, 
    isProfileComplete,
    userProfile,
    refreshProfile 
  } = useProfileCompletion()

  // Prevent closing if profile is incomplete
  const handleOpenChange = (open: boolean) => {
    if (!isProfileComplete && !open) {
      return // Prevent closing
    }
  }

  return (
    <Dialog open={showProfileDialog} onOpenChange={handleOpenChange}>
      <DialogContent 
        className="sm:max-w-[425px]"
        // Remove showClose prop as it's not supported
      >
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please complete your profile information to continue.
            This information helps us provide a better experience.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Profile Completion</span>
            <span>{getProfileCompletionPercentage(userProfile)}%</span>
          </div>
          <Progress 
            value={getProfileCompletionPercentage(userProfile)} 
            className="h-2"
          />
        </div>

        <ProfileCompletionForm 
          profile={userProfile}
          onSuccess={refreshProfile}
        />
      </DialogContent>
    </Dialog>
  )
}