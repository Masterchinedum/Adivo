import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

export async function rateLimit(
  identifier: string,
  attempts: number,
  window: string
) {
  const key = `rate_limit:${identifier}`
  
  const [response] = await redis
    .multi()
    .incr(key)
    .expire(key, window)
    .exec()

  return {
    success: response <= attempts
  }
}