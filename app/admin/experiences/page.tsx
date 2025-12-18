'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Save, X } from '@/components/ui/icons'
import type { Experience } from '@/lib/data'

export default function ExperiencesAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [techInput, setTechInput] = useState('')
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: '',
    role: '',
    period: '',
    description: '',
    technologies: []
  })

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/portfolio/experiences')
      const data = await response.json()
      setExperiences(data)
    } catch (error) {
      console.error('Error fetching experiences:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = async () => {
    try {
      const response = await fetch('/api/portfolio/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          technologies: techInput.split(',').map(t => t.trim()).filter(Boolean) 
        })
      })
      
      if (response.ok) {
        await fetchExperiences()
        setIsAdding(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error adding experience:', error)
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch('/api/portfolio/experiences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id, 
          ...formData, 
          technologies: techInput.split(',').map(t => t.trim()).filter(Boolean) 
        })
      })
      
      if (response.ok) {
        await fetchExperiences()
        setEditingId(null)
        resetForm()
      }
    } catch (error) {
      console.error('Error updating experience:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return
    
    try {
      const response = await fetch(`/api/portfolio/experiences?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchExperiences()
      }
    } catch (error) {
      console.error('Error deleting experience:', error)
    }
  }

  const startEdit = (exp: Experience) => {
    setEditingId(exp.id)
    setFormData(exp)
    setTechInput(exp.technologies.join(', '))
    setIsAdding(false)
  }

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      period: '',
      description: '',
      technologies: []
    })
    setTechInput('')
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
          <h1 className="font-display text-3xl font-bold mb-2">Experience</h1>
          <p className="text-text-secondary font-mono text-sm">
            <span className="text-accent-success">$</span> Manage your work history
          </p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); resetForm() }}
          className="btn-primary font-mono"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="tech-card p-6 mb-8">
          <h2 className="font-display font-bold text-xl mb-4">
            {isAdding ? 'New Experience' : 'Edit Experience'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">company</label>
              <input
                type="text"
                value={formData.company || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="input-field font-mono"
                placeholder="e.g. Google"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">role</label>
              <input
                type="text"
                value={formData.role || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="input-field font-mono"
                placeholder="e.g. Senior Cloud Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">period</label>
              <input
                type="text"
                value={formData.period || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                className="input-field font-mono"
                placeholder="e.g. Jan 2022 - Present"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">technologies (comma separated)</label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="input-field font-mono"
                placeholder="AWS, Kubernetes, Terraform"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-mono mb-2 text-text-secondary">description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="input-field resize-none font-mono"
                rows={3}
                placeholder="Describe your responsibilities and achievements..."
              />
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

      {/* Experiences List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="tech-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display font-bold text-lg">{exp.role}</h3>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                    {exp.period}
                  </span>
                </div>
                <p className="text-text-secondary font-mono text-sm mb-2">{exp.company}</p>
                <p className="text-sm text-text-tertiary mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 rounded text-xs font-mono bg-surface-lighter text-text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(exp)}
                  className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="p-2 rounded-lg border border-border hover:border-accent-error hover:text-accent-error transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {experiences.length === 0 && !isAdding && (
        <div className="text-center py-12 text-text-secondary font-mono">
          No experience added. Click &quot;Add Experience&quot; to start.
        </div>
      )}
    </div>
  )
}
