import { forwardRef } from 'react'
import Image from 'next/image'
import { AvatarProps } from '@/types/components'
import { cn } from '@/lib/utils'

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      size = 'md',
      name,
      src,
      fallback,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'relative flex shrink-0 overflow-hidden rounded-full'
    
    const sizes = {
      xs: 'h-6 w-6',
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-14 w-14',
      '2xl': 'h-16 w-16',
    }

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    }

    const getFallback = () => {
      if (fallback) return fallback
      if (name) return getInitials(name)
      return '?'
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, sizes[size], className)}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={name || 'Avatar'}
            fill
            className="object-cover"
            sizes={size}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            <span className="text-sm font-medium">{getFallback()}</span>
          </div>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar 