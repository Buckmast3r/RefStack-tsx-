export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'RefStack',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Referral Tracking & Management Platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const

export const AUTH_CONFIG = {
  providers: ['google', 'github', 'email'] as const,
  sessionDuration: 30 * 24 * 60 * 60, // 30 days
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60, // 15 minutes
} as const

export const TEAM_CONFIG = {
  maxMembers: {
    free: 1,
    pro: 5,
    enterprise: Infinity,
  },
  maxReferrals: {
    free: 5,
    pro: Infinity,
    enterprise: Infinity,
  },
  maxDomains: {
    free: 0,
    pro: 3,
    enterprise: Infinity,
  },
} as const

export const REFERRAL_CONFIG = {
  codeLength: 8,
  maxLength: 50,
  allowedChars: /^[a-z0-9-]+$/,
  defaultExpiry: 30 * 24 * 60 * 60, // 30 days
} as const

export const DOMAIN_CONFIG = {
  maxLength: 255,
  allowedChars: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
  verificationTimeout: 24 * 60 * 60, // 24 hours
} as const

export const SUBSCRIPTION_CONFIG = {
  plans: {
    free: {
      name: 'Free',
      price: 0,
      features: [
        'Up to 5 referral links',
        'Basic analytics',
        '1 team member',
      ],
    },
    pro: {
      name: 'Pro',
      price: 29,
      features: [
        'Unlimited referral links',
        'Advanced analytics',
        'Up to 5 team members',
        'Custom domains',
        'Priority support',
      ],
    },
    enterprise: {
      name: 'Enterprise',
      price: 99,
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'API access',
        'Custom integrations',
        'Dedicated support',
      ],
    },
  },
  trialPeriod: 14 * 24 * 60 * 60, // 14 days
  gracePeriod: 3 * 24 * 60 * 60, // 3 days
} as const

export const API_CONFIG = {
  rateLimit: {
    window: 60, // 1 minute
    max: 100, // requests per window
  },
  timeout: 10000, // 10 seconds
  maxPayloadSize: '1mb',
} as const

export const CACHE_CONFIG = {
  ttl: {
    short: 60, // 1 minute
    medium: 300, // 5 minutes
    long: 3600, // 1 hour
    day: 86400, // 24 hours
  },
  prefix: 'refstack:',
} as const

export const LOG_CONFIG = {
  levels: ['error', 'warn', 'info', 'debug'] as const,
  maxSize: '10mb',
  maxFiles: 5,
} as const 