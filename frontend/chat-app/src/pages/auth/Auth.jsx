import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { ThemeContext } from "../../context/ThemeContext";

const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const mode = searchParams.get("mode") || "register";
  const isLogin = mode === "login";

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  const setIsLogin = (value) => {
    setSearchParams({
      mode: value ? "login" : "register",
    });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-300 ${
        isDark
          ? "bg-gray-950"
          : "bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200"
      }`}
    >
      <div className="w-full">
        {isLogin ? (
          <Login
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        ) : (
          <Register
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;