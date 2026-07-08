import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from '../features/auth/components';
import Logo from '@/assets/logo2.png';

export const SignUpPage: React.FC = () => {
	const navigate = useNavigate();

	const handleSignUpSuccess = () => {
		navigate('/login');
	};

	return (
		<div className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#04120c] px-4 py-10">
			{/* Noise texture overlay */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
				}}
			/>

			{/* Ambient glow */}
			<div className="pointer-events-none absolute top-0 right-0 -z-10 h-[900px] w-[900px] bg-emerald-500/10 blur-[200px]" />
			<div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[700px] w-[700px] bg-emerald-500/[0.06] blur-[180px]" />

			{/* Logo */}
			<div className="absolute left-6 top-6 flex items-center gap-2 sm:left-10 sm:top-8">
				<img src={Logo} alt="Assets" className="h-9 w-9 object-contain" />
				<span className="text-lg font-semibold text-white">Assets</span>
			</div>

			<SignUpForm onSuccess={handleSignUpSuccess} />
		</div>
	);
};