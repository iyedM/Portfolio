'use client'

import { FadeInUp, SlideIn } from '@/components/ui/motion'
import { Briefcase, Award } from '@/components/ui/icons'
import { Icon } from '@/components/ui/icons'
import type { Experience, Certification } from '@/lib/data'

interface ExperienceProps {
  experiences: Experience[]
  certifications: Certification[]
}

export function Experience({ experiences, certifications }: ExperienceProps) {
  return (
    <section id="experience" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface/30" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInUp>
          <div className="text-center mb-16">
            <span className="inline-block font-mono text-sm text-primary mb-4">
              <span className="text-accent-success">$</span> history | grep experience
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">
              Experience & Certifications
            </h2>
          </div>
        </FadeInUp>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Experience Timeline */}
          <div>
            <SlideIn direction="left">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-2xl">Experience</h3>
              </div>
            </SlideIn>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

              {/* Experience items */}
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <SlideIn key={exp.id} direction="left" delay={0.1 + index * 0.1}>
                    <div className="relative pl-12">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-surface border-2 border-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>

                      <div className="tech-card p-5">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h4 className="font-display font-semibold text-lg">
                            {exp.role}
                          </h4>
                          <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-text-secondary font-medium mb-3 font-mono text-sm">
                          {exp.company}
                        </p>
                        <p className="text-sm text-text-tertiary mb-4">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded text-xs font-mono bg-surface-lighter text-text-secondary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SlideIn>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <SlideIn direction="right">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-display font-bold text-2xl">Certifications</h3>
              </div>
            </SlideIn>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <SlideIn key={cert.id} direction="right" delay={0.1 + index * 0.1}>
                  <div className="tech-card p-5 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                      <Icon name={cert.icon} className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-semibold text-base mb-1 line-clamp-2">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-text-secondary font-mono mb-1">{cert.issuer}</p>
                      <span className="text-xs font-mono text-secondary">{cert.year}</span>
                    </div>
                  </div>
                </SlideIn>
              ))}
            </div>

            {/* Stats */}
            <SlideIn direction="right" delay={0.4}>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="tech-card p-4 text-center">
                  <span className="block font-display text-3xl font-bold text-primary">
                    {experiences.length}+
                  </span>
                  <span className="text-xs text-text-tertiary font-mono">Positions</span>
                </div>
                <div className="tech-card p-4 text-center">
                  <span className="block font-display text-3xl font-bold text-secondary">
                    {certifications.length}+
                  </span>
                  <span className="text-xs text-text-tertiary font-mono">Certs</span>
                </div>
                <div className="tech-card p-4 text-center">
                  <span className="block font-display text-3xl font-bold text-accent">
                    3+
                  </span>
                  <span className="text-xs text-text-tertiary font-mono">Years</span>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  )
}
