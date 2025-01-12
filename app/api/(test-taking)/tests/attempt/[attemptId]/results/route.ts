// app/api/(test-taking)/tests/attempt/[attemptId]/results/route.ts

import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { testResultsQuerySchema } from "@/lib/validations/test-results"
import type { TestAttemptResult } from "@/types/tests/test-attempt"

export async function GET(req: Request): Promise<NextResponse<TestAttemptResult | { success: boolean; error: string }>> {
  try {
    // 1. Get user authentication
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return NextResponse.json({ 
        success: false, 
        error: "Unauthorized" 
      }, { status: 401 })
    }

    // 2. Get attempt ID from URL
    const attemptId = req.url.split('/attempt/')[1].split('/results')[0]
    const validation = testResultsQuerySchema.safeParse({ attemptId })
    
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        error: "Invalid attempt ID",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    // 3. Get user's database ID
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: "User not found" 
      }, { status: 404 })
    }

    // 4. Get attempt with all related data
    const attempt = await prisma.testAttempt.findFirst({
      where: {
        id: attemptId,
        userId: user.id,
        status: "COMPLETED"
      },
      include: {
        test: {
          include: {
            categories: {
              include: {
                questions: {
                  include: {
                    options: true
                  }
                }
              }
            }
          }
        },
        responses: {
          include: {
            question: true,
            selectedOption: true
          }
        },
        categoryScores: {
          include: {
            category: true
          }
        }
      }
    })

    if (!attempt) {
      return NextResponse.json({ 
        success: false, 
        error: "Test attempt not found or not completed" 
      }, { status: 404 })
    }

    // 5. Calculate detailed results
    const totalScore = attempt.categoryScores.reduce((sum, cs) => sum + cs.actualScore, 0)
    const maxScore = attempt.categoryScores.reduce((sum, cs) => sum + cs.maxScale, 0)
    const percentageScore = (totalScore / maxScore) * 100

    // Update the result construction to include test name
    const result: TestAttemptResult = {
      test: {
        name: attempt.test.title // Add this line - assuming the test title is stored in test.title
      },
      totalScore,
      maxScore,
      percentageScore,
      categoryScores: attempt.categoryScores.map(cs => ({
        ...cs,
        scaledScore: cs.actualScore,
        category: {
          ...cs.category,
          description: cs.category.description || '' // Convert null/undefined to empty string
        }
      })),
      responses: attempt.responses.map(response => ({
        ...response,
        question: {
          ...response.question,
          categoryId: response.question.categoryId || undefined // Convert null to undefined
        }
      }))
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error("[TEST_RESULTS_GET]", error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Internal server error" 
    }, { status: 500 })
  }
}