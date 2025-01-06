// app/(dashboards)/dashboard/page.tsx
"use client"

import { StatsCard } from "./components/StatsCard"
import { TestProgressCard } from "./components/TestProgressCard"
import { RecentActivityCard } from "./components/RecentActivityCard"
import { TestResultsChart } from "./components/TestResultsChart"
import { NewTestsCard } from "./components/NewTestsCard"
import DashboardHeader from "./components/DashboardHeader"
import { useState, useEffect } from "react"
import { RecentlyTakenTests } from "@/app/(test-taking)/tests/components/RecentlyTakenTests"
import type { TestAttempt } from "@/types/tests/test-attempt"

export default function DashboardPage() {
  const [recentAttempts, setRecentAttempts] = useState<TestAttempt[]>([])

  useEffect(() => {
    async function fetchRecentAttempts() {
      try {
        const response = await fetch('/api/dashboard/recent-attempts')
        if (!response.ok) throw new Error('Failed to fetch recent attempts')
        const data = await response.json()
        setRecentAttempts(data)
      } catch (error) {
        console.error('Error fetching recent attempts:', error)
      }
    }

    void fetchRecentAttempts()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content */}
      <div className="container space-y-8 py-8">
        {/* Stats Overview */}
        <StatsCard />

        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <TestProgressCard />
            <RecentActivityCard />
            <RecentlyTakenTests attempts={recentAttempts} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <TestResultsChart />
            <NewTestsCard />
          </div>
        </div>
      </div>
    </div>
  )
}