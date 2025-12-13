import { useState, useRef, useEffect } from "react";
import {
  X,
  Home,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  Layers2,
  Image,
  Upload,
  Loader2,
  Lock,
} from "lucide-react";
import {
  useAsset,
  useUpdateAsset,
  useUploadAssetImages,
  useDeleteAssetImage,
} from "@/hooks/useAssets";
import { AssetType } from "@/features/settlements/types";
import type { UpdateAssetDto } from "@/features/settlements/types";
import CustomGlassButton from "@/components/ui/custom-button";
import toast from "react-hot-toast";

interface AssetImage {
  id: string;
  url: string;
  thumbnail: string;
  isPrimary: boolean;
  order: number;
}

interface UpdateAssetFormProps {
  isOpen: boolean;
  onClose: () => void;
  assetId: string;
}

export const UpdateAssetForm = ({
  isOpen,
  onClose,
  assetId,
}: UpdateAssetFormProps) => {
  const { data: asset, isLoading: loadingAsset } = useAsset(assetId);
  const { mutate: updateAsset, isPending: isUpdating } = useUpdateAsset();
  const { mutateAsync: uploadImages } = useUploadAssetImages();
  const { mutateAsync: deleteImage } = useDeleteAssetImage();

  const newImagesRef = useRef<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const assetTypes: { label: string; value: AssetType }[] = [
    { label: "Residential", value: AssetType.RESIDENTIAL },
    { label: "Land", value: AssetType.LAND },
    { label: "Industrial", value: AssetType.INDUSTRIAL },
    { label: "Commercial", value: AssetType.COMMERCIAL },
  ];

  const [formData, setFormData] = useState({
    name: "",
    type: AssetType.RESIDENTIAL as AssetType,
    location: "",
    purchasePrice: "",
    purchaseDate: "",
    description: "",
    subUnitCount: "",
    size: "",
    yearBuilt: "",
  });

  const [existingImages, setExistingImages] = useState<AssetImage[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [newImageCount, setNewImageCount] = useState(0);

  // Load asset data when modal opens
  useEffect(() => {
    if (asset && isOpen) {
      console.log("🔄 Loading asset data into form:", asset);

      setFormData({
        name: asset.name,
        type: asset.type,
        location: asset.location,
        purchasePrice: asset.purchasePrice.toString(),
        purchaseDate: asset.purchaseDate.split("T")[0],
        description: asset.description || "",
        subUnitCount: asset.subUnitCount?.toString() || "",
        size: asset.size?.toString() || "",
        yearBuilt: asset.yearBuilt?.toString() || "",
      });

      const images = asset.images || [];
      setExistingImages(images);
      setRemovedImageIds([]);
      newImagesRef.current = [];
      setNewImagePreviews([]);
      setNewImageCount(0);
    }
  }, [asset, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getTotalImageCount = () => {
    const existingCount = existingImages.filter(
      (img) => !removedImageIds.includes(img.id)
    ).length;
    return existingCount + newImageCount;
  };

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentTotal = getTotalImageCount();
    const availableSlots = 3 - currentTotal;

    if (availableSlots <= 0) {
      toast.error("Maximum 3 images allowed. Remove some images first.");
      return;
    }

    const filesToAdd = files.slice(0, availableSlots);
    const newImages = [...newImagesRef.current, ...filesToAdd];

    newImagesRef.current = newImages;
    setNewImageCount(newImages.length);

    const newPreviews: string[] = [];
    let completedCount = 0;

    newImages.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews[index] = reader.result as string;
        completedCount++;
        if (completedCount === newImages.length) {
          setNewImagePreviews([...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const removeExistingImage = (imageId: string) => {
    setRemovedImageIds((prev) => [...prev, imageId]);
  };

  const undoRemoveExistingImage = (imageId: string) => {
    setRemovedImageIds((prev) => prev.filter((id) => id !== imageId));
  };

  const removeNewImage = (index: number) => {
    newImagesRef.current = newImagesRef.current.filter((_, i) => i !== index);
    setNewImageCount(newImagesRef.current.length);
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentImages = newImagesRef.current;
    const remainingExisting = existingImages.filter(
      (img) => !removedImageIds.includes(img.id)
    );
    const totalImages = remainingExisting.length + currentImages.length;

    // Validation
    if (totalImages === 0) {
      toast.error("Please keep at least one image or upload new ones");
      return;
    }

    if (totalImages > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Update basic asset fields (JSON)
      console.log("📝 Step 1: Updating asset fields...");
      const updateData: UpdateAssetDto = {
        name: formData.name,
        type: formData.type.toLowerCase() as AssetType,
        description: formData.description,
        location: formData.location,
        purchasePrice: parseFloat(formData.purchasePrice),
        purchaseDate: new Date(formData.purchaseDate).toISOString(),
      };

      if (formData.size) {
        updateData.size = parseFloat(formData.size);
      }
      if (formData.yearBuilt) {
        updateData.yearBuilt = parseInt(formData.yearBuilt);
      }
      if (formData.subUnitCount && formData.type !== AssetType.LAND) {
        updateData.subUnitCount = parseInt(formData.subUnitCount);
      }

      await new Promise<void>((resolve, reject) => {
        updateAsset(
          { id: assetId, data: updateData },
          {
            onSuccess: () => {
              console.log("✅ Step 1 complete: Asset fields updated");
              resolve();
            },
            onError: (error: any) => {
              console.error("❌ Step 1 failed:", error);
              reject(error);
            },
          }
        );
      });

      // Step 2: Delete removed images (parallel)
      if (removedImageIds.length > 0) {
        console.log(`🗑️ Step 2: Deleting ${removedImageIds.length} images...`);
        await Promise.all(
          removedImageIds.map((imageId) =>
            deleteImage({ assetId, imageId }).catch((error) => {
              console.error(`Failed to delete image ${imageId}:`, error);
              throw error;
            })
          )
        );
        console.log("✅ Step 2 complete: Images deleted");
      }

      // Step 3: Upload new images
      if (currentImages.length > 0) {
        console.log(
          `📤 Step 3: Uploading ${currentImages.length} new images...`
        );
        await uploadImages({ assetId, images: currentImages });
        console.log("✅ Step 3 complete: New images uploaded");
      }

      // Success!
      toast.success(`Asset "${formData.name}" updated successfully!`);
      handleClose();
    } catch (error: any) {
      console.error("❌ Update failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update asset";
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      type: AssetType.RESIDENTIAL as AssetType,
      location: "",
      purchasePrice: "",
      purchaseDate: "",
      description: "",
      subUnitCount: "",
      size: "",
      yearBuilt: "",
    });
    setExistingImages([]);
    setRemovedImageIds([]);
    setNewImagePreviews([]);
    setNewImageCount(0);
    newImagesRef.current = [];
    onClose();
  };

  const isPending = isUpdating || isProcessing;

  if (loadingAsset) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-white/60 mx-auto" />
              <p className="text-white/80">Loading asset details...</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={handleClose}
        />
      )}

      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl max-h-[90svh] overflow-y-auto
          bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 
          shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-50 transition-all duration-300 ${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Update Asset
              </h2>
              <p className="text-sm text-white/60 mt-1">
                Modify asset details and images
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
              disabled={isPending}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                <Home className="w-4 h-4" />
                Asset Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={100}
                placeholder="e.g., Sunset Villa"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 
                  focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
              />
            </div>

            <div className="flex gap-6 justify-between">
              <div className="space-y-2 w-full">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <FileText className="w-4 h-4" />
                  Asset Type *
                </label>
                <div className="relative w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white opacity-60 cursor-not-allowed flex items-center justify-between">
                  <span>
                    {
                      assetTypes.find((type) => type.value === formData.type)
                        ?.label
                    }
                  </span>
                  <Lock className="w-4 h-4 text-white/50" />
                </div>
                <input type="hidden" name="type" value={formData.type} />
              </div>

              {formData.type !== AssetType.LAND && (
                <div className="space-y-2 w-full">
                  <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                    <Layers2 className="w-4 h-4" />
                    Sub-Units *
                  </label>
                  <input
                    type="number"
                    name="subUnitCount"
                    value={formData.subUnitCount}
                    onChange={handleChange}
                    required
                    placeholder="0"
                    step="1"
                    min="0"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 
                      focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                <MapPin className="w-4 h-4" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={200}
                placeholder="e.g., 123 Main St, City"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 
                  focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <DollarSign className="w-4 h-4" />
                  Purchase Price *
                </label>
                <input
                  type="number"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 
                    focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <Calendar className="w-4 h-4" />
                  Purchase Date *
                </label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                    focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all
                    [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                <FileText className="w-4 h-4" />
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={2000}
                placeholder="Add details about the asset..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 
                  focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
              />
            </div>

            {existingImages.length > 0 && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <Image className="w-4 h-4" />
                  Existing Images (
                  {
                    existingImages.filter(
                      (img) => !removedImageIds.includes(img.id)
                    ).length
                  }
                  )
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {existingImages.map((image) => {
                    const isRemoved = removedImageIds.includes(image.id);
                    return (
                      <div
                        key={image.id}
                        className={`relative aspect-square bg-white/5 border border-white/10 rounded-xl overflow-hidden group ${
                          isRemoved ? "opacity-40" : ""
                        }`}
                      >
                        <img
                          src={image.thumbnail || image.url}
                          alt="Existing"
                          className="w-full h-full object-cover"
                        />
                        {isRemoved ? (
                          <button
                            type="button"
                            onClick={() => undoRemoveExistingImage(image.id)}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-medium hover:bg-black/70 transition-colors"
                          >
                            Undo Remove
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => removeExistingImage(image.id)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        )}
                        {image.isPrimary && !isRemoved && (
                          <div className="absolute bottom-2 left-2 px-2 py-1 bg-blue-500/80 rounded text-xs text-white">
                            Primary
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                <Upload className="w-4 h-4" />
                Add New Images ({getTotalImageCount()}/3)
              </label>
              <label
                htmlFor="new-image-upload"
                className={`w-full h-[50px] px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                  hover:bg-white/10 focus-within:border-white/30 transition-all flex items-center justify-center gap-2 ${
                    getTotalImageCount() >= 3
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
              >
                <Upload className="w-4 h-4" />
                <span>Upload New Images</span>
                <input
                  id="new-image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleNewImageChange}
                  className="hidden"
                  disabled={getTotalImageCount() >= 3}
                />
              </label>
            </div>

            {newImagePreviews.length > 0 && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  New Images ({newImagePreviews.length})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {newImagePreviews.map((preview, index) => (
                    <div
                      key={`new-${index}`}
                      className="relative aspect-square bg-white/5 border border-white/10 rounded-xl overflow-hidden group"
                    >
                      <img
                        src={preview}
                        alt={`New ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-green-500/80 rounded text-xs text-white">
                        New
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-white/10">
            <CustomGlassButton
              type="button"
              onClick={handleClose}
              className="flex-1 justify-center"
              variant="dashed"
              disabled={isPending}
            >
              Cancel
            </CustomGlassButton>
            <CustomGlassButton
              type="button"
              onClick={handleSubmit}
              className="flex-1 justify-center"
              variant="solid"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Asset"
              )}
            </CustomGlassButton>
          </div>
        </div>
      </div>
    </>
  );
};
