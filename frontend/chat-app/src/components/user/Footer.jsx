
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
        {/* =====================================================
            FOOTER CONTAINER
        ===================================================== */}
        <div
          className="
            w-full
            max-w-[1800px]
            mx-auto
            px-2
            sm:px-4
            md:px-6
            lg:px-10
            xl:px-12
            py-6
            sm:py-8
            md:py-10
            lg:py-12
          "
        >
          {/* =====================================================
              FOOTER GRID

              Mobile  : 4 columns
              Tablet  : 4 columns
              Desktop : 4 columns
          ===================================================== */}
          <div
            className="
              grid
              grid-cols-[1.25fr_0.85fr_0.8fr_1.2fr]
              items-start

              gap-x-2
              sm:gap-x-4
              md:gap-x-8
              lg:gap-x-12

              gap-y-4
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
                  text-[10px]
                  sm:text-sm
                  md:text-base
                  lg:text-lg

                  font-serif
                  font-medium

                  tracking-[1.5px]
                  sm:tracking-[3px]
                  md:tracking-[4px]

                  uppercase
                  whitespace-nowrap
                "
              >
                Cartify
              </h2>

              {/* DESCRIPTION */}
              <p
                className={`
                  mt-2
                  sm:mt-3

                  max-w-[150px]
                  sm:max-w-[220px]
                  md:max-w-[260px]

                  text-[7px]
                  sm:text-[9px]
                  md:text-xs

                  leading-[1.45]

                  line-clamp-6

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

              {/* SOCIAL ICONS */}
              <div
                className={`
                  flex
                  items-center
                  gap-1
                  sm:gap-2
                  md:gap-3

                  mt-3
                  sm:mt-4

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

                      w-5
                      h-5
                      sm:w-7
                      sm:h-7
                      md:w-8
                      md:h-8

                      rounded-full

                      text-[7px]
                      sm:text-[9px]
                      md:text-[10px]

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
                  text-[8px]
                  sm:text-xs
                  md:text-sm
                  lg:text-base

                  font-medium

                  mb-2
                  sm:mb-3
                  md:mb-4
                "
              >
                CATEGORIES
              </h3>

              <ul
                className={`
                  space-y-1.5
                  sm:space-y-2
                  md:space-y-2.5

                  text-[7px]
                  sm:text-[9px]
                  md:text-xs

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

                  text-[8px]
                  sm:text-xs
                  md:text-sm
                  lg:text-base

                  font-medium

                  mb-2
                  sm:mb-3
                  md:mb-4
                "
              >
                HELP
              </h3>

              <ul
                className={`
                  space-y-1.5
                  sm:space-y-2
                  md:space-y-2.5

                  text-[7px]
                  sm:text-[9px]
                  md:text-xs

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
                space-y-2
                sm:space-y-3
                md:space-y-4
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

                    gap-1
                    sm:gap-2
                    md:gap-2.5

                    group
                    cursor-pointer
                    min-w-0
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
                        w-7
                        h-7

                        sm:w-10
                        sm:h-10

                        md:w-12
                        md:h-12

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
                        text-[5px]
                        sm:text-[7px]
                        md:text-[8px]

                        tracking-[1px]
                        sm:tracking-[1.5px]
                        md:tracking-[2px]

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

                        text-[8px]
                        sm:text-[10px]
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

                    gap-1
                    sm:gap-2
                    md:gap-2.5

                    group
                    cursor-pointer
                    min-w-0
                    mt-1
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
                        w-7
                        h-7

                        sm:w-10
                        sm:h-10

                        md:w-12
                        md:h-12

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
                        text-[5px]
                        sm:text-[7px]
                        md:text-[8px]

                        tracking-[1px]
                        sm:tracking-[1.5px]
                        md:tracking-[2px]

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

                        text-[8px]
                        sm:text-[10px]
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

              px-2
              sm:px-4
              md:px-6
              lg:px-10
              xl:px-12

              py-3
              sm:py-4
              md:py-5

              flex
              flex-row

              justify-between
              items-center

              gap-2
              sm:gap-4
            "
          >
            {/* COPYRIGHT */}
            <p
              className={`
                text-[7px]
                sm:text-[9px]
                md:text-xs

                whitespace-nowrap

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

            {/* PAYMENT METHODS */}
            <div
              className={`
                flex
                items-center
                justify-end
                gap-1.5
                sm:gap-3
                md:gap-4

                text-[7px]
                sm:text-[9px]
                md:text-xs

                font-semibold

                whitespace-nowrap

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