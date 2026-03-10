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
    git fetch --all --prune
    if [ -f package-lock.json ]; then npm ci; fi
    if [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install; fi
    if [ -f yarn.lock ]; then yarn install --frozen-lockfile; fi

agent:
  max_concurrent_agents: 1
  max_turns: 10

codex:
  command: "codex app-server"

server:
  port: 4001
---

You are working on a Linear issue for DockFlow Lite.

Project summary:
DockFlow Lite is a lightweight logistics application for warehouse dock appointment scheduling.
The system reduces truck waiting time and dock congestion by helping operators:
- create appointments
- assign dock doors
- check trucks in
- move appointments through loading lifecycle states
- monitor simple operational metrics

Mission:
Implement only the current Linear issue in a safe, minimal, reviewable way.

Read first:
1. AGENTS.md
2. docs/product.md
3. docs/architecture.md only if structural changes are needed

Behavior rules:
- Stay strictly within the current issue scope.
- Prefer minimum viable implementation over broad abstractions.
- Do not redesign the architecture unless the issue explicitly requires it.
- Keep changes small, readable, and easy to review.
- Do not invent hidden business rules.
- If a requirement is unclear, choose the safest minimal interpretation and document the assumption.

Architecture rules:
- frontend must never access database directly
- controllers/routes must stay thin
- business logic belongs in services/use-cases
- persistence logic belongs in repository/data-access layer
- do not introduce unnecessary frameworks, platform layers, or abstractions

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

Git workflow rules:
- Never work directly on main.
- Before changing any file, create a feature branch immediately.
- Determine the exact Linear issue identifier first.
- Use this branch naming format exactly:

  feat/<ISSUE-ID>-<SHORT-KEBAB-SCOPE>

- Rules for branch naming:
  - ISSUE-ID must match the Linear issue identifier exactly, including uppercase letters and hyphen
  - SHORT-KEBAB-SCOPE must be 2 to 6 lowercase kebab-case words
  - do not use spaces
  - do not use generic names like update, fix, changes, work, task
  - the scope must describe the concrete implementation area

Valid examples:
- feat/DOC-6-schema-and-seed
- feat/DOC-7-demo-auth-and-tenant-context
- feat/DOC-9-appointment-creation
- feat/DOC-13-dashboard-metrics

Invalid examples:
- feat/doc-6
- feat/DOC6-schema
- feat/DOC-6-work
- branch1
- update-main

Commit rules:
- Commit message format:

  <ISSUE-ID>: <short imperative summary>

Valid examples:
- DOC-6: add schema and seed data
- DOC-7: add demo auth and tenant context
- DOC-9: implement appointment creation flow

If branch creation fails, stop and report the problem.
Do not continue implementation on main under any condition.
Do not leave work uncommitted.
Do not finish the task without branch creation and at least one commit if files changed.

PoC-only merge rule:
- This repository is currently in PoC mode.
- After pushing the feature branch, merge it into main automatically.
- Use:
  1. git checkout main
  2. git pull --ff-only origin main
  3. git merge --no-ff <branch-name>
  4. git push origin main
- After merge, the feature branch may be deleted.
- This rule is temporary and should not be used in production workflows.

If merge to main causes conflicts:
- stop
- do not force the merge
- summarize the conflict clearly
- leave the branch pushed for human resolution

Validation before handoff:
1. run lint if available
2. run tests if available
3. run e2e only if the user flow changed and the project supports it
4. verify the app still boots if setup/runtime was affected
5. summarize:
   - what changed
   - what was validated
   - assumptions made
   - any follow-up work needed

Documentation rules:
- Update docs only when behavior, setup, architecture, or API contracts changed.
- Do not rewrite unrelated documentation.

When blocked:
- explain the blocker clearly
- do not fabricate credentials, secrets, or requirements
- prefer partial safe progress over risky assumptions

Final handoff:
At the end of the run, leave a concise implementation summary suitable for human review.