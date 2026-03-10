# AGENTS.md

## Purpose

This repository contains DockFlow Lite, a small logistics application for warehouse dock appointment scheduling.

Agents working in this repository must optimize for:
- clarity
- maintainability
- small safe changes
- testability
- explicit documentation

---

## Product Intent

DockFlow Lite reduces truck waiting time and dock congestion by giving warehouse teams a simple dock appointment workflow:
- plan truck arrivals
- assign dock doors
- check trucks in
- manage loading lifecycle
- monitor delays and utilization

This is an MVP. Simplicity is preferred over sophistication.

---

## Repository Principles

- Keep the code boring and understandable.
- Prefer explicit code over clever abstractions.
- Do not build speculative platform features.
- Stay within the requested scope.
- Fix root causes when practical, not only symptoms.
- Update docs when behavior or architecture changes.
- Do not silently change product rules.

---

## Architecture Rules

### Layering
- frontend must never access the database directly
- controllers/routes must stay thin
- business logic belongs in services/use-cases
- persistence logic belongs in repositories/data-access modules
- domain rules should not be hidden inside controllers or UI components

### Boundaries
- UI should call API only
- API modules should respect tenant boundaries
- persistence should not leak into presentation logic
- avoid circular dependencies
- avoid cross-module imports unless clearly justified

### Simplicity
- do not introduce CQRS/event bus/plugin systems in MVP unless explicitly requested
- avoid premature abstraction
- avoid over-generalizing tenant logic
- avoid infrastructure complexity that is not required for local PoC success

---

## Coding Expectations

- Use clear names.
- Keep functions small where reasonable.
- Prefer readable branching over dense one-liners.
- Add comments only when they clarify intent or a non-obvious decision.
- Preserve consistent formatting and lint rules.
- Reuse existing helpers before creating new ones.
- Do not leave dead code behind.

---

## Testing Expectations

When behavior changes:
- update or add unit tests where appropriate
- update integration tests where appropriate
- update Playwright smoke/e2e tests if user flow changes

Before considering a task done:
- build passes
- lint passes
- tests pass
- seed/demo flow still works

---

## Documentation Expectations

Update docs whenever any of the following changes:
- domain rules
- API contract
- status transition behavior
- setup/run steps
- architecture assumptions

Likely docs to update:
- `README.md`
- `docs/product.md`
- `docs/architecture.md`
- `docs/definition-of-done.md`

---

## Domain Rules for MVP

Main entities:
- Tenant
- Warehouse
- DockDoor
- Appointment
- CheckInEvent (optional implementation detail if used)

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

Do not invent additional statuses without explicit requirement.

---

## UI Rules

- Keep forms simple.
- Prioritize usability over visual polish.
- Make key appointment states visible in list/detail views.
- Validation messages should be clear and concrete.
- Dashboard can be simple cards/tables; no complex charting required unless explicitly requested.

---

## Database and Tenant Rules

- every warehouse, dock door, and appointment belongs to a tenant
- warehouse must belong to the active tenant
- dock door must belong to the selected warehouse and tenant
- inactive dock doors cannot be assigned to new appointments
- do not bypass tenant filters

---

## Safe Change Strategy

When implementing a task:
1. understand existing docs and code
2. keep the change scoped to the task
3. prefer minimum viable implementation
4. validate locally with repository scripts
5. summarize what changed and what was verified

When blocked:
- describe the blocker clearly
- avoid guessing hidden business rules
- make the smallest safe progress possible

---

## Done Criteria

A task is only done when:
- requested scope is implemented
- code is readable
- lint/build/tests pass
- docs are updated if needed
- changes are ready for review