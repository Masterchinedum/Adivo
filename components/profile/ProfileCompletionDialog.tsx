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
// Remove this import as it's no longer needed
// import { Progress } from "@/components/ui/progress"
// import { getProfileCompletionPercentage } from "@/lib/utils/profile"

export function ProfileCompletionDialog() {
  const { 
    showProfileDialog, 
    setShowProfileDialog,
    isProfileComplete,
    userProfile
  } = useProfileCompletion()

  // Prevent closing if profile is incomplete
  const handleOpenChange = (open: boolean) => {
    if (!isProfileComplete && !open) {
      return
    }
    setShowProfileDialog(open)
  }

  return (
    <Dialog open={showProfileDialog} onOpenChange={handleOpenChange}>
      <DialogContent className="
        sm:max-w-[425px] 
        max-h-[90vh] 
        overflow-y-auto 
        fixed 
        top-[50%] 
        left-[50%] 
        transform 
        -translate-x-1/2 
        -translate-y-1/2
        w-[95%]
        md:w-full
        rounded-lg
        p-4
        md:p-6
        gap-4
        bg-background
        shadow-lg
      ">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-xl font-semibold">
            Complete Your Profile
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Please complete your profile information to continue.
            This information helps us provide a better experience.
          </DialogDescription>
        </DialogHeader>

        {/* Remove the progress tracking div */}

        <div className="mt-4">
          <ProfileCompletionForm profile={userProfile} />
        </div>
      </DialogContent>
    </Dialog>
  )
}