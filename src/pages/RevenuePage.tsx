import { useCurrentUser } from "@/hooks";
import { Navigate } from "react-router-dom";

export default function RevenuePage() {
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
    <div className="w-full h-full flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white/3 border border-white/6 rounded-2xl p-4 sm:p-6 flex-1 flex flex-col">
          <div className="flex w-full items-center justify-between pb-3 sm:pb-3 px-2 flex-wrap gap-2">
            <span className="text-xs md:text-lg font-semibold text-white">
              Welcome back, {user?.username}
            </span>
            <div className="flex flex-col items-end text-[10px] xs:text-xs md:text-sm text-gray-400 whitespace-nowrap">
              <span>Last updated</span>
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

     <div className="flex-1 rounded-lg border-2 border-dashed border-white/6 py-4 px-1 sm:p-4 flex items-center text-center justify-center min-h-[400px]">
   
   <span >
    Coming Soon: Revenue Page under construction!
   </span>
        </div>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Tip: use the sidebar to add quick navigation or include a compact
          activity feed.
        </div>
      </div>
    </div>
  );
}
