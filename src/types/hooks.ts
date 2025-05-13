import { User } from './user'
import { Team } from './team'
import { Referral } from './referral'
import { Domain } from './domain'
import { StatsSummary, TimeSeriesData } from './stats'
import { Notification } from './notification'
import { UserSettings, TeamSettings, AppSettings } from './settings'
// import { ApiResponse, ApiError, PaginatedResponse } from './api'
import { ApiError, PaginatedResponse } from './api'

export type UseAuthResult = {
  user: User | null
  loading: boolean
  error: ApiError | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  updateEmail: (email: string) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

export type UseTeamResult = {
  team: Team | null
  loading: boolean
  error: ApiError | null
  createTeam: (data: Partial<Team>) => Promise<void>
  updateTeam: (data: Partial<Team>) => Promise<void>
  deleteTeam: () => Promise<void>
  inviteMember: (email: string, role: string) => Promise<void>
  removeMember: (userId: string) => Promise<void>
  updateMemberRole: (userId: string, role: string) => Promise<void>
}

export type UseReferralResult = {
  referral: Referral | null
  loading: boolean
  error: ApiError | null
  createReferral: (data: Partial<Referral>) => Promise<void>
  updateReferral: (data: Partial<Referral>) => Promise<void>
  deleteReferral: () => Promise<void>
  trackClick: () => Promise<void>
  trackView: () => Promise<void>
}

export type UseDomainResult = {
  domain: Domain | null
  loading: boolean
  error: ApiError | null
  createDomain: (data: Partial<Domain>) => Promise<void>
  updateDomain: (data: Partial<Domain>) => Promise<void>
  deleteDomain: () => Promise<void>
  verifyDomain: () => Promise<void>
}

export type UseStatsResult = {
  stats: StatsSummary | null
  loading: boolean
  error: ApiError | null
  timeSeries: TimeSeriesData[] | null
  refreshStats: () => Promise<void>
  refreshTimeSeries: () => Promise<void>
}

export type UseNotificationResult = {
  notifications: Notification[] | null
  loading: boolean
  error: ApiError | null
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  deleteNotification: (id: string) => Promise<void>
  deleteAllNotifications: () => Promise<void>
}

export type UseSettingsResult = {
  userSettings: UserSettings | null
  teamSettings: TeamSettings | null
  appSettings: AppSettings | null
  loading: boolean
  error: ApiError | null
  updateUserSettings: (data: Partial<UserSettings>) => Promise<void>
  updateTeamSettings: (data: Partial<TeamSettings>) => Promise<void>
  updateAppSettings: (data: Partial<AppSettings>) => Promise<void>
}

export type UsePaginationResult<T> = {
  data: T[] | null
  loading: boolean
  error: ApiError | null
  page: number
  pageSize: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: () => void
  previousPage: () => void
  goToPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  refresh: () => Promise<void>
}

export type UseSearchResult<T> = {
  results: T[] | null
  loading: boolean
  error: ApiError | null
  query: string
  setQuery: (query: string) => void
  search: (query: string) => Promise<void>
  clear: () => void
}

export type UseInfiniteScrollResult<T> = {
  data: T[] | null
  loading: boolean
  error: ApiError | null
  hasMore: boolean
  loadMore: () => Promise<void>
  refresh: () => Promise<void>
  reset: () => void
}

export type UseDebounceResult<T> = {
  value: T
  setValue: (value: T) => void
  debouncedValue: T
}

export type UseLocalStorageResult<T> = {
  value: T
  setValue: (value: T) => void
  remove: () => void
}

export type UseSessionStorageResult<T> = {
  value: T
  setValue: (value: T) => void
  remove: () => void
}

export type UseMediaQueryResult = {
  matches: boolean
  media: string
}

export type UseIntersectionObserverResult = {
  ref: (node: Element | null) => void
  inView: boolean
  entry: IntersectionObserverEntry | null
}

export type UseMutationResult<T, V> = {
  data: T | null
  loading: boolean
  error: ApiError | null
  mutate: (variables: V) => Promise<void>
  reset: () => void
}

export type UseQueryResult<T, V> = {
  data: T | null
  loading: boolean
  error: ApiError | null
  refetch: (variables?: V) => Promise<void>
  reset: () => void
}

export type UseSubscriptionResult<T> = {
  data: T | null
  loading: boolean
  error: ApiError | null
  subscribe: () => void
  unsubscribe: () => void
  reset: () => void
}

export type UseWebSocketResult<T> = {
  data: T | null
  loading: boolean
  error: ApiError | null
  connected: boolean
  send: (data: unknown) => void
  connect: () => void
  disconnect: () => void
  reset: () => void
}

export type UseFormResult<T> = {
  values: T
  errors: Record<string, string>
  touched: Record<string, boolean>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setFieldValue: (field: keyof T, value: unknown) => void
  setFieldError: (field: keyof T, error: string) => void
  setFieldTouched: (field: keyof T, touched: boolean) => void
  resetForm: () => void
  submitForm: () => Promise<void>
}

export type UseToastResult = {
  show: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void
  hide: (id: string) => void
  hideAll: () => void
}

export type UseModalResult = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export type UseDrawerResult = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export type UseDropdownResult = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export type UsePopoverResult = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export type UseTooltipResult = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export type UseTabsResult = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export type UseAccordionResult = {
  activeItems: string[]
  toggleItem: (item: string) => void
  isItemActive: (item: string) => boolean
}

export type UseCarouselResult = {
  activeSlide: number
  next: () => void
  previous: () => void
  goTo: (index: number) => void
}

export type UsePaginationHookResult<T> = {
  data: PaginatedResponse<T> | null
  loading: boolean
  error: ApiError | null
  page: number
  pageSize: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: () => void
  previousPage: () => void
  goToPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  refresh: () => Promise<void>
}