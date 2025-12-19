'use client'

import { FadeInUp } from '@/components/ui/motion'
import { Gamepad2, Keyboard } from 'lucide-react'
import { TypingChallengeInline } from './typing-challenge-inline'
import { TerminalSnakeInline } from './terminal-snake-inline'

export function ChallengesSection() {
  return (
    <section id="challenges" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-background to-surface/30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 font-mono text-sm text-primary mb-4">
              <Gamepad2 className="w-4 h-4" />
              Interactive Challenges
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Try Our Challenges
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Test your skills with these interactive games and challenges
            </p>
          </div>
        </FadeInUp>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Typing Challenge */}
          <FadeInUp delay={0.1}>
            <div className="tech-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Keyboard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl">Typing Challenge</h3>
                  <p className="text-sm text-text-secondary font-mono">
                    Test your typing speed with DevOps commands
                  </p>
                </div>
              </div>
              <TypingChallengeInline />
            </div>
          </FadeInUp>

          {/* Terminal Snake */}
          <FadeInUp delay={0.2}>
            <div className="tech-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl">Terminal Snake</h3>
                  <p className="text-sm text-text-secondary font-mono">
                    Eat good commands, avoid bad ones
                  </p>
                </div>
              </div>
              <TerminalSnakeInline />
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}

