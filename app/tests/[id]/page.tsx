// app/tests/[id]/page.tsx
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import Link from "next/link"

async function getTest(id: string) {
  const test = await prisma.test.findUnique({
    where: { 
      id,
      isPublished: true 
    },
    include: {
      categories: true,
      questions: {
        include: {
          category: true
        }
      }
    }
  })

  if (!test) {
    return null
  }

  return {
    ...test,
    totalQuestions: test.questions.length
  }
}

export default async function TestPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await params before accessing id
  const { id } = await params
  const test = await getTest(id)

  if (!test) {
    notFound()
  }

  return (
    <div className="container max-w-3xl py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{test.title}</CardTitle>
          <CardDescription>{test.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <p className="text-sm font-medium">Test Details:</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>{test.totalQuestions} questions</li>
              <li>{test.categories.length} categories</li>
            </ul>
          </div>
          
          <div className="flex justify-end">
            <Button asChild>
              <Link href={`/tests/${test.id}/attempt`}>
                Start Test
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}