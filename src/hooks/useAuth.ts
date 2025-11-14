// src/hooks/useAuth.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/api/service';
import type { 
  LoginRequest, 
  RegisterRequest, 
  User 
} from '@/features/auth/types';

/**
 * Query Keys for Auth
 */
export const AUTH_QUERY_KEYS = {
  currentUser: ['auth', 'currentUser'] as const,
  verifyToken: ['auth', 'verifyToken'] as const,
};

/**
 * Hook: Get current authenticated user
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentUser,
    queryFn: authService.getCurrentUser,
    retry: false, // Don't retry on 401
    staleTime: Infinity, // User data rarely changes during session
  });
};

/**
 * Hook: Verify token validity
 */
export const useVerifyToken = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.verifyToken,
    queryFn: authService.verifyToken,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook: Register new user
 */
export const useRegister = () => {
//   const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (user: User) => {
      console.log('✅ Registration successful:', user);
      // Optionally auto-login or redirect
    },
    onError: (error: { message: string }) => {
      console.error('❌ Registration failed:', error.message);
    },
  });
};

/**
 * Hook: Login user
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      console.log('✅ Login successful:', response.user);
      
      // Invalidate and refetch current user
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
      
      // Set user data in cache immediately
      queryClient.setQueryData(AUTH_QUERY_KEYS.currentUser, response.user);
    },
    onError: (error: { message: string }) => {
      console.error('❌ Login failed:', error.message);
    },
  });
};

/**
 * Hook: Logout user
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      console.log('✅ Logout successful');
      
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.verifyToken });
      
      // Clear all cached data
      queryClient.clear();
    },
    onError: (error: { message: string }) => {
      console.error('❌ Logout failed:', error.message);
      
      // Still clear cache even if logout fails
      queryClient.clear();
    },
  });
};

/**
 * Helper: Check if user is authenticated
 */
export const useIsAuthenticated = (): boolean => {
  const { data: user, isSuccess } = useCurrentUser();
  return isSuccess && !!user;
};