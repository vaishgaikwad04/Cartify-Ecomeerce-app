// import React from 'react';
// import Button from './Button';

// const SearchBar = ({
//   value,
//   onChange,
//   placeholder = "Search here..."
// }) => {
//   return (
//     <div>
      
//       {/* Input */}
//       <input
//         type="text"
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="
//           w-full h-12
//           px-4
//           border border-gray-300
//           rounded-lg
//           outline-none

//           focus:border-gray-400
//           transition
//         "
//       />

      

//     </div>
//   );
// };

// export default SearchBar;

import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search here...",
  isDark = false,
  className = "",
}) => {
  return (
    <div
      className={`relative w-full ${className}`}
    >
      <FiSearch
        className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`h-8 w-full rounded-lg border py-2 pl-10 pr-10 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-500/20 ${
          isDark
            ? "border-gray-700 bg-gray-800 text-gray-100 placeholder:text-gray-500 focus:border-blue-500"
            : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
        }`}
      />

      {value && (
        <button
          type="button"
          onClick={() =>
            onChange({
              target: { value: "" },
            })
          }
          aria-label="Clear search"
          className={`absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 transition-colors ${
            isDark
              ? "text-gray-400 hover:bg-gray-700 hover:text-white"
              : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          <FiX className="text-base" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
