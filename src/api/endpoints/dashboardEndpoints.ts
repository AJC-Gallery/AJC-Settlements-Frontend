 
/**
 * Dashboard API Endpoints
 * Add your dashboard-related endpoints here
 */
export const DASHBOARD_ENDPOINTS = {
  STATS: '/dashboard/stats',
  OVERVIEW: '/dashboard/overview',
  // Add more dashboard endpoints as needed
} as const;

export type DashboardEndpoint = typeof DASHBOARD_ENDPOINTS[keyof typeof DASHBOARD_ENDPOINTS];