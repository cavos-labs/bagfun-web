# bag.fun Web

This is the web component of the bag.fun project, built with [Next.js](https://nextjs.org). This application serves a dual purpose:
- **API Backend**: Provides API endpoints for the bag.fun mobile and web application
- **Landing Page**: Serves as the public-facing website for bag.fun

## API Endpoints

### Token Management
- `GET /api/tokens` - Get all tokens (with pagination)
- `POST /api/tokens` - Create new token
- `GET /api/tokens/[id]` - Get token by ID
- `PUT /api/tokens/[id]` - Update token
- `DELETE /api/tokens/[id]` - Delete token (owner only)

### Waitlist
- `POST /api/waitlist` - Join waitlist

All token endpoints require API key authentication via `x-api-key` header.

## Project Structure

### Public Assets

All static assets are organized in the `public/` directory:

#### Images
- `bag-fun.png` - Main BagFun logo/branding
- `create-coin.png` - Create coin button illustration
- `dog-meme.png` - Meme-related imagery
- `join-waitlist.png` - Waitlist signup button
- `mobile-prototype.png` - Mobile app prototype screenshot

#### Fonts
- `fonts/ramagothicbold.ttf` - Custom Rama Gothic Bold font for branding

### Design System

#### Typography
- **Title/Heading Font**: Rama Gothic Bold (custom font)
- **Body/Content Font**: Inter (system font)

#### Color Scheme
- **Font Colors**: White or Gray
- **Background Colors**: 
  - Dark theme: `#141414`
  - Light theme: White

### Tech Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Runtime**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Build Tool**: Turbopack (enabled for faster builds)
- **Database**: Supabase (PostgreSQL)

## Environment Setup

### Supabase Configuration

This project uses Supabase for backend services, specifically for waitlist management. All database operations are performed server-side only for security.

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   API_KEY=your_secret_api_key
   ```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

Run the test suite:

```bash
npm test
```

The project includes comprehensive tests for API endpoints, validation, and security features.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.