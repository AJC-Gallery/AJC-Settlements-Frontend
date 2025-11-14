// src/features/auth/components/SignInForm.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks";
import { Spinner } from "@/components/ui/spinner";
import type { LoginRequest } from "@/features/auth/types";

interface SignInFormProps {
  onSuccess?: () => void;
}

export const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
  const { mutate: login, isPending, error } = useLogin();

  const [formData, setFormData] = useState<LoginRequest>({
    usernameOrEmail: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof LoginRequest, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
        <p className="text-gray-600 mt-2">Access your account</p>
      </div>

      {/* API Error Display */}
      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{apiError}</p>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        {/* Username / Email Field */}
        <div className="mb-4">
          <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Email or Username
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            className={`w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 ${
              validationErrors.usernameOrEmail
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter your email or username"
            disabled={isPending}
          />
          {validationErrors.usernameOrEmail && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.usernameOrEmail}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 ${
              validationErrors.password
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter your password"
            disabled={isPending}
          />
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? (
            <span className="flex items-center justify-center">
              <Spinner size="sm" />
              <span className="ml-2">Signing in...</span>
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Links */}
        <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign up
            </Link>
          </p>
          <Link to="/" className="block text-sm text-gray-500 hover:text-gray-700">
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
};
