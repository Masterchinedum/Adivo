// app/api/tests/[id]/attempts/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Extract test ID from URL
    const testId = request.url.split('/tests/')[1].split('/')[0]
    if (!testId) {
      return new NextResponse('Invalid test ID', { status: 400 })
    }

    // Get pagination params
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') ?? '10')))
    const skip = (page - 1) * limit

    // Get attempts for this specific test
    const [totalAttempts, attempts] = await Promise.all([
      prisma.testAttempt.count({
        where: {
          userId,
          testId
        }
      }),
      prisma.testAttempt.findMany({
        where: {
          userId,
          testId
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
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
    ])

    return NextResponse.json({
      attempts,
      totalAttempts,
      currentPage: page,
      totalPages: Math.ceil(totalAttempts / limit)
    })
  } catch (error) {
    console.error('[TEST_ATTEMPTS_LIST]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}