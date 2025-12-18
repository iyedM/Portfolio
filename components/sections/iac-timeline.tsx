'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInUp } from '@/components/ui/motion'
import { cn } from '@/lib/utils'
import { FileCode, Play, CheckCircle, Copy, Check } from 'lucide-react'
import type { Experience, Certification } from '@/lib/data'

interface IaCTimelineProps {
  experiences: Experience[]
  certifications: Certification[]
}

export function IaCTimeline({ experiences, certifications }: IaCTimelineProps) {
  const [activeTab, setActiveTab] = useState<'experiences' | 'certifications'>('experiences')
  const [isApplying, setIsApplying] = useState(false)
  const [appliedResources, setAppliedResources] = useState<string[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const generateTerraformCode = (exp: Experience) => {
    const resourceName = exp.company.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_')
    return `resource "career" "${resourceName}" {
  role        = "${exp.role}"
  company     = "${exp.company}"
  period      = "${exp.period}"
  description = "${exp.description.substring(0, 60)}..."
  
  technologies = [
    ${exp.technologies.map(t => `"${t}"`).join(',\n    ')}
  ]
  
  status = "completed"
}`
  }

  const generateCertTerraform = (cert: Certification) => {
    const resourceName = cert.name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_')
    return `resource "certification" "${resourceName}" {
  name   = "${cert.name}"
  issuer = "${cert.issuer}"
  year   = "${cert.year}"
  
  verified = true
}`
  }

  const applyTerraform = async () => {
    if (isApplying) return
    
    setIsApplying(true)
    setAppliedResources([])
    
    const resources = activeTab === 'experiences' ? experiences : certifications
    
    for (let i = 0; i < resources.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setAppliedResources(prev => [...prev, resources[i].id])
    }
    
    setIsApplying(false)
  }

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const allApplied = activeTab === 'experiences' 
    ? appliedResources.length === experiences.length
    : appliedResources.length === certifications.length

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-background to-surface/50" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
              <FileCode className="w-4 h-4" />
              terraform apply
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Career as Code
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              My professional journey defined as Infrastructure as Code. 
              Run terraform apply to deploy my experience!
            </p>
          </div>
        </FadeInUp>

        {/* Tabs & Controls */}
        <FadeInUp delay={0.1}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex gap-2">
              <button
                onClick={() => { setActiveTab('experiences'); setAppliedResources([]) }}
                className={cn(
                  'px-4 py-2 rounded-lg font-mono text-sm transition-all',
                  activeTab === 'experiences'
                    ? 'bg-primary text-background'
                    : 'bg-surface border border-border hover:border-primary/50'
                )}
              >
                experiences.tf
              </button>
              <button
                onClick={() => { setActiveTab('certifications'); setAppliedResources([]) }}
                className={cn(
                  'px-4 py-2 rounded-lg font-mono text-sm transition-all',
                  activeTab === 'certifications'
                    ? 'bg-primary text-background'
                    : 'bg-surface border border-border hover:border-primary/50'
                )}
              >
                certifications.tf
              </button>
            </div>

            <button
              onClick={applyTerraform}
              disabled={isApplying || allApplied}
              className={cn(
                'flex items-center gap-2 px-5 py-2 rounded-lg font-mono text-sm transition-all',
                isApplying || allApplied
                  ? 'bg-surface-light text-text-tertiary cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-500/25'
              )}
            >
              {allApplied ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Applied!
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  {isApplying ? 'Applying...' : 'terraform apply'}
                </>
              )}
            </button>
          </div>
        </FadeInUp>

        {/* Terminal Output Header */}
        <FadeInUp delay={0.15}>
          <div className="tech-card overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="flex-1 text-center text-xs font-mono text-text-tertiary">
                {activeTab}.tf — Terraform
              </span>
            </div>

            {/* Plan Output */}
            {isApplying && (
              <div className="px-4 py-3 bg-[#0d1117] border-b border-border font-mono text-sm">
                <p className="text-amber-400 mb-1">
                  Terraform will perform the following actions:
                </p>
                <p className="text-text-secondary">
                  Plan: {activeTab === 'experiences' ? experiences.length : certifications.length} to add, 0 to change, 0 to destroy.
                </p>
              </div>
            )}

            {/* Code Blocks */}
            <div className="max-h-[500px] overflow-y-auto">
              <AnimatePresence mode="sync">
                {activeTab === 'experiences' ? (
                  experiences.map((exp, index) => {
                    const isApplied = appliedResources.includes(exp.id)
                    const code = generateTerraformCode(exp)
                    
                    return (
                      <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          'border-b border-border last:border-0 transition-all duration-500',
                          isApplied && 'bg-emerald-500/5'
                        )}
                      >
                        {/* Resource Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-surface/50">
                          <div className="flex items-center gap-3">
                            {isApplied ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"
                              >
                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                              </motion.div>
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-surface-light" />
                            )}
                            <span className="font-mono text-sm">
                              <span className="text-violet-400">resource</span>
                              <span className="text-text-tertiary"> &quot;</span>
                              <span className="text-cyan-400">career</span>
                              <span className="text-text-tertiary">&quot;</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {isApplied && (
                              <span className="text-xs font-mono text-emerald-400">created</span>
                            )}
                            <button
                              onClick={() => copyToClipboard(code, exp.id)}
                              className="p-1.5 rounded hover:bg-surface-light transition-colors"
                            >
                              {copiedId === exp.id ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-text-tertiary" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Code */}
                        <pre className="px-4 py-3 bg-[#0d1117] overflow-x-auto">
                          <code className="font-mono text-sm leading-relaxed">
                            <span className="text-violet-400">resource</span>
                            <span className="text-text-tertiary"> &quot;</span>
                            <span className="text-cyan-400">career</span>
                            <span className="text-text-tertiary">&quot; &quot;</span>
                            <span className="text-amber-400">{exp.company.toLowerCase().replace(/[^a-z0-9]/g, '_')}</span>
                            <span className="text-text-tertiary">&quot;</span>
                            <span className="text-text"> {'{'}</span>
                            {'\n'}
                            <span className="text-cyan-400">  role</span>
                            <span className="text-text-tertiary">        = </span>
                            <span className="text-emerald-400">&quot;{exp.role}&quot;</span>
                            {'\n'}
                            <span className="text-cyan-400">  company</span>
                            <span className="text-text-tertiary">     = </span>
                            <span className="text-emerald-400">&quot;{exp.company}&quot;</span>
                            {'\n'}
                            <span className="text-cyan-400">  period</span>
                            <span className="text-text-tertiary">      = </span>
                            <span className="text-emerald-400">&quot;{exp.period}&quot;</span>
                            {'\n\n'}
                            <span className="text-cyan-400">  technologies</span>
                            <span className="text-text-tertiary"> = </span>
                            <span className="text-text">[</span>
                            {'\n'}
                            {exp.technologies.map((tech, i) => (
                              <span key={i}>
                                <span className="text-emerald-400">    &quot;{tech}&quot;</span>
                                {i < exp.technologies.length - 1 && <span className="text-text-tertiary">,</span>}
                                {'\n'}
                              </span>
                            ))}
                            <span className="text-text">  ]</span>
                            {'\n'}
                            <span className="text-text">{'}'}</span>
                          </code>
                        </pre>
                      </motion.div>
                    )
                  })
                ) : (
                  certifications.map((cert, index) => {
                    const isApplied = appliedResources.includes(cert.id)
                    const code = generateCertTerraform(cert)
                    
                    return (
                      <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          'border-b border-border last:border-0 transition-all duration-500',
                          isApplied && 'bg-emerald-500/5'
                        )}
                      >
                        {/* Resource Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-surface/50">
                          <div className="flex items-center gap-3">
                            {isApplied ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"
                              >
                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                              </motion.div>
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-surface-light" />
                            )}
                            <span className="font-mono text-sm">
                              <span className="text-violet-400">resource</span>
                              <span className="text-text-tertiary"> &quot;</span>
                              <span className="text-cyan-400">certification</span>
                              <span className="text-text-tertiary">&quot;</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {isApplied && (
                              <span className="text-xs font-mono text-emerald-400">created</span>
                            )}
                            <button
                              onClick={() => copyToClipboard(code, cert.id)}
                              className="p-1.5 rounded hover:bg-surface-light transition-colors"
                            >
                              {copiedId === cert.id ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-text-tertiary" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Code */}
                        <pre className="px-4 py-3 bg-[#0d1117] overflow-x-auto">
                          <code className="font-mono text-sm leading-relaxed">
                            <span className="text-violet-400">resource</span>
                            <span className="text-text-tertiary"> &quot;</span>
                            <span className="text-cyan-400">certification</span>
                            <span className="text-text-tertiary">&quot; &quot;</span>
                            <span className="text-amber-400">{cert.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}</span>
                            <span className="text-text-tertiary">&quot;</span>
                            <span className="text-text"> {'{'}</span>
                            {'\n'}
                            <span className="text-cyan-400">  name</span>
                            <span className="text-text-tertiary">     = </span>
                            <span className="text-emerald-400">&quot;{cert.name}&quot;</span>
                            {'\n'}
                            <span className="text-cyan-400">  issuer</span>
                            <span className="text-text-tertiary">   = </span>
                            <span className="text-emerald-400">&quot;{cert.issuer}&quot;</span>
                            {'\n'}
                            <span className="text-cyan-400">  year</span>
                            <span className="text-text-tertiary">     = </span>
                            <span className="text-emerald-400">&quot;{cert.year}&quot;</span>
                            {'\n\n'}
                            <span className="text-cyan-400">  verified</span>
                            <span className="text-text-tertiary"> = </span>
                            <span className="text-violet-400">true</span>
                            {'\n'}
                            <span className="text-text">{'}'}</span>
                          </code>
                        </pre>
                      </motion.div>
                    )
                  })
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {allApplied && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-3 bg-emerald-500/10 border-t border-emerald-500/30"
              >
                <p className="font-mono text-sm text-emerald-400">
                  ✓ Apply complete! Resources: {appliedResources.length} added, 0 changed, 0 destroyed.
                </p>
              </motion.div>
            )}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}

