// src/features/landingPage/footerSection.tsx
import React, { useState } from "react";
import {
	Facebook,
	Twitter,
	Linkedin,
	Instagram,
	ArrowRight,
	ShieldCheck,
	Gauge,
	Lock,
} from "lucide-react";
 import CustomGlassButton from "@/components/ui/custom-button";
import Logo from "@/assets/logo2.png";
import GlassCard from "@/components/ui/glassCard";

const productLinks = ["Features", "Pricing", "Updates", "Roadmap"];
const companyLinks = ["About Us", "Contact", "Blog", "Careers"];
const legalLinks = ["Privacy Policy", "Terms of Service", "Security"];

const socials = [
	{ icon: Facebook, label: "Facebook" },
	{ icon: Twitter, label: "Twitter" },
	{ icon: Linkedin, label: "LinkedIn" },
	{ icon: Instagram, label: "Instagram" },
];

const FooterSection: React.FC = () => {
	const [email, setEmail] = useState("");

	return (
		<footer className="  px-2 pb-8 sm:px-4 lg:px-8">
			<GlassCard variant="panel">
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
					{/* Brand */}
					<div className="lg:col-span-2">
						<div className="flex items-center gap-2">
							<img
								src={Logo}
								alt="Assets"
								className="h-8 w-8 object-contain"
							/>
							<span className="text-lg font-semibold text-white">Assets</span>
						</div>
						<p className="mt-3 max-w-xs text-sm text-white/55">
							Built for landlords. Designed for peace of mind.
						</p>

						<div className="mt-6 flex flex-wrap gap-4 text-xs text-white/45">
							<span className="flex items-center gap-1.5">
								<ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
								Bank-level Security
							</span>
							<span className="flex items-center gap-1.5">
								<Gauge className="h-3.5 w-3.5 text-emerald-300" />
								99.9% Uptime
							</span>
							<span className="flex items-center gap-1.5">
								<Lock className="h-3.5 w-3.5 text-emerald-300" />
								GDPR Compliant
							</span>
						</div>
					</div>

					{/* Product */}
					<div>
						<h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/80">
							Product
						</h4>
						<ul className="mt-4 flex flex-col gap-3">
							{productLinks.map((l) => (
								<li key={l}>
									<a
										href="#"
										className="text-sm text-white/60 transition-colors hover:text-white"
									>
										{l}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div>
						<h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/80">
							Company
						</h4>
						<ul className="mt-4 flex flex-col gap-3">
							{companyLinks.map((l) => (
								<li key={l}>
									<a
										href="#"
										className="text-sm text-white/60 transition-colors hover:text-white"
									>
										{l}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300/80">
							Legal
						</h4>
						<ul className="mt-4 flex flex-col gap-3">
							{legalLinks.map((l) => (
								<li key={l}>
									<a
										href="#"
										className="text-sm text-white/60 transition-colors hover:text-white"
									>
										{l}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Newsletter */}
				<div className="mt-10 flex flex-col gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h4 className="text-sm font-semibold text-white">Stay updated</h4>
						<p className="mt-1 text-sm text-white/50">
							Get the latest updates and product news.
						</p>
					</div>

					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex w-full max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 pl-4"
					>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
						/>
						<CustomGlassButton
							type="submit"
							variant="navPrimary"
							size="sm"
							iconOnly
							icon={<ArrowRight />}
							aria-label="Subscribe"
						/>
					</form>
				</div>

				{/* Bottom row */}
				<div className="mt-8 flex flex-col-reverse items-center gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-between">
					<p className="text-xs text-white/40">
						© 2026 Assets. All rights reserved.
					</p>
					<div className="flex items-center gap-2.5">
						{socials.map(({ icon: Icon, label }) => (
							<CustomGlassButton
								key={label}
								variant="navGhost"
								size="sm"
								iconOnly
								icon={<Icon />}
								aria-label={label}
							/>
						))}
					</div>
				</div>
			</GlassCard>
		</footer>
	);
};

export default FooterSection;