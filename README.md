# Resume Builder

A FlowCV-style resume builder web application with drag-and-drop customization, real-time preview, and PDF export.

## Features

- **Drag-and-Drop Editor**: Reorder sections and items with intuitive drag-and-drop
- **Real-time Preview**: See changes instantly as you type
- **PDF Export**: Download ATS-friendly PDF resumes
- **Theme Customization**: Change colors, fonts, spacing, and margins
- **Custom Sections**: Add your own sections beyond the defaults
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
2. Go to Project Settings > API to get your URL and anon key
3. Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set up the Database

Go to Supabase SQL Editor and run the schema from `supabase/schema.sql`:

```sql
-- This creates the resumes table with Row Level Security
```

### 4. Run the Development Server

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
