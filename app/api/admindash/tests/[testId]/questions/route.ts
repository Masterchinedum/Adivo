// app/api/admindash/tests/[testId]/questions/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const createQuestionSchema = z.object({
  text: z.string().min(3).max(500),
  type: z.enum(["multiple_choice", "checkbox", "scale", "text"]),
  options: z.array(z.object({
    text: z.string(),
    value: z.union([z.string(), z.number()]),
  })).optional(),
  categoryId: z.string(),
  order: z.number().min(0),
})

interface RouteContextProps {
  params: {
    testId: string
  }
}

export async function POST(
  req: Request,
  { params }: RouteContextProps
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const body = createQuestionSchema.parse(json)

    // First verify if the category exists and belongs to the test
    const category = await prisma.category.findFirst({
      where: {
        id: body.categoryId,
        test: {
          id: params.testId,
          createdById: userId
        }
      }
    })

    if (!category) {
      return new NextResponse("Invalid test or category", { status: 404 })
    }

    const question = await prisma.question.create({
      data: {
        text: body.text,
        type: body.type,
        options: body.options,
        categoryId: body.categoryId,
        order: body.order,
      }
    })

    return NextResponse.json(question)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 })
    }

    console.error("[QUESTIONS]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}