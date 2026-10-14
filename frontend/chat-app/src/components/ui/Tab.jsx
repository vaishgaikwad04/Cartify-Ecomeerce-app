// import React, { useContext, useState } from "react";
// import { ThemeContext } from "../../context/ThemeContext";

// const Tabs = ({ tabs = [] }) => {
//   const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "Dark Mode";

//   return (
//     <div
//       className={`
//         w-full
//         max-w-5xl
//         mt-6
//         sm:mt-8
//         lg:mt-12
//         transition-colors
//         duration-300
//         ${isDark ? "text-white" : "text-black"}
//       `}
//     >
//       {/* TAB HEADER */}
//       <div
//         className={`
//           w-full
//           overflow-x-auto
//           scrollbar-thin
//           border-b
//           ${
//             isDark
//               ? "border-gray-800"
//               : "border-gray-200"
//           }
//         `}
//       >
//         <div className="flex w-max min-w-full gap-5 sm:gap-8 lg:gap-10">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`
//                 relative
//                 shrink-0

//                 pb-2.5
//                 sm:pb-3
//                 lg:pb-4

//                 font-medium
//                 text-xs
//                 sm:text-sm
//                 md:text-base

//                 whitespace-nowrap

//                 transition-colors
//                 duration-300

//                 ${
//                   activeTab === tab.id
//                     ? isDark
//                       ? "text-white"
//                       : "text-black"
//                     : isDark
//                     ? "text-gray-500 hover:text-gray-300"
//                     : "text-gray-500 hover:text-black"
//                 }

//                 after:absolute
//                 after:bottom-0
//                 after:left-0
//                 after:h-[1.5px]
//                 after:bg-current
//                 after:transition-all
//                 after:duration-300

//                 ${
//                   activeTab === tab.id
//                     ? "after:w-full"
//                     : "after:w-0"
//                 }
//               `}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* TAB CONTENT */}
//       <div
//         className={`
//           mt-5
//           sm:mt-7
//           lg:mt-8
//           transition-colors
//           duration-300
//         `}
//       >
//         <div
//           className={`
//             text-[11px]
//             sm:text-xs
//             md:text-[15px]

//             leading-5
//             sm:leading-6
//             md:leading-7

//             break-words

//             ${
//               isDark
//                 ? "text-gray-300"
//                 : "text-gray-600"
//             }
//           `}
//         >
//           {tabs.find(
//             (tab) => tab.id === activeTab
//           )?.content}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tabs;


import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Tabs = ({ tabs = [] }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // Keep the active tab valid when the product changes.
  useEffect(() => {
    if (!tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab(tabs[0]?.id || "");
    }
  }, [tabs, activeTab]);

  if (!tabs.length) return null;

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <section
      className={`w-full min-w-0 overflow-hidden rounded-xl shadow-sm sm:rounded-2xl border transition-colors duration-300 ${
        isDark
          ? "bg-gray-950"
          : "bg-white"
      }`}
    >
    

      {/* TAB NAVIGATION */}
      <div
        className={`mt-6 border-b px-5 sm:px-8 lg:px-10 ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div
          role="tablist"
          aria-label="Product information"
          className="flex items-center gap-6 sm:gap-9 overflow-x-auto"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="product-tab-panel"
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 pb-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 ${
                  isActive
                    ? isDark
                      ? "text-white"
                      : "text-gray-950"
                    : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}

                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full transition-colors duration-200 ${
                    isActive
                      ? isDark
                        ? "bg-white"
                        : "bg-black"
                      : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div
        id="product-tab-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className={`min-h-[150px] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-9 ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <div className="max-w-3xl break-words text-xs sm:text-sm leading-7">
          {currentTab?.content}
        </div>
      </div>
    </section>
  );
};

export default Tabs;