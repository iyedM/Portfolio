'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, X, Minimize2, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActivityItem {
  id: string
  message: string
  timestamp: Date
  type: 'click' | 'deploy' | 'command' | 'achievement'
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isMinimized, setIsMinimized] = useState(false)
  const [mounted, setMounted] = useState(false)
  const maxActivities = 10

  useEffect(() => {
    setMounted(true)
    
    // Listen for custom events
    const handleActivity = (e: CustomEvent) => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        message: e.detail.message,
        timestamp: new Date(),
        type: e.detail.type || 'click'
      }
      setActivities(prev => [newActivity, ...prev].slice(0, maxActivities))
    }

    window.addEventListener('portfolio-activity' as any, handleActivity as EventListener)
    return () => window.removeEventListener('portfolio-activity' as any, handleActivity as EventListener)
  }, [])

  if (!mounted) {
    return null
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'deploy':
        return '🚀'
      case 'command':
        return '⌨️'
      case 'achievement':
        return '🏆'
      default:
        return '👆'
    }
  }

  const formatTime = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    return `${Math.floor(minutes / 60)}h ago`
  }

  return (
    <div className="fixed bottom-24 left-4 z-40">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          'tech-card transition-all duration-300',
          isMinimized ? 'p-2' : 'p-4 w-80'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            {!isMinimized && (
              <span className="font-mono text-sm font-semibold">Activity Feed</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded hover:bg-surface-light transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="w-3 h-3 text-text-tertiary" />
              ) : (
                <Minimize2 className="w-3 h-3 text-text-tertiary" />
              )}
            </button>
          </div>
        </div>

        {/* Activities */}
        {!isMinimized && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {activities.length === 0 ? (
                <div className="text-xs text-text-tertiary font-mono text-center py-4">
                  No activity yet...
                </div>
              ) : (
                activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-start gap-2 p-2 rounded-lg bg-surface-light hover:bg-surface transition-colors"
                  >
                    <span className="text-sm">{getActivityIcon(activity.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-text-secondary truncate">
                        {activity.message}
                      </p>
                      <p className="text-xs text-text-tertiary font-mono mt-0.5">
                        {formatTime(activity.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  )
}

// Helper function to dispatch activities
export function trackActivity(message: string, type: ActivityItem['type'] = 'click') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('portfolio-activity', {
      detail: { message, type }
    }))
  }
}

