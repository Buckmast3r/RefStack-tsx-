import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PopoverProps } from '@/types/components'
import { cn } from '@/lib/utils'

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      content,
      isOpen: controlledIsOpen,
      onOpenChange,
      placement = 'bottom',
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false)
    const isOpen = controlledIsOpen ?? uncontrolledIsOpen
    const setIsOpen = onOpenChange ?? setUncontrolledIsOpen

    const placements = {
      top: {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        className: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      },
      'top-start': {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        className: 'bottom-full left-0 mb-2',
      },
      'top-end': {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        className: 'bottom-full right-0 mb-2',
      },
      bottom: {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        className: 'top-full left-1/2 -translate-x-1/2 mt-2',
      },
      'bottom-start': {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        className: 'top-full left-0 mt-2',
      },
      'bottom-end': {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        className: 'top-full right-0 mt-2',
      },
      left: {
        initial: { opacity: 0, x: 8 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 8 },
        className: 'right-full top-1/2 -translate-y-1/2 mr-2',
      },
      'left-start': {
        initial: { opacity: 0, x: 8 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 8 },
        className: 'right-full top-0 mr-2',
      },
      'left-end': {
        initial: { opacity: 0, x: 8 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 8 },
        className: 'right-full bottom-0 mr-2',
      },
      right: {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -8 },
        className: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
      'right-start': {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -8 },
        className: 'left-full top-0 ml-2',
      },
      'right-end': {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -8 },
        className: 'left-full bottom-0 ml-2',
      },
    }

    const sizes = {
      sm: 'w-48',
      md: 'w-64',
      lg: 'w-80',
      xl: 'w-96',
    }

    const placementConfig = placements[placement]
    const sizeConfig = sizes[size]

    return (
      <div className="relative inline-block" ref={ref} {...props}>
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={placementConfig.initial}
              animate={placementConfig.animate}
              exit={placementConfig.exit}
              transition={{ duration: 0.2 }}
              className={cn(
                'absolute z-50 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none',
                placementConfig.className,
                sizeConfig,
                className
              )}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Popover.displayName = 'Popover'

export default Popover 