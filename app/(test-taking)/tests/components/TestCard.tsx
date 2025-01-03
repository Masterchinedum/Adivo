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
import { getAttemptProgress } from "../utils/attempt"

interface TestCardProps {
  test: Test
  viewType?: "grid" | "list"
  attempt?: TestAttempt
}

export function TestCard({ test, viewType = "grid", attempt }: TestCardProps) {
  const cardClassName = viewType === "grid"
    ? "flex flex-col min-h-[320px] h-full transition-all hover:shadow-md"
    : "flex flex-col transition-all hover:shadow-md sm:flex-row sm:min-h-[200px]"

  const contentClassName = viewType === "grid" 
    ? "flex-1"
    : "flex-1 flex flex-col sm:flex-row"

  const progressInfo = attempt && getAttemptProgress(attempt)
  
  return (
    <Card className={cn(cardClassName)}>
      <Link href={`/tests/${test.id}`} className={contentClassName}>
        <CardHeader className={cn(
          "flex-none", // Prevent header from growing
          viewType === "list" ? "flex-1" : ""
        )}>
          <CardTitle className="line-clamp-2 text-xl leading-tight">
            {test.title}
          </CardTitle>
          {test.description && (
            <CardDescription className="line-clamp-2 mt-2 text-sm">
              {test.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className={cn(
          "flex-1 flex flex-col justify-between",
          viewType === "list" ? "w-[280px]" : ""
        )}>
          {/* Categories */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {test.categories?.map((category) => (
                <Badge 
                  key={category.id} 
                  variant="secondary"
                  className="text-xs truncate max-w-[120px] px-2 py-0.5"
                >
                  {category.name}
                </Badge>
              ))}
            </div>

            {/* Progress section */}
            {attempt && attempt.status === "IN_PROGRESS" && progressInfo && (
              <div className="space-y-2">
                <Progress 
                  value={progressInfo.progress}
                  className="h-1.5"
                />
                <p className="text-xs text-muted-foreground">
                  {progressInfo.answeredQuestions} of {progressInfo.totalQuestions} questions completed
                </p>
              </div>
            )}
          </div>

          {/* Test stats */}
          <div className="mt-4 text-sm text-muted-foreground">
            <p>{test._count?.questions || 0} Questions</p>
            <p>{test.categories?.length || 0} Categories</p>
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className={cn(
        "flex-none border-t p-4", // Make footer fixed height
        viewType === "list" ? "sm:w-[200px] sm:border-l sm:border-t-0" : ""
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