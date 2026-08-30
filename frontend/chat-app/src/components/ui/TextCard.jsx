import React from "react";

const TextCard = ({
  title,
  subtitle,
  description,
  children,
  className = "",
  align = "center",
}) => {
  const alignClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <div
      className={`flex flex-col justify-center ${alignClasses[align]} ${className}`}
    >
      {subtitle && (
        <p className="uppercase tracking-[4px] text-sm mb-2 text-gray-500">
          {subtitle}
        </p>
      )}

      {title && (
        <h2 className="text-3xl md:text-5xl font-light mb-4 leading-tight">
          {title}
        </h2>
      )}

      {description && (
        <p className="text-gray-600 text-sm md:text-base mb-6 max-w-md">
          {description}
        </p>
      )}

      {children}
    </div>
  );
};

export default TextCard;