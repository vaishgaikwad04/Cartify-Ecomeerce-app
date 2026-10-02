import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Button = ({
  label,
  icon,
  onClick,
  type = "button",
  className = "",
  variant,
  disabled = false,
}) => {
  const { isDark } = useContext(ThemeContext);

  // Base button styling
  const baseStyle =
    "px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    // Black button
    primary:
      "bg-black !text-white hover:bg-gray-800 hover:!text-white rounded-md",

    // Light gray button
    secondary:
      "bg-gray-200 !text-black hover:bg-gray-300 hover:!text-black rounded-md",

    // Black outline
    outline:
      "border border-black !text-black bg-transparent hover:bg-black hover:!text-white rounded-md",

    // White outline for dark backgrounds
    outlineDark:
      "border border-white !text-white bg-transparent hover:bg-white hover:!text-black rounded-md",

    // Danger button
    danger:
      "bg-red-800 !text-white hover:bg-red-900 hover:!text-white border-none rounded-md",
  };

  // Automatically choose variant according to theme
  const finalVariant =
    variant || (isDark ? "secondary" : "primary");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${
        variants[finalVariant] || variants.primary
      } ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Button;