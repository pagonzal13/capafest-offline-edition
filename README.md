# 🎪 Capafest - Offline Edition 2026

A private festival website with password protection, attendee management, timeline/schedule, and voting system for the Capawards.

## 🌟 Features

- **Password Protection**: Single shared password gate with 7-day cookie session
- **Festival Timeline**: Complete schedule with day-by-day events
- **Attendee Directory**: Flip cards showing room assignments, previous editions, and groups
- **Capawards Voting**: Multi-step wizard for voting with no self-voting enforcement
- **Admin Dashboard**: Control voting window and view real-time results
- **La Mafia Game**: Interactive explanation of the festival game
- **Responsive Design**: Mobile-first with 80s/90s festival aesthetics

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom 80s/90s theme
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd capafest-offline
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   
   Create a new project on [Supabase](https://supabase.com) and run the following SQL:

   ```sql
   -- Attendees table
   CREATE TABLE attendees (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     photo_url TEXT,
     room TEXT NOT NULL,
     previous_editions TEXT[] DEFAULT '{}',
     group_names TEXT[] DEFAULT '{}',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Timeline events
   CREATE TABLE timeline_events (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     day TEXT NOT NULL CHECK (day IN ('viernes', 'sabado', 'domingo')),
     "order" INTEGER NOT NULL,
     icon TEXT NOT NULL,
     title TEXT NOT NULL,
     description TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Capawards categories
   CREATE TABLE capawards_categories (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     "order" INTEGER NOT NULL,
     dj_only BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Votes
   CREATE TABLE votes (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     voter_id UUID REFERENCES attendees(id) NOT NULL,
     category_id UUID REFERENCES capawards_categories(id) NOT NULL,
     nominee_id UUID REFERENCES attendees(id) NOT NULL,
     edition TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(voter_id, category_id, edition)
   );

   -- Settings
   CREATE TABLE settings (
     key TEXT PRIMARY KEY,
     value JSONB NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Insert default voting setting
   INSERT INTO settings (key, value) VALUES ('voting_open', '{"enabled": false}');

   -- Indexes for performance
   CREATE INDEX idx_votes_voter ON votes(voter_id);
   CREATE INDEX idx_votes_edition ON votes(edition);
   CREATE INDEX idx_votes_category ON votes(category_id);
   ```

4. **Configure environment variables**
   
   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   PASSWORD_HASH=capafest_offline26
   ADMIN_SECRET=capafest_admin_secret
   ```

5. **Seed the database**
   
   Use the Supabase dashboard or SQL editor to insert sample data:
   
   ```sql
   -- Example attendee
   INSERT INTO attendees (name, photo_url, room, previous_editions, group_names)
   VALUES 
     ('DJ Polita', '/avatars/polita.jpg', 'Habitación 1', 
      ARRAY['aliens', 'love', 'awaked', 'human', 'hippie', 'metro', 'inferno'],
      ARRAY['DJ', 'Founding']);
   
   -- Add more attendees following the pattern in src/lib/seedData.ts
   
   -- Insert categories
   INSERT INTO capawards_categories (name, "order", dj_only)
   VALUES 
     ('Caposo (mejor vestido)', 1, false),
     ('Capín (más gracioso)', 2, false),
     ('Caporro (más loco)', 3, false),
     ('Capacañón (mejor bailarín)', 4, false),
     ('Bizacap (mejor sesión de música)', 5, true),
     ('Capamante (más cariñoso)', 6, false);
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000/acceso](http://localhost:3000/acceso) in your browser.

## 🔐 Access

- **Password**: `capafest_offline26`
- **Admin secret** (for admin API calls): `capafest_admin_secret`

## 📁 Project Structure

```
src/
├── app/
│   ├── acceso/          # Password gate page
│   ├── cartel/          # Timeline/schedule
│   ├── la-people/       # Attendees directory
│   ├── capawards/       # Voting wizard
│   ├── mafia/           # Game rules
│   ├── admin/           # Admin dashboard
│   └── api/
│       ├── verify-password/   # Password check
│       ├── vote/              # Vote submission
│       └── admin/             # Admin endpoints
├── components/
│   ├── Navigation.tsx         # Sticky nav
│   ├── Footer.tsx
│   └── AttendeeCard.tsx       # Flip card
├── lib/
│   ├── supabase.ts           # DB client
│   ├── utils.ts
│   └── seedData.ts           # Sample data
└── types/
    └── index.ts              # TypeScript types
```

## 🎨 Customization

### Adding Attendees

Update `src/lib/seedData.ts` or insert directly into Supabase.

### Changing Colors

Edit `tailwind.config.js` to modify the color palette.

### Adding Photos

Place avatar images in `public/avatars/` and update photo URLs in the database.

### Room Backgrounds

Add room images to `public/rooms/` and update the `roomBackgrounds` mapping in `seedData.ts`.

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `PASSWORD_HASH`
- `ADMIN_SECRET`

## 🛠️ Admin Tasks

### Open/Close Voting

Access `/admin` and use the toggle button, or call the API:

```bash
curl -X POST https://your-domain.com/api/admin/toggle-voting \
  -H "Content-Type: application/json" \
  -d '{"secret": "capafest_admin_secret", "enabled": true}'
```

### View Results

The admin dashboard shows live results. Export CSV for analysis.

## 🎯 Key Features Explained

### Password Protection

- Implemented via Next.js middleware
- Cookie lasts 7 days
- Password never exposed to client

### Capawards Voting

- Identity selection (honor system, no real auth)
- One vote per attendee per edition (DB constraint)
- No self-voting enforcement
- DJ-only category (Bizacap) filters non-DJ attendees
- Multi-step wizard with review

### Flip Cards

- CSS 3D transform
- Click/tap to flip
- Shows room + badges on back

## 📝 License

Private festival project. All rights reserved.

## 🎉 Credits

Built with love for Capafest 2026 - Offline Edition 💜
