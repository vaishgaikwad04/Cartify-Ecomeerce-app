import React, { useContext } from "react";

import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaDribbble,
} from "react-icons/fa";

import { NavLink, Link, useNavigate } from "react-router-dom";

import { ThemeContext } from "../../context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  const navigate = useNavigate();

  return (
    <footer className="w-full">
      {/* =========================================================
          MAIN FOOTER
      ========================================================= */}
      <section
        className={`
          w-full
          transition-colors
          duration-300
          ${
            isDark
              ? "bg-gray-900 text-white"
              : "bg-[#f5f5f5] text-gray-900"
          }
        `}
      >
        {/* =========================================================
            FOOTER CONTAINER
        ========================================================= */}
        <div
          className="
            w-full
            max-w-[1800px]
            mx-auto

            px-4
            sm:px-6
            md:px-8
            lg:px-10
            xl:px-12

            py-8
            sm:py-10
            md:py-12
            lg:py-14
          "
        >
          {/* =====================================================
              FOOTER GRID

              Mobile  : 2 columns
              Tablet  : 2 columns
              Desktop : 4 columns
          ===================================================== */}
          <div
            className="
              grid
              grid-cols-4
              lg:grid-cols-4

              gap-x-6
              gap-y-8

              sm:gap-x-8
              sm:gap-y-10

              md:gap-x-10

              lg:gap-x-12
              lg:gap-y-0
            "
          >
            {/* ===================================================
                BRAND / CONTACT
            =================================================== */}
            <div className="min-w-0">
              {/* BRAND */}
              <h2
                onClick={() => navigate("/")}
                className="
                  cursor-pointer

                  text-sm
                  sm:text-base
                  md:text-lg

                  font-serif
                  font-medium

                  tracking-[3px]
                  sm:tracking-[4px]
                  md:tracking-[5px]

                  uppercase

                  whitespace-nowrap
                "
              >
                Cartify
              </h2>

              {/* DESCRIPTION */}
              <p
                className={`
                  mt-3

                  max-w-[280px]

                  text-[10px]
                  sm:text-xs
                  md:text-sm

                  leading-relaxed

                  ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-500"
                  }
                `}
              >
                Your destination for modern fashion, beauty, and lifestyle.
                Discover curated collections, premium quality, and trending
                styles all in one place.
              </p>

              {/* =================================================
                  SOCIAL ICONS
              ================================================= */}
              <div
                className={`
                  flex
                  items-center

                  gap-2
                  sm:gap-2.5
                  md:gap-3

                  mt-4
                  sm:mt-5

                  ${
                    isDark
                      ? "text-gray-300"
                      : "text-gray-600"
                  }
                `}
              >
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
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`
                      flex
                      items-center
                      justify-center

                      shrink-0

                      w-7
                      h-7

                      sm:w-8
                      sm:h-8

                      md:w-9
                      md:h-9

                      rounded-full

                      text-[10px]
                      sm:text-xs

                      cursor-pointer

                      hover:scale-110
                      transition-transform
                      duration-200

                      ${
                        isDark
                          ? "bg-gray-800"
                          : "bg-gray-100"
                      }
                    `}
                  >
                    <span className={item.hover}>
                      {item.icon}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ===================================================
                CATEGORIES
            =================================================== */}
            <div className="min-w-0">
              <h3
                className="
                  text-xs
                  sm:text-sm
                  md:text-base
                  lg:text-lg

                  font-medium

                  mb-3
                  sm:mb-4
                  md:mb-5
                "
              >
                CATEGORIES
              </h3>

              <ul
                className={`
                  space-y-2
                  sm:space-y-2.5
                  md:space-y-3

                  text-[10px]
                  sm:text-xs
                  md:text-sm

                  ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-600"
                  }
                `}
              >
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
                        relative
                        group
                        inline-block

                        transition-colors
                        duration-200

                        ${
                          isDark
                            ? "hover:text-white"
                            : "hover:text-black"
                        }
                      `}
                    >
                      {path.replace("/", "").toUpperCase()}

                      {/* HOVER UNDERLINE */}
                      <span
                        className={`
                          absolute
                          left-0
                          -bottom-1

                          w-0
                          h-px

                          group-hover:w-full

                          transition-all
                          duration-300

                          ${
                            isDark
                              ? "bg-white"
                              : "bg-black"
                          }
                        `}
                      />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===================================================
                HELP
            =================================================== */}
            <div className="min-w-0">
              <h3
                onClick={() => navigate("/help")}
                className="
                  cursor-pointer

                  text-xs
                  sm:text-sm
                  md:text-base
                  lg:text-lg

                  font-medium

                  mb-3
                  sm:mb-4
                  md:mb-5
                "
              >
                HELP
              </h3>

              <ul
                className={`
                  space-y-2
                  sm:space-y-2.5
                  md:space-y-3

                  text-[10px]
                  sm:text-xs
                  md:text-sm

                  ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-600"
                  }
                `}
              >
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

                        ${
                          isDark
                            ? "hover:text-white"
                            : "hover:text-black"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===================================================
                PROMOTIONAL CARDS
            =================================================== */}
            <div
              className="
                min-w-0

                space-y-3
                sm:space-y-4
                md:space-y-5
              "
            >
              {/* =================================================
                  ACCESSORIES
              ================================================= */}
              <Link to="/accessories">
                <div
                  className="
                    flex
                    items-center

                    gap-2
                    sm:gap-2.5
                    md:gap-3

                    group
                    cursor-pointer
                  "
                >
                  {/* IMAGE */}
                  <div
                    className="
                      shrink-0
                      overflow-hidden
                    "
                  >
                    <img
                      src="https://mafoil.wpbingosite.com/wp-content/uploads/2022/11/banner-11.jpg"
                      alt="Accessories"
                      className="
                        w-10
                        h-10

                        sm:w-12
                        sm:h-12

                        md:w-14
                        md:h-14

                        object-cover

                        group-hover:scale-105

                        transition-transform
                        duration-300
                      "
                    />
                  </div>

                  {/* TEXT */}
                  <div className="min-w-0">
                    <p
                      className={`
                        text-[7px]
                        sm:text-[8px]
                        md:text-[9px]

                        tracking-[1.5px]
                        sm:tracking-[2px]
                        md:tracking-[3px]

                        uppercase

                        leading-none

                        ${
                          isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                        }
                      `}
                    >
                      Accessories
                    </p>

                    <h4
                      className={`
                        mt-1

                        text-[10px]
                        sm:text-[11px]
                        md:text-xs

                        font-normal

                        truncate

                        ${
                          isDark
                            ? "text-white"
                            : "text-gray-800"
                        }
                      `}
                    >
                      Fashion
                    </h4>
                  </div>
                </div>
              </Link>

              {/* =================================================
                  COLLECTION
              ================================================= */}
              <Link to="/new-in-body">
                <div
                  className="
                    flex
                    items-center

                    gap-2
                    sm:gap-2.5
                    md:gap-3

                    group
                    cursor-pointer
                  "
                >
                  {/* IMAGE */}
                  <div
                    className="
                      shrink-0
                      overflow-hidden
                    "
                  >
                    <img
                      src="https://mafoil.wpbingosite.com/wp-content/plugins/wpbingo/lib/lookbook/images/bwp_lookbook/lookbook-1.jpg"
                      alt="Collection"
                      className="
                        w-10
                        h-10

                        sm:w-12
                        sm:h-12

                        md:w-14
                        md:h-14

                        object-cover

                        group-hover:scale-105

                        transition-transform
                        duration-300
                      "
                    />
                  </div>

                  {/* TEXT */}
                  <div className="min-w-0">
                    <p
                      className={`
                        text-[7px]
                        sm:text-[8px]
                        md:text-[9px]

                        tracking-[1.5px]
                        sm:tracking-[2px]
                        md:tracking-[3px]

                        uppercase

                        leading-none

                        ${
                          isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                        }
                      `}
                    >
                      Collection
                    </p>

                    <h4
                      className={`
                        mt-1

                        text-[10px]
                        sm:text-[11px]
                        md:text-xs

                        font-normal

                        truncate

                        ${
                          isDark
                            ? "text-white"
                            : "text-gray-800"
                        }
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

        {/* =========================================================
            FOOTER BOTTOM
        ========================================================= */}
        <div
          className={`
            border-t

            ${
              isDark
                ? "border-gray-700"
                : "border-gray-300"
            }
          `}
        >
          <div
            className="
              max-w-[1800px]
              mx-auto

              px-4
              sm:px-6
              md:px-8
              lg:px-10
              xl:px-12

              py-4
              sm:py-5
              md:py-6

              flex
              flex-col
              sm:flex-row

              justify-between
              items-center

              gap-3
              sm:gap-4
            "
          >
            {/* COPYRIGHT */}
            <p
              className={`
                text-[9px]
                sm:text-[10px]
                md:text-xs

                text-center
                sm:text-left

                transition-colors

                ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }
              `}
            >
              © 2026 Cartify. Crafted with care.
            </p>

            {/* =====================================================
                PAYMENT METHODS
            ===================================================== */}
            <div
              className={`
                flex
                items-center

                gap-3
                sm:gap-4
                md:gap-5

                text-[9px]
                sm:text-[10px]
                md:text-xs

                font-semibold

                ${
                  isDark
                    ? "text-gray-500"
                    : "text-gray-400"
                }
              `}
            >
              <span className="hover:text-black transition-colors cursor-pointer">
                Mastercard
              </span>

              <span className="hover:text-black transition-colors cursor-pointer">
                VISA
              </span>

              <span className="hover:text-black transition-colors cursor-pointer">
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