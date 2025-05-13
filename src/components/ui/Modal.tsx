import { forwardRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ModalProps } from '@/types/components'
import { cn } from '@/lib/utils'

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen = false,
      onClose,
      title,
      description,
      size = 'md',
      variant = 'default',
      children,
      className,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose?.()
        }
      }

      if (isOpen) {
        document.addEventListener('keydown', handleEscape)
        document.body.style.overflow = 'hidden'
      }

      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }, [isOpen, onClose])

    const variants = {
      default: 'bg-background',
      destructive: 'bg-destructive text-destructive-foreground',
      success: 'bg-success text-success-foreground',
    }

    const sizes = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      full: 'max-w-full',
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={onClose}
            />
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-background p-6 shadow-lg',
                variants[variant],
                sizes[size],
                className
              )}
              role="dialog"
              aria-modal="true"
              {...props}
            >
              <div className="flex flex-col space-y-4">
                {title && (
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                      onClick={onClose}
                      className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
                      <span className="sr-only">Close</span>
                    </button>
                  </div>
                )}
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
                <div className="flex-1">{children}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }
)

Modal.displayName = 'Modal'

export default Modal 