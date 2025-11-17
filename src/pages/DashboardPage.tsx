  import { Navigate } from "react-router-dom";
  import { useCurrentUser } from "@/hooks";
  import { settlements, occupants, revenue } from "@/data/dashboardContent";
  import OccupantsCard from "@/features/dashboard/components/OccupantsSwiper";
  import RevenueCard from "@/features/dashboard/components/RevenueSwiper";
  import SettlementsCard from "@/features/dashboard/components/SettlementSwiper";
  import { ChevronRight } from "lucide-react";

  export default function DashboardPage() {
    const { data: user, isLoading, isError } = useCurrentUser();
    const isAuthenticated = !!user;

    // While verifying session
    if (isLoading) {
      return (
        <div className="w-full h-screen flex items-center justify-center text-gray-600">
          Checking authentication…
        </div>
      );
    }

    // If not authenticated → redirect
    if (isError || !isAuthenticated) {
      return <Navigate to="/sign-in" replace />;
    }

    return (
      <div>
        {/* Main content */}
        <main className="lg:col-span-4  pt-2">
          <div className="bg-white/3 border border-white/6 rounded-2xl p-4 sm:p-6 min-h-[6svh]">
            <div className="flex w-full items-center justify-between pb-3 sm:pb-3 px-2 flex-wrap">
              <span className="text-xs md:text-lg font-semibold">
                Welcome back, {user?.firstName}
              </span>

              <div className="flex flex-col items-end text-[10px] xs:text-xs md:text-sm text-gray-400 whitespace-nowrap">
                <span> Last updated</span>
                <span>
                  {new Date().toLocaleString([], {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
            </div>

            <div className="h-auto rounded-lg border-2 border-dashed border-white/6 py-4 px-1 sm:p-4 flex items-center justify-center">
              {settlements && occupants && revenue.length === 0 ? (
                <div className="text-center">
                  <p className="text-gray-300 mb-4">
                    This dashboard is intentionally minimal — ready for your widgets.
                  </p>
                  <p className="text-sm text-gray-400">
                    Add charts, tables, or quick-actions here when needed.
                  </p>
                </div>
              ) : (
                <div className="w-full rounded-xl text-white p-2 grid grid-cols-1 lg:grid-cols-7 items-end lg:grid-rows-2 gap-6">
                  <div className="lg:col-span-4 px-2 space-y-2 sm:px-4 py-4 lg:row-span-2">
                    <div className="w-full flex items-center px-1 justify-between">
                      <span className="text-xs sm:text-xl sm:font-bold">
                        Settlements
                      </span>

                      <span role="button" className="flex items-center w-fit cursor-pointer p-0 justify-end gap-1">
                        <span className="text-xs sm:text-xl sm:font-bold">View All</span>
                        <ChevronRight className="h-3 w-3 font-bold" />
                      </span>
                    </div>

                    <SettlementsCard settlements={settlements} />
                  </div>
                  <div className="lg:col-span-3 space-y-2 lg:row-span-1">
                    <div className="w-full flex items-center px-1 justify-between">
                      <span className="text-xs sm:text-xl sm:font-bold">Occupants</span>

                      <span role="button" className="flex items-center w-fit cursor-pointer p-0 justify-end gap-1">
                        <span className="text-xs sm:text-xl sm:font-bold">View All</span>
                        <ChevronRight className="h-3 w-3 font-bold" />
                      </span>
                    </div>
                    <OccupantsCard occupants={occupants} />
                  </div>
                  <div className="lg:col-span-3 space-y-2 lg:row-span-1">
                    <div className="w-full flex items-center px-1 justify-between">
                      <span className="text-xs sm:text-xl sm:font-bold">Revenue</span>

                      <span role="button" className="flex items-center w-fit cursor-pointer p-0 justify-end gap-1">
                        <span className="text-xs sm:text-xl sm:font-bold">View Details</span>
                        <ChevronRight className="h-3 w-3 font-bold" />
                      </span>
                    </div>
                    <RevenueCard revenue={revenue} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Tip: use the sidebar to add quick navigation or include a compact activity feed.
          </div>
        </main>
      </div>
    );
  }
