'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X, Sparkles, Code, Container, Server, Shield, Workflow } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheatCode {
  code: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  duration: number
  effect: () => void
}

const cheatCodes: CheatCode[] = [
  {
    code: 'linux',
    name: 'Linux Mode',
    description: 'Terminal Linux style activated',
    icon: Terminal,
    color: 'from-amber-500 to-orange-500',
    duration: 10000,
    effect: () => createLinuxEffect()
  },
  {
    code: 'docker',
    name: 'Docker Swarm',
    description: 'Container orchestration mode',
    icon: Container,
    color: 'from-cyan-500 to-blue-500',
    duration: 8000,
    effect: () => createDockerEffect()
  },
  {
    code: 'hacker',
    name: 'Hacker Mode',
    description: 'Matrix-style terminal hack',
    icon: Shield,
    color: 'from-emerald-500 to-green-500',
    duration: 10000,
    effect: () => createHackerEffect()
  },
  {
    code: 'ansible',
    name: 'Ansible Playbook',
    description: 'Infrastructure automation',
    icon: Workflow,
    color: 'from-violet-500 to-purple-500',
    duration: 8000,
    effect: () => createAnsibleEffect()
  },
  {
    code: 'kubernetes',
    name: 'K8s Cluster',
    description: 'Kubernetes deployment mode',
    icon: Server,
    color: 'from-indigo-500 to-blue-500',
    duration: 8000,
    effect: () => createK8sEffect()
  },
]

function createLinuxEffect() {
  const container = document.createElement('div')
  container.className = 'fixed inset-0 z-50 pointer-events-none overflow-hidden'
  container.style.background = 'rgba(0, 0, 0, 0.95)'
  document.body.appendChild(container)

  const lines = [
    'root@iyed-dev:~# ls -la',
    'total 48',
    'drwxr-xr-x  8 root root  4096 Dec 18 22:00 .',
    'drwxr-xr-x  3 root root  4096 Dec 18 21:00 ..',
    '-rw-r--r--  1 root root  2200 Dec 18 22:00 .bashrc',
    'drwxr-xr-x  2 root root  4096 Dec 18 22:00 portfolio',
    'root@iyed-dev:~# cd portfolio',
    'root@iyed-dev:~/portfolio# cat README.md',
    '# Iyed Mohamed - Portfolio',
    '# Cloud & DevOps Engineer',
    '# Skills: Docker, K8s, Terraform, Azure',
    'root@iyed-dev:~/portfolio# systemctl status portfolio',
    '● portfolio.service - Portfolio Website',
    '   Active: active (running)',
    '   Main PID: 1337',
    'root@iyed-dev:~/portfolio# exit',
  ]

  lines.forEach((line, i) => {
    setTimeout(() => {
      const element = document.createElement('div')
      element.className = 'font-mono text-emerald-400 text-sm px-4 py-1'
      element.textContent = line
      element.style.opacity = '0'
      element.style.transform = 'translateX(-20px)'
      container.appendChild(element)
      
      setTimeout(() => {
        element.style.transition = 'all 0.3s'
        element.style.opacity = '1'
        element.style.transform = 'translateX(0)'
      }, 10)
    }, i * 200)
  })

  setTimeout(() => container.remove(), 10000)
}

function createDockerEffect() {
  const container = document.createElement('div')
  container.className = 'fixed inset-0 z-50 pointer-events-none overflow-hidden'
  container.style.background = 'linear-gradient(135deg, #0db7ed 0%, #0a5d7a 100%)'
  document.body.appendChild(container)

  const dockerLogo = `
    ╔═══════════════════════════════════╗
    ║                                   ║
    ║        🐳 DOCKER SWARM 🐳         ║
    ║                                   ║
    ║  docker-compose up -d             ║
    ║  docker ps                         ║
    ║  docker logs portfolio             ║
    ║  docker exec -it app bash          ║
    ║                                   ║
    ╚═══════════════════════════════════╝
  `

  const element = document.createElement('div')
  element.className = 'font-mono text-white text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-pre'
  element.textContent = dockerLogo
  element.style.opacity = '0'
  element.style.transform = 'translate(-50%, -50%) scale(0.5)'
  container.appendChild(element)

  setTimeout(() => {
    element.style.transition = 'all 0.5s'
    element.style.opacity = '1'
    element.style.transform = 'translate(-50%, -50%) scale(1)'
  }, 10)

  // Floating containers
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const box = document.createElement('div')
      box.className = 'absolute font-mono text-white/50 text-xs'
      box.textContent = '📦 container'
      box.style.left = `${Math.random() * 100}%`
      box.style.top = `${Math.random() * 100}%`
      box.style.animation = 'float 3s ease-in-out infinite'
      container.appendChild(box)
    }, i * 300)
  }

  setTimeout(() => container.remove(), 8000)
}

function createHackerEffect() {
  const container = document.createElement('div')
  container.className = 'fixed inset-0 z-50 pointer-events-none overflow-hidden'
  container.style.background = 'rgba(0, 0, 0, 0.98)'
  document.body.appendChild(container)

  const hackerText = [
    '[>] Initializing hack sequence...',
    '[>] Bypassing firewall...',
    '[>] Accessing mainframe...',
    '[>] Decrypting credentials...',
    '[>] Root access granted!',
    '[>] System compromised.',
    '',
    '██████╗ ██╗  ██╗ █████╗  ██████╗██╗  ██╗',
    '██╔══██╗██║  ██║██╔══██╗██╔════╝██║ ██╔╝',
    '██████╔╝███████║███████║██║     █████╔╝ ',
    '██╔═══╝ ██╔══██║██╔══██║██║     ██╔═██╗ ',
    '██║     ██║  ██║██║  ██║╚██████╗██║  ██╗',
    '╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝',
  ]

  hackerText.forEach((line, i) => {
    setTimeout(() => {
      const element = document.createElement('div')
      element.className = 'font-mono text-emerald-400 text-sm px-4 py-1'
      element.textContent = line
      element.style.opacity = '0'
      container.appendChild(element)
      container.appendChild(element)
      
      setTimeout(() => {
        element.style.transition = 'opacity 0.3s'
        element.style.opacity = '1'
      }, 10)
    }, i * 150)
  })

  // Matrix rain effect
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const char = String.fromCharCode(0x30A0 + Math.random() * 96)
      const element = document.createElement('div')
      element.className = 'font-mono text-emerald-400 text-xs absolute'
      element.textContent = char
      element.style.left = `${Math.random() * 100}%`
      element.style.top = '-20px'
      element.style.animation = 'fall 2s linear forwards'
      container.appendChild(element)
      setTimeout(() => element.remove(), 2000)
    }, i * 100)
  }

  setTimeout(() => container.remove(), 10000)
}

function createAnsibleEffect() {
  const container = document.createElement('div')
  container.className = 'fixed inset-0 z-50 pointer-events-none overflow-hidden'
  container.style.background = 'rgba(0, 0, 0, 0.95)'
  document.body.appendChild(container)

  const playbook = [
    'PLAY [Deploy Portfolio] ************************************',
    '',
    'TASK [Gathering Facts] *************************************',
    'ok: [localhost]',
    '',
    'TASK [Install dependencies] *******************************',
    'changed: [localhost]',
    '',
    'TASK [Build application] **********************************',
    'changed: [localhost]',
    '',
    'TASK [Deploy to production] *******************************',
    'changed: [localhost]',
    '',
    'PLAY RECAP *************************************************',
    'localhost                  : ok=4    changed=3    unreachable=0    failed=0',
    '',
    '✅ Deployment successful!',
  ]

  playbook.forEach((line, i) => {
    setTimeout(() => {
      const element = document.createElement('div')
      element.className = 'font-mono text-amber-400 text-sm px-4 py-1'
      element.textContent = line
      element.style.opacity = '0'
      container.appendChild(element)
      
      setTimeout(() => {
        element.style.transition = 'opacity 0.3s'
        element.style.opacity = '1'
      }, 10)
    }, i * 200)
  })

  setTimeout(() => container.remove(), 8000)
}

function createK8sEffect() {
  const container = document.createElement('div')
  container.className = 'fixed inset-0 z-50 pointer-events-none overflow-hidden'
  container.style.background = 'rgba(0, 0, 0, 0.95)'
  document.body.appendChild(container)

  const k8sOutput = [
    '$ kubectl get pods',
    'NAME                    READY   STATUS    RESTARTS   AGE',
    'portfolio-deploy-abc123  1/1     Running   0          5m',
    'portfolio-svc-xyz789     1/1     Running   0          5m',
    '',
    '$ kubectl get services',
    'NAME           TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)',
    'portfolio-svc   NodePort    10.96.0.1      <none>        80:30000/TCP',
    '',
    '$ kubectl scale deployment portfolio --replicas=3',
    'deployment.apps/portfolio scaled',
    '',
    '✅ Kubernetes cluster operational',
  ]

  k8sOutput.forEach((line, i) => {
    setTimeout(() => {
      const element = document.createElement('div')
      element.className = 'font-mono text-cyan-400 text-sm px-4 py-1'
      element.textContent = line
      element.style.opacity = '0'
      container.appendChild(element)
      
      setTimeout(() => {
        element.style.transition = 'opacity 0.3s'
        element.style.opacity = '1'
      }, 10)
    }, i * 200)
  })

  setTimeout(() => container.remove(), 8000)
}

export function CheatCodes() {
  const [input, setInput] = useState('')
  const [activeCode, setActiveCode] = useState<string | null>(null)
  const [showInput, setShowInput] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintDismissed, setHintDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    // Show hint after 3 seconds
    const hintTimer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const dismissed = localStorage.getItem('cheat-hint-dismissed')
        if (!dismissed) {
          setShowHint(true)
        }
      }
    }, 3000)

    return () => clearTimeout(hintTimer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open cheat input with Ctrl+Shift+C or just start typing
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        setShowInput(true)
        setTimeout(() => inputRef.current?.focus(), 100)
        return
      }

      // If input is visible, handle typing
      if (showInput && inputRef.current) {
        if (e.key === 'Escape') {
          setShowInput(false)
          setInput('')
          return
        }
        if (e.key === 'Enter') {
          checkCheatCode(input.toLowerCase().trim())
          setInput('')
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showInput, input])

  const checkCheatCode = (code: string) => {
    const cheat = cheatCodes.find(c => c.code === code)
    if (cheat && !activeCode) {
      setActiveCode(cheat.code)
      setShowInput(false)
      cheat.effect()
      
      setTimeout(() => {
        setActiveCode(null)
      }, cheat.duration)
    } else if (code && !cheat) {
      // Invalid code feedback
      const feedback = document.createElement('div')
      feedback.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 z-50 tech-card p-3 font-mono text-sm text-accent-error'
      feedback.textContent = '❌ Invalid cheat code!'
      document.body.appendChild(feedback)
      setTimeout(() => {
        feedback.style.transition = 'opacity 0.3s'
        feedback.style.opacity = '0'
        setTimeout(() => feedback.remove(), 300)
      }, 2000)
    }
  }

  const dismissHint = () => {
    setShowHint(false)
    setHintDismissed(true)
    localStorage.setItem('cheat-hint-dismissed', 'true')
  }

  return (
    <>
      {/* Cheat Input */}
      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 tech-card p-4 min-w-[300px]"
          >
            <div className="flex items-center gap-3">
              <Code className="w-5 h-5 text-primary" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter cheat code..."
                className="flex-1 bg-transparent outline-none font-mono text-sm"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowInput(false)
                  setInput('')
                }}
                className="p-1 rounded hover:bg-surface-light"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 text-xs text-text-tertiary font-mono">
              Press Enter to activate, Esc to cancel
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-mono font-semibold text-sm mb-1">
                  Cheat Codes Available! 🎮
                </h3>
                <p className="text-xs text-text-secondary mb-2">
                  Press <span className="font-mono text-primary">Ctrl+Shift+C</span> to open cheat console
                </p>
                <p className="text-xs text-text-tertiary mb-2">
                  Try: <span className="font-mono text-primary">linux</span>, <span className="font-mono text-primary">docker</span>, <span className="font-mono text-primary">hacker</span>, <span className="font-mono text-primary">ansible</span>, <span className="font-mono text-primary">kubernetes</span>
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

      {/* Active Code Indicator */}
      <AnimatePresence>
        {activeCode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 tech-card p-3"
          >
            <div className="flex items-center gap-2 font-mono text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary">
                {cheatCodes.find(c => c.code === activeCode)?.name} Active!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Add CSS animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes fall {
      to {
        transform: translateY(100vh);
        opacity: 0;
      }
    }
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }
  `
  document.head.appendChild(style)
}

