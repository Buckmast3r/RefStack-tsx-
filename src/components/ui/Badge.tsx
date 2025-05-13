import { forwardRef } from 'react'
import { BadgeProps } from '@/types/components'
import { cn } from '@/lib/utils'

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'solid',
      color = 'gray',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
    
    const variants = {
      solid: '',
      subtle: 'bg-opacity-50',
      outline: 'border',
    }

    const colors = {
      gray: {
        solid: 'bg-gray-100 text-gray-900',
        subtle: 'bg-gray-50 text-gray-900',
        outline: 'border-gray-200 text-gray-900',
      },
      red: {
        solid: 'bg-red-100 text-red-900',
        subtle: 'bg-red-50 text-red-900',
        outline: 'border-red-200 text-red-900',
      },
      orange: {
        solid: 'bg-orange-100 text-orange-900',
        subtle: 'bg-orange-50 text-orange-900',
        outline: 'border-orange-200 text-orange-900',
      },
      yellow: {
        solid: 'bg-yellow-100 text-yellow-900',
        subtle: 'bg-yellow-50 text-yellow-900',
        outline: 'border-yellow-200 text-yellow-900',
      },
      green: {
        solid: 'bg-green-100 text-green-900',
        subtle: 'bg-green-50 text-green-900',
        outline: 'border-green-200 text-green-900',
      },
      teal: {
        solid: 'bg-teal-100 text-teal-900',
        subtle: 'bg-teal-50 text-teal-900',
        outline: 'border-teal-200 text-teal-900',
      },
      blue: {
        solid: 'bg-blue-100 text-blue-900',
        subtle: 'bg-blue-50 text-blue-900',
        outline: 'border-blue-200 text-blue-900',
      },
      cyan: {
        solid: 'bg-cyan-100 text-cyan-900',
        subtle: 'bg-cyan-50 text-cyan-900',
        outline: 'border-cyan-200 text-cyan-900',
      },
      purple: {
        solid: 'bg-purple-100 text-purple-900',
        subtle: 'bg-purple-50 text-purple-900',
        outline: 'border-purple-200 text-purple-900',
      },
      pink: {
        solid: 'bg-pink-100 text-pink-900',
        subtle: 'bg-pink-50 text-pink-900',
        outline: 'border-pink-200 text-pink-900',
      },
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          colors[color][variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge 