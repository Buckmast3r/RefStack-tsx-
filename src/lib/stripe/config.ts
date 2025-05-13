import Stripe from 'stripe';

// Server-side Stripe instance
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}
export const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Use your desired API version
  typescript: true,
});

// Client-side Stripe setup (if you still need it elsewhere, otherwise it can be removed or be in a separate file)
// import { loadStripe } from '@stripe/stripe-js';
// const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
// if (!stripePublicKey) {
//   throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
// }
// export const stripeClientSide = loadStripe(stripePublicKey);

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
}; 