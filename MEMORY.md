# Aqiqah Photo Landing Page - Project Memory

## Project Overview
A professional photography landing page for "Fadhlan Khalid Photography" specializing in Aqiqah (Islamic ritual) photography services in Kuala Lumpur, Malaysia. The site serves as a marketing and booking platform targeting Muslim families seeking professional photography for their child's Aqiqah celebration.

**Business Goal:** Convert visitors into photography customers through clear service offerings, beautiful portfolio display, and easy booking options.

## Tech Stack
- **Next.js 14.1.0** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 3.4.1** - Utility-first styling
- **Lucide React** - Icon library
- **Google Fonts** - Cormorant Garamond (display) + Outfit (body)

## Project Structure
```
/
├── app/
│   ├── layout.tsx          # Root layout with metadata and fonts
│   ├── page.tsx            # Main landing page (856 lines, contains all sections)
│   └── globals.css         # Global styles, animations, Tailwind directives
├── components/
│   ├── Navigation.tsx      # Responsive nav with mobile hamburger menu
│   ├── Footer.tsx          # Footer with contact info and social links
│   └── icons.tsx           # Custom SVG icon components
├── public/
│   ├── hero/               # Hero section images
│   ├── portfolio/          # Portfolio gallery images organized by folders
│   └── Reference/          # Reference materials (external links)
├── package.json            # Dependencies and scripts
├── next.config.js          # Next.js config (image optimization, remote patterns)
├── tailwind.config.ts      # Tailwind config (custom colors, fonts)
└── tsconfig.json           # TypeScript config with path aliases
```

## Key Features
1. **Hero Section** - Eye-catching landing with professional photography
2. **Portfolio Gallery** - Interactive image gallery with modal viewer and keyboard navigation
3. **Pricing Packages** - Three tiers: Basic (RM450), Standard (RM700), Premium (RM1550)
4. **Add-ons System** - Customizable services with dynamic pricing
5. **Service Area** - Coverage info for KL and surrounding areas
6. **Testimonials** - Customer reviews with star ratings
7. **WhatsApp Booking** - Direct WhatsApp with pre-filled package details
8. **Setmore Integration** - Online scheduling system
9. **Responsive Design** - Mobile-first with smooth animations
10. **Smooth Scroll** - Section-to-section navigation

## Important Files

### `/app/page.tsx` (Main Component - 856 lines)
Contains all landing page sections in one file:
- Hero section
- About/Services
- Portfolio gallery with lightbox
- Pricing packages (3 tiers)
- Add-ons selection
- Service area
- Testimonials
- Contact/CTA

**Key Patterns:**
- Uses `IntersectionObserver` for scroll-reveal animations
- Custom image lightbox with keyboard navigation (Arrow keys, Escape)
- WhatsApp message construction with selected package/add-on details
- Responsive navigation with mobile menu toggle

### `/app/layout.tsx`
Root layout with:
- HTML metadata (title, description, OG tags)
- Google Fonts import (Cormorant Garamond, Outfit)
- Root structure with Navigation and Footer components

### `/app/globals.css`
Global styles including:
- Tailwind CSS directives
- Custom CSS keyframe animations (fade-in, slide-up)
- Smooth scroll behavior
- Custom scrollbar styling

### `/components/Navigation.tsx`
- Desktop and mobile navigation
- Hamburger menu toggle
- Smooth scroll to sections
- Logo and social links

### `/components/Footer.tsx`
- Contact information
- Social media links
- Copyright and branding

### `/next.config.js`
Configures:
- Image domains for Google Photos
- Image optimization (formats: webp, avif)
- Remote patterns for external images

### `/tailwind.config.ts`
Custom theme extension:
- Colors: Primary gold (#c9a962), dark background (#1a1a1a), etc.
- Font families: Cormorant Garamond (display), Outfit (body)
- Custom animation keyframes

## Design System

### Color Palette
- **Primary/Gold:** `#c9a962` - Accent color for CTAs, highlights
- **Dark Background:** `#1a1a1a` - Main background
- **Lighter Dark:** `#2a2a2a` - Cards, sections
- **White:** `#ffffff` - Text
- **Gray:** `#a0a0a0` - Secondary text

### Typography
- **Display Headings:** Cormorant Garamond (elegant serif)
- **Body Text:** Outfit (modern sans-serif)

### Animation Patterns
- Fade-in on scroll (IntersectionObserver)
- Hover effects on buttons and cards
- Smooth transitions (300ms ease-in-out)
- Modal lightbox with keyboard controls

## Development Notes

### Build & Run
```bash
npm install
npm run dev        # Development server (localhost:3000)
npm run build      # Production build
npm run start      # Production server
```

### Key Integration Points
- **WhatsApp:** `https://wa.me/60123456789?text=` with pre-filled messages
- **Setmore:** Embedded booking widget
- **Google Photos:** Images loaded via remote patterns in next.config.js

### Component Patterns
- Single-page application with section-based navigation
- No external state management (useState sufficient)
- Image optimization via Next.js Image component
- Custom icon components in `/components/icons.tsx`

### Styling Conventions
- Tailwind utility classes for most styling
- Custom CSS in globals.css for animations
- Mobile-first responsive design (mobile → tablet → desktop)
- Consistent spacing using Tailwind spacing scale

### Important Considerations
- All portfolio images are stored in `/public/portfolio/`
- Images are optimized for web via Next.js Image component
- Keyboard navigation: Arrow keys (next/prev), Escape (close modal)
- WhatsApp phone number: 60123456789 (update as needed)
- Setmore booking widget embedded in contact section

## Business Context
**Target Audience:** Muslim families in Kuala Lumpur, Malaysia seeking professional Aqiqah photography.

**Service Model:** Photography packages ranging from RM450 to RM1550 with customizable add-ons.

**Conversion Flow:** Portfolio → Packages → Add-ons → WhatsApp booking.

## Version History

### v1.1.0 (2026-04-07) - Code Quality Improvements
**Major Refactoring & Bug Fixes:**

**High Priority Fixes:**
- Fixed `toggleAddon` stale state bug - toast messages now correctly show "added" vs "removed"
- Replaced direct DOM manipulation (`document.body.style.overflow`) with CSS class-based approach (`body.overflow-hidden`)
- Extracted all hardcoded colors to Tailwind theme colors for consistency

**Code Quality Improvements:**
- Migrated all hardcoded color values to Tailwind theme system:
  - `#c9a962` → `theme('colors.accent')`
  - `#0f0d0a` → `theme('colors.bg')`
  - `#f5f0e8` → `theme('colors.fg')`
  - `#8a8279` → `theme('colors.muted')`
  - `#2a2620` → `theme('colors.border')`
  - `#1a1814` → `theme('colors.card')`
- Fixed gallery navigation arrow colors to use theme colors instead of hardcoded values
- Ensured proper hover state behavior for navigation buttons
- Applied color theme updates to both `app/page.tsx`, `components/Navigation.tsx`, and `app/globals.css`

**Styling Consistency:**
- All components now use centralized color theme from `tailwind.config.ts`
- WhatsApp green (`#25D366`) retained as brand-specific color
- Improved maintainability through theme-based color system

**Build Status:** ✅ Production build successful - no errors or warnings

**Next.js Build Output:**
- Route (app): 13.4 kB / First Load JS: 97.5 kB
- All static pages generated successfully

### v1.0.0 (Initial Release)
- Initial launch with core features
- Portfolio gallery with lightbox
- Three-tier pricing system
- WhatsApp booking integration
- Responsive design with animations

## Cloud Deployment & Database

### Infrastructure Stack
- **Hosting**: Vercel (free tier for Next.js)
- **Database & Storage**: Supabase (free tier, 500 MB storage)
- **CDN**: Supabase global network for image delivery

### Supabase Integration
- **Client**: `@supabase/supabase-js` v2.102.1
- **Database Schema**: `portfolio.folders`, `portfolio.images` tables
- **Storage Bucket**: `portfolio` (public read access enabled)
- **RLS Policies**: Row Level Security enabled for public read access
- **Client Configuration**: `lib/supabase.ts`
- **Database Functions**: `lib/database.ts` with `fetchPortfolioFolders()`, `fetchPortfolioFolder()`
- **Storage Functions**: `lib/storage.ts` with upload/delete functions

### Environment Variables
Required for production:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Set via:
- Vercel Dashboard → Environment Variables
- Local development: `.env.local` file

### Database Schema
```sql
-- Tables within 'portfolio' schema
CREATE TABLE portfolio.folders (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  date TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE portfolio.images (
  id UUID PRIMARY KEY,
  folder_id UUID REFERENCES portfolio.folders(id),
  filename TEXT NOT NULL,
  file_size INTEGER,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(folder_id, order_index)
);
```

### Key Implementation Details
- **Portfolio Loading**: Shows spinner while fetching from Supabase
- **Error Handling**: Displays error message with retry button
- **Image Optimization**: Uses `unoptimized` prop to avoid Next.js optimization timeout
- **Gallery Navigation**: Fixed modulo arithmetic for circular navigation
- **Key-based React**: Uses `key` prop on Image components to prevent caching issues

### Deployment Configuration
- **vercel.json**: Build configuration with environment variable mappings
- **next.config.js**: Added `/portfolio/**` remote pattern for Supabase
- **Build Scripts**: `vercel-build`, `vercel-start` added to package.json

### Current Status (v1.2.0 - 2026-04-08)
- [ ] Supabase project created and configured
- [ ] Database schema created in Supabase
- [ ] Portfolio images uploaded to Supabase storage
- [ ] Environment variables configured in Vercel
- [ ] Production deployment complete
- [ ] Testing verified for all features

### App Behavior with Supabase
- Portfolio section shows loading state initially
- Falls back to local data if Supabase fetch fails
- All existing features (WhatsApp, packages, testimonials) work normally
- Gallery images load from Supabase CDN URLs
- Responsive design preserved across all breakpoints

### Migration Status
**From**: Local file system (`/public/portfolio/`, 160MB images)
**To**: Supabase cloud storage (portfolio bucket)
**Approach**: Manual upload via Supabase Dashboard (recommended for one-time migration)

### Performance Targets
- Image load time: < 3 seconds (from Supabase CDN)
- Gallery navigation: < 1 second between images
- Portfolio fetch: < 2 seconds initial load
- Lighthouse score: > 90 for performance

## Future Enhancement Ideas
- Multi-language support (Malay, English)
- Client photo gallery (password-protected)
- Blog section for photography tips
- SEO optimization for local search
- Analytics integration
