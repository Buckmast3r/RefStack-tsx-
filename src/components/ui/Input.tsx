import { forwardRef } from 'react'
import { InputProps } from '@/types/components'
import { cn } from '@/lib/utils'

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'outline',
      size = 'md',
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      isInvalid = false,
      placeholder,
      value,
      onChange,
      onBlur,
      onFocus,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'w-full rounded-md border bg-background font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      outline: 'border-input focus:ring-primary/50',
      filled: 'border-transparent bg-accent focus:ring-accent/50',
      flushed: 'border-x-0 border-t-0 border-b-2 rounded-none focus:ring-0 focus:border-primary',
    }

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    }

    const states = {
      default: '',
      invalid: 'border-red-500 focus:ring-red-500/50',
    }

    return (
      <input
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          states[isInvalid ? 'invalid' : 'default'],
          className
        )}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input 