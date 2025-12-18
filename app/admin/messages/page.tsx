'use client'

import { useState, useEffect } from 'react'
import { Mail, Trash2, Eye, EyeOff } from '@/components/ui/icons'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact')
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      await fetchMessages()
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    
    try {
      await fetch(`/api/contact?id=${id}`, { method: 'DELETE' })
      setSelectedMessage(null)
      await fetchMessages()
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const viewMessage = (msg: Message) => {
    setSelectedMessage(msg)
    if (!msg.read) {
      markAsRead(msg.id)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">Messages</h1>
        <p className="text-text-secondary font-mono text-sm">
          <span className="text-accent-success">$</span> cat /var/mail/inbox
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="tech-card p-12 text-center">
          <Mail className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
          <p className="text-text-secondary font-mono">No messages yet</p>
          <p className="text-text-tertiary text-sm mt-2">Messages from your contact form will appear here</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-2">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => viewMessage(msg)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  selectedMessage?.id === msg.id 
                    ? 'bg-primary/10 border border-primary' 
                    : msg.read 
                      ? 'bg-surface hover:bg-surface-light border border-transparent' 
                      : 'bg-primary/5 border border-primary/30 hover:bg-primary/10'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-sm truncate">{msg.name}</span>
                  {!msg.read && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-xs text-text-tertiary font-mono truncate mb-1">{msg.email}</p>
                <p className="text-xs text-text-secondary truncate">{msg.subject || msg.message}</p>
                <p className="text-xs text-text-tertiary mt-2 font-mono">{formatDate(msg.date)}</p>
              </button>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="tech-card p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-display font-bold text-xl mb-1">{selectedMessage.name}</h2>
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="text-primary font-mono text-sm hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="p-2 rounded-lg border border-border hover:border-accent-error hover:text-accent-error transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {selectedMessage.subject && (
                  <div className="mb-4">
                    <span className="text-xs text-text-tertiary font-mono">Subject:</span>
                    <p className="font-medium">{selectedMessage.subject}</p>
                  </div>
                )}

                <div className="mb-4">
                  <span className="text-xs text-text-tertiary font-mono">Date:</span>
                  <p className="text-sm">{formatDate(selectedMessage.date)}</p>
                </div>

                <div className="border-t border-border pt-4 mt-4">
                  <span className="text-xs text-text-tertiary font-mono block mb-2">Message:</span>
                  <p className="text-text-secondary whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your message'}`}
                    className="btn-primary font-mono"
                  >
                    <Mail className="w-4 h-4" />
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="tech-card p-12 text-center">
                <Mail className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
                <p className="text-text-secondary font-mono">Select a message to view</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

