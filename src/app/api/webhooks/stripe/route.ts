import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripeServer } from '@/lib/stripe/config'
import { supabase } from '@/lib/supabase/client'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripeServer.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  switch (event.type) {
    case 'checkout.session.completed':
      if (session.object === 'checkout.session') {
        const subscription = await stripeServer.subscriptions.retrieve(
          session.subscription as string
        )

        await supabase
          .from('subscriptions')
          .upsert({
            user_id: session.client_reference_id,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer as string,
            status: subscription.status,
            plan_id: subscription.items.data[0].price.id,
            current_period_end: new Date(subscription.current_period_end * 1000),
          })
      }
      break

    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object as Stripe.Invoice
      await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          current_period_end: new Date(invoicePaymentSucceeded.period_end * 1000),
        })
        .eq('stripe_subscription_id', invoicePaymentSucceeded.subscription as string)
      break

    case 'invoice.payment_failed':
      const invoicePaymentFailed = event.data.object as Stripe.Invoice
      await supabase
        .from('subscriptions')
        .update({
          status: 'past_due',
        })
        .eq('stripe_subscription_id', invoicePaymentFailed.subscription as string)
      break

    case 'customer.subscription.deleted':
      const customerSubscriptionDeleted = event.data.object as Stripe.Subscription
      await supabase
        .from('subscriptions')
        .update({
          status: 'canceled',
        })
        .eq('stripe_subscription_id', customerSubscriptionDeleted.id)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new NextResponse(null, { status: 200 })
} 