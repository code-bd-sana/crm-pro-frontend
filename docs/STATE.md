# Project State & Progress Tracker

This document tracks the ongoing progress of the CRM/ERP Frontend project. **AI Agents must read this file at the start of any new session** to understand what has been completed and what is currently pending.

## 🟢 Completed Tasks
- [x] Initialized Next.js App Router project.
- [x] Created standard AI guidelines (`GEMINI.md`, `AGENTS.md`).
- [x] Created `docs/requirements.md` based on backend rules.
- [x] Created `docs/api-spec.md` with endpoints and integration standards (Socket.io, Token Refresh, Pagination).

## 🟡 In Progress
- [ ] Initial project setup & core package installation (Zustand, React Query, Axios, Socket.io-client, shadcn/ui).
- [ ] Setting up Global Axios Interceptor and Auth Store.

## 🔴 Pending Tasks / Roadmap

### Phase 1: Core Setup & Authentication
- [ ] Install and configure Tailwind CSS & shadcn/ui.
- [ ] Set up `src/lib/axios.ts` with interceptors.
- [ ] Set up `src/store/useAuthStore.ts` (Zustand).
- [ ] Build Login/Register Pages (`src/app/(auth)/login/page.tsx`).

### Phase 2: Layout & Dashboard
- [ ] Build authenticated layout (`src/app/(dashboard)/layout.tsx`) with Sidebar & Navbar.
- [ ] Build Dashboard overview metrics & charts.
- [ ] Integrate Real-time Socket.io (`joinUserRoom` and `newNotification`).

### Phase 3: Modules (CRUD)
- [ ] Users & Team Module.
- [ ] Projects Module.
- [ ] Tasks Module (Kanban board / List view).
- [ ] Clients & Departments Modules.
- [ ] Invoices & Analytics Modules.

---
**Note for AI:** Whenever a task is completed, update this file to mark it `[x]` and move the next relevant task to the `In Progress` section.
