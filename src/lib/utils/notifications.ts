import { supabase } from '@/lib/supabase/client'
import { AppError, ErrorCodes } from './error'

export async function createNotification({
  userId,
  type,
  title,
  message,
}: {
  userId: string
  type: 'referral' | 'system' | 'team' | 'subscription'
  title: string
  message: string
}) {
  try {
    const { error } = await supabase.from('notifications').insert({
      user_id: userId,
      type,
      title,
      message,
    })

    if (error) throw error
  } catch (error) {
    throw new AppError(
      'Failed to create notification',
      500,
      ErrorCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)

    if (error) throw error
  } catch (error) {
    throw new AppError(
      'Failed to mark notification as read',
      500,
      ErrorCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export async function getUnreadNotifications(userId: string) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .eq('read', false)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  } catch (error) {
    throw new AppError(
      'Failed to get notifications',
      500,
      ErrorCodes.INTERNAL_SERVER_ERROR
    )
  }
}

export const NotificationTypes = {
  REFERRAL: 'referral',
  SYSTEM: 'system',
  TEAM: 'team',
  SUBSCRIPTION: 'subscription',
} as const 