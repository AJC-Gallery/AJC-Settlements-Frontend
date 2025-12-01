 // src/api/services/assets.service.ts

import { apiClient, extractData } from '../client';
import { ASSETS_ENDPOINTS } from '../endpoints';
import type { ApiResponse } from '../types';
import type {
  Asset,
  AssetCategory,
  AssetImage,
  MaintenanceRecord,
  CreateAssetCategoryDto,
  UpdateAssetCategoryDto,
  CreateAssetDto,
  UpdateAssetDto,
  AssetFilters,
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
  AssetStats,
  MaintenanceStats,
  PaginatedAssets,
} from '@/features/settlements/types';

/**
 * Assets Service
 * All asset-related API calls
 */
export const assetsService = {
  // ============================================================
  // ASSET CATEGORIES
  // ============================================================

  /**
   * Create a new asset category
   */
  createCategory: async (data: CreateAssetCategoryDto): Promise<AssetCategory> => {
    const response = await apiClient.post<ApiResponse<AssetCategory>>(
      ASSETS_ENDPOINTS.CATEGORIES,
      data
    );
    return extractData(response);
  },

  /**
   * Get all asset categories
   */
  getCategories: async (): Promise<AssetCategory[]> => {
    const response = await apiClient.get<ApiResponse<AssetCategory[]>>(
      ASSETS_ENDPOINTS.CATEGORIES
    );
    return extractData(response);
  },

  /**
   * Get category by ID
   */
  getCategoryById: async (id: string): Promise<AssetCategory> => {
    const response = await apiClient.get<ApiResponse<AssetCategory>>(
      ASSETS_ENDPOINTS.CATEGORY_BY_ID(id)
    );
    return extractData(response);
  },

  /**
   * Update category
   */
  updateCategory: async (
    id: string,
    data: UpdateAssetCategoryDto
  ): Promise<AssetCategory> => {
    const response = await apiClient.patch<ApiResponse<AssetCategory>>(
      ASSETS_ENDPOINTS.CATEGORY_BY_ID(id),
      data
    );
    return extractData(response);
  },

  /**
   * Soft delete category
   */
  deleteCategory: async (id: string): Promise<void> => {
    await apiClient.delete(ASSETS_ENDPOINTS.CATEGORY_BY_ID(id));
  },

  /**
   * Restore deleted category
   */
  restoreCategory: async (id: string): Promise<AssetCategory> => {
    const response = await apiClient.patch<ApiResponse<AssetCategory>>(
      ASSETS_ENDPOINTS.RESTORE_CATEGORY(id)
    );
    return extractData(response);
  },

  // ============================================================
  // ASSETS
  // ============================================================

  /**
   * Create a new asset with images (multipart/form-data)
   */
  createAsset: async (data: CreateAssetDto): Promise<Asset> => {
    const formData = new FormData();

    // Append text fields
    formData.append('name', data.name);
    formData.append('type', data.type);
    formData.append('description', data.description);
    formData.append('location', data.location);
    formData.append('purchasePrice', data.purchasePrice.toString());
    formData.append('purchaseDate', data.purchaseDate);

    // Optional fields
    if (data.size !== undefined) {
      formData.append('size', data.size.toString());
    }
    if (data.yearBuilt !== undefined) {
      formData.append('yearBuilt', data.yearBuilt.toString());
    }
    if (data.subUnitCount !== undefined) {
      formData.append('subUnitCount', data.subUnitCount.toString());
    }
    if (data.categoryId) {
      formData.append('categoryId', data.categoryId);
    }

    // Append amenities as array
    if (data.amenities && data.amenities.length > 0) {
      data.amenities.forEach((amenity) => {
        formData.append('amenities[]', amenity);
      });
    }

    // Append images
    data.images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await apiClient.post<ApiResponse<Asset>>(
      ASSETS_ENDPOINTS.ASSETS,
      formData,
    
    );
    return extractData(response);
  },

  /**
   * Get all assets with filters and pagination
   */
  getAssets: async (filters?: AssetFilters): Promise<PaginatedAssets> => {
    const response = await apiClient.get<ApiResponse<PaginatedAssets>>(
      ASSETS_ENDPOINTS.ASSETS,
      { params: filters }
    );
    return extractData(response);
  },

  /**
   * Get asset statistics
   */
  getAssetStats: async (): Promise<AssetStats> => {
    const response = await apiClient.get<ApiResponse<AssetStats>>(
      ASSETS_ENDPOINTS.ASSET_STATS
    );
    return extractData(response);
  },

  /**
   * Get asset by ID
   */
  getAssetById: async (id: string): Promise<Asset> => {
    const response = await apiClient.get<ApiResponse<Asset>>(
      ASSETS_ENDPOINTS.ASSET_BY_ID(id)
    );
    return extractData(response);
  },

  /**
   * Update asset
   */
  updateAsset: async (id: string, data: UpdateAssetDto): Promise<Asset> => {
    const response = await apiClient.patch<ApiResponse<Asset>>(
      ASSETS_ENDPOINTS.ASSET_BY_ID(id),
      data
    );
    return extractData(response);
  },

  /**
   * Soft delete asset
   */
  deleteAsset: async (id: string): Promise<void> => {
    await apiClient.delete(ASSETS_ENDPOINTS.ASSET_BY_ID(id));
  },

  // ============================================================
  // ASSET IMAGES
  // ============================================================

  /**
   * Upload images to existing asset
   */
  uploadAssetImages: async (assetId: string, images: File[]): Promise<AssetImage[]> => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await apiClient.post<ApiResponse<AssetImage[]>>(
      ASSETS_ENDPOINTS.ASSET_IMAGES(assetId),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return extractData(response);
  },

  /**
   * Get all images for an asset
   */
  getAssetImages: async (assetId: string): Promise<AssetImage[]> => {
    const response = await apiClient.get<ApiResponse<AssetImage[]>>(
      ASSETS_ENDPOINTS.ASSET_IMAGES(assetId)
    );
    return extractData(response);
  },

  /**
   * Delete specific image
   */
  deleteAssetImage: async (assetId: string, imageId: string): Promise<void> => {
    await apiClient.delete(ASSETS_ENDPOINTS.ASSET_IMAGE_BY_ID(assetId, imageId));
  },

  /**
   * Set primary image
   */
  setPrimaryImage: async (assetId: string, imageId: string): Promise<AssetImage> => {
    const response = await apiClient.patch<ApiResponse<AssetImage>>(
      ASSETS_ENDPOINTS.SET_PRIMARY_IMAGE(assetId, imageId)
    );
    return extractData(response);
  },

  // ============================================================
  // MAINTENANCE
  // ============================================================

  /**
   * Create maintenance record
   */
  createMaintenance: async (
    assetId: string,
    data: CreateMaintenanceDto
  ): Promise<MaintenanceRecord> => {
    const response = await apiClient.post<ApiResponse<MaintenanceRecord>>(
      ASSETS_ENDPOINTS.MAINTENANCE(assetId),
      data
    );
    return extractData(response);
  },

  /**
   * Get all maintenance for asset
   */
  getAssetMaintenance: async (assetId: string): Promise<MaintenanceRecord[]> => {
    const response = await apiClient.get<ApiResponse<MaintenanceRecord[]>>(
      ASSETS_ENDPOINTS.MAINTENANCE(assetId)
    );
    return extractData(response);
  },

  /**
   * Get single maintenance record
   */
  getMaintenanceById: async (
    assetId: string,
    maintenanceId: string
  ): Promise<MaintenanceRecord> => {
    const response = await apiClient.get<ApiResponse<MaintenanceRecord>>(
      ASSETS_ENDPOINTS.MAINTENANCE_BY_ID(assetId, maintenanceId)
    );
    return extractData(response);
  },

  /**
   * Update maintenance record
   */
  updateMaintenance: async (
    assetId: string,
    maintenanceId: string,
    data: UpdateMaintenanceDto
  ): Promise<MaintenanceRecord> => {
    const response = await apiClient.patch<ApiResponse<MaintenanceRecord>>(
      ASSETS_ENDPOINTS.MAINTENANCE_BY_ID(assetId, maintenanceId),
      data
    );
    return extractData(response);
  },

  /**
   * Delete maintenance record
   */
  deleteMaintenance: async (assetId: string, maintenanceId: string): Promise<void> => {
    await apiClient.delete(ASSETS_ENDPOINTS.MAINTENANCE_BY_ID(assetId, maintenanceId));
  },

  // ============================================================
  // MAINTENANCE OVERVIEW
  // ============================================================

  /**
   * Get upcoming maintenance
   */
  getUpcomingMaintenance: async (days?: number): Promise<MaintenanceRecord[]> => {
    const response = await apiClient.get<ApiResponse<MaintenanceRecord[]>>(
      ASSETS_ENDPOINTS.MAINTENANCE_UPCOMING,
      { params: { days } }
    );
    return extractData(response);
  },

  /**
   * Get overdue maintenance
   */
  getOverdueMaintenance: async (): Promise<MaintenanceRecord[]> => {
    const response = await apiClient.get<ApiResponse<MaintenanceRecord[]>>(
      ASSETS_ENDPOINTS.MAINTENANCE_OVERDUE
    );
    return extractData(response);
  },

  /**
   * Get maintenance statistics
   */
  getMaintenanceStats: async (): Promise<MaintenanceStats> => {
    const response = await apiClient.get<ApiResponse<MaintenanceStats>>(
      ASSETS_ENDPOINTS.MAINTENANCE_STATS
    );
    return extractData(response);
  },
};