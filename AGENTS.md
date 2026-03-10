# AGENTS.md

## Project Goal
Build and iterate on DockFlow Lite, a simple warehouse dock appointment scheduling MVP.

## Engineering Principles
- Keep implementation simple and readable.
- Prioritize end-to-end flow over advanced abstractions.
- Use explicit names for logistics domain concepts.

## Scope Guardrails
- Keep auth as local/demo placeholder until explicitly expanded.
- Avoid heavy framework add-ons unless they unlock a required feature.
- Prefer straightforward SQL/data access over premature complexity.

## Working Agreements
- Ensure local boot remains one command.
- Keep docs in `docs/` in sync with implementation.
- Add/adjust seed data when schema changes.
- Preserve appointment status vocabulary exactly:
  - planned
  - checked_in
  - loading
  - completed
  - missed
  - cancelled
