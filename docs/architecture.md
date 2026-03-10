# DockFlow Lite Architecture

## Overview
DockFlow Lite uses a monorepo with two applications and one database.

- `apps/web`: Next.js UI
- `apps/api`: NestJS REST API
- PostgreSQL for persistence

## Runtime Flow
1. User opens web app (`localhost:3000`).
2. Web app fetches API endpoints:
   - `GET /health`
   - `GET /appointments`
3. API reads data from PostgreSQL.

## Data Model
- `tenant` (1) -> (N) `warehouse`
- `warehouse` (1) -> (N) `dock_door`
- `appointment` references tenant, warehouse, and dock_door

## API Modules
- `health`: service health check endpoint
- `auth`: demo auth placeholder endpoint
- `appointments`: appointment listing endpoint
- `database`: PostgreSQL connection and schema bootstrap

## Local Infrastructure
Docker Compose starts:
- `db` (PostgreSQL 16)
- `api` (NestJS)
- `web` (Next.js)

`api` runs seed on startup so demo data is available immediately.
