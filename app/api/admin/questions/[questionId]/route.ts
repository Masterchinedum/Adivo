// app/api/admin/questions/[questionId]/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { updateQuestionSchema } from '@/lib/validations/question'

// GET - Retrieve a specific question by ID
export async function GET(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const questionId = params.questionId
    if (!questionId) {
      return new NextResponse('Bad Request: Missing question ID', { status: 400 })
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { test: true }
    })

    if (!question) {
      return new NextResponse('Not Found', { status: 404 })
    }

    return NextResponse.json(question)
  } catch (error) {
    console.error('[QUESTION_GET]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// PATCH - Update a specific question by ID
export async function PATCH(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const questionId = params.questionId
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

    const question = await prisma.question.update({
      where: { id: questionId },
      data: validationResult.data
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

// DELETE - Delete a specific question by ID
export async function DELETE(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const questionId = params.questionId
    if (!questionId) {
      return new NextResponse('Bad Request: Missing question ID', { status: 400 })
    }

    await prisma.question.delete({
      where: { id: questionId }
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