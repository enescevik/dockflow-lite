# DockFlow Lite

DockFlow Lite is a small logistics MVP for warehouse dock appointment scheduling.

## Tech Stack

- Monorepo with npm workspaces
- `apps/web`: Next.js (App Router)
- `apps/api`: NestJS
- PostgreSQL
- Docker Compose for local orchestration
- Playwright smoke test scaffold

## MVP Domain

- Tenant
- Warehouse
- DockDoor
- Appointment

Appointment statuses:

- planned
- checked_in
- loading
- completed
- missed
- cancelled

## Repository Structure

```text
.
├── apps
│   ├── api
│   │   ├── scripts/seed.ts
│   │   └── src
│   │       ├── appointments/
│   │       ├── auth/
│   │       ├── database/
│   │       └── health/
│   └── web
│       ├── app/
│       ├── src/lib/
│       └── tests/smoke.spec.ts
├── docs
│   ├── architecture.md
│   ├── definition-of-done.md
│   └── product.md
├── docker-compose.yml
├── AGENTS.md
└── package.json
```

## Exact Commands To Run Locally

1. Install dependencies (from repo root):

```bash
npm install
```

2. Boot everything (web + api + postgres) with one command:

```bash
npm run local:boot
```

3. Open the app:

- Web: <http://localhost:3000>
- API health: <http://localhost:3001/health>
- Demo auth placeholder: <http://localhost:3001/auth/demo>

4. Stop and clean containers:

```bash
npm run local:down
```

## Useful Commands

```bash
npm run seed        # Rerun demo seed data
npm run lint        # Lint all workspaces
npm run format      # Format all workspaces
npm run test        # Run tests in all workspaces
npm run test:e2e    # Run Playwright smoke test scaffold (web must be running)
```

## Notes

- API container runs the seed script at startup for demo convenience.
- Demo auth is intentionally simple and local-only for MVP phase.
