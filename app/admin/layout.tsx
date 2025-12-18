import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { AdminSidebar } from '@/components/admin/sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  
  // Check if on login page
  const isLoginPage = false // We'll handle this differently
  
  if (!session && !isLoginPage) {
    // Let middleware handle redirection
  }

  return (
    <div className="min-h-screen bg-background">
      {session ? (
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 ml-64 p-8">
            {children}
          </main>
        </div>
      ) : (
        children
      )}
    </div>
  )
}

