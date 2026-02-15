import { NextRequest, NextResponse } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'capafest_admin_secret'

export async function POST(request: NextRequest) {
  try {
    const { secret, enabled } = await request.json()

    // Verify admin secret
    if (secret !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // In production with Supabase:
    // await db.settings.update('voting_open', { enabled })

    return NextResponse.json({ success: true, enabled })
  } catch (error) {
    console.error('Toggle voting error:', error)
    return NextResponse.json(
      { error: 'Failed to toggle voting' },
      { status: 500 }
    )
  }
}
