import React, { Children } from "react";
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
        className="flex items-center justify-between cursor-pointer py-3"
        onClick={() => setActiveTab(isActive ? "" : tabName)}
      >
        <h1
          className=" text-xs
                sm:text-sm
                md:text-3xl"
        >
          {title}
        </h1>

        {isActive ? (
          <MdOutlineKeyboardArrowLeft />
        ) : (
          <MdOutlineKeyboardArrowRight />
        )}
      </div>
      {isActive && <div className="pb-4">{children}</div>}
    </div>
  );
};

export default SettingsItem;
