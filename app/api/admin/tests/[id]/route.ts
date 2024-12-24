// app/api/admin/tests/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { updateTestSchema } from '@/lib/validations/test'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const parsedBody = updateTestSchema.parse(body)

    const updatedTest = await prisma.test.update({
      where: { id: params.id },
      data: {
        title: parsedBody.title,
        description: parsedBody.description,
        isPublished: parsedBody.isPublished,
      },
    })

    return NextResponse.json(updatedTest)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.test.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Test deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}