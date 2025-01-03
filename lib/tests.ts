import type { PublicTestQueryParams } from "@/lib/validations/public-test"
import type { Test, TestsResponse } from "@/types/tests/test"  // Import Test type

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || ''

interface GetPublicTestsResponse {
  tests: Test[]
  totalPages: number
  totalTests: number
}

export async function getPublicTests({ 
  page = "1", 
  search = "" 
}: { 
  page?: string
  search?: string 
}): Promise<GetPublicTestsResponse> {
  const searchParams = new URLSearchParams({ page, search })
  const response = await fetch(`${BASE_URL}/api/tests?${searchParams}`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch tests')
  }

  return response.json()
}

export async function getPublicTest(testId: string): Promise<Test> {
  const response = await fetch(`${BASE_URL}/api/tests/${testId}`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch test')
  }

  return response.json()
}