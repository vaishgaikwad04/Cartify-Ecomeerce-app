import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

// Reusable table component
const Table = ({ data, columns }) => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  return (
    <div
      className={`
        h-128 rounded-lg shadow border overflow-y-auto
        scroll-smooth relative

        ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
      `}
      style={{
        // Scrollbar styling
        scrollbarWidth: "thin",
        scrollbarColor: isDark ? "#4b5563 #111827" : "#cbd5e1 #f8fafc",
        colorScheme: isDark ? "dark" : "light",
      }}
    >
      {/* Main table */}
      <table className="w-full text-left">
        {/* Table header */}
        <thead
          className={`
            sticky top-0

            ${isDark ? "bg-gray-800" : "bg-gray-100"}
          `}
        >
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`
                  px-4 py-3 text-sm font-semibold border-b

                  ${
                    isDark
                      ? "text-gray-200 border-gray-700"
                      : "text-gray-700 border-gray-200"
                  }
                `}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {data.map((row) => (
            <tr
              key={row._id}
              className={`
                border-b transition

                ${
                  isDark
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-200 hover:bg-gray-50"
                }
              `}
            >
              {columns.map((col, index) => (
                <td
                  key={index}
                  className={`
                    px-4 py-3 text-sm

                    ${isDark ? "text-gray-300" : "text-gray-600"}
                  `}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
