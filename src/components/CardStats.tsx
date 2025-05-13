'use client';

import { useEffect, useState } from 'react'
import { ReferralCardStats } from '@/types/referral'

interface CardStatsProps {
  cardId: string
}

export const CardStats = ({ cardId }: CardStatsProps) => {
  const [stats, setStats] = useState<ReferralCardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/card-stats/${cardId}`)
        if (!response.ok) throw new Error('Failed to fetch stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error fetching card stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [cardId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="animate-pulse">Loading stats...</div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900">Card Statistics</h3>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Clicks</p>
          <p className="text-xl font-bold text-gray-900">{stats.clicks.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Views</p>
          <p className="text-xl font-bold text-gray-900">{stats.views.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
} 