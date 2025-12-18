'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeInUp } from '@/components/ui/motion'
import { ExternalLink, Github } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import type { Project, Category } from '@/lib/data'

interface ProjectsProps {
  projects: Project[]
  categories: Category[]
}

const colorGradients: Record<string, string> = {
  cyan: 'from-cyan-500/20 to-blue-500/20',
  violet: 'from-violet-500/20 to-purple-500/20',
  amber: 'from-amber-500/20 to-orange-500/20',
  emerald: 'from-emerald-500/20 to-teal-500/20',
  rose: 'from-rose-500/20 to-pink-500/20',
  blue: 'from-blue-500/20 to-indigo-500/20',
  orange: 'from-orange-500/20 to-red-500/20',
  teal: 'from-teal-500/20 to-cyan-500/20',
  pink: 'from-pink-500/20 to-rose-500/20',
  indigo: 'from-indigo-500/20 to-violet-500/20',
}

const colorBadges: Record<string, string> = {
  cyan: 'bg-cyan-500/20 text-cyan-400',
  violet: 'bg-violet-500/20 text-violet-400',
  amber: 'bg-amber-500/20 text-amber-400',
  emerald: 'bg-emerald-500/20 text-emerald-400',
  rose: 'bg-rose-500/20 text-rose-400',
  blue: 'bg-blue-500/20 text-blue-400',
  orange: 'bg-orange-500/20 text-orange-400',
  teal: 'bg-teal-500/20 text-teal-400',
  pink: 'bg-pink-500/20 text-pink-400',
  indigo: 'bg-indigo-500/20 text-indigo-400',
}

export function Projects({ projects, categories }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  const getCategoryColor = (slug: string) => {
    const category = categories.find(c => c.slug === slug)
    return category?.color || 'cyan'
  }

  const getCategoryName = (slug: string) => {
    const category = categories.find(c => c.slug === slug)
    return category?.name || slug
  }

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-background to-surface/30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInUp>
          <div className="text-center mb-16">
            <span className="inline-block font-mono text-sm text-primary mb-4">
              <span className="text-accent-success">$</span> find ~/projects -type f
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">
              Featured Projects
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              A selection of projects showcasing my expertise in Cloud, DevOps, and AI.
            </p>
          </div>
        </FadeInUp>

        {/* Category filters */}
        <FadeInUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200',
                activeCategory === 'all'
                  ? 'bg-primary text-background'
                  : 'bg-surface border border-border text-text-secondary hover:border-primary/50 hover:text-text'
              )}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
                className={cn(
                  'px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200',
                  activeCategory === category.slug
                    ? 'bg-primary text-background'
                    : 'bg-surface border border-border text-text-secondary hover:border-primary/50 hover:text-text'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* Projects grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const color = getCategoryColor(project.category)
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="tech-card h-full overflow-hidden">
                    {/* Project image placeholder */}
                    <div className={cn(
                      'relative h-48 bg-gradient-to-br',
                      colorGradients[color] || 'from-cyan-500/20 to-blue-500/20'
                    )}>
                      <div className="absolute inset-0 grid-bg opacity-50" />
                      
                      {/* Terminal decoration */}
                      <div className="absolute top-4 left-4 font-mono text-xs text-text-tertiary">
                        <span className="text-accent-success">$</span> docker run {project.title.toLowerCase().replace(/\s/g, '-')}
                      </div>
                      
                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-primary text-background">
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Hover overlay with link */}
                      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-background hover:scale-110 transition-transform"
                            aria-label="View on GitHub"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-text hover:border-primary hover:text-primary transition-colors"
                          aria-label="External link"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>

                      {/* Category indicator */}
                      <div className="absolute bottom-4 right-4">
                        <span className={cn(
                          'px-2 py-1 rounded text-xs font-mono',
                          colorBadges[color] || 'bg-cyan-500/20 text-cyan-400',
                        )}>
                          {getCategoryName(project.category)}
                        </span>
                      </div>
                    </div>

                    {/* Project info */}
                    <div className="p-6">
                      <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded text-xs font-mono bg-surface-light text-text-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
