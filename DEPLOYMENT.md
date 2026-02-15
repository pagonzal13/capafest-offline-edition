# 🚀 Deployment Guide - Capafest Offline Edition

## Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- Supabase project set up

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Capafest Offline Edition"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   In Vercel dashboard, add these:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   PASSWORD_HASH=capafest_offline26
   ADMIN_SECRET=capafest_admin_secret
   ```

4. **Deploy!**
   Click "Deploy" and wait ~2 minutes

5. **Access Your Site**
   - Visit: `https://your-project.vercel.app/acceso`
   - Enter password: `capafest_offline26`

---

## Supabase Setup

### Option 1: Supabase Dashboard (Recommended)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to SQL Editor
4. Copy entire content of `supabase-schema.sql`
5. Run the SQL script
6. Done! ✅

### Option 2: Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref <your-project-ref>

# Run migrations
supabase db push
```

---

## Custom Domain (Optional)

### In Vercel:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `capafest2026.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (~24h max)

### SSL Certificate
- Vercel automatically provisions SSL
- Your site will be https:// by default

---

## Post-Deployment Checklist

- [ ] Test password gate works
- [ ] Check all pages load (Inicio, Cartel, La People, Capawards, Mafia)
- [ ] Verify navigation works across all pages
- [ ] Test voting flow (select identity → vote → submit)
- [ ] Access admin dashboard at `/admin`
- [ ] Test toggle voting button
- [ ] Export CSV to verify data format
- [ ] Test on mobile device
- [ ] Check accessibility (keyboard navigation)
- [ ] Verify animations respect `prefers-reduced-motion`

---

## Updating After Deployment

### Code Changes
```bash
git add .
git commit -m "Update: description of changes"
git push
```
Vercel automatically redeploys on push to main branch.

### Database Changes
1. Make changes in Supabase dashboard, OR
2. Update `supabase-schema.sql` and re-run

### Environment Variables
1. Update in Vercel dashboard
2. Trigger redeploy (or push empty commit)

---

## Monitoring & Analytics

### Vercel Analytics (Recommended)
1. Enable in Vercel dashboard
2. Get visitor stats, performance metrics
3. Free tier: 2,500 events/month

### Custom Analytics
Add to `src/app/layout.tsx`:
```tsx
// Google Analytics example
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `
}} />
```

---

## Troubleshooting

### "Password doesn't work"
- Check `PASSWORD_HASH` env var in Vercel
- Ensure no extra spaces
- Redeploy after changing env vars

### "Database connection failed"
- Verify Supabase URL and anon key
- Check Supabase project is not paused
- Ensure RLS policies are set correctly

### "Voting doesn't work"
- Check voting is enabled in admin dashboard
- Verify `/api/vote` endpoint works
- Check browser console for errors

### "Images not loading"
- Ensure images are in `public/` directory
- Check `next.config.js` has correct image domains
- Verify file paths are correct (case-sensitive!)

---

## Performance Optimization

### Images
- Use WebP format for photos
- Compress images (use [tinypng.com](https://tinypng.com))
- Recommended size: avatars 400x400px, max 100KB

### Fonts
- Already optimized with `font-display: swap`
- Consider self-hosting fonts for faster load

### Caching
- Vercel Edge Network caches static assets
- API routes cached via headers (if needed)

---

## Security Best Practices

1. **Password**
   - Change default password before sharing
   - Use environment variable, never hardcode

2. **Admin Secret**
   - Use strong random string
   - Never commit to Git

3. **Database**
   - Enable RLS (already done in schema)
   - Use Supabase's auth if scaling

4. **API Routes**
   - Validate all inputs
   - Rate limit voting endpoint (future improvement)

---

## Backup Strategy

### Database Backup
1. Go to Supabase → Database → Backups
2. Enable daily backups (included in free tier)
3. Or export manually:
   ```bash
   supabase db dump -f backup.sql
   ```

### Code Backup
- Already backed up in Git
- Enable GitHub branch protection
- Tag releases: `git tag v1.0.0 && git push --tags`

---

## Scaling Considerations

If your festival grows beyond ~100 people:

1. **Voting Rate Limiting**
   - Add rate limiting to `/api/vote`
   - Use Vercel Edge Middleware

2. **Caching**
   - Cache attendee list
   - Cache voting results
   - Use Redis (Upstash)

3. **Authentication**
   - Move to real auth (Supabase Auth)
   - Per-user sessions instead of shared password

4. **Real-time Updates**
   - Use Supabase Realtime
   - Live voting results in admin

---

## Support

For issues:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Check browser console
4. Review this guide

Happy festival! 🎉🎪
