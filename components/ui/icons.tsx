'use client'

import { 
  Cloud, 
  Server, 
  Code, 
  Brain, 
  Github, 
  Linkedin, 
  Twitter,
  Mail,
  MapPin,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Terminal,
  Database,
  Container,
  GitBranch,
  Cpu,
  Network,
  Shield,
  Workflow,
  Layers,
  Rocket,
  Award,
  Briefcase,
  GraduationCap,
  Plus,
  Pencil,
  Trash2,
  Save,
  LogOut,
  Settings,
  Home,
  FolderKanban,
  Sparkles,
  MessageSquare,
  Eye,
  EyeOff,
  type LucideIcon
} from 'lucide-react'

// Map icon names to components
export const iconMap: Record<string, LucideIcon> = {
  // Cloud providers
  aws: Cloud,
  azure: Cloud,
  gcp: Cloud,
  cloud: Cloud,
  
  // DevOps tools
  docker: Container,
  kubernetes: Layers,
  terraform: Workflow,
  cicd: GitBranch,
  
  // Programming
  python: Code,
  code: Code,
  
  // AI/ML
  ml: Brain,
  ai: Sparkles,
  
  // Infrastructure
  server: Server,
  database: Database,
  network: Network,
  security: Shield,
  cpu: Cpu,
  terminal: Terminal,
  
  // Social
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  
  // General
  mail: Mail,
  location: MapPin,
  external: ExternalLink,
  menu: Menu,
  close: X,
  chevronRight: ChevronRight,
  rocket: Rocket,
  award: Award,
  briefcase: Briefcase,
  education: GraduationCap,
  
  // Admin
  plus: Plus,
  edit: Pencil,
  delete: Trash2,
  save: Save,
  logout: LogOut,
  settings: Settings,
  home: Home,
  projects: FolderKanban,
  messages: MessageSquare,
  eye: Eye,
}

interface IconProps {
  name: string
  className?: string
  size?: number
}

export function Icon({ name, className = '', size = 24 }: IconProps) {
  const IconComponent = iconMap[name.toLowerCase()] || Code
  return <IconComponent className={className} size={size} />
}

// Export individual icons for direct use
export {
  Cloud,
  Server,
  Code,
  Brain,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Terminal,
  Database,
  Container,
  GitBranch,
  Cpu,
  Network,
  Shield,
  Workflow,
  Layers,
  Rocket,
  Award,
  Briefcase,
  GraduationCap,
  Plus,
  Pencil,
  Trash2,
  Save,
  LogOut,
  Settings,
  Home,
  FolderKanban,
  Sparkles,
  MessageSquare,
  Eye,
  EyeOff,
}
