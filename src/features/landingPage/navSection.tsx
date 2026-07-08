import Logo from "@/assets/logo2.png";
import CustomGlassButton from "@/components/ui/custom-button";
import { useCurrentUser } from "@/hooks";
import { useNavigate } from "react-router-dom";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
	{ label: "Features", href: "#features" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "About", href: "#how-it-works" },
	{ label: "Contact", href: "#contact" },
];

const NavSection = () => {
	const { data: user, isSuccess } = useCurrentUser();
	const isAuthenticated = !isSuccess && !!user;
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<div>
			<nav className="flex items-center justify-between px-2 sm:px-4 lg:px-8">
				<div className="h-14 w-14 shrink-0 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
					<img src={Logo} alt="AJC Gallery" className="h-full w-full object-contain" />
				</div>

				{/* Desktop links */}
				<div className="hidden items-center gap-4 md:flex lg:gap-6">
					{navLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className="text-white/80 transition-colors hover:text-white"
						>
							{link.label}
						</a>
					))}
				</div>

				{/* Desktop CTAs */}
				<div className="hidden items-center gap-3 md:flex">
					{isAuthenticated ? (
						<CustomGlassButton
							variant="navPrimary"
							size="sm"
							onClick={() => navigate("/dashboard")}
						>
							Dashboard
						</CustomGlassButton>
					) : (
						<>
							<CustomGlassButton
								variant="navGhost"
								size="sm"
								onClick={() => navigate("/login")}
							>
								Login
							</CustomGlassButton>
							<CustomGlassButton
								variant="navPrimary"
								size="sm"
								onClick={() => navigate("/register")}
							>
								Get Started
							</CustomGlassButton>
						</>
					)}
				</div>

				{/* Mobile menu toggle */}
				<button
					type="button"
					onClick={() => setMenuOpen((v) => !v)}
					className="text-white/80 hover:text-white md:hidden"
					aria-label="Toggle menu"
				>
					{menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>
			</nav>

			{/* Mobile menu panel */}
			{menuOpen && (
				<div className="mt-3 flex flex-col gap-4 rounded-xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl md:hidden">
					{navLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							onClick={() => setMenuOpen(false)}
							className="text-white/80 transition-colors hover:text-white"
						>
							{link.label}
						</a>
					))}
					<div className="mt-2 flex gap-3">
						{isAuthenticated ? (
							<CustomGlassButton
								variant="navPrimary"
								size="sm"
								onClick={() => {
									setMenuOpen(false);
									navigate("/dashboard");
								}}
							>
								Dashboard
							</CustomGlassButton>
						) : (
							<>
								<CustomGlassButton
									variant="navGhost"
									size="sm"
									onClick={() => {
										setMenuOpen(false);
										navigate("/login");
									}}
								>
									Login
								</CustomGlassButton>
								<CustomGlassButton
									variant="navPrimary"
									size="sm"
									onClick={() => {
										setMenuOpen(false);
										navigate("/register");
									}}
								>
									Get Started
								</CustomGlassButton>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default NavSection;