import { useState, type ReactNode } from "react";
import OverlayImage from "@/assets/utils-overlay.png";
import Logo from "@/assets/logo2.png";
import {
  ChevronRight,
  DollarSign,
  GalleryHorizontal,
  Home,
  LandPlot,
  LogOut,
  Settings,
} from "lucide-react";

interface AppLayoutProps {
  children?: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const menuItems = [
    { icon: Home, label: "Home", active: true },
    { icon: GalleryHorizontal, label: "Gallery" },
    { icon: LandPlot, label: "Inventory" },
    { icon: DollarSign, label: "Pricing", badge: true },
  ];

  const bottomItems = [
    // { icon: Info, label: "Information" },
    { icon: Settings, label: "Settings" },
    { icon: LogOut, label: "Log out" },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Base Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a2f2a] via-[#0d3d35] to-[#050f0d] -z-20"></div>

      {/* Overlay Pattern - Separate Layer */}
      <div
        className="fixed inset-0 opacity-[0.3] pointer-events-none -z-10"
        style={{
          backgroundImage: `url(${OverlayImage})`,
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          maskImage: `
            radial-gradient(
              circle at 50% 50%,
              rgba(0,0,0,1) 30%,
              rgba(0,0,0,0.9) 40%,
              rgba(0,0,0,0.7) 50%,
              rgba(0,0,0,0.4) 65%,
              rgba(0,0,0,0.1) 80%,
              transparent 100%
            ),
            radial-gradient(
              ellipse at 70% 30%,
              rgba(0,0,0,0.5) 10%,
              transparent 60%
            ),
            radial-gradient(
              ellipse at 30% 70%,
              rgba(0,0,0,0.6) 15%,
              transparent 55%
            )
          `,
          WebkitMaskImage: `
            radial-gradient(
              circle at 50% 50%,
              rgba(0,0,0,1) 30%,
              rgba(0,0,0,0.9) 40%,
              rgba(0,0,0,0.7) 50%,
              rgba(0,0,0,0.4) 65%,
              rgba(0,0,0,0.1) 80%,
              transparent 100%
            ),
            radial-gradient(
              ellipse at 70% 30%,
              rgba(0,0,0,0.5) 10%,
              transparent 60%
            ),
            radial-gradient(
              ellipse at 30% 70%,
              rgba(0,0,0,0.6) 15%,
              transparent 55%
            )
          `,
          maskComposite: "add, add, add",
          WebkitMaskComposite: "source-over",
        }}
      ></div>

      {/* Content Container */}
      <div className="relative min-h-screen p-4">
       <aside
  className={`fixed left-4 top-27 bottom-4 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-[48px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 ease-in-out z-50 ${
    isSidebarExpanded ? "w-64" : "w-20"
  }`}
  onMouseEnter={() => setIsSidebarExpanded(true)}
  onMouseLeave={() => setIsSidebarExpanded(false)}
>
  <div className="h-full flex flex-col">
    {/* Logo Section */}
    <div className={`flex items-center mb-2 mt-6 transition-all duration-500 ${
      isSidebarExpanded ? "justify-start px-4" : "justify-center"
    }`}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
        <img
          src={Logo}
          alt="AJC Gallery"
          className="w-full h-full object-contain"
        />
      </div>
    </div>

    {/* Menu Items */}
    <nav className={`flex-1 space-y-2 transition-all duration-500 ${
      isSidebarExpanded ? "px-4" : "px-2"
    }`}>
      <div
        className={`text-xs text-white/50 mb-3 px-3 transition-all duration-500 ease-in-out ${
          isSidebarExpanded
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4"
        }`}
      >
        MENU
      </div>

      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`w-full flex items-center rounded-xl transition-all duration-500 group relative ${
            isSidebarExpanded ? "gap-4 px-3 py-3 justify-start" : "justify-center py-3"
          } ${
            item.active
              ? "bg-white/20 text-white shadow-lg"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          <item.icon className="w-5 h-5 flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
              isSidebarExpanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 w-0 -translate-x-4"
            }`}
          >
            {item.label}
          </span>
          {item.badge && (
            <div
              className={`ml-auto w-2 h-2 bg-white rounded-full transition-all duration-500 ${
                isSidebarExpanded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          {item.active && (
            <ChevronRight
              className={`ml-auto w-4 h-4 transition-all duration-500 ${
                isSidebarExpanded ? "opacity-100" : "opacity-0 w-0"
              }`}
            />
          )}
          {!isSidebarExpanded && item.active && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
          )}
        </button>
      ))}

      {/* Divider */}
      <div className="h-px bg-white/10 my-4" />

      {/* Bottom Items */}
      {bottomItems.map((item, index) => (
        <button
          key={index}
          className={`w-full flex items-center rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all duration-500 ${
            isSidebarExpanded ? "gap-4 px-3 py-3 justify-start" : "justify-center py-3"
          }`}
        >
          <item.icon className="w-5 h-5 flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-all duration-500 ease-in-out ${
              isSidebarExpanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 w-0 -translate-x-4"
            }`}
          >
            {item.label}
          </span>
        </button>
      ))}
    </nav>

    {/* User Profile */}
    <div className={`transition-all duration-500 ${
      isSidebarExpanded ? "px-4 pb-4" : "px-2 pb-4"
    }`}>
      <button
        className={`w-full flex items-center rounded-xl hover:bg-white/10 transition-all duration-500 ${
          isSidebarExpanded ? "gap-3 px-3 py-3 justify-start" : "justify-center py-3"
        }`}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-white/50 to-gray-800 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
          AJ
        </div>

        <div
          className={`text-left transition-all duration-500 overflow-hidden ${
            isSidebarExpanded 
              ? "opacity-100 max-w-full flex-1" 
              : "opacity-0 max-w-0 w-0"
          }`}
        >
          <div className="text-white text-sm font-medium whitespace-nowrap">
            Hesala hertz
          </div>
          <div className="text-white/50 text-xs whitespace-nowrap">Premium Account</div>
        </div>

        <ChevronRight
          className={`w-4 h-4 text-white/70 transition-all duration-500 flex-shrink-0 ${
            isSidebarExpanded ? "opacity-100" : "opacity-0 w-0"
          }`}
        />
      </button>
    </div>
  </div>
</aside>

        {/* Header */}
        <header className="max-w-7xl mx-auto bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-md rounded-4xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <span className="text-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] font-bold text-white/90">
                AJC Gallery
              </span>

              <div className="flex self items-end gap-3">
                <button className="px-4 py-2 bg-transparent underline text-white transition-colors">
                  Contact us
                </button>
                <button className="px-4 py-2 bg-transparent underline text-white transition-colors">
                  Organization
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};
