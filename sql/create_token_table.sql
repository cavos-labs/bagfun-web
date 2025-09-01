-- Create main table for bag.fun
create table public.token (
    id uuid primary key default gen_random_uuid(),

    name text not null unique,
    ticker varchar(16) not null unique,
    image_url text,
    amount numeric(36, 18) not null default 0,
    creator_address text not null,

    created_at timestamptz not null default now()
);

-- Index for faster lookups by creator
create index idx_token_creator_address on public.token (creator_address);