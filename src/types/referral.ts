import { Database } from './supabase'

export type Referral = Database['public']['Tables']['referrals']['Row']
export type ReferralInsert = Database['public']['Tables']['referrals']['Insert']
export type ReferralUpdate = Database['public']['Tables']['referrals']['Update']

export interface ReferralCard {
  id: string
  userId: string
  title: string
  description: string
  url: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
  clicks: number
  views: number
  isPublic: boolean
  order: number
  tags?: string[]
  metadata?: {
    [key: string]: unknown
  }
}

export interface ReferralCardStats {
  cardId: string
  clicks: number
  views: number
  lastClicked?: string
  lastViewed?: string
}

export interface CreateReferralCardInput {
  title: string
  description: string
  url: string
  imageUrl?: string
  isPublic?: boolean
  tags?: string[]
  metadata?: {
    [key: string]: unknown
  }
}

export interface UpdateReferralCardInput extends Partial<CreateReferralCardInput> {
  id: string
  order?: number
}

export interface ReferralCardFilters {
  search?: string
  tags?: string[]
  isPublic?: boolean
  sortBy?: 'createdAt' | 'updatedAt' | 'clicks' | 'views' | 'order'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}

export interface ReferralWithStats extends Referral {
  stats: {
    totalClicks: number
    totalViews: number
    uniqueVisitors: number
    conversionRate: number
    lastClickAt: string | null
    topCountries: Array<{
      country: string
      count: number
    }>
  }
}

export interface ReferralFormData {
  title: string
  description: string
  url: string
  image_url?: string
  is_active: boolean
  position: number
  metadata?: Record<string, unknown>
}

export interface ReferralValidationError {
  title?: string
  description?: string
  url?: string
  image_url?: string
}

export function validateReferral(data: ReferralFormData): ReferralValidationError {
  const errors: ReferralValidationError = {}

  if (!data.title) {
    errors.title = 'Title is required'
  } else if (data.title.length > 100) {
    errors.title = 'Title must be less than 100 characters'
  }

  if (data.description && data.description.length > 500) {
    errors.description = 'Description must be less than 500 characters'
  }

  if (!data.url) {
    errors.url = 'URL is required'
  } else {
    try {
      new URL(data.url)
    } catch {
      errors.url = 'URL must be valid'
    }
  }

  if (data.image_url) {
    try {
      new URL(data.image_url)
    } catch {
      errors.image_url = 'Image URL must be valid'
    }
  }

  return errors
}

export function formatReferralUrl(username: string, referralId: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}/u/${username}/${referralId}`
}

export function getReferralStats(referral: Referral): ReferralWithStats['stats'] {
  return {
    totalClicks: referral.clicks,
    totalViews: referral.views,
    uniqueVisitors: 0, // This would come from analytics
    conversionRate: referral.views > 0 ? (referral.clicks / referral.views) * 100 : 0,
    lastClickAt: null, // This would come from analytics
    topCountries: [], // This would come from analytics
  }
} 