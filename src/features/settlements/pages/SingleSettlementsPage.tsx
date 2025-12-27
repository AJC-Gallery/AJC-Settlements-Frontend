// SingleSettlementsPage.tsx - With automatic image carousel
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Home,
  Loader2,
  AlertCircle,
  Edit3,
  Trash2,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAsset, useDeleteAsset } from "@/hooks/useAssets";
import CustomGlassButton from "@/components/ui/custom-button";
import { useState, useEffect } from "react";
import { UpdateAssetForm } from "../components/forms/UpdateAssetForm";

interface AssetImage {
  id: string;
  url: string;
  thumbnail: string;
  isPrimary: boolean;
  order: number;
}

interface AssetData {
  id: string;
  name: string;
  type: "land" | "residential" | "commercial" | "industrial";
  location: string;
  purchasePrice: number;
  purchaseDate: string;
  description?: string;
  subUnitCount?: number;
  primaryImage?: AssetImage;
  images?: AssetImage[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

const CAROUSEL_INTERVAL = 4000; // 4 seconds
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";

const SingleSettlementsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fetch asset data from backend
  const { data: asset, isLoading, isError, error } = useAsset(id || "");

  // Delete mutation
  const deleteAsset = useDeleteAsset();

  // Extract asset data early for hooks
  const assetData = asset as AssetData | undefined;

  // Get sorted images array - BEFORE useEffect
  const images = assetData?.images?.sort((a, b) => a.order - b.order) || [];
  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex]?.url || assetData?.primaryImage?.url || FALLBACK_IMAGE;

  // Auto-advance carousel with transition
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 400); // Half of transition duration for crossfade
    }, CAROUSEL_INTERVAL);

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  // Manual navigation functions with transition
  const goToNextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setIsTransitioning(false);
    }, 500);
  };

  const goToPreviousImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsTransitioning(false);
    }, 600);
  };

  // const goToImage = (index: number) => {
  //   if (isTransitioning || index === currentImageIndex) return;
  //   setIsTransitioning(true);
  //   setTimeout(() => {
  //     setCurrentImageIndex(index);
  //     setIsTransitioning(false);
  //   }, 600);
  // };

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  // Get asset type styling
  const getTypeStyles = (type: string) => {
    const styles = {
      land: {
        bg: "bg-green-500/10",
        text: "text-green-400",
        border: "border-green-500/20",
      },
      commercial: {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        border: "border-blue-500/20",
      },
      residential: {
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        border: "border-purple-500/20",
      },
      industrial: {
        bg: "bg-orange-500/10",
        text: "text-orange-400",
        border: "border-orange-500/20",
      },
    };
    return styles[type as keyof typeof styles] || styles.land;
  };

  // Handle delete
  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteAsset.mutateAsync(id);
      navigate("/settlements", {
        state: { message: "Asset deleted successfully" },
      });
    } catch (err) {
      console.error("Failed to delete asset:", err);
      setShowDeleteConfirm(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-white/60 mx-auto" />
          <p className="text-gray-400">Loading asset details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-red-400/60 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Failed to Load Asset</h2>
          <p className="text-gray-400">
            {(error as Error)?.message || "An error occurred while loading the asset details."}
          </p>
          <div className="flex gap-3 justify-center">
            <CustomGlassButton onClick={() => window.location.reload()} variant="default" size="md">
              Retry
            </CustomGlassButton>
            <CustomGlassButton
              onClick={() => navigate("/settlements")}
              variant="ghost"
              size="md"
              icon={<ArrowLeft />}
            >
              Back to Settlements
            </CustomGlassButton>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (!asset || !assetData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center space-y-4">
          <Home className="w-16 h-16 text-white/30 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Asset Not Found</h2>
          <p className="text-gray-400">
            The asset you're looking for doesn't exist or has been removed.
          </p>
          <CustomGlassButton
            onClick={() => navigate("/settlements")}
            variant="default"
            size="md"
            icon={<ArrowLeft />}
          >
            Back to Settlements
          </CustomGlassButton>
        </div>
      </div>
    );
  }

  const typeStyles = getTypeStyles(assetData.type);

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <CustomGlassButton
          onClick={() => navigate("/settlements")}
          variant="ghost"
          size="md"
          icon={<ArrowLeft />}
        >
          Back to Settlements
        </CustomGlassButton>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Carousel Section */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5 group">
              {/* Main Image with smooth crossfade */}
              <img
                src={currentImage}
                alt={assetData.name}
                className={`w-full h-full object-cover transition-opacity duration-1200 ease-in-out ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = FALLBACK_IMAGE;
                }}
              />

              {/* Asset Type Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md border ${typeStyles.bg} ${typeStyles.text} ${typeStyles.border}`}
                >
                  {assetData.type.charAt(0).toUpperCase() + assetData.type.slice(1)}
                </span>
              </div>

              {/* Navigation Arrows (only show if multiple images) */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={goToPreviousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

         
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl capitalize font-bold text-white">{assetData.name}</h1>
              <div className="flex items-center capitalize gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{assetData.location}</span>
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Asset Type */}
              <div
                className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 space-y-2 ${
                  !assetData.subUnitCount || assetData.subUnitCount === 0 ? "col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-2 text-gray-400">
                  <Layers className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Asset Type</span>
                </div>
                <p className="text-2xl font-bold capitalize text-white">{assetData.type}</p>
              </div>

              {/* Sub-Unit Count (if applicable) */}
              {assetData.subUnitCount && !(assetData.subUnitCount === 0) ? (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Building2 className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">
                      Apartments
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    {assetData.subUnitCount} units
                  </p>
                </div>
              ) : null}
            </div>

            {/* Description */}
            {assetData.description && (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 space-y-3">
                <h3 className="text-lg font-semibold text-white">Description</h3>
                <p className="text-gray-300 leading-relaxed">{assetData.description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <CustomGlassButton
                onClick={() => setShowUpdateForm(true)}
                variant="default"
                size="lg"
                icon={<Edit3 />}
                fullWidth
              >
                Edit Details
              </CustomGlassButton>
              <CustomGlassButton
                onClick={() => setShowDeleteConfirm(true)}
                variant="danger"
                size="lg"
                icon={<Trash2 />}
                fullWidth
                disabled={deleteAsset.isPending}
              >
                {deleteAsset.isPending ? "Deleting..." : "Delete Asset"}
              </CustomGlassButton>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-bold text-white">Asset Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Asset Name</p>
              <p className="text-sm text-gray-300 font-mono capitalize break-all">{assetData.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Purchase Price</p>
              <p className="text-sm text-gray-300 capitalize">
                {formatPrice(assetData.purchasePrice)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Purchase Date</p>
              <p className="text-sm text-gray-300">{formatDate(assetData.purchaseDate)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Created</p>
              <p className="text-sm text-gray-300">{formatDate(assetData.createdAt)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
              <p className="text-sm text-green-400 capitalize">{assetData.status || "Active"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Occupants No</p>
              <p className="text-sm text-gray-300">Disabled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Update Asset Form Modal */}
      <UpdateAssetForm
        isOpen={showUpdateForm}
        onClose={() => setShowUpdateForm(false)}
        assetId={assetData.id}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Delete Asset</h3>
                <p className="text-sm text-gray-400">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-white">{assetData.name}</span>? All associated
              data of this property will be permanently removed.
            </p>

            <div className="flex gap-3">
              <CustomGlassButton
                onClick={() => setShowDeleteConfirm(false)}
                variant="ghost"
                size="md"
                fullWidth
                disabled={deleteAsset.isPending}
              >
                Cancel
              </CustomGlassButton>
              <CustomGlassButton
                onClick={handleDelete}
                variant="danger"
                size="md"
                fullWidth
                disabled={deleteAsset.isPending}
              >
                {deleteAsset.isPending ? "Deleting..." : "Delete Permanently"}
              </CustomGlassButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleSettlementsPage;