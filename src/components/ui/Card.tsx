import { forwardRef } from 'react'
import { CardProps } from '@/types/components'
import { cn } from '@/lib/utils'

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      size = 'md',
      isDisabled = false,
      isClickable = false,
      onClick,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-lg border bg-card text-card-foreground shadow-sm transition-all'
    
    const variants = {
      elevated: 'shadow-md hover:shadow-lg',
      outline: 'border-input',
      filled: 'bg-accent',
    }

    const sizes = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    }

    const interactiveStyles = isClickable
      ? 'cursor-pointer hover:bg-accent/50 active:bg-accent/70'
      : ''

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          interactiveStyles,
          isDisabled && 'opacity-50 pointer-events-none',
          className
        )}
        onClick={isClickable ? onClick : undefined}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card 