
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
      {/* TAB HEADER */}
      <div
        className={`
          flex
          gap-6
          sm:gap-10
          border-b
          ${isDark ? "border-gray-800" : "border-gray-200"}
        `}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative
              pb-3
              sm:pb-4
              font-medium
              text-sm
              sm:text-base
              whitespace-nowrap
              transition-colors
              duration-300

              ${
                activeTab === tab.id
                  ? isDark
                    ? "text-white"
                    : "text-black"
                  : isDark
                  ? "text-gray-500 hover:text-gray-300"
                  : "text-gray-500 hover:text-black"
              }

              after:absolute
              after:bottom-0
              after:left-0
              after:h-[1.5px]
              after:bg-current
              after:transition-all
              after:duration-300

              ${
                activeTab === tab.id
                  ? "after:w-full"
                  : "after:w-0"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div
        className={`
          mt-6
          sm:mt-8
          transition-colors
          duration-300
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