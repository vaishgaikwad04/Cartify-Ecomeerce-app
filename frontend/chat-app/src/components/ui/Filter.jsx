
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { VscDash } from "react-icons/vsc";
import Checkbox from "./CheckBox";

const Filter = ({ title, options = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6 min-w-[150px] sm:min-w-[160px] md:min-w-[170px] lg:min-w-0 lg:mb-3">
      <button
        className="
          flex justify-between items-center w-full gap-2
          font-medium mb-4 whitespace-nowrap
          lg:!text-[11px] lg:!mb-2
        "
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>

        {open ? (
          <VscDash className="shrink-0 lg:!w-3 lg:!h-3" />
        ) : (
          <IoIosAdd className="shrink-0 lg:!w-3 lg:!h-3" />
        )}
      </button>

      {open && (
        <div className="mt-3 space-y-2 lg:!mt-2 lg:!space-y-1">
          {options.map((option) => (
            <div key={option.label} className="whitespace-nowrap">
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
