// app/api/(test-taking)/tests/[testId]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { userId } = await auth()

    const test = await prisma.test.findUnique({
      where: {
        id: params.testId,
        isPublished: true
      },
      select: {
        id: true,
        title: true,
        description: true,
        categories: {
          select: {
            id: true,
            name: true,
            description: true,
            scale: true,
            _count: {
              select: {
                questions: true
              }
            }
          }
        },
        _count: {
          select: {
            questions: true
          }
        }
      }
    })

    if (!test) {
      return NextResponse.json(
        { message: 'Test not found' },
        { status: 404 }
      )
    }

    // If user is logged in, check if they have any attempts
    let attempts = []
    if (userId) {
      attempts = await prisma.testAttempt.findMany({
        where: {
          testId: params.testId,
          userId: userId
        },
        select: {
          id: true,
          startedAt: true,
          completedAt: true,
          status: true,
          totalScore: true,
          percentageScore: true
        },
        orderBy: {
          startedAt: 'desc'
        }
      })
    }

    return NextResponse.json({ 
      test,
      attempts
    })
  } catch (error) {
    console.error('[TEST_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}