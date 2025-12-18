'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Terminal, 
  Home, 
  FolderKanban, 
  Code, 
  Briefcase, 
  Award, 
  Settings,
  LogOut,
  MessageSquare,
  ExternalLink,
  Layers
} from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/admin', icon: Home, label: 'Dashboard' },
  { href: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/admin/profile', icon: Settings, label: 'Profile' },
  { href: '/admin/categories', icon: Layers, label: 'Categories' },
  { href: '/admin/skills', icon: Code, label: 'Skills' },
  { href: '/admin/projects', icon: FolderKanban, label: 'Projects' },
  { href: '/admin/experiences', icon: Briefcase, label: 'Experience' },
  { href: '/admin/certifications', icon: Award, label: 'Certifications' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Terminal className="w-5 h-5 text-background" />
          </div>
          <div>
            <span className="font-mono font-bold text-lg block">
              <span className="text-accent-success">root</span>
              <span className="text-text-tertiary">@</span>
              <span className="text-primary">admin</span>
            </span>
            <span className="text-xs text-text-tertiary font-mono">Portfolio Manager</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-mono text-sm',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:text-text hover:bg-surface-light'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-text hover:bg-surface-light transition-colors font-mono text-sm"
        >
          <ExternalLink className="w-5 h-5" />
          <span>View Portfolio</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-accent-error hover:bg-accent-error/10 transition-colors font-mono text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
