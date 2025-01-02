// app/api/admin/tests/[id]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'
import { updateTestSchema } from '@/lib/validations/tests'
import type { TestError } from '@/types/tests/test'

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
    const id = req.url.split('/tests/')[1].split('/')[0]
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!id) {
      return new NextResponse('Bad Request: Missing test ID', { status: 400 })
    }

    const json = await req.json()
    const validationResult = updateTestSchema.safeParse({
      ...json,
      id
    })

    if (!validationResult.success) {
      const errorResponse: TestError = {
        message: 'Invalid request data',
        errors: validationResult.error.flatten().fieldErrors
      }
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const { categories, ...testData } = validationResult.data

    // Update test with categories and their questions in a transaction
    try {
      const test = await prisma.$transaction(async (tx) => {
        // Verify test exists and user has access
        const existingTest = await tx.test.findUnique({
          where: { id }
        });

        if (!existingTest) {
          throw new Error('Test not found');
        }

        // Delete existing categories (cascade deletes questions and options)
        await tx.category.deleteMany({
          where: { testId: id }
        })

        // Update test with new data
        const updatedTest = await tx.test.update({
          where: { id },
          data: {
            ...testData,
            categories: {
              create: categories?.map(category => ({
                name: category.name,
                description: category.description,
                scale: category.scale,
                questions: {
                  create: category.questions?.map(question => ({
                    title: question.title,
                    testId: id,
                    options: {
                      create: question.options?.map(option => ({
                        text: option.text,
                        point: option.point
                      })) || []
                    }
                  })) || []
                }
              })) || []
            }
          },
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

        return updatedTest
      })

      if (!test) {
        return NextResponse.json(
          { message: 'Failed to update test' },
          { status: 500 }
        )
      }

      return NextResponse.json(test)
    } catch (txError) {
      if (txError instanceof Error) {
        if (txError.message === 'Test not found or access denied') {
          return NextResponse.json(
            { message: txError.message },
            { status: 404 }
          )
        }
      }
      throw txError // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error('[TEST_PATCH]', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: 'Database error: ' + error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
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