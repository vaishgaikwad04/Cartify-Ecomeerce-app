import React, { useContext } from "react";

import InputField from "../../components/ui/InputField";
import Dropdown from "../../components/ui/Dropdown";

import { useRegister } from "../../hooks/auth/useRegister";
import { ThemeContext } from "../../context/ThemeContext";

const Register = ({ isLogin, setIsLogin }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  const { formik, error, success, handleLogin } = useRegister({
    setIsLogin,
  });

  const roleOptions = [
    {
      label: "User",
      value: "user",
    },
    {
      label: "Admin",
      value: "admin",
    },
  ];

  return (
    <div
      className={`
        w-full
        overflow-hidden
        transition-all
        duration-300
        ${isDark ? "bg-gray-900" : "bg-white"}
      `}
    >
      {/* ================= MAIN CARD ================= */}

      <div
        className={`
          w-full
          max-w-[440px]
          overflow-hidden
          shadow-2xl
          transition-all
          duration-300
          ${isDark ? "bg-gray-900" : "bg-white"}
        `}
      >
        {/* ================= TOP IMAGE ================= */}

        <div className="w-full h-[150px] sm:h-[170px] overflow-hidden">
          <img
            src="https://mafoil.wpbingosite.com/wp-content/uploads/2023/01/sign-in.jpg"
            alt="Register"
            className="
              w-full
              h-full
              object-cover
              object-center
            "
          />
        </div>

        {/* ================= FORM CONTENT ================= */}

        <div className="px-6 py-5 sm:px-7 sm:py-6">

          {/* ================= TITLE ================= */}

          <div className="mb-5">
            <h2
              className={`
                text-lg
                sm:text-xl
                tracking-[0.22em]
                font-medium
                uppercase
                ${isDark ? "text-white" : "text-gray-900"}
              `}
            >
              Register
            </h2>
          </div>

          {/* ================= ERROR ================= */}

          {error && (
            <div
              className={`
                mb-4
                px-3
                py-2.5
                text-xs
                border
                ${
                  isDark
                    ? "bg-red-900/30 border-red-700 text-red-300"
                    : "bg-red-50 border-red-200 text-red-600"
                }
              `}
            >
              {error}
            </div>
          )}

          {/* ================= SUCCESS ================= */}

          {success && (
            <div
              className={`
                mb-4
                px-3
                py-2.5
                text-xs
                border
                ${
                  isDark
                    ? "bg-green-900/30 border-green-700 text-green-300"
                    : "bg-green-50 border-green-200 text-green-600"
                }
              `}
            >
              {success}
            </div>
          )}

          {/* ================= REGISTER FORM ================= */}

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3"
          >
            {/* NAME */}

            <div>
              <InputField
                type="text"
                name="name"
                value={formik.values.name}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label=""
                placeholder="Name"
              />

              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-[11px] text-red-500">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* EMAIL */}

            <div>
              <InputField
                type="email"
                name="email"
                value={formik.values.email}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label=""
                placeholder="Email"
              />

              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-[11px] text-red-500">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD */}

            <div>
              <InputField
                type="password"
                name="password"
                value={formik.values.password}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label=""
                placeholder="Password"
              />

              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-[11px] text-red-500">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* ROLE */}

            <div>
              <Dropdown
                label=""
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={roleOptions}
              />

              {formik.touched.role && formik.errors.role && (
                <p className="mt-1 text-[11px] text-red-500">
                  {formik.errors.role}
                </p>
              )}
            </div>

            {/* ================= REGISTER BUTTON ================= */}

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="
                w-full
                h-[44px]
                mt-1
                bg-[#222222]
                hover:bg-black
                text-white
                text-xs
                font-semibold
                uppercase
                tracking-wide
                transition-all
                duration-300
                active:scale-[0.99]
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {formik.isSubmitting ? "Registering..." : "Register"}
            </button>

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`
                w-full
                h-[44px]
                text-xs
                font-semibold
                uppercase
                tracking-wide
                transition-all
                duration-300
                ${
                  isDark
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-[#858585] text-white hover:bg-[#707070]"
                }
              `}
            >
              Already Has An Account
            </button>
          </form>

          {/* ================= DIVIDER ================= */}

          <div className="flex items-center gap-3 my-4">
            <div
              className={`
                flex-1
                h-px
                ${isDark ? "bg-gray-700" : "bg-gray-300"}
              `}
            />

            <span
              className={`
                text-[11px]
                ${isDark ? "text-gray-500" : "text-gray-400"}
              `}
            >
              OR
            </span>

            <div
              className={`
                flex-1
                h-px
                ${isDark ? "bg-gray-700" : "bg-gray-300"}
              `}
            />
          </div>

          {/* =====================================================
              GOOGLE REGISTER

              DO NOT CHANGE THIS SECTION
          ===================================================== */}

          <button
            type="button"
            onClick={handleLogin}
            className={`
              hidden
              w-full
              sm:flex
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
            {/* GOOGLE LOGO */}

            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.9 32.7 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C33.6 6.5 29 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c11.9 0 21.5-9.1 21.5-21.5 0-1.4-.1-2.6-.4-3.5z"
              />

              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.6 16.1 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C33.6 6.5 29 4.5 24 4.5c-6.7 0-12.5 3.8-15.4 9.2z"
              />

              <path
                fill="#4CAF50"
                d="M24 45.5c5.3 0 10.1-1.9 13.8-5.1l-6.4-5.3C29.5 36.5 26.9 37.5 24 37.5c-5.3 0-9.8-3.4-11.4-8.1l-6.5 5C9 41.7 15.9 45.5 24 45.5z"
              />

              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1 2.7-3 5-5.9 6.5l6.4 5.3C39.9 37.5 45.5 31.2 45.5 24c0-1.4-.1-2.6-.4-3.5z"
              />
            </svg>

            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;