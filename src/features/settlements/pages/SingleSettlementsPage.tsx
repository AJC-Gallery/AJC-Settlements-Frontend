import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { ArrowLeft, MapPin, Calendar, DollarSign, Building2, Home } from 'lucide-react';
import {
  commercialAssets,
  industrialAssets,
  landAssets,
  residentialAssets,
} from '@/data/settlementContents';

const SingleSettlementsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Combine all assets to find the requested one
  const allAssets = useMemo(() => [
    ...landAssets,
    ...residentialAssets,
    ...commercialAssets,
    ...industrialAssets,
  ], []);

  // Find the specific asset by ID
  const asset = useMemo(() => {
    return allAssets.find(a => a.id === id);
  }, [id, allAssets]);

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get asset type styling
  const getTypeStyles = (type: string) => {
    const styles = {
      land: {
        bg: 'bg-green-500/10',
        text: 'text-green-400',
        border: 'border-green-500/20',
      },
      commercial: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-400',
        border: 'border-blue-500/20',
      },
      residential: {
        bg: 'bg-purple-500/10',
        text: 'text-purple-400',
        border: 'border-purple-500/20',
      },
      industrial: {
        bg: 'bg-orange-500/10',
        text: 'text-orange-400',
        border: 'border-orange-500/20',
      },
    };
    return styles[type as keyof typeof styles] || styles.land;
  };

  // Handle not found
  if (!asset) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center space-y-4">
          <Home className="w-16 h-16 text-white/30 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Asset Not Found</h2>
          <p className="text-gray-400">
            The asset you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/settlements')}
            className="flex items-center gap-2 mx-auto px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Settlements
          </button>
        </div>
      </div>
    );
  }

  const typeStyles = getTypeStyles(asset.assetType);

  return (
    <div className="w-full min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/settlements')}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-white/20 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Settlements
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
              <img
                src={asset.image}
                alt={asset.assetName}
                className="w-full h-full object-cover"
              />
              {/* Asset Type Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md border ${typeStyles.bg} ${typeStyles.text} ${typeStyles.border}`}
                >
                  {asset.assetType.charAt(0).toUpperCase() + asset.assetType.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">
                {asset.assetName}
              </h1>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{asset.location}</span>
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Purchase Price */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Purchase Price</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {formatPrice(asset.purchasePrice)}
                </p>
              </div>

              {/* Purchase Date */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider">Purchase Date</span>
                </div>
                <p className="text-lg font-semibold text-white">
                  {formatDate(asset.purchaseDate)}
                </p>
              </div>

              {/* Apartment Count (if applicable) */}
              {asset.apartmentCount && (
                <div className="col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Building2 className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Units</span>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    {asset.apartmentCount} Units Available
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            {asset.description && (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 space-y-3">
                <h3 className="text-lg font-semibold text-white">Description</h3>
                <p className="text-gray-300 leading-relaxed">
                  {asset.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300">
                Edit Details
              </button>
              <button className="flex-1 px-6 py-3 bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-xl text-red-400 font-semibold hover:bg-red-500/20 transition-all duration-300">
                Delete Asset
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-bold text-white">Asset Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Asset ID</p>
              <p className="text-sm text-gray-300 font-mono">{asset.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Asset Type</p>
              <p className="text-sm text-gray-300 capitalize">{asset.assetType}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Status</p>
              <p className="text-sm text-green-400">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSettlementsPage;