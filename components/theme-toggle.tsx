'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)
  }

  const toggleTheme = () => {
    setIsTransitioning(true)
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    // Smooth transition
    setTimeout(() => {
      applyTheme(newTheme)
      setTimeout(() => setIsTransitioning(false), 300)
    }, 50)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] pointer-events-none"
            style={{
              background: theme === 'dark' 
                ? 'radial-gradient(circle at center, rgba(248, 250, 252, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(10, 10, 15, 0.1) 0%, transparent 70%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          'fixed top-4 right-4 z-50 p-3 rounded-lg border transition-all duration-300',
          'bg-surface border-border hover:border-primary',
          'flex items-center justify-center'
        )}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="w-5 h-5 text-amber-400" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="w-5 h-5 text-indigo-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
