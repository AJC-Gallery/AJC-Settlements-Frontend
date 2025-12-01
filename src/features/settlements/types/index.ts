 // src/features/assets/types/index.ts

import type { BaseEntity } from "@/types/common";
import type { PaginatedResponse, PaginationParams } from "@/api/types";

/**
 * Asset Type Enum
 */
export const AssetType = {
  LAND: 'LAND',
  COMMERCIAL: 'COMMERCIAL',
  RESIDENTIAL: 'RESIDENTIAL',
  INDUSTRIAL: 'INDUSTRIAL',
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
 * Asset Image
 */
export interface AssetImage extends BaseEntity {
  url: string;
  isPrimary: boolean;
  assetId: string;
}

/**
 * Asset Entity
 */
export interface Asset extends BaseEntity {
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
  category?: AssetCategory;
  images?: AssetImage[];
  userId: string;
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
  images: File[]; // Multiple files
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
 * Asset Filter Parameters
 */
export interface AssetFilters extends PaginationParams {
  type?: AssetType;
  categoryId?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  hasAvailableUnits?: boolean;
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

/**
 * Paginated Assets Response
 */
export type PaginatedAssets = PaginatedResponse<Asset>;

/**
 * Paginated Maintenance Response
 */
export type PaginatedMaintenance = PaginatedResponse<MaintenanceRecord>;