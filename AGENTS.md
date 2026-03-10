# AGENTS.md

## Purpose

This repository contains DockFlow Lite, a small logistics application for warehouse dock appointment scheduling.

The goal is not to build a generic platform.
The goal is to build a small, working, understandable MVP.

---

## Product intent

DockFlow Lite reduces truck waiting time and dock congestion by helping warehouse teams:

- schedule truck arrivals
- assign dock doors
- check trucks in
- move appointments through a simple loading lifecycle
- monitor a few key operational metrics

This is a logistics PoC.
Prefer simple and useful over complete and abstract.

---

## Working style

When implementing a task:

1. read the current Linear issue carefully
2. read only the minimum repository context needed
3. stay inside the scope of the issue
4. make the smallest safe implementation that solves the task
5. validate the result
6. summarize clearly

Do not redesign the system unless the issue explicitly requires it.

---

## What to read first

Always read in this order:

1. `AGENTS.md`
2. `docs/product.md`
3. the current issue description

Read `docs/architecture.md` only if:
- the issue changes structure or layering
- new modules are added
- persistence or API boundaries are affected

Do not read unrelated files unless necessary.

---

## Core engineering principles

- Prefer boring and maintainable code.
- Use simple names and simple control flow.
- Keep functions and modules understandable.
- Avoid speculative abstractions.
- Avoid framework-heavy solutions for simple problems.
- Do not introduce infrastructure complexity without clear need.
- Do not leave dead code behind.

---

## Layering rules

- frontend must never access the database directly
- routes/controllers must stay thin
- business rules belong in services/use-cases
- persistence belongs in repositories/data-access code
- presentation logic must not contain hidden domain rules
- avoid circular dependencies

---

## MVP domain rules

Main entities:
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

Allowed transitions:
- planned -> checked_in
- planned -> missed
- planned -> cancelled
- checked_in -> loading
- checked_in -> cancelled
- loading -> completed

Do not invent extra statuses.

---

## Tenant rules

- all business records belong to a tenant
- warehouse must belong to active tenant
- dock door must belong to selected warehouse and tenant
- appointments must not cross tenant boundaries
- inactive dock doors cannot be used for new appointments

---

## UI rules

- keep forms simple
- keep operational screens readable
- show status clearly
- make validation messages explicit
- do not over-design the UI
- usability matters more than visual polish in this PoC

---

## Testing rules

When behavior changes:
- update or add tests where practical
- verify validation logic
- verify critical user flows when UI changes

Before considering a task done:
- build passes if build exists
- lint passes if lint exists
- tests pass if tests exist
- app still boots if setup/runtime changed

Do not claim a validation step was performed if it was not actually run.

---

## Documentation rules

Update documentation only when one of these changed:
- setup or run instructions
- behavior
- API contract
- domain rules
- architecture boundaries

Do not rewrite unrelated docs.

---

## Git rules

- never work directly on main
- create a feature branch before making changes
- branch name format:

  feat/<issue-identifier>-<short-kebab-scope>

  examples:
  - feat/DOC-6-schema-and-seed
  - feat/DOC-7-demo-auth-and-tenant-context
  - feat/DOC-8-warehouse-and-dock-door-management

- commit message format:

  <issue-identifier>: <short imperative summary>

  examples:
  - DOC-6: add schema and seed data
  - DOC-7: add demo auth and tenant context

If branch creation fails, explain clearly and stop.

---

## PoC merge rule

This repository is temporarily in PoC mode.

After implementation is complete and validated:
- push the feature branch
- merge it into main
- push main

This is temporary.
In a normal workflow this must become PR-based review.

---

## Done criteria

A task is done only when:
- requested scope is implemented
- the implementation is readable
- validation steps were actually run where available
- docs are updated if necessary
- branch, commit, and push were completed
- final summary is clear and concise

---

## When blocked

If blocked:
- explain what is blocked
- explain why
- list what was completed
- list the smallest next action

Do not fabricate secrets, credentials, system behavior, or missing requirements.