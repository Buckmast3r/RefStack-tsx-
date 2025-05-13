import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get<T>(key)
    return data
  } catch (error) {
    console.error('Cache get error:', error)
    return null
  }
}

export async function setCache<T>(
  key: string,
  value: T,
  ttl?: number
): Promise<void> {
  try {
    if (ttl) {
      await redis.set(key, value, { ex: ttl })
    } else {
      await redis.set(key, value)
    }
  } catch (error) {
    console.error('Cache set error:', error)
  }
}

export async function deleteCache(key: string): Promise<void> {
  try {
    await redis.del(key)
  } catch (error) {
    console.error('Cache delete error:', error)
  }
}

export const CacheKeys = {
  USER: (id: string) => `user:${id}`,
  TEAM: (id: string) => `team:${id}`,
  REFERRAL: (id: string) => `referral:${id}`,
  DOMAIN: (id: string) => `domain:${id}`,
  SUBSCRIPTION: (id: string) => `subscription:${id}`,
} as const

export const CacheTTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const 