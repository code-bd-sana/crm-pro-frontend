// ============================================================
// Auth & User Types — matching backend response DTOs exactly
// ============================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  /** Derived from firstName + lastName for display */
  fullName?: string;
  role: string;
  department?: string;
  avatar?: string;
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

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
