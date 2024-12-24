// app/api/admin/tests/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { createTestSchema } from '@/lib/validations/test'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsedBody = createTestSchema.parse(body)

    const newTest = await prisma.test.create({
      data: {
        title: parsedBody.title,
        description: parsedBody.description,
        isPublished: parsedBody.isPublished,
      },
    })

    return NextResponse.json(newTest)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function GET() {
  try {
    const tests = await prisma.test.findMany({
      include: {
        questions: {
          orderBy: {
            order: 'asc',
          },
          include: {
            options: true,
          },
        },
      },
    })

    return NextResponse.json(tests)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}