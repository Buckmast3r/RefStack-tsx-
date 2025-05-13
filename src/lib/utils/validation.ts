import { z } from 'zod'
import { AppError, ErrorCodes } from './error'

export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppError(
        'Validation error',
        400,
        ErrorCodes.VALIDATION_ERROR
      )
    }
    throw error
  }
}

export const schemas = {
  team: z.object({
    name: z.string().min(2).max(50),
    slug: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/),
  }),

  referral: z.object({
    code: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/),
    name: z.string().min(2).max(100).optional(),
  }),

  domain: z.object({
    name: z.string().min(2).max(255).regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/),
  }),

  user: z.object({
    email: z.string().email(),
    full_name: z.string().min(2).max(100).optional(),
    avatar_url: z.string().url().optional(),
  }),

  subscription: z.object({
    plan_id: z.string(),
  }),
} as const 