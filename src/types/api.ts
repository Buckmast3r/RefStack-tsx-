import { Database } from './supabase'
import { User } from './user'
import { Team } from './team'
import { Referral } from './referral'
import { Domain } from './domain'
import { StatsSummary, TimeSeriesData } from './stats'
import { Notification } from './notification'
import { UserSettings, TeamSettings, AppSettings } from './settings'

export type ApiResponse<T> = {
  data?: T
  error?: string
  message?: string
}

export type ApiError = {
  code: string
  message: string
  details?: Record<string, unknown>
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type ApiUser = User
export type ApiTeam = Team
export type ApiReferral = Referral
export type ApiDomain = Domain
export type ApiStats = StatsSummary
export type ApiTimeSeries = TimeSeriesData[]
export type ApiNotification = Notification
export type ApiUserSettings = UserSettings
export type ApiTeamSettings = TeamSettings
export type ApiAppSettings = AppSettings

export type ApiUserResponse = ApiResponse<ApiUser>
export type ApiTeamResponse = ApiResponse<ApiTeam>
export type ApiReferralResponse = ApiResponse<ApiReferral>
export type ApiDomainResponse = ApiResponse<ApiDomain>
export type ApiStatsResponse = ApiResponse<ApiStats>
export type ApiTimeSeriesResponse = ApiResponse<ApiTimeSeries>
export type ApiNotificationResponse = ApiResponse<ApiNotification>
export type ApiUserSettingsResponse = ApiResponse<ApiUserSettings>
export type ApiTeamSettingsResponse = ApiResponse<ApiTeamSettings>
export type ApiAppSettingsResponse = ApiResponse<ApiAppSettings>

export type ApiPaginatedUserResponse = ApiResponse<PaginatedResponse<ApiUser>>
export type ApiPaginatedTeamResponse = ApiResponse<PaginatedResponse<ApiTeam>>
export type ApiPaginatedReferralResponse = ApiResponse<PaginatedResponse<ApiReferral>>
export type ApiPaginatedDomainResponse = ApiResponse<PaginatedResponse<ApiDomain>>
export type ApiPaginatedNotificationResponse = ApiResponse<PaginatedResponse<ApiNotification>>

export type ApiQueryParams = {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  filter?: Record<string, unknown>
}

export type ApiHeaders = {
  'Content-Type': string
  Authorization?: string
  'X-Client-Version'?: string
  'X-Request-ID'?: string
}

export type ApiConfig = {
  baseUrl: string
  headers?: ApiHeaders
  timeout?: number
  withCredentials?: boolean
}

export type ApiRequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  data?: unknown
  params?: ApiQueryParams
  headers?: ApiHeaders
  timeout?: number
  withCredentials?: boolean
}

export type ApiClient = {
  get: <T>(url: string, options?: Omit<ApiRequestOptions, 'method' | 'url'>) => Promise<ApiResponse<T>>
  post: <T>(url: string, data?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'url' | 'data'>) => Promise<ApiResponse<T>>
  put: <T>(url: string, data?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'url' | 'data'>) => Promise<ApiResponse<T>>
  patch: <T>(url: string, data?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'url' | 'data'>) => Promise<ApiResponse<T>>
  delete: <T>(url: string, options?: Omit<ApiRequestOptions, 'method' | 'url'>) => Promise<ApiResponse<T>>
}

export function createApiClient(config: ApiConfig): ApiClient {
  const defaultHeaders: ApiHeaders = {
    'Content-Type': 'application/json',
    ...config.headers,
  }

  const defaultOptions: Partial<ApiRequestOptions> = {
    timeout: config.timeout ?? 30000,
    withCredentials: config.withCredentials ?? false,
  }

  async function request<T>(options: ApiRequestOptions): Promise<ApiResponse<T>> {
    const { method, url, data, params, headers, timeout, withCredentials } = {
      ...defaultOptions,
      ...options,
    }

    const queryString = params
      ? '?' +
        Object.entries(params)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
          .join('&')
      : ''

    const response = await fetch(`${config.baseUrl}${url}${queryString}`, {
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      signal: timeout ? AbortSignal.timeout(timeout) : undefined,
      credentials: withCredentials ? 'include' : 'same-origin',
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw {
        code: responseData.code ?? 'UNKNOWN_ERROR',
        message: responseData.message ?? 'An unknown error occurred',
        details: responseData.details,
      } as ApiError
    }

    return responseData as ApiResponse<T>
  }

  return {
    get: <T>(url: string, options?: Omit<ApiRequestOptions, 'method' | 'url'>) =>
      request<T>({ method: 'GET', url, ...options }),
    post: <T>(url: string, data?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'url' | 'data'>) =>
      request<T>({ method: 'POST', url, data, ...options }),
    put: <T>(url: string, data?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'url' | 'data'>) =>
      request<T>({ method: 'PUT', url, data, ...options }),
    patch: <T>(url: string, data?: unknown, options?: Omit<ApiRequestOptions, 'method' | 'url' | 'data'>) =>
      request<T>({ method: 'PATCH', url, data, ...options }),
    delete: <T>(url: string, options?: Omit<ApiRequestOptions, 'method' | 'url'>) =>
      request<T>({ method: 'DELETE', url, ...options }),
  }
} 