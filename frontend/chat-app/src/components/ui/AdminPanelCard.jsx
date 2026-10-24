// import React, { useContext } from "react";
// import { ThemeContext } from "../../context/ThemeContext";

// const AdminPanelCard = ({ title, value, subtitle, icon }) => {
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "Dark Mode";

//   return (
//     <div
//       className={`
//         rounded-xl
//         border
//         p-5
//         shadow-sm
//         transition
//         ${
//           isDark
//             ? "bg-gray-900 border-gray-700"
//             : "bg-white border-gray-200"
//         }
//       `}
//     >
//       <div className="flex items-start justify-between gap-4">

//         {/* CONTENT */}
//         <div>
//           <h2
//             className={`
//               text-sm
//               font-medium
//               ${isDark ? "text-gray-400" : "text-gray-500"}
//             `}
//           >
//             {title}
//           </h2>

//           <p
//             className={`
//               mt-2
//               text-3xl
//               font-bold
//               ${isDark ? "text-white" : "text-gray-900"}
//             `}
//           >
//             {value}
//           </p>

//           {subtitle && (
//             <p
//               className={`
//                 mt-2
//                 text-xs
//                 ${isDark ? "text-gray-500" : "text-gray-400"}
//               `}
//             >
//               {subtitle}
//             </p>
//           )}
//         </div>

//         {/* ICON */}
//         {icon && (
//           <div
//             className={`
//               flex
//               h-11
//               w-11
//               shrink-0
//               items-center
//               justify-center
//               rounded-lg
//               ${
//                 isDark
//                   ? "bg-gray-800 text-gray-300"
//                   : "bg-gray-100 text-gray-600"
//               }
//             `}
//           >
//             {icon}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPanelCard;

import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const AdminPanelCard = ({ title, value, subtitle, icon }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  return (
    <div
      className={`
        group min-w-0 rounded-xl border p-4
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        ${
          isDark
            ? "border-gray-800 bg-gray-900 hover:border-gray-700"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        {/* CONTENT */}
        <div className="min-w-0 flex-1">
          <h2
            className={`
              truncate text-[12px] font-medium
              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
            title={title}
          >
            {title}
          </h2>

          <p
            className={`
              mt-2 text-2xl font-semibold leading-tight
              tracking-tight tabular-nums
              ${isDark ? "text-gray-100" : "text-gray-900"}
            `}
          >
            {value ?? "—"}
          </p>

          {subtitle && (
            <p
              className={`
                mt-1.5 text-[11px] leading-relaxed
                ${isDark ? "text-gray-500" : "text-gray-500"}
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
              flex h-9 w-9 shrink-0 items-center
              justify-center rounded-lg
              transition-colors duration-200
              ${
                isDark
                  ? "bg-blue-500/10 text-blue-300 group-hover:bg-blue-500/15"
                  : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
              }
            `}
          >
            <span className="[&>svg]:h-[17px] [&>svg]:w-[17px]">
              {icon}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanelCard;
