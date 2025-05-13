import { forwardRef } from 'react'
import { AlertProps } from '@/types/components'
import { cn } from '@/lib/utils'

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'solid',
      status = 'info',
      title,
      description,
      isClosable = false,
      onClose,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'relative w-full rounded-lg p-4'
    
    const variants = {
      solid: '',
      'left-accent': 'border-l-4',
      'top-accent': 'border-t-4',
      subtle: 'bg-opacity-50',
    }

    const statuses = {
      info: {
        solid: 'bg-blue-100 text-blue-900',
        'left-accent': 'border-blue-500 bg-blue-50 text-blue-900',
        'top-accent': 'border-blue-500 bg-blue-50 text-blue-900',
        subtle: 'bg-blue-50 text-blue-900',
      },
      warning: {
        solid: 'bg-yellow-100 text-yellow-900',
        'left-accent': 'border-yellow-500 bg-yellow-50 text-yellow-900',
        'top-accent': 'border-yellow-500 bg-yellow-50 text-yellow-900',
        subtle: 'bg-yellow-50 text-yellow-900',
      },
      success: {
        solid: 'bg-green-100 text-green-900',
        'left-accent': 'border-green-500 bg-green-50 text-green-900',
        'top-accent': 'border-green-500 bg-green-50 text-green-900',
        subtle: 'bg-green-50 text-green-900',
      },
      error: {
        solid: 'bg-red-100 text-red-900',
        'left-accent': 'border-red-500 bg-red-50 text-red-900',
        'top-accent': 'border-red-500 bg-red-50 text-red-900',
        subtle: 'bg-red-50 text-red-900',
      },
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          statuses[status][variant],
          className
        )}
        role="alert"
        {...props}
      >
        {isClosable && (
          <button
            type="button"
            className="absolute right-4 top-4 text-current opacity-70 hover:opacity-100"
            onClick={onClose}
            aria-label="Close alert"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
        {title && (
          <h5 className="mb-1 font-medium leading-none tracking-tight">
            {title}
          </h5>
        )}
        {description && (
          <div className="text-sm [&_p]:leading-relaxed">
            {description}
          </div>
        )}
        {children}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export default Alert 