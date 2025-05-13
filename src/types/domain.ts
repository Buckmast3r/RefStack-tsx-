import { Database } from './supabase'

export type Domain = Database['public']['Tables']['domains']['Row']
export type DomainInsert = Database['public']['Tables']['domains']['Insert']
export type DomainUpdate = Database['public']['Tables']['domains']['Update']

export type DomainStatus = 'pending' | 'verified' | 'failed'

export interface DomainFormData {
  domain: string
  team_id?: string
}

export interface DomainValidationError {
  domain?: string
  team_id?: string
}

export function validateDomain(data: DomainFormData): DomainValidationError {
  const errors: DomainValidationError = {}

  if (!data.domain) {
    errors.domain = 'Domain is required'
  } else {
    // Basic domain validation
    const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
    if (!domainRegex.test(data.domain)) {
      errors.domain = 'Invalid domain format'
    }
  }

  return errors
}

export function getDomainStatusColor(status: DomainStatus): string {
  const colors: Record<DomainStatus, string> = {
    pending: 'yellow',
    verified: 'green',
    failed: 'red',
  }

  return colors[status] ?? 'gray'
}

export function getDomainStatusIcon(status: DomainStatus): string {
  const icons: Record<DomainStatus, string> = {
    pending: 'clock',
    verified: 'check-circle',
    failed: 'x-circle',
  }

  return icons[status] ?? 'globe'
}

export function formatDomain(domain: string): string {
  return domain.toLowerCase().trim()
}

export function getDomainValidationUrl(domain: string): string {
  return `https://${domain}/.well-known/referralstack.txt`
}

export function getDomainValidationContent(domain: string): string {
  return `referralstack-domain-verification=${domain}`
}

export function isDomainVerified(domain: Domain): boolean {
  return domain.status === 'verified'
}

export function canManageDomain(user: User, domain: Domain): boolean {
  if (user.role === 'admin') {
    return true
  }

  if (domain.team_id) {
    // Check if user is team owner or admin
    return user.team_role === 'owner' || user.team_role === 'admin'
  }

  return user.id === domain.user_id
}

export function getDomainStats(domain: Domain): {
  totalClicks: number
  totalViews: number
  uniqueVisitors: number
  conversionRate: number
} {
  return {
    totalClicks: domain.total_clicks ?? 0,
    totalViews: domain.total_views ?? 0,
    uniqueVisitors: domain.unique_visitors ?? 0,
    conversionRate: domain.total_views ? (domain.total_clicks ?? 0) / domain.total_views : 0,
  }
} 