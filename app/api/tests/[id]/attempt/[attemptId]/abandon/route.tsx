// app/api/tests/[id]/attempt/[attemptId]/abandon/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { TestStatus } from '@prisma/client'

export async function PATCH(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Extract IDs from URL
    const pathParts = request.url.split('/')
    const attemptId = pathParts[pathParts.indexOf('attempt') + 1]

    // Update attempt status
    const attempt = await prisma.testAttempt.update({
      where: {
        id: attemptId,
        userId,
        status: 'IN_PROGRESS'
      },
      data: {
        status: 'ABANDONED',
        completedAt: new Date()
      }
    })

    return NextResponse.json(attempt)
  } catch (error) {
    console.error('[TEST_ATTEMPT_ABANDON]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}