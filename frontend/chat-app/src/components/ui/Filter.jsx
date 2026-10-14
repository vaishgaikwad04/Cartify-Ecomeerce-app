
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { VscDash } from "react-icons/vsc";
import Checkbox from "./CheckBox";

const Filter = ({ title, options = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-3 min-w-0 sm:mb-4 lg:mb-2">
      {/* FILTER TITLE */}
      <button
        type="button"
        className="
          flex justify-between items-center w-full gap-2
          text-[11px] sm:text-xs
          font-medium mb-2 sm:mb-2.5
          whitespace-nowrap
        "
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>

        {open ? (
          <VscDash className="shrink-0 w-3 h-3" />
        ) : (
          <IoIosAdd className="shrink-0 w-3 h-3" />
        )}
      </button>

      {/* FILTER OPTIONS */}
      {open && (
        <div className="mt-1.5 space-y-1">
          {options.map((option) => (
            <div
              key={option.label}
              className="whitespace-nowrap text-[10px] sm:text-[11px] lg:text-[10px]"
            >
              <Checkbox
                label={option.label}
                checked={option.checked}
                onChange={option.onChange}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
