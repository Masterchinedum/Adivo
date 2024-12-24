// app/api/admin/tests/questions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createQuestionSchema } from '@/lib/validations/question'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsedBody = createQuestionSchema.parse(body)

    const newQuestion = await prisma.question.create({
      data: {
        text: parsedBody.text,
        type: parsedBody.type,
        order: parsedBody.order,
        testId: parsedBody.testId,
        options: {
          create: parsedBody.options?.map((o) => ({
            text: o.text,
            value: o.value,
          })),
        },
      },
    })

    return NextResponse.json(newQuestion)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const testId = searchParams.get('testId')

    const questions = await prisma.question.findMany({
      where: { testId },
      orderBy: { order: 'asc' },
      include: { options: true },
    })

    return NextResponse.json(questions)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}