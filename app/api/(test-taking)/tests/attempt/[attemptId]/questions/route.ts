// app/api/(test-taking)/tests/attempt/[attemptId]/questions/route.ts

import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { testAttemptQuestionsQuerySchema, submitAnswerSchema } from "@/lib/validations/test-attempt-question"
import type { 
  TestAttemptQuestion,
  TestAttemptQuestionsResponse,
  SubmitAnswerResponse 
} from "@/types/tests/test-attempt-question"

export async function GET(req: Request) {
  try {
    // 1. Get clerk user ID
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 2. Get attempt ID from URL
    const attemptId = req.url.split('/attempt/')[1].split('/')[0]
    const validation = testAttemptQuestionsQuerySchema.safeParse({ attemptId })
    
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid attempt ID",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    // 3. Get user ID from database
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // 4. Get test attempt with questions
    const attempt = await prisma.testAttempt.findFirst({
      where: {
        id: attemptId,
        userId: user.id,
        status: "IN_PROGRESS"
      },
      include: {
        test: {
          select: {
            questions: {
              select: {
                id: true,
                title: true,
                categoryId: true,
                options: {
                  select: {
                    id: true,
                    text: true,
                    point: true
                  }
                }
              }
            }
          }
        },
        responses: {
          select: {
            questionId: true,
            selectedOptionId: true
          }
        }
      }
    })

    if (!attempt) {
      return NextResponse.json({ error: "Test attempt not found" }, { status: 404 })
    }

    // 5. Format response
    const questions: TestAttemptQuestion[] = attempt.test.questions.map(question => ({
      id: `${attempt.id}_${question.id}`, // Composite ID
      testAttemptId: attempt.id,
      questionId: question.id,
      question: {
        ...question,
        categoryId: question.categoryId ?? null // Explicitly handle null case
      },
      selectedOptionId: attempt.responses.find(r => r.questionId === question.id)?.selectedOptionId ?? null,
      isAnswered: attempt.responses.some(r => r.questionId === question.id),
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    const response: TestAttemptQuestionsResponse = {
      questions,
      totalQuestions: questions.length,
      answeredQuestions: attempt.responses.length
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error("[TEST_ATTEMPT_QUESTIONS_GET]", error)
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    // 1. Get user authentication
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 2. Get attempt ID from URL
    const attemptId = req.url.split('/attempt/')[1].split('/')[0]
    if (!attemptId) {
      return NextResponse.json({ error: "Invalid attempt ID" }, { status: 400 })
    }

    // 3. Parse request body
    const json = await req.json()
    const validation = submitAnswerSchema.safeParse(json)
    
    if (!validation.success) {
      return NextResponse.json({
        error: "Invalid request data",
        details: validation.error.flatten()
      }, { status: 400 })
    }

    // 4. Get user's database ID
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // 5. Process answer submission in transaction
    const result = await prisma.$transaction(async (tx) => {
      // 5.1 Verify test attempt exists and belongs to user
      const attempt = await tx.testAttempt.findFirst({
        where: {
          id: attemptId,
          userId: user.id,
          status: "IN_PROGRESS"
        }
      })

      if (!attempt) {
        throw new Error("Test attempt not found or not in progress")
      }

      // 5.2 Get question and selected option details
      const question = await tx.question.findUnique({
        where: { id: validation.data.questionId },
        include: { options: true }
      })

      if (!question) {
        throw new Error("Question not found")
      }

      const selectedOption = question.options.find(
        opt => opt.id === validation.data.selectedOptionId
      )

      if (!selectedOption) {
        throw new Error("Selected option not found")
      }

      // 5.3 Create or update response
      const response = await tx.questionResponse.upsert({
        where: {
          // Use the composite unique constraint
          testAttemptId_questionId: {
            testAttemptId: attemptId,
            questionId: validation.data.questionId
          }
        },
        create: {
          testAttemptId: attemptId,
          questionId: validation.data.questionId,
          selectedOptionId: validation.data.selectedOptionId,
          pointsEarned: selectedOption.point,
          maxPoints: Math.max(...question.options.map(opt => opt.point))
        },
        update: {
          selectedOptionId: validation.data.selectedOptionId,
          pointsEarned: selectedOption.point
        }
      })

      const result: SubmitAnswerResponse = {
        success: true,
        isCorrect: selectedOption.point > 0,
        pointsEarned: selectedOption.point,
        maxPoints: Math.max(...question.options.map(opt => opt.point))
      }

      return result
    })

    return NextResponse.json(result)

  } catch (error) {
    console.error("[QUESTION_SUBMIT]", error)
    
    const errorResponse: SubmitAnswerResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Internal server error"
    }
    
    return NextResponse.json(errorResponse, { 
      status: error instanceof Error ? 400 : 500 
    })
  }
}