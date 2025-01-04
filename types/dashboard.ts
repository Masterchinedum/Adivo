export interface DashboardStats {
  totalTests: number
  averageScore: number
  availableTests: number
  trend?: {
    change: number
    timeframe: string
  }
}

export interface InProgressTest {
  id: string
  title: string
  progress: number
  lastAccessed: Date
  categoryName: string
  totalQuestions: number
  answeredQuestions: number
}

export interface RecentActivity {
  id: string
  type: 'completed' | 'started'
  testTitle: string
  timestamp: Date
  score?: number
  categoryName?: string
}

export interface TestPerformance {
  date: string
  score: number
  testTitle?: string
  categoryName?: string
}

export interface NewTest {
  id: string
  title: string
  description: string
  categories: {
    id: string
    name: string
  }[]
  updatedAt: Date
}