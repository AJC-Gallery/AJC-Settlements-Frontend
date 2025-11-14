// src/hooks/index.ts

// Auth hooks
export {
  useCurrentUser,
  useVerifyToken,
  useRegister,
  useLogin,
  useLogout,
  useIsAuthenticated,
  AUTH_QUERY_KEYS,
} from './useAuth';

// Dashboard hooks
export {
  useDashboardStats,
  useDashboardOverview,
  DASHBOARD_QUERY_KEYS,
} from './useDashboard';