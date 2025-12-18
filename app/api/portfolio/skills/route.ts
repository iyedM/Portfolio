import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getPortfolioData, addSkill, updateSkill, deleteSkill } from '@/lib/data'

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data.skills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des compétences' },
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

    const skill = await request.json()
    const newSkill = await addSkill(skill)
    
    return NextResponse.json(newSkill, { status: 201 })
  } catch (error) {
    console.error('Error adding skill:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout de la compétence' },
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

    const { id, ...skill } = await request.json()
    await updateSkill(id, skill)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating skill:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la compétence' },
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

    await deleteSkill(id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la compétence' },
      { status: 500 }
    )
  }
}

