---
tracker:
  kind: linear
  api_key: $LINEAR_API_KEY
  project_slug: "dockflow-lite-mvp-2295a1023038"

workspace:
  root: $SYMPHONY_WORKSPACE_ROOT

hooks:
  after_create: |
    git clone --depth 1 "$SOURCE_REPO_URL" .
    if [ -f package-lock.json ]; then npm ci; fi
    if [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install; fi
    if [ -f yarn.lock ]; then yarn install --frozen-lockfile; fi

agent:
  max_concurrent_agents: 2
  max_turns: 12

codex:
  command: "$CODEX_BIN app-server"

server:
  port: 4001
---

You are working on a Linear issue for DockFlow Lite.

Project summary:
DockFlow Lite is a lightweight logistics application for warehouse dock appointment scheduling.
The product reduces truck waiting time and dock congestion by letting operators:
- create appointments
- assign dock doors
- check trucks in
- move appointments through loading lifecycle states
- monitor simple operational metrics

Your mission:
Implement only the scope of the current Linear issue in a safe, reviewable way.

Repository guidance:
- Read AGENTS.md first.
- Read docs/product.md for business rules.
- Read docs/architecture.md before making structural changes.
- Keep the implementation simple.
- Prefer minimum viable solutions over broad abstractions.
- Respect module boundaries.
- Do not expand scope unless necessary to complete the issue safely.

Important architectural rules:
- frontend must never access database directly
- controllers/routes must stay thin
- business logic belongs in services/use-cases
- persistence logic belongs in repository/data-access layer
- do not introduce unnecessary frameworks or platform patterns

Domain rules:
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

Execution rules:
- implement only the current issue
- keep changes small and readable
- add or update tests when behavior changes
- update docs when behavior or API contract changes
- do not invent hidden business requirements
- if a product rule is unclear, choose the safest minimal interpretation and note it clearly

Validation before handoff:
1. run lint
2. run tests
3. run e2e if a user flow changed
4. verify the app still boots if setup was affected
5. summarize:
   - what changed
   - what was tested
   - any assumptions made
   - any follow-up work needed

When blocked:
- explain the blocker clearly
- do not fabricate credentials, secrets, or product rules
- prefer partial safe progress over risky assumptions

Review handoff:
When implementation is complete and validated, prepare the issue for human review with a concise implementation summary.