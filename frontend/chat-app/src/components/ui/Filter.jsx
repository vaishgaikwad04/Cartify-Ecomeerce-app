
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { VscDash } from "react-icons/vsc";
import Checkbox from "./CheckBox";

const Filter = ({ title, options = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full min-w-0 mb-2 sm:mb-2.5 lg:mb-2">
      {/* FILTER TITLE */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex w-full items-center justify-between gap-2
          mb-1.5 sm:mb-2
          text-[10px] sm:text-[11px] md:text-[11px] lg:text-[10px] xl:text-[11px]
          font-medium
          leading-tight
          whitespace-nowrap
        "
      >
        <span className="min-w-0 truncate">{title}</span>

        {open ? (
          <VscDash className="w-3 h-3 shrink-0" />
        ) : (
          <IoIosAdd className="w-3 h-3 shrink-0" />
        )}
      </button>

      {/* FILTER OPTIONS */}
      {open && (
        <div className="mt-1 space-y-1 sm:space-y-1">
          {options.map((option) => (
            <div
              key={option.label}
              className="
                min-w-0
                text-[9px] sm:text-[10px] md:text-[10px] lg:text-[9px] xl:text-[10px]
                leading-tight
              "
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
