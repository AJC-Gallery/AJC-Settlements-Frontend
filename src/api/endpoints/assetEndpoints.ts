// src/api/endpoints/assets.endpoints.ts

/**
 * Assets API Endpoints
 * Centralized endpoint URLs for asset-related API calls
 */
export const ASSETS_ENDPOINTS = {
  // Asset Categories
  CATEGORIES: "/assets/categories",
  CATEGORY_BY_ID: (id: string) => `/assets/categories/${id}`,
  RESTORE_CATEGORY: (id: string) => `/assets/categories/${id}/restore`,

  // Assets
  ASSETS: "/assets",
  MY_ASSETS: "/assets/my-assets", // ✅ NEW - Get user's own assets
  ASSET_BY_ID: (id: string) => `/assets/${id}`,
  ASSET_STATS: "/assets/stats",

  // Asset Images
  ASSET_IMAGES: (assetId: string) => `/assets/${assetId}/images`,
  ASSET_IMAGE_BY_ID: (assetId: string, imageId: string) =>
    `/assets/${assetId}/images/${imageId}`,
  SET_PRIMARY_IMAGE: (assetId: string, imageId: string) =>
    `/assets/${assetId}/images/${imageId}/primary`,

  // Maintenance
  MAINTENANCE: (assetId: string) => `/assets/${assetId}/maintenance`,
  MAINTENANCE_BY_ID: (assetId: string, maintenanceId: string) =>
    `/assets/${assetId}/maintenance/${maintenanceId}`,

  // Maintenance Overview
  MAINTENANCE_UPCOMING: "/maintenance/upcoming",
  MAINTENANCE_OVERDUE: "/maintenance/overdue",
  MAINTENANCE_STATS: "/maintenance/stats",
} as const;

export type AssetsEndpoint =
  (typeof ASSETS_ENDPOINTS)[keyof typeof ASSETS_ENDPOINTS];
