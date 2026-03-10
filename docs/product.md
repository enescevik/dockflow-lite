# DockFlow Lite - Product Specification

## 1. Overview

DockFlow Lite is a lightweight logistics web application for managing warehouse dock appointments.

The product solves a simple but real warehouse problem:

- trucks arrive without clear scheduling
- dock doors are overbooked or underutilized
- operators manage check-ins manually
- waiting times increase
- it becomes hard to see which vehicle should go to which dock and when

DockFlow Lite introduces a small, operationally useful workflow:

1. create an appointment
2. assign a warehouse and dock door
3. record truck arrival
4. progress the appointment through loading states
5. monitor delays and dock utilization

This MVP is intentionally small so that agent-driven development can complete it end-to-end.

---

## 2. Product Goal

Reduce truck waiting time and dock congestion by creating a simple appointment and check-in workflow for warehouses.

---

## 3. Target Users

### 3.1 Warehouse Operator
Uses the system to:
- create appointments
- assign dock doors
- check vehicles in
- update loading status

### 3.2 Warehouse Supervisor
Uses the system to:
- monitor daily appointment flow
- identify delayed arrivals
- monitor door utilization
- review simple dashboard metrics

### 3.3 Tenant Admin
Uses the system to:
- manage tenant-specific warehouse setup
- create and manage dock doors
- review operational records

---

## 4. MVP Scope

## 4.1 Authentication
Simple local/demo authentication is enough for MVP.
No advanced SSO, RBAC matrix, MFA, or enterprise identity integration in phase 1.

## 4.2 Tenant Context
The system supports multiple tenants.
Each record belongs to a tenant.
A user works within one active tenant context at a time.

## 4.3 Warehouse Setup
The system must support:
- warehouse creation
- dock door creation
- dock door activation / deactivation

## 4.4 Appointment Management
The system must support:
- create appointment
- assign warehouse
- assign dock door
- store planned arrival time
- store vehicle plate number
- optional carrier/company name
- appointment notes

## 4.5 Appointment Lifecycle
Appointment statuses:

- planned
- checked_in
- loading
- completed
- missed
- cancelled

Allowed transitions for MVP:

- planned -> checked_in
- planned -> missed
- planned -> cancelled
- checked_in -> loading
- checked_in -> cancelled
- loading -> completed

No reverse transitions in MVP unless implemented with explicit admin override later.

## 4.6 Check-In
The system must support:
- recording actual arrival time
- marking appointment as checked_in
- viewing which trucks have arrived

## 4.7 Dashboard
The dashboard must show:
- total appointments for today
- delayed appointments
- currently loading appointments
- completed appointments
- average waiting time
- dock door utilization ratio for the day

---

## 5. Out of Scope

These are explicitly out of scope for the PoC:

- SMS / email notifications
- slot optimization with AI/ML
- drag-and-drop planning board
- route integration
- ERP / WMS / TMS integrations
- document upload
- mobile app
- multi-language UI
- advanced permissions
- audit export
- billing/subscription features

---

## 6. Core User Flows

## 6.1 Create Appointment
1. user selects tenant
2. user opens appointment creation form
3. user selects warehouse
4. user selects dock door
5. user enters vehicle plate
6. user enters planned arrival datetime
7. user saves appointment
8. appointment appears in list with status `planned`

## 6.2 Check-In Truck
1. operator opens appointment list
2. operator selects a planned appointment
3. operator clicks check-in
4. system records actual arrival time
5. appointment status becomes `checked_in`

## 6.3 Start Loading
1. operator opens checked-in appointment
2. operator marks status as `loading`

## 6.4 Complete Loading
1. operator opens loading appointment
2. operator marks status as `completed`

## 6.5 Detect Missed Appointment
1. planned arrival time passes
2. operator or scheduled logic marks appointment as `missed`
3. appointment appears in delayed/missed view

---

## 7. Functional Requirements

## 7.1 Tenant
- system stores tenant
- all business records belong to a tenant
- UI must operate in an active tenant context

## 7.2 Warehouse
Fields:
- id
- tenant_id
- name
- code
- is_active
- created_at
- updated_at

## 7.3 Dock Door
Fields:
- id
- tenant_id
- warehouse_id
- name
- code
- is_active
- created_at
- updated_at

## 7.4 Appointment
Fields:
- id
- tenant_id
- warehouse_id
- dock_door_id
- vehicle_plate
- carrier_name (optional)
- planned_arrival_at
- actual_arrival_at (nullable)
- loading_started_at (nullable)
- completed_at (nullable)
- status
- notes (nullable)
- created_at
- updated_at

## 7.5 Validation Rules
- warehouse is required
- dock door is required
- vehicle plate is required
- planned arrival datetime is required
- inactive dock doors cannot be used
- dock door must belong to selected warehouse
- dock door and warehouse must belong to active tenant

---

## 8. Non-Functional Requirements

- application must run locally with one command
- local development should use Docker Compose
- code should be simple and readable
- every behavior change should be covered by tests where practical
- docs must be updated when domain behavior changes
- build, lint, and tests must be scriptable
- the system should seed demo data for easy testing

---

## 9. Suggested Tech Stack

- Frontend: Next.js
- Backend: NestJS
- Database: PostgreSQL
- E2E: Playwright
- Environment: Docker Compose

---

## 10. API Areas

Initial API modules:

- auth
- tenants
- warehouses
- dock-doors
- appointments
- dashboard

---

## 11. Initial Screens

- login page
- tenant selection page or tenant switcher
- dashboard
- appointment list
- appointment detail
- appointment create form
- warehouse management
- dock door management

---

## 12. Metrics Definition

### 12.1 Delayed Appointment
An appointment is delayed when:
- status is `planned`
- current time is later than planned arrival time

### 12.2 Average Waiting Time
Average of:
`actual_arrival_at - planned_arrival_at`
for appointments that have checked in

### 12.3 Dock Utilization Ratio
Simple MVP approximation:
`number of appointments assigned to a dock today / total available dock count`

This is intentionally basic for the PoC.

---

## 13. Definition of MVP Done

The MVP is done when:

- repo boots locally
- database migrations exist
- demo seed data exists
- appointments can be created from UI
- appointments can be checked in
- appointments can move to loading and completed
- dashboard shows basic metrics
- tests run successfully
- docs are updated