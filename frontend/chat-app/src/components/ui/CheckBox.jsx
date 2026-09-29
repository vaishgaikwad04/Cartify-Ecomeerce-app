import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Checkbox = ({
  label,
  name,
  checked,
  onChange,
  className = "",
}) => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  // Handle checkbox click ourselves.
  // This prevents the browser from focusing the hidden
  // native checkbox and moving the modal scroll position.
  const handleClick = () => {
    onChange({
      target: {
        name,
        checked: !checked,
      },
    });
  };

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`
        flex
        items-center
        gap-3
        h-6
        cursor-pointer
        select-none
        text-sm
        outline-none
        ${isDark ? "text-gray-300" : "text-gray-700"}
        ${className}
      `}
    >
      {/* Checkbox UI */}
      <div
        className={`
          w-4
          h-4
          flex-shrink-0
          rounded-[4px]
          flex
          items-center
          justify-center
          border
          transition-colors
          duration-200

          ${
            checked
              ? isDark
                ? "bg-gray-100 border-gray-100"
                : "bg-gray-800 border-gray-800"
              : isDark
                ? "bg-gray-900 border-gray-600 hover:border-gray-400"
                : "bg-white border-gray-300 hover:border-gray-500"
          }
        `}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-3 h-3 ${
              isDark ? "text-gray-900" : "text-white"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 111.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Label */}
      <span>{label}</span>
    </div>
  );
};

export default Checkbox;