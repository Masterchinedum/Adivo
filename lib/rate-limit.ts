import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function rateLimit(
  identifier: string,
  attempts: number = 5,
  windowInSeconds: number = 60
) {
  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(attempts, `${windowInSeconds}s`),
    analytics: true,
  });

  const { success, limit, reset, remaining } = await ratelimit.limit(
    `ratelimit:${identifier}`
  );

  if (!success) {
    throw new Error(`Too many requests. Try again in ${reset} seconds.`);
  }

  return { success, limit, reset, remaining };
}