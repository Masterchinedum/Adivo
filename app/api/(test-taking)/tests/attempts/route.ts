// app/api/(test-taking)/tests/attempts/route.ts

import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { TestAttemptsResponse } from "@/types/tests/test-attempt"

export async function GET(req: Request) {
  try {
    // 1. Get user authentication
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 2. Get user's database ID
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // 3. Get in-progress and completed attempts separately
    const [inProgress, completed] = await Promise.all([
      prisma.testAttempt.findMany({
        where: {
          userId: user.id,
          status: "IN_PROGRESS"
        },
        include: {
          test: {
            select: {
              id: true,
              title: true,
              description: true,
              _count: {
                select: {
                  questions: true
                }
              }
            }
          },
          responses: true
        },
        orderBy: {
          startedAt: 'desc'
        }
      }),
      prisma.testAttempt.findMany({
        where: {
          userId: user.id,
          status: "COMPLETED"
        },
        include: {
          test: {
            select: {
              id: true,
              title: true,
              description: true
            }
          }
        },
        orderBy: {
          completedAt: 'desc'
        },
        take: 5 // Limit to most recent 5 completed tests
      })
    ])

    // 4. Transform the data
    const inProgressWithProgress = inProgress.map(attempt => ({
      ...attempt,
      progress: {
        answered: attempt.responses.length,
        total: attempt.test._count.questions
      }
    }))

    return NextResponse.json({
      inProgress: inProgressWithProgress,
      completed
    })

  } catch (error) {
    console.error("[TEST_ATTEMPTS_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}