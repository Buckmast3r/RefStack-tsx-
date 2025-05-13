import { Database } from './supabase'

export type Setting = Database['public']['Tables']['settings']['Row']
export type SettingInsert = Database['public']['Tables']['settings']['Insert']
export type SettingUpdate = Database['public']['Tables']['settings']['Update']

export type Theme = 'light' | 'dark' | 'system'
export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko'
export type TimeZone = string
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'
export type TimeFormat = '12h' | '24h'
export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'INR' | 'BRL' | 'RUB'

export interface UserSettings {
  theme: Theme
  language: Language
  timeZone: TimeZone
  dateFormat: DateFormat
  timeFormat: TimeFormat
  currency: Currency
  emailNotifications: boolean
  marketingEmails: boolean
  pushNotifications: boolean
  inAppNotifications: boolean
  notificationTypes: {
    referralClick: boolean
    referralConversion: boolean
    subscriptionCreated: boolean
    subscriptionUpdated: boolean
    subscriptionCanceled: boolean
    subscriptionPastDue: boolean
    teamInvite: boolean
    teamJoin: boolean
    teamLeave: boolean
    customDomainAdded: boolean
    customDomainVerified: boolean
    customDomainFailed: boolean
  }
}

export interface TeamSettings {
  name: string
  description?: string
  logoUrl?: string
  website?: string
  defaultDomain?: string
  allowMemberInvites: boolean
  allowMemberRemoval: boolean
  allowMemberRoleUpdates: boolean
  allowCustomDomains: boolean
  allowAnalytics: boolean
  allowTeamStats: boolean
  allowTeamReferrals: boolean
  allowTeamSettings: boolean
}

export interface AppSettings {
  maintenanceMode: boolean
  allowRegistrations: boolean
  allowTeamCreation: boolean
  allowCustomDomains: boolean
  allowAnalytics: boolean
  allowTeamStats: boolean
  allowTeamReferrals: boolean
  allowTeamSettings: boolean
  defaultTheme: Theme
  defaultLanguage: Language
  defaultTimeZone: TimeZone
  defaultDateFormat: DateFormat
  defaultTimeFormat: TimeFormat
  defaultCurrency: Currency
  maxTeamMembers: number
  maxCustomDomains: number
  maxReferrals: number
  maxTeamReferrals: number
  maxTeamCustomDomains: number
  maxTeamAnalytics: number
  maxTeamStats: number
  maxTeamSettings: number
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: 'system',
  language: 'en',
  timeZone: 'UTC',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12h',
  currency: 'USD',
  emailNotifications: true,
  marketingEmails: false,
  pushNotifications: true,
  inAppNotifications: true,
  notificationTypes: {
    referralClick: true,
    referralConversion: true,
    subscriptionCreated: true,
    subscriptionUpdated: true,
    subscriptionCanceled: true,
    subscriptionPastDue: true,
    teamInvite: true,
    teamJoin: true,
    teamLeave: true,
    customDomainAdded: true,
    customDomainVerified: true,
    customDomainFailed: true,
  },
}

export const DEFAULT_TEAM_SETTINGS: TeamSettings = {
  name: '',
  description: '',
  logoUrl: '',
  website: '',
  defaultDomain: '',
  allowMemberInvites: true,
  allowMemberRemoval: true,
  allowMemberRoleUpdates: true,
  allowCustomDomains: true,
  allowAnalytics: true,
  allowTeamStats: true,
  allowTeamReferrals: true,
  allowTeamSettings: true,
}

export const DEFAULT_APP_SETTINGS: AppSettings = {
  maintenanceMode: false,
  allowRegistrations: true,
  allowTeamCreation: true,
  allowCustomDomains: true,
  allowAnalytics: true,
  allowTeamStats: true,
  allowTeamReferrals: true,
  allowTeamSettings: true,
  defaultTheme: 'system',
  defaultLanguage: 'en',
  defaultTimeZone: 'UTC',
  defaultDateFormat: 'MM/DD/YYYY',
  defaultTimeFormat: '12h',
  defaultCurrency: 'USD',
  maxTeamMembers: 10,
  maxCustomDomains: 5,
  maxReferrals: 100,
  maxTeamReferrals: 1000,
  maxTeamCustomDomains: 50,
  maxTeamAnalytics: 10000,
  maxTeamStats: 100000,
  maxTeamSettings: 1000,
}

export function validateUserSettings(settings: Partial<UserSettings>): Record<string, string> {
  const errors: Record<string, string> = {}

  if (settings.theme && !['light', 'dark', 'system'].includes(settings.theme)) {
    errors.theme = 'Invalid theme'
  }

  if (settings.language && !['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko'].includes(settings.language)) {
    errors.language = 'Invalid language'
  }

  if (settings.dateFormat && !['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'].includes(settings.dateFormat)) {
    errors.dateFormat = 'Invalid date format'
  }

  if (settings.timeFormat && !['12h', '24h'].includes(settings.timeFormat)) {
    errors.timeFormat = 'Invalid time format'
  }

  if (settings.currency && !['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'BRL', 'RUB'].includes(settings.currency)) {
    errors.currency = 'Invalid currency'
  }

  return errors
}

export function validateTeamSettings(settings: Partial<TeamSettings>): Record<string, string> {
  const errors: Record<string, string> = {}

  if (settings.name && settings.name.length < 3) {
    errors.name = 'Team name must be at least 3 characters'
  } else if (settings.name && settings.name.length > 50) {
    errors.name = 'Team name must be less than 50 characters'
  }

  if (settings.description && settings.description.length > 500) {
    errors.description = 'Description must be less than 500 characters'
  }

  if (settings.logoUrl) {
    try {
      new URL(settings.logoUrl)
    } catch {
      errors.logoUrl = 'Logo URL must be valid'
    }
  }

  if (settings.website) {
    try {
      new URL(settings.website)
    } catch {
      errors.website = 'Website must be valid'
    }
  }

  return errors
}

export function validateAppSettings(settings: Partial<AppSettings>): Record<string, string> {
  const errors: Record<string, string> = {}

  if (settings.maxTeamMembers && settings.maxTeamMembers < 1) {
    errors.maxTeamMembers = 'Maximum team members must be at least 1'
  }

  if (settings.maxCustomDomains && settings.maxCustomDomains < 0) {
    errors.maxCustomDomains = 'Maximum custom domains cannot be negative'
  }

  if (settings.maxReferrals && settings.maxReferrals < 1) {
    errors.maxReferrals = 'Maximum referrals must be at least 1'
  }

  if (settings.maxTeamReferrals && settings.maxTeamReferrals < 1) {
    errors.maxTeamReferrals = 'Maximum team referrals must be at least 1'
  }

  if (settings.maxTeamCustomDomains && settings.maxTeamCustomDomains < 0) {
    errors.maxTeamCustomDomains = 'Maximum team custom domains cannot be negative'
  }

  if (settings.maxTeamAnalytics && settings.maxTeamAnalytics < 0) {
    errors.maxTeamAnalytics = 'Maximum team analytics cannot be negative'
  }

  if (settings.maxTeamStats && settings.maxTeamStats < 0) {
    errors.maxTeamStats = 'Maximum team stats cannot be negative'
  }

  if (settings.maxTeamSettings && settings.maxTeamSettings < 0) {
    errors.maxTeamSettings = 'Maximum team settings cannot be negative'
  }

  return errors
} 