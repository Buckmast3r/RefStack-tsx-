import { Database } from './supabase'

export type Notification = Database['public']['Tables']['notifications']['Row']
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert']
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update']

export type NotificationType = 
  | 'referral_click'
  | 'referral_conversion'
  | 'subscription_created'
  | 'subscription_updated'
  | 'subscription_canceled'
  | 'subscription_past_due'
  | 'team_invite'
  | 'team_join'
  | 'team_leave'
  | 'custom_domain_added'
  | 'custom_domain_verified'
  | 'custom_domain_failed'

export interface NotificationData {
  type: NotificationType
  title: string
  message: string
  link?: string
  metadata?: Record<string, unknown>
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  inApp: boolean
  types: {
    [key in NotificationType]: boolean
  }
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  email: true,
  push: true,
  inApp: true,
  types: {
    referral_click: true,
    referral_conversion: true,
    subscription_created: true,
    subscription_updated: true,
    subscription_canceled: true,
    subscription_past_due: true,
    team_invite: true,
    team_join: true,
    team_leave: true,
    custom_domain_added: true,
    custom_domain_verified: true,
    custom_domain_failed: true,
  },
}

export function getNotificationIcon(type: NotificationType): string {
  const icons: Record<NotificationType, string> = {
    referral_click: 'cursor-click',
    referral_conversion: 'chart-line',
    subscription_created: 'credit-card',
    subscription_updated: 'credit-card',
    subscription_canceled: 'credit-card',
    subscription_past_due: 'alert-circle',
    team_invite: 'user-plus',
    team_join: 'user-check',
    team_leave: 'user-minus',
    custom_domain_added: 'globe',
    custom_domain_verified: 'check-circle',
    custom_domain_failed: 'x-circle',
  }

  return icons[type] ?? 'bell'
}

export function getNotificationColor(type: NotificationType): string {
  const colors: Record<NotificationType, string> = {
    referral_click: 'blue',
    referral_conversion: 'green',
    subscription_created: 'purple',
    subscription_updated: 'purple',
    subscription_canceled: 'red',
    subscription_past_due: 'red',
    team_invite: 'blue',
    team_join: 'green',
    team_leave: 'red',
    custom_domain_added: 'blue',
    custom_domain_verified: 'green',
    custom_domain_failed: 'red',
  }

  return colors[type] ?? 'gray'
}

export function formatNotificationTime(date: string): string {
  const now = new Date()
  const notificationDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - notificationDate.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays}d ago`
  }

  return notificationDate.toLocaleDateString()
} 