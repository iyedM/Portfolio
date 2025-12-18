'use client'

import { useState } from 'react'
import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { Icon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import type { Skill, Category } from '@/lib/data'

interface SkillsProps {
  skills: Skill[]
  categories: Category[]
}

const colorGradients: Record<string, string> = {
  cyan: 'from-cyan-500 to-blue-500',
  violet: 'from-violet-500 to-purple-500',
  amber: 'from-amber-500 to-orange-500',
  emerald: 'from-emerald-500 to-teal-500',
  rose: 'from-rose-500 to-pink-500',
  blue: 'from-blue-500 to-indigo-500',
  orange: 'from-orange-500 to-red-500',
  teal: 'from-teal-500 to-cyan-500',
  pink: 'from-pink-500 to-rose-500',
  indigo: 'from-indigo-500 to-violet-500',
}

const colorBadges: Record<string, string> = {
  cyan: 'bg-cyan-500/10 text-cyan-400',
  violet: 'bg-violet-500/10 text-violet-400',
  amber: 'bg-amber-500/10 text-amber-400',
  emerald: 'bg-emerald-500/10 text-emerald-400',
  rose: 'bg-rose-500/10 text-rose-400',
  blue: 'bg-blue-500/10 text-blue-400',
  orange: 'bg-orange-500/10 text-orange-400',
  teal: 'bg-teal-500/10 text-teal-400',
  pink: 'bg-pink-500/10 text-pink-400',
  indigo: 'bg-indigo-500/10 text-indigo-400',
}

export function Skills({ skills, categories }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory)

  const getCategoryColor = (slug: string) => {
    const category = categories.find(c => c.slug === slug)
    return category?.color || 'cyan'
  }

  const getCategoryName = (slug: string) => {
    const category = categories.find(c => c.slug === slug)
    return category?.name || slug
  }

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface/30" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInUp>
          <div className="text-center mb-16">
            <span className="inline-block font-mono text-sm text-primary mb-4">
              <span className="text-accent-success">$</span> ls -la skills/
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">
              Tech Stack
            </h2>
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

        {/* Skills grid - No percentages, just icons and names */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredSkills.map((skill) => {
            const color = getCategoryColor(skill.category)
            return (
              <StaggerItem key={skill.id}>
                <div className="tech-card p-5 group text-center">
                  <div className={cn(
                    'w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-3',
                    'bg-gradient-to-br',
                    colorGradients[color] || 'from-primary to-secondary',
                    'opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all'
                  )}>
                    <Icon name={skill.icon} className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="font-mono font-semibold text-sm">
                    {skill.name}
                  </h3>
                  
                  {/* Category tag */}
                  <div className="mt-2">
                    <span className={cn(
                      'inline-block px-2 py-0.5 rounded text-xs font-mono',
                      colorBadges[color] || 'bg-cyan-500/10 text-cyan-400',
                    )}>
                      {getCategoryName(skill.category)}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
