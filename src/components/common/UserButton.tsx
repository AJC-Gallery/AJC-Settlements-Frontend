import {  useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { User, LogOut, Settings } from 'lucide-react';
import { useCurrentUser, useIsAuthenticated } from '@/hooks';

interface UserButtonProps {
  isSidebarExpanded?: boolean;
}

export const UserButton = ({ isSidebarExpanded = true }: UserButtonProps) => {
  // const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { data: user, isLoading } = useCurrentUser();
  // const { mutate: logout } = useLogout();
  const isAuthenticated = useIsAuthenticated();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // const handleLogout = () => {
  //   logout(undefined, {
  //     onSuccess: () => {
  //       setIsOpen(false);
  //       navigate('/login');
  //     },
  //     onError: (error) => {
  //       console.error('Logout failed:', error);
  //     },
  //   });
  // };

  if (isLoading || !isAuthenticated || !user) {
    return null;
  }

  const userInitials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => navigate('/profile')}
        className={`w-full flex items-center rounded-xl hover:bg-white/5 transition-all duration-500 ${
          isSidebarExpanded
            ? "gap-3 px-3 py-3 justify-start"
            : "justify-center py-3"
        }`}
        aria-label="User menu"
      >
        {/* Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-white/50 to-gray-800 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            userInitials
          )}
        </div>

        {/* User Info */}
        <div
          className={`text-left transition-all duration-500 overflow-hidden ${
            isSidebarExpanded
              ? "opacity-100 max-w-full flex-1"
              : "opacity-0 max-w-0 w-0"
          }`}
        >
          <div className="text-white text-sm font-medium whitespace-nowrap">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-white/50 text-xs whitespace-nowrap">
            {user.email}
          </div>
        </div>

        {/* Chevron */}
        {/* <ChevronRight
          className={`w-4 h-4 text-white/70 transition-all duration-500 flex-shrink-0 ${
            isSidebarExpanded ? "opacity-100" : "opacity-100 w-0"
          }`}
        /> */}
      </button>

      {/* Dropdown Menu */}
      {/* {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-56 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg py-2 z-50">
           <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm font-medium text-white">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-white/50 mt-0.5">{user.email}</p>
          </div>

           <div className="py-1">
            <button
              onClick={() => {
                navigate('/profile');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white flex items-center gap-2 transition-colors"
            >
              <User className="w-4 h-4" />
              Profile
            </button>

            <button
              onClick={() => {
                navigate('/settings');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white flex items-center gap-2 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>

           <div className="border-t border-white/10 pt-1">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};