import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

// Reusable table component
// Receives:
// data    → rows that need to be displayed
// columns → information about table columns and how each column should render
const Table = ({ data, columns }) => {

  // Get the current theme from ThemeContext
  const { theme } = useContext(ThemeContext);

  // Convert the theme value into a simple true/false value
  // true  → dark mode
  // false → light mode
  const isDark = theme === "Dark Mode";

  return (
    <div
      className={`
        h-128 rounded-lg shadow border overflow-y-auto
        scroll-smooth relative

        ${
          isDark
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }
      `}
    >

      {/* Main table */}
      <table className="w-full text-left">

        {/* sticky keeps the header visible while scrolling */}
        <thead
          className={`
            sticky top-0

            ${
              isDark
                ? "bg-gray-800"
                : "bg-gray-100"
            }
          `}
        >

          <tr>

            {/* Create each table heading from the columns array */}
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

                {/* Display the column heading */}
                {col.label}

              </th>

            ))}

          </tr>

        </thead>


        {/* Table body */}
        <tbody>

          {/* Create one table row for every item in data */}
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

              {/* Create cells for every column */}
              {columns.map((col, index) => (

                <td
                  key={index}
                  className={`
                    px-4 py-3 text-sm

                    ${
                      isDark
                        ? "text-gray-300"
                        : "text-gray-600"
                    }
                  `}
                >

                  {/* 
                    If the column has a custom render function,
                    use it to decide what should appear in the cell.

                    Otherwise, directly display the value
                    from the row using the column's key.
                  */}
                  {
                    col.render
                      ? col.render(row)
                      : row[col.key]
                  }

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