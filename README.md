# Resume Builder

A FlowCV-style resume builder web application with drag-and-drop customization, real-time preview, and PDF export.

## Features

- **Drag-and-Drop Editor**: Reorder sections and items with intuitive drag-and-drop
- **Real-time Preview**: See changes instantly as you type
- **PDF Export**: Download ATS-friendly PDF resumes
- **Theme Customization**: Change colors, fonts, spacing, and margins
- **Custom Sections**: Add your own sections beyond the defaults
- **AI Assistant (Anthropic)**:
  - Tailor professional summary to a job description
  - Rewrite experience bullets for stronger impact
  - Suggest missing, job-aligned skills
  - Run an ATS-style keyword match check
- **Auto-save**: Changes are automatically saved to the database
- **Authentication**: Secure user accounts with Supabase Auth

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Drag-and-Drop**: @dnd-kit/core + @dnd-kit/sortable
- **PDF Generation**: @react-pdf/renderer
- **State Management**: Zustand with Immer middleware
- **Backend/Auth**: Supabase (Auth + PostgreSQL)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase account

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd resumeable
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your URL, anon key, and service role key
3. Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ANTHROPIC_API_KEY=your_anthropic_api_key
# Optional model override (defaults to claude-3-5-sonnet-latest)
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
```

### 3. Set up the Database

Go to Supabase SQL Editor and run:

1. `supabase/schema.sql`
2. `supabase/subscriptions.sql`

```sql
-- These create resumes + subscriptions tables with Row Level Security
```

### 4. Set up Lemon Squeezy (Complete)

After your Lemon Squeezy account is verified:

1. Create a Store (or use your existing store).
2. Create a Product named something like `Resumeable Pro`.
3. Create at least one Subscription Variant (example: monthly `$5`).
4. Copy your Store ID and Variant ID.
5. Create a Lemon Squeezy API key with write access.
6. In Lemon Squeezy, create a webhook endpoint:
   - URL: `https://your-domain.com/api/webhooks/lemonsqueezy`
   - Select subscription lifecycle events:
     - `subscription_created`
     - `subscription_updated`
     - `subscription_cancelled`
     - `subscription_resumed`
     - `subscription_expired`
     - `subscription_paused`
     - `subscription_unpaused`
     - `subscription_plan_changed`
     - `subscription_payment_success`
     - `subscription_payment_failed`
     - `subscription_payment_recovered`
     - `subscription_payment_refunded`
7. Copy the webhook signing secret.
8. Add Lemon Squeezy env vars to `.env.local` (dev) and your deployment env (prod):

```env
LEMONSQUEEZY_API_KEY=your_lemonsqueezy_api_key
LEMONSQUEEZY_WEBHOOK_SECRET=your_lemonsqueezy_webhook_secret
LEMONSQUEEZY_STORE_ID=your_lemonsqueezy_store_id
LEMONSQUEEZY_VARIANT_ID=your_lemonsqueezy_variant_id
LEMONSQUEEZY_CHECKOUT_TEST_MODE=false
```

9. Redeploy after setting production env vars.
10. Test end-to-end:
   - Sign in to the app.
   - Go to `/pricing` and click `Upgrade to Pro`.
   - Complete checkout in Lemon Squeezy.
   - Confirm webhook delivery is `200` in Lemon Squeezy.
   - Confirm a row appears in Supabase `subscriptions` table.
   - Return to `/pricing` and use `Manage billing` to open customer portal.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── dashboard/         # User's resumes list
│   └── builder/[id]/      # Resume editor
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── auth/              # Auth components
│   ├── editor/            # Editor components
│   │   ├── sections/      # Section-specific editors
│   │   └── dnd/           # Drag-and-drop components
│   ├── preview/           # Live preview
│   └── pdf/               # PDF templates
├── store/                 # Zustand stores
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
│   └── supabase/         # Supabase clients
└── types/                 # TypeScript types
```

## Default Sections

1. **Header**: Name, title, contact info
2. **Professional Summary**: Brief overview
3. **Work Experience**: Jobs with bullet points
4. **Education**: Degrees and institutions
5. **Skills**: Categorized skill groups
6. **Projects**: Academic/personal projects
7. **Certifications**: Professional certifications

All sections can be hidden, reordered, or customized. You can also add custom sections.

## Theme Options

- Primary color (affects section headers)
- Font family
- Base font size
- Line height
- Section spacing
- Page margins

## License

MIT
