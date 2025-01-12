// app/api/admin/tests/[id]/categories/[categoryId]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prism'
import { updateCategorySchema } from '@/lib/validations/category'
import type { CategoryError } from '@/types/tests/category'

// GET - Get a specific category
export async function GET(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const pathParts = request.url.split('/')
    const categoryId = pathParts.pop()
    const testId = pathParts[pathParts.length - 3]

    if (!categoryId || !testId) {
      return new NextResponse('Invalid request parameters', { status: 400 })
    }

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        testId: testId
      },
      include: {
        questions: true
      }
    })

    if (!category) {
      return new NextResponse('Category not found', { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('[CATEGORY_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// PATCH - Update a category
export async function PATCH(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const pathParts = request.url.split('/')
    const categoryId = pathParts.pop()
    const testId = pathParts[pathParts.length - 3]

    if (!categoryId || !testId) {
      return new NextResponse('Invalid request parameters', { status: 400 })
    }

    const json = await request.json()
    const validationResult = updateCategorySchema.safeParse(json)

    if (!validationResult.success) {
      const errorResponse: CategoryError = {
        message: 'Invalid request data',
        errors: validationResult.error.flatten().fieldErrors
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const category = await prisma.category.update({
      where: { 
        id: categoryId,
        testId: testId
      },
      data: validationResult.data,
      include: {
        questions: true
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('[CATEGORY_PATCH]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a category
export async function DELETE(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const pathParts = request.url.split('/')
    const categoryId = pathParts.pop()
    const testId = pathParts[pathParts.length - 3]

    if (!categoryId || !testId) {
      return new NextResponse('Invalid request parameters', { status: 400 })
    }

    // Verify category exists and belongs to the test
    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        testId: testId
      }
    })

    if (!category) {
      return new NextResponse('Category not found', { status: 404 })
    }

    // Delete category (questions will be automatically deleted due to cascade)
    await prisma.category.delete({
      where: { id: categoryId }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[CATEGORY_DELETE]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}