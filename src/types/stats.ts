import { Database } from './supabase'

export type Click = Database['public']['Tables']['clicks']['Row']
export type ClickInsert = Database['public']['Tables']['clicks']['Insert']
export type ClickUpdate = Database['public']['Tables']['clicks']['Update']

export type View = Database['public']['Tables']['views']['Row']
export type ViewInsert = Database['public']['Tables']['views']['Insert']
export type ViewUpdate = Database['public']['Tables']['views']['Update']

export interface TimeRange {
  start: Date
  end: Date
}

export interface StatsSummary {
  totalClicks: number
  totalViews: number
  uniqueVisitors: number
  conversionRate: number
  averageTimeOnSite: number
  topReferrers: {
    source: string
    count: number
  }[]
  topCountries: {
    country: string
    count: number
  }[]
  topDevices: {
    device: string
    count: number
  }[]
  topBrowsers: {
    browser: string
    count: number
  }[]
  topOperatingSystems: {
    os: string
    count: number
  }[]
}

export interface TimeSeriesData {
  timestamp: string
  clicks: number
  views: number
  uniqueVisitors: number
}

export interface StatsFilters {
  timeRange?: TimeRange
  referralId?: string
  domainId?: string
  teamId?: string
  userId?: string
}

export function getTimeRangeLabel(timeRange: TimeRange): string {
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - timeRange.start.getTime()) / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    return 'Today'
  } else if (diffInDays === 1) {
    return 'Yesterday'
  } else if (diffInDays === 7) {
    return 'Last 7 days'
  } else if (diffInDays === 30) {
    return 'Last 30 days'
  } else if (diffInDays === 90) {
    return 'Last 90 days'
  } else if (diffInDays === 365) {
    return 'Last year'
  }

  return `${timeRange.start.toLocaleDateString()} - ${timeRange.end.toLocaleDateString()}`
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export function formatPercentage(num: number): string {
  return `${(num * 100).toFixed(1)}%`
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`
  } else if (seconds < 3600) {
    return `${Math.round(seconds / 60)}m`
  } else {
    return `${Math.round(seconds / 3600)}h`
  }
}

export function calculateConversionRate(clicks: number, views: number): number {
  return views > 0 ? clicks / views : 0
}

export function calculateAverageTimeOnSite(times: number[]): number {
  if (times.length === 0) {
    return 0
  }
  return times.reduce((sum, time) => sum + time, 0) / times.length
}

export function getTopItems<T extends { count: number }>(
  items: T[],
  limit: number = 5
): T[] {
  return [...items]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export function aggregateTimeSeriesData(
  data: TimeSeriesData[],
  interval: 'hour' | 'day' | 'week' | 'month' = 'day'
): TimeSeriesData[] {
  const aggregated: { [key: string]: TimeSeriesData } = {}

  data.forEach(point => {
    const date = new Date(point.timestamp)
    let key: string

    switch (interval) {
      case 'hour':
        key = date.toISOString().slice(0, 13)
        break
      case 'day':
        key = date.toISOString().slice(0, 10)
        break
      case 'week':
        const weekStart = new Date(date)
        weekStart.setDate(date.getDate() - date.getDay())
        key = weekStart.toISOString().slice(0, 10)
        break
      case 'month':
        key = date.toISOString().slice(0, 7)
        break
    }

    if (!aggregated[key]) {
      aggregated[key] = {
        timestamp: key,
        clicks: 0,
        views: 0,
        uniqueVisitors: 0,
      }
    }

    aggregated[key].clicks += point.clicks
    aggregated[key].views += point.views
    aggregated[key].uniqueVisitors += point.uniqueVisitors
  })

  return Object.values(aggregated).sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  )
} 