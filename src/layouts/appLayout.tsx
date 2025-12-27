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
 import { useLogout } from "@/hooks/useAuth";

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
  const { mutate: logout } = useLogout();

  const bottomItems = [
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: LogOut, label: "Log out", path: "/logout" },
  ];
  
 const handleNavigation = (path: string) => {
  if (path === "/logout") {
    logout(); // <-- trigger logout hook
    navigate("/login"); // redirect user after logout
    return;
  }

  navigate(path);
  setIsMobileMenuOpen(false);
};

  
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
        
        {/* Main Content - Responsive to sidebar state */}
        <main 
          className={`w-full px-4 sm:px-6 py-4 transition-all duration-500 ease-in-out
            mt-14 sm:mt-16 md:mt-0 min-h-[88svh] md:flex md:items-center
            ${isSidebarExpanded 
              ? "md:ml-60 lg:ml-64" 
              : "md:ml-22 lg:ml-24"
            }`}
        >
          {children || <Outlet />}
        </main>
      </div>
    </div>
  </div>
);
};