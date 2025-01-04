// app/(dashboards)/dashboard/page.tsx

import { StatsCard } from "./components/StatsCard"
import { TestProgressCard } from "./components/TestProgressCard"
import { RecentActivityCard } from "./components/RecentActivityCard"
import { TestResultsChart } from "./components/TestResultsChart"
import { NewTestsCard } from "./components/NewTestsCard"
import DashboardHeader from "./components/DashboardHeader"

export default async function DashboardPage() {
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
            <TestResultsChart />
            <NewTestsCard />
          </div>
        </div>
      </div>
    </div>
  )
}