import { apiClient } from "@/api/client";
import { API_ENDPOINTS } from "@/config/api.config";
import type { User, LoginRequest, RegisterRequest } from "../types";

export const authApi = {
  // Authentication
  login: async (credentials: LoginRequest): Promise<User> => {
    // Backend returns user in data property
    return apiClient.post<User>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  register: async (userData: RegisterRequest): Promise<User> => {
    return apiClient.post<User>(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  logout: async (): Promise<void> => {
    return apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT);
  },
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    return apiClient.put<User>(API_ENDPOINTS.AUTH.PROFILE, userData);
  },

  getCurrentUser: async (): Promise<User> => {
    return apiClient.get<User>(API_ENDPOINTS.AUTH.PROFILE);
  },
} as const;
