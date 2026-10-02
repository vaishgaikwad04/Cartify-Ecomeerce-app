import React, { useContext } from "react";
import { FiX } from "react-icons/fi";

import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import { ThemeContext } from "../../context/ThemeContext";

const AuthModal = ({ isOpen, setIsOpen, isLogin, setIsLogin, }) => {
  if (!isOpen) return null;

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-md
        p-3
        sm:p-5
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      {/* MODAL */}
      <div
        className="
          relative
          w-full
          max-w-[500px]
          max-h-[95vh]
          overflow-y-auto
          shadow-2xl
          animate-[fadeIn_0.2s_ease-out]
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close authentication modal"
          variants={isDark ? "secondary" : "primary"}
          className="
            absolute
            right-3
            top-3
            z-[100]
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-black/60
            text-white
            backdrop-blur-sm
            transition-all
            duration-200
            hover:bg-black
            hover:scale-105
          "
        >
          <FiX size={20} />
        </button>

        {/* AUTH CONTENT */}
        {isLogin ? (
          <Login isLogin={isLogin} setIsLogin={setIsLogin} setIsOpen={setIsOpen} />
        ) : (
          <Register isLogin={isLogin} setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
