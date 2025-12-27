import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

interface Settlement {
  name: string;
  location: string;
  occupants: number;
  image: string;
}

interface SettlementsCardProps {
  settlements: Settlement[];
}

export default function SettlementsCard({ settlements }: SettlementsCardProps) {
  return (
    <div className="h-full">
     <Swiper
  modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
  effect="coverflow"
  grabCursor={true}
  centeredSlides={true}
  loop={true}
  slidesPerView={2}     // <— Important for dynamic datasets
  spaceBetween={20}        // <— Extra spacing helps large images
  coverflowEffect={{
    rotate: 15,
    stretch: 0,
    depth: 200,
    modifier: 1.5,         // <— More dramatic center focus
    slideShadows: false,   // <— Keeps UI cleaner
  }}
  autoplay={{
    delay: 3500,
    disableOnInteraction: false,
  }}
  navigation
  pagination={{ clickable: true }}
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
  className="settlements-swiper h-full"
>

        {settlements.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl flex flex-col h-full shadow-xl">
              <div className="flex-shrink-0 p-3 md:p-4">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-40 sm:h-52 md:h-64 lg:h-72 object-cover rounded-lg md:rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 px-4 md:px-6 pb-4 md:pb-6 space-y-1">
                <h3 className="font-bold text-lg md:text-xl lg:text-2xl">{s.name}</h3>
                <p className="text-sm md:text-base text-gray-300">{s.location}</p>
                <p className="text-xs md:text-sm text-gray-400">
                  {s.occupants} occupants
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
        .settlements-swiper {
          padding-bottom: 36px;
          position: relative;
        }
        
        /* Navigation buttons */
        .settlements-swiper .swiper-button-next,
        .settlements-swiper .swiper-button-prev {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          border: 2px solid rgba(255, 255, 255, 0.15);
          width: 28px;
          height: 28px;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        @media (min-width: 768px) {
          .settlements-swiper .swiper-button-next,
          .settlements-swiper .swiper-button-prev {
            width: 32px;
            height: 32px;
            padding: 6px;
          }
        }
        
        .settlements-swiper .swiper-button-next:hover,
        .settlements-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.05);
        }
        
        .settlements-swiper .swiper-button-next:after,
        .settlements-swiper .swiper-button-prev:after {
          font-size: 10px;
        }
        
        @media (min-width: 768px) {
          .settlements-swiper .swiper-button-next:after,
          .settlements-swiper .swiper-button-prev:after {
            font-size: 12px;
          }
        }
        
        .settlements-swiper .swiper-button-next {
          right: 8px;
        }
        
        @media (min-width: 768px) {
          .settlements-swiper .swiper-button-next {
            right: 10px;
          }
        }
        
        .settlements-swiper .swiper-button-prev {
          left: 8px;
        }
        
        @media (min-width: 768px) {
          .settlements-swiper .swiper-button-prev {
            left: 10px;
          }
        }
        
        /* Pagination dots */
        .settlements-swiper .swiper-pagination {
          bottom: 6px !important;
        }
        
        .settlements-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          opacity: 0.6;
          width: 6px;
          height: 6px;
          margin: 0 2px !important;
          transition: all 0.3s ease;
        }
        
        @media (min-width: 768px) {
          .settlements-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            margin: 0 3px !important;
          }
        }
        
        .settlements-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #fff;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
}