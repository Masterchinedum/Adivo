// app/api/dashboard/profile/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { userProfileSchema } from "@/lib/validations/user-profile"
import type { UserProfile} from "@/types/user-profile"

type APIResponse<T> = NextResponse<T | { error: string, details?: unknown }>

// GET - Fetch user profile
export async function GET(): Promise<APIResponse<UserProfile | null>> {
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

    return NextResponse.json(user.profile as UserProfile | null)
  } catch (error) {
    console.error("[PROFILE_GET]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create user profile
export async function POST(req: Request): Promise<APIResponse<UserProfile>> {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const validationResult = userProfileSchema.safeParse(json)

    if (!validationResult.success) {
      return NextResponse.json({
        error: "Invalid request data",
        details: validationResult.error.flatten()
      }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: { profile: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.profile) {
      return NextResponse.json({ error: "Profile already exists" }, { status: 400 })
    }

    const profile = await prisma.userProfile.create({
      data: {
        ...validationResult.data,
        userId: user.id
      }
    })

    return NextResponse.json(profile as UserProfile)
  } catch (error) {
    console.error("[PROFILE_POST]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PATCH - Update user profile
export async function PATCH(req: Request): Promise<APIResponse<UserProfile>> {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const json = await req.json()
    const validationResult = userProfileSchema.partial().safeParse(json)

    if (!validationResult.success) {
      return NextResponse.json({
        error: "Invalid request data",
        details: validationResult.error.flatten()
      }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: { profile: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (!user.profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    const updatedProfile = await prisma.userProfile.update({
      where: { id: user.profile.id },
      data: validationResult.data
    })

    // Add type assertion to ensure the profile matches our UserProfile type
    return NextResponse.json(updatedProfile as UserProfile)
  } catch (error) {
    console.error("[PROFILE_PATCH]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}