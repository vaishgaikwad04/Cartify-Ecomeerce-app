import React from 'react';
import Button from './Button';

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search here..."
}) => {
  return (
    <div>
      
      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full h-12
          px-4
          border border-gray-300
          rounded-lg
          outline-none

          focus:border-gray-400
          transition
        "
      />

      

    </div>
  );
};

export default SearchBar;