import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Modal = ({ isOpen, onClose, children, className = "" }) => {
  ///theme
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL WRAPPER */}
      <div className="relative flex min-h-full items-start justify-center p-6">
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
            z-10

            ${
              isDark
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900"
            }

            ${className}
          `}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className={`
              absolute top-3 right-3 z-20
              w-8 h-8 flex items-center justify-center rounded-full

              ${
                isDark
                  ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              }
            `}
          >
            ✕
          </button>

          {/* CONTENT */}
          <div
            className={`
              flex-1
              overflow-y-auto
              px-6
              py-5

              ${
                isDark
                  ? "text-gray-300"
                  : "text-gray-600"
              }
            `}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;