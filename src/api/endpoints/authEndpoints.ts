 
/**
 * Authentication API Endpoints
 * Centralized endpoint URLs for auth-related API calls
 */
export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  VERIFY_TOKEN: '/auth/verify-token',
} as const;

export type AuthEndpoint = typeof AUTH_ENDPOINTS[keyof typeof AUTH_ENDPOINTS];