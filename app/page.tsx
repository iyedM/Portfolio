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
        <section id="home">
          <Hero profile={data.profile} />
        </section>
        <TerminalNav />
        <section id="about">
          <About profile={data.profile} />
        </section>
        <DeployPipeline />
        <section id="skills">
          <K8sDashboard skills={data.skills} categories={data.categories} />
        </section>
        <section id="projects">
          <Projects projects={data.projects} categories={data.categories} />
        </section>
        <section id="experience">
          <IaCTimeline 
            experiences={data.experiences} 
            certifications={data.certifications} 
          />
        </section>
        <StatusPage />
        <section id="contact">
          <Contact profile={data.profile} />
        </section>
        <ChallengesSection />
      </main>
      <Footer 
        socialLinks={data.profile.socialLinks}
        email={data.profile.email}
      />
      {/*<AchievementsDisplay />*/}
      {/*<ActivityFeed />*/}
      <PerformanceMonitor />
      <ThemeToggle />
      <LanguageToggle />
    </>
  )
}