import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { supabase } from '@/lib/supabase/client'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object

  switch (event.type) {
    case 'checkout.session.completed':
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription
      )

      await supabase
        .from('subscriptions')
        .upsert({
          user_id: session.client_reference_id,
          stripe_subscription_id: subscription.id,
          stripe_customer_id: subscription.customer,
          status: subscription.status,
          plan_id: subscription.items.data[0].price.id,
          current_period_end: new Date(subscription.current_period_end * 1000),
        })

      break

    case 'invoice.payment_succeeded':
      await supabase
        .from('subscriptions')
        .update({
          status: 'active',
          current_period_end: new Date(session.period_end * 1000),
        })
        .eq('stripe_subscription_id', session.subscription)

      break

    case 'invoice.payment_failed':
      await supabase
        .from('subscriptions')
        .update({
          status: 'past_due',
        })
        .eq('stripe_subscription_id', session.subscription)

      break

    case 'customer.subscription.deleted':
      await supabase
        .from('subscriptions')
        .update({
          status: 'canceled',
        })
        .eq('stripe_subscription_id', session.id)

      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new NextResponse(null, { status: 200 })
} 