import { UserRole } from '@/types/user'

export const ROLES = {
  USER: 'user',
  PRO: 'pro',
  ADMIN: 'admin',
} as const

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  user: [
    'create:referral',
    'read:own:referral',
    'update:own:referral',
    'delete:own:referral',
    'read:own:stats',
  ],
  pro: [
    'create:referral',
    'read:own:referral',
    'update:own:referral',
    'delete:own:referral',
    'read:own:stats',
    'create:custom:domain',
    'read:advanced:stats',
    'create:unlimited:referrals',
  ],
  admin: [
    'create:referral',
    'read:own:referral',
    'update:own:referral',
    'delete:own:referral',
    'read:own:stats',
    'create:custom:domain',
    'read:advanced:stats',
    'create:unlimited:referrals',
    'read:all:referrals',
    'update:all:referrals',
    'delete:all:referrals',
    'read:all:stats',
    'manage:users',
    'manage:roles',
    'manage:settings',
  ],
}

export const ROLE_LIMITS: Record<UserRole, { maxReferrals: number }> = {
  user: {
    maxReferrals: 5,
  },
  pro: {
    maxReferrals: Infinity,
  },
  admin: {
    maxReferrals: Infinity,
  },
}

export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role].includes(permission)
}

export function getMaxReferrals(role: UserRole): number {
  return ROLE_LIMITS[role].maxReferrals
} 