import React from "react";

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          className="sr-only peer"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <div className="relative w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-green-200  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
       
      </label>
    </div>
  );
};

export default ToggleSwitch;
