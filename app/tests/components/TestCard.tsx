// app/tests/components/TestCard.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TestCardProps {
  test: {
    id: string
    title: string
    description?: string | null
    totalQuestions: number
    categories: Array<{ name: string }>
  }
}

export function TestCard({ test }: TestCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">{test.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {test.description || "No description provided"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {test.categories.map((category) => (
            <Badge key={category.name} variant="secondary">
              {category.name}
            </Badge>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {test.totalQuestions} Questions
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/tests/${test.id}`}>Take Test</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}