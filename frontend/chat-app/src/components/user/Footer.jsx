import React, { useContext } from "react";
//icons
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaDribbble,
} from "react-icons/fa";
//Navlink and link from react-router-dom
import { NavLink, Link, useNavigate } from "react-router-dom";
//themeContext
import { ThemeContext } from "../../context/ThemeContext";

const Footer = () => {
  // Get current theme from context
  const { theme } = useContext(ThemeContext);
  // Check if dark mode is enabled
  const isDark = theme === "Dark Mode";

  const navigate = useNavigate()

  return (
    <footer className="w-full">
   
      {/* Main footer section*/}
      <section
        className={`
          transition-colors duration-300
          ${isDark ? "bg-gray-900 text-white" : "bg-[#f5f5f5] text-gray-900"}
        `}
      >
        {/* Container*/}
        <div className="max-w-[1800px] mx-auto px-8 py-24">
          {/*grid based structure*/}
          <div className="grid lg:grid-cols-4 gap-16">
            {/* Contact section with brand info and social media links */}
            <div>
              {/* Brand name */}
              <h2 onClick={() => navigate("/")} className="text-3xl font-serif-sarif tracking-[6px] uppercase">
                Cartify
              </h2>

              {/* Brand description*/}
              <p
                className={`
                  mt-4 text-sm leading-relaxed max-w-sm
                  ${isDark ? "text-gray-400" : "text-gray-500"}
                `}
              >
                Your destination for modern fashion, beauty, and lifestyle.
                Discover curated collections, premium quality, and trending
                styles all in onep lace.
              </p>

              {/* Social media icon*/}
              <div
                className={`
                  flex gap-5 mt-4
                  ${isDark ? "text-gray-300" : "text-gray-600"}
                `}
              >
                {/* Array of social media platforms with icons and hover colors */}
                {[
                  {
                    icon: <FaTwitter />,
                    hover: "hover:text-sky-500",
                  },
                  {
                    icon: <FaInstagram />,
                    hover: "hover:text-pink-500",
                  },
                  {
                    icon: <FaFacebookF />,
                    hover: "hover:text-blue-600",
                  },
                  {
                    icon: <FaDribbble />,
                    hover: "hover:text-pink-400",
                  },
                  ///map on array of social media icons
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`
                        w-12 h-12 flex items-center justify-center
                        rounded-full cursor-pointer
                        hover:scale-110 transition
                        ${isDark ? "bg-gray-800" : "bg-gray-100"}
                      `}
                  >
                    {/* Icon with hover color */}
                    <span className={item.hover}>{item.icon}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product categories navigation section */}
            <div>
              {/* Section heading */}
              <h3 className="text-2xl font-medium mb-8">CATEGORIES</h3>

              {/* List of category links*/}
              <ul
                className={`
                  space-y-4
                  ${isDark ? "text-gray-400" : "text-gray-600"}
                `}
              >
                {/* Category paths to iterate and render as links */}
                {[
                  "/decor",

                  "/beauty",
                  "/new-in-body",
                  "/accessories",
                  "/trending-now",
                ].map((path, i) => (
                  <li key={i}>
                    <NavLink
                      to={path}
                      className={`
                          relative group inline-block transition
                          ${isDark ? "hover:text-white" : "hover:text-black"}
                        `}
                    >
                      {/* Display category name in uppercase */}
                      {path.replace("/", "").toUpperCase()}

                      {/* Animated underline that expands on hover */}
                      <span
                        className={`
                            absolute left-0 -bottom-1
                            w-0 h-[1px]
                            group-hover:w-full
                            transition-all duration-300
                            ${isDark ? "bg-white" : "bg-black"}
                          `}
                      />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help and support links section */}
            <div>
              {/* Section heading */}
              <h3 onClick={() => navigate("/help")} className="mb-8 text-2xl font-medium">HELP</h3>

              {/* Help link list*/}
              <ul
                className={`
                space-y-4
                ${isDark ? "text-gray-400" : "text-gray-600"}
                `}
              >
                {/* Array of help topics with labels and paths */}
                {[
                  {
                    label: "FAQ",
                    path: "/help/faq",
                  },
                  {
                    label: "SHIPPING",
                    path: "/help/shipping",
                  },
                  {
                    label: "RETURNS",
                    path: "/help/returns",
                  },
                  {
                    label: "ORDER STATUS",
                    path: "/help/orders",
                  },
                ].map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                      inline-block
                      transition-colors
                      duration-200
                      ${isDark ? "hover:text-white" : "hover:text-black"}
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Promotional image cards with category links */}
            <div className="space-y-8">
              {/* Accessories promotional card */}
              <Link to="/accessories">
                <div className="flex gap-4 items-center group cursor-pointer">
                  <img
                    src="https://mafoil.wpbingosite.com/wp-content/uploads/2022/11/banner-11.jpg"
                    className="w-20 h-20 object-cover group-hover:scale-105 transition"
                  />

                  {/* Card text content with category and title */}
                  <div>
                    <p
                      className={`
                        text-xs tracking-[6px]
                        uppercase
                        ${isDark ? "text-gray-400" : "text-gray-500"}
                      `}
                    >
                      Accessories
                    </p>
                    <h4
                      className={`
                        font-medium mt-1 text-sm
                        ${isDark ? "text-white" : "text-gray-800"}
                      `}
                    >
                      Fashion Magic Everyday
                    </h4>
                  </div>
                </div>
              </Link>

              {/* Collection promotional card */}
              <Link to="/new-in-body">
                <div className="flex gap-4 items-center group cursor-pointer mt-2">
                  <img
                    src="https://mafoil.wpbingosite.com/wp-content/plugins/wpbingo/lib/lookbook/images/bwp_lookbook/lookbook-1.jpg"
                    className="w-20 h-20 object-cover group-hover:scale-105 transition"
                  />

                  {/* Card text content with category and title */}
                  <div>
                    <p
                      className={`
                        text-xs tracking-[6px]
                        uppercase
                        ${isDark ? "text-gray-400" : "text-gray-500"}
                      `}
                    >
                      Collection
                    </p>
                    <h4
                      className={`
                        font-medium mt-1 text-sm
                        ${isDark ? "text-white" : "text-gray-800"}
                      `}
                    >
                      Her Style Choice
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer bottom with copyright and payment methods */}
        <div
          className={`
            border-t
            ${isDark ? "border-gray-700" : "border-gray-300"}
          `}
        >
          <div className="max-w-[1800px] mx-auto px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p
              className={`
                transition cursor-default
                ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }
              `}
            >
              © 2026 Cartify. Crafted with care.
            </p>

            {/* Payment method badges section */}
            <div
              className={`
                flex gap-8 font-semibold text-lg
                ${isDark ? "text-gray-500" : "text-gray-400"}
              `}
            >
              {/* Mastercard*/}
              <span className="hover:text-black transition cursor-pointer">
                Mastercard
              </span>

              {/* VISA*/}
              <span className="hover:text-black transition cursor-pointer">
                VISA
              </span>

              {/* PayPal*/}
              <span className="hover:text-black transition cursor-pointer">
                PayPal
              </span>
            </div>
          </div>
        </div>
      </section>
   
    </footer>
  );
};

export default Footer;
