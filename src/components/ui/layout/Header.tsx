import { Menu, X } from "lucide-react";
import Logo from "@/assets/logo2.png";
import { useNavigate } from "react-router-dom";

interface MobileHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export const MobileHeader = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: MobileHeaderProps) =>{ 
     
  return (
  <header className="md:hidden fixed top-0 left-0 right-0 z-50 w-full bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
    <div className="px-4">
      <div className="flex justify-between items-center h-14">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img
              src={Logo}
              alt="AJC"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] font-bold text-white/90">
             Assets
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>
  </header>
);}

export const DesktopHeader = () =>{
        const navigate = useNavigate();
 const handleTabtClick = () => {
    navigate(`/contact-info`);
  };
   return (
  <header className="hidden md:block w-full max-w-7xl mx-auto bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-md rounded-3xl lg:rounded-4xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative z-30">
    <div className="px-4 lg:px-8">
      <div className="flex justify-between items-center h-14 lg:h-16">
        <span className="text-2xl lg:text-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] font-bold text-white/90">
           Assets
        </span>
        <div className="flex items-end gap-2 lg:gap-3">
          <button 
          onClick={handleTabtClick}
          className="px-3 lg:px-4 py-2 bg-transparent underline text-sm lg:text-base text-white transition-colors hover:text-white/80">
            Contact us
          </button>
          <button 
          onClick={handleTabtClick}
          className="px-3 lg:px-4 py-2 bg-transparent underline text-sm lg:text-base text-white transition-colors hover:text-white/80">
            Organization
          </button>
        </div>
      </div>
    </div>
  </header>
);}