'use client'

import { useState } from 'react'
import { FadeInUp, SlideIn } from '@/components/ui/motion'
import { Mail, MapPin, Github, Linkedin, Terminal, ChevronRight } from '@/components/ui/icons'
import type { Profile } from '@/lib/data'

interface ContactProps {
  profile: Profile
}

export function Contact({ profile }: ContactProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      })
      
      if (response.ok) {
        setSubmitted(true)
        setFormState({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError('Failed to send message. Please try again.')
      }
    } catch {
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/3 -left-48 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <FadeInUp>
          <div className="text-center mb-16">
            <span className="inline-block font-mono text-sm text-primary mb-4">
              <span className="text-accent-success">$</span> ./contact.sh --send
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold">
              Get In Touch
            </h2>
            <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s discuss your ideas and see how I can help.
            </p>
          </div>
        </FadeInUp>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <SlideIn direction="left">
            <div className="space-y-8">
              <div>
                <h3 className="font-display font-bold text-2xl mb-6">
                  Let&apos;s Connect
                </h3>
                <p className="text-text-secondary">
                  I&apos;m always open to new opportunities and interesting collaborations.
                  Whether it&apos;s a project, question, or just to chat, feel free to reach out.
                </p>
              </div>

              {/* Terminal style contact */}
              <div className="terminal">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-text-tertiary">contact-info</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-accent-success">iyed@cloud</span>
                    <span className="text-text-tertiary">:</span>
                    <span className="text-primary">~</span>
                    <span className="text-text-tertiary">$ </span>
                    <span className="text-text">cat contact.json</span>
                  </p>
                  <div className="terminal-text pl-4">
                    <p>{`{`}</p>
                    <p className="pl-4">&quot;email&quot;: &quot;<span className="text-primary">{profile.email}</span>&quot;,</p>
                    <p className="pl-4">&quot;location&quot;: &quot;<span className="text-primary">{profile.location}</span>&quot;,</p>
                    <p className="pl-4">&quot;github&quot;: &quot;<span className="text-primary">iyedM</span>&quot;,</p>
                    <p className="pl-4">&quot;status&quot;: &quot;<span className="text-accent-success">available</span>&quot;</p>
                    <p>{`}`}</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <h4 className="font-mono font-semibold mb-4 text-sm text-text-secondary">// Social Links</h4>
                <div className="flex gap-3">
                  {profile.socialLinks.github && (
                    <a
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors"
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
                      className="w-12 h-12 rounded-xl border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  <a
                    href={`mailto:${profile.email}`}
                    className="w-12 h-12 rounded-xl border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </SlideIn>

          {/* Contact Form */}
          <SlideIn direction="right">
            <form onSubmit={handleSubmit} className="tech-card p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-6 font-mono text-sm text-text-tertiary">
                <Terminal className="w-4 h-4 text-primary" />
                <span>// Send me a message</span>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-accent-error/10 border border-accent-error/30 text-accent-error text-sm font-mono">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-mono mb-2 text-text-secondary">
                    name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="input-field font-mono"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-mono mb-2 text-text-secondary">
                    email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="input-field font-mono"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-mono mb-2 text-text-secondary">
                    subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={(e) => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                    className="input-field font-mono"
                    placeholder="Project inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-mono mb-2 text-text-secondary">
                    message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="input-field resize-none font-mono"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="btn-primary w-full group disabled:opacity-70 disabled:cursor-not-allowed font-mono"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Message sent!
                    </>
                  ) : (
                    <>
                      Send message
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
