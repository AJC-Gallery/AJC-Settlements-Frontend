import React from "react";

export interface CustomGlassComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "success"
    | "danger"
    | "warning"
    | "outline"
    | "ghost"
    | "gradient"
    | "solid"
    | "dark"
    | "dashed";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconOnly?: boolean; // New prop for icon-only buttons
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * CustomGlassButton — A fully typed glassmorphism button component.
 * Icons are automatically sized and aligned based on button size.
 */
const CustomGlassButton: React.FC<CustomGlassComponentProps> = ({
  children,
  variant = "default",
  size = "md",
  icon,
  iconPosition = "left",
  iconOnly = false,
  fullWidth = false,
  disabled = false,
  onClick,
  className = "",
  ...props
}) => {
  const baseStyles = `
    relative overflow-hidden
    font-medium transition-all duration-300
    backdrop-blur-md
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-[1.02] active:scale-[0.98]"}
    ${fullWidth ? "w-full" : "inline-flex"}
    items-center justify-center gap-2
  `;

  const sizeStyles: Record<
    Required<CustomGlassComponentProps>["size"],
    string
  > = {
    sm: iconOnly ? "p-1.5 rounded-lg" : "px-3 py-1.5 text-sm rounded-lg",
    md: iconOnly ? "p-2 rounded-lg" : "px-4 py-2 text-base rounded-lg",
    lg: iconOnly ? "p-3 rounded-xl" : "px-6 py-3 text-lg rounded-xl",
    xl: iconOnly ? "p-4 rounded-xl" : "px-8 py-4 text-xl rounded-xl",
  };

  // Icon sizes based on button size
  const iconSizeStyles: Record<
    Required<CustomGlassComponentProps>["size"],
    string
  > = {
    sm: iconOnly ? "w-4 h-4" : "w-3.5 h-3.5", // 16px for icon-only, 14px with text
    md: iconOnly ? "w-5 h-5" : "w-4 h-4",     // 20px for icon-only, 16px with text
    lg: iconOnly ? "w-6 h-6" : "w-5 h-5",     // 24px for icon-only, 20px with text
    xl: iconOnly ? "w-7 h-7" : "w-6 h-6",     // 28px for icon-only, 24px with text
  };

  // Gap between icon and text based on size
  const gapStyles: Record<
    Required<CustomGlassComponentProps>["size"],
    string
  > = {
    sm: "gap-1.5",
    md: "gap-2",
    lg: "gap-2.5",
    xl: "gap-3",
  };

  const variantStyles: Record<
    Required<CustomGlassComponentProps>["variant"],
    string
  > = {
    default: `
      bg-white/10 border border-white/20
      text-white
      hover:bg-white/20 hover:border-white/30
      shadow-lg shadow-black/5
    `,
    primary: `
      bg-blue-500/20 border border-blue-400/30
      text-blue-100
      hover:bg-blue-500/30 hover:border-blue-400/50
      shadow-lg shadow-blue-500/10
    `,
    success: `
      bg-emerald-500/20 border border-emerald-400/30
      text-emerald-100
      hover:bg-emerald-500/30 hover:border-emerald-400/50
      shadow-lg shadow-emerald-500/10
    `,
    danger: `
      bg-red-500/20 border border-red-400/30
      text-red-100
      hover:bg-red-500/30 hover:border-red-400/50
      shadow-lg shadow-red-500/10
    `,
    warning: `
      bg-amber-500/20 border border-amber-400/30
      text-amber-100
      hover:bg-amber-500/30 hover:border-amber-400/50
      shadow-lg shadow-amber-500/10
    `,
    outline: `
      bg-transparent border-2 border-white/40
      text-white
      hover:bg-white/10 hover:border-white/60
      shadow-lg shadow-black/5
    `,
    ghost: `
      bg-transparent border border-transparent
      text-white/90
      hover:bg-white/10 hover:border-white/20
    `,
    gradient: `
      bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20
      border border-white/20
      text-white
      hover:from-purple-500/30 hover:via-pink-500/30 hover:to-blue-500/30
      shadow-lg shadow-purple-500/10
    `,
    solid: `
      bg-white/90 border border-white
      text-gray-900
      hover:bg-white hover:shadow-lg
      shadow-md shadow-white/20
    `,
    dark: `
      bg-black/30 border border-black/40
      text-white
      hover:bg-black/40 hover:border-black/50
      shadow-lg shadow-black/20
    `,
    dashed: `
      bg-black/10 
      border-2 border-dashed border-white/70
      text-white
      hover:bg-white/15 hover:border-white/80
      shadow-lg shadow-black/5
    `,
  };

  // Wrapper for icon to control size
  const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 ${iconSizeStyles[size]}`}
    >
      {/* Clone the icon element and force its size */}
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<{ className?: string }>, {
            className: `w-full h-full ${(children.props as { className?: string }).className || ""}`,
          })
        : children}
    </span>
  );

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />

      {/* Content with automatic icon sizing */}
      {iconOnly ? (
        // Icon-only mode: Centered icon with no text
        <span className="relative flex items-center justify-center">
          {icon && <IconWrapper>{icon}</IconWrapper>}
        </span>
      ) : (
        // Normal mode: Icon with text
        <span className={`relative flex items-center justify-center ${gapStyles[size]}`}>
          {icon && iconPosition === "left" && <IconWrapper>{icon}</IconWrapper>}
          {children && <span className="inline-flex items-center">{children}</span>}
          {icon && iconPosition === "right" && <IconWrapper>{icon}</IconWrapper>}
        </span>
      )}
    </button>
  );
};

export default CustomGlassButton;