'use client'

// Achievement unlocker - to be called from components
let achievementUnlocker: ((id: string) => void) | null = null

export function setAchievementUnlocker(unlocker: (id: string) => void) {
  achievementUnlocker = unlocker
}

export function unlockAchievement(id: string) {
  if (achievementUnlocker) {
    achievementUnlocker(id)
  }
}

// Track section visits
export function trackSectionVisit(sectionId: string) {
  if (typeof window === 'undefined') return
  
  const visited = JSON.parse(localStorage.getItem('visitedSections') || '[]')
  if (!visited.includes(sectionId)) {
    visited.push(sectionId)
    localStorage.setItem('visitedSections', JSON.stringify(visited))
    
    // Check if all sections visited
    const allSections = ['about', 'skills', 'projects', 'experience', 'contact']
    if (visited.length >= allSections.length) {
      unlockAchievement('explorer')
    }
  }
}

// Track terminal commands
let commandCount = 0
export function trackTerminalCommand() {
  if (typeof window === 'undefined') return
  
  commandCount++
  if (commandCount >= 5) {
    unlockAchievement('terminal-master')
  }
}

// Track K8s pod clicks
let podClicks = 0
export function trackPodClick() {
  if (typeof window === 'undefined') return
  
  podClicks++
  if (podClicks >= 3) {
    unlockAchievement('curious-mind')
  }
}

// Track pipeline deploy
export function trackPipelineDeploy() {
  if (typeof window === 'undefined') return
  unlockAchievement('first-deploy')
}

// Check night visit
export function checkNightVisit() {
  if (typeof window === 'undefined') return
  
  const hour = new Date().getHours()
  if (hour >= 22 || hour < 6) {
    unlockAchievement('night-owl')
  }
}
