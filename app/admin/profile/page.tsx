'use client'

import { useState, useEffect } from 'react'
import { Save } from '@/components/ui/icons'
import type { Profile } from '@/lib/data'

export default function ProfileAdmin() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/portfolio/profile')
      const data = await response.json()
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile) return
    
    setIsSaving(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/portfolio/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })
      
      if (response.ok) {
        setMessage('Profile saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      setMessage('Error saving profile')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading || !profile) {
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
          <h1 className="font-display text-3xl font-bold mb-2">Profile</h1>
          <p className="text-text-secondary font-mono text-sm">
            <span className="text-accent-success">$</span> vim ~/.profile
          </p>
        </div>
        <button onClick={handleSave} disabled={isSaving} className="btn-primary font-mono">
          <Save className="w-5 h-5" />
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Success message */}
      {message && (
        <div className="mb-6 p-4 rounded-lg bg-accent-success/10 border border-accent-success/30 text-accent-success font-mono text-sm">
          {message}
        </div>
      )}

      {/* Profile Form */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="tech-card p-6">
          <h2 className="font-display font-bold text-xl mb-6">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile(prev => prev ? { ...prev, name: e.target.value } : null)}
                className="input-field font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">title</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile(prev => prev ? { ...prev, title: e.target.value } : null)}
                className="input-field font-mono"
                placeholder="e.g. Cloud & DevOps Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">subtitle</label>
              <input
                type="text"
                value={profile.subtitle}
                onChange={(e) => setProfile(prev => prev ? { ...prev, subtitle: e.target.value } : null)}
                className="input-field font-mono"
                placeholder="e.g. Passionate about AI"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile(prev => prev ? { ...prev, bio: e.target.value } : null)}
                className="input-field resize-none font-mono"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="tech-card p-6">
          <h2 className="font-display font-bold text-xl mb-6">Contact & Social</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => prev ? { ...prev, email: e.target.value } : null)}
                className="input-field font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile(prev => prev ? { ...prev, location: e.target.value } : null)}
                className="input-field font-mono"
                placeholder="e.g. Tunisia"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">github</label>
              <input
                type="url"
                value={profile.socialLinks.github || ''}
                onChange={(e) => setProfile(prev => prev ? { 
                  ...prev, 
                  socialLinks: { ...prev.socialLinks, github: e.target.value }
                } : null)}
                className="input-field font-mono"
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">linkedin</label>
              <input
                type="url"
                value={profile.socialLinks.linkedin || ''}
                onChange={(e) => setProfile(prev => prev ? { 
                  ...prev, 
                  socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                } : null)}
                className="input-field font-mono"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 text-text-secondary">twitter</label>
              <input
                type="url"
                value={profile.socialLinks.twitter || ''}
                onChange={(e) => setProfile(prev => prev ? { 
                  ...prev, 
                  socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                } : null)}
                className="input-field font-mono"
                placeholder="https://twitter.com/username"
              />
            </div>
            <div className="pt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.available}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, available: e.target.checked } : null)}
                  className="w-5 h-5 rounded border-border bg-surface text-primary focus:ring-primary"
                />
                <span className="font-mono text-sm">Available for new opportunities</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
