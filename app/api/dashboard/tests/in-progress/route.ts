// app/api/dashboard/tests/in-progress/route.ts

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

    const inProgressTests = await prisma.testAttempt.findMany({
      where: {
        userId: user.id,
        status: "IN_PROGRESS"
      },
      include: {
        test: {
          select: {
            title: true,
            questions: {
              select: {
                id: true
              }
            }
          }
        },
        responses: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        startedAt: 'desc'
      }
    })

    const testsWithProgress = inProgressTests.map(attempt => ({
      testId: attempt.testId,
      testTitle: attempt.test.title,
      totalQuestions: attempt.test.questions.length,
      answeredQuestions: attempt.responses.length,
      progress: Math.round((attempt.responses.length / attempt.test.questions.length) * 100)
    }))

    return NextResponse.json(testsWithProgress)

  } catch (error) {
    console.error("[IN_PROGRESS_TESTS_GET]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}