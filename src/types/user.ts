import { User as SupabaseUser } from '@supabase/supabase-js'
import { Database } from './supabase'

export interface UserProfile {
  id: string
  email: string
  username: string
  fullName?: string
  avatarUrl?: string
  bio?: string
  website?: string
  twitter?: string
  github?: string
  linkedin?: string
  role: UserRole
  subscriptionStatus: SubscriptionStatus
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  createdAt: string
  updatedAt: string
}

export type UserRole = 'user' | 'pro' | 'admin'

export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete'

export type Theme = 'light' | 'dark' | 'system'

export interface User extends SupabaseUser {
  profile?: UserProfile
  email: string
  email_verified: boolean
  last_sign_in_at: string | null
}

export interface AuthState {
  user: User | null
  profile: UserProfile | null
  isLoading: boolean
  error: Error | null
}

export interface SignUpInput {
  email: string
  password: string
  username: string
  fullName?: string
}

export interface SignInInput {
  email: string
  password: string
}

export interface UpdateProfileInput {
  username?: string
  fullName?: string
  bio?: string
  website?: string
  twitter?: string
  github?: string
  linkedin?: string
  avatarUrl?: string
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export interface UserFormData {
  username: string
  full_name?: string
  bio?: string
  website?: string
  avatar_url?: string
  theme?: Theme
  email_notifications: boolean
  marketing_emails: boolean
}

export interface UserValidationError {
  username?: string
  full_name?: string
  bio?: string
  website?: string
  avatar_url?: string
}

export function validateUser(data: UserFormData): UserValidationError {
  const errors: UserValidationError = {}

  if (!data.username) {
    errors.username = 'Username is required'
  } else if (data.username.length < 3) {
    errors.username = 'Username must be at least 3 characters'
  } else if (data.username.length > 30) {
    errors.username = 'Username must be less than 30 characters'
  } else if (!/^[a-zA-Z0-9_-]+$/.test(data.username)) {
    errors.username = 'Username can only contain letters, numbers, underscores, and hyphens'
  }

  if (data.full_name && data.full_name.length > 100) {
    errors.full_name = 'Full name must be less than 100 characters'
  }

  if (data.bio && data.bio.length > 500) {
    errors.bio = 'Bio must be less than 500 characters'
  }

  if (data.website) {
    try {
      new URL(data.website)
    } catch {
      errors.website = 'Website must be a valid URL'
    }
  }

  if (data.avatar_url) {
    try {
      new URL(data.avatar_url)
    } catch {
      errors.avatar_url = 'Avatar URL must be valid'
    }
  }

  return errors
}

export function hasPermission(user: User, permission: string): boolean {
  const rolePermissions: Record<UserRole, string[]> = {
    user: [
      'read:own_referrals',
      'create:own_referrals',
      'update:own_referrals',
      'delete:own_referrals',
      'read:own_stats',
    ],
    pro: [
      'read:own_referrals',
      'create:own_referrals',
      'update:own_referrals',
      'delete:own_referrals',
      'read:own_stats',
      'create:custom_domain',
      'read:advanced_stats',
      'create:unlimited_referrals',
    ],
    admin: [
      'read:own_referrals',
      'create:own_referrals',
      'update:own_referrals',
      'delete:own_referrals',
      'read:own_stats',
      'create:custom_domain',
      'read:advanced_stats',
      'create:unlimited_referrals',
      'manage:all_referrals',
      'manage:all_stats',
      'manage:users',
      'manage:roles',
      'manage:settings',
    ],
  }

  return rolePermissions[user.role]?.includes(permission) ?? false
}

export function getMaxReferrals(user: User): number {
  const limits: Record<UserRole, number> = {
    user: 5,
    pro: Infinity,
    admin: Infinity,
  }

  return limits[user.role] ?? 0
} 