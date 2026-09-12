
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ActionMenu = ({ row, onEdit,onView, onDelete, disableDelete = false, }) => {
  const [open, setOpen] = useState(false);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  return (
    <div className="relative inline-block">
      {/* 3 DOT BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex items-center justify-center
          w-9 h-9 rounded-md
          text-xl font-semibold
          transition-all duration-200

          ${
            isDark
              ? "text-gray-300 hover:text-white hover:bg-gray-700"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          }
        `}
      >
        ⋮
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className={`
            absolute right-0 top-full mt-2
            w-36
            rounded-lg
            border
            shadow-lg
            overflow-hidden
            z-[9999]

            ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }
          `}
        >
          {/* EDIT */}
          <button
            type="button"
            onClick={() => {
              onEdit(row._id);
              setOpen(false);
            }}
            className={`
              w-full px-4 py-2.5
              text-left text-sm
              transition-colors duration-150

              ${
                isDark
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            Edit
          </button>

           
          <button
            type="button"
            onClick={() => {
              onView(row._id);
              setOpen(false);
            }}
            className={`
              w-full px-4 py-2.5
              text-left text-sm
              transition-colors duration-150

              ${
                isDark
                  ? "text-gray-200 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            View
          </button> 

        {/* DELETE */}
<button
  type="button"
  disabled={disableDelete}
  onClick={() => {
    if (!disableDelete && onDelete) {
      onDelete(row._id);
      setOpen(false);
    }
  }}
  className={`
    w-full px-4 py-2.5
    text-left text-sm
    transition-colors duration-150

    ${
      disableDelete
        ? isDark
          ? "cursor-not-allowed text-gray-600"
          : "cursor-not-allowed text-gray-300"
        : isDark
          ? "text-red-400 hover:bg-gray-700"
          : "text-red-500 hover:bg-red-50"
    }
  `}
>
  Delete
</button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
