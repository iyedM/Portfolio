export type Language = 'en' | 'fr'

export const translations = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      title: 'Cloud & DevOps Engineer',
      subtitle: 'Building scalable infrastructure and automating workflows',
      cta: 'Explore My Work',
    },
    about: {
      title: 'About Me',
      subtitle: 'Passionate about Cloud, DevOps & AI',
    },
    skills: {
      title: 'Tech Stack',
      subtitle: 'Technologies I work with',
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'A selection of my work',
    },
    experience: {
      title: 'Experience',
      subtitle: 'My professional journey',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let\'s work together',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
    },
    terminal: {
      welcome: 'Welcome to Iyed\'s Portfolio Terminal',
      help: 'Type "help" to see available commands',
    },
    status: {
      openToWork: 'Open to Work',
      responseTime: 'Response Time',
      coffeeLevel: 'Coffee Level',
      sleep: 'Sleep',
      available: 'Available',
      sleeping: 'Sleeping',
      awake: 'Awake',
    },
    visitCounter: {
      youAre: 'You are visitor',
    },
    sessionTimer: {
      exploring: 'Exploring for',
    },
    activityFeed: {
      title: 'Activity Feed',
      noActivity: 'No activity yet...',
    },
    performance: {
      title: 'Performance',
      fps: 'FPS',
      load: 'Load',
      bundle: 'Bundle',
    },
    typingChallenge: {
      title: 'Typing Challenge',
      description: 'Type DevOps commands as fast as you can!',
      start: 'Start Challenge',
      tryAgain: 'Try Again',
      typeThis: 'Type this command:',
      startTyping: 'Start typing...',
      reset: 'Reset',
      wpm: 'WPM',
      accuracy: 'Accuracy',
    },
  },
  fr: {
    nav: {
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      experience: 'Expérience',
      contact: 'Contact',
    },
    hero: {
      title: 'Ingénieur Cloud & DevOps',
      subtitle: 'Construction d\'infrastructures scalables et automatisation des workflows',
      cta: 'Découvrir mon travail',
    },
    about: {
      title: 'À propos de moi',
      subtitle: 'Passionné par le Cloud, DevOps & IA',
    },
    skills: {
      title: 'Stack technique',
      subtitle: 'Technologies que j\'utilise',
    },
    projects: {
      title: 'Projets phares',
      subtitle: 'Une sélection de mon travail',
    },
    experience: {
      title: 'Expérience',
      subtitle: 'Mon parcours professionnel',
    },
    contact: {
      title: 'Contactez-moi',
      subtitle: 'Travaillons ensemble',
      name: 'Nom',
      email: 'Email',
      subject: 'Sujet',
      message: 'Message',
      send: 'Envoyer',
    },
    terminal: {
      welcome: 'Bienvenue dans le terminal du portfolio d\'Iyed',
      help: 'Tapez "help" pour voir les commandes disponibles',
    },
    status: {
      openToWork: 'Disponible',
      responseTime: 'Temps de réponse',
      coffeeLevel: 'Niveau de café',
      sleep: 'Sommeil',
      available: 'Disponible',
      sleeping: 'Endormi',
      awake: 'Éveillé',
    },
    visitCounter: {
      youAre: 'Vous êtes le visiteur',
    },
    sessionTimer: {
      exploring: 'Exploration depuis',
    },
    activityFeed: {
      title: 'Flux d\'activité',
      noActivity: 'Aucune activité pour le moment...',
    },
    performance: {
      title: 'Performance',
      fps: 'IPS',
      load: 'Chargement',
      bundle: 'Bundle',
    },
    typingChallenge: {
      title: 'Défi de frappe',
      description: 'Tapez des commandes DevOps le plus vite possible !',
      start: 'Commencer',
      tryAgain: 'Réessayer',
      typeThis: 'Tapez cette commande :',
      startTyping: 'Commencez à taper...',
      reset: 'Réinitialiser',
      wpm: 'Mots/min',
      accuracy: 'Précision',
    },
  },
}

let currentLanguage: Language = 'en'

export function setLanguage(lang: Language) {
  currentLanguage = lang
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
  }
}

export function getLanguage(): Language {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('language') as Language | null
    if (saved && (saved === 'en' || saved === 'fr')) {
      return saved
    }
  }
  return 'en'
}

export function t(key: string): string {
  const keys = key.split('.')
  let value: any = translations[currentLanguage]
  
  for (const k of keys) {
    value = value?.[k]
    if (value === undefined) {
      // Fallback to English
      value = translations.en
      for (const k2 of keys) {
        value = value?.[k2]
      }
      break
    }
  }
  
  return value || key
}

