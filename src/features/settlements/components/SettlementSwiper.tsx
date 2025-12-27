import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// API Asset type from backend
interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  purchasePrice: number;
  purchaseDate?: string; // if exists
  createdAt: string; // fallback
  description?: string;
  subUnitCount?: number;
  primaryImage?: { url: string };
}

interface AssetsCardProps {
  assets: Asset[];
  onAssetClick?: (assetId: string) => void;
}

export default function AssetsCard({ assets, onAssetClick }: AssetsCardProps) {
  // API may return purchaseDate OR createdAt
  const formatDate = (dateString: string | undefined) => {
    return new Date(dateString || "").toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Badge color logic
  const getTypeColor = (type: string) => {
    const colors = {
      LAND: "bg-black/70 text-green-300 border-green-800/20",
      COMMERCIAL: "bg-black/70 text-blue-300 border-blue-800/20",
      RESIDENTIAL: "bg-black/70 text-purple-300 border-purple-800/20",
      INDUSTRIAL: "bg-black/70 text-orange-300 border-orange-800/20",
    } as const;
    const key = type.toUpperCase() as keyof typeof colors;
    return colors[key] ?? "bg-gray-700 text-gray-200 border-gray-600";
  };

  const handleCardClick = (assetId: string) => {
    if (onAssetClick) onAssetClick(assetId);
  };

  return (
   <div className="h-full pt-4 w-full assets-container mx-auto px-10">
  <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    grabCursor
    loop={assets.length > 5}
    // spaceBetween={20}
    autoplay={{
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }}
    navigation
    pagination={{
      clickable: true,
      dynamicBullets: assets.length > 10,
    }}
   breakpoints={{
  0: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 12,
  },
  320: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 14,
  },
  360: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 14,
  },
  400: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
  },
  440: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
  },
  480: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 14,
  },
  540: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
  },
  600: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
  },
  660: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 18,
  },
  720: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 18,
  },
  800: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 10,
  },
  900: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 18,
  },
  1024: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 20,
  },
  1200: {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,
  },
  1400: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 22,
  },
  1620: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 24,
  },
  1680: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 24,
  },
  1920: {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 24,
  },
  2140: {
    slidesPerView: 6,
    slidesPerGroup: 6,
    spaceBetween: 24,
  },
  2560: {
    slidesPerView: 6,
    slidesPerGroup: 6,
    spaceBetween: 28,
  },
}}
    className="assets-swiper h-full"
  >
        {assets.map((asset) => (
          <SwiperSlide key={asset.id} className="h-auto">
            <div
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-xl hover:border-white/20 transition-all duration-300 cursor-pointer h-full w-full"
              onClick={() => handleCardClick(asset.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(asset.id);
                }
              }}
            >
              {/* IMAGE */}
              <div className="relative p-1.5 md:p-2">
                <img
                  src={
                    
                    asset.primaryImage?.url ||
                    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400"
                  }
                  alt={asset.name}
                  className="w-full h-24 object-cover rounded-md shadow-2xl hover:scale-105 transition-transform duration-300"
                />
                {/* TYPE BADGE */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getTypeColor(
                      asset.type
                    )}`}
                  >
                    {asset.type}
                  </span>
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="px-3 pb-3 space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm lg:text-base text-white truncate">
                    {asset.name.slice(0, 10)}
                    {asset.name.length > 12 && (
                      <span className="align-baseline">…</span>
                    )}
                  </h3>
                  {/* SUB UNITS */}
                  {asset.subUnitCount ? (
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-gray-300">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        {asset.subUnitCount} Flats
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-300">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="truncate">
                    {asset.location.length > 15
                      ? asset.location.slice(0, 22) + "…"
                      : asset.location}
                  </span>
                </div>

                {/* PRICE + DATE */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-xs text-gray-400">Price</p>
                    <p className="text-sm font-medium text-red-300 flex items-center gap-1">
                      $
                      {Number(asset.purchasePrice).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Acquired on</p>
                    <p className="text-xs text-gray-300">
                      {formatDate(asset.purchaseDate || asset.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .assets-swiper { 
          padding-bottom: 48px;
        }
        
        .assets-swiper .swiper-slide {
          height: auto;
          display: flex;
          justify-content: center;
          
        }
        
        .assets-swiper .swiper-slide > div {
          width: 60%;
        }
        
        .assets-swiper .swiper-button-next,
        .assets-swiper .swiper-button-prev {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 8px;
          // margin: 0 25px 0 25px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .assets-swiper .swiper-button-next:hover,
        .assets-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.08);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .assets-swiper .swiper-button-next:after,
        .assets-swiper .swiper-button-prev:after {
          font-size: 12px;
          font-weight: bold;
        }
        
        /* Position arrows away from cards */
        .assets-swiper .swiper-button-next {
          // right: -12px;
        }
        
        .assets-swiper .swiper-button-prev {
          // left: -12px;
        }
        
        /* Pagination spacing */
        .assets-swiper .swiper-pagination {
          bottom: 12px !important;
        }
        
        /* Hide navigation arrows and pagination on mobile */
        @media (max-width: 400px) {
          .assets-swiper .swiper-button-next,
          .assets-swiper .swiper-button-prev,
          .assets-swiper .swiper-pagination {
            display: none;
          }
        }
        
        .assets-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          opacity: 0.6;
          width: 8px;
          height: 8px;
          margin: 0 4px !important;
        }
        
        .assets-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #fff;
          transform: scale(1.15);
        }
      `}</style>
    </div>
  );
}
