# SubVerse AI

> **Turn Any Video Into Content For Every Platform.**

SubVerse AI is a production-ready AI SaaS platform that transforms a single video upload into a complete content suite — AI subtitles, translations in 100+ languages (including Hinglish), animated captions, blog articles, social posts, SEO metadata, hashtags, and more.

Built with a premium, Awwwards-caliber interface inspired by Apple, Linear, Framer, Arc, OpenAI, ElevenLabs, and Stripe.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots / Pages](#pages)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Design System](#design-system)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## Features

### Content Generation
- **AI Subtitles** — Whisper large-v3 speech recognition with 99%+ accuracy
- **Hinglish & Hindi Captions** — Code-switching aware transcription
- **100+ Language Translations** — Neural machine translation preserving tone & context
- **Speaker Detection** — Diarization for up to 10 speakers
- **Burned Captions** — Embed styled captions directly into video
- **SRT / VTT / ASS / JSON / TXT Export** — All standard subtitle formats
- **Animated Social Captions** — TikTok, YouTube, Instagram, Podcast styles

### AI Repurpose Engine
- Instagram captions, LinkedIn posts, Twitter threads, Facebook posts
- Blog articles, newsletters, podcast show notes
- YouTube titles & descriptions, SEO metadata, hashtag clouds

### Platform
- Full authentication (login / signup with OAuth)
- Dashboard with analytics & usage tracking
- Upload, processing, subtitle editor, timeline editor
- Translation panel, AI content generator, export center
- Billing & subscription management
- Settings & profile
- Admin dashboard (analytics, users, revenue, system health, moderation)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS, custom design system, CSS variables |
| **Animation** | Framer Motion, GSAP, Lenis (smooth scroll), CSS keyframes |
| **3D / Visuals** | Three.js / React Three Fiber ready, custom WebGL-free effects |
| **UI Primitives** | Radix UI, custom glass-morphism components |
| **Auth** | Clerk |
| **Database** | PostgreSQL + Prisma ORM |
| **Storage** | Cloudflare R2 |
| **AI** | OpenAI Whisper (transcription), LLM translation |
| **Payments** | Stripe + Razorpay |
| **Media** | FFmpeg (caption burning, audio extraction) |
| **Caching** | Upstash Redis |
| **Deployment** | Vercel |

---

## Pages

### Marketing (`/`)
A cinematic single-page experience with 10 animated sections:
1. **Hero** — Floating 3D video player, word-by-word live subtitles cycling through 6 languages, orbiting language pills, live AI process panel
2. **Trusted By** — Infinite scrolling logos with gradient fade
3. **Interactive Demo** — Simulated upload → process → output pipeline
4. **Subtitle Showcase** — TikTok / YouTube / Podcast / Instagram caption styles
5. **AI Repurpose** — One video into 6+ content formats
6. **Features** — Animated feature cards
7. **Comparison** — SubVerse AI vs competitors table
8. **Pricing** — Floating cards with glowing popular tier
9. **Testimonials** — 3D glass cards in dual marquees
10. **FAQ** — Smooth accordion

### App
| Route | Description |
|-------|-------------|
| `/login`, `/signup` | Authentication |
| `/dashboard` | Overview, stats, recent projects |
| `/dashboard/upload` | Drag & drop upload with processing options |
| `/dashboard/processing` | Live AI pipeline visualization |
| `/dashboard/projects` | Project library with search & filter |
| `/dashboard/subtitles` | Timeline subtitle editor |
| `/dashboard/translations` | Translation panel |
| `/dashboard/content` | AI content generator |
| `/dashboard/export` | Multi-format export center |
| `/dashboard/billing` | Plan, usage, invoices |
| `/dashboard/settings` | Profile, notifications, security |
| `/admin` | Admin analytics & moderation |

---

## Getting Started

### Prerequisites
- Node.js 18+ (20+ recommended)
- PostgreSQL database
- npm / pnpm / yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in your keys (see Environment Variables below)

# 3. Generate Prisma client & push schema
npx prisma generate
npx prisma db push

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

See [`.env.example`](./.env.example) for the full list. Key variables:

```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
STRIPE_SECRET_KEY=sk_...
OPENAI_API_KEY=sk-...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
```

---

## Project Structure

```
subverse-ai/
├── prisma/
│   └── schema.prisma          # Database models
├── src/
│   ├── app/
│   │   ├── (auth)/            # Login & signup (route group)
│   │   ├── (dashboard)/       # Dashboard & admin (route group)
│   │   │   ├── admin/         # Admin dashboard
│   │   │   └── dashboard/     # All app screens
│   │   ├── api/               # API route handlers
│   │   │   ├── upload/
│   │   │   ├── process/
│   │   │   ├── export/
│   │   │   └── billing/
│   │   ├── globals.css        # Design system & animations
│   │   ├── layout.tsx         # Root layout, fonts, metadata
│   │   ├── page.tsx           # Landing page
│   │   ├── loading.tsx        # Global loading UI
│   │   ├── error.tsx          # Error boundary
│   │   └── not-found.tsx      # 404 page
│   ├── components/
│   │   ├── ui/                # Reusable primitives (Button, GlassCard, etc.)
│   │   ├── landing/           # Landing page sections
│   │   └── shared/            # Navbar, cursor, backgrounds
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utils, constants, db client
│   ├── types/                 # Shared TypeScript types
│   └── middleware.ts          # Route protection
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Database Schema

Core models (see [`prisma/schema.prisma`](./prisma/schema.prisma)):

- **User** — accounts, plan, credits
- **Project** — uploaded videos + metadata
- **Subtitle** / **SubtitleSegment** — timed transcription segments
- **Translation** — per-language translations with status
- **GeneratedContent** — AI-generated social/blog content
- **Export** — export jobs and file references
- **Subscription** — Stripe billing state
- **UsageRecord** — credit consumption tracking
- **ApiKey** — API access for Enterprise

---

## API Routes

| Method | Route | Purpose |
|--------|-------|---------|
| `POST` | `/api/upload` | Generate presigned R2 upload URL, create project |
| `POST` | `/api/process` | Trigger AI processing pipeline |
| `GET` | `/api/process?projectId=` | Poll processing status |
| `POST` | `/api/export` | Generate export files (SRT, VTT, burned video, etc.) |
| `POST` | `/api/billing` | Stripe checkout / portal / cancel |
| `GET` | `/api/billing` | Subscription & usage data |

---

## Design System

### Color Palette
- **Background:** `#04040B`
- **Accents:** Electric Blue `#3B82F6`, Neon Purple `#8B5CF6`, Cyan `#06B6D4`, Violet `#6D28D9`
- **Text:** Pure White, Soft Gray `#94A3B8`, gradient text

### Signature Effects
- Glass-morphism cards with 3D tilt & spotlight
- Animated aurora / mesh gradient backgrounds
- Floating particles, light orbs, animated grid
- Custom cursor with spring-follow ring
- Magnetic buttons, ripple & glow micro-interactions
- Word-by-word subtitle animation, orbiting pills

All animations are GPU-accelerated and respect `prefers-reduced-motion`.

---

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

---

## Deployment

Optimized for **Vercel**:

1. Push to GitHub
2. Import the repo in Vercel
3. Add environment variables
4. Deploy

The app targets a Lighthouse score above 95 with lazy loading, image optimization, code splitting, and SEO metadata built in.

---

## Roadmap

- [ ] Real-time collaboration on subtitle editing
- [ ] Custom AI voice cloning for dubbing
- [ ] Auto-generated video chapters
- [ ] Team workspaces & role-based access
- [ ] Mobile apps (iOS / Android)

---

## License

Proprietary — © 2024 SubVerse AI. All rights reserved.
