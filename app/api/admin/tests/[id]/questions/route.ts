// app/api/admin/tests/[id]/questions/route.ts

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createQuestionSchema } from '@/lib/validations/question'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const validationResult = createQuestionSchema.safeParse({
      ...json,
      testId: params.id
    })

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

    const question = await prisma.question.create({
      data: {
        ...questionData,
        options: {
          create: options?.map(option => ({
            text: option.text
          })) || []
        }
      },
      include: {
        options: true
      }
    })

    return NextResponse.json(question, { status: 201 })
  } catch (error) {
    console.error('[QUESTION_POST]', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}