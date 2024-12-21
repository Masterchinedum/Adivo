// app/api/admindash/tests/[testId]/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { updateTestSchema } from "@/lib/validations/test"

interface RouteContextProps {
  params: {
    testId: string
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

    const test = await prisma.test.findUnique({
      where: {
        id: params.testId,
        createdById: userId,
      },
      include: {
        categories: {
          include: {
            questions: true
          }
        }
      }
    })

    if (!test) {
      return new NextResponse("Not found", { status: 404 })
    }

    return NextResponse.json(test)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
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
    const body = updateTestSchema.parse(json)

    const test = await prisma.test.update({
      where: {
        id: params.testId,
        createdById: userId,
      },
      data: {
        ...body
      }
    })

    return NextResponse.json(test)
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

    const test = await prisma.test.delete({
      where: {
        id: params.testId,
        createdById: userId,
      }
    })

    return NextResponse.json(test)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}