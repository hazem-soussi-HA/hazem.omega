# Hazem Soussi - Digital Ecosystem Architecture

## Overview
A hybrid platform combining systems showcase, SaaS tools, academy, and client collaboration.

## Tech Stack
- **Frontend**: Next.js 15, Tailwind CSS 4, Shadcn/UI
- **Backend**: FastAPI (MCP Server, Copilot App)
- **Database**: Supabase (PostgreSQL)
- **AI**: Ollama (Phi3:mini) / OpenRouter
- **Payments**: Stripe
- **Orchestration**: Docker Compose

## Directory Structure
```
/apps/web-portal/          # Next.js frontend
/services/mcp-server/      # FastAPI MCP tools
/services/copilot-app/     # AI Copilot with WebSocket
/supabase/migrations/      # Database schemas
```

## API Endpoints

### Frontend Routes
- GET / - Landing page
- GET /systems - Systems grid
- GET /systems/:slug - System detail
- GET /saas - Tools dashboard
- GET /academy - Course catalog
- GET /academy/:courseId - Lesson player
- GET /services - Booking/tickets
- GET /admin - Admin dashboard

### API Routes
- GET /api/projects - Project data
- GET /api/github/metrics - GitHub stats
- POST /api/tools/calculator - MCP calculator
- POST /api/stripe/webhook - Stripe webhooks
- GET /api/saas/subscription - Subscription status
- GET/POST /api/academy/progress - Course progress

### MCP Server (port 8001)
- POST /calculator - Math expressions
- POST /text_processor - Text operations
- GET /weather - Weather data
- GET /health - Health check

### Copilot App (port 8000)
- GET /api/chat - Synchronous chat
- WS /ws - Streaming WebSocket

## Security
- Row Level Security (RLS) on all Supabase tables
- CSP headers via Caddy reverse proxy
- Rate limiting on API routes
- Input sanitization on all endpoints
- No secrets in code - all in .env

## Deployment
- Frontend: Vercel
- Backend: Azure/VPS with Docker
- Database: Supabase Cloud
- AI: Ollama (local) or OpenRouter (cloud)
