import { ChevronRight, type LucideIcon } from "lucide-react";
import Logo from "@/assets/logo2.png";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  badge?: boolean;
}

interface DesktopSidebarProps {
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: (value: boolean) => void;
  menuItems: MenuItem[];
  bottomItems: MenuItem[];
  handleNavigation: (path: string) => void;
  isActive: (path: string) => boolean;
}

export const DesktopSidebar = ({
  isSidebarExpanded,
  setIsSidebarExpanded,
  menuItems,
  bottomItems,
  handleNavigation,
  isActive,
}: DesktopSidebarProps) => {
  return (
     <aside
      className={`hidden md:block fixed top-1/2 -translate-y-1/2 left-4 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-[32px] lg:rounded-[48px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 ease-in-out z-50 max-h-[min(85vh,650px)]   ${
        isSidebarExpanded ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsSidebarExpanded(true)}
      onMouseLeave={() => setIsSidebarExpanded(false)}
    >
      <div className="h-full flex flex-col py-4">
        {/* Logo Section */}
         <div
          className={`flex items-center mb-2 mt-4 lg:mt-6 transition-all duration-500 ${
            isSidebarExpanded ? "justify-start px-4" : "justify-center"
          }`}
        >
          <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-xl flex items-center justify-center shadow-lg">
            <img
              src={Logo}
              alt="AJC Gallery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Menu Items */}
        <nav
          className={`flex-1 space-y-2 transition-all duration-500 ${
            isSidebarExpanded ? "px-4" : "px-2"
          }`}
        >
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
                isSidebarExpanded
                  ? "gap-4 px-3 py-3 justify-start"
                  : "justify-center py-3"
              } ${
                isActive(item.path)
                  ? "bg-white/20 text-white shadow-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span
                className={`whitespace-nowrap text-sm transition-all duration-500 ease-in-out ${
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
              {isActive(item.path) && (
                <ChevronRight
                  className={`ml-auto w-4 h-4 transition-all duration-500 ${
                    isSidebarExpanded ? "opacity-100" : "opacity-0 w-0"
                  }`}
                />
              )}
              {!isSidebarExpanded && isActive(item.path) && (
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
                isSidebarExpanded
                  ? "gap-4 px-3 py-3 justify-start"
                  : "justify-center py-3"
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span
                className={`whitespace-nowrap text-sm transition-all duration-500 ease-in-out ${
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
        <div
          className={`transition-all duration-500 ${
            isSidebarExpanded ? "px-4" : "px-2"
          }`}
        >
          <button
            className={`w-full flex items-center rounded-xl hover:bg-white/10 transition-all duration-500 ${
              isSidebarExpanded
                ? "gap-3 px-3 py-3 justify-start"
                : "justify-center py-3"
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
                Antony Joshua
              </div>
              <div className="text-white/50 text-xs whitespace-nowrap">
                Premium Account
              </div>
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
  );
};