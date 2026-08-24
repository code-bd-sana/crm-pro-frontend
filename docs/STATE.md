# Project State & Progress Tracker

This document tracks the ongoing progress of the CRM/ERP Frontend project. **AI Agents must read this file at the start of any new session** to understand what has been completed and what is currently pending.

## 🟢 Completed Tasks
- [x] Initialized Next.js App Router project.
- [x] Created standard AI guidelines (`GEMINI.md`, `AGENTS.md`).
- [x] Created `docs/requirements.md` based on backend rules.
- [x] Created `docs/api-spec.md` with endpoints and integration standards (Socket.io, Token Refresh, Pagination).
- [x] Initial project setup & core package installation (Zustand, React Query, Axios, Socket.io-client, shadcn/ui).
- [x] Set up Global Axios Interceptor and Auth Store.
- [x] Phase 3: Authentication & Core Layouts (Login Page, Sidebar, Topbar, Dashboard Layout).
- [x] **Projects Module (Partial):** Project Details page (Overview tab, Milestones, Recent Tasks) aligned with Figma.
- [x] **Tasks Module:** Built the global Tasks page with a toggleable List View (Data Table) and Kanban Board View (featuring Drag and Drop using `@dnd-kit`).

## 🟡 In Progress
- [ ] Projects Module (Remaining tabs and Project List page).
- [ ] Phase 4: Dashboard Metrics & Real-time Integration.

## 🔴 Pending Tasks / Roadmap

### Phase 4: Dashboard Metrics & Real-time Integration
- [ ] Build Dashboard overview metrics & charts.
- [ ] Integrate Real-time Socket.io (`joinUserRoom` and `newNotification`).

### Phase 3: Modules (CRUD)
- [ ] Users & Team Module.
- [ ] Clients & Departments Modules.
- [ ] Invoices & Analytics Modules.

### Other / Tech Debt
- [ ] Setup Role-Based Access Control (RBAC) logic for routes and menus.

---
**Note for AI:** Whenever a task is completed, update this file to mark it `[x]` and move the next relevant task to the `In Progress` section.
