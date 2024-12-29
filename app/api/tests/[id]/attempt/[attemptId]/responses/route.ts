// app/api/tests/[id]/attempt/[attemptId]/responses/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createQuestionResponseSchema } from '@/lib/validations/answers/questionResponse'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Extract IDs from URL
    const pathParts = request.url.split('/')
    const testId = pathParts[pathParts.indexOf('tests') + 1]
    const attemptId = pathParts[pathParts.indexOf('attempt') + 1]

    const json = await request.json()
    const validationResult = createQuestionResponseSchema.safeParse(json)

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          message: 'Invalid request data',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const { questionId, selectedOptionId } = validationResult.data

    // Verify the test attempt belongs to the user and test
    const testAttempt = await prisma.testAttempt.findFirst({
      where: {
        id: attemptId,
        userId,
        testId,
        status: 'IN_PROGRESS' // Only allow responses for attempts in progress
      }
    })

    if (!testAttempt) {
      return new NextResponse('Test attempt not found or not in progress', { status: 404 })
    }

    // Get the selected option to calculate points
    const option = await prisma.option.findUnique({
      where: { id: selectedOptionId },
      include: {
        question: {
          include: {
            options: true,
            category: true
          }
        }
      }
    })

    if (!option) {
      return new NextResponse('Option not found', { status: 404 })
    }

    // Verify the question belongs to this test
    if (option.question.testId !== testId) {
      return new NextResponse('Question does not belong to this test', { status: 400 })
    }

    // Calculate max points for this question
    const maxPoints = Math.max(...option.question.options.map(o => o.point))

    // Create the response
    const response = await prisma.questionResponse.create({
      data: {
        testAttemptId: attemptId,
        questionId,
        selectedOptionId,
        pointsEarned: option.point,
        maxPoints
      }
    })

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('[QUESTION_RESPONSE_CREATE]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}