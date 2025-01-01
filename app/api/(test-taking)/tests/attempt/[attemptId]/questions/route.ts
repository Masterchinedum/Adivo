// app/api/(test-taking)/tests/attempt/[attemptId]/questions/route.ts

import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { testAttemptQuestionsQuerySchema } from "@/lib/validations/test-attempt-question"
import type { TestAttemptQuestionsResponse } from "@/types/tests/test-attempt-question"

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