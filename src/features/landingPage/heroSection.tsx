import CustomGlassButton from "@/components/ui/custom-button";
import { Globe, Home, Play, ShieldCheck } from "lucide-react";
import HeroImage from "@/assets/demo-page.png";

const HeroSection = () => {
	return (
		<div className="  flex flex-col items-center gap-10 px-2 sm:px-4   lg:flex-row lg:items-center lg:gap-8 xl:gap-12 lg:px-8">
			{/* Left: copy + CTAs */}
			<div className="w-full text-center lg:flex-1 lg:max-w-sm lg:text-left xl:max-w-md 2xl:max-w-xl">
				<h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
					The all-in-one workspace for modern landlords.
				</h1>
				<p className="mt-4 text-base text-white/60 sm:text-lg lg:mt-3 lg:text-sm xl:mt-4 xl:text-base 2xl:text-lg">
					Manage your properties, track occupancy, organize
					settlements and prepare for the future of property
					management.
				</p>

				<div className="mt-8 flex flex-wrap justify-center gap-3 lg:mt-6 lg:justify-start xl:mt-8">
					<CustomGlassButton variant="heroPrimary" size="md">
						Start Free →
					</CustomGlassButton>
					<CustomGlassButton
						variant="heroSecondary"
						size="md"
						icon={<Play />}
						iconPosition="left"
					>
						Watch Demo
					</CustomGlassButton>
				</div>

				<div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-white/50 sm:gap-6 lg:mt-8 lg:justify-start lg:gap-4 lg:text-xs xl:mt-10 xl:gap-6 xl:text-sm">
					<span className="flex items-center gap-1.5">
						<ShieldCheck className="h-4 w-4" /> Secure & Reliable
					</span>
					<span className="flex items-center gap-1.5">
						<Home className="h-4 w-4" /> Designed for Landlords
					</span>
					<span className="flex items-center gap-1.5">
						<Globe className="h-4 w-4" /> Works Anywhere
					</span>
				</div>
			</div>

			{/* Right: dashboard mockup, bleeds past edge on large screens only */}
		<div className="w-full lg:relative lg:flex-1">
	{/* Glow layer — emanates from beneath the card */}
	<div
		className="
				pointer-events-none absolute inset-0 -z-10 hidden
				bg-emerald-500/40 blur-[120px]
				scale-90 translate-y-10
				lg:block
			"
	/>

	<div
		className="
				mx-auto w-full max-w-[640px] rounded-2xl border border-white/10
				bg-black/30 backdrop-blur-xl
				shadow-[0_20px_40px_rgba(16,185,129,0.2)]
				sm:shadow-[0_30px_60px_rgba(16,185,129,0.22)]
				lg:mx-0 lg:w-[78%] lg:max-w-none
				xl:w-[85%]
				2xl:w-[90%]
				lg:[transform:perspective(1400px)_rotateY(-14deg)_rotateX(4deg)]
				lg:translate-x-4 xl:translate-x-6 2xl:translate-x-8
				lg:shadow-[0_40px_100px_rgba(16,185,129,0.25)]
			"
	>
		<img
			src={HeroImage}
			alt="Dashboard mockup"
			className="h-full w-full rounded-2xl object-cover"
		/>
	</div>
</div>
		</div>
	);
};

export default HeroSection;
