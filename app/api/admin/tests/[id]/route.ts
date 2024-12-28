// app/api/admin/tests/[id]/route.ts

// app/api/admin/tests/[id]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
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

    const { categories, ...testData } = validationResult.data

    // Update test with categories and their questions in a transaction
    const test = await prisma.$transaction(async (tx) => {
      // First, delete all existing categories (this will cascade delete questions and options)
      await tx.category.deleteMany({
        where: { testId: testData.id }
      })

      // Update the test basic info
      const updatedTest = await tx.test.update({
        where: { id: testData.id },
        data: {
          ...testData,
          categories: {
            create: categories.map(category => ({
              name: category.name,
              description: category.description,
              questions: {
                create: category.questions.map(question => ({
                  title: question.title,
                  options: {
                    create: question.options.map(option => ({
                      text: option.text
                    }))
                  }
                }))
              }
            }))
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

    return NextResponse.json(test)
  } catch (error) {
    console.error('[TEST_PATCH]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a specific test by ID
export async function DELETE(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Extract ID from the URL path
    const id = request.url.split('/').pop()
    if (!id) {
      return new NextResponse('Bad Request: Missing test ID', { status: 400 })
    }

    await prisma.test.delete({ where: { id } })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[TEST_DELETE]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}