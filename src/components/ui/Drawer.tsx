import { forwardRef, useEffect } from 'react'
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { DrawerProps } from '@/types/components'
import { cn } from '@/lib/utils'

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen = false,
      onClose,
      title,
      description,
      placement = 'right',
      size = 'md',
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

    const placements = {
      left: {
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit: { x: '-100%' },
        className: 'left-0 top-0 h-full',
      },
      right: {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
        className: 'right-0 top-0 h-full',
      },
      top: {
        initial: { y: '-100%' },
        animate: { y: 0 },
        exit: { y: '-100%' },
        className: 'left-0 top-0 w-full',
      },
      bottom: {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
        className: 'left-0 bottom-0 w-full',
      },
    }

    const sizes = {
      sm: {
        width: 'w-64',
        height: 'h-64',
      },
      md: {
        width: 'w-96',
        height: 'h-96',
      },
      lg: {
        width: 'w-[32rem]',
        height: 'h-[32rem]',
      },
      xl: {
        width: 'w-[40rem]',
        height: 'h-[40rem]',
      },
      full: {
        width: 'w-full',
        height: 'h-full',
      },
    }

    const placementConfig = placements[placement]
    const sizeConfig = sizes[size]

    // Filter out incompatible props
    const motionProps: HTMLMotionProps<"div"> = {
      initial: placementConfig.initial,
      animate: placementConfig.animate,
      exit: placementConfig.exit,
      transition: { duration: 0.2 },
      className: cn(
        'fixed z-50 flex flex-col border bg-background shadow-lg',
        placementConfig.className,
        sizeConfig.width,
        sizeConfig.height,
        className
      ),
      role: "dialog",
      "aria-modal": "true",
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
              {...motionProps}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b p-4">
                  {title && (
                    <h2 className="text-lg font-semibold">{title}</h2>
                  )}
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
                {description && (
                  <p className="border-b p-4 text-sm text-muted-foreground">
                    {description}
                  </p>
                )}
                <div className="flex-1 overflow-auto p-4">{children}</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }
)

Drawer.displayName = 'Drawer'

export default Drawer 