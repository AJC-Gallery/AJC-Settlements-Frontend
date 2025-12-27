import React, { useState } from "react";
import { useRegister } from "@/hooks";
import type { RegisterRequest } from "@/features/auth/types";
import { Spinner } from "@/components/ui/spinner";
import SelectField from "@/components/ui/selectField";
import { useNavigate } from "react-router-dom";

interface SignUpFormProps {
  onSuccess?: () => void;
}

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
        // Use onSuccess callback if provided, otherwise redirect
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

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Account
        </h1>
        <p className="text-gray-600">Join us and start your journey today</p>
      </div>

      {/* API Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">
            {typeof error === "string" ? error : error?.message || "Registration failed"}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg text-black space-y-4"
      >
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 ${
              validationErrors.email
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={isPending}
          />
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 ${
              validationErrors.username
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={isPending}
          />
          {validationErrors.username && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.username}</p>
          )}
        </div>

        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 ${
                validationErrors.firstName
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={isPending}
            />
            {validationErrors.firstName && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 ${
                validationErrors.lastName
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={isPending}
            />
            {validationErrors.lastName && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
            )}
          </div>
        </div>

        {/* Other Name */}
        <div>
          <label htmlFor="otherName" className="block text-sm font-medium text-gray-700 mb-1">
            Other Name (Optional)
          </label>
          <input
            type="text"
            id="otherName"
            name="otherName"
            value={formData.otherName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
              Nationality *
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 ${
                validationErrors.nationality
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={isPending}
            />
            {validationErrors.nationality && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.nationality}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 ${
              validationErrors.password
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={isPending}
          />
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password *
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? (
            <span className="flex items-center justify-center">
              <Spinner size="sm" />
              <span className="ml-2">Creating account...</span>
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign in
            </a>
          </p>
          <a href="/" className="block text-sm text-gray-500 hover:text-gray-700">
            Back to Home
          </a>
        </div>
      </form>
    </div>
  );
};
