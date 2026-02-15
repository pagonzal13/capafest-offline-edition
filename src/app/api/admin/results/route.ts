import { NextRequest, NextResponse } from 'next/server'
import { EDITION } from '@/lib/utils'

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'capafest_admin_secret'

export async function GET(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret')

    // Verify admin secret
    if (secret !== ADMIN_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // In production with Supabase:
    // const { data: votes } = await db.votes.getResults(EDITION)
    // 
    // Group and count votes by category and nominee
    // const results = categories.map(category => {
    //   const categoryVotes = votes.filter(v => v.category_id === category.id)
    //   const voteCounts = {}
    //   
    //   categoryVotes.forEach(vote => {
    //     voteCounts[vote.nominee_id] = (voteCounts[vote.nominee_id] || 0) + 1
    //   })
    //   
    //   return {
    //     category_id: category.id,
    //     category_name: category.name,
    //     results: Object.entries(voteCounts)
    //       .map(([nominee_id, count]) => ({
    //         nominee_id,
    //         nominee_name: attendees.find(a => a.id === nominee_id)?.name,
    //         vote_count: count,
    //       }))
    //       .sort((a, b) => b.vote_count - a.vote_count)
    //   }
    // })

    // For now, return mock data
    return NextResponse.json({ results: [] })
  } catch (error) {
    console.error('Get results error:', error)
    return NextResponse.json(
      { error: 'Failed to get results' },
      { status: 500 }
    )
  }
}
