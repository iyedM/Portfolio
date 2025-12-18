import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { updateProfile, getPortfolioData } from '@/lib/data'

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const profile = await request.json()
    await updateProfile(profile)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du profil' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data.profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du profil' },
      { status: 500 }
    )
  }
}

