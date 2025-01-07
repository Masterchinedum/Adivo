import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { isProfileComplete } from "@/lib/utils/profile"
import type { ProfileCompletionStatus } from "@/lib/utils/profile"
import type { UserProfile } from "@/types/user-profile"

export async function GET(): Promise<NextResponse<ProfileCompletionStatus | { error: string }>> {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: { profile: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Transform the profile data to match UserProfile type
    const userProfile: UserProfile | null = user.profile ? {
      ...user.profile,
      dateOfBirth: user.profile.dateOfBirth || null,
      gender: user.profile.gender as UserProfile['gender'],
      relationshipStatus: user.profile.relationshipStatus as UserProfile['relationshipStatus']
    } : null

    // Check profile completion status
    const completionStatus = isProfileComplete(userProfile)

    return NextResponse.json(completionStatus)
  } catch (error) {
    console.error("[PROFILE_COMPLETION_STATUS_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}