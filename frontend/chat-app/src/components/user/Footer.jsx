
import React, { useContext } from "react";

import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaDribbble,
} from "react-icons/fa";

import { FiMail } from "react-icons/fi";

import { NavLink, Link, useNavigate } from "react-router-dom";

import { ThemeContext } from "../../context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  const navigate = useNavigate();

  const categories = [
    { label: "DECOR", path: "/decor" },
    { label: "BEAUTY", path: "/beauty" },
    { label: "NEW-IN-BODY", path: "/new-in-body" },
    { label: "ACCESSORIES", path: "/accessories" },
    { label: "TRENDING-NOW", path: "/trending-now" },
  ];

  const helpLinks = [
    { label: "FAQ", path: "/help/faq" },
    { label: "SHIPPING", path: "/help/shipping" },
    { label: "RETURNS", path: "/help/returns" },
    { label: "ORDER STATUS", path: "/help/orders" },
  ];

  const socialLinks = [
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
  ];

  return (
    <footer
      className={`
        w-full
        transition-colors duration-300
        ${
          isDark
            ? "bg-gray-950 text-white"
            : "bg-white text-gray-900"
        }
      `}
    >
      {/* MAIN FOOTER */}
      <section className="w-full px-3 sm:px-5 lg:px-8 py-8 md:py-12">

        <div
          className={`
            max-w-[1800px]
            mx-auto
            w-full

            ${
              isDark
                ? "bg-gray-900"
                : "bg-[#f7f5f4]"
            }

            px-5
            sm:px-8
            md:px-10
            lg:px-12

            pt-12
            sm:pt-14
            md:pt-16

            pb-8
            sm:pb-10
            md:pb-12

            transition-colors duration-300
          `}
        >

          {/* ==========================================
              CENTERED BRAND
          ========================================== */}
          <div className="text-center mb-12 md:mb-16">

            <h2
              onClick={() => navigate("/")}
              className="
                inline-block
                cursor-pointer

                font-serif
                font-normal

                text-xl
                sm:text-2xl
                md:text-3xl
                lg:text-4xl

                tracking-tight

                transition-opacity
                duration-300

                hover:opacity-60
              "
            >
              Cartify
            </h2>

          </div>

          {/* ==========================================
              FOOTER FOUR COLUMN LAYOUT
          ========================================== */}
          <div
            className="
              grid

              grid-cols-2
              lg:grid-cols-4

              gap-x-5
              sm:gap-x-8
              lg:gap-x-10

              gap-y-10
              lg:gap-y-6

              items-start
            "
          >

            {/* ========================================
                COLUMN 1 - CONTACT / SOCIAL
            ======================================== */}
            <div className="min-w-0">

              <h3
                className={`
                  text-xs
                  sm:text-sm
                  font-semibold
                  mb-5
                  tracking-wide

                  ${
                    isDark
                      ? "text-white"
                      : "text-gray-900"
                  }
                `}
              >
                CONTACT
              </h3>

              <p
                className={`
                  text-[11px]
                  sm:text-xs
                  leading-7

                  ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-600"
                  }
                `}
              >
                Your destination for modern fashion,
                beauty, and lifestyle. Discover curated
                collections, premium quality, and
                trending styles all in one place.
              </p>

              {/* SOCIAL ICONS */}
              <div
                className={`
                  flex
                  items-center
                  gap-4
                  mt-6

                  ${
                    isDark
                      ? "text-gray-300"
                      : "text-gray-800"
                  }
                `}
              >
                {socialLinks.map((item, index) => (
                  <div
                    key={index}
                    className={`
                      text-sm
                      cursor-pointer
                      transition-all
                      duration-300
                      hover:scale-125

                      ${item.hover}
                    `}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>

            </div>

            {/* ========================================
                COLUMN 2 - CATEGORIES
            ======================================== */}
            <div className="min-w-0">

              <h3
                className="
                  text-xs
                  sm:text-sm
                  font-semibold
                  mb-5
                  tracking-wide
                "
              >
                CATEGORIES
              </h3>

              <ul
                className={`
                  space-y-3

                  text-[11px]
                  sm:text-xs

                  ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-600"
                  }
                `}
              >
                {categories.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={`
                        inline-block
                        relative
                        group

                        transition-colors
                        duration-300

                        ${
                          isDark
                            ? "hover:text-white"
                            : "hover:text-black"
                        }
                      `}
                    >
                      {item.label}

                      <span
                        className={`
                          absolute
                          left-0
                          -bottom-1

                          h-px
                          w-0

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

            {/* ========================================
                COLUMN 3 - HELP
            ======================================== */}
            <div className="min-w-0">

              <h3
                onClick={() => navigate("/help")}
                className="
                  cursor-pointer

                  text-xs
                  sm:text-sm

                  font-semibold
                  mb-5
                  tracking-wide

                  hover:opacity-60
                  transition-opacity
                "
              >
                HELP
              </h3>

              <ul
                className={`
                  space-y-3

                  text-[11px]
                  sm:text-xs

                  ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-600"
                  }
                `}
              >
                {helpLinks.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        inline-block
                        transition-colors
                        duration-300

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

            {/* ========================================
                COLUMN 4 - NEWSLETTER
            ======================================== */}
            <div className="min-w-0">

              <h3
                className="
                  text-xs
                  sm:text-sm
                  font-semibold
                  mb-5
                  tracking-wide
                "
              >
                NEWSLETTER
              </h3>

              <p
                className={`
                  text-[11px]
                  sm:text-xs
                  leading-6
                  mb-6

                  ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-600"
                  }
                `}
              >
                Subscribe to the weekly newsletter
                for all the latest updates.
              </p>

              {/* EMAIL INPUT DESIGN */}
              <div
                className={`
                  flex
                  items-center
                  justify-between
                  w-full

                  border-b

                  pb-2

                  ${
                    isDark
                      ? "border-gray-600"
                      : "border-gray-800"
                  }
                `}
              >
                <input
                  type="email"
                  placeholder="Email..."
                  aria-label="Newsletter email address"
                  className={`
                    w-full
                    min-w-0
                    bg-transparent
                    outline-none

                    text-xs

                    placeholder:text-gray-400

                    ${
                      isDark
                        ? "text-white"
                        : "text-gray-800"
                    }
                  `}
                />

                <FiMail
                  className={`
                    shrink-0
                    text-lg
                    cursor-pointer

                    ${
                      isDark
                        ? "text-gray-300"
                        : "text-gray-800"
                    }
                  `}
                />

              </div>

            </div>

          </div>

          {/* ==========================================
              COPYRIGHT
          ========================================== */}
          <div className="mt-12 md:mt-14 text-center">

            <p
              className={`
                text-[11px]
                sm:text-xs

                ${
                  isDark
                    ? "text-gray-300"
                    : "text-gray-700"
                }
              `}
            >
              © 2026{" "}

              <Link
                to="/"
                className="
                  underline
                  underline-offset-2
                  hover:opacity-60
                  transition-opacity
                "
              >
                Cartify
              </Link>

              . All rights reserved.
            </p>

          </div>

        </div>

      </section>
    </footer>
  );
};

export default Footer;
