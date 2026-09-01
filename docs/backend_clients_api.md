# Backend Clients API Specification

This document is extracted from the backend source code (`fbintbd-crm`) and defines the schema, DTOs, and expected behavior for the Clients module.

## Client Entity Schema

```typescript
export enum ClientStatus {
  LEAD = 'LEAD',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface Client {
  id: string;
  user: User; // The user who manages this client (nullable)
  companyName: string;
  contactPerson?: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  address?: string;
  tags?: string[];
  status: ClientStatus;
  notes?: string;
  communications?: ClientCommunication[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
```

## DTOs

### CreateClientDto / UpdateClientDto
- `companyName`: string (required)
- `email`: string (required, must be valid email)
- `contactPerson`: string (optional)
- `phone`: string (optional)
- `website`: string (optional)
- `industry`: string (optional)
- `address`: string (optional)
- `tags`: string[] (optional)
- `status`: ClientStatus (optional, default: `LEAD`)
- `notes`: string (optional)

### QueryClientDto (Pagination & Filtering)
The `GET /api/v1/clients` endpoint expects the following query parameters:
- `page`: number (default: 1)
- `limit`: number (default: 10, max: 100)
- `search`: string (optional, searches by company name, contact, or email)
- `status`: ClientStatus (optional)
- `tag`: string (optional)

## Important Notes for Frontend Implementation
- **LTV Field:** The backend does NOT have an `ltv` (Lifetime Value) field. The frontend should not include this in the creation form or table unless the backend is updated.
- **Status:** Status is not a boolean. It must be sent as `LEAD`, `ACTIVE`, or `INACTIVE`.
- **Server-Side Pagination:** Since the backend supports `page`, `limit`, and `search` out of the box, the frontend listing page should implement server-side pagination and debounced searching rather than fetching all records at once.
