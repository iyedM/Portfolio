import { getPortfolioData } from '@/lib/data'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { 
  Hero, 
  About, 
  Skills, 
  Projects, 
  Experience, 
  Contact, 
  TerminalNav,
  DeployPipeline,
  K8sDashboard,
  IaCTimeline,
  StatusPage,
  ChallengesSection,
  AchievementsDisplay,
  ActivityFeed,
  PerformanceMonitor
} from '@/components/sections'
import { ASCIIHeader } from '@/components/sections/ascii-header'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'

export const revalidate = 0

export default async function HomePage() {
  const data = await getPortfolioData()

  return (
    <>
      <ASCIIHeader />
      <Navbar />
      <main>
        <Hero profile={data.profile} />
        <TerminalNav />
        <About profile={data.profile} />
        <DeployPipeline />
        <K8sDashboard skills={data.skills} categories={data.categories} />
        <Projects projects={data.projects} categories={data.categories} />
        <IaCTimeline 
          experiences={data.experiences} 
          certifications={data.certifications} 
        />
        <StatusPage />
        <Contact profile={data.profile} />
        <ChallengesSection />
      </main>
      <Footer 
        socialLinks={data.profile.socialLinks}
        email={data.profile.email}
      />
      <AchievementsDisplay />
      <ActivityFeed />
      <PerformanceMonitor />
      <ThemeToggle />
      <LanguageToggle />
    </>
  )
}
