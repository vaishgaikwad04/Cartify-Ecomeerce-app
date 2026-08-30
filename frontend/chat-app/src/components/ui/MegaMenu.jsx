import React from "react";

const MegaMenu = ({ links }) => {
  return (
    <div className="grid grid-cols-3 gap-12 min-w-[600px]">

      {links.map((section, index) => (
        <div key={index}>

          {/* HEADING */}
          <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
            {section.heading}
          </h3>

          {/* LINKS */}
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li key={i}>
                <a
                  href={item.path}
                  className="text-gray-600 hover:text-red-900 text-sm transition"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

        </div>
      ))}

    </div>
  );
};

export default MegaMenu;