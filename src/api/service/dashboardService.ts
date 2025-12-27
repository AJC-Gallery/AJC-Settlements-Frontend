// src/api/services/dashboard.service.ts

import { apiClient, extractData } from '../client';
import { DASHBOARD_ENDPOINTS } from '../endpoints';
import type { ApiResponse } from '../types';

/**
 * Dashboard Service
 * All dashboard-related API calls
 */

// Define your dashboard types here or import from features/dashboard/types
interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  // Add more fields as needed
}

export const dashboardService = {
  /**
   * Get dashboard statistics
   */
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<ApiResponse<DashboardStats>>(
      DASHBOARD_ENDPOINTS.STATS
    );
    return extractData(response);
  },

  /**
   * Get dashboard overview
   */
  getOverview: async (): Promise<unknown> => {
    const response = await apiClient.get<ApiResponse<unknown>>(
      DASHBOARD_ENDPOINTS.OVERVIEW
    );
    return extractData(response);
  },

  // Add more dashboard service methods as needed
};