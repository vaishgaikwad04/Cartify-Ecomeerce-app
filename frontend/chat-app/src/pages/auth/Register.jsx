import React, { useContext } from "react";
import InputField from "../../components/ui/InputField";
import Dropdown from "../../components/ui/Dropdown";
import { useRegister } from "../../hooks/auth/useRegister";
import { ThemeContext } from "../../context/ThemeContext";

const Register = ({ isLogin, setIsLogin }) => {
  // Get current theme from context (Dark Mode or Light Mode)
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // Get registration form handlers and state from custom hook
  const {
    handleChange, // Handler for form input changes
    handleSubmit, // Handler for form submission
    handleLogin, // Handler for Google OAuth login
    formData, // Current form data (name, email, password, role)
    error, // Error message from registration attempt
    sucess, // Success message after registration
  } = useRegister();

  // Available role options for user selection
  const roleOptions = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  return (
    // Main container with responsive padding and dark/light theme support
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 transition-colors duration-300
      ${
        isDark
          ? "bg-gray-950"
          : "bg-gradient-to-br from-gray-100 via-gray-50 to-white"
      }`}
    >
      {/*} Registration card container*/}
      <div
        className={`w-full max-w-md rounded-2xl border shadow-xl p-8 transition-all duration-300
        ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
      >
        {/* ===== TITLE SECTION ===== */}
        <div className="text-center mb-6">
          <h2
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Create Account
          </h2>

          {/* Subtitle */}
          <p
            className={`mt-2 text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Create your account to continue shopping.
          </p>
        </div>

        {/* ===== ERROR & SUCCESS MESSAGES SECTION ===== */}
        {error && (
          <div
            className={`mb-4 rounded-lg px-4 py-3 text-sm
            ${
              isDark
                ? "bg-red-900/30 border border-red-700 text-red-300"
                : "bg-red-50 border border-red-200 text-red-600"
            }`}
          >
            {error}
          </div>
        )}

        {/* Display success message after successful registration */}
        {sucess && (
          <div
            className={`mb-4 rounded-lg px-4 py-3 text-sm
            ${
              isDark
                ? "bg-green-900/30 border border-green-700 text-green-300"
                : "bg-green-50 border border-green-200 text-green-600"
            }`}
          >
            {sucess}
          </div>
        )}

        {/* ===== REGISTRATION FORM SECTION ===== */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name input field */}
          <InputField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            handleChange={handleChange}
          />

          {/* Email input field */}
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            handleChange={handleChange}
          />

          {/* Password input field */}
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            handleChange={handleChange}
          />

          {/* Role selection dropdown */}
          <Dropdown
            label="Select Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={roleOptions}
          />

          {/* Submit button with hover and active states */}
          <button
            type="submit"
            className={`w-full h-11 rounded-lg font-semibold transition-all duration-300
            ${
              isDark
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Register
          </button>
        </form>

        {/* Visual divider between form and OAuth registration */}
        <div className="flex items-center gap-3 my-6">
          {/* Left divider line */}
          <div
            className={`flex-1 h-px ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
          />

          {/* Divider text */}
          <span
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            OR
          </span>

          {/* Right divider line */}
          <div
            className={`flex-1 h-px ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
          />
        </div>

        {/* Continue with Google authentication button */}
        <button
          onClick={handleLogin}
          className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border font-medium transition-all duration-300
          ${
            isDark
              ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {/* Google logo SVG */}
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            {/* Yellow section of Google logo */}
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.9 32.7 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C33.6 6.5 29 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c11.9 0 21.5-9.1 21.5-21.5 0-1.4-.1-2.6-.4-3.5z"
            />
            {/* Red section of Google logo */}
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.6 16.1 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C33.6 6.5 29 4.5 24 4.5c-6.7 0-12.5 3.8-15.4 9.2z"
            />
            {/* Green section of Google logo */}
            <path
              fill="#4CAF50"
              d="M24 45.5c5.3 0 10.1-1.9 13.8-5.1l-6.4-5.3C29.5 36.5 26.9 37.5 24 37.5c-5.3 0-9.8-3.4-11.4-8.1l-6.5 5C9 41.7 15.9 45.5 24 45.5z"
            />
            {/* Blue section of Google logo */}
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1 2.7-3 5-5.9 6.5l6.4 5.3C39.9 37.5 45.5 31.2 45.5 24c0-1.4-.1-2.6-.4-3.5z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Link to toggle between register and login views */}
        <p
          className={`text-center text-sm mt-6 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {/* Conditional text based on current mode */}
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          {/* Clickable link to toggle between register/login */}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-500 hover:text-blue-600 cursor-pointer font-semibold"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
        {/* End of Registration Card */}
      </div>
      {/* End of Main Container */}
    </div>
  );
};

export default Register;
