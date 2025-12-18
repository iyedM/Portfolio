'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { Icon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { Layers, Activity, Cpu, HardDrive, RefreshCw, ChevronRight, X } from 'lucide-react'
import type { Skill, Category } from '@/lib/data'

interface K8sDashboardProps {
  skills: Skill[]
  categories: Category[]
}

interface PodMetrics {
  cpu: number
  memory: number
  uptime: string
}

const generateMetrics = (): PodMetrics => ({
  cpu: Math.floor(Math.random() * 40) + 10,
  memory: Math.floor(Math.random() * 50) + 20,
  uptime: `${Math.floor(Math.random() * 365)}d ${Math.floor(Math.random() * 24)}h`
})

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400' },
}

export function K8sDashboard({ skills, categories }: K8sDashboardProps) {
  const [selectedNamespace, setSelectedNamespace] = useState<string>('all')
  const [podMetrics, setPodMetrics] = useState<Record<string, PodMetrics>>({})
  const [selectedPod, setSelectedPod] = useState<Skill | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Initialize metrics
  useEffect(() => {
    const metrics: Record<string, PodMetrics> = {}
    skills.forEach(skill => {
      metrics[skill.id] = generateMetrics()
    })
    setPodMetrics(metrics)
  }, [skills])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPodMetrics(prev => {
        const updated = { ...prev }
        // Update a random pod's CPU
        const randomSkill = skills[Math.floor(Math.random() * skills.length)]
        if (randomSkill && updated[randomSkill.id]) {
          updated[randomSkill.id] = {
            ...updated[randomSkill.id],
            cpu: Math.max(5, Math.min(95, updated[randomSkill.id].cpu + (Math.random() - 0.5) * 10))
          }
        }
        return updated
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [skills])

  const refreshMetrics = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    const metrics: Record<string, PodMetrics> = {}
    skills.forEach(skill => {
      metrics[skill.id] = generateMetrics()
    })
    setPodMetrics(metrics)
    setIsRefreshing(false)
  }

  const filteredSkills = selectedNamespace === 'all' 
    ? skills 
    : skills.filter(s => s.category === selectedNamespace)

  const getCategoryColor = (slug: string) => {
    const category = categories.find(c => c.slug === slug)
    return category?.color || 'cyan'
  }

  const getCategoryName = (slug: string) => {
    const category = categories.find(c => c.slug === slug)
    return category?.name || slug
  }

  // Calculate totals
  const totalPods = filteredSkills.length
  const runningPods = totalPods
  const avgCpu = filteredSkills.reduce((acc, s) => acc + (podMetrics[s.id]?.cpu || 0), 0) / totalPods || 0
  const avgMemory = filteredSkills.reduce((acc, s) => acc + (podMetrics[s.id]?.memory || 0), 0) / totalPods || 0

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
              <Layers className="w-4 h-4" />
              kubectl get pods
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Skills Cluster
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              My technical skills visualized as Kubernetes pods. All systems running!
            </p>
          </div>
        </FadeInUp>

        {/* Dashboard Header */}
        <FadeInUp delay={0.1}>
          <div className="tech-card p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Namespace selector */}
              <div className="flex items-center gap-3">
                <span className="text-text-secondary font-mono text-sm">namespace:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedNamespace('all')}
                    className={cn(
                      'px-3 py-1.5 rounded-lg font-mono text-xs transition-all',
                      selectedNamespace === 'all'
                        ? 'bg-primary text-background'
                        : 'bg-surface border border-border hover:border-primary/50'
                    )}
                  >
                    all
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedNamespace(cat.slug)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg font-mono text-xs transition-all',
                        selectedNamespace === cat.slug
                          ? 'bg-primary text-background'
                          : 'bg-surface border border-border hover:border-primary/50'
                      )}
                    >
                      {cat.slug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Refresh button */}
              <button
                onClick={refreshMetrics}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors font-mono text-xs"
              >
                <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />
                Refresh
              </button>
            </div>
          </div>
        </FadeInUp>

        {/* Stats Overview */}
        <FadeInUp delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="tech-card p-4 text-center">
              <div className="text-3xl font-bold font-mono text-primary">{totalPods}</div>
              <div className="text-xs text-text-secondary font-mono mt-1">Total Pods</div>
            </div>
            <div className="tech-card p-4 text-center">
              <div className="text-3xl font-bold font-mono text-emerald-400">{runningPods}</div>
              <div className="text-xs text-text-secondary font-mono mt-1">Running</div>
            </div>
            <div className="tech-card p-4 text-center">
              <div className="text-3xl font-bold font-mono text-cyan-400">{avgCpu.toFixed(0)}%</div>
              <div className="text-xs text-text-secondary font-mono mt-1">Avg CPU</div>
            </div>
            <div className="tech-card p-4 text-center">
              <div className="text-3xl font-bold font-mono text-violet-400">{avgMemory.toFixed(0)}%</div>
              <div className="text-xs text-text-secondary font-mono mt-1">Avg Memory</div>
            </div>
          </div>
        </FadeInUp>

        {/* Pods Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const color = getCategoryColor(skill.category)
            const metrics = podMetrics[skill.id] || { cpu: 0, memory: 0, uptime: '0d 0h' }
            const colors = colorClasses[color] || colorClasses.cyan
            
            return (
              <StaggerItem key={skill.id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedPod(skill)}
                  className={cn(
                    'tech-card p-4 cursor-pointer transition-all',
                    'hover:border-primary/50'
                  )}
                >
                  {/* Pod Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono text-emerald-400">Running</span>
                    </div>
                    <span className={cn(
                      'px-2 py-0.5 rounded text-xs font-mono',
                      colors.bg, colors.text
                    )}>
                      {skill.category}
                    </span>
                  </div>

                  {/* Pod Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      colors.bg
                    )}>
                      <Icon name={skill.icon} className={cn('w-5 h-5', colors.text)} />
                    </div>
                    <div>
                      <h4 className="font-mono font-semibold text-sm">{skill.name}</h4>
                      <p className="text-xs text-text-tertiary font-mono">
                        pod/{skill.name.toLowerCase().replace(/[\s\/]/g, '-')}
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-2">
                    {/* CPU */}
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3 h-3 text-text-tertiary" />
                      <div className="flex-1 h-1.5 rounded-full bg-surface-light overflow-hidden">
                        <motion.div
                          className="h-full bg-cyan-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${metrics.cpu}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-xs font-mono text-text-tertiary w-8">{metrics.cpu.toFixed(0)}%</span>
                    </div>

                    {/* Memory */}
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-3 h-3 text-text-tertiary" />
                      <div className="flex-1 h-1.5 rounded-full bg-surface-light overflow-hidden">
                        <motion.div
                          className="h-full bg-violet-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${metrics.memory}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-xs font-mono text-text-tertiary w-8">{metrics.memory.toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* Uptime */}
                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-text-tertiary font-mono">Uptime</span>
                    <span className="text-xs font-mono text-text-secondary">{metrics.uptime}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Pod Details Modal */}
        <AnimatePresence>
          {selectedPod && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedPod(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="tech-card w-full max-w-lg p-6"
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center',
                      colorClasses[getCategoryColor(selectedPod.category)]?.bg || 'bg-cyan-500/10'
                    )}>
                      <Icon 
                        name={selectedPod.icon} 
                        className={cn(
                          'w-7 h-7',
                          colorClasses[getCategoryColor(selectedPod.category)]?.text || 'text-cyan-400'
                        )} 
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl">{selectedPod.name}</h3>
                      <p className="text-sm text-text-secondary font-mono">
                        {getCategoryName(selectedPod.category)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPod(null)}
                    className="p-2 rounded-lg hover:bg-surface-light transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Pod Info */}
                <div className="space-y-4 font-mono text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-surface">
                      <div className="text-text-tertiary mb-1">Status</div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        Running
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface">
                      <div className="text-text-tertiary mb-1">Restarts</div>
                      <div>0</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-surface">
                    <div className="text-text-tertiary mb-2">Resource Usage</div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>CPU</span>
                          <span>{podMetrics[selectedPod.id]?.cpu.toFixed(0) || 0}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-surface-light overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            style={{ width: `${podMetrics[selectedPod.id]?.cpu || 0}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Memory</span>
                          <span>{podMetrics[selectedPod.id]?.memory.toFixed(0) || 0}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-surface-light overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                            style={{ width: `${podMetrics[selectedPod.id]?.memory || 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-surface">
                    <div className="text-text-tertiary mb-2">kubectl commands</div>
                    <div className="space-y-1 text-xs text-cyan-400">
                      <p>$ kubectl describe pod {selectedPod.name.toLowerCase().replace(/[\s\/]/g, '-')}</p>
                      <p>$ kubectl logs {selectedPod.name.toLowerCase().replace(/[\s\/]/g, '-')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

