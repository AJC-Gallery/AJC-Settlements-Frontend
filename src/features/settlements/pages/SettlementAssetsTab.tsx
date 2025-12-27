// SettlementAssetsTab.tsx - Production-ready with proper state management
import { useState, useMemo, useEffect } from "react";
import {  Search, X, ChevronDown, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {  useMyAssets } from "@/hooks/useAssets";
import AssetsCard from "../components/SettlementSwiper";
import GlassSelect from "@/components/ui/glassmorphicSelectComponent";
import type { AssetType } from "../types";
 
// Custom debounce hook
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface Asset {
  id: string;
  name: string;
  type: "land" | "residential" | "commercial" | "industrial";
  location: string;
  purchasePrice: number;
  createdAt: string;
}

interface AssetsResponse {
  data: Asset[];
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

interface GroupedAssets {
  land: Asset[];
  residential: Asset[];
  commercial: Asset[];
  industrial: Asset[];
}

const SEARCH_MIN_LENGTH = 3;
const DEBOUNCE_DELAY = 400;
const PRICE_MAX = 10000000000;

const SettlementAssetsTab = () => {
  const navigate = useNavigate();
  
  // Search states
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchQuery = useDebounce(searchInput, DEBOUNCE_DELAY);
  
  // Filter states
  const [selectedType, setSelectedType] = useState<AssetType | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, PRICE_MAX]);
  const debouncedPriceRange = useDebounce(priceRange, DEBOUNCE_DELAY);
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  // Determine backend search parameters
  const shouldSearchBackend = debouncedSearchQuery.length >= SEARCH_MIN_LENGTH || debouncedSearchQuery.length === 0;
  const backendSearchQuery = shouldSearchBackend ? debouncedSearchQuery : undefined;

  // Fetch assets from backend
  const { data: assetsResponse, isLoading, isError, error } = useMyAssets({
    type: selectedType || undefined,
    minPrice: debouncedPriceRange[0],
    maxPrice: debouncedPriceRange[1],
    search: backendSearchQuery,
  });

  // Extract assets and metadata
  const allAssets = useMemo(() => {
    return (assetsResponse as AssetsResponse)?.data || [];
  }, [assetsResponse]);

  const meta = useMemo(() => {
    return (assetsResponse as AssetsResponse)?.meta;
  }, [assetsResponse]);  

  // Determine UI state
  const hasActiveSearch = searchInput.length >= SEARCH_MIN_LENGTH;
  const hasActiveFilters = selectedType !== null || 
                          priceRange[0] !== 0 || 
                          priceRange[1] !== PRICE_MAX || 
                          sortBy !== "recent";
  const isWaitingForMinSearch = searchInput.length > 0 && searchInput.length < SEARCH_MIN_LENGTH;
  const hasAnyAssets = allAssets.length > 0;
  const isEmptyState = !hasAnyAssets && !hasActiveSearch && !hasActiveFilters;
  const isNoResultsState = !hasAnyAssets && (hasActiveSearch || hasActiveFilters);

  // Calculate asset type counts
   const assetTypes = useMemo(() => {
    const counts = allAssets.reduce((acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { value: "land", label: "Land", count: counts.land || 0 },
      { value: "residential", label: "Residential", count: counts.residential || 0 },
      { value: "commercial", label: "Commercial", count: counts.commercial || 0 },
      { value: "industrial", label: "Industrial", count: counts.industrial || 0 },
    ];
  }, [allAssets]);

  // Client-side sorting only (filtering happens server-side)
  const sortedAssets = useMemo(() => {
    const result = [...allAssets];

    switch (sortBy) {
      case "recent":
        result.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "price-low":
        result.sort((a, b) => a.purchasePrice - b.purchasePrice);
        break;
      case "price-high":
        result.sort((a, b) => b.purchasePrice - a.purchasePrice);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [allAssets, sortBy]);

  // Group assets by type
  const groupedAssets: GroupedAssets = useMemo(() => {
    return {
      land: sortedAssets.filter((a) => a.type === "land"),
      residential: sortedAssets.filter((a) => a.type === "residential"),
      commercial: sortedAssets.filter((a) => a.type === "commercial"),
      industrial: sortedAssets.filter((a) => a.type === "industrial"),
    };
  }, [sortedAssets]);

  // Event handlers
  const handleAssetClick = (assetId: string) => {
    navigate(`/settlements/${assetId}`);
  };

  const resetFilters = () => {
    setSearchInput("");
    setSelectedType(null);
    setPriceRange([0, PRICE_MAX]);
    setSortBy("recent");
    setShowFilters(false);
  };

  const handleSearchClear = () => {
    setSearchInput("");
  };

  const handlePriceRangeChange = (index: 0 | 1, value: number) => {
    if (index === 0) {
      setPriceRange([Math.min(value, priceRange[1]), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Math.max(value, priceRange[0])]);
    }
  };

  // Render loading state
  if (isLoading && !allAssets.length) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[650px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-white/60 mx-auto" />
          <p className="text-gray-400">Loading assets...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[650px]">
        <div className="text-center space-y-4">
          <p className="text-red-400">Failed to load assets</p>
          <p className="text-sm text-gray-500">
            {(error as Error)?.message || "Unknown error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:border-white/20 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render empty state (no assets at all)
  if (isEmptyState) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[650px]">
        <div className="flex-1 space-y-6 text-center flex flex-col items-center justify-center">
          <p className="text-gray-300">Register Your First Asset</p>
          <p className="text-sm text-gray-400">
            Start building your portfolio by adding your first property
          </p>
       
        </div>
      </div>
    );
  }

  // Render main content
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 py-2 px-1 sm:p-4 flex flex-col min-h-[650px]">
        <div className="w-full space-y-4 h-full">
          {/* Search & Filter Bar */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search assets (min ${SEARCH_MIN_LENGTH} characters)...`}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all duration-300 hover:border-white/15"
              />
              {searchInput && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              {isWaitingForMinSearch && (
                <div className="absolute left-3 -bottom-5 text-xs text-amber-400/80">
                  Type {SEARCH_MIN_LENGTH - searchInput.length} more character{SEARCH_MIN_LENGTH - searchInput.length > 1 ? 's' : ''} to search
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap pt-2">
              <div className="text-xs text-gray-400">
                {hasAnyAssets ? (
                  <>
                    Found{" "}
                    <span className="text-white font-semibold">
                      {sortedAssets.length}
                    </span>{" "}
                    asset{sortedAssets.length !== 1 ? "s" : ""}
                    {meta && meta.total > sortedAssets.length && (
                      <span className="ml-1">of {meta.total} total</span>
                    )}
                  </>
                ) : (
                  <span>No results found</span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-end">
                <GlassSelect
                  value={sortBy}
                  onChange={(v) => setSortBy(v)}
                  options={[
                    { value: "recent", label: "Recently Added" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
                    { value: "name", label: "Name (A-Z)" },
                  ]}
                />

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-sm text-gray-300 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                >
                  Filters
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="px-3 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-sm text-gray-300 hover:border-red-500/30 hover:text-red-400 transition-all duration-300 hover:bg-red-500/5"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                    Asset Type
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {assetTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() =>
                          setSelectedType(
                            selectedType === type.value ? null : (type.value as AssetType)
                          )
                        }
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                          selectedType === type.value
                            ? "bg-white/20 border border-white/30 text-white"
                            : "bg-white/5 border border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/10"
                        }`}
                      >
                        {type.label}
                        <span className="ml-1.5 text-xs opacity-70">
                          ({type.count})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                    Price Range
                  </p>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={PRICE_MAX}
                      step="100000"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(0, Number(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white/50"
                    />
                    <input
                      type="range"
                      min="0"
                      max={PRICE_MAX}
                      step="100000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(1, Number(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white/50"
                    />
                    <div className="flex justify-between text-xs text-gray-400 pt-1">
                      <span>${(priceRange[0] / 1000).toFixed(0)}K</span>
                      <span>${(priceRange[1] / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Assets Display or No Results */}
          {isNoResultsState ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <p className="text-gray-400">
                {isWaitingForMinSearch 
                  ? "Keep typing to search..." 
                  : "No assets match your search or filters"}
              </p>
              {!isWaitingForMinSearch && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-sm text-gray-300 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4 flex-1">
              {groupedAssets.land.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 px-2 py-2 uppercase tracking-wide">
                    Land Assets ({groupedAssets.land.length})
                  </h3>
                  <div className="flex bg-black/40 rounded-xl justify-center">
                    <AssetsCard
                      assets={groupedAssets.land}
                      onAssetClick={handleAssetClick}
                    />
                  </div>
                </div>
              )}

              {groupedAssets.residential.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 px-2 py-2 uppercase tracking-wide">
                    Residential Assets ({groupedAssets.residential.length})
                  </h3>
                  <div className="flex bg-black/40 rounded-xl justify-center">
                    <AssetsCard
                      assets={groupedAssets.residential}
                      onAssetClick={handleAssetClick}
                    />
                  </div>
                </div>
              )}

              {groupedAssets.commercial.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 px-2 py-2 uppercase tracking-wide">
                    Commercial Assets ({groupedAssets.commercial.length})
                  </h3>
                  <div className="flex bg-black/40 rounded-xl justify-center">
                    <AssetsCard
                      assets={groupedAssets.commercial}
                      onAssetClick={handleAssetClick}
                    />
                  </div>
                </div>
              )}

              {groupedAssets.industrial.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-400 px-2 py-2 uppercase tracking-wide">
                    Industrial Assets ({groupedAssets.industrial.length})
                  </h3>
                  <div className="flex bg-black/40 rounded-xl justify-center">
                    <AssetsCard
                      assets={groupedAssets.industrial}
                      onAssetClick={handleAssetClick}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettlementAssetsTab;