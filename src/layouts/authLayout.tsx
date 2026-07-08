// Updated AuthLayout to remove body CSS conflicts
// src/layouts/AuthLayout.tsx
import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import OverlayImage from "@/assets/utils-overlay.png";


interface AuthLayoutProps {
	children?: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
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
			{children || <Outlet />}
		</div>
	);
};
