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

  // Responsive button sizing
  const baseStyle =
    "px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-black text-white hover:bg-gray-900 rounded-md",

    secondary:
      "bg-gray-200 text-black hover:bg-gray-300 rounded-md",

    outline:
      "border border-black text-black hover:bg-black hover:text-white rounded-md",

    outlineDark:
      "border border-white text-white hover:bg-white hover:text-black rounded-md",

    danger:
      "bg-red-800 text-white hover:bg-red-900 border-none rounded-md",
  };

  const finalVariant =
    variant || (isDark ? "secondary" : "primary");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[finalVariant]} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Button;