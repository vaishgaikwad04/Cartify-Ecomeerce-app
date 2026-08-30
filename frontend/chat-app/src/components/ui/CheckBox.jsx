import React from "react";

const Checkbox = ({ label, name, checked, onChange, className }) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input

        type="checkbox"
        name={name}

        checked={checked}
        onChange={onChange}
        className="hidden"
      />

      <div className="w-3 h-3 border flex items-center justify-center">
        {checked && (
          <div className="w-1.5 h-1.5 bg-black"></div>
        )}
      </div>

      <p>{label}</p>
    </label>
  );
};

export default Checkbox;