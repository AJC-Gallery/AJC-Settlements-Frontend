import React, { useState } from "react";
import { useRegister } from "@/hooks";
import type { RegisterRequest } from "@/features/auth/types";
import { Spinner } from "@/components/ui/spinner";
import SelectField from "@/components/ui/selectField";
import CustomGlassButton from "@/components/ui/custom-button";
import GlassCard from "@/components/ui/glassCard";
import { useNavigate, Link } from "react-router-dom";

interface SignUpFormProps {
  onSuccess?: () => void;
}

const inputClass = (hasError?: boolean) =>
  `w-full rounded-xl border bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-400/30 focus:ring-red-400/30"
      : "border-white/10 focus:border-emerald-400/40 focus:ring-emerald-400/20"
  }`;

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { mutate: register, isPending, error } = useRegister();

  const [formData, setFormData] = useState<RegisterRequest>({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    otherName: "",
    gender: "MALE",
    nationality: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof RegisterRequest, string>>
  >({});

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof RegisterRequest, string>> = {};

    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email format";

    if (!formData.username.trim()) errors.username = "Username is required";

    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";

    if (formData.password !== confirmPassword)
      errors.password = "Passwords do not match";

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.nationality.trim())
      errors.nationality = "Nationality is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    register(formData, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
        else navigate("/sign-in");
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (validationErrors[name as keyof RegisterRequest]) {
      setValidationErrors((p) => ({ ...p, [name]: "" }));
    }
  };

  const apiError =
    typeof error === "string" ? error : (error as any)?.message || null;

  return (
    <div className="relative z-10 w-full max-w-lg">
      <GlassCard variant="panel" className="!px-8 !py-9 sm:!px-10 sm:!py-10">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="mt-1.5 text-sm text-white/55">
            Join Assets and start managing your properties
          </p>
        </div>

        {apiError && (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-300">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClass(!!validationErrors.email)}
              disabled={isPending}
            />
            {validationErrors.email && (
              <p className="mt-1.5 text-xs text-red-300">{validationErrors.email}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-white/70">
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className={inputClass(!!validationErrors.username)}
              disabled={isPending}
            />
            {validationErrors.username && (
              <p className="mt-1.5 text-xs text-red-300">{validationErrors.username}</p>
            )}
          </div>

          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-white/70">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={inputClass(!!validationErrors.firstName)}
                disabled={isPending}
              />
              {validationErrors.firstName && (
                <p className="mt-1.5 text-xs text-red-300">{validationErrors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-white/70">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={inputClass(!!validationErrors.lastName)}
                disabled={isPending}
              />
              {validationErrors.lastName && (
                <p className="mt-1.5 text-xs text-red-300">{validationErrors.lastName}</p>
              )}
            </div>
          </div>

          {/* Other Name */}
          <div>
            <label htmlFor="otherName" className="mb-2 block text-sm font-medium text-white/70">
              Other Name (Optional)
            </label>
            <input
              type="text"
              id="otherName"
              name="otherName"
              value={formData.otherName}
              onChange={handleChange}
              className={inputClass()}
              disabled={isPending}
            />
          </div>

          {/* Gender + Nationality */}
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              id="gender"
              name="gender"
              label="Gender"
              required
              value={formData.gender}
              onChange={handleChange}
              options={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" },
                { label: "Other", value: "OTHER" },
              ]}
              disabled={isPending}
            />
            <div>
              <label htmlFor="nationality" className="mb-2 block text-sm font-medium text-white/70">
                Nationality *
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className={inputClass(!!validationErrors.nationality)}
                disabled={isPending}
              />
              {validationErrors.nationality && (
                <p className="mt-1.5 text-xs text-red-300">{validationErrors.nationality}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-white/70">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className={inputClass(!!validationErrors.password)}
              disabled={isPending}
            />
            {validationErrors.password && (
              <p className="mt-1.5 text-xs text-red-300">{validationErrors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-white/70">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className={inputClass()}
              disabled={isPending}
            />
          </div>

          {/* Submit */}
          <CustomGlassButton
            type="submit"
            variant="heroPrimary"
            size="md"
            disabled={isPending}
            className="mt-2 w-full"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner size="sm" />
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </CustomGlassButton>
        </form>

        <div className="mt-6 space-y-3 text-center">
          <p className="text-sm text-white/55">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-emerald-300 hover:text-emerald-200">
              Sign in
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