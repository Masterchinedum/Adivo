// app/api/admin/tests/[testId]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { updateTestSchema } from '@/lib/validations/tests'
import type { TestError } from '@/types/tests/test'

// GET - Fetch a single test
export async function GET(
  req: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const test = await prisma.test.findUnique({
      where: {
        id: params.testId
      }
    })

    if (!test) {
      return NextResponse.json(
        { message: 'Test not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(test)
  } catch (error) {
    console.error('[TEST_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// PATCH - Update a test
export async function PATCH(
  req: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const validationResult = updateTestSchema.safeParse(json)

    if (!validationResult.success) {
      const errorResponse: TestError = {
        message: 'Invalid request data',
        errors: validationResult.error.flatten().fieldErrors
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    // Check if test exists
    const existingTest = await prisma.test.findUnique({
      where: {
        id: params.testId
      }
    })

    if (!existingTest) {
      return NextResponse.json(
        { message: 'Test not found' },
        { status: 404 }
      )
    }

    const updatedTest = await prisma.test.update({
      where: {
        id: params.testId
      },
      data: validationResult.data
    })

    return NextResponse.json(updatedTest)
  } catch (error) {
    console.error('[TEST_PATCH]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a test
export async function DELETE(
  req: Request,
  { params }: { params: { testId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Check if test exists
    const existingTest = await prisma.test.findUnique({
      where: {
        id: params.testId
      }
    })

    if (!existingTest) {
      return NextResponse.json(
        { message: 'Test not found' },
        { status: 404 }
      )
    }

    await prisma.test.delete({
      where: {
        id: params.testId
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[TEST_DELETE]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}