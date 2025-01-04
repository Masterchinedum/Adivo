// app/(dashboards)/dashboard/components/NewTestsCard.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

interface Test {
  id: string
  title: string
  description: string
  categories: {
    id: string
    name: string
  }[]
  updatedAt: string
}

export function NewTestsCard() {
  const [tests, setTests] = useState<Test[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNewTests() {
      try {
        const response = await fetch('/api/dashboard/tests/new')
        if (!response.ok) throw new Error('Failed to fetch new tests')
        const data = await response.json()
        setTests(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error fetching tests')
        console.error('Error fetching new tests:', error)
      }
    }

    fetchNewTests()
  }, [])

  if (error) return <div>Error loading new tests: {error}</div>
  if (!tests.length) return <div>No new tests available</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Tests Available</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {tests.map((test) => (
          <div key={test.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium leading-none">{test.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {test.description}
                </p>
              </div>
              <Button asChild size="sm" variant="ghost">
                <Link href={`/tests/${test.id}`}>
                  Take Test
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex gap-2">
              {test.categories.map((category) => (
                <Badge key={category.id} variant="secondary">
                  {category.name}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Added {new Date(test.updatedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}