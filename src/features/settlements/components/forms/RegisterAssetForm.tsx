import { useState, useRef } from "react";
import {
  X,
  Home,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  Layers2,
  ImageIcon,
  Upload,
  Loader2,
} from "lucide-react";
import CustomGlassButton from "@/components/ui/custom-button";
import { useCreateAsset } from "@/hooks/useAssets";
import { AssetType } from "@/features/settlements/types";
import type { CreateAssetDto } from "@/features/settlements/types";
import toast from "react-hot-toast";

interface RegisterAssetFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterAssetForm = ({
  isOpen,
  onClose,
}: RegisterAssetFormProps) => {
  const { mutate: createAsset, isPending } = useCreateAsset();

  // Use a ref to hold images - refs don't cause re-renders and always have current value
  const imagesRef = useRef<File[]>([]);

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

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageCount, setImageCount] = useState(0); // For UI display

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    console.log("📁 Files selected:", {
      count: files.length,
      details: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
    });

    // Add new files to existing images (max 3 total)
    const newImages = [...imagesRef.current, ...files].slice(0, 3);

    // Update ref - this is ALWAYS current
    imagesRef.current = newImages;

    console.log("✅ Images added to ref:", {
      count: imagesRef.current.length,
      types: imagesRef.current.map((img) => `File: ${img.name}`),
    });

    // Update UI state for image count
    setImageCount(newImages.length);

    // Create previews
    const newPreviews: string[] = [];
    let completedCount = 0;

    newImages.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews[index] = reader.result as string;
        completedCount++;

        if (completedCount === newImages.length) {
          console.log("🖼️ All previews loaded, updating state");
          setImagePreviews([...newPreviews]);
        }
      };
      reader.onerror = () => {
        console.error("❌ FileReader error for", file.name);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    console.log("🗑️ Removing image at index:", index);

    // Update ref
    imagesRef.current = imagesRef.current.filter((_, i) => i !== index);

    console.log(
      "✅ Image removed. Remaining in ref:",
      imagesRef.current.length
    );

    // Update UI
    setImageCount(imagesRef.current.length);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get images from ref
    const currentImages = imagesRef.current;

    console.log("🔍 Form submission - Images check from REF:", {
      count: currentImages.length,
      types: currentImages.map((img) => {
        if (img instanceof File) {
          return `File: ${img.name} (${img.type}, ${img.size} bytes)`;
        }
        return `${typeof img}: ${String(img).substring(0, 50)}...`;
      }),
    });

    // Validation: Check if at least one image is uploaded
    if (currentImages.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    // Verify all items are File objects
    const allAreFiles = currentImages.every((img) => img instanceof File);
    if (!allAreFiles) {
      toast.error("Invalid image files. Please re-upload.");
      console.error("❌ Not all images are File objects:", currentImages);
      return;
    }

    // Prepare DTO
    const createAssetDto: CreateAssetDto = {
      name: formData.name,
      type: formData.type.toLowerCase() as AssetType,
      description: formData.description,
      location: formData.location,
      purchasePrice: parseFloat(formData.purchasePrice),

      purchaseDate: new Date(formData.purchaseDate).toISOString(),
      images: currentImages,
    };

    // Optional fields
    if (formData.size) {
      createAssetDto.size = parseFloat(formData.size);
    }
    if (formData.yearBuilt) {
      createAssetDto.yearBuilt = parseInt(formData.yearBuilt);
    }
    if (formData.subUnitCount && formData.type !== AssetType.LAND) {
      createAssetDto.subUnitCount = parseInt(formData.subUnitCount);
    }

    console.log("📤 Submitting asset with images:", createAssetDto);

    // Submit - the mutation will handle success/error
    createAsset(createAssetDto, {
      onSuccess: (asset) => {
        console.log("✅ Asset created successfully:", asset);
        toast.success(`Asset "${asset.name}" registered successfully!`);

        // CRITICAL: Clear ref and reset form BEFORE closing
        imagesRef.current = [];
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
        setImagePreviews([]);
        setImageCount(0);

        // NOW close the modal
        onClose();
      },
      onError: (error: { message: string }) => {
        console.error("❌ Failed to create asset:", error);
        toast.error(`Failed to register asset: ${error.message}`);
      },
    });
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
    setImagePreviews([]);
    setImageCount(0);
    imagesRef.current = []; // Clear ref
    onClose();
  };

  return (
    <>
      {/* Blurred Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={handleClose}
        />
      )}

      {/* Form Modal */}
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
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Register New Asset
              </h2>
              <p className="text-sm text-white/60 mt-1">
                Fill in the details to add your asset
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

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Asset Name */}
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

            {/* Asset Type & Sub-Units */}
            <div className="flex gap-6 justify-between">
              {/* Asset Type */}
              <div className="space-y-2 w-full">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <FileText className="w-4 h-4" />
                  Asset Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                    focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                >
                  {assetTypes.map((type) => (
                    <option
                      key={type.value}
                      value={type.value}
                      className="bg-[#0d3d35] text-white"
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub-Unit Count (Not for LAND) */}
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

            {/* Location */}
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

            {/* Purchase Price and Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Purchase Price */}
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

              {/* Purchase Date */}
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

            {/* Description */}
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

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                <ImageIcon className="w-4 h-4" />
                Images * (Min 1, Max 3)
              </label>
              <label
                htmlFor="image-upload"
                className="w-full h-[50px] px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                  hover:bg-white/10 focus-within:border-white/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Images ({imageCount}/3)</span>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={imageCount >= 3}
                />
              </label>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  Image Previews ({imagePreviews.length})
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-white/5 border border-white/10 rounded-xl overflow-hidden group"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-blue-500/80 rounded text-xs text-white">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
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
              type="submit"
              className="flex-1 justify-center"
              variant="solid"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register Asset"
              )}
            </CustomGlassButton>
          </div>
        </form>
      </div>
    </>
  );
};
