hazem-soussi-ecosystem
===========

A hybrid platform combining systems showcase, SaaS tools, academy, and client collaboration portal.

## Architecture

- **Frontend**: Next.js 15 with Tailwind CSS and Shadcn/UI components
- **Backend**: FastAPI MCP Server, Copilot App with Ollama/OpenRouter
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **AI**: Ollama (local) / OpenRouter (cloud)

## Setup

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Supabase account (supabase.com)
- Stripe account (stripe.com)

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `GITHUB_TOKEN` - GitHub personal access token
- `LLM_BACKEND` - openrouter or ollama
- `OLLAMA_URL` - http://localhost:11434
- `OPENROUTER_API_KEY` - OpenRouter API key
- `MCP_SERVER_URL` - http://localhost:8001

### Install Dependencies

```bash
npm install
```

### Database Setup

Run Supabase migrations:

```bash
supabase db push
```

Or use the SQL migration file:
```bash
supabase db execute supabase/migrations/01_initial_schema.sql
```

### Run Development

```bash
# Terminal 1: Backend services
docker compose up -d

# Terminal 2: Frontend
npm run dev
```

Open http://localhost:3000

### Build for Production

```bash
npm run build
npm start
```

## Features

### Frontend Pages
- `/` - Landing page with bento grid dashboard
- `/systems` - Systems showcase grid
- `/systems/[slug]` - Detailed system view
- `/saas` - SaaS tools dashboard
- `/academy` - Course catalog
- `/academy/[courseId]` - Lesson player with progress tracking
- `/services` - Booking, tickets, document exchange
- `/admin` - Admin dashboard

### API Routes
- `/api/projects` - Project data
- `/api/github/metrics` - GitHub statistics
- `/api/tools/calculator` - MCP calculator proxy
- `/api/stripe/webhook` - Stripe webhook handler
- `/api/saas/subscription` - Subscription status
- `/api/academy/progress` - Course progress

### Authentication
Supabase Auth with email/password and OAuth. Role-based access control (admin, premium, free).

## Deployment

### Vercel (Frontend)
```bash
vercel deploy
```

### Azure/VPS (Backend)
```bash
docker compose -f docker-compose.prod.yml up -d
```

## CI/CD

GitHub Actions included for lint, test, build, and deploy.

## Ollama Setup

```bash
docker compose up -d ollama

# Pull model
ollama pull phi3:mini

# Set LLM_BACKEND=ollama in .env
```

## License

Proprietary - Hazem Soussi
