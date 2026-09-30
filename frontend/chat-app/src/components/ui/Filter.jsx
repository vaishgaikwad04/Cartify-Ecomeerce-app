// import React, { useState } from "react";
// import { IoIosAdd } from "react-icons/io";
// import { VscDash } from "react-icons/vsc";
// import Checkbox from "./CheckBox";

// const Filter = ({ title, options = []}) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="mb-6">
//       <button
//         className="flex justify-between items-center w-full font-medium mb-4"
//         onClick={() => setOpen(!open)}
//       >
//         <span>{title}</span>
//         {open ? <VscDash /> : <IoIosAdd />}
//       </button>

//       {open && (
//         <div className="mt-3 space-y-2">
//           {options.map((option) => (
//             <Checkbox
//               key={option.label}
//               label={option.label}
//               checked={option.checked}
//               onChange={option.onChange}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Filter;

import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { VscDash } from "react-icons/vsc";
import Checkbox from "./CheckBox";

const Filter = ({ title, options = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6 min-w-[150px] sm:min-w-[160px] md:min-w-[170px] lg:min-w-0">
      <button
        className="
          flex
          justify-between
          items-center
          w-full
          gap-3
          font-medium
          mb-4
          whitespace-nowrap
        "
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>

        {open ? <VscDash className="shrink-0" /> : <IoIosAdd className="shrink-0" />}
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          {options.map((option) => (
            <div
              key={option.label}
              className="whitespace-nowrap"
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