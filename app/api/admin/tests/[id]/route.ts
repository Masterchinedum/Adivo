// app/api/admin/tests/[id]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { updateTestSchema } from '@/lib/validations/tests'
import { TestService } from '@/lib/services/test-service'

const testService = new TestService(prisma)

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const id = req.url.split('/tests/')[1].split('/')[0]
    if (!id) {
      return new NextResponse('Bad Request: Missing test ID', { status: 400 })
    }

    const test = await prisma.test.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            questions: {
              include: {
                options: true
              }
            }
          }
        }
      }
    })

    if (!test) {
      return new NextResponse('Not Found', { status: 404 })
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

export async function PATCH(req: Request) {
  try {
    // Auth check
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Extract and validate input
    const id = req.url.split('/tests/')[1].split('/')[0]
    const json = await req.json()
    
    const validationResult = updateTestSchema.safeParse({ ...json, id })
    if (!validationResult.success) {
      return NextResponse.json({
        message: 'Invalid request data',
        errors: validationResult.error.flatten().fieldErrors
      }, { status: 400 })
    }

    // Process update with retries
    const maxRetries = 3
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const updatedTest = await testService.updateTest(validationResult.data)
        return NextResponse.json(updatedTest)
      } catch (err) {
        if (attempt === maxRetries - 1) throw err
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)))
      }
    }

    return NextResponse.json({ message: 'Failed to update test' }, { status: 500 })
  } catch (error) {
    console.error('[TEST_PATCH] Error:', error)
    const message = error instanceof Error ? error.message : 'Internal Server Error'
    return NextResponse.json({ message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Extract ID from URL
    const id = request.url.split('/tests/')[1].split('/')[0]
    if (!id) {
      return new NextResponse('Bad Request: Missing test ID', { status: 400 })
    }

    // Check if test exists
    const test = await prisma.test.findUnique({
      where: { id }
    })

    if (!test) {
      return NextResponse.json(
        { message: 'Test not found' },
        { status: 404 }
      )
    }

    // Delete the test (will cascade delete categories, questions, and options)
    await prisma.test.delete({
      where: { id }
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