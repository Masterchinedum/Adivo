// app/api/admindash/tests/[testId]/categories/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const createCategorySchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().max(500).optional(),
  parentId: z.string().optional(),
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
    const body = createCategorySchema.parse(json)

    // Verify the test belongs to the user
    const test = await prisma.test.findUnique({
      where: {
        id: params.testId,
        createdById: userId
      }
    })

    if (!test) {
      return new NextResponse("Test not found", { status: 404 })
    }

    const category = await prisma.category.create({
      data: {
        title: body.title,
        description: body.description,
        parentId: body.parentId,
        testId: params.testId,
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 })
    }

    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: RouteContextProps
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Verify the test belongs to the user and get its categories
    const categories = await prisma.category.findMany({
      where: {
        testId: params.testId,
        test: {
          createdById: userId
        }
      },
      include: {
        questions: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("[CATEGORIES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}