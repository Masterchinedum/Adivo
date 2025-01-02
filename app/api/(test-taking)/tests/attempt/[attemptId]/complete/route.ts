// app/api/(test-taking)/tests/attempt/[attemptId]/complete/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { testCompletionSchema } from "@/lib/validations/test-completion"
import type { TestCompletionResponse } from "@/types/tests/test-attempt"

export async function POST(req: Request): Promise<NextResponse<TestCompletionResponse>> {
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
    const attemptId = req.url.split('/attempt/')[1].split('/')[0]
    const validation = testCompletionSchema.safeParse({ testAttemptId: attemptId })
    
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

    // 4. Process test completion in transaction
    const result = await prisma.$transaction(async (tx) => {
      // 4.1 Get attempt with all related data
      const attempt = await tx.testAttempt.findFirst({
        where: {
          id: attemptId,
          userId: user.id,
          status: "IN_PROGRESS"
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
          responses: true
        }
      })

      if (!attempt) {
        throw new Error("Test attempt not found or not in progress")
      }

      // 4.2 Calculate scores per category
      const categoryScores = await Promise.all(
        attempt.test.categories.map(async (category) => {
          // Get questions for this category
          const categoryQuestions = category.questions

          // Calculate raw scores
          let rawScore = 0
          let maxRawScore = 0

          categoryQuestions.forEach(question => {
            // Find response for this question
            const response = attempt.responses.find(r => r.questionId === question.id)
            if (response) {
              // Add points earned
              rawScore += response.pointsEarned
            }
            // Add maximum possible points
            maxRawScore += Math.max(...question.options.map(opt => opt.point))
          })

          // Calculate scaled score based on category scale
          const scaledScore = (rawScore / maxRawScore) * category.scale
          const maxScale = category.scale

          // Create category score record
          return await tx.categoryScore.create({
            data: {
              testAttemptId: attemptId,
              categoryId: category.id,
              rawScore,
              maxRawScore,
              actualScore: scaledScore,
              maxScale
            }
          })
        })
      )

      // 4.3 Calculate total score and percentage
      const totalScore = categoryScores.reduce((sum, cat) => sum + cat.actualScore, 0)
      const maxPossibleScore = categoryScores.reduce((sum, cat) => sum + cat.maxScale, 0)
      const percentageScore = (totalScore / maxPossibleScore) * 100

      // 4.4 Update attempt status and scores
      const updatedAttempt = await tx.testAttempt.update({
        where: { id: attemptId },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
          totalScore,
          percentageScore
        }
      })

      return {
        testAttemptId: updatedAttempt.id,
        totalScore,
        percentageScore,
        categoryScores: categoryScores.map(cs => ({
          categoryId: cs.categoryId,
          rawScore: cs.rawScore,
          maxRawScore: cs.maxRawScore,
          scaledScore: cs.actualScore,
          maxScale: cs.maxScale
        }))
      }
    })

    const response: TestCompletionResponse = {
      success: true,
      result: result
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error("[TEST_COMPLETION]", error)
    
    const errorResponse: TestCompletionResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error"
    }
    
    return NextResponse.json(errorResponse, { 
      status: error instanceof Error ? 400 : 500 
    })
  }
}