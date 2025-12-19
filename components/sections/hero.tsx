'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Github, Linkedin, Mail, MapPin, Terminal } from '@/components/ui/icons'
import type { Profile } from '@/lib/data'
import { StatsHeader } from './stats-header'

interface HeroProps {
  profile: Profile
}

export function Hero({ profile }: HeroProps) {
  // Track page view
  useEffect(() => {
    fetch('/api/analytics/views', { method: 'POST' })
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <StatsHeader />
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid pattern - Terminal style */}
        <div className="absolute inset-0 grid-bg" />
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 scan-line pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col items-center text-center">
          {/* Terminal prompt intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-sm text-text-secondary mb-6"
          >
            <span className="text-accent-success">visitor@portfolio</span>
            <span className="text-text-tertiary">:</span>
            <span className="text-primary">~</span>
            <span className="text-text-tertiary">$ </span>
            <span className="text-text">./welcome.sh</span>
          </motion.div>

          {/* Status badge */}
          {profile.available && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-success/10 border border-accent-success/30 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
              <span className="text-sm font-medium text-accent-success font-mono">
                Available for new opportunities
              </span>
            </motion.div>
          )}

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-text">Hi, I&apos;m</span>
              <span className="block text-gradient mt-2">{profile.name}</span>
            </h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <p className="text-xl sm:text-2xl lg:text-3xl font-mono font-semibold text-primary">
                {profile.title}
              </p>
              <p className="text-lg text-text-secondary">
                {profile.subtitle}
              </p>
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-2xl mt-8 text-lg text-text-secondary leading-relaxed"
          >
            {profile.bio}
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-2 mt-6 text-text-tertiary font-mono text-sm"
          >
            <MapPin className="w-4 h-4" />
            <span>{profile.location}</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <a href="#projects" className="btn-primary group font-mono">
              View Projects
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="btn-secondary font-mono">
              <Terminal className="w-4 h-4" />
              Contact Me
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center gap-4 mt-12"
          >
            {profile.socialLinks.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl border border-border bg-surface/50 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {profile.socialLinks.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl border border-border bg-surface/50 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              className="w-12 h-12 rounded-xl border border-border bg-surface/50 flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-text-tertiary uppercase tracking-widest font-mono">scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
