// app/api/admin/questions/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { createQuestionSchema } from '@/lib/validations/question'
import type { Question } from '@/types/tests/question'
import { getUserById } from '@/lib/users'

// GET - List all questions for a specific test with pagination
export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    
    // Log the received parameters for debugging
    console.log('Received query parameters:', {
      testId: searchParams.get('testId'),
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      sort: searchParams.get('sort')
    })

    const testId = searchParams.get('testId')
    if (!testId) {
      return NextResponse.json(
        { message: 'Test ID is required' },
        { status: 400 }
      )
    }

    // Parse and validate query parameters with default values
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') ?? '10')))
    const sort = searchParams.get('sort') ?? 'asc'
    const skip = (page - 1) * limit

    // Build the where clause
    const whereClause: Prisma.QuestionWhereInput = {
      testId: testId
    }

    // Get total count and questions
    const [totalQuestions, questions] = await Promise.all([
      prisma.question.count({ where: whereClause }),
      prisma.question.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: [
          { order: sort as 'asc' | 'desc' },
          { createdAt: 'desc' }
        ]
      })
    ])

    return NextResponse.json({
      questions,
      totalQuestions,
      currentPage: page,
      totalPages: Math.ceil(totalQuestions / limit)
    })
  } catch (error) {
    console.error('[QUESTIONS_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// POST - Create a new question
export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const validationResult = createQuestionSchema.safeParse(json)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Invalid request data',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    // Verify that the test exists and user has access to it
    const test = await prisma.test.findUnique({
      where: { id: validationResult.data.testId },
      include: { user: true }
    })

    if (!test) {
      return NextResponse.json(
        { message: 'Test not found' },
        { status: 404 }
      )
    }

    // Get the highest order number for the test
    const highestOrder = await prisma.question.findFirst({
      where: { testId: validationResult.data.testId },
      orderBy: { order: 'desc' },
      select: { order: true }
    })

    const newOrder = (highestOrder?.order ?? -1) + 1

    const question = await prisma.question.create({
      data: {
        ...validationResult.data,
        order: validationResult.data.order ?? newOrder
      }
    })

    return NextResponse.json(question, { status: 201 })
  } catch (error) {
    console.error('[QUESTION_POST]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}