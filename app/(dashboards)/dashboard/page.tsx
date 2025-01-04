//app/(dashboards)/dashboard/page.tsx

import DashboardHeader from './components/DashboardHeader'

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        
        {/* Stats Section */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* StatsCards will go here */}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* TestProgressCard */}
            {/* RecentActivityCard */}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* TestResultsChart */}
            {/* NewTestsCard */}
          </div>
        </div>
      </div>
    </div>
  )
}