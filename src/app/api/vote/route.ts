import { NextRequest, NextResponse } from 'next/server'
import { EDITION } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { voter_id, votes } = await request.json()

    // Validate input
    if (!voter_id || !votes || !Array.isArray(votes)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    // In production with Supabase:
    // 1. Check if voter already voted in this edition
    // const { data: existingVotes } = await db.votes.getByVoter(voter_id, EDITION)
    // if (existingVotes && existingVotes.length > 0) {
    //   return NextResponse.json(
    //     { error: 'You have already voted in this edition' },
    //     { status: 400 }
    //   )
    // }

    // 2. Validate votes (no self-voting, valid categories, valid nominees)
    // ... validation logic ...

    // 3. Insert votes
    const votesToInsert = votes.map((vote: any) => ({
      voter_id,
      category_id: vote.category_id,
      nominee_id: vote.nominee_id,
      edition: EDITION,
    }))

    // await db.votes.submit(votesToInsert)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Vote submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit votes' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Get voting status
  try {
    // In production:
    // const { data } = await db.settings.get('voting_open')
    // return NextResponse.json({ enabled: data?.value?.enabled || false })
    
    return NextResponse.json({ enabled: true })
  } catch (error) {
    return NextResponse.json({ enabled: false }, { status: 500 })
  }
}
