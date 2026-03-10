# DockFlow Lite Product Notes

## Problem
Warehouses need a lightweight way to coordinate inbound and outbound truck appointments at specific dock doors.

## MVP Goal
Allow teams to quickly see and manage dock appointments with clear status tracking.

## Core Entities
- Tenant
- Warehouse
- DockDoor
- Appointment

## Appointment Statuses
- planned
- checked_in
- loading
- completed
- missed
- cancelled

## MVP Scope
- Single list view of appointments
- API endpoint for appointments
- API health endpoint
- Demo-only auth placeholder
- Seeded demo data for realistic local testing

## Out of Scope (for now)
- Advanced auth/authorization
- Optimization engine for dock assignment
- Notifications and messaging
- Multi-step workflows beyond status field updates
