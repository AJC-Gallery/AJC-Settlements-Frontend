// src/hooks/useDashboard.ts

import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/api/service';

/**
 * Query Keys for Dashboard
 */
export const DASHBOARD_QUERY_KEYS = {
  stats: ['dashboard', 'stats'] as const,
  overview: ['dashboard', 'overview'] as const,
};

/**
 * Hook: Get dashboard statistics
 */
export const useDashboardStats = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.stats,
    queryFn: dashboardService.getStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook: Get dashboard overview
 */
export const useDashboardOverview = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.overview,
    queryFn: dashboardService.getOverview,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Add more dashboard hooks as needed