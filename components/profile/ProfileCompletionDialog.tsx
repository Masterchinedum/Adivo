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
        max-h-[85vh] 
        overflow-y-auto 
        fixed 
        top-[50%] 
        left-[50%] 
        transform 
        -translate-x-1/2 
        -translate-y-1/2
        w-[90%]
        md:w-full
        rounded-lg
        p-3
        sm:p-4
        md:p-6
        gap-3
        sm:gap-4
        bg-background
        shadow-lg
        mx-auto
        my-4
        sm:my-6
      ">
        <DialogHeader className="space-y-3 sm:space-y-4">
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            Complete Your Profile
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Please complete your profile information to continue.
            This information helps us provide a better experience.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3 sm:mt-4">
          <ProfileCompletionForm profile={userProfile} />
        </div>
      </DialogContent>
    </Dialog>
  )
}