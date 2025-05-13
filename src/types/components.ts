import { ReactNode } from 'react'
import { User } from './user'
import { Team } from './team'
import { Referral } from './referral'
import { Domain } from './domain'
import { StatsSummary, TimeSeriesData } from './stats'
import { Notification } from './notification'
import { UserSettings, TeamSettings, AppSettings } from './settings'
import { ApiError } from './api'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonColor = 'default' | 'success' | 'warning' | 'error' | 'info'

export type InputVariant = 'outline' | 'filled' | 'flushed'
export type InputSize = 'sm' | 'md' | 'lg'

export type CardVariant = 'elevated' | 'outline' | 'filled'
export type CardSize = 'sm' | 'md' | 'lg'

export type AlertVariant = 'solid' | 'left-accent' | 'top-accent' | 'subtle'
export type AlertStatus = 'info' | 'warning' | 'success' | 'error'

export type BadgeVariant = 'solid' | 'subtle' | 'outline'
export type BadgeColor = 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type MenuVariant = 'menu' | 'list'
export type MenuSize = 'sm' | 'md' | 'lg'

export type ModalVariant = 'default' | 'destructive' | 'success'
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export type PopoverSize = 'sm' | 'md' | 'lg' | 'xl'

export type TooltipPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'

export type TabsVariant = 'line' | 'enclosed' | 'enclosed-colored' | 'soft-rounded' | 'solid-rounded' | 'unstyled'

export type AccordionVariant = 'default' | 'bordered' | 'separated'

export type CarouselVariant = 'default' | 'cards' | 'gallery'

export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type TooltipSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
  isLoading?: boolean
  isDisabled?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onClick?: () => void
  children: ReactNode
  className?: string
}

export interface InputProps {
  variant?: InputVariant
  size?: InputSize
  isDisabled?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  className?: string
}

export interface CardProps {
  variant?: CardVariant
  size?: CardSize
  isDisabled?: boolean
  isClickable?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
}

export interface AlertProps {
  variant?: AlertVariant
  status?: AlertStatus
  title?: string
  description?: string
  isClosable?: boolean
  onClose?: () => void
  children?: ReactNode
  className?: string
}

export interface BadgeProps {
  variant?: BadgeVariant
  color?: BadgeColor
  children: ReactNode
  className?: string
}

export interface AvatarProps {
  size?: AvatarSize
  name?: string
  src?: string
  fallback?: string
  className?: string
}

export interface MenuProps {
  variant?: MenuVariant
  size?: MenuSize
  isDisabled?: boolean
  children: ReactNode
  className?: string
}

export interface MenuItemProps {
  isDisabled?: boolean
  isSelected?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
}

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  onClose?: () => void
  title?: string
  description?: string
  size?: ModalSize
  variant?: ModalVariant
}

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  onClose?: () => void
  title?: string
  description?: string
  placement?: DrawerPlacement
  size?: DrawerSize
}

export interface PopoverProps {
  trigger: React.ReactNode
  content: React.ReactNode
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  placement?: PopoverPlacement
  size?: PopoverSize
}

export interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  placement?: TooltipPlacement
  size?: TooltipSize
  delay?: number
  className?: string
}

export interface TabsProps {
  variant?: TabsVariant
  isDisabled?: boolean
  children: ReactNode
  className?: string
}

export interface TabProps {
  isDisabled?: boolean
  isSelected?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
}

export interface AccordionProps {
  variant?: AccordionVariant
  isDisabled?: boolean
  children: ReactNode
  className?: string
}

export interface AccordionItemProps {
  isDisabled?: boolean
  isOpen?: boolean
  onToggle?: () => void
  children: ReactNode
  className?: string
}

export interface CarouselProps {
  variant?: CarouselVariant
  isDisabled?: boolean
  children: ReactNode
  className?: string
}

export interface CarouselItemProps {
  isDisabled?: boolean
  isSelected?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
}

export interface UserCardProps {
  user: User
  isEditable?: boolean
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
  className?: string
}

export interface TeamCardProps {
  team: Team
  isEditable?: boolean
  onEdit?: (team: Team) => void
  onDelete?: (team: Team) => void
  className?: string
}

export interface ReferralCardProps {
  referral: Referral
  isEditable?: boolean
  onEdit?: (referral: Referral) => void
  onDelete?: (referral: Referral) => void
  className?: string
}

export interface DomainCardProps {
  domain: Domain
  isEditable?: boolean
  onEdit?: (domain: Domain) => void
  onDelete?: (domain: Domain) => void
  className?: string
}

export interface StatsCardProps {
  stats: StatsSummary
  isLoading?: boolean
  error?: ApiError
  className?: string
}

export interface TimeSeriesCardProps {
  data: TimeSeriesData[]
  isLoading?: boolean
  error?: ApiError
  className?: string
}

export interface NotificationCardProps {
  notification: Notification
  isEditable?: boolean
  onEdit?: (notification: Notification) => void
  onDelete?: (notification: Notification) => void
  className?: string
}

export interface SettingsCardProps {
  settings: UserSettings | TeamSettings | AppSettings
  isEditable?: boolean
  onEdit?: (settings: UserSettings | TeamSettings | AppSettings) => void
  className?: string
}

export interface ErrorBoundaryProps {
  fallback: ReactNode
  children: ReactNode
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export interface PageFooterProps {
  children: ReactNode
  className?: string
}

export interface PageContentProps {
  children: ReactNode
  className?: string
}

export interface PageSidebarProps {
  children: ReactNode
  className?: string
}

export interface PageLayoutProps {
  header?: ReactNode
  footer?: ReactNode
  sidebar?: ReactNode
  children: ReactNode
  className?: string
}

export interface FormProps {
  onSubmit: (values: Record<string, unknown>) => void
  initialValues?: Record<string, unknown>
  validationSchema?: Record<string, unknown>
  children: ReactNode
  className?: string
}

export interface FormFieldProps {
  name: string
  label?: string
  helperText?: string
  isRequired?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  children: ReactNode
  className?: string
}

export interface FormErrorProps {
  name: string
  className?: string
}

export interface FormHelperTextProps {
  children: ReactNode
  className?: string
}

export interface FormLabelProps {
  children: ReactNode
  className?: string
}

export interface FormControlProps {
  isRequired?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isInvalid?: boolean
  children: ReactNode
  className?: string
}

export interface FormErrorMessageProps {
  children: ReactNode
  className?: string
}

export interface FormSuccessMessageProps {
  children: ReactNode
  className?: string
}

export interface FormGroupProps {
  children: ReactNode
  className?: string
}

export interface FormSectionProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export interface FormActionsProps {
  children: ReactNode
  className?: string
}

export interface FormSubmitButtonProps {
  isLoading?: boolean
  isDisabled?: boolean
  children: ReactNode
  className?: string
}

export interface FormResetButtonProps {
  isDisabled?: boolean
  children: ReactNode
  className?: string
}

export interface FormCancelButtonProps {
  isDisabled?: boolean
  children: ReactNode
  className?: string
}

export interface FormBackButtonProps {
  isDisabled?: boolean
  children: ReactNode
  className?: string
}

export interface FormNextButtonProps {
  isDisabled?: boolean
  children: ReactNode
  className?: string
}

export interface FormPreviousButtonProps {
  isDisabled?: boolean
  children: ReactNode
  className?: string
}

export interface FormStepProps {
  title: string
  description?: string
  isActive?: boolean
  isCompleted?: boolean
  isDisabled?: boolean
  children: ReactNode
  className?: string
}

export interface FormStepsProps {
  currentStep: number
  steps: {
    title: string
    description?: string
    isDisabled?: boolean
  }[]
  onStepClick?: (step: number) => void
  className?: string
}

export interface FormProgressProps {
  value: number
  max: number
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export interface FormProgressLabelProps {
  children: ReactNode
  className?: string
}

export interface FormProgressTrackProps {
  className?: string
}

export interface FormProgressFilledTrackProps {
  className?: string
}

export interface FormProgressValueTextProps {
  className?: string
}

export interface FormProgressLabelTextProps {
  className?: string
}

export interface FormProgressTrackProps {
  className?: string
}

export interface FormProgressFilledTrackProps {
  className?: string
}

export interface FormProgressValueTextProps {
  className?: string
}

export interface FormProgressLabelTextProps {
  className?: string
} 