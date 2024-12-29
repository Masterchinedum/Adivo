// app/api/tests/[id]/attempt/[attemptId]/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Extract IDs from URL
    const pathParts = request.url.split('/')
    const testId = pathParts[pathParts.indexOf('tests') + 1]
    const attemptId = pathParts[pathParts.indexOf('attempt') + 1]

    // Verify attempt belongs to user
    const testAttempt = await prisma.testAttempt.findFirst({
      where: {
        id: attemptId,
        userId,
        testId
      },
      include: {
        responses: {
          include: {
            question: {
              include: {
                category: true
              }
            }
          }
        }
      }
    })

    if (!testAttempt) {
      return new NextResponse('Test attempt not found', { status: 404 })
    }

    // Calculate category scores
    const categoryScores = await Promise.all(
      testAttempt.responses.reduce((acc, response) => {
        const categoryId = response.question.category?.id
        if (!categoryId) return acc

        const existing = acc.find(c => c.categoryId === categoryId)
        if (existing) {
          existing.rawScore += response.pointsEarned
          existing.maxRawScore += response.maxPoints
        } else {
          acc.push({
            categoryId,
            rawScore: response.pointsEarned,
            maxRawScore: response.maxPoints
          })
        }
        return acc
      }, [] as { categoryId: string; rawScore: number; maxRawScore: number }[])
        .map(async ({ categoryId, rawScore, maxRawScore }) => {
          const category = await prisma.category.findUnique({
            where: { id: categoryId }
          })
          if (!category) throw new Error('Category not found')

          const actualScore = (rawScore / maxRawScore) * category.scale
          const maxScale = (maxRawScore / maxRawScore) * category.scale

          return prisma.categoryScore.create({
            data: {
              testAttemptId: attemptId,
              categoryId,
              actualScore,
              maxScale,
              rawScore,
              maxRawScore
            }
          })
        })
    )

    // Calculate total scores
    const totalScore = categoryScores.reduce((sum, score) => sum + score.actualScore, 0)
    const maxPossibleScore = categoryScores.reduce((sum, score) => sum + score.maxScale, 0)
    const percentageScore = (totalScore / maxPossibleScore) * 100

    // Update test attempt
    const updatedAttempt = await prisma.testAttempt.update({
      where: { id: attemptId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        totalScore,
        percentageScore
      },
      include: {
        responses: true,
        categoryScores: true
      }
    })

    return NextResponse.json(updatedAttempt)
  } catch (error) {
    console.error('[TEST_ATTEMPT_COMPLETE]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const pathParts = request.url.split('/')
    const attemptId = pathParts.pop()

    const attempt = await prisma.testAttempt.findFirst({
      where: {
        id: attemptId,
        userId
      },
      include: {
        responses: {
          include: {
            question: {
              include: {
                options: true,
                category: true
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
      return new NextResponse('Test attempt not found', { status: 404 })
    }

    return NextResponse.json(attempt)
  } catch (error) {
    console.error('[TEST_ATTEMPT_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}