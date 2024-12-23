// app/(dashboards)/admindash/tests/[id]/page.tsx

import { Metadata } from "next"
import TestForm from "../components/test-form"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { TestType } from "@/types/test"

export const metadata: Metadata = {
  title: "Edit Test",
  description: "Modify an existing assessment test",
}

const getTest = async (id: string) => {
  const test = await prisma.test.findUnique({
    where: {
      id: id
    },
    include: {
      questions: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  }) as TestType;

  if (!test) {
    notFound()
  }

  return test
}

export default async function EditTestPage({ params }: { params: { id: string } }) {
  const id = await params.id;
  const test = await getTest(id);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Test</h1>
        <p className="text-muted-foreground">
          Modify test details, questions, and options.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="p-6 border rounded-lg bg-card">
          <TestForm test={test} />
        </div>
      </div>
    </div>
  )
}