import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const PLANS = {
  FREE: {
    id: 'price_free',
    name: 'Free',
    price: 0,
    features: [
      'Up to 5 referral links',
      'Basic analytics',
      '1 team member',
    ],
  },
  PRO: {
    id: 'price_pro',
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
  ENTERPRISE: {
    id: 'price_enterprise',
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
} 