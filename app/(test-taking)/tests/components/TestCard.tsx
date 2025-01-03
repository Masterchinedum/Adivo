//app/(test-taking)/tests/components/TestCard.tsx

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button" 
import { ArrowRight } from "lucide-react"
import type { Test } from "@/types/tests/test"

interface TestCardProps {
  test: Test
  viewType?: "grid" | "list"  // Make it optional with a default value
}

export function TestCard({ test, viewType = "grid" }: TestCardProps) {
  const cardClassName = viewType === "grid"
    ? "flex flex-col min-h-[320px] h-full transition-all hover:shadow-md"
    : "flex flex-col transition-all hover:shadow-md sm:flex-row sm:h-[180px]"

  const contentClassName = viewType === "grid" 
    ? "flex-1"
    : "flex-1 flex flex-col sm:flex-row"

  return (
    <Card className={cardClassName}>
      <Link href={`/tests/${test.id}`} className={contentClassName}>
        <CardHeader className={viewType === "list" ? "flex-1" : ""}>
          <CardTitle className="line-clamp-2 text-xl">
            {test.title}
          </CardTitle>
          {test.description && (
            <CardDescription className="line-clamp-2 mt-2">
              {test.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className={viewType === "list" ? "w-[280px]" : ""}>
          <div className="flex flex-wrap gap-2 mb-4">
            {test.categories?.map((category) => (
              <Badge 
                key={category.name} 
                variant="secondary"
                className="text-xs truncate max-w-[150px]"
              >
                {category.name}
              </Badge>
            ))}
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Questions: {test._count?.questions || 0}</p>
            <p>Categories: {test.categories?.length || 0}</p>
          </div>
        </CardContent>
      </Link>
      <CardFooter className={`border-t p-4 ${viewType === "list" ? "sm:w-[200px] sm:border-l sm:border-t-0" : "mt-auto"}`}>
        <Button className="w-full" asChild>
          <Link href={`/tests/${test.id}`}>
            View Test
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}