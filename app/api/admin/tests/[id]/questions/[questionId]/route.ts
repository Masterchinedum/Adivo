// app/api/admin/tests/[id]/questions/[questionId]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { updateQuestionSchema } from '@/lib/validations/question'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string; questionId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
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

    const { options, ...questionData } = validationResult.data

    const question = await prisma.$transaction(async (tx) => {
      // Update question
      await tx.question.update({
        where: { id: params.questionId },
        data: questionData
      })

      // Handle options if provided
      if (options) {
        // Delete existing options
        await tx.option.deleteMany({
          where: { questionId: params.questionId }
        })

        // Create new options
        await tx.option.createMany({
          data: options.map(option => ({
            text: option.text,
            questionId: params.questionId
          }))
        })
      }

      return tx.question.findUnique({
        where: { id: params.questionId },
        include: { options: true }
      })
    })

    return NextResponse.json(question)
  } catch (error) {
    console.error('[QUESTION_PATCH]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

interface RouteParams {
    params: {
      id: string
      questionId: string
    }
  }
  
  // DELETE - Delete a specific question
  export async function DELETE(
    request: Request,
    { params }: RouteParams
  ) {
    try {
      const { userId } = await auth()
      if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 })
      }
  
      // First verify that the question belongs to the specified test
      const question = await prisma.question.findFirst({
        where: {
          id: params.questionId,
          testId: params.id
        }
      })
  
      if (!question) {
        return new NextResponse('Question not found', { status: 404 })
      }
  
      // Delete the question
      await prisma.question.delete({
        where: {
          id: params.questionId
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