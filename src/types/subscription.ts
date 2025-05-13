import { Database } from './supabase'

export type SubscriptionStatus = Database['public']['Tables']['profiles']['Row']['subscription_status']

export interface Plan {
  id: string
  name: string
  description: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  limits: {
    referrals: number
    customDomains: number
    teamMembers: number
  }
  stripePriceId: string
  stripeProductId: string
}

export interface Subscription {
  id: string
  status: SubscriptionStatus
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  plan: Plan
  customerId: string
}

export interface SubscriptionFormData {
  planId: string
  interval: 'month' | 'year'
}

export interface SubscriptionValidationError {
  planId?: string
  interval?: string
}

export function validateSubscription(data: SubscriptionFormData): SubscriptionValidationError {
  const errors: SubscriptionValidationError = {}

  if (!data.planId) {
    errors.planId = 'Plan is required'
  }

  if (!data.interval) {
    errors.interval = 'Billing interval is required'
  } else if (!['month', 'year'].includes(data.interval)) {
    errors.interval = 'Invalid billing interval'
  }

  return errors
}

export function formatPrice(price: number, interval: 'month' | 'year'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price) + `/${interval}`
}

export function getPlanFeatures(plan: Plan): string[] {
  return [
    `${plan.limits.referrals} referral links`,
    plan.limits.customDomains > 0 ? `${plan.limits.customDomains} custom domains` : 'No custom domains',
    plan.limits.teamMembers > 0 ? `${plan.limits.teamMembers} team members` : 'No team members',
    ...plan.features,
  ]
}

export function isSubscriptionActive(status: SubscriptionStatus): boolean {
  return ['active', 'trialing'].includes(status)
}

export function canDowngradePlan(currentPlan: Plan, newPlan: Plan): boolean {
  return currentPlan.price > newPlan.price
}

export function getUpgradePrice(currentPlan: Plan, newPlan: Plan): number {
  return Math.max(0, newPlan.price - currentPlan.price)
} 