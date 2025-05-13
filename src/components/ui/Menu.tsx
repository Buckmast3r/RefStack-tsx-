import { forwardRef } from 'react'
import { MenuProps, MenuItemProps } from '@/types/components'
import { cn } from '@/lib/utils'

const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      variant = 'menu',
      size = 'md',
      isDisabled = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none'
    
    const variants = {
      menu: '',
      list: 'space-y-1',
    }

    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isDisabled && 'opacity-50 pointer-events-none',
          className
        )}
        role="menu"
        {...props}
      >
        {children}
      </div>
    )
  }
)

Menu.displayName = 'Menu'

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    {
      isDisabled = false,
      isSelected = false,
      onClick,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
          'focus:bg-accent focus:text-accent-foreground',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          'data-[selected]:bg-accent data-[selected]:text-accent-foreground',
          className
        )}
        disabled={isDisabled}
        data-selected={isSelected}
        onClick={onClick}
        role="menuitem"
        {...props}
      >
        {children}
      </button>
    )
  }
)

MenuItem.displayName = 'MenuItem'

export { Menu, MenuItem } 