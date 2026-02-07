-- Subscriptions table for LemonSqueezy integration
-- Run this in your Supabase SQL Editor

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  lemonsqueezy_subscription_id text not null unique,
  lemonsqueezy_customer_id text not null,
  lemonsqueezy_variant_id text not null,
  status text not null default 'active',
  -- status: active, past_due, cancelled, expired, paused, unpaid, on_trial
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row Level Security
alter table subscriptions enable row level security;

-- Users can read their own subscription
drop policy if exists "Users can view own subscription" on subscriptions;
create policy "Users can view own subscription"
  on subscriptions for select using (auth.uid() = user_id);

-- Only the service role (webhooks) can insert/update/delete
-- No insert/update/delete policies for anon/authenticated — 
-- all writes happen via the webhook API route using the service role key

-- Updated at trigger
drop trigger if exists subscriptions_updated_at on subscriptions;
create trigger subscriptions_updated_at
  before update on subscriptions
  for each row execute function update_updated_at();

-- Indexes
create index if not exists subscriptions_user_id_idx on subscriptions(user_id);
create index if not exists subscriptions_ls_sub_id_idx on subscriptions(lemonsqueezy_subscription_id);
create index if not exists subscriptions_status_idx on subscriptions(status);
