// app/api/dashboard/tests/new/route.ts

import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get recently added/updated tests
    const newTests = await prisma.test.findMany({
      where: {
        isPublished: true,
        // Exclude tests the user has already completed
        NOT: {
          testAttempt: { // Change from 'attempts' to 'TestAttempt'
            some: {
              userId: user.id,
              status: "COMPLETED"
            }
          }
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        updatedAt: true,
        categories: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 5
    })

    return NextResponse.json(newTests)

  } catch (error) {
    console.error("[NEW_TESTS_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    )
  }
}