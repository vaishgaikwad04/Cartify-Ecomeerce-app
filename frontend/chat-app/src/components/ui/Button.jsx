import React from "react";

const Button = ({
  label,
  icon,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  disabled = false,
}) => {
  const baseStyle =
    "px-4 py-4   font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-900 rounded-md",
    secondary: "bg-gray-200 text-black hover:bg-gray-300 rounded-md",
    outline: "border border-black text-black hover:bg-black hover:text-white rounded-md",
     outlineDark: "border border-white text-white hover:bg-white hover:text-black rounded-md",
    danger: "bg-red-800 text-white hover:bg-red-900 border-none rounded-sm   rounded-xltransition"
  };
                                                                                                                                                                                                          
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Button;