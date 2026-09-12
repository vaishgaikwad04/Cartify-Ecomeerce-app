
import React, { useContext, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";
import Button from "./Button";

const ViewModal = ({
  isOpen,
  onClose,
  title = "View Details",
  children,
}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // Close modal with Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Don't render when closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* =====================================================
          BACKDROP
      ====================================================== */}
      <div
        className={`absolute inset-0 backdrop-blur-sm ${
          isDark ? "bg-black/70" : "bg-black/40"
        }`}
        onClick={onClose}
      />

      {/* =====================================================
          MODAL
      ====================================================== */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative
          flex
          w-full
          max-w-4xl
          max-h-[90vh]
          flex-col
          overflow-hidden
          rounded-2xl
          border
          shadow-2xl
          ${isDark
            ? "border-gray-700 bg-gray-900"
            : "border-gray-200 bg-white"
          }
        `}
      >
        {/* HEADER*/}
        <div
          className={`
            flex
            shrink-0
            items-center
            justify-between
            border-b
            px-5
            py-4
            sm:px-6
            ${
              isDark
                ? "border-gray-700 bg-gray-900"
                : "border-gray-200 bg-white"
            }
          `}
        >
          {/* Title */}
          <h2
            className={`
              text-lg
              font-semibold
              sm:text-xl
              ${
                isDark
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            {title}
          </h2>

        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}
        <div
          className={`
            min-h-0
            flex-1
            overflow-y-auto
            px-5
            py-5
            sm:px-6
            ${
              isDark
                ? "bg-gray-950"
                : "bg-gray-50"
            }
          `}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: isDark
              ? "#4b5563 #030712"
              : "#d1d5db #f9fafb",
            colorScheme: isDark ? "dark" : "light",
          }}
        >
          {children}
        </div>

      
      </div>
    </div>
  );
};

export default ViewModal;
