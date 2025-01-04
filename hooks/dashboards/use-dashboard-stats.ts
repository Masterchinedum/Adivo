// hooks/dashboard/use-dashboard-stats.ts
import { useQuery } from "@tanstack/react-query"

interface DashboardStats {
  totalTests: number
  averageScore: number
  availableTests: number
}

async function getDashboardStats(): Promise<DashboardStats> {
  const response = await fetch("/api/dashboard/stats")
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats")
  }
  return response.json()
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats
  })
}