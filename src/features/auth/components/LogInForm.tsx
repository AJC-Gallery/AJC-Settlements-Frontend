// src/features/auth/components/SignInForm.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/hooks";
import { Spinner } from "@/components/ui/spinner";
import CustomGlassButton from "@/components/ui/custom-button";
import GlassCard from "@/components/ui/glassCard";
import type { LoginRequest } from "@/features/auth/types";

interface SignInFormProps {
  onSuccess?: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
  const { mutate: login, isPending, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<LoginRequest>({
    usernameOrEmail: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof LoginRequest, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof LoginRequest, string>> = {};
    if (!formData.usernameOrEmail.trim()) errors.usernameOrEmail = "Username is required";
    if (!formData.password.trim()) errors.password = "Password is required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    login(formData, {
      onSuccess: () => onSuccess?.(),
    });
  };

  const apiError =
    (error as any)?.response?.data?.message ||
    (error as any)?.message ||
    null;

  return (
    <div className="relative z-10 w-full max-w-md">
      <GlassCard variant="panel" className="!px-8 !py-9 sm:!px-10 sm:!py-10">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-1.5 text-sm text-white/55">
            Sign in to continue to your account
          </p>
        </div>

        {apiError && (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-300">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email / Username */}
          <div>
            <label
              htmlFor="usernameOrEmail"
              className="mb-2 block text-sm font-medium text-white/70"
            >
              Email or Username
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                placeholder="you@example.com"
                disabled={isPending}
                className={`w-full rounded-xl border bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 transition-colors focus:outline-none focus:ring-2 ${
                  validationErrors.usernameOrEmail
                    ? "border-red-400/30 focus:ring-red-400/30"
                    : "border-white/10 focus:border-emerald-400/40 focus:ring-emerald-400/20"
                }`}
              />
            </div>
            {validationErrors.usernameOrEmail && (
              <p className="mt-1.5 text-xs text-red-300">
                {validationErrors.usernameOrEmail}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-white/70">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-emerald-300 hover:text-emerald-200"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={isPending}
                className={`w-full rounded-xl border bg-white/[0.03] py-2.5 pl-10 pr-11 text-sm text-white placeholder:text-white/30 transition-colors focus:outline-none focus:ring-2 ${
                  validationErrors.password
                    ? "border-red-400/30 focus:ring-red-400/30"
                    : "border-white/10 focus:border-emerald-400/40 focus:ring-emerald-400/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/60"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {validationErrors.password && (
              <p className="mt-1.5 text-xs text-red-300">{validationErrors.password}</p>
            )}
          </div>

          {/* Submit */}
          <CustomGlassButton
            type="submit"
            variant="heroPrimary"
            size="md"
            disabled={isPending}
            className="mt-1 w-full"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner size="sm" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </CustomGlassButton>
        </form>

        {/* Links */}
        <div className="mt-6 space-y-3 text-center">
          <p className="text-sm text-white/55">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-emerald-300 hover:text-emerald-200">
              Sign up
            </Link>
          </p>
          <Link to="/" className="block text-sm text-white/40 hover:text-white/60">
            Back to Home
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};