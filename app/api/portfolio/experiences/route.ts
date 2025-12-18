import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getPortfolioData, addExperience, updateExperience, deleteExperience } from '@/lib/data'

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data.experiences)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des expériences' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const experience = await request.json()
    const newExperience = await addExperience(experience)
    
    return NextResponse.json(newExperience, { status: 201 })
  } catch (error) {
    console.error('Error adding experience:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout de l\'expérience' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { id, ...experience } = await request.json()
    await updateExperience(id, experience)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de l\'expérience' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      )
    }

    await deleteExperience(id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'expérience' },
      { status: 500 }
    )
  }
}

