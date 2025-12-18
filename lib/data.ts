import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'portfolio.json')

export interface Profile {
  name: string
  title: string
  subtitle: string
  bio: string
  email: string
  location: string
  available: boolean
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  color: string
}

export interface Skill {
  id: string
  name: string
  category: string
  icon: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  category: string
  link: string
  featured: boolean
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  icon: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

export interface Analytics {
  views: number
  lastUpdated: string
}

export interface PortfolioData {
  profile: Profile
  categories: Category[]
  skills: Skill[]
  projects: Project[]
  experiences: Experience[]
  certifications: Certification[]
  analytics: Analytics
  messages: ContactMessage[]
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading portfolio data:', error)
    return {
      profile: {
        name: '',
        title: '',
        subtitle: '',
        bio: '',
        email: '',
        location: '',
        available: false,
        socialLinks: {}
      },
      categories: [],
      skills: [],
      projects: [],
      experiences: [],
      certifications: [],
      analytics: { views: 0, lastUpdated: '' },
      messages: []
    }
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}

export async function updateProfile(profile: Profile): Promise<void> {
  const data = await getPortfolioData()
  data.profile = profile
  await savePortfolioData(data)
}

// Analytics
export async function incrementViews(): Promise<number> {
  const data = await getPortfolioData()
  data.analytics.views += 1
  data.analytics.lastUpdated = new Date().toISOString()
  await savePortfolioData(data)
  return data.analytics.views
}

export async function getViews(): Promise<number> {
  const data = await getPortfolioData()
  return data.analytics.views
}

// Messages
export async function addMessage(message: Omit<ContactMessage, 'id' | 'date' | 'read'>): Promise<ContactMessage> {
  const data = await getPortfolioData()
  const newMessage: ContactMessage = {
    ...message,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    read: false
  }
  data.messages.unshift(newMessage)
  await savePortfolioData(data)
  return newMessage
}

export async function getMessages(): Promise<ContactMessage[]> {
  const data = await getPortfolioData()
  return data.messages
}

export async function markMessageAsRead(id: string): Promise<void> {
  const data = await getPortfolioData()
  const message = data.messages.find(m => m.id === id)
  if (message) {
    message.read = true
    await savePortfolioData(data)
  }
}

export async function deleteMessage(id: string): Promise<void> {
  const data = await getPortfolioData()
  data.messages = data.messages.filter(m => m.id !== id)
  await savePortfolioData(data)
}

// Categories CRUD
export async function getCategories(): Promise<Category[]> {
  const data = await getPortfolioData()
  return data.categories
}

export async function addCategory(category: Omit<Category, 'id'>): Promise<Category> {
  const data = await getPortfolioData()
  const newCategory = { ...category, id: Date.now().toString() }
  data.categories.push(newCategory)
  await savePortfolioData(data)
  return newCategory
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<void> {
  const data = await getPortfolioData()
  const index = data.categories.findIndex(c => c.id === id)
  if (index !== -1) {
    data.categories[index] = { ...data.categories[index], ...category }
    await savePortfolioData(data)
  }
}

export async function deleteCategory(id: string): Promise<void> {
  const data = await getPortfolioData()
  data.categories = data.categories.filter(c => c.id !== id)
  await savePortfolioData(data)
}

// Skills CRUD
export async function addSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
  const data = await getPortfolioData()
  const newSkill = { ...skill, id: Date.now().toString() }
  data.skills.push(newSkill)
  await savePortfolioData(data)
  return newSkill
}

export async function updateSkill(id: string, skill: Partial<Skill>): Promise<void> {
  const data = await getPortfolioData()
  const index = data.skills.findIndex(s => s.id === id)
  if (index !== -1) {
    data.skills[index] = { ...data.skills[index], ...skill }
    await savePortfolioData(data)
  }
}

export async function deleteSkill(id: string): Promise<void> {
  const data = await getPortfolioData()
  data.skills = data.skills.filter(s => s.id !== id)
  await savePortfolioData(data)
}

// Projects CRUD
export async function addProject(project: Omit<Project, 'id'>): Promise<Project> {
  const data = await getPortfolioData()
  const newProject = { ...project, id: Date.now().toString() }
  data.projects.push(newProject)
  await savePortfolioData(data)
  return newProject
}

export async function updateProject(id: string, project: Partial<Project>): Promise<void> {
  const data = await getPortfolioData()
  const index = data.projects.findIndex(p => p.id === id)
  if (index !== -1) {
    data.projects[index] = { ...data.projects[index], ...project }
    await savePortfolioData(data)
  }
}

export async function deleteProject(id: string): Promise<void> {
  const data = await getPortfolioData()
  data.projects = data.projects.filter(p => p.id !== id)
  await savePortfolioData(data)
}

// Experiences CRUD
export async function addExperience(exp: Omit<Experience, 'id'>): Promise<Experience> {
  const data = await getPortfolioData()
  const newExp = { ...exp, id: Date.now().toString() }
  data.experiences.push(newExp)
  await savePortfolioData(data)
  return newExp
}

export async function updateExperience(id: string, exp: Partial<Experience>): Promise<void> {
  const data = await getPortfolioData()
  const index = data.experiences.findIndex(e => e.id === id)
  if (index !== -1) {
    data.experiences[index] = { ...data.experiences[index], ...exp }
    await savePortfolioData(data)
  }
}

export async function deleteExperience(id: string): Promise<void> {
  const data = await getPortfolioData()
  data.experiences = data.experiences.filter(e => e.id !== id)
  await savePortfolioData(data)
}

// Certifications CRUD
export async function addCertification(cert: Omit<Certification, 'id'>): Promise<Certification> {
  const data = await getPortfolioData()
  const newCert = { ...cert, id: Date.now().toString() }
  data.certifications.push(newCert)
  await savePortfolioData(data)
  return newCert
}

export async function updateCertification(id: string, cert: Partial<Certification>): Promise<void> {
  const data = await getPortfolioData()
  const index = data.certifications.findIndex(c => c.id === id)
  if (index !== -1) {
    data.certifications[index] = { ...data.certifications[index], ...cert }
    await savePortfolioData(data)
  }
}

export async function deleteCertification(id: string): Promise<void> {
  const data = await getPortfolioData()
  data.certifications = data.certifications.filter(c => c.id !== id)
  await savePortfolioData(data)
}
