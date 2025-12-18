'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Save, X } from '@/components/ui/icons'
import { Icon } from '@/components/ui/icons'
import type { Certification } from '@/lib/data'

const icons = ['aws', 'azure', 'gcp', 'kubernetes', 'docker', 'terraform', 'code', 'cloud', 'server', 'database', 'security', 'ai', 'ml']

export default function CertificationsAdmin() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<Certification>>({
    name: '',
    issuer: '',
    year: '',
    icon: 'aws'
  })

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    try {
      const response = await fetch('/api/portfolio/certifications')
      const data = await response.json()
      setCertifications(data)
    } catch (error) {
      console.error('Error fetching certifications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = async () => {
    try {
      const response = await fetch('/api/portfolio/certifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        await fetchCertifications()
        setIsAdding(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error adding certification:', error)
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const response = await fetch('/api/portfolio/certifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...formData })
      })
      
      if (response.ok) {
        await fetchCertifications()
        setEditingId(null)
        resetForm()
      }
    } catch (error) {
      console.error('Error updating certification:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return
    
    try {
      const response = await fetch(`/api/portfolio/certifications?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchCertifications()
      }
    } catch (error) {
      console.error('Error deleting certification:', error)
    }
  }

  const startEdit = (cert: Certification) => {
    setEditingId(cert.id)
    setFormData(cert)
    setIsAdding(false)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      issuer: '',
      year: '',
      icon: 'aws'
    })
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
          <h1 className="font-display text-3xl font-bold mb-2">Certifications</h1>
          <p className="text-text-secondary font-mono text-sm">
            <span className="text-accent-success">$</span> Manage your professional certifications
          </p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); resetForm() }}
          className="btn-primary font-mono"
        >
          <Plus className="w-5 h-5" />
          Add Certification
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="tech-card p-6 mb-8">
          <h2 className="font-display font-bold text-xl mb-4">
            {isAdding ? 'New Certification' : 'Edit Certification'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-mono mb-2 text-text-secondary">name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="input-field font-mono"
                placeholder="e.g. AWS Solutions Architect"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">issuer</label>
              <input
                type="text"
                value={formData.issuer || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
                className="input-field font-mono"
                placeholder="e.g. Amazon Web Services"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">year</label>
              <input
                type="text"
                value={formData.year || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                className="input-field font-mono"
                placeholder="e.g. 2024"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">icon</label>
              <select
                value={formData.icon || 'aws'}
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

      {/* Certifications Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="tech-card p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                <Icon name={cert.icon} className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-base mb-1 line-clamp-2">
                  {cert.name}
                </h3>
                <p className="text-sm text-text-secondary font-mono mb-1">{cert.issuer}</p>
                <span className="text-xs font-mono text-secondary">{cert.year}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => startEdit(cert)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors font-mono text-sm"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(cert.id)}
                className="flex items-center justify-center w-10 rounded-lg border border-border hover:border-accent-error hover:text-accent-error transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {certifications.length === 0 && !isAdding && (
        <div className="text-center py-12 text-text-secondary font-mono">
          No certifications added. Click &quot;Add Certification&quot; to start.
        </div>
      )}
    </div>
  )
}
