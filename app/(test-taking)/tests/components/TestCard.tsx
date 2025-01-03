"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button" 
import { Progress } from "@/components/ui/progress" // Make sure this import is correct
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Test } from "@/types/tests/test"
import type { TestAttempt } from "@/types/tests/test-attempt"

interface TestCardProps {
  test: Test
  viewType?: "grid" | "list"
  attempt?: TestAttempt
}

export function TestCard({ test, viewType = "grid", attempt }: TestCardProps) {
  const cardClassName = viewType === "grid"
    ? "flex flex-col h-[280px] transition-all hover:shadow-md"
    : "flex flex-col transition-all hover:shadow-md sm:flex-row sm:h-[180px]"

  const contentClassName = viewType === "grid" 
    ? "flex-1"
    : "flex-1 flex flex-col sm:flex-row"

  return (
    <Card className={cn(cardClassName)}>
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
                key={category.id} 
                variant="secondary"
                className="text-xs truncate max-w-[150px]"
              >
                {category.name}
              </Badge>
            ))}
          </div>
          
          {attempt && attempt.status === "IN_PROGRESS" && (
            <div className="mt-4 space-y-2">
              <Progress 
                value={Math.round((attempt.answeredQuestions / attempt.totalQuestions) * 100)}
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                {attempt.answeredQuestions} of {attempt.totalQuestions} questions completed
              </p>
            </div>
          )}
        </CardContent>
      </Link>
      
      <CardFooter className={cn(
        "border-t p-4",
        viewType === "list" ? "sm:w-[200px] sm:border-l sm:border-t-0" : "mt-auto"
      )}>
        <Button className="w-full" asChild>
          <Link href={attempt ? `/tests/${test.id}/attempt/${attempt.id}` : `/tests/${test.id}`}>
            {attempt ? 'Continue Test' : 'Start Test'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}