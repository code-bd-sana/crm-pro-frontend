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

export interface Role {
  id: string;
  name: SystemRoles | string;
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
