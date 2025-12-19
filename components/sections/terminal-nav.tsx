'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInUp } from '@/components/ui/motion'
import { ChevronRight, Terminal } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { trackTerminalCommand } from '@/lib/achievements'

interface Command {
  cmd: string
  description: string
  section: string
  output?: string[]
}

const commands: Command[] = [
  { 
    cmd: 'help', 
    description: 'Display available commands',
    section: '',
    output: []
  },
  { 
    cmd: 'whoami', 
    description: 'Display profile information',
    section: 'about',
    output: ['Navigating to profile...']
  },
  { 
    cmd: 'ls -la skills/', 
    description: 'List all technical skills',
    section: 'skills',
    output: ['drwxr-xr-x  cloud/', 'drwxr-xr-x  devops/', 'drwxr-xr-x  programming/', 'drwxr-xr-x  ai/']
  },
  { 
    cmd: 'find ~/projects -type f', 
    description: 'Browse portfolio projects',
    section: 'projects',
    output: ['./cloud-monitoring-lab', './wheat-iot-traceability', './swapify-platform', '...']
  },
  { 
    cmd: 'history | grep experience', 
    description: 'View work experience & certifications',
    section: 'experience',
    output: ['Loading career timeline...']
  },
  { 
    cmd: 'curl -X POST contact/', 
    description: 'Send a message / Get in touch',
    section: 'contact',
    output: ['Opening contact form...']
  },
  { 
    cmd: 'clear', 
    description: 'Clear terminal history',
    section: '',
    output: []
  },
]

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'help' | 'loading'
  content: string
  id: number
}

export function TerminalNav() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Iyed\'s Portfolio Terminal v1.0.0', id: 0 },
    { type: 'output', content: 'Type "help" to see available commands.', id: 1 },
    { type: 'output', content: '', id: 2 },
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const lineIdRef = useRef(3)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const addLine = (type: TerminalLine['type'], content: string) => {
    const newLine = { type, content, id: lineIdRef.current++ }
    setHistory(prev => [...prev, newLine])
    return newLine.id
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const simulateLoading = async () => {
    const loadingId = addLine('loading', '')
    
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 300))
      setHistory(prev => 
        prev.map(line => 
          line.id === loadingId 
            ? { ...line, content: '.'.repeat(i + 1) }
            : line
        )
      )
    }
    
    // Remove loading line
    setHistory(prev => prev.filter(line => line.id !== loadingId))
  }

  const processCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    
    // Add command to history
    addLine('input', `$ ${cmd}`)
    setCommandHistory(prev => [cmd, ...prev])
    setHistoryIndex(-1)
    setIsProcessing(true)

    // Easter Eggs
    if (trimmedCmd === 'sudo rm -rf /' || trimmedCmd.includes('rm -rf')) {
      addLine('error', 'Nice try! 😏 System protected.')
      addLine('output', 'This is a read-only filesystem. Your destructive commands are blocked.')
      addLine('output', '')
      setIsProcessing(false)
      setInput('')
      return
    }

    if (trimmedCmd === 'cat /etc/passwd') {
      addLine('output', '')
      addLine('help', '╔══════════════════════════════════════════════════════════════╗')
      addLine('help', '║                    CONTACT INFORMATION                       ║')
      addLine('help', '╠══════════════════════════════════════════════════════════════╣')
      addLine('help', '║  Name:    Iyed Mohamed                                      ║')
      addLine('help', '║  Email:   iyed.mohamed@esprit.tn                           ║')
      addLine('help', '║  GitHub:  github.com/iyedM                                  ║')
      addLine('help', '║  LinkedIn: linkedin.com/in/iyed-mohamed                     ║')
      addLine('help', '║  Status:  Available for opportunities                      ║')
      addLine('help', '╚══════════════════════════════════════════════════════════════╝')
      addLine('output', '')
      setIsProcessing(false)
      setInput('')
      return
    }

    if (trimmedCmd === 'cowsay hello' || trimmedCmd.startsWith('cowsay')) {
      const message = cmd.includes('cowsay') && cmd.length > 7 ? cmd.substring(7).trim() : 'hello'
      const border = '─'.repeat(Math.max(20, message.length + 2))
      addLine('output', '')
      addLine('output', `  ${border}`)
      addLine('output', ` < ${message} >`)
      addLine('output', `  ${border}`)
      addLine('output', '         \\   ^__^')
      addLine('output', '          \\  (oo)\\_______')
      addLine('output', '             (__)\\       )\\/\\')
      addLine('output', '                 ||----w |')
      addLine('output', '                 ||     ||')
      addLine('output', '')
      setIsProcessing(false)
      setInput('')
      return
    }

    if (trimmedCmd === 'neofetch') {
      addLine('output', '')
      addLine('help', '       _            _     _')
      addLine('help', '      (_)          | |   | |')
      addLine('help', '  _ __  _  ___  ___| | __| |')
      addLine('help', ' | \'_ \\| |/ _ \\/ __| |/ _` |')
      addLine('help', ' | | | | |  __/ (__| | (_| |')
      addLine('help', ' |_| |_|_|\\___|\\___|_|\\__,_|')
      addLine('output', '')
      addLine('output', 'OS: Cloud & DevOps Engineering')
      addLine('output', 'Host: ESPRIT University')
      addLine('output', 'Kernel: Software Engineering')
      addLine('output', 'Uptime: Since 2021')
      addLine('output', 'Shell: bash 5.x')
      addLine('output', 'Skills: Docker, K8s, Terraform, Azure, AI/ML')
      addLine('output', 'Languages: Python, JavaScript, C/C++, Java, PHP')
      addLine('output', 'Certifications: Azure Fundamentals, AI-900, DP-900')
      addLine('output', '')
      setIsProcessing(false)
      setInput('')
      return
    }

    if (trimmedCmd === 'cmatrix') {
      trackTerminalCommand()
      addLine('output', '')
      addLine('output', 'Matrix mode activated! 🌌')
      addLine('output', '')
      addLine('output', 'docker pull ubuntu:latest')
      addLine('output', 'kubectl apply -f deployment.yaml')
      addLine('output', 'terraform init')
      addLine('output', 'terraform plan')
      addLine('output', 'terraform apply')
      addLine('output', 'git push origin main')
      addLine('output', 'npm run build')
      addLine('output', 'docker-compose up -d')
      addLine('output', 'kubectl get pods')
      addLine('output', '')
      addLine('output', '...falling commands...')
      addLine('output', '')
      setIsProcessing(false)
      setInput('')
      return
    }
    
    // Track easter egg commands
    if (trimmedCmd === 'cowsay hello' || trimmedCmd.startsWith('cowsay') || 
        trimmedCmd === 'neofetch' || trimmedCmd === 'cat /etc/passwd') {
      trackTerminalCommand()
    }

    // Find matching command
    const matchedCommand = commands.find(c => 
      trimmedCmd === c.cmd.toLowerCase() || 
      trimmedCmd.includes(c.cmd.toLowerCase().split(' ')[0])
    )

    if (trimmedCmd === 'help') {
      addLine('output', '')
      addLine('help', '╔══════════════════════════════════════════════════════════════╗')
      addLine('help', '║                    AVAILABLE COMMANDS                        ║')
      addLine('help', '╠══════════════════════════════════════════════════════════════╣')
      commands.filter(c => c.cmd !== 'help').forEach(c => {
        const paddedCmd = c.cmd.padEnd(28)
        addLine('help', `║  ${paddedCmd} │ ${c.description.padEnd(28)} ║`)
      })
      addLine('help', '╠══════════════════════════════════════════════════════════════╣')
      addLine('help', '║                    EASTER EGGS 🥚                            ║')
      addLine('help', '╠══════════════════════════════════════════════════════════════╣')
      addLine('help', '║  sudo rm -rf /      │ Try to delete everything 😏            ║')
      addLine('help', '║  cat /etc/passwd    │ Show contact information               ║')
      addLine('help', '║  cowsay hello       │ ASCII art cow                         ║')
      addLine('help', '║  neofetch           │ Display system info                    ║')
      addLine('help', '║  cmatrix            │ Matrix rain effect                    ║')
      addLine('help', '╚══════════════════════════════════════════════════════════════╝')
      addLine('output', '')
    } else if (trimmedCmd === 'clear') {
      setHistory([
        { type: 'output', content: 'Terminal cleared.', id: lineIdRef.current++ },
        { type: 'output', content: '', id: lineIdRef.current++ },
      ])
    } else if (matchedCommand && matchedCommand.section) {
      // Track command for achievement
      trackTerminalCommand()
      
      // Show output lines
      matchedCommand.output?.forEach(line => {
        addLine('output', line)
      })
      
      // Simulate loading
      await simulateLoading()
      
      addLine('output', `→ Navigating to ${matchedCommand.section}...`)
      addLine('output', '')
      
      // Scroll to section after a short delay
      setTimeout(() => {
        scrollToSection(matchedCommand.section)
      }, 500)
    } else if (trimmedCmd === '') {
      // Do nothing for empty command
    } else {
      addLine('error', `bash: ${cmd}: command not found`)
      addLine('output', 'Type "help" to see available commands.')
      addLine('output', '')
    }

    setIsProcessing(false)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isProcessing) {
      processCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Auto-complete
      const matchingCmd = commands.find(c => 
        c.cmd.toLowerCase().startsWith(input.toLowerCase()) && c.cmd !== 'help'
      )
      if (matchingCmd) {
        setInput(matchingCmd.cmd)
      }
    }
  }

  const handleQuickCommand = (cmd: string) => {
    if (!isProcessing) {
      setInput(cmd)
      processCommand(cmd)
    }
  }

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
              <Terminal className="w-4 h-4" />
              Interactive Navigation
            </span>
            <h2 className="font-display text-2xl lg:text-3xl font-bold">
              Navigate Like a Pro
            </h2>
            <p className="text-text-secondary mt-2 text-sm">
              Use terminal commands to explore the portfolio
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          {/* Terminal Window */}
          <div className="rounded-xl overflow-hidden border border-border bg-[#0d1117] shadow-2xl shadow-primary/10">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="flex-1 text-center text-xs font-mono text-text-tertiary">
                iyed@portfolio:~
              </span>
            </div>

            {/* Terminal Body */}
            <div 
              ref={terminalRef}
              className="h-64 overflow-y-auto p-4 font-mono text-sm"
              onClick={() => inputRef.current?.focus()}
            >
              <AnimatePresence mode="sync">
                {history.map((line) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'leading-relaxed whitespace-pre',
                      line.type === 'input' && 'text-text',
                      line.type === 'output' && 'text-text-secondary',
                      line.type === 'error' && 'text-accent-error',
                      line.type === 'help' && 'text-cyan-400',
                      line.type === 'loading' && 'text-primary animate-pulse',
                    )}
                  >
                    {line.content}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Input Line */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-accent-success">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isProcessing}
                  className="flex-1 bg-transparent outline-none text-text caret-primary"
                  placeholder={isProcessing ? 'Processing...' : 'Type a command...'}
                  autoFocus
                />
                {isProcessing && (
                  <span className="text-primary animate-pulse">●</span>
                )}
              </div>
            </div>

            {/* Quick Commands */}
            <div className="px-4 py-3 bg-[#161b22] border-t border-border">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-mono text-text-tertiary mr-2">Quick:</span>
                {commands.filter(c => c.section).map((cmd) => (
                  <button
                    key={cmd.cmd}
                    onClick={() => handleQuickCommand(cmd.cmd)}
                    disabled={isProcessing}
                    className="px-2 py-1 text-xs font-mono rounded bg-surface hover:bg-primary/20 hover:text-primary transition-colors border border-border/50 disabled:opacity-50"
                  >
                    {cmd.section}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Keyboard hints */}
        <FadeInUp delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs font-mono text-text-tertiary">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-0.5 rounded bg-surface border border-border">↑↓</kbd>
              History
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-0.5 rounded bg-surface border border-border">Tab</kbd>
              Autocomplete
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-0.5 rounded bg-surface border border-border">Enter</kbd>
              Execute
            </span>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}

