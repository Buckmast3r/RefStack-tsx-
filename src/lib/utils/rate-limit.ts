import { Redis } from '@upstash/redis'
import { AppError, ErrorCodes } from './error'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function rateLimit(
  key: string,
  limit: number,
  window: number
): Promise<void> {
  const current = await redis.incr(key)
  if (current === 1) {
    await redis.expire(key, window)
  }

  if (current > limit) {
    throw new AppError(
      'Rate limit exceeded',
      429,
      ErrorCodes.RATE_LIMIT_EXCEEDED
    )
  }
}

export const RateLimits = {
  API: {
    limit: 100,
    window: 60, // 1 minute
  },
  AUTH: {
    limit: 5,
    window: 300, // 5 minutes
  },
  REFERRAL: {
    limit: 1000,
    window: 3600, // 1 hour
  },
} as const 