'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gauge, X, Minimize2, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PerformanceMonitor() {
  const [fps, setFps] = useState(60)
  const [loadTime, setLoadTime] = useState<number | null>(null)
  const [bundleSize, setBundleSize] = useState<string>('0 KB')
  const [isMinimized, setIsMinimized] = useState(true)
  const [mounted, setMounted] = useState(false)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    setMounted(true)
    
    // Measure load time
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.timing
      const loadTimeMs = perfData.loadEventEnd - perfData.navigationStart
      setLoadTime(loadTimeMs)
    }

    // Estimate bundle size (rough calculation)
    if (typeof window !== 'undefined') {
      const scripts = Array.from(document.scripts)
      let totalSize = 0
      scripts.forEach(script => {
        if (script.src) {
          // Rough estimate - in real app, you'd fetch and measure
          totalSize += 100 // KB estimate per script
        }
      })
      setBundleSize(`${totalSize} KB`)
    }

    // FPS counter
    const measureFPS = () => {
      frameCount.current++
      const currentTime = performance.now()
      const elapsed = currentTime - lastTime.current

      if (elapsed >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / elapsed))
        frameCount.current = 0
        lastTime.current = currentTime
      }

      requestAnimationFrame(measureFPS)
    }

    const rafId = requestAnimationFrame(measureFPS)
    return () => cancelAnimationFrame(rafId)
  }, [])

  if (!mounted) {
    return null
  }

  const getFpsColor = (fps: number) => {
    if (fps >= 55) return 'text-emerald-400'
    if (fps >= 30) return 'text-amber-400'
    return 'text-accent-error'
  }

  const getLoadTimeColor = (time: number | null) => {
    if (!time) return 'text-text-tertiary'
    if (time < 1000) return 'text-emerald-400'
    if (time < 3000) return 'text-amber-400'
    return 'text-accent-error'
  }

  return (
    <div className="fixed top-44 left-4 z-40">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          'tech-card transition-all duration-300 font-mono text-xs',
          isMinimized ? 'p-2' : 'p-3'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-primary" />
            {!isMinimized && (
              <span className="font-semibold">Performance</span>
            )}
          </div>
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

        {/* Metrics */}
        {!isMinimized && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-text-tertiary">FPS</span>
              <span className={cn('font-semibold', getFpsColor(fps))}>
                {fps}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-tertiary">Load</span>
              <span className={cn('font-semibold', getLoadTimeColor(loadTime))}>
                {loadTime ? `${(loadTime / 1000).toFixed(2)}s` : 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-tertiary">Bundle</span>
              <span className="font-semibold text-text-secondary">
                {bundleSize}
              </span>
            </div>
          </div>
        )}

        {/* Minimized view */}
        {isMinimized && (
          <div className={cn('font-semibold', getFpsColor(fps))}>
            {fps} FPS
          </div>
        )}
      </motion.div>
    </div>
  )
}

