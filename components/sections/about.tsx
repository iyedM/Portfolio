'use client'

import { FadeInUp, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { Terminal, Cloud, Cpu, Rocket, Server, Container } from '@/components/ui/icons'
import type { Profile } from '@/lib/data'

interface AboutProps {
  profile: Profile
}

const highlights = [
  {
    icon: Cloud,
    title: 'Cloud Computing',
    description: 'Designing and deploying scalable cloud infrastructure on Azure, AWS'
  },
  {
    icon: Container,
    title: 'DevOps & Containers',
    description: 'Docker, Kubernetes, CI/CD pipelines, and Infrastructure as Code'
  },
  {
    icon: Server,
    title: 'Linux & Automation',
    description: 'System administration, Bash scripting, and process automation'
  },
  {
    icon: Cpu,
    title: 'IoT & AI/ML',
    description: 'Edge computing, TensorFlow, and intelligent systems development'
  }
]

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInUp>
          <div className="text-center mb-16">
            <span className="inline-block font-mono text-sm text-primary mb-4">
              <span className="text-accent-success">$</span> cat about.md
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">
              About Me
            </h2>
          </div>
        </FadeInUp>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text */}
          <FadeInUp delay={0.1}>
            <div className="space-y-6">
              <div className="prose prose-lg prose-invert">
                <p className="text-xl text-text-secondary leading-relaxed">
                  {profile.bio}
                </p>
                <p className="text-text-secondary">
                  I&apos;m passionate about cloud technologies and automation. I strive to 
                  create robust and scalable solutions that address modern technical 
                  challenges.
                </p>
                <p className="text-text-secondary">
                  My expertise covers the entire DevOps lifecycle, from infrastructure 
                  as code to monitoring and observability, including AI and MLOps.
                </p>
              </div>

              {/* Terminal style info */}
              <div className="terminal mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-text-tertiary">bash</span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-accent-success">iyed@cloud</span>
                    <span className="text-text-tertiary">:</span>
                    <span className="text-primary">~</span>
                    <span className="text-text-tertiary">$ </span>
                    <span className="text-text">whoami</span>
                  </p>
                  <p className="terminal-text">{profile.name} - {profile.title}</p>
                  <p>
                    <span className="text-accent-success">iyed@cloud</span>
                    <span className="text-text-tertiary">:</span>
                    <span className="text-primary">~</span>
                    <span className="text-text-tertiary">$ </span>
                    <span className="text-text">cat interests.txt</span>
                  </p>
                  <p className="terminal-text">Cloud • DevOps • Linux • AI/ML • IoT</p>
                  <p>
                    <span className="text-accent-success">iyed@cloud</span>
                    <span className="text-text-tertiary">:</span>
                    <span className="text-primary">~</span>
                    <span className="text-text-tertiary">$ </span>
                    <span className="text-secondary animate-pulse">▊</span>
                  </p>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* Right side - Highlights */}
          <StaggerContainer className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <StaggerItem key={index}>
                <div className="tech-card p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
