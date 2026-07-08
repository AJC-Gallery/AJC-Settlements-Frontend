// src/features/landingPage/pricingSection.tsx
import React from "react";
import { Check, Home, Briefcase, Sparkles, ShieldCheck, Headphones } from "lucide-react";
 import CustomGlassButton from "@/components/ui/custom-button";
import GlassCard from "@/components/ui/glassCard";

const starterFeatures = ["Up to 3 properties", "Basic features", "Email support"];
const proFeatures = ["Unlimited properties", "All advanced features", "Priority support"];

const PricingSection: React.FC = () => {
	return (
		<section className="  px-2 sm:px-4 lg:px-8">
			<GlassCard variant="panel">
				<div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
					{/* Left: copy */}
					<div className="lg:max-w-sm lg:flex-1 xl:max-w-md">
						<span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200/90">
							<Sparkles className="h-3.5 w-3.5" />
							Trusted by 10,000+ landlords
						</span>

						<h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
							Start managing your properties{" "}
							<span className="text-emerald-300">like a pro.</span>
						</h2>

						<p className="mt-4 text-base text-white/60">
							Join thousands of landlords already using Assets to simplify
							their property management.
						</p>

						<div className="mt-8 flex flex-col gap-3">
							<span className="flex items-center gap-2 text-sm text-white/50">
								<ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />
								Secure &amp; Reliable — your data is always protected
							</span>
							<span className="flex items-center gap-2 text-sm text-white/50">
								<Headphones className="h-4 w-4 shrink-0 text-emerald-300" />
								24/7 Support — we're here to help anytime
							</span>
						</div>
					</div>

					{/* Right: plan cards */}
					<div className="grid gap-5 sm:grid-cols-2 lg:flex-1">
						{/* Starter */}
						<GlassCard variant="surface" className="flex !flex-col !px-7 !py-7">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/15">
								<Home className="h-5 w-5 text-emerald-300" />
							</div>
							<h3 className="mt-5 text-xl font-semibold text-white">Starter</h3>
							<p className="mt-1.5 text-sm text-white/55">
								Everything you need to manage your first properties.
							</p>
							<div className="mt-6 flex items-baseline gap-1">
								<span className="text-3xl font-bold text-white">₦0</span>
								<span className="text-sm text-white/50">/month</span>
							</div>
							<p className="mt-1 text-xs text-white/40">Get started for free.</p>

							<CustomGlassButton
								variant="heroSecondary"
								size="md"
								className="mt-6 w-full"
							>
								Start Free
							</CustomGlassButton>

							<ul className="mt-7 flex flex-col gap-3">
								{starterFeatures.map((f) => (
									<li
										key={f}
										className="flex items-center gap-2.5 text-sm text-white/70"
									>
										<Check className="h-4 w-4 shrink-0 text-emerald-300" />
										{f}
									</li>
								))}
							</ul>
						</GlassCard>

						{/* Professional */}
						<GlassCard
							variant="surface"
							className="relative flex !flex-col !border-emerald-300/30 !px-7 !py-7"
						>
							<span className="absolute right-6 top-6 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-200">
								Most popular
							</span>

							<div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-400/20">
								<Briefcase className="h-5 w-5 text-emerald-200" />
							</div>
							<h3 className="mt-5 text-xl font-semibold text-white">
								Professional
							</h3>
							<p className="mt-1.5 text-sm text-white/55">
								Advanced tools for growing portfolios and teams.
							</p>
							<div className="mt-6 flex items-baseline gap-1">
								<span className="text-3xl font-bold text-white">₦12,500</span>
								<span className="text-sm text-white/50">/month</span>
							</div>
							<p className="mt-1 text-xs text-white/40">Cancel anytime.</p>

							<CustomGlassButton
								variant="heroPrimary"
								size="md"
								className="mt-6 w-full"
							>
								Get Started
							</CustomGlassButton>

							<ul className="mt-7 flex flex-col gap-3">
								{proFeatures.map((f) => (
									<li
										key={f}
										className="flex items-center gap-2.5 text-sm text-white/80"
									>
										<Check className="h-4 w-4 shrink-0 text-emerald-300" />
										{f}
									</li>
								))}
							</ul>
						</GlassCard>
					</div>
				</div>
			</GlassCard>
		</section>
	);
};

export default PricingSection;