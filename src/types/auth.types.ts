// ============================================================
// Auth & User Types — matching backend response DTOs exactly
// ============================================================

export interface Role {
  id: string;
  name: string;
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
