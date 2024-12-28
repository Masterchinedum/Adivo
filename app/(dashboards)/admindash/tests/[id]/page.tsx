// app/(dashboards)/admindash/tests/[id]/page.tsx
import { Metadata } from "next"
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { TestContent } from "./components/TestContent"
import { TestFormHeader } from "../components/TestFormHeader"
import type { Test } from "@/types/tests/test"

type Props = {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Edit Test",
  description: "Edit your test details and questions.",
}

async function getTest(id: string): Promise<Test | null> {
  const test = await prisma.test.findUnique({
    where: { id },
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
  })

  if (!test) {
    return null
  }

  return {
    ...test,
    description: test.description || undefined
  } as Test
}

export default async function TestPage({ params }: Props) {
  const test = await getTest(params.id)

  if (!test) {
    notFound()
  }

  return (
    <div className="container space-y-8 py-8">
      <TestFormHeader
        title="Edit Test"
        description={`Edit "${test.title}" details and questions.`}
      />
      <div className="mx-auto max-w-2xl">
        <TestContent test={test} />
      </div>
    </div>
  )
}