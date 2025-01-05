// app/(dashboards)/dashboard/page.tsx

import { StatsCard } from "./components/StatsCard"
import { TestProgressCard } from "./components/TestProgressCard"
import { RecentActivityCard } from "./components/RecentActivityCard"
import { NewTestsCard } from "./components/NewTestsCard"
import DashboardHeader from "./components/DashboardHeader"
import { RecentlyTakenTests } from "@/app/(test-taking)/tests/components/RecentlyTakenTests"

export default async function DashboardPage() {
  // Fetch test attempts data from API
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tests/attempts`, {
    cache: 'no-store'
  })
  const data = await response.json()
  const recentAttempts = data.completed

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
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <RecentlyTakenTests attempts={recentAttempts} />
            <NewTestsCard />
          </div>
        </div>
      </div>
    </div>
  )
}