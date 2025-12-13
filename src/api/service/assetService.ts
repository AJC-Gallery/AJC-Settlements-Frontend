// src/api/service.ts (Assets Service Methods)

import type {
  Asset,
  AssetFilters,
  AssetCategory,
  CreateAssetDto,
  UpdateAssetDto,
  CreateAssetCategoryDto,
  UpdateAssetCategoryDto,
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
  MaintenanceRecord,
  AssetsListData,
  GetAssetsListResponse,
  GetAssetResponse,
} from "@/features/settlements/types";
import type { ApiResponse } from "@/api/types";
import { ASSETS_ENDPOINTS } from "@/api/endpoints/assetEndpoints";
import { apiClient } from "../client";
// import apiClient from "@/api/client"; // Your axios instance or fetch wrapper

/**
 * Assets Service
 * Handles all asset-related API calls and data transformation
 */
export const assetsService = {
  /**
   * Get all assets with filters
   * Returns: AssetsListData { data: Asset[], meta: AssetsListMeta }
   */
  async getAssets(filters?: AssetFilters): Promise<AssetsListData> {
    try {
      const response = await apiClient.get<GetAssetsListResponse>(
        ASSETS_ENDPOINTS.ASSETS,
        { params: filters }
      );

      // Extract nested data from API response wrapper
      return response.data.data;
    } catch (error) {
      console.error("Error fetching assets:", error);
      throw error;
    }
  },


 /**
   * Get user's own assets with filters (my-assets endpoint)
   * Returns: AssetsListData { data: Asset[], meta: AssetsListMeta }
   */
  async getMyAssets(filters?: AssetFilters): Promise<AssetsListData> {
    try {
      const response = await apiClient.get<GetAssetsListResponse>(
        ASSETS_ENDPOINTS.MY_ASSETS,
        { params: filters }
      );
      // Extract nested data from API response wrapper
      return response.data.data;
    } catch (error) {
      console.error("Error fetching my assets:", error);
      throw error;
    }
  },


  /**
   * Get single asset by ID
   */
  async getAssetById(id: string): Promise<Asset> {
    try {
      const response = await apiClient.get<GetAssetResponse>(
        ASSETS_ENDPOINTS.ASSET_BY_ID(id)
      );

      // Extract asset data from API response wrapper
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching asset ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get asset statistics
   */
  async getAssetStats() {
    try {
      const response = await apiClient.get<ApiResponse>(
        ASSETS_ENDPOINTS.ASSET_STATS
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching asset stats:", error);
      throw error;
    }
  },

  /**
   * Create new asset
   */
  async createAsset(data: CreateAssetDto): Promise<Asset> {
    try {
      const formData = new FormData();

      // Add form fields
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("description", data.description);
      formData.append("location", data.location);
      formData.append("purchasePrice", String(data.purchasePrice));
      formData.append("purchaseDate", data.purchaseDate);

      if (data.size) formData.append("size", String(data.size));
      if (data.yearBuilt) formData.append("yearBuilt", String(data.yearBuilt));
      if (data.subUnitCount)
        formData.append("subUnitCount", String(data.subUnitCount));
      if (data.categoryId) formData.append("categoryId", data.categoryId);

      // Add images
      data.images.forEach((file) => {
        formData.append("images", file);
      });

      const response = await apiClient.post<GetAssetResponse>(
        ASSETS_ENDPOINTS.ASSETS,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error("Error creating asset:", error);
      throw error;
    }
  },

  /**
   * Update existing asset
   */
  async updateAsset(id: string, data: UpdateAssetDto): Promise<Asset> {
    try {
      const response = await apiClient.patch<GetAssetResponse>(
        ASSETS_ENDPOINTS.ASSET_BY_ID(id),
        data
      );

      return response.data.data;
    } catch (error) {
      console.error(`Error updating asset ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete asset
   */
  async deleteAsset(id: string): Promise<void> {
    try {
      await apiClient.delete(ASSETS_ENDPOINTS.ASSET_BY_ID(id));
    } catch (error) {
      console.error(`Error deleting asset ${id}:`, error);
      throw error;
    }
  },

  // ============================================================
  // ASSET CATEGORIES
  // ============================================================

  /**
   * Get all asset categories
   */
  async getCategories(): Promise<AssetCategory[]> {
    try {
      const response = await apiClient.get<ApiResponse<AssetCategory[]>>(
        ASSETS_ENDPOINTS.CATEGORIES
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  /**
   * Get category by ID
   */
  async getCategoryById(id: string): Promise<AssetCategory> {
    try {
      const response = await apiClient.get<ApiResponse<AssetCategory>>(
        ASSETS_ENDPOINTS.CATEGORY_BY_ID(id)
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create new category
   */
  async createCategory(data: CreateAssetCategoryDto): Promise<AssetCategory> {
    try {
      const response = await apiClient.post<ApiResponse<AssetCategory>>(
        ASSETS_ENDPOINTS.CATEGORIES,
        data
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  /**
   * Update category
   */
  async updateCategory(
    id: string,
    data: UpdateAssetCategoryDto
  ): Promise<AssetCategory> {
    try {
      const response = await apiClient.patch<ApiResponse<AssetCategory>>(
        ASSETS_ENDPOINTS.CATEGORY_BY_ID(id),
        data
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete category
   */
  async deleteCategory(id: string): Promise<void> {
    try {
      await apiClient.delete(ASSETS_ENDPOINTS.CATEGORY_BY_ID(id));
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  },

  /**
   * Restore deleted category
   */
  async restoreCategory(id: string): Promise<AssetCategory> {
    try {
      const response = await apiClient.patch<ApiResponse<AssetCategory>>(
        ASSETS_ENDPOINTS.RESTORE_CATEGORY(id)
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error restoring category ${id}:`, error);
      throw error;
    }
  },

  // ============================================================
  // ASSET IMAGES
  // ============================================================

  /**
   * Get asset images
   */
  async getAssetImages(assetId: string) {
    try {
      const response = await apiClient.get<ApiResponse>(
        ASSETS_ENDPOINTS.ASSET_IMAGES(assetId)
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching images for asset ${assetId}:`, error);
      throw error;
    }
  },

  /**
   * Upload asset images
   */
  async uploadAssetImages(assetId: string, images: File[]) {
    try {
      const formData = new FormData();
      images.forEach((file) => {
        formData.append("images", file);
      });

      const response = await apiClient.post<ApiResponse>(
        ASSETS_ENDPOINTS.ASSET_IMAGES(assetId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(
        `Error uploading images for asset ${assetId}:`,
        error
      );
      throw error;
    }
  },

  /**
   * Delete asset image
   */
  async deleteAssetImage(assetId: string, imageId: string): Promise<void> {
    try {
      await apiClient.delete(
        ASSETS_ENDPOINTS.ASSET_IMAGE_BY_ID(assetId, imageId)
      );
    } catch (error) {
      console.error(
        `Error deleting image ${imageId} for asset ${assetId}:`,
        error
      );
      throw error;
    }
  },

  /**
   * Set primary image
   */
  async setPrimaryImage(assetId: string, imageId: string) {
    try {
      const response = await apiClient.patch<ApiResponse>(
        ASSETS_ENDPOINTS.SET_PRIMARY_IMAGE(assetId, imageId)
      );
      return response.data.data;
    } catch (error) {
      console.error(
        `Error setting primary image for asset ${assetId}:`,
        error
      );
      throw error;
    }
  },

  // ============================================================
  // MAINTENANCE
  // ============================================================

  /**
   * Get asset maintenance records
   */
  async getAssetMaintenance(assetId: string) {
    try {
      const response = await apiClient.get<ApiResponse>(
        ASSETS_ENDPOINTS.MAINTENANCE(assetId)
      );
      return response.data.data;
    } catch (error) {
      console.error(
        `Error fetching maintenance for asset ${assetId}:`,
        error
      );
      throw error;
    }
  },

  /**
   * Get single maintenance record
   */
  async getMaintenanceById(assetId: string, maintenanceId: string) {
    try {
      const response = await apiClient.get<ApiResponse>(
        ASSETS_ENDPOINTS.MAINTENANCE_BY_ID(assetId, maintenanceId)
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching maintenance record:`, error);
      throw error;
    }
  },

  /**
   * Create maintenance record
   */
  async createMaintenance(
    assetId: string,
    data: CreateMaintenanceDto
  ): Promise<MaintenanceRecord> {
    try {
      const response = await apiClient.post<ApiResponse<MaintenanceRecord>>(
        ASSETS_ENDPOINTS.MAINTENANCE(assetId),
        data
      );
      return response.data.data;
    } catch (error) {
      console.error(
        `Error creating maintenance for asset ${assetId}:`,
        error
      );
      throw error;
    }
  },

  /**
   * Update maintenance record
   */
  async updateMaintenance(
    assetId: string,
    maintenanceId: string,
    data: UpdateMaintenanceDto
  ): Promise<MaintenanceRecord> {
    try {
      const response = await apiClient.patch<ApiResponse<MaintenanceRecord>>(
        ASSETS_ENDPOINTS.MAINTENANCE_BY_ID(assetId, maintenanceId),
        data
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error updating maintenance record:`, error);
      throw error;
    }
  },

  /**
   * Delete maintenance record
   */
  async deleteMaintenance(assetId: string, maintenanceId: string): Promise<void> {
    try {
      await apiClient.delete(
        ASSETS_ENDPOINTS.MAINTENANCE_BY_ID(assetId, maintenanceId)
      );
    } catch (error) {
      console.error(`Error deleting maintenance record:`, error);
      throw error;
    }
  },

  /**
   * Get upcoming maintenance
   */
  async getUpcomingMaintenance(days?: number) {
    try {
      const response = await apiClient.get<ApiResponse>(
        ASSETS_ENDPOINTS.MAINTENANCE_UPCOMING,
        { params: days ? { days } : undefined }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching upcoming maintenance:", error);
      throw error;
    }
  },

  /**
   * Get overdue maintenance
   */
  async getOverdueMaintenance() {
    try {
      const response = await apiClient.get<ApiResponse>(
        ASSETS_ENDPOINTS.MAINTENANCE_OVERDUE
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching overdue maintenance:", error);
      throw error;
    }
  },

  /**
   * Get maintenance statistics
   */
  async getMaintenanceStats() {
    try {
      const response = await apiClient.get<ApiResponse>(
        ASSETS_ENDPOINTS.MAINTENANCE_STATS
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching maintenance stats:", error);
      throw error;
    }
  },
};