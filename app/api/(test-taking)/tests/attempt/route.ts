import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { startTestAttemptSchema } from "@/lib/validations/test-attempt"
import type { TestAttemptApiResponse } from "@/types/tests/test-attempt"

export async function POST(request: Request) {
  try {
    // 1. Get clerk user ID
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 2. Get internal user ID
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // 3. Parse and validate request
    const validation = startTestAttemptSchema.safeParse(await request.json())
    if (!validation.success) {
      return NextResponse.json({ 
        error: "Validation failed",
        details: validation.error.flatten() 
      }, { status: 400 })
    }

    // 4. Begin transaction
    const result = await prisma.$transaction(async (tx) => {
      // 4.1 Check test exists and is published
      const test = await tx.test.findFirst({
        where: {
          id: validation.data.testId,
          isPublished: true
        },
        select: { id: true }
      })

      if (!test) {
        throw new Error("Test not found or not published")
      }

      // 4.2 Check for existing attempt
      const existingAttempt = await tx.testAttempt.findFirst({
        where: {
          testId: test.id,
          userId: user.id,
          status: "IN_PROGRESS"
        },
        select: {
          id: true,
          testId: true,
          userId: true,
          startedAt: true,
          status: true
        }
      })

      // 4.3 If existing attempt found, return it instead of creating new one
      if (existingAttempt) {
        return existingAttempt
      }

      // 4.4 Create new attempt if none exists
      return await tx.testAttempt.create({
        data: {
          testId: test.id,
          userId: user.id,
          status: "IN_PROGRESS",
          startedAt: new Date()
        },
        select: {
          id: true,
          testId: true,
          userId: true,
          startedAt: true,
          status: true
        }
      })
    })

    const response: TestAttemptApiResponse = {
      testAttempt: result
    }

    return NextResponse.json(response, { status: 201 })

  } catch (error) {
    console.error("[TEST_ATTEMPT_CREATE]", error)
    
    if (error instanceof Error) {
      if (error.message === "Test not found or not published") {
        return NextResponse.json({ error: error.message }, { status: 404 })
      }
    }
    
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 })
  }
}
