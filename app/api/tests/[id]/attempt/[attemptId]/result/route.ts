// app/api/tests/[id]/attempt/[attemptId]/result/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Extract IDs from URL
    const pathParts = request.url.split('/')
    const testId = pathParts[pathParts.indexOf('tests') + 1]
    const attemptId = pathParts[pathParts.indexOf('attempt') + 1]

    // Get attempt with all related data
    const attempt = await prisma.testAttempt.findFirst({
      where: {
        id: attemptId,
        userId,
        testId,
        status: 'COMPLETED' // Only return results for completed attempts
      },
      include: {
        test: {
          include: {
            categories: true
          }
        },
        responses: {
          include: {
            question: {
              include: {
                category: true,
                options: true
              }
            },
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
      return new NextResponse('Test attempt not found or not completed', { status: 404 })
    }

    // Format detailed results
    const result = {
      testId: attempt.testId,
      testTitle: attempt.test.title,
      attemptId: attempt.id,
      startedAt: attempt.startedAt,
      completedAt: attempt.completedAt,
      totalScore: attempt.totalScore,
      percentageScore: attempt.percentageScore,
      categoryScores: attempt.categoryScores.map(score => ({
        category: score.category.name,
        actualScore: score.actualScore,
        maxScale: score.maxScale,
        rawScore: score.rawScore,
        maxRawScore: score.maxRawScore,
        percentageScore: (score.actualScore / score.maxScale) * 100
      })),
      responses: attempt.responses.map(response => ({
        question: response.question.title,
        category: response.question.category?.name,
        selectedAnswer: response.selectedOption.text,
        pointsEarned: response.pointsEarned,
        maxPoints: response.maxPoints,
        percentageScore: (response.pointsEarned / response.maxPoints) * 100
      }))
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('[TEST_RESULT_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}