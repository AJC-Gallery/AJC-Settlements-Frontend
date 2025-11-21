import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface RevenueData {
  month: string;
  amountCollected: number;
  totalExpected: number;
}

interface RevenueCardProps {
  revenue: RevenueData[];
}

export default function RevenueCard({ revenue }: RevenueCardProps) {
  return (
    <div className="h-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="revenue-swiper h-full"
      >
        {revenue.map((r, i) => {
          const percentage = ((r.amountCollected / r.totalExpected) * 100).toFixed(0);
          return (
            <SwiperSlide key={i}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 h-full shadow-lg hover:bg-white/10 transition-all duration-300 flex flex-col">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h4 className="font-bold text-base md:text-lg">{r.month}</h4>
                  <span className="text-sm text-gray-400">{percentage}%</span>
                </div>
                <div className="mb-3 md:mb-4">
                  <div className="w-full bg-white/10 rounded-full h-2.5 md:h-3 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-700 shadow-lg"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-xs md:text-sm text-gray-300">
                    <span className="font-semibold">Collected:</span> ₦{r.amountCollected.toLocaleString()}
                  </p>
                  <p className="text-xs md:text-sm text-gray-400">
                    <span className="font-semibold">Expected:</span> ₦{r.totalExpected.toLocaleString()}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style>{`
        .revenue-swiper {
          padding-bottom: 36px;
        }
        
        .revenue-swiper .swiper-pagination {
          bottom: 8px !important;
        }
        
        .revenue-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 0.6;
          width: 6px;
          height: 6px;
          margin: 0 3px !important;
        }
        
        @media (min-width: 768px) {
          .revenue-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            margin: 0 4px !important;
          }
        }
        
        .revenue-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: rgba(255, 255, 255, 0.95);
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}