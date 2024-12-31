import type { PublicTestQueryParams } from "@/lib/validations/public-test"
import type { TestsResponse } from "@/types/tests/test"

export async function getPublicTests(params: Partial<PublicTestQueryParams>): Promise<TestsResponse> {
  const searchParams = new URLSearchParams()
  if (params.page) searchParams.set('page', params.page)
  if (params.limit) searchParams.set('limit', params.limit)
  if (params.search) searchParams.set('search', params.search)

  const response = await fetch(`/api/tests?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch tests')
  }

  return response.json()
}

export async function getPublicTest(testId: string) {
  const response = await fetch(`/api/tests/${testId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch test')
  }

  return response.json()
}