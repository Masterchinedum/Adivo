export interface Stats {
  totalTests: number
  averageScore: number
  availableTests: number
}

export interface TestProgress {
  id: string
  title: string
  progress: number
  lastAccessed: Date
}

export interface RecentActivity {
  id: string
  type: 'completion' | 'start'
  testTitle: string
  date: Date
  score?: number
}

export interface TestResult {
  testId: string
  testTitle: string
  score: number
  date: Date
}

export interface NewTest {
  id: string
  title: string
  description?: string
  createdAt: Date
  updatedAt: Date
}