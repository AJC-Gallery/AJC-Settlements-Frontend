// src/features/assets/types/index.ts

import type { BaseEntity } from "@/types/common";
import type { ApiResponse, PaginationParams } from "@/api/types";

/**
 * ============================================================
 * ENUMS
 * ============================================================
 */

/**
 * Asset Type Enum
 */
export const AssetType = {
  LAND: 'land',
  COMMERCIAL: 'commercial',
  RESIDENTIAL: 'residential',
  INDUSTRIAL: 'industrial',
} as const;

export type AssetType = (typeof AssetType)[keyof typeof AssetType];

/**
 * Maintenance Type Enum
 */
export const MaintenanceType = {
  INSPECTION: 'INSPECTION',
  REPAIR: 'REPAIR',
  UPGRADE: 'UPGRADE',
  CLEANING: 'CLEANING',
  SERVICE: 'SERVICE',
} as const;

export type MaintenanceType = (typeof MaintenanceType)[keyof typeof MaintenanceType];

/**
 * Maintenance Status Enum
 */
export const MaintenanceStatus = {
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED',
  OVERDUE: 'OVERDUE',
  CANCELLED: 'CANCELLED',
} as const;

export type MaintenanceStatus =
  (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];

/**
 * ============================================================
 * CORE ENTITIES
 * ============================================================
 */

/**
 * Asset Image
 */
export interface AssetImage extends BaseEntity {
  url: string;
  thumbnail: string;
  isPrimary: boolean;
  order: number;
  assetId: string;
}

/**
 * Asset Category
 */
export interface AssetCategory extends BaseEntity {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  assetCount?: number;
}

/**
 * Asset Entity - Matches API response structure
 */
export interface Asset extends BaseEntity {
  id: string;
  name: string;
  type: AssetType;
  location: string;
  purchaseDate: string;
  purchasePrice: number;
  createdAt: string;
  
  // Optional fields
  description?: string;
  size?: number;
  yearBuilt?: number;
  
  // Sub-units
  subUnitCount?: number;
  subUnitLabel?: string;
  occupiedSubUnits?: number;
  availableSubUnits?: number;
  occupancyRate?: number;
  
  // Relations
  category?: AssetCategory | null;
  primaryImage?: AssetImage | null;
  images?: AssetImage[];
  
  // Other
  userId?: string;
}

/**
 * Maintenance Record
 */
export interface MaintenanceRecord extends BaseEntity {
  type: MaintenanceType;
  title: string;
  description: string;
  cost: number;
  scheduledDate: string;
  completedDate?: string;
  status: MaintenanceStatus;
  performedBy?: string;
  contactInfo?: string;
  nextDueDate?: string;
  attachments?: string[];
  notes?: string;
  assetId: string;
  asset?: Asset;
}

/**
 * ============================================================
 * API RESPONSE STRUCTURES
 * ============================================================
 */

/**
 * Assets List API Meta Information
 */
export interface AssetsListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Assets List API Response Data
 */
export interface AssetsListData {
  data: Asset[];
  meta: AssetsListMeta;
}

/**
 * Get Assets List Response
 * Matches: { success, data: { data, meta }, timestamp }
 */
export type GetAssetsListResponse = ApiResponse<AssetsListData>;

/**
 * Get Single Asset Response
 */
export type GetAssetResponse = ApiResponse<Asset>;

/**
 * ============================================================
 * DTOs - DATA TRANSFER OBJECTS
 * ============================================================
 */

/**
 * Create Asset Category DTO
 */
export interface CreateAssetCategoryDto {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
}

/**
 * Update Asset Category DTO
 */
export type UpdateAssetCategoryDto = Partial<CreateAssetCategoryDto>;

/**
 * Create Asset DTO (FormData)
 */
export interface CreateAssetDto {
  name: string;
  type: AssetType;
  description: string;
  location: string;
  purchasePrice: number;
  purchaseDate: string;
  size?: number;
  yearBuilt?: number;
  subUnitCount?: number;
  amenities?: string[];
  categoryId?: string;
  images: File[];
}

/**
 * Update Asset DTO
 */
export interface UpdateAssetDto {
  name?: string;
  type?: AssetType;
  description?: string;
  location?: string;
  purchasePrice?: number;
  purchaseDate?: string;
  size?: number;
  yearBuilt?: number;
  subUnitCount?: number;
  amenities?: string[];
  categoryId?: string;
}

/**
 * Create Maintenance DTO
 */
export interface CreateMaintenanceDto {
  type: MaintenanceType;
  title: string;
  description: string;
  cost: number;
  scheduledDate: string;
  status?: MaintenanceStatus;
  performedBy?: string;
  contactInfo?: string;
  nextDueDate?: string;
  attachments?: string[];
  notes?: string;
}

/**
 * Update Maintenance DTO
 */
export interface UpdateMaintenanceDto extends Partial<CreateMaintenanceDto> {
  completedDate?: string;
}

/**
 * ============================================================
 * FILTER & QUERY PARAMETERS
 * ============================================================
 */

/**
 * Asset Filter Parameters
 * Extends base pagination and adds asset-specific filters
 */
export interface AssetFilters extends PaginationParams {
  search?: string;
  type?: AssetType;
  categoryId?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  hasAvailableUnits?: boolean;
}

/**
 * ============================================================
 * STATISTICS & ANALYTICS
 * ============================================================
 */

/**
 * Asset Statistics
 */
export interface AssetStats {
  totalAssets: number;
  totalValue: number;
  assetsByType: Record<AssetType, number>;
  averageValue: number;
}

/**
 * Maintenance Statistics
 */
export interface MaintenanceStats {
  totalMaintenance: number;
  totalCost: number;
  upcomingCount: number;
  overdueCount: number;
  completedCount: number;
  byType: Record<MaintenanceType, number>;
  byStatus: Record<MaintenanceStatus, number>;
}