'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Clock } from 'lucide-react'
import { unlockAchievement } from '@/lib/achievements'

export function StatsHeader() {
  const [visitCount, setVisitCount] = useState<number | null>(null)
  const [startTime] = useState(Date.now())
  const [elapsed, setElapsed] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Get visit count
    fetch('/api/analytics/views')
      .then(res => res.json())
      .then(data => {
        setVisitCount(data.views || 0)
      })
      .catch(() => setVisitCount(0))

    // Session timer
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

  if (!mounted) {
    return null
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  return (
    <div className="absolute top-4 left-4 z-40 flex flex-col gap-2">
      {/* Visit Counter */}
      {visitCount !== null && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="tech-card p-2 px-3 flex items-center gap-2"
        >
          <Users className="w-4 h-4 text-primary" />
          <div className="font-mono text-xs">
            <span className="text-text-secondary">Visitor</span>
            <motion.span
              key={visitCount}
              initial={{ scale: 1.5, color: '#00d4ff' }}
              animate={{ scale: 1, color: 'inherit' }}
              className="font-bold text-primary ml-1"
            >
              #{formatNumber(visitCount)}
            </motion.span>
          </div>
        </motion.div>
      )}

      {/* Session Timer */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="tech-card p-2 px-3 flex items-center gap-2"
      >
        <Clock className="w-4 h-4 text-amber-400" />
        <div className="font-mono text-xs">
          <span className="text-text-secondary">Exploring for</span>
          <span className="font-bold text-amber-400 ml-1">
            {formatTime(elapsed)}
          </span>
        </div>
      </motion.div>
    </div>
  )
}

