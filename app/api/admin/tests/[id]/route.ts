// app/api/admin/tests/[id]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { updateTestSchema } from '@/lib/validations/tests'
import type { TestError } from '@/types/tests/test'

// GET - Retrieve a specific test by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id } = params
    if (!id) {
      return new NextResponse('Bad Request: Missing test ID', { status: 400 })
    }

    const test = await prisma.test.findUnique({ 
      where: { id },
      include: {
        user: true
      }
    })

    if (!test) {
      return new NextResponse('Test not found', { status: 404 })
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

// PATCH - Update a specific test by ID
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id } = params
    const body = await request.json()

    const validationResult = updateTestSchema.safeParse({
      ...body,
      id
    })

    if (!validationResult.success) {
      const errorResponse: TestError = {
        message: 'Invalid request data',
        errors: validationResult.error.flatten().fieldErrors
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const test = await prisma.test.update({
      where: { id },
      data: {
        title: validationResult.data.title,
        description: validationResult.data.description,
        isPublished: validationResult.data.isPublished
      }
    })

    return NextResponse.json(test)
  } catch (error) {
    console.error('[TEST_PATCH]', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { message: 'Test not found' },
          { status: 404 }
        )
      }
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a specific test by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id } = params
    if (!id) {
      return new NextResponse('Bad Request: Missing test ID', { status: 400 })
    }

    await prisma.test.delete({
      where: { id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[TEST_DELETE]', error)
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { message: 'Test not found' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}