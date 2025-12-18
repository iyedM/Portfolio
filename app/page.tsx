import { getPortfolioData } from '@/lib/data'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero, About, Skills, Projects, Experience, Contact, TerminalNav } from '@/components/sections'

export const revalidate = 0

export default async function HomePage() {
  const data = await getPortfolioData()

  return (
    <>
      <Navbar />
      <main>
        <Hero profile={data.profile} />
        <TerminalNav />
        <About profile={data.profile} />
        <Skills skills={data.skills} categories={data.categories} />
        <Projects projects={data.projects} categories={data.categories} />
        <Experience 
          experiences={data.experiences} 
          certifications={data.certifications} 
        />
        <Contact profile={data.profile} />
      </main>
      <Footer 
        socialLinks={data.profile.socialLinks}
        email={data.profile.email}
      />
    </>
  )
}
