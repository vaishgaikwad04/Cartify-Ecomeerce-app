import React, { useContext } from "react";

// Theme context is used to apply light/dark mode styles
import { ThemeContext } from "../../context/ThemeContext";

const InputField = ({
  label,
  type,
  name,
  value,
  min,
  max,
  handleChange,
  placeholder,
  className,
}) => {
  // Get the current theme from ThemeContext
  const { theme } = useContext(ThemeContext);

  // Check whether the current theme is Dark Mode
  const isDark = theme === "Dark Mode";

  return (
    // Main wrapper for label and input
    <div className="flex flex-col gap-1 w-full">

      {/* Input label */}
      <label
        className={`
          text-sm
          font-medium

          ${isDark ? "text-gray-300" : "text-gray-600"}
        `}
      >
        {label}
      </label>

      {/* Actual HTML input element */}
      <input
        // Input type: text, number, email, password, etc.
        type={type}

        // Identifies this input field
        name={name}

        // Controlled input value
        value={value}

        // Maximum allowed value
        max={max}

        // Minimum allowed value
        min={min}

        // Handles changes made by the user
        onChange={handleChange}

        // Uses provided placeholder or creates one automatically
        placeholder={
          placeholder || `Enter ${label}`
        }

        // Tailwind styling
        className={`
          px-3
          py-2
          h-8
          text-xs
          rounded-lg
          border

          outline-none
          transition

          ${
            isDark
              ? `
                bg-gray-800
                border-gray-600
                text-white
                placeholder-gray-400
              `
              : `
                bg-white
                border-gray-300
                text-gray-700
              `
          }

          ${className}
        `}
      />
    </div>
  );
};

export default InputField;