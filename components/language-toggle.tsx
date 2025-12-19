'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'
import { setLanguage, getLanguage, type Language } from '@/lib/i18n'

export function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const lang = getLanguage()
    setCurrentLang(lang)
    setLanguage(lang)
  }, [])

  const toggleLanguage = () => {
    const newLang: Language = currentLang === 'en' ? 'fr' : 'en'
    setCurrentLang(newLang)
    setLanguage(newLang)
    // Reload to apply translations
    window.location.reload()
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'fixed top-16 right-4 z-50 p-3 rounded-lg border transition-all duration-300',
        'bg-surface border-border hover:border-primary',
        'flex items-center justify-center gap-2 font-mono text-sm'
      )}
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4 text-primary" />
      <span>{currentLang.toUpperCase()}</span>
    </motion.button>
  )
}

