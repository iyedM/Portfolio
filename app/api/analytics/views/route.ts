import { NextResponse } from 'next/server'
import { incrementViews, getViews } from '@/lib/data'

export async function POST() {
  try {
    const views = await incrementViews()
    return NextResponse.json({ views })
  } catch (error) {
    console.error('Error incrementing views:', error)
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const views = await getViews()
    return NextResponse.json({ views })
  } catch (error) {
    console.error('Error getting views:', error)
    return NextResponse.json({ error: 'Failed to get views' }, { status: 500 })
  }
}

