import React from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const SettingsItem = ({
  title,
  tabName,
  activeTab,
  setActiveTab,
  children,
}) => {
  const isActive = activeTab === tabName;

  return (
    <div>
      <div
        className="flex items-center justify-between cursor-pointer py-2 sm:py-2.5"
        onClick={() =>
          setActiveTab(isActive ? "" : tabName)
        }
      >
        <h2 className="text-xs sm:text-sm font-medium">
          {title}
        </h2>

        {isActive ? (
          <MdOutlineKeyboardArrowLeft size={16} />
        ) : (
          <MdOutlineKeyboardArrowRight size={16} />
        )}
      </div>

      {isActive && (
        <div className="pb-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default SettingsItem;