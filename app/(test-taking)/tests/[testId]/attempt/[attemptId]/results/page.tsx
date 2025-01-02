"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ResultsSummary } from "./_components/ResultsSummary"
import { CategoryScores } from "./_components/CategoryScores"
import type { TestAttemptResult } from "@/types/tests/test-attempt"

export default function ResultsPage({ 
  params 
}: { 
  params: { attemptId: string } 
}) {
  const [results, setResults] = useState<TestAttemptResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch(`/api/tests/attempt/${params.attemptId}/results`)
        if (!response.ok) {
          throw new Error("Failed to fetch results")
        }
        const data: TestAttemptResult = await response.json()
        setResults(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load results")
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [params.attemptId])

  if (loading) return <div>Loading results...</div>
  if (error) return <div>Error: {error}</div>
  if (!results) return null

  return (
    <div className="container py-8 space-y-6">
      <ResultsSummary 
        totalScore={results.totalScore} 
        maxScore={results.maxScore} 
        percentageScore={results.percentageScore} 
      />
      <CategoryScores categoryScores={results.categoryScores} />
    </div>
  )
}