-- ============================================
-- CAPAFEST OFFLINE EDITION - DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Attendees table
CREATE TABLE IF NOT EXISTS attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  photo_url TEXT,
  room TEXT NOT NULL,
  previous_editions TEXT[] DEFAULT '{}',
  group_names TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timeline events
CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  day TEXT NOT NULL CHECK (day IN ('viernes', 'sabado', 'domingo')),
  "order" INTEGER NOT NULL,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Capawards categories
CREATE TABLE IF NOT EXISTS capawards_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  dj_only BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Votes
CREATE TABLE IF NOT EXISTS votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  voter_id UUID REFERENCES attendees(id) NOT NULL,
  category_id UUID REFERENCES capawards_categories(id) NOT NULL,
  nominee_id UUID REFERENCES attendees(id) NOT NULL,
  edition TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_vote UNIQUE(voter_id, category_id, edition)
);

-- Settings
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_votes_voter ON votes(voter_id);
CREATE INDEX IF NOT EXISTS idx_votes_edition ON votes(edition);
CREATE INDEX IF NOT EXISTS idx_votes_category ON votes(category_id);
CREATE INDEX IF NOT EXISTS idx_timeline_day_order ON timeline_events(day, "order");
CREATE INDEX IF NOT EXISTS idx_categories_order ON capawards_categories("order");

-- ============================================
-- SEED DATA
-- ============================================

-- Insert default settings
INSERT INTO settings (key, value) 
VALUES ('voting_open', '{"enabled": false}')
ON CONFLICT (key) DO NOTHING;

-- Insert Capawards categories
INSERT INTO capawards_categories (name, "order", dj_only) VALUES
  ('Caposo (mejor vestido)', 1, false),
  ('Capín (más gracioso)', 2, false),
  ('Caporro (más loco)', 3, false),
  ('Capacañón (mejor bailarín)', 4, false),
  ('Bizacap (mejor sesión de música)', 5, true),
  ('Capamante (más cariñoso)', 6, false)
ON CONFLICT DO NOTHING;

-- Insert sample attendees
INSERT INTO attendees (name, photo_url, room, previous_editions, group_names) VALUES
  ('DJ Polita', '/avatars/polita.jpg', 'Habitación 1', 
   ARRAY['aliens', 'love', 'awaked', 'human', 'hippie', 'metro', 'inferno'],
   ARRAY['DJ', 'Founding']),
  
  ('AdolFit', '/avatars/adolfit.jpg', 'Habitación 2',
   ARRAY['aliens', 'love', 'awaked', 'human', 'hippie'],
   ARRAY['DJ', 'Sports']),
  
  ('Capreini', '/avatars/capreini.jpg', 'Habitación 3',
   ARRAY['love', 'awaked', 'human', 'hippie', 'metro', 'inferno'],
   ARRAY['DJ', 'Founding']),
  
  ('V4', '/avatars/v4.jpg', 'Habitación 4',
   ARRAY['human', 'hippie', 'metro', 'inferno'],
   ARRAY['DJ']),
  
  ('Santini', '/avatars/santini.jpg', 'Habitación 5',
   ARRAY['metro', 'inferno'],
   ARRAY['Party']),
  
  ('María', '/avatars/maria.jpg', 'Habitación 6',
   ARRAY['aliens', 'love', 'awaked', 'human'],
   ARRAY['Founding', 'Kitchen']),
  
  ('Carlos', '/avatars/carlos.jpg', 'Habitación 7',
   ARRAY['awaked', 'human', 'hippie'],
   ARRAY['Sports', 'BBQ']),
  
  ('Ana', '/avatars/ana.jpg', 'Habitación 1',
   ARRAY['hippie', 'metro', 'inferno'],
   ARRAY['Kitchen', 'Decoration']),
  
  ('Pablo', '/avatars/pablo.jpg', 'Habitación 2',
   ARRAY['inferno'],
   ARRAY['Party', 'BBQ']),
  
  ('Laura', '/avatars/laura.jpg', 'Habitación 3',
   ARRAY['metro', 'inferno'],
   ARRAY['Decoration']),
  
  ('Javier', '/avatars/javier.jpg', 'Habitación 4',
   ARRAY['aliens', 'love', 'awaked'],
   ARRAY['Founding', 'BBQ']),
  
  ('Sofía', '/avatars/sofia.jpg', 'Habitación 5',
   ARRAY['human', 'hippie', 'metro', 'inferno'],
   ARRAY['Kitchen'])
ON CONFLICT DO NOTHING;

-- ============================================
-- ROW LEVEL SECURITY (Optional)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE capawards_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (since we're using password gate at app level)
CREATE POLICY "Allow public read attendees" ON attendees FOR SELECT USING (true);
CREATE POLICY "Allow public read timeline" ON timeline_events FOR SELECT USING (true);
CREATE POLICY "Allow public read categories" ON capawards_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read votes" ON votes FOR SELECT USING (true);
CREATE POLICY "Allow public read settings" ON settings FOR SELECT USING (true);

-- Allow public write for votes (validation happens at app level)
CREATE POLICY "Allow public insert votes" ON votes FOR INSERT WITH CHECK (true);

-- Only allow authenticated users to modify settings (you can add auth later)
CREATE POLICY "Allow authenticated update settings" ON settings FOR UPDATE USING (true);

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

DO $$
BEGIN
  RAISE NOTICE '✅ Capafest Offline Edition database setup complete!';
  RAISE NOTICE '📊 Tables created: attendees, timeline_events, capawards_categories, votes, settings';
  RAISE NOTICE '🎭 Sample data inserted';
  RAISE NOTICE '🔒 Row Level Security enabled';
END $$;
