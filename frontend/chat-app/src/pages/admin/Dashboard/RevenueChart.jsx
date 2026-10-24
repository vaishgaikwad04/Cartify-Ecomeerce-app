// import React, { useContext } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { ThemeContext } from "../../../context/ThemeContext";

// const RevenueChart = () => {
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "Dark Mode";

//   const revenueData = [
//     { month: "Apr", revenue: 45000 },
//     { month: "May", revenue: 62000 },
//     { month: "Jun", revenue: 58000 },
//     { month: "Jul", revenue: 75000 },
//     { month: "Aug", revenue: 89000 },
//     { month: "Sep", revenue: 97000 },
//   ];

//   // Format large revenue numbers for the Y-axis
//   const formatRevenue = (value) => {
//     if (value >= 100000) {
//       return `₹${(value / 100000).toFixed(1)}L`;
//     }

//     if (value >= 1000) {
//       return `₹${(value / 1000).toFixed(0)}K`;
//     }

//     return `₹${value}`;
//   };

//   return (
//     <div
//       className={`
//         w-full
//         overflow-hidden
//         rounded-2xl
//         border
//         p-5
//         sm:p-6
//         transition-colors
//         duration-300

//         ${
//           isDark
//             ? "border-gray-800 bg-gray-900"
//             : "border-gray-200 bg-white"
//         }
//       `}
//     >
//       {/* ================= HEADER ================= */}
//       <div className="mb-6 flex items-start justify-between gap-4">
//         <div>
//           <h2
//             className={`
//               text-lg
//               font-semibold
//               tracking-tight
//               sm:text-xl

//               ${isDark ? "text-white" : "text-gray-900"}
//             `}
//           >
//             Revenue Overview
//           </h2>

//           <p
//             className={`
//               mt-1
//               text-xs
//               sm:text-sm

//               ${isDark ? "text-gray-400" : "text-gray-500"}
//             `}
//           >
//             Monthly revenue generated from orders
//           </p>
//         </div>

//         {/* Current period indicator */}
//         <div
//           className={`
//             hidden
//             rounded-lg
//             border
//             px-3
//             py-2
//             text-xs
//             font-medium
//             sm:block

//             ${
//               isDark
//                 ? "border-gray-700 bg-gray-800 text-gray-300"
//                 : "border-gray-200 bg-gray-50 text-gray-600"
//             }
//           `}
//         >
//           This Year
//         </div>
//       </div>

//       {/* ================= CHART ================= */}
//       <div className="h-[280px] w-full sm:h-[320px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={revenueData}
//             margin={{
//               top: 10,
//               right: 10,
//               left: 5,
//               bottom: 5,
//             }}
//           >
//             {/* Background grid */}
//             <CartesianGrid
//               vertical={false}
//               strokeDasharray="4 4"
//               stroke={isDark ? "#374151" : "#e5e7eb"}
//             />

//             {/* X Axis */}
//             <XAxis
//               dataKey="month"
//               axisLine={false}
//               tickLine={false}
//               tick={{
//                 fontSize: 12,
//                 fill: isDark ? "#9ca3af" : "#6b7280",
//               }}
//               dy={10}
//             />

//             {/* Y Axis */}
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{
//                 fontSize: 11,
//                 fill: isDark ? "#9ca3af" : "#6b7280",
//               }}
//               tickFormatter={formatRevenue}
//               width={55}
//             />

//             {/* Tooltip */}
//             <Tooltip
//               cursor={{
//                 stroke: isDark ? "#4b5563" : "#d1d5db",
//                 strokeDasharray: "4 4",
//               }}
//               contentStyle={{
//                 backgroundColor: isDark ? "#111827" : "#ffffff",
//                 border: `1px solid ${
//                   isDark ? "#374151" : "#e5e7eb"
//                 }`,
//                 borderRadius: "10px",
//                 boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
//               }}
//               labelStyle={{
//                 color: isDark ? "#f3f4f6" : "#111827",
//                 fontWeight: 600,
//                 marginBottom: "4px",
//               }}
//               itemStyle={{
//                 color: isDark ? "#d1d5db" : "#374151",
//                 fontSize: "13px",
//               }}
//               formatter={(value) => [
//                 `₹${Number(value).toLocaleString("en-IN")}`,
//                 "Revenue",
//               ]}
//             />

//             {/* Revenue Line */}
//             <Line
//               type="monotone"
//               dataKey="revenue"
//               stroke={isDark ? "#f3f4f6" : "#111827"}
//               strokeWidth={2}
//               dot={{
//                 r: 4,
//                 fill: isDark ? "#111827" : "#ffffff",
//                 stroke: isDark ? "#f3f4f6" : "#111827",
//                 strokeWidth: 2,
//               }}
//               activeDot={{
//                 r: 6,
//                 fill: isDark ? "#f3f4f6" : "#111827",
//                 stroke: isDark ? "#111827" : "#ffffff",
//                 strokeWidth: 2,
//               }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* ================= FOOTER ================= */}
//       <div
//         className={`
//           mt-4
//           flex
//           items-center
//           justify-between
//           border-t
//           pt-4

//           ${isDark ? "border-gray-800" : "border-gray-100"}
//         `}
//       >
//         <div>
//           <p
//             className={`text-xs ${
//               isDark ? "text-gray-500" : "text-gray-400"
//             }`}
//           >
//             Total revenue
//           </p>

//           <p
//             className={`
//               mt-1
//               text-base
//               font-semibold

//               ${isDark ? "text-white" : "text-gray-900"}
//             `}
//           >
//             ₹4,26,000
//           </p>
//         </div>

//         <div className="text-right">
//           <p
//             className={`text-xs ${
//               isDark ? "text-gray-500" : "text-gray-400"
//             }`}
//           >
//             Latest month
//           </p>

//           <p
//             className={`
//               mt-1
//               text-sm
//               font-medium

//               ${isDark ? "text-gray-200" : "text-gray-700"}
//             `}
//           >
//             ₹97,000
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RevenueChart;


import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";

const RevenueChart = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  const revenueData = [
    { month: "Apr", revenue: 45000 },
    { month: "May", revenue: 62000 },
    { month: "Jun", revenue: 58000 },
    { month: "Jul", revenue: 75000 },
    { month: "Aug", revenue: 89000 },
    { month: "Sep", revenue: 97000 },
  ];

  const formatRevenue = (value) => {
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  const totalRevenue = revenueData.reduce(
    (total, item) => total + item.revenue,
    0
  );

  const latestRevenue = revenueData[revenueData.length - 1]?.revenue || 0;

  const panelStyle = isDark
    ? "border-gray-700 bg-gray-800"
    : "border-gray-200 bg-white";

  const primaryText = isDark ? "#f3f4f6" : "#111827";
  const secondaryText = isDark ? "#9ca3af" : "#6b7280";

  return (
    <section
      className={`w-full min-w-0 overflow-hidden ${panelStyle}`}
    >
      {/* Compact header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2
            className={`text-sm font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Revenue Overview
          </h2>
          <p className={`mt-0.5 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Monthly revenue generated from orders
          </p>
        </div>

        <span
          className={`shrink-0 rounded-md border px-2.5 py-1.5 text-[11px] font-medium ${
            isDark
              ? "border-gray-600 bg-gray-700 text-gray-300"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }`}
        >
          This Year
        </span>
      </div>

      {/* Responsive chart */}
      <div className="h-[220px] w-full min-w-0 sm:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueData}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke={isDark ? "#374151" : "#e5e7eb"}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: secondaryText }}
              tickMargin={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: secondaryText }}
              tickFormatter={formatRevenue}
              width={48}
            />

            <Tooltip
              cursor={{
                stroke: isDark ? "#4b5563" : "#d1d5db",
                strokeDasharray: "3 3",
              }}
              contentStyle={{
                backgroundColor: isDark ? "#111827" : "#ffffff",
                border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{
                color: primaryText,
                fontWeight: 600,
                marginBottom: 4,
              }}
              itemStyle={{ color: primaryText, fontSize: 12 }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke={isDark ? "#60a5fa" : "#2563eb"}
              strokeWidth={2}
              dot={{
                r: 3,
                fill: isDark ? "#111827" : "#ffffff",
                stroke: isDark ? "#60a5fa" : "#2563eb",
                strokeWidth: 2,
              }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Compact summary */}
      <div
        className={`mt-3 flex items-center justify-between gap-3 border-t pt-3 ${
          isDark ? "border-gray-700" : "border-gray-100"
        }`}
      >
        <div>
          <p className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Total shown
          </p>
          <p className={`mt-0.5 text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="text-right">
          <p className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Latest month · Sep
          </p>
          <p className={`mt-0.5 text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            ₹{latestRevenue.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default RevenueChart;
