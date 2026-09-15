import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Dropdown = ({
  name,
  value,
  onChange,
  className = "",
  label,
  options = [],
}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          className={`
                        text-sm font-medium

                        ${isDark ? "text-gray-300" : "text-gray-700"}
                    `}
        >
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`
                    px-3 py-2
                    rounded-lg
                    border
                    text-sm
                    outline-none


                    ${
                      isDark
                        ? `
                        bg-gray-800
                        border-gray-600
                        text-white
                        `
                        : `
                        bg-white
                        border-gray-300
                        text-gray-700
                        `
                    }


                    ${className}

                `}
      >
        <option value="">Select {label}</option>
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
