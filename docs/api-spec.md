# CRM Backend API Specification (Frontend Reference)

This document provides a quick reference for the key backend endpoints available for the frontend to consume. 
**Base URL:** `http://localhost:3000/api` (or environment equivalent)
**Global Headers:** `Authorization: Bearer <JWT_TOKEN>` (for all routes except `/auth/login` and `/auth/register`)

---

## 1. Authentication
- `POST /auth/register` - Register a new user. 
  - *Payload:* `{ email, password, firstName, lastName }`
- `POST /auth/login` - Authenticate a user.
  - *Payload:* `{ email, password }`
  - *Response:* `{ user, accessToken, refreshToken }`
- `POST /auth/refresh` - Refresh access token.
  - *Payload:* `{ refreshToken }`

## 2. Team & Users
- `GET /users` - List all users (Team members). Supports pagination `?page=1&limit=10`.
- `POST /users` - Create a new user and assign roles/departments.
- `GET /users/:id` - Get a specific user's details.
- `PATCH /users/:id` - Update user details.
- `DELETE /users/:id` - Soft delete user.

## 3. Departments
- `GET /departments` - List all departments.
- `POST /departments` - Create department. *Payload:* `{ name, description }`
- `PATCH /departments/:id` - Update department.
- `DELETE /departments/:id` - Delete department.

## 4. Roles & Permissions (Admin)
- `GET /roles` - List all roles and their permissions.
- `POST /roles` - Create a role with specific permissions.
- `POST /roles/assign` - Assign a role to a user. *Payload:* `{ userId, roleId }`

## 5. Clients
- `GET /clients` - List all clients. Supports search and pagination.
- `POST /clients` - Create client. *Payload:* `{ companyName, contactPerson, email, phone, address, status }`
- `GET /clients/:id` - Get client details (includes linked projects and invoices).
- `POST /clients/:id/communications` - Add a communication log (Note/Email log) for a client.

## 6. Projects
- `GET /projects` - List projects. Filter by `?clientId=` or `?status=`.
- `POST /projects` - Create a project. *Payload:* `{ title, description, budget, startDate, endDate, clientId, memberIds: [uuid] }`
- `PATCH /projects/:id` - Update project details.
- `POST /projects/:id/milestones` - Add a milestone to a project.

## 7. Tasks
- `GET /tasks` - List tasks. Filters: `?projectId=`, `?assigneeId=`, `?status=`.
- `POST /tasks` - Create a task. *Payload:* `{ title, description, priority, status, dueDate, projectId, assigneeId }`
- `PATCH /tasks/:id` - Update task status/priority.
- `POST /tasks/:id/subtasks` - Create a subtask checklist item.
- `PATCH /tasks/:id/subtasks/:subId` - Mark subtask complete.
- `POST /tasks/:id/comments` - Add a comment to a task.

## 8. Invoices & Payments
- `GET /invoices` - List invoices.
- `POST /invoices` - Create invoice. *Payload:* `{ clientId, projectId, issueDate, dueDate, discount, taxRate, notes, items: [{ description, quantity, unitPrice }] }`
- `GET /invoices/:id` - Get full invoice details.
- `POST /invoices/:id/payments` - Add a payment log. *Payload:* `{ amount, paymentMethod, paymentDate, referenceNumber }`

## 9. Analytics
- `GET /analytics/team` - Get global team performance (Task completion rate, Dept stats, Top performers).
- `GET /analytics/users/:id/stats` - Get active tasks/projects and completion rate for a specific user.

## 10. Notifications (Real-time)
- `GET /notifications` - List recent notifications for the logged-in user.
- `PATCH /notifications/:id/read` - Mark a specific notification as read.
- `PATCH /notifications/mark-all-read` - Mark all notifications as read.

## 11. Settings (Admin)
- `GET /settings` - Fetch all system settings (Returns key-value object).
- `PATCH /settings` - Update multiple settings at once. *Payload:* `{ settings: { COMPANY_NAME: "My CRM", TAX_RATE: 15 } }`

---
*Note: For exact request/response schemas, always check the Swagger UI at `http://localhost:3000/api` while the backend is running.*
