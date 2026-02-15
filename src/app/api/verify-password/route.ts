import { NextRequest, NextResponse } from 'next/server'

const PASSWORD = process.env.PASSWORD_HASH || 'capafest_offline26'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password === PASSWORD) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
