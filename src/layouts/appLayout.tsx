import { useState, type ReactNode } from "react";
import OverlayImage from "@/assets/utils-overlay.png";
import {
  DollarSign,
  Home,
  Layers,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DesktopHeader, MobileHeader } from "@/components/ui/layout/Header";
import { MobileMenu } from "@/components/ui/layout/MobileMenu";
import { DesktopSidebar } from "@/components/ui/layout/DesktopSidebar";
 

interface AppLayoutProps {
  children?: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Layers, label: "Settlements", path: "/settlements" },
    { icon: Users, label: "Occupants", path: "/occupants" },
    { icon: DollarSign, label: "Revenue", badge: true, path: "/revenue" },
  ];

  const bottomItems = [
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: LogOut, label: "Log out", path: "/logout" },
  ];

  // Fixed: Proper navigation function with correct template literal syntax
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Fixed: Dynamic active state based on current route
  const isActive = (path: string) => {
    return location.pathname === path;
  };

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
      <div className="relative min-h-[100svh] sm:p-4">
        {/* Desktop Header */}
        <DesktopHeader />

        {/* Mobile Header */}
        <MobileHeader
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Mobile Menu */}
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          menuItems={menuItems}
          bottomItems={bottomItems}
          handleNavigation={handleNavigation}
          isActive={isActive}
        />

        <div className="relative flex">
          {/* Desktop Sidebar */}
          <DesktopSidebar
            isSidebarExpanded={isSidebarExpanded}
            setIsSidebarExpanded={setIsSidebarExpanded}
            menuItems={menuItems}
            bottomItems={bottomItems}
            handleNavigation={handleNavigation}
            isActive={isActive}
          />

          {/* Main Content */}
          <main className=" w-full px-4 mt-12 sm:mt-12 sm:px-6 lg:px-8 py-4">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
};