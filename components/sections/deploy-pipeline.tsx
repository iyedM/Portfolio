'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInUp } from '@/components/ui/motion'
import { Rocket, Terminal, Shield, Server, CheckCircle2, Loader2, Download, Github } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PipelineStage {
  id: string
  name: string
  icon: React.ElementType
  status: 'pending' | 'running' | 'success' | 'failed'
  logs: string[]
  duration: number
}

const initialStages: PipelineStage[] = [
  {
    id: 'build',
    name: 'Build',
    icon: Terminal,
    status: 'pending',
    logs: [
      '$ npm install',
      'Installing dependencies...',
      'added 1247 packages in 12s',
      '$ npm run build',
      'Creating optimized production build...',
      '✓ Compiled successfully'
    ],
    duration: 2000
  },
  {
    id: 'test',
    name: 'Test',
    icon: CheckCircle2,
    status: 'pending',
    logs: [
      '$ npm run test',
      'Running test suites...',
      '✓ Skills validation: PASSED',
      '✓ Experience verification: PASSED',
      '✓ Projects integrity: PASSED',
      'All tests passed!'
    ],
    duration: 1500
  },
  {
    id: 'security',
    name: 'Security Scan',
    icon: Shield,
    status: 'pending',
    logs: [
      '$ trivy scan .',
      'Scanning for vulnerabilities...',
      'Checking dependencies...',
      'No vulnerabilities found',
      '✓ Security check passed'
    ],
    duration: 1800
  },
  {
    id: 'deploy',
    name: 'Deploy',
    icon: Server,
    status: 'pending',
    logs: [
      '$ kubectl apply -f deployment.yaml',
      'Deploying to production...',
      'pod/iyed-portfolio created',
      'service/portfolio-svc created',
      '✓ Deployment successful!'
    ],
    duration: 2200
  },
  {
    id: 'live',
    name: 'Live!',
    icon: Rocket,
    status: 'pending',
    logs: [
      '🎉 Pipeline completed successfully!',
      '→ Application is now live',
      '→ CV ready for download'
    ],
    duration: 1000
  }
]

export function DeployPipeline() {
  const [isRunning, setIsRunning] = useState(false)
  const [stages, setStages] = useState<PipelineStage[]>(initialStages)
  const [currentStageIndex, setCurrentStageIndex] = useState(-1)
  const [currentLogs, setCurrentLogs] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const resetPipeline = () => {
    setStages(initialStages)
    setCurrentStageIndex(-1)
    setCurrentLogs([])
    setIsComplete(false)
  }

  const runPipeline = async () => {
    if (isRunning) return
    
    resetPipeline()
    setIsRunning(true)
    setCurrentLogs(['$ git push origin main', 'Triggering CI/CD pipeline...', ''])

    for (let i = 0; i < initialStages.length; i++) {
      setCurrentStageIndex(i)
      
      // Set current stage to running
      setStages(prev => prev.map((stage, idx) => 
        idx === i ? { ...stage, status: 'running' } : stage
      ))

      // Add stage logs progressively
      const stage = initialStages[i]
      for (const log of stage.logs) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setCurrentLogs(prev => [...prev, log])
      }

      // Wait for stage duration
      await new Promise(resolve => setTimeout(resolve, stage.duration - (stage.logs.length * 200)))

      // Set stage to success
      setStages(prev => prev.map((s, idx) => 
        idx === i ? { ...s, status: 'success' } : s
      ))

      setCurrentLogs(prev => [...prev, ''])
    }

    setIsComplete(true)
    setIsRunning(false)
  }

  const downloadCV = () => {
    // Create a simple CV download (you can replace with actual CV URL)
    const link = document.createElement('a')
    link.href = '/cv-iyed-mohamed.pdf' // Add your CV file to public folder
    link.download = 'CV-Iyed-Mohamed.pdf'
    link.click()
  }

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-background to-surface/30" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
              <Github className="w-4 h-4" />
              CI/CD Pipeline
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Deploy Me
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Experience a real CI/CD pipeline simulation. Click the button to deploy and download my CV!
            </p>
          </div>
        </FadeInUp>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pipeline Visualization */}
          <FadeInUp delay={0.1}>
            <div className="tech-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono font-semibold text-lg">Pipeline Status</h3>
                <span className={cn(
                  'px-3 py-1 rounded-full text-xs font-mono',
                  isRunning && 'bg-amber-500/20 text-amber-400',
                  isComplete && 'bg-emerald-500/20 text-emerald-400',
                  !isRunning && !isComplete && 'bg-surface-light text-text-tertiary'
                )}>
                  {isRunning ? 'Running...' : isComplete ? 'Success' : 'Ready'}
                </span>
              </div>

              {/* Stages */}
              <div className="space-y-4">
                {stages.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0.5 }}
                    animate={{ 
                      opacity: stage.status !== 'pending' ? 1 : 0.5,
                    }}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-lg border transition-all duration-300',
                      stage.status === 'pending' && 'border-border bg-surface/50',
                      stage.status === 'running' && 'border-amber-500/50 bg-amber-500/10',
                      stage.status === 'success' && 'border-emerald-500/50 bg-emerald-500/10',
                    )}
                  >
                    {/* Icon */}
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      stage.status === 'pending' && 'bg-surface-light text-text-tertiary',
                      stage.status === 'running' && 'bg-amber-500/20 text-amber-400',
                      stage.status === 'success' && 'bg-emerald-500/20 text-emerald-400',
                    )}>
                      {stage.status === 'running' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <stage.icon className="w-5 h-5" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h4 className="font-mono font-semibold">{stage.name}</h4>
                      <p className="text-xs text-text-tertiary font-mono">
                        {stage.status === 'pending' && 'Waiting...'}
                        {stage.status === 'running' && 'In progress...'}
                        {stage.status === 'success' && 'Completed'}
                      </p>
                    </div>

                    {/* Status indicator */}
                    <div className={cn(
                      'w-3 h-3 rounded-full',
                      stage.status === 'pending' && 'bg-text-tertiary/30',
                      stage.status === 'running' && 'bg-amber-400 animate-pulse',
                      stage.status === 'success' && 'bg-emerald-400',
                    )} />
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={runPipeline}
                  disabled={isRunning}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-mono font-semibold transition-all',
                    isRunning 
                      ? 'bg-surface-light text-text-tertiary cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-secondary text-background hover:shadow-lg hover:shadow-primary/25'
                  )}
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      {isComplete ? 'Run Again' : 'Deploy Me'}
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {isComplete && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={downloadCV}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono font-semibold bg-emerald-500 text-background hover:bg-emerald-400 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Get CV
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeInUp>

          {/* Terminal Logs */}
          <FadeInUp delay={0.2}>
            <div className="tech-card overflow-hidden h-full">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="flex-1 text-center text-xs font-mono text-text-tertiary">
                  pipeline-logs
                </span>
              </div>

              {/* Logs */}
              <div className="h-[400px] overflow-y-auto p-4 bg-[#0d1117] font-mono text-sm">
                {currentLogs.length === 0 ? (
                  <div className="text-text-tertiary">
                    <p>Waiting for pipeline to start...</p>
                    <p className="mt-2">Click &quot;Deploy Me&quot; to begin.</p>
                  </div>
                ) : (
                  <AnimatePresence mode="sync">
                    {currentLogs.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          'leading-relaxed',
                          log.startsWith('$') && 'text-cyan-400',
                          log.startsWith('✓') && 'text-emerald-400',
                          log.startsWith('→') && 'text-primary',
                          log.startsWith('🎉') && 'text-amber-400',
                          log === '' && 'h-4',
                          !log.startsWith('$') && !log.startsWith('✓') && !log.startsWith('→') && !log.startsWith('🎉') && log !== '' && 'text-text-secondary'
                        )}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
                
                {isRunning && (
                  <motion.span 
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-primary ml-1"
                  />
                )}
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}

