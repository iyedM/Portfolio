import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getPortfolioData } from '@/lib/data'
import { Code, FolderKanban, Briefcase, Award, Eye, Mail, MessageSquare } from '@/components/ui/icons'
import Link from 'next/link'

export const revalidate = 0

export default async function AdminDashboard() {
  const session = await getSession()
  
  if (!session) {
    redirect('/ctrl-iyed-2024')
  }

  const data = await getPortfolioData()
  const unreadMessages = data.messages.filter(m => !m.read).length

  const stats = [
    { 
      label: 'Page Views', 
      value: data.analytics.views, 
      icon: Eye, 
      href: '/admin',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      label: 'Messages', 
      value: data.messages.length, 
      icon: MessageSquare, 
      href: '/admin/messages',
      color: 'from-pink-500 to-rose-500',
      badge: unreadMessages > 0 ? unreadMessages : null
    },
    { 
      label: 'Skills', 
      value: data.skills.length, 
      icon: Code, 
      href: '/admin/skills',
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      label: 'Projects', 
      value: data.projects.length, 
      icon: FolderKanban, 
      href: '/admin/projects',
      color: 'from-violet-500 to-purple-500'
    },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">
          Welcome back, {data.profile.name} 👋
        </h1>
        <p className="text-text-secondary font-mono text-sm">
          <span className="text-accent-success">$</span> Manage your portfolio from this dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="tech-card p-6 group relative"
          >
            {stat.badge && (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-error text-white text-xs font-bold flex items-center justify-center">
                {stat.badge}
              </span>
            )}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-display font-bold mb-1">{stat.value}</p>
            <p className="text-text-secondary font-mono text-sm">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="tech-card p-6 mb-8">
        <h2 className="font-display font-bold text-xl mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/messages"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <Mail className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm">View Messages</span>
          </Link>
          <Link
            href="/admin/skills"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <Code className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm">Add Skill</span>
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <FolderKanban className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm">Add Project</span>
          </Link>
          <Link
            href="/admin/profile"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <Award className="w-5 h-5 text-primary" />
            <span className="font-mono text-sm">Edit Profile</span>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="tech-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg">Recent Messages</h2>
            <Link href="/admin/messages" className="text-primary text-sm hover:underline font-mono">
              View all
            </Link>
          </div>
          {data.messages.length > 0 ? (
            <div className="space-y-3">
              {data.messages.slice(0, 3).map((msg) => (
                <div key={msg.id} className={`p-3 rounded-lg ${msg.read ? 'bg-surface-light' : 'bg-primary/5 border border-primary/20'}`}>
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-sm">{msg.name}</p>
                    {!msg.read && (
                      <span className="text-xs bg-primary text-background px-2 py-0.5 rounded font-mono">New</span>
                    )}
                  </div>
                  <p className="text-xs text-text-tertiary font-mono mb-1">{msg.email}</p>
                  <p className="text-sm text-text-secondary line-clamp-1">{msg.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-tertiary text-sm font-mono">No messages yet</p>
          )}
        </div>

        {/* Recent Projects */}
        <div className="tech-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg">Recent Projects</h2>
            <Link href="/admin/projects" className="text-primary text-sm hover:underline font-mono">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {data.projects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-light">
                <div>
                  <p className="font-medium text-sm">{project.title}</p>
                  <p className="text-xs text-text-tertiary font-mono">{project.category}</p>
                </div>
                {project.featured && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
