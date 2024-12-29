// app/api/tests/attempts/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const testId = searchParams.get('testId')
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') ?? '10')))
    const skip = (page - 1) * limit

    // Build where clause
    const where = {
      userId,
      ...(testId ? { testId } : {})
    }

    // Get total count and attempts
    const [totalAttempts, attempts] = await Promise.all([
      prisma.testAttempt.count({ where }),
      prisma.testAttempt.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          test: {
            select: {
              title: true,
              description: true
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
    console.error('[TEST_ATTEMPTS_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}