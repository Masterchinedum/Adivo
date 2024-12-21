// app/(dashboards)/admindash/tests/[testId]/page.tsx
import { notFound } from "next/navigation"
import { auth } from "@clerk/nextjs"
import prisma from "@/lib/prisma"
import { TestEditor } from "./_components/test-editor"

interface TestPageProps {
  params: {
    testId: string
  }
}

async function getTest(testId: string, userId: string) {
  const test = await prisma.test.findUnique({
    where: {
      id: testId,
      createdById: userId
    },
    include: {
      categories: {
        include: {
          questions: {
            orderBy: {
              order: 'asc'
            }
          }
        }
      }
    }
  })

  if (!test) notFound()
  return test
}

export default async function TestPage({ params }: TestPageProps) {
  const { userId } = await auth()
  
  if (!userId) {
    return notFound()
  }

  const test = await getTest(params.testId, userId)
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <TestEditor initialData={test} />
    </div>
  )
}