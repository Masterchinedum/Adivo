// app/api/admindash/tests/[testId]/categories/[id]/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const updateCategorySchema = z.object({
  title: z.string().min(3).max(50).optional(),
  description: z.string().max(500).optional(),
  parentId: z.string().optional(),
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
    const body = updateCategorySchema.parse(json)

    // Verify the category belongs to a test owned by the user
    const category = await prisma.category.findFirst({
      where: {
        id: params.id,
        test: {
          id: params.testId,
          createdById: userId
        }
      }
    })

    if (!category) {
      return new NextResponse("Category not found", { status: 404 })
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id: params.id
      },
      data: {
        ...body
      },
      include: {
        questions: true
      }
    })

    return NextResponse.json(updatedCategory)
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

    // Verify the category belongs to a test owned by the user
    const category = await prisma.category.findFirst({
      where: {
        id: params.id,
        test: {
          id: params.testId,
          createdById: userId
        }
      }
    })

    if (!category) {
      return new NextResponse("Category not found", { status: 404 })
    }

    // Delete the category and its questions (cascading delete in schema)
    const deletedCategory = await prisma.category.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json(deletedCategory)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}