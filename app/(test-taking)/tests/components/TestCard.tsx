//app/(test-taking)/tests/components/TestCard.tsx

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Test } from "@/types/tests/test"

interface TestCardProps {
  test: Test
}

export function TestCard({ test }: TestCardProps) {
  return (
    <Card className="hover:bg-accent/5 transition-colors">
      <Link href={`/tests/${test.id}`}>
        <CardHeader>
          <CardTitle>{test.title}</CardTitle>
          {test.description && (
            <CardDescription>{test.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {test.categories?.map((category) => (
              <Badge key={category.name} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}