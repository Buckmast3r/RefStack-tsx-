import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useToast } from '@/context/ToastContext'
import { Referral } from '@/types/referral'
import { cn } from '@/lib/utils'

interface ReferralCardProps {
  referral: Referral
  isEditable?: boolean
  onEdit?: (referral: Referral) => void
  onDelete?: (referralId: string) => void
  className?: string
}

export function ReferralCard({
  referral,
  isEditable = false,
  onEdit,
  onDelete,
  className,
}: ReferralCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()

  const handleClick = async () => {
    if (isLoading) return
    
    try {
      setIsLoading(true)
      const response = await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referralId: referral.id }),
      })
      
      if (!response.ok) throw new Error('Failed to track click')
      
      // Open link in new tab
      window.open(referral.url, '_blank', 'noopener,noreferrer')
    } catch (error) {
      showToast('Failed to track click', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        {referral.image_url ? (
          <Image
            src={referral.image_url}
            alt={referral.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {referral.title}
        </h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {referral.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {referral.views}
            </span>
            <span className="flex items-center">
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              {referral.clicks}
            </span>
          </div>

          {/* Action Buttons */}
          {isEditable && (
            <div
              className={cn(
                'flex items-center space-x-2 transition-opacity duration-200',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
            >
              <button
                onClick={() => onEdit?.(referral)}
                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete?.(referral.id)}
                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-red-600"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click Overlay */}
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="absolute inset-0 z-10 cursor-pointer bg-black bg-opacity-0 transition-all hover:bg-opacity-5"
      >
        <span className="sr-only">Visit {referral.title}</span>
      </button>
    </motion.div>
  )
} 