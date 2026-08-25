# CRM/ERP Frontend Application

A modern, responsive, and enterprise-grade CRM (Customer Relationship Management) and ERP (Enterprise Resource Planning) frontend application built with Next.js (App Router), Tailwind CSS, and shadcn/ui.

## 🌟 Features

- **Interactive Dashboard:** Overview of metrics, recent activities, and quick actions.
- **Client Management:** List, add, and manage client details with robust data tables.
- **Task Management (List & Kanban View):** 
  - Switch seamlessly between List and drag-and-drop Kanban board views.
  - Interactive right-side panel for viewing and editing task details, including subtasks and activity history.
- **Project Tracking:** Monitor project statuses, deadlines, and assigned teams.
- **Invoicing System:** Manage and generate invoices with status tracking, dynamic line items, and detailed views.
- **Team Management:** Team listing, individual member details, and comprehensive team analytics.
- **Reporting & Analytics:** In-depth interactive charts (Recharts) for revenue, tasks, and project tracking.
- **Messaging/Chat:** Built-in team communication interface.
- **Real-time Updates:** Ready for Socket.io integration for instant notifications.
- **Beautiful UI/UX:** Built with Tailwind CSS and fully customizable accessible components from shadcn/ui.

## 🛠 Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** React Query & Axios
- **Drag and Drop:** [@dnd-kit](https://dndkit.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Forms & Validation:** React Hook Form & Zod
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18 or newer) installed on your system.

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fbint-crm-frontend
```

2. Install the dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configure Environment Variables:
Create a `.env.local` file in the root of the project and add your variables. Example:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Folder Structure

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts)
│   ├── (auth)/           # Authentication pages (Login, Register)
│   ├── (dashboard)/      # Main application routes (Tasks, Clients, etc.)
│   ├── layout.tsx        # Root layout with global providers
│   └── page.tsx          # Landing/Redirect logic
├── components/           # React components
│   ├── ui/               # Reusable UI primitives (shadcn/ui)
│   ├── layout/           # Global layouts (Sidebar, Header)
│   ├── dashboard/        # Dashboard specific components
│   ├── tasks/            # Task management components (Kanban, etc.)
│   ├── team/             # Team management & analytics components
│   └── reports/          # Reports & analytics components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── services/             # API services and network calls
├── store/                # Global state stores (Zustand)
└── types/                # TypeScript interfaces and types
```

## 🎨 UI & Design Principles
- The application focuses on a clean, enterprise-grade interface.
- All form inputs, selects, and textareas use a consistent `5px` (`rounded-xs`) border radius.
- Interactive elements provide immediate visual feedback (hover states, active states, loading skeletons).

## 📄 License
This project is proprietary and confidential.
