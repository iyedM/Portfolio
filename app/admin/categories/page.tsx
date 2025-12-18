'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Save, X } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import type { Category } from '@/lib/data'

const colors = ['cyan', 'violet', 'amber', 'emerald', 'rose', 'blue', 'orange', 'teal', 'pink', 'indigo']

const colorClasses: Record<string, string> = {
  cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  violet: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  teal: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    slug: '',
    color: 'cyan'
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/portfolio/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }))
  }

  const handleAdd = async () => {
    try {
      const response = await fetch('/api/portfolio/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        await fetchCategories()
        setIsAdding(false)
        setFormData({ name: '', slug: '', color: 'cyan' })
      }
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch('/api/portfolio/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...formData })
      })
      
      if (response.ok) {
        await fetchCategories()
        setEditingId(null)
        setFormData({ name: '', slug: '', color: 'cyan' })
      }
    } catch (error) {
      console.error('Error updating category:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? Skills and projects using it may be affected.')) return
    
    try {
      const response = await fetch(`/api/portfolio/categories?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchCategories()
      }
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  const startEdit = (category: Category) => {
    setEditingId(category.id)
    setFormData(category)
    setIsAdding(false)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({ name: '', slug: '', color: 'cyan' })
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
          <h1 className="font-display text-3xl font-bold mb-2">Categories</h1>
          <p className="text-text-secondary font-mono text-sm">
            <span className="text-accent-success">$</span> Manage skill & project categories
          </p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null) }}
          className="btn-primary font-mono"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="tech-card p-6 mb-8">
          <h2 className="font-display font-bold text-xl mb-4">
            {isAdding ? 'New Category' : 'Edit Category'}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleNameChange(e.target.value)}
                className="input-field font-mono"
                placeholder="e.g. Cloud Computing"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">slug</label>
              <input
                type="text"
                value={formData.slug || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="input-field font-mono"
                placeholder="e.g. cloud"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">color</label>
              <select
                value={formData.color || 'cyan'}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="input-field font-mono"
              >
                {colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Color preview */}
          <div className="mt-4">
            <span className="text-sm font-mono text-text-secondary mb-2 block">Preview:</span>
            <span className={cn(
              'inline-block px-3 py-1 rounded-full text-sm font-mono border',
              colorClasses[formData.color || 'cyan']
            )}>
              {formData.name || 'Category Name'}
            </span>
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

      {/* Categories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="tech-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className={cn(
                'w-4 h-4 rounded-full',
                `bg-${category.color}-500`
              )} style={{ backgroundColor: `var(--${category.color}-500, ${category.color})` }} />
              <div>
                <h3 className="font-mono font-semibold">{category.name}</h3>
                <p className="text-xs text-text-tertiary font-mono">/{category.slug}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <span className={cn(
                'inline-block px-3 py-1 rounded-full text-xs font-mono border',
                colorClasses[category.color]
              )}>
                {category.name}
              </span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(category)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors font-mono text-sm"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="flex items-center justify-center w-10 rounded-lg border border-border hover:border-accent-error hover:text-accent-error transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && !isAdding && (
        <div className="text-center py-12 text-text-secondary font-mono">
          No categories added. Click &quot;Add Category&quot; to start.
        </div>
      )}
    </div>
  )
}

