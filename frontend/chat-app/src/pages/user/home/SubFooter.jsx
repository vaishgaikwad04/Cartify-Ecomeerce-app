import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/ui/InputField";
import { ThemeContext } from "../../../context/ThemeContext";

const brands = [
  { label: "L'Oréal", value: "LOreal" },
  { label: "Calvin Klein", value: "Calvin Klein" },
  { label: "Plum", value: "Plum" },
  { label: "Gucci", value: "Gucci" },
  { label: "Fossil", value: "Fossil" },
];

const brandStyles = [
  "text-5xl font-light tracking-widest hover:tracking-[0.3em]",
  "text-4xl font-semibold italic tracking-widest hover:tracking-[0.3em]",
  "text-5xl font-bold uppercase tracking-widest hover:tracking-[0.3em]",
  "text-4xl font-light tracking-wide hover:text-gray-500 hover:tracking-[0.3em]",
  "text-5xl font-extrabold tracking-widest hover:tracking-[0.3em]",
];

const SubFooter = () => {
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  const handleBrandClick = (brand) => {
    navigate(`/brand/${encodeURIComponent(brand)}`);
  };

  return (
    <div>
      {/* BRANDS */}

      <div
        className={`
        border-t border-b transition-colors duration-300
        ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}
        `}
      >
        <div className="max-w-[1800px] mx-auto py-24">
          <div className="grid grid-cols-1 md:grid-cols-5 items-center text-center gap-6">
            {brands.map((brand, index) => (
              <h2
                key={brand.value}
                onClick={() => handleBrandClick(brand.value)}
                className={`
  cursor-pointer
  transition-all duration-300
  text-xl sm:text-4xl md:text-4xl

  hover:scale-105
  active:scale-95

  ${
    isDark
      ? "text-gray-300 hover:text-white active:text-white"
      : "text-gray-700 hover:text-black active:text-black"
  }

  ${brandStyles[index]}
`}
              >
                {brand.label}
              </h2>
            ))}
          </div>
        </div>
      </div>

      {/* NEWSLETTER */}

      <section
        className={`
        transition-colors duration-300

        ${isDark ? "bg-black text-white" : "bg-[#1f1f21] text-white"}

        `}
      >
        <div className="max-w-[1800px] mx-auto px-8 py-24">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <h2 className=":text-2xl  sm:text-4xl md:text-5xl font-light tracking-wide">
              NEWSLETTER
            </h2>

            <p
              className={`
    w-[200px]
    whitespace-normal
    break-words
    text-base
    leading-7
    ${isDark ? "text-gray-300" : "text-gray-200"}
  `}
            >
              Subscribe to the weekly newsletter for all the latest updates
            </p>

            <div className="flex flex-col md:flex-row h-auto md:h-[60px] w-full max-w-md shrink-1">
              <InputField
                type="email"
                placeholder="Email..."
                className={`
                flex-1 px-6 outline-none

                ${
                  isDark
                    ? "bg-gray-900 text-white border-gray-700"
                    : "bg-[#f5f5f5] text-black"
                }

                `}
              />

              <Button label="Subscribe" variant="danger" className="mt-1" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubFooter;
