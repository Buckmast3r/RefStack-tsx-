import { Analytics } from '@vercel/analytics/react'
import posthog from 'posthog-js'

export function initAnalytics() {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      },
    })
  }
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(eventName, properties)
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}

export const AnalyticsEvents = {
  SIGN_UP: 'sign_up',
  SIGN_IN: 'sign_in',
  CREATE_TEAM: 'create_team',
  CREATE_REFERRAL: 'create_referral',
  CREATE_DOMAIN: 'create_domain',
  SUBSCRIBE: 'subscribe',
  UPGRADE: 'upgrade',
  DOWNGRADE: 'downgrade',
  CANCEL: 'cancel',
} as const 