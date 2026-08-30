import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Tabs = ({ tabs = [] }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  return (
    <div
      className={`
        w-full
        max-w-5xl
        mt-12
        sm:mt-16
        lg:mt-20
        transition-colors
        duration-300
        ${isDark ? "text-white" : "text-black"}
      `}
    >
      {/* ==========================
          TAB HEADER
      ========================== */}
      <div
        className={`
          flex
          gap-1
          sm:gap-2
          p-1
          sm:p-2
          rounded-xl
          sm:rounded-2xl
          transition-colors
          duration-300

          ${
            isDark
              ? "bg-gray-900 border border-gray-800"
              : "bg-gray-100 border border-gray-200"
          }
        `}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1
              min-w-0
              py-2.5
              sm:py-3
              px-2
              sm:px-5
              rounded-lg
              sm:rounded-xl
              font-medium
              text-sm
              sm:text-base
              transition-all
              duration-300

              ${
                activeTab === tab.id
                  ? isDark
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : isDark
                  ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                  : "text-gray-600 hover:bg-white hover:text-black"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==========================
          TAB CONTENT
      ========================== */}
      <div
        className={`
          mt-4
          sm:mt-6
          rounded-xl
          sm:rounded-2xl
          p-4
          sm:p-6
          lg:p-8
          transition-colors
          duration-300

          ${
            isDark
              ? "bg-gray-900 border border-gray-800"
              : "bg-white border border-gray-200"
          }
        `}
      >
        <div
          className={`
            leading-7
            sm:leading-8
            text-sm
            sm:text-[15px]
            break-words

            ${isDark ? "text-gray-300" : "text-gray-600"}
          `}
        >
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>
  );
};

export default Tabs;