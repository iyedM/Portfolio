'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Save, X, ExternalLink } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import type { Project, Category } from '@/lib/data'

const colorClasses: Record<string, string> = {
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

const tagColorClasses: Record<string, string> = {
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

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [tagsInput, setTagsInput] = useState('')
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    image: '',
    tags: [],
    category: '',
    link: '',
    featured: false
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        fetch('/api/portfolio/projects'),
        fetch('/api/portfolio/categories')
      ])
      const projectsData = await projectsRes.json()
      const categoriesData = await categoriesRes.json()
      setProjects(projectsData)
      setCategories(categoriesData)
      if (categoriesData.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: categoriesData[0].slug }))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCategoryColor = (slug: string) => {
    const category = categories.find(c => c.slug === slug)
    return category?.color || 'cyan'
  }

  const getCategoryName = (slug: string) => {
    const category = categories.find(c => c.slug === slug)
    return category?.name || slug
  }

  const handleAdd = async () => {
    try {
      const response = await fetch('/api/portfolio/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean) })
      })
      
      if (response.ok) {
        await fetchData()
        setIsAdding(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch('/api/portfolio/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...formData, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean) })
      })
      
      if (response.ok) {
        await fetchData()
        setEditingId(null)
        resetForm()
      }
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    try {
      const response = await fetch(`/api/portfolio/projects?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchData()
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const startEdit = (project: Project) => {
    setEditingId(project.id)
    setFormData(project)
    setTagsInput(project.tags.join(', '))
    setIsAdding(false)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      tags: [],
      category: categories[0]?.slug || '',
      link: '',
      featured: false
    })
    setTagsInput('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsAdding(false)
    resetForm()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Projects</h1>
          <p className="text-text-secondary font-mono text-sm">
            <span className="text-accent-success">$</span> Manage your portfolio projects
          </p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); resetForm() }}
          className="btn-primary font-mono"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Warning if no categories */}
      {categories.length === 0 && (
        <div className="mb-6 p-4 rounded-lg bg-accent-warning/10 border border-accent-warning/30 text-accent-warning font-mono text-sm">
          ⚠️ No categories found. Please add categories first in the Categories section.
        </div>
      )}

      {/* Add/Edit Form */}
      {(isAdding || editingId) && categories.length > 0 && (
        <div className="tech-card p-6 mb-8">
          <h2 className="font-display font-bold text-xl mb-4">
            {isAdding ? 'New Project' : 'Edit Project'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="input-field font-mono"
                placeholder="e.g. AWS Infrastructure"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">category</label>
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="input-field font-mono"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-mono mb-2 text-text-secondary">description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="input-field resize-none font-mono"
                rows={3}
                placeholder="Describe the project..."
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">link (GitHub, etc.)</label>
              <input
                type="url"
                value={formData.link || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                className="input-field font-mono"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">tags (comma separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="input-field font-mono"
                placeholder="AWS, Terraform, Docker"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-5 h-5 rounded border-border bg-surface text-primary focus:ring-primary"
                />
                <span className="font-mono text-sm">Featured project</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => isAdding ? handleAdd() : handleUpdate(editingId!)}
              className="btn-primary font-mono"
            >
              <Save className="w-4 h-4" />
              {isAdding ? 'Add' : 'Save'}
            </button>
            <button onClick={cancelEdit} className="btn-secondary font-mono">
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const color = getCategoryColor(project.category)
          return (
            <div key={project.id} className="tech-card overflow-hidden">
              <div className={cn(
                'h-32 relative bg-gradient-to-br',
                colorClasses[color] || 'from-cyan-500/20 to-blue-500/20'
              )}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                {project.featured && (
                  <span className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-mono font-semibold bg-primary text-background">
                    Featured
                  </span>
                )}
                <span className={cn(
                  'absolute top-3 right-3 px-2 py-1 rounded text-xs font-mono',
                  tagColorClasses[color] || 'bg-cyan-500/20 text-cyan-400'
                )}>
                  {getCategoryName(project.category)}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-bold text-lg">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-tertiary hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 rounded text-xs font-mono bg-surface-lighter text-text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(project)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors font-mono text-sm"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex items-center justify-center w-10 rounded-lg border border-border hover:border-accent-error hover:text-accent-error transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {projects.length === 0 && !isAdding && (
        <div className="text-center py-12 text-text-secondary font-mono">
          No projects added. Click &quot;Add Project&quot; to start.
        </div>
      )}
    </div>
  )
}
