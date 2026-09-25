import React, { useContext } from "react";
import InputField from "../../components/ui/InputField";
import { useLogin } from "../../hooks/auth/useLogin";
import { ThemeContext } from "../../context/ThemeContext";
import Dropdown from "../../components/ui/Dropdown";

const Login = ({ isLogin, setIsLogin }) => {
  // Get current theme from context
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // Get login form handlers and state from custom hook
  const {
    handleChange,
    handleSubmit,
    handleLogin,
    error,
    sucess,
    formData,
  } = useLogin();

  // Available role options
  const roleOptions = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  return (
    // Main container
    <div
      className={`
        min-h-screen
        flex
        items-center
        justify-center
        px-3
        py-5
        sm:px-4
        sm:py-8
        transition-colors
        duration-300
        ${
          isDark
            ? "bg-gray-950"
            : "bg-gradient-to-br from-gray-100 via-gray-50 to-white"
        }
      `}
    >
      {/* LOGIN CARD */}
      <div
        className={`
          w-full
          max-w-[420px]
          rounded-2xl
          border
          shadow-xl
          p-4
          sm:p-5
          md:p-8
          transition-all
          duration-300
          ${
            isDark
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }
        `}
      >
        {/* ================= TITLE ================= */}
        <div className="text-center mb-4 sm:mb-5 md:mb-6">
          <h2
            className={`
              text-xl
              sm:text-2xl
              md:text-3xl
              font-bold
              ${
                isDark
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            Sign in to continue
          </h2>

          <p
            className={`
              mt-1.5
              sm:mt-2
              text-xs
              sm:text-sm
              ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-500"
              }
            `}
          >
            Login to access your account.
          </p>
        </div>

        {/* ================= ERROR MESSAGE ================= */}
        {error && (
          <div
            className={`
              mb-3
              sm:mb-4
              rounded-lg
              px-3
              sm:px-4
              py-2.5
              sm:py-3
              text-xs
              sm:text-sm
              ${
                isDark
                  ? "bg-red-900/30 border border-red-700 text-red-300"
                  : "bg-red-50 border border-red-200 text-red-600"
              }
            `}
          >
            {error}
          </div>
        )}

        {/* ================= SUCCESS MESSAGE ================= */}
        {sucess && (
          <div
            className={`
              mb-3
              sm:mb-4
              rounded-lg
              px-3
              sm:px-4
              py-2.5
              sm:py-3
              text-xs
              sm:text-sm
              ${
                isDark
                  ? "bg-green-900/30 border border-green-700 text-green-300"
                  : "bg-green-50 border border-green-200 text-green-600"
              }
            `}
          >
            {sucess}
          </div>
        )}

        {/* ================= LOGIN FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:gap-4"
        >
          {/* Email */}
          <InputField
            type="email"
            name="email"
            value={formData.email}
            handleChange={handleChange}
            label="Email"
          />

          {/* Password */}
          <InputField
            type="password"
            name="password"
            value={formData.password}
            handleChange={handleChange}
            label="Password"
          />

          {/* Role */}
          <Dropdown
            label="Select Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={roleOptions}
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className={`
              w-full
              h-10
              sm:h-11
              rounded-lg
              text-sm
              sm:text-base
              font-semibold
              transition-all
              duration-300
              active:scale-95
              ${
                isDark
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }
            `}
          >
            Log In
          </button>
        </form>

        {/* ================= DIVIDER ================= */}
        <div className="flex items-center gap-2 sm:gap-3 my-4 sm:my-6">
          {/* Left line */}
          <div
            className={`
              flex-1
              h-px
              ${isDark ? "bg-gray-700" : "bg-gray-300"}
            `}
          />

          {/* OR */}
          <span
            className={`
              text-xs
              sm:text-sm
              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
          >
            OR
          </span>

          {/* Right line */}
          <div
            className={`
              flex-1
              h-px
              ${isDark ? "bg-gray-700" : "bg-gray-300"}
            `}
          />
        </div>

        {/* ================= GOOGLE LOGIN ================= */}
        <button
          type="button"
          onClick={handleLogin}
          className={`
            w-full
            flex
            items-center
            justify-center
            gap-1.5
            sm:gap-2
            h-10
            sm:h-11
            px-2
            rounded-lg
            border
            text-xs
            sm:text-sm
            font-medium
            transition-all
            duration-300
            ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }
          `}
        >
          {/* Google logo */}
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
            viewBox="0 0 48 48"
          >
            {/* Yellow */}
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.9 32.7 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C33.6 6.5 29 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c11.9 0 21.5-9.1 21.5-21.5 0-1.4-.1-2.6-.4-3.5z"
            />

            {/* Red */}
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.6 16.1 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C33.6 6.5 29 4.5 24 4.5c-6.7 0-12.5 3.8-15.4 9.2z"
            />

            {/* Green */}
            <path
              fill="#4CAF50"
              d="M24 45.5c5.3 0 10.1-1.9 13.8-5.1l-6.4-5.3C29.5 36.5 26.9 37.5 24 37.5c-5.3 0-9.8-3.4-11.4-8.1l-6.5 5C9 41.7 15.9 45.5 24 45.5z"
            />

            {/* Blue */}
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1 2.7-3 5-5.9 6.5l6.4 5.3C39.9 37.5 45.5 31.2 45.5 24c0-1.4-.1-2.6-.4-3.5z"
            />
          </svg>

          Continue with Google
        </button>

        {/* ================= REGISTER / LOGIN LINK ================= */}
        <p
          className={`
            text-xs
            sm:text-sm
            text-center
            mt-4
            sm:mt-6
            ${
              isDark
                ? "text-gray-400"
                : "text-gray-600"
            }
          `}
        >
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() => setIsLogin(!isLogin)}
            className="
              text-blue-500
              cursor-pointer
              ml-2
              hover:text-blue-600
              font-semibold
            "
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;