// app/api/dashboard/activity/route.ts

import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const recentActivity = await prisma.testAttempt.findMany({
      where: {
        userId: user.id
      },
      include: {
        test: {
          select: {
            title: true
          }
        }
      },
      orderBy: {
        startedAt: 'desc'
      },
      take: 10
    })

    return NextResponse.json(recentActivity)

  } catch (error) {
    console.error("[RECENT_ACTIVITY_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}