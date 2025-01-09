'use client'

import { analytics } from '@/utils/analytics'
import { Card } from '@tremor/react'
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'
import ReactCountryFlag from 'react-country-flag'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { ReactNode } from 'react'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale, 
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: string
  amtVisitorsToday: number
  timeseriesPageviews: Awaited<ReturnType<typeof analytics.retrieveDays>>
  topCountries: [string, number][]
}

type StatCardProps = {
  title: string
  value: string | number  
  badge?: ReactNode
}

const StatCard = ({ title, value, badge }: StatCardProps) => {
  return (
    <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-xl border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {title}
        </p>
        {badge}
      </div>
      <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-2">
        {value}
      </p>
    </Card>
  )
}

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0
  const isNeutral = percentage === 0 
  const isNegative = percentage < 0

  if (isNaN(percentage)) return null

  const getStyle = () => {
    if (isPositive) {
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
    }
    if (isNeutral) {
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getStyle()}`}>
      {isPositive ? <ArrowUpRight className='h-3 w-3' /> : null}
      {isNeutral ? <ArrowRight className='h-3 w-3' /> : null}
      {isNegative ? <ArrowDownRight className='h-3 w-3' /> : null}
      {Math.abs(percentage).toFixed(0)}%
    </span>
  )
}

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  amtVisitorsToday,
  timeseriesPageviews,
  topCountries,
}: AnalyticsDashboardProps) => {
  const chartData = {
    labels: timeseriesPageviews.map(day => day.date),
    datasets: [
      {
        label: 'Visitors',
        data: timeseriesPageviews.map(day => 
          day.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
        ),
        backgroundColor: 'rgb(99, 102, 241)', 
        borderRadius: 8,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Daily Visitors',
        color: 'rgb(156, 163, 175)',
        font: {
          size: 14,
          weight: 500
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          color: 'rgb(156, 163, 175)'
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgb(156, 163, 175)'
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        }
      }
    }
  }

  return (
    <div className="space-y-8 p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <StatCard 
          title="Avg. visitors/day"
          value={avgVisitorsPerDay}
        />
        <StatCard 
          title="Visitors today"
          value={amtVisitorsToday}
          badge={
            <Badge percentage={(amtVisitorsToday / Number(avgVisitorsPerDay) - 1) * 100} />
          }
        />
      </div>

      <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-xl border border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Top Visiting Countries
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {topCountries?.map(([countryCode, number]) => (
            <div 
              key={countryCode}
              className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 transition-transform hover:scale-105"
            >
              <ReactCountryFlag
                className="text-2xl rounded-sm shadow-sm"
                svg
                countryCode={countryCode}
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {countryCode}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {number} visits
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-xl border border-gray-100 dark:border-gray-800">
        <div className="h-[400px]">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </Card>
    </div>
  )
}

export default AnalyticsDashboard