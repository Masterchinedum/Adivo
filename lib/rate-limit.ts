import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Create a new ratelimiter, that allows 5 requests per 10 seconds
export const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
})

// Helper function to check rate limit
export async function checkRateLimit(identifier: string) {
  try {
    const result = await rateLimit.limit(identifier)
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    }
  } catch (error) {
    console.error('Rate limit error:', error)
    // If rate limiting fails, allow the request to proceed
    return { success: true, limit: 0, remaining: 0, reset: 0 }
  }
}