import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { VscDash } from "react-icons/vsc";
import Checkbox from "./CheckBox";

const Filter = ({ title, options = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="flex justify-between items-center w-full font-medium mb-4"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        {open ? <VscDash /> : <IoIosAdd />}
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          {options.map((option) => (
            <Checkbox
              key={option.label}
              label={option.label}
              checked={option.checked}
              onChange={option.onChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;