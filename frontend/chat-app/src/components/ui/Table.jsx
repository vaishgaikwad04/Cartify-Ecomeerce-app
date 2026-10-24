// // import React, { useContext } from "react";
// // import { ThemeContext } from "../../context/ThemeContext";

// // // Reusable table component
// // const Table = ({ data, columns }) => {
// //   const { theme } = useContext(ThemeContext);

// //   const isDark = theme === "Dark Mode";

// //   return (
// //     <div
// //       className={`
// //         h-128 rounded-lg shadow border overflow-y-auto
// //         scroll-smooth relative

// //         ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
// //       `}
// //       style={{
// //         // Scrollbar styling
// //         scrollbarWidth: "thin",
// //         scrollbarColor: isDark ? "#4b5563 #111827" : "#cbd5e1 #f8fafc",
// //         colorScheme: isDark ? "dark" : "light",
// //       }}
// //     >
// //       {/* Main table */}
// //       <table className="w-full text-left">
// //         {/* Table header */}
// //         <thead
// //           className={`
// //             sticky top-0

// //             ${isDark ? "bg-gray-800" : "bg-gray-100"}
// //           `}
// //         >
// //           <tr>
// //             {columns.map((col, index) => (
// //               <th
// //                 key={index}
// //                 className={`
// //                   px-4 py-3 text-sm font-semibold border-b

// //                   ${
// //                     isDark
// //                       ? "text-gray-200 border-gray-700"
// //                       : "text-gray-700 border-gray-200"
// //                   }
// //                 `}
// //               >
// //                 {col.label}
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>

// //         {/* Table body */}
// //         <tbody>
// //           {data.map((row) => (
// //             <tr
// //               key={row._id}
// //               className={`
// //                 border-b transition

// //                 ${
// //                   isDark
// //                     ? "border-gray-700 hover:bg-gray-800"
// //                     : "border-gray-200 hover:bg-gray-50"
// //                 }
// //               `}
// //             >
// //               {columns.map((col, index) => (
// //                 <td
// //                   key={index}
// //                   className={`
// //                     px-4 py-3 text-sm

// //                     ${isDark ? "text-gray-300" : "text-gray-600"}
// //                   `}
// //                 >
// //                   {col.render ? col.render(row) : row[col.key]}
// //                 </td>
// //               ))}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default Table;

// import React, { useContext } from "react";
// import { ThemeContext } from "../../context/ThemeContext";

// const Table = ({ data = [], columns = [] }) => {
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "Dark Mode";

//   const colors = isDark
//     ? {
//         container: "bg-gray-900 border-gray-800",
//         header: "bg-gray-800/95",
//         heading: "text-gray-300 border-gray-700",
//         row: "border-gray-800 hover:bg-gray-800/70",
//         cell: "text-gray-300",
//         empty: "text-gray-500",
//       }
//     : {
//         container: "bg-white border-gray-200",
//         header: "bg-gray-50/95",
//         heading: "text-gray-600 border-gray-200",
//         row: "border-gray-100 hover:bg-gray-50",
//         cell: "text-gray-600",
//         empty: "text-gray-400",
//       };

//   return (
//     <div
//       className={`
//         relative w-full min-w-0 overflow-auto
//         rounded-lg border shadow-sm
//         ${colors.container}
//       `}
//       style={{
//         maxHeight: "480px",
//         scrollbarWidth: "thin",
//         scrollbarColor: isDark
//           ? "#4b5563 #111827"
//           : "#cbd5e1 #f8fafc",
//         colorScheme: isDark ? "dark" : "light",
//       }}
//     >
//       <table className="w-full border-collapse text-left text-xs">
//         {/* TABLE HEADER */}
//         <thead className={`sticky top-0 z-10 ${colors.header}`}>
//           <tr>
//             {columns.map((col, index) => (
//               <th
//                 key={col.key ?? col.label ?? index}
//                 scope="col"
//                 className={`
//                   whitespace-nowrap border-b
//                   px-3 py-2.5 text-[11px]
//                   font-semibold uppercase tracking-wide
//                   ${colors.heading}
//                 `}
//               >
//                 {col.label}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         {/* TABLE BODY */}
//         <tbody>
//           {data.length > 0 ? (
//             data.map((row, rowIndex) => (
//               <tr
//                 key={row._id ?? row.id ?? rowIndex}
//                 className={`
//                   border-b last:border-b-0
//                   transition-colors duration-150
//                   ${colors.row}
//                 `}
//               >
//                 {columns.map((col, colIndex) => (
//                   <td
//                     key={col.key ?? col.label ?? colIndex}
//                     className={`
//                       px-3 py-2.5 text-[12px]
//                       leading-5
//                       ${colors.cell}
//                     `}
//                   >
//                     <div className="min-w-0">
//                       {col.render
//                         ? col.render(row)
//                         : (row[col.key] ?? "—")}
//                     </div>
//                   </td>
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td
//                 colSpan={Math.max(columns.length, 1)}
//                 className={`
//                   px-4 py-10 text-center text-xs
//                   ${colors.empty}
//                 `}
//               >
//                 No records found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Table = ({ data = [], columns = [] }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  const colors = isDark
    ? {
        container: "bg-gray-900 border-gray-800",
        header: "bg-gray-800",
        heading: "text-gray-400 border-gray-700",
        row: "border-gray-800 hover:bg-gray-800/60",
        cell: "text-gray-300",
        empty: "text-gray-500",
      }
    : {
        container: "bg-white border-gray-200",
        header: "bg-gray-50",
        heading: "text-gray-500 border-gray-200",
        row: "border-gray-100 hover:bg-gray-50",
        cell: "text-gray-600",
        empty: "text-gray-400",
      };

  return (
    <div
      className={`relative w-full min-w-0 overflow-auto rounded-lg border ${colors.container}`}
      style={{
        maxHeight: "420px",
        scrollbarWidth: "thin",
        scrollbarColor: isDark
          ? "#4b5563 #111827"
          : "#cbd5e1 #f8fafc",
        colorScheme: isDark ? "dark" : "light",
      }}
    >
      <table className="w-full border-collapse text-left text-[11px]">
        <thead className={`sticky top-0 z-10 ${colors.header}`}>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.key ?? col.label ?? index}
                scope="col"
                className={`whitespace-nowrap border-b px-2.5 py-2 text-[10px] font-semibold uppercase tracking-wide ${colors.heading}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={row._id ?? row.id ?? rowIndex}
                className={`border-b last:border-b-0 transition-colors ${colors.row}`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={col.key ?? col.label ?? colIndex}
                    className={`px-2.5 py-2 text-[11px] leading-4 ${colors.cell}`}
                  >
                    <div className="min-w-0">
                      {col.render
                        ? col.render(row)
                        : (row[col.key] ?? "—")}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={Math.max(columns.length, 1)}
                className={`px-3 py-7 text-center text-[11px] ${colors.empty}`}
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
