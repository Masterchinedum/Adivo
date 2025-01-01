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
  return await prisma.testAttempt.findFirst({
    where: {
      id: attemptId,
      userId,
      status: "IN_PROGRESS"
    },
    include: {
      test: {
        include: {
          categories: {
            include: {
              questions: {
                include: {
                  options: true
                }
              }
            }
          }
        }
      }
    }
  })
}

export default async function TestAttemptPage({ params }: PageProps) {
  // Await the params first
  const resolvedParams = await params
  const { userId } = await auth()
  
  if (!userId) {
    return notFound()
  }

  const attempt = await getTestAttempt(resolvedParams.attemptId, userId)

  if (!attempt) {
    return notFound()
  }

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
}