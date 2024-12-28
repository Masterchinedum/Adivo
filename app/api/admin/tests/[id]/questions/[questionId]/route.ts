// app/api/admin/tests/[id]/questions/[questionId]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { updateQuestionSchema } from '@/lib/validations/question'

export async function PATCH(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const pathParts = request.url.split('/')
    const questionId = pathParts.pop()
    const testId = pathParts[pathParts.length - 2]

    if (!questionId || !testId) {
      return new NextResponse('Invalid request parameters', { status: 400 })
    }

    const json = await request.json()
    const validationResult = updateQuestionSchema.safeParse(json)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Invalid request data',
          errors: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const { options, categoryId, ...questionData } = validationResult.data

    const question = await prisma.$transaction(async (tx) => {
      // Verify question exists and belongs to the test
      const existingQuestion = await tx.question.findFirst({
        where: {
          id: questionId,
          testId: testId
        }
      })

      if (!existingQuestion) {
        throw new Error('Question not found')
      }

      // Update question with category support
      await tx.question.update({
        where: { id: questionId },
        data: {
          ...questionData,
          categoryId: categoryId // Add category support
        }
      })

      // Handle options if provided
      if (options) {
        // Delete existing options
        await tx.option.deleteMany({
          where: { questionId: questionId }
        })

        // Create new options
        await tx.option.createMany({
          data: options.map(option => ({
            text: option.text,
            point: option.point,
            questionId: questionId
          }))
        })
      }

      return tx.question.findUnique({
        where: { id: questionId },
        include: {
          options: true,
          category: true // Include category information
        }
      })
    })

    if (!question) {
      return new NextResponse('Question not found', { status: 404 })
    }

    return NextResponse.json(question)
  } catch (error) {
    console.error('[QUESTION_PATCH]', error)
    if (error instanceof Error && error.message === 'Question not found') {
      return new NextResponse('Question not found', { status: 404 })
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
  
      // Extract IDs from the URL
      const pathParts = request.url.split('/')
      const questionId = pathParts.pop() // Get questionId
      const testId = pathParts[pathParts.length - 2] // Get testId
  
      if (!questionId || !testId) {
        return new NextResponse('Invalid request parameters', { status: 400 })
      }
  
      // First verify that the question belongs to the specified test
      const question = await prisma.question.findFirst({
        where: {
          id: questionId,
          testId: testId
        }
      })
  
      if (!question) {
        return new NextResponse('Question not found', { status: 404 })
      }
  
      // Delete the question
      await prisma.question.delete({
        where: {
          id: questionId
        }
      })
  
      return new NextResponse(null, { status: 204 })
    } catch (error) {
      console.error('[QUESTION_DELETE]', error)
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }