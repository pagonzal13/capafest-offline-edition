import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for database operations
export const db = {
  attendees: {
    getAll: () => supabase.from('attendees').select('*').order('name'),
    getById: (id: string) => supabase.from('attendees').select('*').eq('id', id).single(),
  },
  
  timeline: {
    getAll: () => supabase.from('timeline_events').select('*').order('day').order('order'),
  },
  
  categories: {
    getAll: () => supabase.from('capawards_categories').select('*').order('order'),
  },
  
  votes: {
    getByVoter: (voterId: string, edition: string) => 
      supabase.from('votes').select('*').eq('voter_id', voterId).eq('edition', edition),
    
    submit: (votes: any[]) => supabase.from('votes').insert(votes),
    
    getResults: (edition: string) =>
      supabase
        .from('votes')
        .select(`
          category_id,
          nominee_id,
          capawards_categories (name),
          attendees (name)
        `)
        .eq('edition', edition),
  },
  
  settings: {
    get: (key: string) => supabase.from('settings').select('*').eq('key', key).single(),
    update: (key: string, value: any) =>
      supabase.from('settings').upsert({ key, value, updated_at: new Date().toISOString() }),
  },
}
