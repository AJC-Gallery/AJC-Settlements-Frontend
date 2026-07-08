// src/components/ui/glass-card.tsx
import React from "react";

/**
 * GlassCard — shared glassmorphism surface used across the app.
 *
 * Extracted from two existing implementations:
 *  - PropertyTypeCard  (compact, tinted-green surface)      -> variant="surface"
 *  - HowItWorksSection .hiws-row (large, neutral glass panel) -> variant="panel"
 *
 * The component only owns background / border / blur / shadow / decorative
 * light effects. Layout (flex direction, gap, alignment, custom padding
 * overrides) is left to the caller via `className`, so this can wrap any
 * content shape (icon+text row, two-column split, form, etc).
 */

type GlassCardVariant = "surface" | "panel";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "surface" = compact tinted card (property cards, stat tiles, etc.)
   *  "panel"   = large neutral glass panel (feature rows, big containers) */
  variant?: GlassCardVariant;
  /** Soft radial corner glow + inset glass-shine (default: on for "surface") */
  glow?: boolean;
  /** Thin top hairline highlight, like light catching a glass edge (default: on for "panel") */
  topSheen?: boolean;
  /** Border/bg lighten on hover (default: on for "surface") */
  hoverEffect?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<GlassCardVariant, string> = {
  surface: `
    rounded-2xl
    border border-[#75CBA7]/15
    bg-[rgba(41,83,72,0.82)]
    px-8 py-8
    backdrop-blur-md
    shadow-[0_10px_28px_rgba(0,0,0,0.18)]
  `,
  panel: `
    rounded-[34px]
    border border-white/[0.045]
    bg-gradient-to-b from-white/[0.02] to-white/[0.008]
    px-8 py-10 md:px-[72px] md:py-16
    backdrop-blur-[22px]
  `,
};

const hoverStyles: Record<GlassCardVariant, string> = {
  surface: "hover:border-white/[0.14] hover:bg-white/[0.085]",
  panel: "",
};

const defaultGlow: Record<GlassCardVariant, boolean> = {
  surface: true,
  panel: false,
};

const defaultTopSheen: Record<GlassCardVariant, boolean> = {
  surface: false,
  panel: true,
};

const defaultHover: Record<GlassCardVariant, boolean> = {
  surface: true,
  panel: false,
};

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = "surface",
  glow,
  topSheen,
  hoverEffect,
  className = "",
  children,
  ...props
}) => {
  const showGlow = glow ?? defaultGlow[variant];
  const showTopSheen = topSheen ?? defaultTopSheen[variant];
  const showHover = hoverEffect ?? defaultHover[variant];

  return (
    <div
      className={`
        group relative overflow-hidden
        transition-all duration-300 ease-out
        ${variantStyles[variant]}
        ${showHover ? hoverStyles[variant] : ""}
        ${className}
      `}
      {...props}
    >
      {/* Corner glow + glass-shine (surface style) */}
      {showGlow && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              boxShadow: `
                inset 0 1px 0 rgba(170,255,215,.05),
                inset 0 0 0 1px rgba(110,255,185,.08),
                0 0 24px rgba(25,140,95,.12)
              `,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background:
                "radial-gradient(140% 100% at 20% -20%, rgba(90,255,180,.08), transparent 60%)",
            }}
          />
        </>
      )}

      {/* Top hairline sheen (panel style) */}
      {showTopSheen && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
        />
      )}

      {children}
    </div>
  );
};

export default GlassCard;