import { User, Role } from './auth.types';

export interface Department {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Ensure Role from auth.types matches this structure, or extend it.
export interface RoleDetails extends Role {
  description?: string;
  isSystem: boolean;
  createdAt: string;
}

export interface UserDetails extends User {
  phone?: string;
  jobTitle?: string;
  startDate?: string;
  departmentId?: string;
  department?: Department;
  createdAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: PaginationMeta;
}

export interface CreateUserDto {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  departmentId?: string;
  jobTitle?: string;
  startDate?: string;
  roleIds?: string[];
  isActive?: boolean;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}

export interface CreateRoleDto {
  name: string;
  description?: string;
  permissionIds: string[];
}

export interface UpdateRoleDto extends Partial<CreateRoleDto> {}

export interface CreateDepartmentDto {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateDepartmentDto extends Partial<CreateDepartmentDto> {}

// ============================================================
// Clients Module
// ============================================================


export enum ClientStatus {
  LEAD = 'LEAD',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface ClientCommunication {
  id: string;
  clientId: string;
  type: string;
  content: string;
  date: string;
  createdAt: string;
}

export interface Client {
  id: string;
  user?: any; // The user who manages this client

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
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;

}

export interface CreateClientDto {
  companyName: string;
  contactPerson?: string;
  email: string;

  phone?: string;
  website?: string;
  industry?: string;
  address?: string;
  tags?: string[];
  status?: ClientStatus;
  notes?: string;

}

export interface UpdateClientDto extends Partial<CreateClientDto> {}

export interface QueryClientDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: ClientStatus;
  tag?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}


// ============================================================
// Projects Module
// ============================================================

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ProjectPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum MilestoneStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  dueDate?: string | null;
  status: MilestoneStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMilestoneDto {
  title: string;
  dueDate?: string;
  status?: MilestoneStatus;
}

export type UpdateMilestoneDto = Partial<CreateMilestoneDto>;

export interface Project {
  id: string;
  client?: Client;
  title: string;
  description?: string | null;
  budget: number;
  priority: ProjectPriority;
  status: ProjectStatus;
  progress: number;
  startDate?: string | null;
  dueDate?: string | null;
  milestones?: ProjectMilestone[];
  members?: User[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateProjectDto {
  title: string;
  description?: string;
  clientId: string;
  budget?: number;
  priority?: ProjectPriority;
  status?: ProjectStatus;
  startDate?: string;
  dueDate?: string;
  memberIds?: string[];
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {
  progress?: number;
}

// ============================================================
// Tasks Module
// ============================================================

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface Task {
  id: string;
  project?: Project;
  // API responses expose relations only (project/assignee objects), not raw FK ids
  projectId?: string;
  assignee?: User | null;
  assigneeId?: string | null;
  title: string;
  description?: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string | null;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  projectId: string;
  assigneeId?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string;
  tags?: string[];
}

export interface UpdateTaskDto extends Partial<Omit<CreateTaskDto, "assigneeId" | "projectId">> {
  assigneeId?: string | null;
}

export interface Subtask {
  id: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubtaskDto {
  title: string;
  isCompleted?: boolean;
}

export type UpdateSubtaskDto = Partial<CreateSubtaskDto>;

export interface TaskComment {
  id: string;
  taskId: string;
  user: User;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// Invoices Module
// ============================================================

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

export enum Currency {
  BDT = 'BDT',
  USD = 'USD',
  EUR = 'EUR',
}

export enum PaymentMethod {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_BANKING = 'MOBILE_BANKING',
  CARD = 'CARD',
  OTHER = 'OTHER',
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface InvoicePayment {
  id: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  transactionId?: string | null;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client?: Client;
  project?: Project | null;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  currency: Currency;
  subTotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  notes?: string | null;
  termsAndConditions?: string | null;
  items?: InvoiceItem[];
  payments?: InvoicePayment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvoiceItemDto {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateInvoiceDto {
  clientId: string;
  projectId?: string;
  issueDate: string;
  dueDate: string;
  currency?: Currency;
  taxAmount?: number;
  discountAmount?: number;
  notes?: string;
  termsAndConditions?: string;
  items: CreateInvoiceItemDto[];
}

export interface UpdateInvoiceDto {
  status?: InvoiceStatus;
  notes?: string;
  termsAndConditions?: string;
}
