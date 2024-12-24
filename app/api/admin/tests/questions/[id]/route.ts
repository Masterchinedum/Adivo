// app/api/admin/tests/questions/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { updateQuestionSchema } from '@/lib/validations/question'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const parsedBody = updateQuestionSchema.parse(body)

    const updatedQuestion = await prisma.question.update({
      where: { id: params.id },
      data: {
        text: parsedBody.text,
        type: parsedBody.type,
        order: parsedBody.order,
        options: {
          deleteMany: {}, // Clear existing options
          create: parsedBody.options?.map((o) => ({
            text: o.text,
            value: o.value,
          })),
        },
      },
    })

    return NextResponse.json(updatedQuestion)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.question.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Question deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}