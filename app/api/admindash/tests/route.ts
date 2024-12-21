// app/api/admindash/tests/route.ts
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { createTestSchema } from "@/lib/validations/test"

export async function POST(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const json = await req.json()
    const body = createTestSchema.parse(json)

    const test = await prisma.test.create({
      data: {
        title: body.title,
        description: body.description,
        createdById: userId,
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

export async function GET(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const tests = await prisma.test.findMany({
      where: {
        createdById: userId,
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(tests)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}