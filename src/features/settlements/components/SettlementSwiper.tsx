import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
interface Asset {
  id: string;
  assetName: string;
  assetType: string;
  location: string;
  purchasePrice: number;
  purchaseDate: string;
  description: string;
  apartmentCount: string;
  image: string;
}
interface AssetsCardProps {
  assets: Asset[];
  onAssetClick?: (assetId: string) => void; // Callback for navigation
}
export default function AssetsCard({ assets, onAssetClick }: AssetsCardProps) {
  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(price);
  };
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };
  // Get asset type badge color
  const getTypeColor = (type: string) => {
    const colors = {
      land: "bg-black/70 text-green-300 border-green-500/10",
      commercial: " bg-black/70 text-blue-300 border-blue-500/10",
      residential: "bg-black/90 text-purple-500 border-purple-500/10",
      industrial: "bg-black/70 text-orange-300 border-orange-500/10",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-gray-500/20 text-gray-300 border-gray-500/30"
    );
  };
  // Handle card click
  const handleCardClick = (assetId: string) => {
    if (onAssetClick) {
      onAssetClick(assetId);
    }
  };
  return (
    <div className="h-full pt-4 w-[250px] sm:w-[400px] md:w-[500px] lg:w-[700px] xl:w-[1000px] 2xl:w-[1300px] 3xl:w-[1800px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={assets.length > 3}
        slidesPerView="auto"
        spaceBetween={20}
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 200,
          modifier: 1.5,
          slideShadows: false,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{ clickable: true, dynamicBullets: assets.length > 10 }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 12,
          },
          480: {
            slidesPerView: 1.2,
            spaceBetween: 14,
          },
          640: {
            slidesPerView: 1.4,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 1.6,
            spaceBetween: 18,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 2.3,
            spaceBetween: 24,
          },
        }}
        className="assets-swiper h-full"
      >
        {assets.map((asset, i) => (
          <SwiperSlide key={`${asset.assetName}-${i}`}>
            <div
              className="bg-white/5 w-55 sm:w-65 md:w-60 lg:w-60 xl:w-80 2xl:w-75 3xl:w-120 backdrop-blur-md border border-white/10 rounded-lg md:rounded-lg flex flex-col h-full shadow-xl hover:border-white/20 transition-all duration-300"
              onClick={() => handleCardClick(asset.id)}

                role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(asset.id);
                }
              }}
            >
              {/* Image Section */}
              <div className="relative flex-shrink-0 p-1.5 md:p-2">
                <img
                  src={asset.image}
                  alt={asset.assetName}
                  className="w-full h-20 sm:h-20 md:h-20 lg:h-24 object-cover rounded-md md:rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Asset Type Badge */}
                <div className="absolute top-3 right-3 md:top-3 md:right-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${getTypeColor(
                      asset.assetType
                    )}`}
                  >
                    {asset.assetType.charAt(0).toUpperCase() +
                      asset.assetType.slice(1)}
                  </span>
                </div>
              </div>
              {/* Content Section */}
              <div className="flex-1 px-2 md:px-3 pb-2 md:pb-3 space-y-1">
                <h3 className="font-semibold text-xs md:text-sm lg:text-base text-white truncate">
                  {asset.assetName}
                </h3>

                <div className="flex items-center gap-1.5 text-xs md:text-xs text-gray-300">
                  <svg
                    className="w-3 h-3 flex-shrink-0"
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
                  <span className="truncate">{asset.location}</span>
                </div>
                {/* Price & Date */}
                <div className="flex items-center justify-between pt-0.5">
                  <div>
                    <p className="text-xs text-gray-400">Price</p>
                    <p className="text-xs md:text-sm font-bold text-green-400">
                      {formatPrice(asset.purchasePrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="text-xs text-gray-300">
                      {formatDate(asset.purchaseDate)}
                    </p>
                  </div>
                </div>
                {/* Apartment Count (if applicable) */}
                {asset.apartmentCount && (
                  <div className="pt-0.5">
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
                      {asset.apartmentCount} Units
                    </span>
                  </div>
                )}
                {/* Description */}
                {asset.description && (
                  <p className="text-xs text-gray-400 line-clamp-1 pt-0.5">
                    {asset.description}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
          .assets-swiper {
            padding-bottom: 28px;
            position: relative;
          }
          
          /* Navigation buttons */
          .assets-swiper .swiper-button-next,
          .assets-swiper .swiper-button-prev {
            color: rgba(255, 255, 255, 0.9);
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(8px);
            border: 2px solid rgba(255, 255, 255, 0.15);
            width: 24px;
            height: 24px;
            padding: 3px;
            border-radius: 50%;
            transition: all 0.3s ease;
          }
          
          @media (min-width: 768px) {
            .assets-swiper .swiper-button-next,
            .assets-swiper .swiper-button-prev {
              width: 28px;
              height: 28px;
              padding: 4px;
            }
          }
          
          .assets-swiper .swiper-button-next:hover,
          .assets-swiper .swiper-button-prev:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: scale(1.08);
            border-color: rgba(255, 255, 255, 0.25);
          }
          
          .assets-swiper .swiper-button-next:after,
          .assets-swiper .swiper-button-prev:after {
            font-size: 8px;
          }
          
          @media (min-width: 768px) {
            .assets-swiper .swiper-button-next:after,
            .assets-swiper .swiper-button-prev:after {
              font-size: 10px;
            }
          }
          
          .assets-swiper .swiper-button-next {
            right: 8px;
          }
          
          @media (min-width: 768px) {
            .assets-swiper .swiper-button-next {
              right: 10px;
            }
          }
          
          .assets-swiper .swiper-button-prev {
            left: 8px;
          }
          
          @media (min-width: 768px) {
            .assets-swiper .swiper-button-prev {
              left: 10px;
            }
          }
          
          /* Pagination dots */
          .assets-swiper .swiper-pagination {
            bottom: 4px !important;
          }
          
          .assets-swiper .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.4);
            opacity: 0.6;
            width: 4px;
            height: 4px;
            margin: 0 2px !important;
            transition: all 0.3s ease;
          }
          
          @media (min-width: 768px) {
            .assets-swiper .swiper-pagination-bullet {
              width: 6px;
              height: 6px;
              margin: 0 2px !important;
            }
          }
          
          .assets-swiper .swiper-pagination-bullet-active {
            opacity: 1;
            background: #fff;
            transform: scale(1.3);
          }
          /* Dynamic bullets for large datasets */
          .assets-swiper .swiper-pagination-bullet-active-main {
            background: #fff;
          }
          .assets-swiper .swiper-pagination-bullet-active-prev,
          .assets-swiper .swiper-pagination-bullet-active-next {
            background: rgba(255, 255, 255, 0.6);
          }
        `}</style>
    </div>
  );
}







