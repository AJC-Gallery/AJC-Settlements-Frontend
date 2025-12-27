// src/hooks/useAssets.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assetsService } from "@/api/service";
import type {
  AssetCategory,
  CreateAssetCategoryDto,
  UpdateAssetCategoryDto,
  CreateAssetDto,
  UpdateAssetDto,
  AssetFilters,
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from "@/features/settlements/types";

/**
 * Query Keys for Assets
 */
export const ASSETS_QUERY_KEYS = {
  // Categories
  categories: ["assets", "categories"] as const,
  category: (id: string) => ["assets", "categories", id] as const,

  // Assets
  assets: (filters?: AssetFilters) => ["assets", "list", filters] as const,
  myAssets: (filters?: AssetFilters) =>
    ["assets", "my-assets", filters] as const, // ✅ NEW

  asset: (id: string) => ["assets", "detail", id] as const,
  assetStats: ["assets", "stats"] as const,

  // Images
  assetImages: (assetId: string) => ["assets", assetId, "images"] as const,

  // Maintenance
  maintenance: (assetId: string) => ["assets", assetId, "maintenance"] as const,
  maintenanceRecord: (assetId: string, maintenanceId: string) =>
    ["assets", assetId, "maintenance", maintenanceId] as const,
  upcomingMaintenance: (days?: number) =>
    ["maintenance", "upcoming", days] as const,
  overdueMaintenance: ["maintenance", "overdue"] as const,
  maintenanceStats: ["maintenance", "stats"] as const,
};

// ============================================================
// ASSET CATEGORIES HOOKS
// ============================================================

/**
 * Hook: Get all asset categories
 */
export const useAssetCategories = () => {
  return useQuery({
    queryKey: ASSETS_QUERY_KEYS.categories,
    queryFn: assetsService.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook: Get category by ID
 */
export const useAssetCategory = (id: string) => {
  return useQuery({
    queryKey: ASSETS_QUERY_KEYS.category(id),
    queryFn: () => assetsService.getCategoryById(id),
    enabled: !!id,
  });
};

/**
 * Hook: Create asset category
 */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAssetCategoryDto) =>
      assetsService.createCategory(data),
    onSuccess: (category: AssetCategory) => {
      console.log("✅ Category created successfully:", category);
      queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEYS.categories });
    },
    onError: (error: { message: string }) => {
      console.error("❌ Failed to create category:", error.message);
    },
  });
};

/**
 * Hook: Update asset category
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAssetCategoryDto }) =>
      assetsService.updateCategory(id, data),
    onSuccess: (category: AssetCategory, variables) => {
      console.log("✅ Category updated successfully:", category);
      queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEYS.categories });
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.category(variables.id),
      });
    },
    onError: (error: { message: string }) => {
      console.error("❌ Failed to update category:", error.message);
    },
  });
};

/**
 * Hook: Delete category
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => assetsService.deleteCategory(id),
    onSuccess: () => {
      console.log("✅ Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEYS.categories });
    },
    onError: (error: { message: string }) => {
      console.error("❌ Failed to delete category:", error.message);
    },
  });
};

/**
 * Hook: Restore category
 */
export const useRestoreCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => assetsService.restoreCategory(id),
    onSuccess: (category: AssetCategory) => {
      console.log("✅ Category restored successfully:", category);
      queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEYS.categories });
    },
    onError: (error: { message: string }) => {
      console.error("❌ Failed to restore category:", error.message);
    },
  });
};

// ============================================================
// ASSETS HOOKS
// ============================================================

/**
 * Hook: Get all assets with filters
 */
export const useAssets = (filters?: AssetFilters) => {
  return useQuery({
    queryKey: ASSETS_QUERY_KEYS.assets(filters),
    queryFn: () => assetsService.getAssets(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook: Get user's own assets with filters (my-assets endpoint)
 * This fetches only assets created by the authenticated user
 */
export const useMyAssets = (filters?: AssetFilters) => {
  return useQuery({
    queryKey: ASSETS_QUERY_KEYS.myAssets(filters),
    queryFn: () => assetsService.getMyAssets(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook: Get asset by ID
 */
export const useAsset = (id: string) => {
  return useQuery({
    queryKey: ASSETS_QUERY_KEYS.asset(id),
    queryFn: () => assetsService.getAssetById(id),
    enabled: !!id,
  });
};

/**
 * Hook: Get asset statistics
 */
export const useAssetStats = () => {
  return useQuery({
    queryKey: ASSETS_QUERY_KEYS.assetStats,
    queryFn: assetsService.getAssetStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook: Create asset
 */
export const useCreateAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateAssetDto) => assetsService.createAsset(data),
    onSuccess: (asset) => {
      console.log('✅ Asset created successfully:', asset);
      queryClient.invalidateQueries({ queryKey: ['assets', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['assets', 'my-assets'] }); // ✅ NEW
      queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEYS.assetStats });
      return asset;
    },
    onError: (error: { message: string }) => {
      console.error('❌ Failed to create asset:', error.message);
    },
  });
};

/**
 * Hook: Update asset
 */
export const useUpdateAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAssetDto }) =>
      assetsService.updateAsset(id, data),
    onSuccess: (asset, variables) => {
      console.log('✅ Asset updated successfully:', asset);
      queryClient.invalidateQueries({ queryKey: ['assets', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['assets', 'my-assets'] }); // ✅ NEW
      queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEYS.asset(variables.id) });
      queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEYS.assetStats });
    },
    onError: (error: { message: string }) => {
      console.error('❌ Failed to update asset:', error.message);
    },
  });
};
/**
 * Hook: Delete asset
 */
export const useDeleteAsset = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => assetsService.deleteAsset(id),
    onSuccess: () => {
      console.log('✅ Asset deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['assets', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['assets', 'my-assets'] }); // ✅ NEW
      queryClient.invalidateQueries({ queryKey: ASSETS_QUERY_KEYS.assetStats });
    },
    onError: (error: { message: string }) => {
      console.error('❌ Failed to delete asset:', error.message);
    },
  });
};

// ============================================================
// ASSET IMAGES HOOKS
// ============================================================

/**
 * Hook: Get asset images
 */
export const useAssetImages = (assetId: string) => {
  return useQuery({
    queryKey: ASSETS_QUERY_KEYS.assetImages(assetId),
    queryFn: () => assetsService.getAssetImages(assetId),
    enabled: !!assetId,
  });
};

/**
 * Hook: Upload asset images
 */
export const useUploadAssetImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assetId, images }: { assetId: string; images: File[] }) =>
      assetsService.uploadAssetImages(assetId, images),
    onSuccess: (images, variables) => {
      console.log("✅ Images uploaded successfully:", images);
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.assetImages(variables.assetId),
      });
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.asset(variables.assetId),
      });
    },
    onError: (error: { message: string }) => {
      console.error("❌ Failed to upload images:", error.message);
    },
  });
};

/**
 * Hook: Delete asset image
 */
export const useDeleteAssetImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assetId, imageId }: { assetId: string; imageId: string }) =>
      assetsService.deleteAssetImage(assetId, imageId),
    onSuccess: (_, variables) => {
      console.log("✅ Image deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.assetImages(variables.assetId),
      });
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.asset(variables.assetId),
      });
    },
    onError: (error: { message: string }) => {
      console.error("❌ Failed to delete image:", error.message);
    },
  });
};

/**
 * Hook: Set primary image
 */
export const useSetPrimaryImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assetId, imageId }: { assetId: string; imageId: string }) =>
      assetsService.setPrimaryImage(assetId, imageId),
    onSuccess: (image, variables) => {
      console.log("✅ Primary image set successfully:", image);
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.assetImages(variables.assetId),
      });
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.asset(variables.assetId),
      });
    },
    onError: (error: { message: string }) => {
      console.error("❌ Failed to set primary image:", error.message);
    },
  });
};

// ============================================================
// MAINTENANCE HOOKS
// ============================================================

/**
 * Hook: Get asset maintenance records
 */
export const useAssetMaintenance = (assetId: string) => {
  return useQuery({
    queryKey: ASSETS_QUERY_KEYS.maintenance(assetId),
    queryFn: () => assetsService.getAssetMaintenance(assetId),
    enabled: !!assetId,
  });
};

/**
 * Hook: Get single maintenance record
 */
export const useMaintenanceRecord = (
  assetId: string,
  maintenanceId: string
) => {
  return useQuery({
    queryKey: ASSETS_QUERY_KEYS.maintenanceRecord(assetId, maintenanceId),
    queryFn: () => assetsService.getMaintenanceById(assetId, maintenanceId),
    enabled: !!assetId && !!maintenanceId,
  });
};

/**
 * Hook: Create maintenance record
 */
export const useCreateMaintenance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      assetId,
      data,
    }: {
      assetId: string;
      data: CreateMaintenanceDto;
    }) => assetsService.createMaintenance(assetId, data),
    onSuccess: (maintenance, variables) => {
      console.log("✅ Maintenance record created successfully:", maintenance);
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.maintenance(variables.assetId),
      });
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.maintenanceStats,
      });
    },
    onError: (error: { message: string }) => {
      console.error("❌ Failed to create maintenance record:", error.message);
    },
  });
};

/**
 * Hook: Update maintenance record
 */
export const useUpdateMaintenance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      assetId,
      maintenanceId,
      data,
    }: {
      assetId: string;
      maintenanceId: string;
      data: UpdateMaintenanceDto;
    }) => assetsService.updateMaintenance(assetId, maintenanceId, data),
    onSuccess: (maintenance, variables) => {
      console.log("✅ Maintenance record updated successfully:", maintenance);
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.maintenance(variables.assetId),
      });
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.maintenanceRecord(
          variables.assetId,
          variables.maintenanceId
        ),
      });
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.maintenanceStats,
      });
    },
    onError: (error: { message: string }) => {
      console.error("❌ Failed to update maintenance record:", error.message);
    },
  });
};

/**
 * Hook: Delete maintenance record
 */
export const useDeleteMaintenance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      assetId,
      maintenanceId,
    }: {
      assetId: string;
      maintenanceId: string;
    }) => assetsService.deleteMaintenance(assetId, maintenanceId),
    onSuccess: (_, variables) => {
      console.log("✅ Maintenance record deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.maintenance(variables.assetId),
      });
      queryClient.invalidateQueries({
        queryKey: ASSETS_QUERY_KEYS.maintenanceStats,
      });
    },
    onError: (error: { message: string }) => {
      console.error("❌ Failed to delete maintenance record:", error.message);
    },
  });
};

// ============================================================
// MAINTENANCE OVERVIEW HOOKS
// ============================================================

/**
 * Hook: Get upcoming maintenance
 */
export const useUpcomingMaintenance = (days?: number) => {
  return useQuery({
    queryKey: ASSETS_QUERY_KEYS.upcomingMaintenance(days),
    queryFn: () => assetsService.getUpcomingMaintenance(days),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook: Get overdue maintenance
 */
export const useOverdueMaintenance = () => {
  return useQuery({
    queryKey: ASSETS_QUERY_KEYS.overdueMaintenance,
    queryFn: assetsService.getOverdueMaintenance,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook: Get maintenance statistics
 */
export const useMaintenanceStats = () => {
  return useQuery({
    queryKey: ASSETS_QUERY_KEYS.maintenanceStats,
    queryFn: assetsService.getMaintenanceStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
