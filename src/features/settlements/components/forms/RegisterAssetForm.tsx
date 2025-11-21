import { useState } from "react";
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
} from "lucide-react";
import CustomGlassButton from "@/components/ui/custom-button";

interface RegisterAssetFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterAssetForm = ({
  isOpen,
  onClose,
}: RegisterAssetFormProps) => {
  const assestTypes: { label: string; value: string }[] = [
    { label: "Residential Property", value: "residential" },
    { label: "Commercial Property", value: "commercial" },
    { label: "Land", value: "land" },
    { label: "Industrial Property", value: "industrial" },
  ];

  const [formData, setFormData] = useState({
    assetName: "",
    assetType: "residential",
    location: "",
    purchasePrice: "",
    purchaseDate: "",
    description: "",
    apartmentCount: "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <>
      {/* Blurred Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={onClose}
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
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Purchase Price and Date - Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Purchase Price */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <DollarSign className="w-4 h-4" />
                  Purchase Price
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
                  Purchase Date
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

            {/* Asset Type & Apartment Count - Conditional Grid */}
            <div
              className={
                formData.assetType === "industrial" ||
                formData.assetType === "commercial"
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-5"
                  : "space-y-0"
              }
            >
              {/* Asset Type */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <FileText className="w-4 h-4" />
                  Asset Type
                </label>
                <select
                  name="assetType"
                  value={formData.assetType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                    focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                >
                  {assestTypes.map((type) => (
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

              {/* Animated Apartment Count */}
              <div
                className={`
                  transition-all duration-500 ease-in
                  ${
                    formData.assetType === "industrial" ||
                    formData.assetType === "commercial"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-3 pointer-events-none h-0 overflow-hidden"
                  }
                `}
              >
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                    <Layers2 className="w-4 h-4" />
                    Apartment Count
                  </label>
                  <input
                    type="number"
                    name="apartmentCount"
                    value={formData.apartmentCount}
                    onChange={handleChange}
                    required={
                      formData.assetType === "industrial" ||
                      formData.assetType === "commercial"
                    }
                    placeholder="0"
                    step="1"
                    min="0"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 
                      focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Asset Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                <Home className="w-4 h-4" />
                Asset Name
              </label>
              <input
                type="text"
                name="assetName"
                value={formData.assetName}
                onChange={handleChange}
                required
                placeholder="e.g., Sunset Villa"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 
                  focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
              />
            </div>

            {/* Location & Image Upload - Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
              {/* Location */}
              <div className="space-y-2 col-span-3">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 123 Main St, City"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 
                    focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <ImageIcon className="w-4 h-4" />
                  Add Image
                </label>
                <label
                  htmlFor="image-upload"
                  className="w-full h-[50px] px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white 
                    hover:bg-white/10 focus-within:border-white/30 transition-all cursor-pointer flex items-center justify-center"
                >
                  <Upload className="w-4 h-4" />
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="space-y-2 box-border px-10 ">
                <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                  Image Preview
                </label>
                <div className="relative w-full h-42 bg-white/5 border border-[15px] border-black/10  rounded-xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Asset preview"
                    className="w-full h-full rounded-xl object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                    aria-label="close"
                    
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white/90">
                <FileText className="w-4 h-4" />
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add any additional details about the asset..."
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 
                  focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-white/10">
            <CustomGlassButton
              type="button"
              onClick={onClose}
              className="flex-1 justify-center"
              variant="dashed"
            >
              Cancel
            </CustomGlassButton>
            <CustomGlassButton
              type="submit"
              className="flex-1 justify-center"
              variant="solid"
            >
              Register Asset
            </CustomGlassButton>
          </div>
        </form>
      </div>
    </>
  );
};