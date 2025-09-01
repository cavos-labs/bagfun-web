# bag.fun Web

A Next.js application providing API endpoints and landing page for the bag.fun token platform.

## Features

- **Token CRUD API** - Complete REST API for token management
- **API Key Security** - Secure endpoints with API key authentication
- **Waitlist System** - Email collection for early access
- **Modern Stack** - Next.js 15, React 19, TypeScript, Tailwind CSS

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

## Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# API Security
API_KEY=your_secret_api_key
```

## API Endpoints

### Tokens

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tokens` | Get all tokens (with pagination) |
| `POST` | `/api/tokens` | Create new token |
| `GET` | `/api/tokens/[id]` | Get token by ID |
| `PUT` | `/api/tokens/[id]` | Update token |
| `DELETE` | `/api/tokens/[id]` | Delete token (owner only) |

### Waitlist

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/waitlist` | Join waitlist |

## API Usage

All token endpoints require API key authentication:

```bash
curl -X GET http://localhost:3000/api/tokens \
  -H "x-api-key: your-secret-api-key"
```

### Create Token

```bash
curl -X POST http://localhost:3000/api/tokens \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-api-key" \
  -d '{
    "name": "My Token",
    "ticker": "MTK",
    "amount": 1000000,
    "creator_address": "0x1234567890abcdef1234567890abcdef12345678"
  }'
```

## Database Schema

### Token Table

```sql
create table public.token (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    ticker varchar(16) not null unique,
    image_url text,
    amount numeric(36, 18) not null default 0,
    creator_address text not null,
    created_at timestamptz not null default now()
);
```

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

## Tech Stack

- **Framework**: Next.js 15.5.2
- **Runtime**: React 19.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Testing**: Jest

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── tokens/          # Token CRUD endpoints
│   │   └── waitlist/        # Waitlist endpoint
│   └── page.tsx             # Landing page
├── lib/
│   ├── supabase.ts          # Database client
│   └── auth.ts              # API key validation
├── __tests__/               # Test suite
└── sql/
    └── create_token_table.sql
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

Private project - All rights reserved.