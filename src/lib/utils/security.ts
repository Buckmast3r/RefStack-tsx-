import { createHash, randomBytes } from 'crypto'
import { AppError, ErrorCodes } from './error'

export function generateToken(length: number = 32): string {
  return randomBytes(length).toString('hex')
}

export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

export function validatePassword(password: string): void {
  if (password.length < 8) {
    throw new AppError(
      'Password must be at least 8 characters long',
      400,
      ErrorCodes.VALIDATION_ERROR
    )
  }

  if (!/[A-Z]/.test(password)) {
    throw new AppError(
      'Password must contain at least one uppercase letter',
      400,
      ErrorCodes.VALIDATION_ERROR
    )
  }

  if (!/[a-z]/.test(password)) {
    throw new AppError(
      'Password must contain at least one lowercase letter',
      400,
      ErrorCodes.VALIDATION_ERROR
    )
  }

  if (!/[0-9]/.test(password)) {
    throw new AppError(
      'Password must contain at least one number',
      400,
      ErrorCodes.VALIDATION_ERROR
    )
  }

  if (!/[!@#$%^&*]/.test(password)) {
    throw new AppError(
      'Password must contain at least one special character (!@#$%^&*)',
      400,
      ErrorCodes.VALIDATION_ERROR
    )
  }
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

export function sanitizeString(str: string): string {
  return str.trim().replace(/[<>]/g, '')
}

export function generateApiKey(): string {
  return `ref_${randomBytes(16).toString('hex')}`
}

export function maskEmail(email: string): string {
  const [username, domain] = email.split('@')
  const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1)
  return `${maskedUsername}@${domain}`
}

export function maskApiKey(apiKey: string): string {
  return `${apiKey.slice(0, 8)}...${apiKey.slice(-4)}`
} 