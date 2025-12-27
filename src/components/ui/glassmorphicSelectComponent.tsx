import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface GlassSelectProps {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  width?: string;
}

const GlassSelect = ({
  value,
  onChange,
  options,
  placeholder = "Select...",
  width = "160px",
}: GlassSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative" style={{ width }}>
      {/* Select Box */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          w-full px-3 py-2 
          bg-white/5 backdrop-blur-md
          border border-white/10 
          rounded-lg 
          text-sm text-gray-300
          flex justify-between items-center
          transition-all duration-300 
          hover:bg-white/10 hover:border-white/20
        `}
      >
        <span>{options.find((o) => o.value === value)?.label || placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute left-0 mt-2 w-full 
            bg-white/5 backdrop-blur-xl border border-white/10 
            border border-white/10 
            rounded-lg shadow-xl z-20
            animate-in fade-in slide-in-from-top-2 duration-200
          "
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="
                px-3 py-2 text-sm 
                text-gray-300 
                hover:bg-white/10 
                cursor-pointer 
                transition-all
              "
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlassSelect;
