import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Occupant {
  name: string;
  house: string;
  apartment: string;
  rent: number;
  paymentStatus: "healthy" | "faulty" | "critical";
  image: string;
}

interface OccupantsCardProps {
  occupants: Occupant[];
}

export default function OccupantsCard({ occupants }: OccupantsCardProps) {
  return (
    <div className="h-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="occupants-swiper h-full"
      >
        {occupants.map((o, i) => (
          <SwiperSlide key={i}>
            <div
              className="
    relative
    bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl
    p-4 md:p-6 h-full shadow-lg hover:bg-white/10 transition-all duration-300

    flex flex-col items-center justify-center text-center gap-3
    md:flex-row md:items-center md:justify-start md:text-left md:gap-4
  "
            >
              {/* Avatar */}
              <img
                src={o.image}
                alt={o.name}
                className="
      w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
      rounded-full object-cover border-2 border-white/20 shadow-lg flex-shrink-0
    "
              />

              {/* Text container */}
              <div className="flex flex-col items-center md:items-start gap-1 w-full">
                <h4 className="font-bold text-base md:text-lg truncate w-full">
                  {o.name}
                </h4>

                <p className="text-xs md:text-sm text-gray-300 truncate w-full">
                  {o.house} - {o.apartment}
                </p>

                <p className="text-xs text-gray-400 w-full">
                  Rent: ₦{o.rent.toLocaleString()}
                </p>
              </div>

              {/* Status badge */}
              <span
                className={`
       md:static
      bottom-3 right-3 md:bottom-auto md:right-auto

      px-2 py-1 md:px-3 md:py-1.5 
      rounded-full text-[9px] font-semibold flex-shrink-0
      ${
        o.paymentStatus === "healthy"
          ? "bg-green-500/30 text-green-400 border border-green-500/50"
          : o.paymentStatus === "faulty"
          ? "bg-yellow-500/30 text-yellow-400 border border-yellow-500/50"
          : "bg-red-500/30 text-red-400 border border-red-500/50"
      }
    `}
              >
                {o.paymentStatus.toUpperCase()}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
        .occupants-swiper {
          padding-bottom: 36px;
        }
        
        .occupants-swiper .swiper-pagination {
          bottom: 8px !important;
        }
        
        .occupants-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 0.6;
          width: 6px;
          height: 6px;
          margin: 0 3px !important;
        }
        
        @media (min-width: 768px) {
          .occupants-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            margin: 0 4px !important;
          }
        }
        
        .occupants-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: rgba(255, 255, 255, 0.95);
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
