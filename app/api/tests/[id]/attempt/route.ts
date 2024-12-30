// app/api/tests/[id]/attempt/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get test ID from URL
    const testId = request.url.split('/tests/')[1].split('/')[0]
    if (!testId) {
      return new NextResponse('Invalid test ID', { status: 400 })
    }

    // Verify test exists and is published
    const test = await prisma.test.findFirst({
      where: {
        id: testId,
        isPublished: true
      }
    })

    if (!test) {
      return new NextResponse('Test not found or not published', { status: 404 })
    }

    // Create test attempt
    const testAttempt = await prisma.testAttempt.create({
      data: {
        userId,
        testId,
        status: 'IN_PROGRESS',
        totalScore: 0,
        percentageScore: 0
      }
    })

    return NextResponse.json(testAttempt)
  } catch (error) {
    console.error('[TEST_ATTEMPT_CREATE]', error)
    return NextResponse.json({ 
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error'
    }, { 
      status: 500 
    })
  }
}