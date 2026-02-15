export interface Attendee {
  id: string
  name: string
  photo_url: string
  room: string
  previous_editions: string[]
  group_names: string[]
  created_at?: string
}

export interface TimelineEvent {
  id: string
  day: 'viernes' | 'sabado' | 'domingo'
  order: number
  icon: string
  title: string
  description: string
  created_at?: string
}

export interface CapawardsCategory {
  id: string
  name: string
  order: number
  dj_only: boolean
  created_at?: string
}

export interface Vote {
  id: string
  voter_id: string
  category_id: string
  nominee_id: string
  edition: string
  created_at?: string
}

export interface VotingState {
  enabled: boolean
}

export interface VoteSubmission {
  voter_id: string
  votes: {
    category_id: string
    nominee_id: string
  }[]
}

export interface AdminStats {
  category_id: string
  category_name: string
  results: {
    nominee_id: string
    nominee_name: string
    vote_count: number
  }[]
}
