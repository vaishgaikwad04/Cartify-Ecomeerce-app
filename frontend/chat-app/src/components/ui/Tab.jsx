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
        mt-10
        sm:mt-14
        lg:mt-20
        transition-colors
        duration-300
        ${isDark ? "text-white" : "text-black"}
      `}
    >
      {/* TAB HEADER */}
      <div
        className={`
          w-full
          overflow-x-auto
          scrollbar-thin
          border-b
          ${
            isDark
              ? "border-gray-800"
              : "border-gray-200"
          }
        `}
      >
        <div className="flex w-max min-w-full gap-5 sm:gap-8 lg:gap-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative
                shrink-0

                pb-2.5
                sm:pb-3
                lg:pb-4

                font-medium
                text-xs
                sm:text-sm
                md:text-base

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
      </div>

      {/* TAB CONTENT */}
      <div
        className={`
          mt-5
          sm:mt-7
          lg:mt-8
          transition-colors
          duration-300
        `}
      >
        <div
          className={`
            text-[11px]
            sm:text-xs
            md:text-[15px]

            leading-5
            sm:leading-6
            md:leading-7

            break-words

            ${
              isDark
                ? "text-gray-300"
                : "text-gray-600"
            }
          `}
        >
          {tabs.find(
            (tab) => tab.id === activeTab
          )?.content}
        </div>
      </div>
    </div>
  );
};

export default Tabs;