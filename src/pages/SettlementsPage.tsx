import CustomGlassButton from "@/components/ui/custom-button";
import { RegisterAssetForm } from "@/features/settlements/components/forms/RegisterAssetForm";
import { Home } from "lucide-react";
import { useState, lazy, Suspense } from "react";

// Lazy load tab components for code splitting
const SettlementsCollectionsTab = lazy(
  () => import("@/features/settlements/pages/SettlementsCollectionsTab")
);
const SettlementAssetsTab = lazy(
  () => import("@/features/settlements/pages/SettlementAssetsTab")
);

const SettlementsPage = () => {
  const [activeTab, setActiveTab] = useState("assets");
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col mt-3">
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="bg-white/3 border border-white/6 rounded-2xl gap-3 p-4 sm:p-4 flex-1 flex flex-col">
          <div className="flex w-full items-center justify-between px-2 flex-wrap gap-2">
            <span className="text-xs md:text-lg font-semibold text-white">
              Welcome back, {}
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

          {/* Tab Navigation */}
          <div className="flex items-center px-2 justify-between w-full">
            {/* Centered Tabs */}
            <div className="flex-1 flex justify-center">
              <div
                className="flex w-fit gap-1 bg-white/5 rounded-lg"
                role="tablist"
              >
              

                <CustomGlassButton
                  role="tab"
                  aria-selected={activeTab === "assets"}
                  aria-controls="assets-panel"
                  onClick={() => setActiveTab("assets")}
                  variant={activeTab === "assets" ? "default" : "ghost"}
                  className={`rounded-md ${
                    activeTab === "assets"
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-gray-400"
                  }`}
                  size="sm"
                >
                  Assets
                </CustomGlassButton>

                  <CustomGlassButton
                  role="tab"
                  aria-selected={activeTab === "collections"}
                  aria-controls="collections-panel"
                  onClick={() => setActiveTab("collections")}
                  variant={activeTab === "collections" ? "default" : "ghost"}
                  className={`rounded-md ${
                    activeTab === "collections"
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-gray-400"
                  }`}
                  size="sm"
                >
                  Collections
                </CustomGlassButton>
              </div>
            </div>

            {/* Right-Aligned Add Home */}
            <div>
              <CustomGlassButton
                onClick={() => setIsFormOpen(true)}
                size="sm"
                variant="solid"
                icon={<Home />}
              >
                Add Home
              </CustomGlassButton>
            </div>
          </div>

          {/* Tab Content */}
          <div className="rounded-lg border-2 border-dashed border-white/6 min-h-[650px]">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full min-h-[650px]">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="text-sm text-gray-400">Loading...</span>
                  </div>
                </div>
              }
            >
              {activeTab === "collections" && (
                <div
                  role="tabpanel"
                  id="collections-panel"
                  aria-labelledby="collections-tab"
                >
                  <SettlementsCollectionsTab />
                </div>
              )}
              {activeTab === "assets" && (
                <div
                  role="tabpanel"
                  id="assets-panel"
                  aria-labelledby="assets-tab"
                >
                  <SettlementAssetsTab />
                </div>
              )}
            </Suspense>
          </div>
        </div>

        <div className=" text-xs text-gray-500">
          Tip: use the sidebar to add quick navigation or include a compact
          activity feed.
        </div>

        <RegisterAssetForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      </div>
    </div>
  );
};

export default SettlementsPage;
