import { forwardRef } from 'react'
import { ButtonProps } from '@/types/components'
import { cn } from '@/lib/utils'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      color = 'default',
      isLoading = false,
      isDisabled = false,
      leftIcon,
      rightIcon,
      onClick,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50',
      secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-accent/50',
      ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-accent/50',
      link: 'text-primary underline-offset-4 hover:underline focus:ring-primary/50',
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    }

    const colors = {
      default: '',
      success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
      warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      error: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          colors[color],
          className
        )}
        disabled={isDisabled || isLoading}
        onClick={onClick}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button 