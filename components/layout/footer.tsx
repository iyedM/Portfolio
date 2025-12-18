'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, Terminal } from '@/components/ui/icons'

interface FooterProps {
  socialLinks?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  email?: string
}

export function Footer({ socialLinks, email }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border bg-surface/30">
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Terminal className="w-4 h-4 text-background" />
              </div>
              <span className="font-mono font-bold">
                <span className="text-primary">~/</span>iyed
              </span>
            </Link>
            <p className="text-sm text-text-tertiary">
              © {currentYear} — Built with passion
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks?.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {socialLinks?.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="w-10 h-10 rounded-lg border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Terminal-style footer text */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="font-mono text-xs text-text-tertiary text-center">
            <span className="text-accent-success">iyed@cloud</span>
            <span className="text-text-tertiary">:</span>
            <span className="text-primary">~</span>
            <span className="text-text-tertiary">$ </span>
            echo &quot;Thanks for visiting!&quot;
          </div>
        </div>
      </div>
    </footer>
  )
}
