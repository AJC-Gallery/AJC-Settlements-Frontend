
import { apiClient, extractData } from '../client';
import { AUTH_ENDPOINTS } from '../endpoints';
import type { ApiResponse } from '../types';
import type { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User 
} from '@/features/auth/types';

/**
 * Authentication Service
 * All auth-related API calls
 */
export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<User> => {
    const response = await apiClient.post<ApiResponse<User>>(
      AUTH_ENDPOINTS.REGISTER,
      data
    );
    return extractData(response);
  },

  /**
   * Login user (token will be set in httpOnly cookie automatically)
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      AUTH_ENDPOINTS.LOGIN,
      data
    );
    return extractData(response);
  },

  /**
   * Logout user (clears httpOnly cookie)
   */
  logout: async (): Promise<void> => {
    await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(AUTH_ENDPOINTS.ME);
    return extractData(response);
  },

  /**
   * Verify if token is still valid
   */
  verifyToken: async (): Promise<{ valid: boolean; user: Partial<User> }> => {
    const response = await apiClient.get<ApiResponse<{ valid: boolean; user: Partial<User> }>>(
      AUTH_ENDPOINTS.VERIFY_TOKEN
    );
    return extractData(response);
  },
};