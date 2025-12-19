'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
]

export function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([])
  const [isActive, setIsActive] = useState(false)
  const [showEffect, setShowEffect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintDismissed, setHintDismissed] = useState(false)

  useEffect(() => {
    // Show hint after 5 seconds if not dismissed
    const hintTimer = setTimeout(() => {
      const dismissed = localStorage.getItem('konami-hint-dismissed')
      if (!dismissed) {
        setShowHint(true)
      }
    }, 5000)

    return () => clearTimeout(hintTimer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore Enter key and other non-Konami keys
      if (e.code === 'Enter' || e.code === 'Space' || e.code === 'Tab') {
        return
      }

      // Only accept arrow keys and B, A
      const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
      if (!validKeys.includes(e.code)) {
        // Reset sequence if invalid key is pressed
        setSequence([])
        return
      }

      const newSequence = [...sequence, e.code]
      
      // Keep only last 10 keys
      const trimmedSequence = newSequence.slice(-10)
      setSequence(trimmedSequence)

      // Check if sequence matches Konami code exactly
      if (trimmedSequence.length === KONAMI_CODE.length) {
        const matches = trimmedSequence.every((key, index) => key === KONAMI_CODE[index])
        if (matches && !isActive) {
          setIsActive(true)
          setShowEffect(true)
          setShowHint(false) // Hide hint when activated
          
          // Create matrix rain effect
          createMatrixRain()
          
          // Reset sequence
          setSequence([])
          
          // Reset after 5 seconds
          setTimeout(() => {
            setShowEffect(false)
            setTimeout(() => setIsActive(false), 500)
          }, 5000)
        } else if (!matches) {
          // Reset if sequence doesn't match
          setSequence([])
        }
      } else if (trimmedSequence.length > KONAMI_CODE.length) {
        // Reset if sequence is too long
        setSequence([])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sequence, isActive])

  const createMatrixRain = () => {
    const commands = [
      'docker run -d nginx',
      'kubectl apply -f deployment.yaml',
      'terraform init',
      'terraform plan',
      'terraform apply',
      'git push origin main',
      'npm run build',
      'docker-compose up -d',
      'kubectl get pods',
      'helm install myapp',
      'ansible-playbook deploy.yml',
      'kubectl scale deployment app --replicas=3',
      'docker build -t app .',
      'kubectl logs -f pod/app',
      'terraform destroy',
    ]

    const container = document.createElement('div')
    container.className = 'fixed inset-0 z-50 pointer-events-none overflow-hidden'
    container.style.background = 'rgba(0, 0, 0, 0.9)'
    document.body.appendChild(container)

    // Create falling commands
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const command = commands[Math.floor(Math.random() * commands.length)]
        const element = document.createElement('div')
        element.className = 'font-mono text-emerald-400 text-sm absolute'
        element.textContent = command
        element.style.left = `${Math.random() * 100}%`
        element.style.top = '-20px'
        element.style.animation = 'fall 3s linear forwards'
        container.appendChild(element)

        setTimeout(() => element.remove(), 3000)
      }, i * 150)
    }

    // Remove container after animation
    setTimeout(() => {
      container.remove()
    }, 5000)
  }

  const dismissHint = () => {
    setShowHint(false)
    setHintDismissed(true)
    localStorage.setItem('konami-hint-dismissed', 'true')
  }

  return (
    <>
      {/* Hint Tooltip */}
      <AnimatePresence>
        {showHint && !hintDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 left-4 z-40 tech-card p-4 max-w-xs"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-mono font-semibold text-sm mb-1">
                  Easter Egg Found! 🥚
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  Try the Konami Code: <span className="font-mono text-primary">↑↑↓↓←→←→BA</span>
                </p>
                <p className="text-xs text-text-tertiary">
                  Use your keyboard arrows and B, A keys
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

      {/* Konami Code Effect */}
      <AnimatePresence>
        {showEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="tech-card p-8 text-center max-w-md"
            >
              <Terminal className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h2 className="font-display text-3xl font-bold mb-2">
                Konami Code Activated! 🎮
              </h2>
              <p className="text-text-secondary font-mono">
                Matrix rain mode enabled
              </p>
              <p className="text-xs text-text-tertiary mt-4 font-mono">
                Falling DevOps commands detected...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Add CSS animation for falling effect
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes fall {
      to {
        transform: translateY(100vh);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
}
