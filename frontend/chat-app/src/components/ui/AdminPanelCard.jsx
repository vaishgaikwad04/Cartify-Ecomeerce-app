import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const AdminPanelCard = ({ title, value, subtitle, icon }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  return (
    <div
      className={`
        rounded-xl
        border
        p-5
        shadow-sm
        transition
        ${
          isDark
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">

        {/* CONTENT */}
        <div>
          <h2
            className={`
              text-sm
              font-medium
              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
          >
            {title}
          </h2>

          <p
            className={`
              mt-2
              text-3xl
              font-bold
              ${isDark ? "text-white" : "text-gray-900"}
            `}
          >
            {value}
          </p>

          {subtitle && (
            <p
              className={`
                mt-2
                text-xs
                ${isDark ? "text-gray-500" : "text-gray-400"}
              `}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* ICON */}
        {icon && (
          <div
            className={`
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-lg
              ${
                isDark
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }
            `}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanelCard;