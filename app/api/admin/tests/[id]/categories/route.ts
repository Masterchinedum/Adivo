// app/api/admin/tests/[id]/categories/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createCategorySchema } from '@/lib/validations/category'
import type { CategoryError } from '@/types/tests/category'

// GET - List all categories for a test
export async function GET(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Extract test ID from the URL
    const testId = request.url.split('/tests/')[1].split('/')[0]
    if (!testId) {
      return new NextResponse('Invalid test ID', { status: 400 })
    }

    const categories = await prisma.category.findMany({
      where: { testId },
      include: {
        questions: true
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('[CATEGORIES_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// POST - Create a new category
export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Extract test ID from the URL
    const testId = request.url.split('/tests/')[1].split('/')[0]
    if (!testId) {
      return new NextResponse('Invalid test ID', { status: 400 })
    }

    const json = await request.json()
    const validationResult = createCategorySchema.safeParse({
      ...json,
      testId
    })

    if (!validationResult.success) {
      const errorResponse: CategoryError = {
        message: 'Invalid request data',
        errors: validationResult.error.flatten().fieldErrors
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Verify test exists
    const test = await prisma.test.findUnique({
      where: { id: testId }
    })

    if (!test) {
      return new NextResponse('Test not found', { status: 404 })
    }

    const category = await prisma.category.create({
      data: validationResult.data,
      include: {
        questions: true
      }
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('[CATEGORY_POST]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}