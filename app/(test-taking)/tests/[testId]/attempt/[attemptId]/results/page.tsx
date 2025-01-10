"use client"

import { useEffect, useState } from "react"
import { ResultsSummary } from "./_components/ResultsSummary"
import { CategoryScores } from "./_components/CategoryScores"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { TestAttemptResult } from "@/types/tests/test-attempt"

interface ResultsPageProps {
  params: Promise<{
    attemptId: string
  }>
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const [results, setResults] = useState<TestAttemptResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attemptId, setAttemptId] = useState<string>("")

  // Handle the Promise params
  useEffect(() => {
    params.then(resolvedParams => {
      setAttemptId(resolvedParams.attemptId)
    })
  }, [params])

  // Fetch results when attemptId is available
  useEffect(() => {
    if (!attemptId) return

    async function fetchResults() {
      try {
        const response = await fetch(`/api/tests/attempt/${attemptId}/results`)
        if (!response.ok) {
          throw new Error("Failed to fetch results")
        }
        const data = await response.json()
        
        // Add this console.log to debug the response
        console.log('API Response:', data);
        
        // Check the exact structure of the response
        if (!data || data.error) {
          throw new Error(data.error || "Failed to load results")
        }
        
        setResults(data)
      } catch (err) {
        console.error('Error details:', err);
        setError(err instanceof Error ? err.message : "Failed to load results")
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [attemptId])

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-[90vh]">
        <Card className="w-full max-w-[600px] shadow-lg">
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h2 className="text-lg font-semibold">Loading Results...</h2>
              <p className="text-muted-foreground mt-2">Please wait while we calculate your scores.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container flex items-center justify-center min-h-[90vh]">
        <Card className="w-full max-w-[600px] shadow-lg">
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h2 className="text-lg font-semibold text-destructive">Error</h2>
              <p className="text-muted-foreground mt-2">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!results) return null

  return (
    <div className="container space-y-6 py-8">
      <h1 className="text-3xl font-bold text-center">
        {results.test.name}
      </h1>

      <div className="flex justify-center items-start">
        <Card className="w-full max-w-[800px] shadow-lg">
          <CardHeader className="text-center border-b pb-4">
            <h2 className="text-2xl font-bold">Test Results</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              <ResultsSummary 
                totalScore={results.totalScore} 
                maxScore={results.maxScore} 
                percentageScore={results.percentageScore} 
              />
              <CategoryScores categoryScores={results.categoryScores} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}