'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Keyboard, Trophy, X, Sparkles, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

const challenges = [
  'docker run -d --name portfolio iyed/skills:latest',
  'kubectl apply -f deployment.yaml',
  'terraform init && terraform plan',
  'git push origin main --force',
  'npm run build && npm run deploy',
  'ansible-playbook deploy.yml -i inventory',
  'helm install portfolio ./chart',
  'docker-compose up -d --build',
]

export function TypingChallenge() {
  const [isActive, setIsActive] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState('')
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState<number | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [hintDismissed, setHintDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    // Show hint after 5 seconds
    const hintTimer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const dismissed = localStorage.getItem('typing-hint-dismissed')
        if (!dismissed) {
          setShowHint(true)
        }
      }
    }, 5000)

    return () => clearTimeout(hintTimer)
  }, [])

  const startChallenge = () => {
    const challenge = challenges[Math.floor(Math.random() * challenges.length)]
    setCurrentChallenge(challenge)
    setUserInput('')
    setStartTime(Date.now())
    setWpm(null)
    setAccuracy(null)
    setIsActive(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleInputChange = (value: string) => {
    setUserInput(value)

    if (value === currentChallenge && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60 // minutes
      const words = currentChallenge.split(' ').length
      const calculatedWpm = Math.round(words / timeElapsed)
      setWpm(calculatedWpm)

      // Calculate accuracy
      let correctChars = 0
      for (let i = 0; i < currentChallenge.length; i++) {
        if (value[i] === currentChallenge[i]) {
          correctChars++
        }
      }
      const acc = Math.round((correctChars / currentChallenge.length) * 100)
      setAccuracy(acc)

      setIsActive(false)
    }
  }

  const resetChallenge = () => {
    setUserInput('')
    setStartTime(null)
    setWpm(null)
    setAccuracy(null)
    setIsActive(false)
    setCurrentChallenge('')
  }

  const dismissHint = () => {
    setShowHint(false)
    setHintDismissed(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem('typing-hint-dismissed', 'true')
    }
  }

  const getWpmRating = (wpm: number) => {
    if (wpm >= 80) return { text: 'Expert! 🚀', color: 'text-emerald-400' }
    if (wpm >= 60) return { text: 'Pro! ⚡', color: 'text-cyan-400' }
    if (wpm >= 40) return { text: 'Good! 👍', color: 'text-amber-400' }
    return { text: 'Keep practicing! 💪', color: 'text-text-secondary' }
  }

  return (
    <>
      {/* Hint Tooltip */}
      <AnimatePresence>
        {mounted && showHint && !hintDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 left-4 z-40 tech-card p-4 max-w-xs"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <Keyboard className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-mono font-semibold text-sm mb-1">
                  Typing Challenge! ⌨️
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  Test your typing speed with DevOps commands!
                </p>
                <p className="text-xs text-text-tertiary">
                  Click the keyboard icon to start
                </p>
              </div>
              <button
                onClick={dismissHint}
                className="p-1 rounded hover:bg-surface-light transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-text-tertiary" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Challenge Panel */}
      <div className="fixed bottom-4 left-4 z-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="tech-card p-4 w-80"
        >
          <div className="flex items-center gap-2 mb-3">
            <Keyboard className="w-5 h-5 text-amber-400" />
            <h3 className="font-mono font-semibold text-sm">Typing Challenge</h3>
          </div>

          {!isActive && !currentChallenge && (
            <div className="space-y-3">
              <p className="text-xs text-text-secondary font-mono">
                Type DevOps commands as fast as you can!
              </p>
              <button
                onClick={startChallenge}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-mono text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all"
              >
                <Keyboard className="w-4 h-4" />
                Start Challenge
              </button>
            </div>
          )}

          {isActive && currentChallenge && (
            <div className="space-y-3">
              <div>
                <div className="text-xs text-text-tertiary font-mono mb-2">
                  Type this command:
                </div>
                <div className="p-3 rounded-lg bg-surface-light border border-border font-mono text-sm text-primary mb-2">
                  {currentChallenge}
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border font-mono text-sm focus:outline-none focus:border-primary"
                  placeholder="Start typing..."
                  autoFocus
                />
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={resetChallenge}
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono text-text-tertiary hover:text-text transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {wpm !== null && accuracy !== null && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-surface-light border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-text-tertiary">WPM</span>
                  <span className="text-lg font-mono font-bold text-primary">{wpm}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-text-tertiary">Accuracy</span>
                  <span className="text-sm font-mono font-semibold text-emerald-400">{accuracy}%</span>
                </div>
                <div className="mt-2 text-center">
                  <span className={cn('text-xs font-mono', getWpmRating(wpm).color)}>
                    {getWpmRating(wpm).text}
                  </span>
                </div>
              </div>
              <button
                onClick={startChallenge}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-mono text-sm hover:shadow-lg hover:shadow-amber-500/25 transition-all"
              >
                <Trophy className="w-4 h-4" />
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}

