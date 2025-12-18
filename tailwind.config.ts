import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette Cloud/DevOps/AI - Cyberpunk Tech
        background: '#0a0a0f',
        surface: {
          DEFAULT: '#12121a',
          light: '#1a1a25',
          lighter: '#252535',
        },
        primary: {
          DEFAULT: '#00d4ff', // Cyan électrique
          dark: '#00a8cc',
          light: '#5cefff',
          glow: 'rgba(0, 212, 255, 0.4)',
        },
        secondary: {
          DEFAULT: '#7c3aed', // Violet
          dark: '#5b21b6',
          light: '#a78bfa',
        },
        accent: {
          DEFAULT: '#22d3ee', // Teal
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
        },
        text: {
          DEFAULT: '#f1f5f9',
          secondary: '#94a3b8',
          tertiary: '#64748b',
        },
        border: {
          DEFAULT: '#1e293b',
          light: '#334155',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui'],
        body: ['var(--font-body)', 'system-ui'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'scan-line': 'scan-line 4s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)`,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config

