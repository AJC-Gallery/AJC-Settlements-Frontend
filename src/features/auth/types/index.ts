import type { BaseEntity, Gender } from "@/types/common";

export interface User extends BaseEntity {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  gender: Gender;
  nationality: string;
  avatar?: string;
  isEmailVerified: boolean;
  lastLoginAt?: string;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}


export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  nationality: string;
}


export interface AuthResponse {
  user: User;
  message: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
  confirmPassword: string;
}