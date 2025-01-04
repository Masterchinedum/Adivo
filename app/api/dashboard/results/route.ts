// app/api/dashboard/results/route.ts

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

    const testResults = await prisma.testAttempt.findMany({
      where: {
        userId: user.id,
        status: "COMPLETED"
      },
      include: {
        test: {
          select: {
            title: true
          }
        },
        categoryScores: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        completedAt: 'desc'
      },
      take: 10
    })

    // Transform data for chart
    const chartData = testResults.map(result => ({
      date: result.completedAt?.toISOString().split('T')[0],
      score: result.percentageScore,
      testId: result.testId,
      testTitle: result.test.title
    }))

    return NextResponse.json(chartData)

  } catch (error) {
    console.error("[TEST_RESULTS_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}