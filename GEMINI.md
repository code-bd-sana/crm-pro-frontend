# CRM/ERP Frontend - AI Development Rules & Context

## 1. Tech Stack & Core Libraries
- **Framework:** Next.js (App Router)
- **Language:** strict TypeScript (`strict: true`)
- **Styling:** Tailwind CSS / shadcn/ui
- **State Management:** Zustand (Client state)
- **Data Fetching:** React Query (Server state) & Axios
- **Real-time:** `socket.io-client`
- **Form Handling:** `react-hook-form` + `zod` validation

---

## 2. API Integration Guidelines

### Base Setup
- **API Base URL:** `NEXT_PUBLIC_API_URL` environment variable.
- **Authentication:** 
  - All protected API calls must include the Bearer Token in the headers: `Authorization: Bearer <token>`.
  - Store token securely (HttpOnly Cookies preferred, fallback to LocalStorage/Zustand persist).
  - Implement a global Axios interceptor (`src/lib/axios.ts`) to attach the token to every request and handle `401 Unauthorized` responses by redirecting to `/login` and clearing the state.

### Socket.io (Real-time Notifications)
- **Connection URL:** `NEXT_PUBLIC_SOCKET_URL`
- **Event to Emit on Login:** `joinUserRoom` with the logged-in `userId` as the payload.
- **Event to Listen For:** `newNotification`. When this triggers, show a toast/notification popup.

---

## 3. Architectural Guidelines & Directory Structure
Follow a modular, feature-based architecture (Industry Standard for scalable Next.js apps):

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
│   ├── (auth)/           # Route group for auth (login, register)
│   ├── (dashboard)/      # Route group for internal app pages
│   ├── layout.tsx        # Root layout (Providers go here)
│   └── page.tsx          # Landing/Redirect
├── components/           # Shared/Reusable UI components
│   ├── ui/               # Generic UI elements (shadcn/ui primitives)
│   ├── layout/           # Layout specific components (Sidebar, Topbar)
│   └── shared/           # Common complex components (DataTables, Modals)
├── hooks/                # Custom React Hooks (useAuth, useDebounce)
├── lib/                  # Configurations and utilities (axios.ts, utils.ts)
├── services/             # API call definitions (auth.service.ts, user.service.ts)
├── store/                # Global state stores (Zustand)
├── types/                # TypeScript definitions matching Backend DTOs
└── utils/                # Helper functions (formatting, parsers)
```

---

## 4. Code Quality & AI Generation Rules

- **Component Structure:** Write functional components using React Hooks. Keep components small and reusable.
- **Styling:** Use Tailwind CSS utility classes. Avoid inline CSS (`style={{}}`) unless dynamically calculated.
- **Type Safety:** Use strict TypeScript. Create interfaces/types for all API responses matching the backend DTOs.
- **Error Handling:** Always implement `try-catch` blocks in API calls. Show user-friendly error messages using Toast notifications.
- **Loading States:** Every data-fetching component must have a Skeleton loader or Spinner while data is loading.
- **No Dummy Data:** Never hardcode dummy data unless explicitly asked for a UI mockup. Always wire components to the `services/` API logic.
- **Responsive Design:** Ensure all pages and tables are mobile-responsive and look great on all screen sizes.

---

## 5. UI/UX Principles
- **Clean Interface:** Keep the UI enterprise-grade, clean, and not cluttered.
- **Feedback:** Provide immediate visual feedback for all user actions (Buttons changing to loading state, success/error toasts).
- **Modals vs Pages:** Use Modals for quick actions (e.g., Create Task, Add Comment). Use dedicated pages for heavy forms (e.g., Create Project).
