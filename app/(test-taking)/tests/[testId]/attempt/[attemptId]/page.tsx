import { Metadata } from "next"
import { notFound } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Test Attempt",
  description: "Take your test"
}

interface PageProps {
  params: Promise<{
    testId: string
    attemptId: string
  }>
}

async function getTestAttempt(attemptId: string, userId: string) {
  try {
    const attempt = await prisma.testAttempt.findFirst({
      where: {
        id: attemptId,
        userId,
        status: "IN_PROGRESS"
      },
      include: {
        test: {
          select: {
            id: true,
            title: true,
            description: true,
            categories: {
              select: {
                id: true,
                name: true,
                scale: true,
                questions: {
                  select: {
                    id: true,
                    title: true,
                    options: {
                      select: {
                        id: true,
                        text: true,
                        point: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })
    return attempt
  } catch (error) {
    console.error("Error fetching test attempt:", error)
    return null
  }
}

export default async function TestAttemptPage({ params }: PageProps) {
  const resolvedParams = await params
  const { userId: clerkUserId } = await auth() // Changed to be explicit
  
  if (!clerkUserId) {
    return notFound()
  }

  // Get internal user ID first
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    select: { id: true }
  })

  if (!user) {
    return notFound()
  }

  // Use internal user ID
  const attempt = await getTestAttempt(resolvedParams.attemptId, user.id)

  if (!attempt) {
    return notFound()
  }

  // PROBLEM 2: Add error boundary
  try {
    return (
      <div className="container py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {attempt.test.title}
          </h1>
          {attempt.test.description && (
            <p className="text-muted-foreground">
              {attempt.test.description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <p>Test Started: {attempt.startedAt.toLocaleString()}</p>
          <p>Status: {attempt.status}</p>
        </div>

        {/* We'll add the test interface components here later */}
        <div className="border rounded-lg p-4">
          <p>Test interface will be implemented here</p>
        </div>
      </div>
    )
  } catch (error) {
    return notFound()
  }
}