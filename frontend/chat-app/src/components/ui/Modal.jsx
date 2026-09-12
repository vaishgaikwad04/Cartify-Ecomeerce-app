import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Modal = ({ isOpen, onClose, children, className = "" }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      {/* MODAL BOX */}
      <div
        className={`
          relative
          w-full
          max-w-3xl
          max-h-[90vh]
          rounded-xl
          shadow-lg
          flex
          flex-col
          overflow-hidden

          ${
            isDark
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
          }

          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
       

        {/* CONTENT */}
        <div
          className={`
            flex-1
            min-h-0
            overflow-y-auto
            px-6
            py-5

            ${isDark ? "text-gray-300" : "text-gray-600"}
          `}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: isDark
              ? "#4b5563 #111827"
              : "#cbd5e1 #f8fafc",
            colorScheme: isDark ? "dark" : "light",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;