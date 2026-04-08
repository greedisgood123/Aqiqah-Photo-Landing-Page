# Vercel + Supabase Deployment Guide

## ✅ Completed Setup

### Infrastructure
- [x] Supabase client configuration created (`lib/supabase.ts`)
- [x] Database query functions created (`lib/database.ts`)
- [x] Storage functions created (`lib/storage.ts`)
- [x] Vercel configuration created (`vercel.json`)
- [x] Environment variables template created (`.env.local`)
- [x] Package scripts updated for deployment
- [x] App updated to fetch portfolios from Supabase
- [x] Loading and error states added to portfolio section

### Dependencies Installed
- `@supabase/supabase-js` - Supabase client
- `@supabase/auth-helpers-nextjs` - Auth helpers

## 🚀 Next Steps (Manual)

### Step 1: Set Up Supabase Project
1. Go to https://supabase.com
2. Sign up (free tier recommended)
3. Click "New Project"
4. Choose a name (e.g., "aqiqah-portfolio")
5. Create a database with SQL editor
6. Run this SQL script:

```sql
-- Enable storage and create tables
CREATE SCHEMA IF NOT EXISTS portfolio;

-- Folders table
CREATE TABLE portfolio.folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  date TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Images table
CREATE TABLE portfolio.images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  folder_id UUID REFERENCES portfolio.folders(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_size INTEGER,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(folder_id, order_index)
);

-- Enable Row Level Security (RLS)
ALTER TABLE portfolio.folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio.images ENABLE ROW LEVEL SECURITY;

-- Allow public (anon) read access to folders and images
CREATE POLICY "public_select_folders" ON portfolio.folders
FOR SELECT TO anon USING (true);

CREATE POLICY "public_select_images" ON portfolio.images
FOR SELECT TO anon USING (true);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

-- Storage policies
CREATE POLICY "portfolio_public_select" ON storage.objects
FOR SELECT TO anon USING (bucket_id = 'portfolio');

CREATE POLICY "portfolio_auth_insert" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');

CREATE POLICY "portfolio_auth_update" ON storage.objects
FOR UPDATE TO authenticated USING (bucket_id = 'portfolio') WITH CHECK (bucket_id = 'portfolio');
```

7. Go to Settings → API
8. Create new API keys:
   - Copy **Project URL** (NEXT_PUBLIC_SUPABASE_URL) = https://uovhihxlbcrfrzydcyfr.supabase.co
   - Copy **anon public key** (NEXT_PUBLIC_SUPABASE_ANON_KEY) = sb_publishable_lzG9D6Wu3WUEfrvLzEA4yQ_0oJwAOS9

### Step 2: Configure Environment Variables
1. Open `.env.local` in your project
2. Replace the placeholder values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 3: Upload Images (Manual - Recommended)
1. Go to Supabase Dashboard → Storage
2. Create `portfolio` bucket if not exists
3. Upload your existing portfolio images:
   - **Important:** Use slug-style names for storage folder paths (no spaces, pipes, or special characters) to avoid URL encoding issues. Store the human-readable name in `display_name` in the database.
   - Create folders with slug names:
     - `aqiqah-emma-yasmin-8-feb-2026`
     - `aqiqah-zarif-aidan-14-feb-2026`
     - `aqiqah-firzana-14-feb-2022`
     - `aqiqah-amir-9-feb-2026`
   - Upload images to each folder (page_01.jpg through page_20.jpg)
   - Use consistent naming (page_01.jpg, page_02.jpg, etc.)
4. Insert matching rows into `portfolio.folders` via Supabase Table Editor:
   - `name` = slug (matches storage folder path, e.g. `aqiqah-emma-yasmin-8-feb-2026`)
   - `display_name` = human-readable (e.g. `Aqiqah Emma Yasmin | 8 Feb 2026`)
   - `date` = ISO date string (e.g. `2026-02-08`)
5. Insert rows into `portfolio.images` for each image with the correct `folder_id` and `order_index`

### Step 4: Deploy to Vercel
Option A: **Install Vercel CLI** (Recommended)
```bash
npm install -g vercel
vercel login
vercel
# Follow prompts to deploy
```

Option B: **Connect GitHub**
1. Push code to GitHub repository
2. Import repo in Vercel Dashboard
3. Deploy

Option C: **Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Add your project
3. Configure environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-supabase-anon-key
   ```
4. Deploy

### Step 5: Configure Vercel Environment Variables
After deployment, set environment variables in Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon public key
3. Click "Redeploy" to apply changes

### Step 6: Test Deployment
1. Visit your Vercel URL
2. Verify:
   - [ ] Portfolio images load from Supabase
   - [ ] Gallery navigation works
   - [ ] All images load without errors
   - [ ] Site is accessible globally
   - [ ] Mobile responsive behavior works

## 📝 Current App Behavior

### Portfolio Section
- **Loading State**: Shows spinner while fetching from Supabase
- **Error State**: Shows error message with retry button
- **Success State**: Displays portfolio grid with Supabase images
- **Fallback**: Falls back to local data if Supabase fails

### Existing Functionality (Unchanged)
- All other features remain intact
- Gallery navigation, WhatsApp booking, testimonials
- Package selection and add-ons
- Responsive design and animations

## 🔧 Troubleshooting

### Images Not Loading
1. Check Supabase project URL is correct
2. Verify anon key is valid
3. Check browser console for errors
4. Verify images are uploaded to `portfolio` bucket

### Environment Variables Not Working
1. Make sure you're using correct variable names
2. Redeploy after adding environment variables
3. Check Vercel deployment logs

## 📊 Costs & Limits

### Supabase (Free Tier)
- Storage: 500 MB (plenty for your ~160MB)
- Bandwidth: 1 GB/month
- Database: 500 MB
- Requests: 50,000/month

### Vercel (Hobby Tier)
- Deployments: Unlimited
- Bandwidth: 100 GB/month
- Builds: 6,000 minutes/month

**Total Cost**: Free for current usage

## 🎯 Next Steps After Deployment

### Optional Enhancements
- [ ] Build admin dashboard for image uploads
- [ ] Implement image optimization for web
- [ ] Add image search functionality
- [ ] Create client-side image upload form
- [ ] Add image metadata (date, location, tags)

### Performance Optimization
- [ ] Use Supabase CDN transformations for responsive images
- [ ] Implement lazy loading for portfolio thumbnails
- [ ] Add image compression before upload
- [ ] Monitor and optimize for Core Web Vitals

## 📞 Support Links
- Vercel: https://vercel.com/docs
- Supabase: https://supabase.com/docs
- Next.js: https://nextjs.org/docs
