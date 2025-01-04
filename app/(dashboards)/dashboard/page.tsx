// app/(dashboards)/dashboard/page.tsx

import DashboardHeader from './components/DashboardHeader'
import { Suspense } from 'react'
import { StatsCard } from './components/StatsCard'
import { TestProgressCard } from './components/TestProgressCard'
import { RecentActivityCard } from './components/RecentActivityCard'
import { TestResultsChart } from './components/TestResultsChart'
import { NewTestsCard } from './components/NewTestsCard'
import {
  StatsCardSkeleton,
  TestProgressSkeleton,
  RecentActivitySkeleton,
  TestResultsChartSkeleton,
  NewTestsCardSkeleton
} from './components/loading-states'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import type { DashboardStats, InProgressTest, RecentActivity, TestPerformance, NewTest } from '@/types/dashboard'

async function getDashboardData() {
  const { userId: clerkUserId } = await auth()
  if (!clerkUserId) return null

  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    select: { id: true }
  })
  if (!user) return null

  // Get in-progress tests
  const inProgressTests = await prisma.testAttempt.findMany({
    where: {
      userId: user.id,
      status: 'IN_PROGRESS'
    },
    select: {
      id: true,
      test: {
        select: {
          title: true,
        }
      },
      startedAt: true,
      responses: true,
      _count: {
        select: {
          responses: true
        }
      }
    },
    take: 5
  })

  // Get recent activity
  const recentActivity = await prisma.testAttempt.findMany({
    where: {
      userId: user.id,
      OR: [
        { status: 'COMPLETED' },
        { status: 'IN_PROGRESS' }
      ]
    },
    select: {
      id: true,
      status: true,
      test: {
        select: {
          title: true
        }
      },
      startedAt: true,
      completedAt: true,
      percentageScore: true
    },
    orderBy: {
      startedAt: 'desc'
    },
    take: 5
  })

  // Get new/updated tests
  const newTests = await prisma.test.findMany({
    where: {
      isPublished: true
    },
    select: {
      id: true,
      title: true,
      description: true,
      updatedAt: true,
      categories: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    },
    take: 5
  })

  return {
    inProgressTests: inProgressTests.map(test => ({
      id: test.id,
      title: test.test.title,
      progress: (test._count.responses / test.responses.length) * 100,
      lastAccessed: test.startedAt
    })),
    recentActivity: recentActivity.map(activity => ({
      id: activity.id,
      type: activity.status === 'COMPLETED' ? 'completed' : 'started',
      testTitle: activity.test.title,
      timestamp: activity.status === 'COMPLETED' ? activity.completedAt! : activity.startedAt,
      score: activity.percentageScore
    })),
    newTests: newTests.map(test => ({
      id: test.id,
      title: test.title,
      description: test.description || '',
      categories: test.categories,
      updatedAt: test.updatedAt.toISOString()
    }))
  }
}

export default async function Dashboard() {
  const data = await getDashboardData()

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-8 pt-6">
        {/* Stats Section */}
        <div className="grid gap-4 md:grid-cols-3">
          <Suspense fallback={<StatsCardSkeleton />}>
            <StatsCard 
              title="Tests Completed"
              value={5}
              description="Total tests taken"
              trend="+2 this month"
            />
          </Suspense>
          <Suspense fallback={<StatsCardSkeleton />}>
            <StatsCard 
              title="Average Score"
              value="78%"
              description="Across all tests"
            />
          </Suspense>
          <Suspense fallback={<StatsCardSkeleton />}>
            <StatsCard 
              title="Tests Available"
              value={12}
              description="Tests you can take"
            />
          </Suspense>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <section className="space-y-6">
            <Suspense fallback={<TestProgressSkeleton />}>
              <TestProgressCard 
                inProgressTests={data?.inProgressTests || []} 
              />
            </Suspense>
            <Suspense fallback={<RecentActivitySkeleton />}>
              <RecentActivityCard 
                activities={data?.recentActivity || []} 
              />
            </Suspense>
          </section>

          {/* Right Column */}
          <section className="space-y-6">
            <Suspense fallback={<TestResultsChartSkeleton />}>
              <TestResultsChart 
                data={[]} // We'll implement test performance data later
              />
            </Suspense>
            <Suspense fallback={<NewTestsCardSkeleton />}>
              <NewTestsCard 
                tests={data?.newTests || []} 
              />
            </Suspense>
          </section>
        </div>
      </div>
    </div>
  )
}