'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export function VisitCounter() {
  const [visitCount, setVisitCount] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Récupérer le nombre de visites depuis l'API
    fetch('/api/analytics/views')
      .then(res => res.json())
      .then(data => {
        const count = data?.views ?? 0
        setVisitCount(count)

        // Confetti sur milestones
        const milestones = [100, 500, 1000, 2500, 5000, 10000]
        if (milestones.includes(count)) {
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 3000)
        }
      })
      .catch(() => setVisitCount(0))
  }, [])

  // Formater les nombres avec séparateur de milliers
  const formatNumber = (num: number) => num.toLocaleString('en-US')

  if (!mounted) return null // évite le mismatch côté client/server

  return (
    <>
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: 360,
                  x: Math.random() * window.innerWidth,
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
                className={cn(
                  'absolute w-2 h-2 rounded-full',
                  i % 5 === 0 && 'bg-primary',
                  i % 5 === 1 && 'bg-secondary',
                  i % 5 === 2 && 'bg-emerald-400',
                  i % 5 === 3 && 'bg-amber-400',
                  i % 5 === 4 && 'bg-violet-400',
                )}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compteur de visites */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-20 left-4 z-40 tech-card p-3"
      >
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <div className="font-mono text-sm">
            <span className="text-text-secondary">You are visitor</span>
            <motion.span
              key={visitCount}
              initial={{ scale: 1.5, color: '#00d4ff' }}
              animate={{ scale: 1, color: 'inherit' }}
              className="font-bold text-primary ml-1"
            >
              # {visitCount !== null ? formatNumber(visitCount) : '0'}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </>
  )
}
