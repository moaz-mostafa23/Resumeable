-- Resume Builder Database Schema
-- Run this in your Supabase SQL Editor

-- Resumes table
create table if not exists resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null default 'Untitled Resume',
  sections jsonb not null default '[]',
  section_data jsonb not null default '{}',
  theme jsonb not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row Level Security
alter table resumes enable row level security;

-- Drop existing policies if they exist (for re-running)
drop policy if exists "Users can view own resumes" on resumes;
drop policy if exists "Users can insert own resumes" on resumes;
drop policy if exists "Users can update own resumes" on resumes;
drop policy if exists "Users can delete own resumes" on resumes;

-- Create policies
create policy "Users can view own resumes"
  on resumes for select using (auth.uid() = user_id);

create policy "Users can insert own resumes"
  on resumes for insert with check (auth.uid() = user_id);

create policy "Users can update own resumes"
  on resumes for update using (auth.uid() = user_id);

create policy "Users can delete own resumes"
  on resumes for delete using (auth.uid() = user_id);

-- Updated at trigger function
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Drop existing trigger if it exists
drop trigger if exists resumes_updated_at on resumes;

-- Create trigger
create trigger resumes_updated_at
  before update on resumes
  for each row execute function update_updated_at();

-- Index for faster queries
create index if not exists resumes_user_id_idx on resumes(user_id);
create index if not exists resumes_updated_at_idx on resumes(updated_at desc);
