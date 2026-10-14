import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { VscDash } from "react-icons/vsc";
import Checkbox from "./CheckBox";

const Filter = ({ title, options = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full min-w-0 mb-3">
      {/* FILTER TITLE */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="
          flex w-full items-center justify-between gap-2
          mb-2
          text-xs font-medium
          leading-normal
          text-left
        "
      >
        <span className="min-w-0 truncate">{title}</span>

        {open ? (
          <VscDash className="h-4 w-4 shrink-0" />
        ) : (
          <IoIosAdd className="h-4 w-4 shrink-0" />
        )}
      </button>

      {/* FILTER OPTIONS */}
      {open && (
        <div className="flex flex-col gap-2 pl-1">
          {options.map((option) => (
            <div
              key={option.label}
              className="
                w-full min-w-0
                text-xs
                leading-normal
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