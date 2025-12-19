'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Target, Keyboard, Search, Moon, Rocket, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { setAchievementUnlocker, checkNightVisit } from '@/lib/achievements'

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  unlocked: boolean
}

const achievements: Achievement[] = [
  {
    id: 'first-deploy',
    name: 'First Deploy',
    description: 'Launched the CI/CD pipeline',
    icon: Rocket,
    color: 'from-cyan-500 to-blue-500',
    unlocked: false
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Visited all sections',
    icon: Target,
    color: 'from-violet-500 to-purple-500',
    unlocked: false
  },
  {
    id: 'terminal-master',
    name: 'Terminal Master',
    description: 'Used 5 different commands',
    icon: Keyboard,
    color: 'from-amber-500 to-orange-500',
    unlocked: false
  },
  {
    id: 'curious-mind',
    name: 'Curious Mind',
    description: 'Clicked on 3 K8s pods',
    icon: Search,
    color: 'from-emerald-500 to-teal-500',
    unlocked: false
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Visited after midnight',
    icon: Moon,
    color: 'from-indigo-500 to-violet-500',
    unlocked: false
  },
]

export function useAchievements() {
  // Always start with all achievements locked (reset on each page load)
  const [achievementsState, setAchievementsState] = useState<Achievement[]>(achievements)

  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)

  const unlockAchievement = (id: string) => {
    setAchievementsState(prev => {
      const achievement = prev.find(a => a.id === id)
      if (!achievement || achievement.unlocked) return prev

      const updated = prev.map(a => 
        a.id === id ? { ...a, unlocked: true } : a
      )

      // Show notification (no localStorage save - reset on reload)
      setNewAchievement(achievement)
      setTimeout(() => setNewAchievement(null), 4000)

      return updated
    })
  }

  // Register unlocker
  useEffect(() => {
    setAchievementUnlocker(unlockAchievement)
    checkNightVisit()
  }, [])

  return { achievements: achievementsState, unlockAchievement, newAchievement }
}

export function AchievementsDisplay() {
  const { achievements, newAchievement } = useAchievements()
  const [mounted, setMounted] = useState(false)
  const [unlockedCount, setUnlockedCount] = useState(0)

  useEffect(() => {
    setMounted(true)
    setUnlockedCount(achievements.filter(a => a.unlocked).length)
  }, [achievements])

  return (
    <>
      {/* Achievement Notification Toast */}
      <AnimatePresence>
        {newAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-4 right-4 z-50 tech-card p-4 max-w-sm"
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br',
                newAchievement.color
              )}>
                <newAchievement.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-mono font-semibold text-primary">
                  Achievement Unlocked! 🎉
                </div>
                <div className="text-sm text-text-secondary">
                  {newAchievement.name}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements Panel (Fixed corner) */}
      <div className="fixed bottom-4 right-4 z-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="tech-card p-4 w-64"
        >
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-mono font-semibold text-sm">Achievements</h3>
            <span className="ml-auto text-xs text-text-tertiary">
              {mounted ? unlockedCount : 0}/{achievements.length}
            </span>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={cn(
                  'flex items-center gap-2 p-2 rounded-lg transition-all',
                  achievement.unlocked
                    ? 'bg-surface-light'
                    : 'opacity-40'
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded flex items-center justify-center',
                  achievement.unlocked
                    ? `bg-gradient-to-br ${achievement.color}`
                    : 'bg-surface border border-border'
                )}>
                  <achievement.icon className={cn(
                    'w-4 h-4',
                    achievement.unlocked ? 'text-white' : 'text-text-tertiary'
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    'text-xs font-mono truncate',
                    achievement.unlocked ? 'text-text' : 'text-text-tertiary'
                  )}>
                    {achievement.name}
                  </div>
                  <div className="text-xs text-text-tertiary truncate">
                    {achievement.description}
                  </div>
                </div>
                {achievement.unlocked && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
