import { ChevronRight, type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  badge?: boolean;
}

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  menuItems: MenuItem[];
  bottomItems: MenuItem[];
  handleNavigation: (path: string) => void;
  isActive: (path: string) => boolean;
}

export const MobileMenu = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  menuItems,
  bottomItems,
  handleNavigation,
  isActive,
}: MobileMenuProps) => {

   const navigate = useNavigate();
  const handleTabtClick = (e:string) => {
    navigate(`/${e}`);
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      {/* Fixed: Mobile Menu Overlay - now properly closes menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 right-2 left-2 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] 
          z-50 transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        onClick={(e) => e.stopPropagation()} // Fixed: Prevent clicks inside menu from closing it
      >
        <div className="p-4">
          {/* User Profile - Mobile */}
          <div className="mb-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-10 h-10 bg-gradient-to-br from-white/50 to-gray-800 rounded-full flex items-center justify-center text-white font-semibold">
                AJ
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">
                  Antony Joshua
                </div>
                <div className="text-white/50 text-xs">Premium Account</div>
              </div>
            </div>
          </div>

          {/* Menu Items - Mobile */}
          <nav className="space-y-1 mb-4">
            <div className="text-xs text-white/50 mb-2 px-3">MENU</div>
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  isActive(item.path)
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-left text-sm">{item.label}</span>
                {item.badge && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
                {isActive(item.path) && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </nav>

          {/* Fixed: Bottom Items - now properly navigate */}
          <div className="pt-4 border-t border-white/10 space-y-1">
            {bottomItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Header Actions - Mobile */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <button onClick={() => handleTabtClick("contact-info")} className="w-full px-3 py-2 bg-transparent underline text-sm text-white text-left">
              Contact us
            </button>
            <button onClick={() => handleTabtClick("organizations")} className="w-full px-3 py-2 bg-transparent underline text-sm text-white text-left">
              Organization
            </button>
          </div>
        </div>
      </div>
    </>
  );
};