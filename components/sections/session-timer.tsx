'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { unlockAchievement } from '@/lib/achievements'

export function SessionTimer() {
  const [startTime] = useState(Date.now())
  const [elapsed, setElapsed] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
      setElapsed(elapsedSeconds)
      
      // Check for marathon achievement (10 minutes = 600 seconds)
      if (elapsedSeconds >= 600) {
        unlockAchievement('marathon')
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  // This component is now replaced by StatsHeader
  return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-32 left-4 z-40 tech-card p-3"
    >
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-amber-400" />
        <div className="font-mono text-sm">
          <span className="text-text-secondary">Exploring for</span>
          <span className="font-bold text-amber-400 ml-1">
            {formatTime(elapsed)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

