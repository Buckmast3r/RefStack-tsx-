import Stripe from 'stripe'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing env.STRIPE_SECRET_KEY')
}

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')
}

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Use the latest stable version
  typescript: true,
})

// Helper to handle Stripe errors
export class StripeError extends Error {
  constructor(
    message: string,
    public code?: string,
    public type?: string
  ) {
    super(message)
    this.name = 'StripeError'
  }
}

export function handleStripeError(error: any): never {
  console.error('Stripe error:', error)
  
  if (error instanceof Stripe.errors.StripeError) {
    throw new StripeError(
      error.message,
      error.code,
      error.type
    )
  }
  
  throw new StripeError('An unexpected error occurred')
}

// Type-safe Stripe operations
export async function createCheckoutSession(
  priceId: string,
  userId: string,
  successUrl: string,
  cancelUrl: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      customer_email: userId, // Assuming userId is email for now
      metadata: {
        userId,
      },
    })
    
    return session
  } catch (error) {
    handleStripeError(error)
  }
}

export async function createPortalSession(customerId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })
    
    return session
  } catch (error) {
    handleStripeError(error)
  }
}

export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['customer', 'latest_invoice'],
    })
    
    return subscription
  } catch (error) {
    handleStripeError(error)
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    return subscription
  } catch (error) {
    handleStripeError(error)
  }
}

export async function updateSubscription(
  subscriptionId: string,
  priceId: string
) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    
    const updatedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        items: [
          {
            id: subscription.items.data[0].id,
            price: priceId,
          },
        ],
      }
    )
    
    return updatedSubscription
  } catch (error) {
    handleStripeError(error)
  }
}

// Webhook signature verification
export function constructEvent(
  payload: string | Buffer,
  signature: string,
  secret: string
) {
  try {
    return stripe.webhooks.constructEvent(
      payload,
      signature,
      secret
    )
  } catch (error) {
    handleStripeError(error)
  }
} 