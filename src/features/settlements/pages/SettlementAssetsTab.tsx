import { useState, useMemo } from "react";
import { RegisterAssetForm } from "../components/forms/RegisterAssetForm";
import CustomGlassButton from "@/components/ui/custom-button";
import { Home, Search, X, ChevronDown } from "lucide-react";
import {
  commercialAssets,
  industrialAssets,
  landAssets,
  residentialAssets,
} from "@/data/settlementContents";
import AssetsCard from "../components/SettlementSwiper";
import GlassSelect from "@/components/ui/glassmorphicSelectComponent";
import { useNavigate } from "react-router-dom";

const SettlementAssetsTab = () => {
  const test = "0";
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  const allAssets = [
    ...landAssets,
    ...residentialAssets,
    ...commercialAssets,
    ...industrialAssets,
  ];

  const assetTypes = [
    { value: "land", label: "Land", count: landAssets.length },
    {
      value: "residential",
      label: "Residential",
      count: residentialAssets.length,
    },
    {
      value: "commercial",
      label: "Commercial",
      count: commercialAssets.length,
    },
    {
      value: "industrial",
      label: "Industrial",
      count: industrialAssets.length,
    },
  ];

  const filteredAndSortedAssets = useMemo(() => {
    const result = allAssets.filter((asset) => {
      const matchesSearch =
        asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = !selectedType || asset.assetType === selectedType;
      const matchesPrice =
        asset.purchasePrice >= priceRange[0] &&
        asset.purchasePrice <= priceRange[1];

      return matchesSearch && matchesType && matchesPrice;
    });

    if (sortBy === "recent") {
      result.sort(
        (a, b) =>
          new Date(b.purchaseDate).getTime() -
          new Date(a.purchaseDate).getTime()
      );
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.purchasePrice - b.purchasePrice);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.purchasePrice - a.purchasePrice);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.assetName.localeCompare(b.assetName));
    }

    return result;
  }, [searchQuery, selectedType, priceRange, sortBy]);

  const groupedAssets = useMemo(() => {
    return {
      land: filteredAndSortedAssets.filter((a) => a.assetType === "land"),
      residential: filteredAndSortedAssets.filter(
        (a) => a.assetType === "residential"
      ),
      commercial: filteredAndSortedAssets.filter(
        (a) => a.assetType === "commercial"
      ),
      industrial: filteredAndSortedAssets.filter(
        (a) => a.assetType === "industrial"
      ),
    };
  }, [filteredAndSortedAssets]);

  const hasAnyAssets = allAssets.length > 0;
  const hasFilteredAssets = Object.values(groupedAssets).some(
    (group) => group.length > 0
  );

  const handleAssetClick = (assetId: string) => {
    navigate(`/settlements/${assetId}`);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType(null);
    setPriceRange([0, 1000000]);
    setSortBy("recent");
    setShowFilters(false);
  };

  return (
    <div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 py-2 px-1 sm:p-4 flex flex-col min-h-[650px]">
          {hasAnyAssets ? (
            <div className="w-full space-y-4 h-full">
              {/* Search & Filter Bar */}
              <div className="space-y-3">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search assets by name, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-all duration-300 hover:border-white/15"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Inline Controls Row: Results | Sort | Filters | Clear */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  {/* Results Count */}
                  <p className="text-xs text-gray-400">
                    {hasFilteredAssets && (
                      <>
                        Found{" "}
                        <span className="text-white font-semibold">
                          {filteredAndSortedAssets.length}
                        </span>{" "}
                        asset{filteredAndSortedAssets.length !== 1 ? "s" : ""}
                      </>
                    )}
                    {!hasFilteredAssets && <span>No results</span>}
                  </p>

                  {/* Right Controls */}
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    {/* Sort Dropdown */}
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

                    {/* Filter Toggle Button */}
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

                    {/* Reset Button */}
                    {(searchQuery ||
                      selectedType ||
                      priceRange[0] !== 0 ||
                      priceRange[1] !== 1000000 ||
                      sortBy !== "recent") && (
                      <button
                        onClick={resetFilters}
                        className="px-3 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-sm text-gray-300 hover:border-red-500/30 hover:text-red-400 transition-all duration-300 hover:bg-red-500/5"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>

                {/* Expandable Filters Panel */}
                {showFilters && (
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Asset Type Filter */}
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
                                selectedType === type.value ? null : type.value
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

                    {/* Price Range Filter */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                        Price Range
                      </p>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="1000000"
                          step="10000"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              Math.min(Number(e.target.value), priceRange[1]),
                              priceRange[1],
                            ])
                          }
                          className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white/50"
                        />
                        <input
                          type="range"
                          min="0"
                          max="1000000"
                          step="10000"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              Math.max(Number(e.target.value), priceRange[0]),
                            ])
                          }
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

              {/* Assets Display */}
              {hasFilteredAssets ? (
                <div className="space-y-4 flex-1">
                  {/* Land Assets */}
                  {groupedAssets.land.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 px-2 py-2 uppercase tracking-wide">
                        Land Assets
                      </h3>
                      <div className="flex bg-black/40 rounded-xl justify-center">
                        <AssetsCard
                          assets={groupedAssets.land}
                          onAssetClick={handleAssetClick}
                        />
                      </div>
                    </div>
                  )}

                  {/* Residential Assets */}
                  {groupedAssets.residential.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 px-2 py-2 uppercase tracking-wide">
                        Residential Assets
                      </h3>
                      <div className="flex bg-black/40 rounded-xl justify-center">
                        <AssetsCard
                          assets={groupedAssets.residential}
                          onAssetClick={handleAssetClick}
                        />
                      </div>
                    </div>
                  )}

                  {/* Commercial Assets */}
                  {groupedAssets.commercial.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 px-2 py-2 uppercase tracking-wide">
                        Commercial Assets
                      </h3>
                      <div className="flex bg-black/40 rounded-xl justify-center">
                        <AssetsCard
                          assets={groupedAssets.commercial}
                          onAssetClick={handleAssetClick}
                        />
                      </div>
                    </div>
                  )}

                  {/* Industrial Assets */}
                  {groupedAssets.industrial.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 px-2 py-2 uppercase tracking-wide">
                        Industrial Assets
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
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                  <p className="text-gray-400">No assets match your filters</p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-sm text-gray-300 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 space-y-6 text-center flex flex-col items-center justify-center">
              <p className="text-gray-300">Register Your first Assets</p>
              {test === "0" ? (
                <p className="text-sm text-gray-400">
                  This dashboard is intentionally minimal — ready for your
                  widgets.
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  This dashboard is intentionally minimal — ready for your
                  widgets.
                </p>
              )}
              <CustomGlassButton
                onClick={() => setIsFormOpen(true)}
                size="md"
                variant="solid"
                icon={<Home />}
              >
                Register
              </CustomGlassButton>
            </div>
          )}
        </div>
      </div>

      <RegisterAssetForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default SettlementAssetsTab;
