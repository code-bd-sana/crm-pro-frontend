import { api } from '@/lib/axios';
import type {
  AuthResponse,
  ForgotPasswordPayload,
  LoginPayload,
  MessageResponse,
  RefreshTokenPayload,
  RefreshTokenResponse,
  RegisterPayload,
  ResetPasswordPayload,
} from '@/types/auth.types';

/**
 * Authenticates a user with email and password.
 * Returns the user object, accessToken, and refreshToken.
 */
export const login = (payload: LoginPayload): Promise<AuthResponse> =>
  api.post<AuthResponse>('/auth/login', payload).then((res) => res.data);

/**
 * Registers a new user account.
 */
export const register = (payload: RegisterPayload): Promise<AuthResponse> =>
  api.post<AuthResponse>('/auth/register', payload).then((res) => res.data);

/**
 * Uses the stored refreshToken to obtain a new accessToken.
 * Called automatically by the Axios interceptor on 401 responses.
 */
export const refreshToken = (
  payload: RefreshTokenPayload,
): Promise<RefreshTokenResponse> =>
  api
    .post<RefreshTokenResponse>('/auth/refresh', payload)
    .then((res) => res.data);

/**
 * Sends a password-reset email to the provided address.
 * POST /auth/forgot-password  →  { email }
 */
export const forgotPassword = (
  payload: ForgotPasswordPayload,
): Promise<MessageResponse> =>
  api
    .post<MessageResponse>('/auth/forgot-password', payload)
    .then((res) => res.data);

/**
 * Resets the user's password using the token from the email link.
 * POST /auth/reset-password  →  { token, newPassword }
 */
export const resetPassword = (
  payload: ResetPasswordPayload,
): Promise<MessageResponse> =>
  api
    .post<MessageResponse>('/auth/reset-password', payload)
    .then((res) => res.data);
