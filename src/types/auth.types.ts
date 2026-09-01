// ============================================================
// Auth & User Types — matching backend response DTOs exactly
// ============================================================

export enum SystemRoles {
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  STAFF = 'Staff',
  CLIENT = 'Client',
}

export enum PermissionEnum {
  CLIENTS_READ = 'clients.read',
  CLIENTS_CREATE = 'clients.create',
  CLIENTS_UPDATE = 'clients.update',
  CLIENTS_DELETE = 'clients.delete',

  PROJECTS_READ = 'projects.read',
  PROJECTS_CREATE = 'projects.create',
  PROJECTS_UPDATE = 'projects.update',
  PROJECTS_DELETE = 'projects.delete',

  TASKS_READ = 'tasks.read',
  TASKS_CREATE = 'tasks.create',
  TASKS_UPDATE = 'tasks.update',
  TASKS_DELETE = 'tasks.delete',

  INVOICES_READ = 'invoices.read',
  INVOICES_CREATE = 'invoices.create',
  INVOICES_UPDATE = 'invoices.update',
  INVOICES_DELETE = 'invoices.delete',

  TEAM_READ = 'team.read',
  TEAM_CREATE = 'team.create',
  TEAM_UPDATE = 'team.update',
  TEAM_DELETE = 'team.delete',

  DEPARTMENTS_READ = 'departments.read',
  DEPARTMENTS_CREATE = 'departments.create',
  DEPARTMENTS_UPDATE = 'departments.update',
  DEPARTMENTS_DELETE = 'departments.delete',

  REPORTS_READ = 'reports.read',
  REPORTS_EXPORT = 'reports.export',

  DASHBOARD_READ = 'dashboard.read',

  SETTINGS_READ = 'settings.read',
  SETTINGS_UPDATE = 'settings.update',

  ROLES_READ = 'roles.read',
  ROLES_CREATE = 'roles.create',
  ROLES_UPDATE = 'roles.update',
  ROLES_DELETE = 'roles.delete',
}

export interface Permission {
  id: string;
  slug: string;
  module: string;
  description?: string;
}

export interface Role {
  id: string;
  name: SystemRoles | string;
  permissions?: Permission[];
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface User {
  id: string;
  email: string;
  isActive: boolean;
  phone?: string;
  jobTitle?: string;
  departmentId?: string;
  department?: { id: string; name: string };
  profile?: UserProfile;
  roles?: Role[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthData;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

/** Matches ResetPasswordDto on the backend */
export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface MessageResponse {
  message: string;
}
