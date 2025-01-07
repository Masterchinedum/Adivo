//app/(dashboards)/dashboard/profile/components/ProfileHeader.tsx

"use client"

import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileHeader() {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.imageUrl} alt={user.fullName || ''} />
          <AvatarFallback>
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {user.fullName || 'Your Profile'}
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
      </div>
      <div className="border-b" />
    </div>
  )
}