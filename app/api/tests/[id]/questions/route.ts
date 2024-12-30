// app/api/tests/[id]/questions/route.ts
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

    const questions = await prisma.question.findMany({
      where: {
        category: {
          testId
        }
      },
      include: {
        options: {
          select: {
            id: true,
            text: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('[QUESTIONS_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}