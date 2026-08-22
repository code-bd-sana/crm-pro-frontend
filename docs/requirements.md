# Frontend Requirements Specification

## 1. Project Overview
This document outlines the frontend requirements for the CRM/ERP web application. The frontend is built using Next.js (App Router), styled with Tailwind CSS and shadcn/ui, and integrated with a NestJS + PostgreSQL backend.

## 2. Core Features & Modules
The application is modularized into the following core areas:
- **Authentication:** Login/Logout (JWT based via Bearer token).
- **Dashboard:** Overview metrics, charts, and real-time notifications.
- **Projects Management:** List view, detail view, create, and edit projects.
- **Task Management:** Kanban board or list view with drag-and-drop capabilities.
- **Team/Users:** Directory of team members and role management.
- **Invoices:** Billing overview and invoice generation/download functionality.

## 3. API & Real-time Integration
- **API Base URL:** `http://localhost:3000/api` (or environment variable).
- **Authentication:** All protected API calls must include `Authorization: Bearer <token>`.
- **Axios Interceptor:** Implement a global interceptor to handle `401 Unauthorized` responses and redirect to the login page.
- **Socket.io Connection:** `http://localhost:3000`
- **Real-time Events:** 
  - Emit `joinUserRoom` with `userId` on login.
  - Listen for `newNotification` and display a toast popup.
- **Error Handling:** Always implement `try-catch` blocks in API calls. Show user-friendly error messages using Toast notifications.
- **No Dummy Data:** Never hardcode dummy data unless explicitly asked for a UI mockup. Always wire components to the `services/` API logic.

## 4. Technical & Code Quality Requirements
- **Framework & Routing:** Next.js with App Router.
- **State Management:** Zustand (Client state), React Query (Server state).
- **Component Structure:** Write functional components using React Hooks. Keep components small and reusable.
- **Styling:** Use Tailwind CSS utility classes. Avoid inline CSS (`style={{}}`) unless dynamically calculated.
- **Type Safety:** Use strict TypeScript. Create interfaces/types for all API responses matching the backend DTOs.
- **Form Handling:** Complex forms managed by `react-hook-form` with `zod` for client-side schema validation.
- **Responsive Design:** Mobile-first approach. Ensure all pages and tables are mobile-responsive and look great on all screen sizes.

## 5. UI/UX Principles
- **Clean Interface:** Keep the UI enterprise-grade, clean, and not cluttered.
- **Component Library:** Utilize shadcn/ui primitives.
- **Feedback:** Provide immediate visual feedback for all user actions (Buttons changing to loading state, success/error toasts).
- **Loading States:** Every data-fetching component must have a Skeleton loader or Spinner while data is loading. Empty states must be shown for tables/lists with no data.
- **Modals vs Pages:** Use Modals for quick actions (e.g., Create Task, Add Comment). Use dedicated pages for heavy forms (e.g., Create Project).
