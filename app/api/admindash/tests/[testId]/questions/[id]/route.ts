// app/api/admindash/tests/[testId]/questions/[id]/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const updateQuestionSchema = z.object({
  text: z.string().min(3).max(500).optional(),
  type: z.enum(["multiple_choice", "checkbox", "scale", "text"]).optional(),
  options: z.array(z.object({
    text: z.string(),
    value: z.union([z.string(), z.number()])
  })).optional(),
  order: z.number().min(0).optional(),
  categoryId: z.string().optional(),
})

interface RouteContextProps {
  params: {
    testId: string
    id: string
  }
}

export async function PATCH(
  req: Request,
  { params }: RouteContextProps
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const body = updateQuestionSchema.parse(json)

    // Verify the question belongs to a test owned by the user
    const question = await prisma.question.findFirst({
      where: {
        id: params.id,
        category: {
          test: {
            id: params.testId,
            createdById: userId
          }
        }
      }
    })

    if (!question) {
      return new NextResponse("Question not found", { status: 404 })
    }

    const updatedQuestion = await prisma.question.update({
      where: {
        id: params.id
      },
      data: {
        ...body
      }
    })

    return NextResponse.json(updatedQuestion)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 })
    }

    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: RouteContextProps
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Verify the question belongs to a test owned by the user
    const question = await prisma.question.findFirst({
      where: {
        id: params.id,
        category: {
          test: {
            id: params.testId,
            createdById: userId
          }
        }
      }
    })

    if (!question) {
      return new NextResponse("Question not found", { status: 404 })
    }

    const deletedQuestion = await prisma.question.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json(deletedQuestion)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}