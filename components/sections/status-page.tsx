'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FadeInUp } from '@/components/ui/motion'
import { CheckCircle2, AlertCircle, Clock, Coffee, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatusItem {
  name: string
  status: 'operational' | 'degraded' | 'down'
  value: string
  icon: React.ElementType
}

export function StatusPage() {
  const [currentTime, setCurrentTime] = useState<string>('--:--:--')
  const [isNight, setIsNight] = useState(false)
  const [coffeeLevel, setCoffeeLevel] = useState<string>('85%')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Generate coffee level only on client side
    setCoffeeLevel(`${Math.floor(Math.random() * 20) + 80}%`)
    
    // Set initial time
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
      setIsNight(now.getHours() >= 22 || now.getHours() < 6)
    }
    
    updateTime()
    const timer = setInterval(updateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  const statusItems: StatusItem[] = [
    {
      name: 'Open to Work',
      status: 'operational',
      value: 'Available',
      icon: CheckCircle2
    },
    {
      name: 'Response Time',
      status: 'operational',
      value: '~24h',
      icon: Clock
    },
    {
      name: 'Coffee Level',
      status: 'operational',
      value: coffeeLevel,
      icon: Coffee
    },
    {
      name: 'Sleep',
      status: isNight ? 'degraded' : 'operational',
      value: isNight ? 'Sleeping' : 'Awake',
      icon: isNight ? Moon : Sun
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
      case 'degraded':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      case 'down':
        return 'text-accent-error bg-accent-error/10 border-accent-error/30'
      default:
        return 'text-text-tertiary bg-surface-light border-border'
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-emerald-400'
      case 'degraded':
        return 'bg-amber-400'
      case 'down':
        return 'bg-accent-error'
      default:
        return 'bg-text-tertiary'
    }
  }

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-background to-surface/30" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
              <CheckCircle2 className="w-4 h-4" />
              System Status
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Personal Status Page
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Real-time status of my availability and productivity metrics
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="tech-card p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div>
                <h3 className="font-display font-bold text-xl mb-1">iyed.dev</h3>
                <p className="text-sm text-text-secondary font-mono">
                  All systems operational
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-text-tertiary font-mono mb-1">Uptime</div>
                <div className="text-lg font-mono font-semibold text-primary">99.9%</div>
              </div>
            </div>

            {/* Status Items */}
            <div className="space-y-3">
              {statusItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'flex items-center justify-between p-4 rounded-lg border transition-all',
                    getStatusColor(item.status)
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-3 h-3 rounded-full animate-pulse',
                      getStatusDot(item.status)
                    )} />
                    <item.icon className="w-5 h-5" />
                    <div>
                      <div className="font-mono font-semibold">{item.name}</div>
                      <div className="text-xs text-text-tertiary mt-0.5">
                        {item.status === 'operational' && 'Operational'}
                        {item.status === 'degraded' && 'Degraded'}
                        {item.status === 'down' && 'Down'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-semibold">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-xs font-mono text-text-tertiary">
                <span>Last updated: {mounted ? currentTime : '--:--:--'}</span>
                <span>Powered by Next.js & Coffee ☕</span>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}

