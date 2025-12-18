import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getPortfolioData, addCertification, updateCertification, deleteCertification } from '@/lib/data'

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data.certifications)
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des certifications' },
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

    const certification = await request.json()
    const newCertification = await addCertification(certification)
    
    return NextResponse.json(newCertification, { status: 201 })
  } catch (error) {
    console.error('Error adding certification:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout de la certification' },
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

    const { id, ...certification } = await request.json()
    await updateCertification(id, certification)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating certification:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la certification' },
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

    await deleteCertification(id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting certification:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la certification' },
      { status: 500 }
    )
  }
}

