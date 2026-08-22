# Frontend Requirements Specification

## 1. Project Overview
This document outlines the frontend requirements for the CRM/ERP web application. The frontend is built using Next.js (App Router), styled with Tailwind CSS and shadcn/ui, and integrated with a NestJS + PostgreSQL backend.

## 2. Core Features

### 2.1 Authentication & Authorization
- **Login/Logout:** JWT based authentication via Bearer token.
- **Session Management:** Persisted state using Zustand. Expired tokens must trigger an automatic logout via Axios interceptors.
- **Role-Based Access Control (RBAC):** UI elements and routes must be conditionally rendered based on user roles (e.g., Admin, Manager, Employee).

### 2.2 Dashboard
- **Overview Metrics:** Summary cards showing key statistics (Active Projects, Pending Tasks, Recent Invoices).
- **Charts:** Visual representation of data using charts (e.g., Recharts).
- **Real-time Notifications:** Socket.io integration to display instant toast notifications for specific events (e.g., new task assigned).

### 2.3 Modules
- **Projects Management:** List view, detail view, create, and edit projects.
- **Task Management:** Kanban board or list view with drag-and-drop capabilities.
- **Team/Users:** Directory of team members and role management.
- **Invoices:** Billing overview and invoice generation/download functionality.

## 3. Technical Requirements
- **Responsive Design:** Mobile-first approach. All interfaces must be fully usable on mobile, tablet, and desktop devices.
- **Performance:** 
  - Optimal Core Web Vitals.
  - Usage of React Query for caching, deduplicating requests, and background data fetching.
- **Type Safety:** Strict TypeScript rules. API responses must be strongly typed based on backend DTOs.
- **Form Handling:** Complex forms managed by `react-hook-form` with `zod` for client-side schema validation.

## 4. UI/UX Standards
- **Component Library:** Utilize shadcn/ui primitives.
- **Feedback & States:** 
  - Proper loading skeletons for all data-fetching operations.
  - Empty states for tables/lists with no data.
  - Toast notifications for success, error, and info events.


