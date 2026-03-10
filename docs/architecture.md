# Architecture

## Overview

DockFlow Lite is a small logistics MVP for warehouse dock appointment scheduling.

It uses a simple full-stack structure:

- `apps/web` → frontend UI
- `apps/api` → backend API
- `postgres` → relational storage
- `docker-compose.yml` → local runtime

The architecture is intentionally simple.

---

## Main goals

- easy local development
- clear module boundaries
- small, understandable code
- fast iteration for PoC work
- safe future growth without unnecessary abstraction

---

## System boundaries

### Frontend
Responsible for:
- screens
- forms
- input validation at UI level
- calling backend APIs
- rendering operational data

Frontend must not:
- access database directly
- contain hidden business rules
- duplicate core status transition logic

### Backend
Responsible for:
- API endpoints
- domain validation
- status transitions
- tenant scoping
- persistence orchestration
- metrics aggregation for dashboard

Backend should keep:
- controllers thin
- business logic in services/use-cases
- data access in repository/data-access code

### Database
Responsible for:
- storing tenant, warehouse, dock door, and appointment records
- preserving referential integrity
- enabling simple queries for operational screens and dashboard metrics

---

## Domain model

Core entities:

- Tenant
- Warehouse
- DockDoor
- Appointment

### Warehouse
Represents a logistics facility for a tenant.

### DockDoor
Represents a loading/unloading door under a warehouse.

### Appointment
Represents a planned or actual truck visit assigned to a warehouse and dock door.

---

## Status model

Appointment statuses:

- planned
- checked_in
- loading
- completed
- missed
- cancelled

Allowed transitions:

- planned -> checked_in
- planned -> missed
- planned -> cancelled
- checked_in -> loading
- checked_in -> cancelled
- loading -> completed

All transition enforcement belongs in backend business logic.

---

## Tenant isolation

Every business record belongs to a tenant.

Rules:
- warehouses belong to one tenant
- dock doors belong to one warehouse and one tenant
- appointments belong to one tenant
- cross-tenant access is not allowed

Tenant scoping must be enforced in backend queries and mutation paths.

---

## Directory guidance

### apps/web
Suggested responsibilities:
- pages/routes
- UI components
- forms
- API clients
- view models

### apps/api
Suggested responsibilities:
- modules by domain area
- controllers/routes
- services/use-cases
- repositories/data-access
- database schema/migrations/seeds

### docs
Contains:
- product context
- architecture rules
- definition of done
- any small project conventions worth preserving

---

## Design rules

- prefer explicit code over clever abstractions
- add new layers only when necessary
- avoid CQRS/event-bus/plugin systems in this PoC unless explicitly required
- optimize for clarity first
- keep operational flows easy to trace from UI to API to persistence

---

## Local runtime

Local development should work with one command through Docker Compose.

Expected local stack:
- postgres
- api
- web

Seed data should make the app demoable without manual database setup.

---

## Future growth

If the PoC succeeds, likely next steps would be:
- PR-based workflow
- stronger auth and RBAC
- richer dashboard metrics
- slot conflict rules
- integration with warehouse or transport systems

These are not part of the current MVP unless explicitly requested.