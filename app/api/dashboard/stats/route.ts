// app/api/dashboard/stats/route.ts

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

    const [totalTests, completedTests, averageScore] = await Promise.all([
      // Get total available tests
      prisma.test.count({ where: { isPublished: true } }),
      
      // Get completed tests count
      prisma.testAttempt.count({
        where: {
          userId: user.id,
          status: "COMPLETED"
        }
      }),

      // Get average score
      prisma.testAttempt.aggregate({
        where: {
          userId: user.id,
          status: "COMPLETED"
        },
        _avg: {
          percentageScore: true
        }
      })
    ])

    return NextResponse.json({
      totalTests,
      completedTests,
      averageScore: averageScore._avg.percentageScore || 0
    })

  } catch (error) {
    console.error("[DASHBOARD_STATS_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}