'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Save, X } from '@/components/ui/icons'
import { Icon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import type { Skill, Category } from '@/lib/data'

const icons = ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'cicd', 'python', 'code', 'ml', 'ai', 'server', 'database', 'terminal', 'cpu', 'network', 'security', 'cloud']

const colorClasses: Record<string, string> = {
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

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    category: '',
    icon: 'code'
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [skillsRes, categoriesRes] = await Promise.all([
        fetch('/api/portfolio/skills'),
        fetch('/api/portfolio/categories')
      ])
      const skillsData = await skillsRes.json()
      const categoriesData = await categoriesRes.json()
      setSkills(skillsData)
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
      const response = await fetch('/api/portfolio/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        await fetchData()
        setIsAdding(false)
        setFormData({ name: '', category: categories[0]?.slug || '', icon: 'code' })
      }
    } catch (error) {
      console.error('Error adding skill:', error)
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch('/api/portfolio/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...formData })
      })
      
      if (response.ok) {
        await fetchData()
        setEditingId(null)
        setFormData({ name: '', category: categories[0]?.slug || '', icon: 'code' })
      }
    } catch (error) {
      console.error('Error updating skill:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return
    
    try {
      const response = await fetch(`/api/portfolio/skills?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchData()
      }
    } catch (error) {
      console.error('Error deleting skill:', error)
    }
  }

  const startEdit = (skill: Skill) => {
    setEditingId(skill.id)
    setFormData(skill)
    setIsAdding(false)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({ name: '', category: categories[0]?.slug || '', icon: 'code' })
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
          <h1 className="font-display text-3xl font-bold mb-2">Skills</h1>
          <p className="text-text-secondary font-mono text-sm">
            <span className="text-accent-success">$</span> Manage your tech stack
          </p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null) }}
          className="btn-primary font-mono"
        >
          <Plus className="w-5 h-5" />
          Add Skill
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
            {isAdding ? 'New Skill' : 'Edit Skill'}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="input-field font-mono"
                placeholder="e.g. Docker"
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
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">icon</label>
              <select
                value={formData.icon || 'code'}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="input-field font-mono"
              >
                {icons.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
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

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {skills.map((skill) => {
          const color = getCategoryColor(skill.category)
          return (
            <div key={skill.id} className="tech-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  'w-12 h-12 rounded-lg flex items-center justify-center',
                  colorClasses[color] || 'bg-cyan-500/20 text-cyan-400'
                )}>
                  <Icon name={skill.icon} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-mono font-semibold">{skill.name}</h3>
                  <p className="text-xs text-text-tertiary font-mono">{getCategoryName(skill.category)}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(skill)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors font-mono text-sm"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="flex items-center justify-center w-10 rounded-lg border border-border hover:border-accent-error hover:text-accent-error transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {skills.length === 0 && !isAdding && (
        <div className="text-center py-12 text-text-secondary font-mono">
          No skills added. Click &quot;Add Skill&quot; to start.
        </div>
      )}
    </div>
  )
}
