// src/pages/HomePage.tsx
import React from "react";

import PropertyTypesSection from "@/features/landingPage/propertyTypeSection";
import HowItWorksSection from "@/features/landingPage/howItWorksSection";
import PricingSection from "@/features/landingPage/pricingSection";
import FooterSection from "@/features/landingPage/footerSection";
import HeroSection from "@/features/landingPage/heroSection";
import NavSection from "@/features/landingPage/navSection";
export const LandingPage: React.FC = () => {
	return (
		<div className="relative min-h-screen overflow-hidden bg-[#04120c] px-4 py-2 space-y-42 sm:px-6 lg:px-7">
			{/* Noise texture overlay */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
				}}
			/>

			{/* Ambient background glow */}
			<div className="pointer-events-none absolute top-0 right-0 -z-10 h-[900px] w-[900px] bg-emerald-500/10 blur-[200px]" />

			{/* Navigation */}
			<div className="relative z-20">
				<NavSection />
			</div>
			<div className="relative z-10">
				<HeroSection />
			</div>
			<div className="relative z-10">
				<PropertyTypesSection />
			</div>
			<div className="relative z-10">
				<HowItWorksSection />
			</div>
			<div className="relative z-10">
				<PricingSection />
			</div>

			<FooterSection />
		</div>
	);
};

// // src/pages/HomePage.tsx
// import React from "react";
// import { useCurrentUser } from "@/hooks/useAuth";
// import Logo from "@/assets/logo2.png";
// import HeroImage from "@/assets/demo-page.png";

// import { Play } from "lucide-react";
// import CustomGlassButton from "@/components/ui/custom-button";

// export const LandingPage: React.FC = () => {
// 	const { data: user, isSuccess } = useCurrentUser();
// 	const isAuthenticated = isSuccess && !!user;

// 	return (
// 		<div className="relative min-h-screen px-7 py-2 overflow-hidden bg-[#04120c]">
// 			{/* Noise texture overlay — sits over the whole page background */}
// 			<div
// 				className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
// 				style={{
// 					backgroundImage:
// 						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
// 				}}
// 			/>

// 			{/* Ambient background glow, page-wide, subtle */}
// 			<div className="pointer-events-none absolute top-0 right-0 w-[900px] h-[900px] bg-emerald-500/10 blur-[200px] -z-10" />

// 			{/* Navigation */}
// 			<nav className="relative z-20 flex justify-between items-center px-8 pt-4">
// 				<div className="w-24 h-24 shrink-0">
// 					<img
// 						src={Logo}
// 						alt="AJC Gallery"
// 						className="w-full h-full object-contain"
// 					/>
// 				</div>

// 				<div className="flex gap-10 items-center">
// 					<a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
// 						Features
// 					</a>
// 					<a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
// 						Pricing
// 					</a>
// 					<a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
// 						About
// 					</a>
// 					<a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
// 						Contact
// 					</a>
// 				</div>

// 				<div className="flex gap-3 items-center">
// 					<CustomGlassButton variant="navGhost" size="sm">
// 						Login
// 					</CustomGlassButton>
// 					<CustomGlassButton variant="navPrimary" size="sm">
// 						Get Started
// 					</CustomGlassButton>
// 				</div>
// 			</nav>

// 			{/* Hero */}
// 			<section className="relative z-10 px-8 mt-20 flex items-center gap-16">
// 				{/* Left: copy + CTAs */}
// 				<div className="flex-1 max-w-lg">
// 					<h1 className="text-5xl font-bold text-white leading-tight tracking-tight">
// 						The all-in-one workspace for modern landlords.
// 					</h1>
// 					<p className="mt-5 text-white/60 text-lg leading-relaxed">
// 						Manage your properties, track occupancy, organize settlements
// 						and prepare for the future of property management.
// 					</p>

// 					<div className="flex gap-3 mt-8">
// 						<CustomGlassButton variant="heroPrimary" size="md">
// 							Start Free →
// 						</CustomGlassButton>
// 						<CustomGlassButton
// 							variant="heroSecondary"
// 							size="md"
// 							icon={<Play />}
// 							iconPosition="left"
// 						>
// 							Watch Demo
// 						</CustomGlassButton>
// 					</div>

// 					<div className="flex gap-6 mt-10 text-sm text-white/50">
// 						<span>Secure & Reliable</span>
// 						<span>Designed for Landlords</span>
// 						<span>Works Anywhere</span>
// 					</div>
// 				</div>

// 				{/* Right: dashboard mockup, bleeds past edge */}
// 				<div className="flex-1 relative">
// 					{/* Glow layer — emanates from beneath the card */}
// 					<div
// 						className="
// 							absolute inset-0 -z-10
// 							bg-emerald-500/40
// 							blur-[120px]
// 							scale-90
// 							translate-y-10
// 						"
// 					/>

// 					{/* Back layer — creates the stacked-sheet depth illusion */}
// 					<div
// 						className="
// 							absolute inset-0 z-0
// 							rounded-2xl border border-white/5
// 							bg-black/20
// 							[transform:perspective(1400px)_rotateY(-14deg)_rotateX(4deg)_translateZ(-40px)]
// 							translate-x-12 translate-y-4
// 							opacity-40
// 						"
// 					/>
// 					{/* Second back layer — even further back, barely visible, adds thickness */}
// 					<div
// 						className="
// 							absolute inset-0 -z-[1]
// 							rounded-2xl border border-white/5
// 							bg-black/10
// 							[transform:perspective(1400px)_rotateY(-14deg)_rotateX(4deg)_translateZ(-70px)]
// 							translate-x-16 translate-y-7
// 							opacity-20
// 						"
// 					/>

// 					{/* Main dashboard card */}
// 					<div
// 						className="
// 							relative z-10
// 							w-[90%] rounded-2xl border border-white/10
// 							bg-black/30 backdrop-blur-xl
// 							shadow-[0_40px_100px_rgba(16,185,129,0.25)]
// 							[transform:perspective(1400px)_rotateY(-14deg)_rotateX(4deg)]
// 							translate-x-8
// 							overflow-hidden
// 						"
// 					>
// 						<img
// 							src={HeroImage}
// 							alt="Dashboard mockup"
// 							className="w-full h-full object-cover rounded-2xl"
// 						/>
// 					</div>
// 				</div>
// 			</section>
// 		</div>
// 	);
// };
