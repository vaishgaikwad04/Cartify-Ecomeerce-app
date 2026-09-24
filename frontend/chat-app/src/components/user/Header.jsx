
import { NavLink } from "react-router-dom";

// Icons
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {
  FiSearch,
  FiPackage,
  FiX,
  FiBell,
  FiMenu,
} from "react-icons/fi";

import { useHeader } from "../../hooks/user/useHeader";

// Components
import Drawer from "../ui/drawer";
import CartSidebar from "../../pages/user/cart/CartSidebar";

const Header = () => {
  const {
    navigate,
    isDark,

    allowNotification,
    unreadCount,

    profileData,

    isMobileMenuOpen,
    setIsMobileMenuOpen,
    openMobileMenu,
    setOpenMobileMenu,
    closeMobileMenu,

    isCartDrawerOpen,
    setIsCartDrawerOpen,

    isSearchModalOpen,
    setIsSearchModalOpen,
    searchTerm,
    results,
    searchLoading,
    handleSearch,
    closeSearch,
    handleProductClick,
  } = useHeader();

  // Navigation menu structure
  const menus = [
    {
      title: "Home",
      subtitle: "Interior Collection",
      heading: "Living",
      items: [
        {
          name: "Decor",
          path: "/decor",
        },
        {
          name: "Kitchen & Dining",
          path: "/kitchen-dining",
        },
        {
          name: "Pillows",
          path: "/pillows-cushions",
        },
        {
          name: "Books",
          path: "/books",
        },
      ],
    },

    {
      title: "Body",
      subtitle: "Beauty Essentials",
      heading: "Body",
      items: [
        {
          name: "Body Care",
          path: "/body-care",
        },
        {
          name: "Beauty",
          path: "/beauty",
        },
        {
          name: "Accessories",
          path: "/accessories",
        },
        {
          name: "Trending",
          path: "/trending-now",
        },
      ],
    },

    {
      title: "New In",
      subtitle: "Latest Arrivals",
      heading: "Latest",
      items: [
        {
          name: "New In Body",
          path: "/new-in-body",
        },
        {
          name: "New In Home",
          path: "/new-in-home",
        },
      ],
    },
  ];

  // Responsive navigation link styling
  const navClass = ({ isActive }) => `
    transition-all
    duration-300
    flex
    items-center
    gap-1.5
    whitespace-nowrap

    ${
      isActive
        ? isDark
          ? "text-white"
          : "text-red-900"
        : isDark
        ? "text-gray-300 hover:text-white"
        : "text-neutral-700 hover:text-red-900"
    }
  `;

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header
        className={`
          sticky
          top-0
          z-50
          backdrop-blur-md
          border-b
          transition-colors
          duration-300

          ${
            isDark
              ? "bg-gray-950/95 border-gray-800"
              : "bg-white/95 border-gray-100"
          }
        `}
      >
        <div className="max-w-[1800px] mx-auto px-3 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between h-16 sm:h-[68px] lg:h-[72px]">

            {/* =================================================
                LOGO
            ================================================= */}
            <div className="lg:w-[220px] xl:w-[260px] shrink-0">
              <button
                type="button"
                onClick={() => navigate("/")}
                className={`
                  font-serif-sarif
                  text-sm
                  sm:text-base
                  lg:text-lg
                  tracking-[4px]
                  sm:tracking-[5px]
                  lg:tracking-[6px]
                  font-semibold
                  uppercase
                  cursor-pointer
                  transition-colors
                  whitespace-nowrap

                  ${
                    isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-900 hover:text-black"
                  }
                `}
              >
                Cartify
              </button>
            </div>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}
            <nav
              className={`
                hidden
                lg:flex
                flex-1
                justify-center
                items-center
                gap-6
                xl:gap-10
                2xl:gap-14

                text-xs
                xl:text-sm
                font-medium
                tracking-[2px]
                xl:tracking-[2.5px]
                uppercase

                ${isDark ? "text-gray-300" : "text-neutral-700"}
              `}
            >
              {menus.map((menu) => (
                <div
                  key={menu.title}
                  className="
                    group
                    relative
                    flex
                    items-center
                    h-full
                  "
                >
                  {/* MENU TITLE */}
                  <NavLink
                    to={menu.items[0]?.path || "/"}
                    className={`
                      relative
                      flex
                      items-center
                      gap-1.5
                      py-6
                      xl:py-7
                      transition-all
                      duration-500
                      hover:tracking-[2.5px]
                      xl:hover:tracking-[3px]

                      ${navClass}
                    `}
                  >
                    {menu.title}

                    {/* UNDERLINE */}
                    <span
                      className={`
                        absolute
                        left-0
                        bottom-4
                        h-[1px]
                        w-0
                        transition-all
                        duration-500
                        group-hover:w-full

                        ${isDark ? "bg-white" : "bg-neutral-900"}
                      `}
                    />

                    <FaChevronDown
                      className="
                        text-[7px]
                        sm:text-[8px]
                        opacity-60
                        transition-all
                        duration-500
                        group-hover:rotate-180
                        group-hover:opacity-100
                      "
                    />
                  </NavLink>

                  {/* =================================================
                      DESKTOP DROPDOWN
                  ================================================= */}
                  <div
                    className="
                      absolute
                      top-full
                      left-1/2
                      -translate-x-1/2
                      pt-3

                      opacity-0
                      invisible
                      translate-y-3

                      group-hover:opacity-100
                      group-hover:visible
                      group-hover:translate-y-0

                      transition-all
                      duration-300

                      w-[300px]
                      sm:w-[340px]
                      lg:w-[360px]
                      z-50
                    "
                  >
                    <div
                      className={`
                        rounded-xl
                        p-5
                        sm:p-6
                        shadow-[0_25px_60px_rgba(0,0,0,0.15)]
                        backdrop-blur-xl
                        border

                        ${
                          isDark
                            ? "bg-neutral-950/95 border-neutral-800"
                            : "bg-white/95 border-neutral-100"
                        }
                      `}
                    >
                      {/* DROPDOWN HEADER */}
                      <div className="mb-5">
                        <h3
                          className={`
                            text-lg
                            sm:text-xl
                            font-semibold
                            tracking-normal

                            ${
                              isDark
                                ? "text-white"
                                : "text-gray-900"
                            }
                          `}
                        >
                          {menu.heading}
                        </h3>

                        <p
                          className={`
                            mt-1.5
                            text-[10px]
                            sm:text-xs
                            tracking-normal

                            ${
                              isDark
                                ? "text-gray-400"
                                : "text-gray-500"
                            }
                          `}
                        >
                          {menu.subtitle}
                        </p>
                      </div>

                      {/* DROPDOWN LINKS */}
                      <div className="space-y-3">
                        {menu.items.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.path}
                            className={`
                              group/item
                              flex
                              justify-between
                              items-center
                              text-xs
                              sm:text-sm
                              tracking-normal
                              transition-all
                              duration-300
                              hover:translate-x-1.5

                              ${
                                isDark
                                  ? "text-gray-300 hover:text-white"
                                  : "text-gray-700 hover:text-black"
                              }
                            `}
                          >
                            <span>{item.name}</span>

                            <span
                              className="
                                opacity-0
                                group-hover/item:opacity-100
                                transition-all
                              "
                            >
                              →
                            </span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* =================================================
                RIGHT ACTIONS
            ================================================= */}
            <div
              className={`
                lg:w-[220px]
                xl:w-[260px]
                flex
                justify-end
                items-center
                gap-1.5
                sm:gap-2.5
                lg:gap-2
                shrink-0

                ${isDark ? "text-white" : "text-black"}
              `}
            >
              {/* SEARCH */}
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                className={`
                  flex
                  items-center
                  justify-center

                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  lg:w-10
                  lg:h-10

                  shrink-0
                  rounded-full
                  transition-all
                  duration-200

                  ${
                    isDark
                      ? "text-gray-200 hover:bg-gray-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
                aria-label="Search"
              >
                <FiSearch className="text-[17px] sm:text-[18px] lg:text-[19px]" />
              </button>

              {/* CART */}
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                className={`
                  flex
                  items-center
                  justify-center

                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  lg:w-10
                  lg:h-10

                  shrink-0
                  rounded-full
                  transition-all
                  duration-200

                  ${
                    isDark
                      ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
                aria-label="Cart"
              >
                <HiOutlineShoppingBag className="text-[18px] sm:text-[19px] lg:text-[20px]" />
              </button>

              {/* =================================================
                  DESKTOP ACTIONS
              ================================================= */}
              <div className="hidden lg:flex items-center gap-2">
                {/* ORDERS */}
                <button
                  type="button"
                  onClick={() => navigate("/orders")}
                  className={`
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300

                    ${
                      isDark
                        ? "bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black"
                    }
                  `}
                  aria-label="Orders"
                >
                  <FiPackage className="text-[19px] lg:text-[20px]" />
                </button>

                {/* NOTIFICATIONS */}
                {allowNotification && (
                  <button
                    type="button"
                    onClick={() => navigate("/notifications")}
                    className={`
                      relative
                      w-10
                      h-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300

                      ${
                        isDark
                          ? "bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black"
                      }
                    `}
                    aria-label={`Notifications${
                      unreadCount > 0
                        ? `, ${unreadCount} unread`
                        : ""
                    }`}
                  >
                    <FiBell className="text-[18px] lg:text-[19px]" />

                    {unreadCount > 0 && (
                      <span
                        className="
                          absolute
                          -top-1
                          -right-1
                          min-w-[17px]
                          h-[17px]
                          px-1
                          rounded-full
                          bg-red-500
                          text-white
                          text-[9px]
                          font-bold
                          flex
                          items-center
                          justify-center
                          border-2
                          border-white
                          leading-none
                        "
                      >
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </button>
                )}

                {/* PROFILE */}
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className={`
                    group
                    flex
                    items-center
                    gap-2
                    pl-1
                    pr-3
                    py-1
                    rounded-full
                    border
                    cursor-pointer
                    transition-all
                    duration-300
                    shadow-sm

                    ${
                      isDark
                        ? "bg-gray-900 border-gray-800 hover:border-gray-600 hover:bg-gray-800 hover:shadow-lg"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
                    }
                  `}
                >
                  {/* AVATAR */}
                  <div className="relative shrink-0">
                    <div
                      className={`
                        w-8
                        h-8
                        lg:w-9
                        lg:h-9
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-white
                        font-semibold
                        text-xs
                        uppercase
                        shadow-sm
                        transition-transform
                        duration-300
                        group-hover:scale-105

                        ${
                          isDark
                            ? "bg-gradient-to-br from-gray-500 via-gray-700 to-black"
                            : "bg-gradient-to-br from-gray-800 to-black"
                        }
                      `}
                    >
                      {profileData?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </div>

                    <span
                      className={`
                        absolute
                        bottom-0
                        right-0
                        w-2.5
                        h-2.5
                        rounded-full
                        border-2

                        ${
                          isDark
                            ? "bg-green-500 border-gray-900"
                            : "bg-green-500 border-white"
                        }
                      `}
                    />
                  </div>

                  {/* USER INFO */}
                  <div className="hidden xl:flex flex-col items-start min-w-0 leading-tight">
                    <span
                      className={`
                        max-w-[100px]
                        truncate
                        text-xs
                        font-semibold

                        ${
                          isDark
                            ? "text-gray-100 group-hover:text-white"
                            : "text-gray-900 group-hover:text-black"
                        }
                      `}
                    >
                      {profileData?.name || "User"}
                    </span>

                    <span
                      className={`
                        mt-0.5
                        text-[9px]
                        font-medium
                        tracking-wide
                        uppercase

                        ${
                          isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                        }
                      `}
                    >
                      Account
                    </span>
                  </div>

                  <span
                    className={`
                      hidden
                      xl:block
                      ml-0.5
                      text-[10px]

                      ${
                        isDark
                          ? "text-gray-500"
                          : "text-gray-400"
                      }
                    `}
                  >
                    →
                  </span>
                </button>
              </div>

              {/* =================================================
                  HAMBURGER
              ================================================= */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className={`
                  lg:hidden
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300

                  ${
                    isDark
                      ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
                aria-label="Open menu"
              >
                <FiMenu className="text-[19px] sm:text-[20px]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}
      {isMobileMenuOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            lg:hidden
            bg-black/50
            backdrop-blur-[2px]
          "
          onClick={closeMobileMenu}
        >
          <div
            className={`
              absolute
              top-0
              right-0
              h-full
              w-[85%]
              sm:w-[380px]
              max-w-[380px]
              overflow-y-auto
              shadow-2xl

              ${
                isDark
                  ? "bg-gray-950 text-white"
                  : "bg-white text-gray-900"
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* MOBILE HEADER */}
            <div
              className={`
                sticky
                top-0
                z-10
                flex
                items-center
                justify-between
                px-5
                py-4
                border-b

                ${
                  isDark
                    ? "bg-gray-950 border-gray-800"
                    : "bg-white border-gray-100"
                }
              `}
            >
              <div>
                <p
                  className={`
                    text-[9px]
                    tracking-[2.5px]
                    uppercase
                    mb-1

                    ${
                      isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                    }
                  `}
                >
                  Navigation
                </p>

                <h2 className="text-base sm:text-lg font-semibold tracking-[3px] uppercase">
                  Cartify
                </h2>
              </div>

              <button
                type="button"
                onClick={closeMobileMenu}
                className={`
                  w-9
                  h-9
                  rounded-full
                  flex
                  items-center
                  justify-center
                  transition

                  ${
                    isDark
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }
                `}
                aria-label="Close menu"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* =================================================
                SHOP
            ================================================= */}
            <div className="px-5 pt-6">
              <p
                className={`
                  text-[9px]
                  tracking-[2.5px]
                  uppercase
                  mb-3

                  ${
                    isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                  }
                `}
              >
                Shop
              </p>

              <nav className="flex flex-col">
                {menus.map((menu) => (
                  <div key={menu.title}>
                    {/* MAIN CATEGORY */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileMenu(
                          openMobileMenu === menu.title
                            ? null
                            : menu.title
                        )
                      }
                      className={`
                        w-full
                        flex
                        items-center
                        justify-between
                        py-4
                        text-left
                        transition-colors

                        ${
                          isDark
                            ? "text-gray-200 hover:text-white"
                            : "text-gray-800 hover:text-black"
                        }
                      `}
                    >
                      <span
                        className="
                          text-base
                          sm:text-lg
                          font-medium
                          tracking-wide
                        "
                      >
                        {menu.title}
                      </span>

                      <FaChevronDown
                        className={`
                          text-[10px]
                          transition-transform
                          duration-300

                          ${
                            openMobileMenu === menu.title
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />
                    </button>

                    {/* SUB NAV */}
                    <div
                      className={`
                        overflow-hidden
                        transition-all
                        duration-300

                        ${
                          openMobileMenu === menu.title
                            ? "max-h-96 opacity-100 pb-3"
                            : "max-h-0 opacity-0"
                        }
                      `}
                    >
                      <div
                        className={`
                          ml-1
                          pl-4
                          border-l

                          ${
                            isDark
                              ? "border-gray-800"
                              : "border-gray-200"
                          }
                        `}
                      >
                        {menu.items.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.path}
                            onClick={closeMobileMenu}
                            className={`
                              flex
                              items-center
                              py-2.5
                              text-xs
                              sm:text-sm
                              transition-all
                              duration-200

                              ${
                                isDark
                                  ? "text-gray-500 hover:text-white"
                                  : "text-gray-500 hover:text-black"
                              }
                            `}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* =================================================
                ACCOUNT ACTIONS
            ================================================= */}
            <div className="px-5">
              <div
                className={`
                  mt-4
                  pt-5
                  border-t

                  ${
                    isDark
                      ? "border-gray-800"
                      : "border-gray-200"
                  }
                `}
              >
                <p
                  className={`
                    text-[9px]
                    tracking-[2.5px]
                    uppercase
                    mb-3

                    ${
                      isDark
                        ? "text-gray-500"
                        : "text-gray-400"
                    }
                  `}
                >
                  Account
                </p>

                <div className="grid grid-cols-3 gap-1.5">
                  {/* ORDERS */}
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      navigate("/orders");
                    }}
                    className={`
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-1.5
                      py-3
                      rounded-xl
                      transition-all

                      ${
                        isDark
                          ? "text-gray-400 hover:bg-gray-900 hover:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }
                    `}
                  >
                    <FiPackage className="text-[19px] sm:text-[20px]" />

                    <span className="text-[10px] sm:text-[11px]">
                      Orders
                    </span>
                  </button>

                  {/* NOTIFICATIONS */}
                  {allowNotification && (
                    <button
                      type="button"
                      onClick={() => {
                        closeMobileMenu();
                        navigate("/notifications");
                      }}
                      className={`
                        relative
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-1.5
                        py-3
                        rounded-xl
                        transition-all

                        ${
                          isDark
                            ? "text-gray-400 hover:bg-gray-900 hover:text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                        }
                      `}
                    >
                      <div className="relative">
                        <FiBell className="text-[19px] sm:text-[20px]" />

                        {unreadCount > 0 && (
                          <span
                            className="
                              absolute
                              -top-2
                              -right-2
                              min-w-[16px]
                              h-[16px]
                              px-1
                              rounded-full
                              bg-red-500
                              text-white
                              text-[8px]
                              font-bold
                              flex
                              items-center
                              justify-center
                            "
                          >
                            {unreadCount > 99
                              ? "99+"
                              : unreadCount}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] sm:text-[11px]">
                        Notifications
                      </span>
                    </button>
                  )}

                  {/* PROFILE */}
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      navigate("/profile");
                    }}
                    className={`
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-1.5
                      py-3
                      rounded-xl
                      transition-all

                      ${
                        isDark
                          ? "text-gray-400 hover:bg-gray-900 hover:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }
                    `}
                  >
                    <div
                      className={`
                        w-7
                        h-7
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-white
                        text-[10px]
                        font-semibold

                        ${
                          isDark
                            ? "bg-gray-700"
                            : "bg-gray-800"
                        }
                      `}
                    >
                      {profileData?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </div>

                    <span className="text-[10px] sm:text-[11px]">
                      Profile
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CART DRAWER
      ===================================================== */}
      <Drawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
      >
        <CartSidebar
          onClose={() => setIsCartDrawerOpen(false)}
        />
      </Drawer>

      {/* =====================================================
          SEARCH MODAL
      ===================================================== */}
      {isSearchModalOpen && (
        <div
          className={`
            fixed
            inset-0
            z-[100]
            ${isDark ? "bg-black/70" : "bg-black/40"}
          `}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeSearch();
            }
          }}
        >
          <div
            className={`
              relative
              w-full
              px-3
              sm:px-5
              lg:px-6
              py-4
              sm:py-5
              shadow-xl

              ${isDark ? "bg-gray-900" : "bg-white"}
            `}
          >
            <div className="max-w-5xl mx-auto relative">
              {/* SEARCH ICON */}
              <FiSearch
                className={`
                  absolute
                  left-3
                  sm:left-4
                  top-1/2
                  -translate-y-1/2
                  text-base
                  sm:text-lg

                  ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-500"
                  }
                `}
              />

              {/* SEARCH INPUT */}
              <input
                autoFocus
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search products, brands, categories..."
                className={`
                  w-full
                  pl-10
                  sm:pl-12
                  pr-12
                  py-3
                  sm:py-4
                  bg-transparent
                  border-b
                  outline-none
                  text-xs
                  sm:text-sm
                  font-medium

                  ${
                    isDark
                      ? "text-white border-gray-700 placeholder-gray-500 focus:border-white"
                      : "text-black border-gray-300 placeholder-gray-400 focus:border-black"
                  }
                `}
              />

              {/* SEARCH RESULTS */}
              {(searchLoading || results.length > 0) && (
                <div
                  className={`
                    absolute
                    top-full
                    left-0
                    right-0
                    mt-2
                    rounded-xl
                    shadow-2xl
                    border
                    overflow-hidden
                    z-50

                    ${
                      isDark
                        ? "bg-gray-900 border-gray-800"
                        : "bg-white border-gray-100"
                    }
                  `}
                >
                  {/* LOADING */}
                  {searchLoading && (
                    <div
                      className={`
                        px-4
                        py-5
                        text-center
                        text-xs
                        sm:text-sm

                        ${
                          isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                        }
                      `}
                    >
                      Searching...
                    </div>
                  )}

                  {/* RESULTS */}
                  {!searchLoading &&
                    results.map((item) => (
                      <button
                        type="button"
                        key={item._id}
                        onClick={() =>
                          handleProductClick(item._id)
                        }
                        className={`
                          w-full
                          px-4
                          sm:px-5
                          py-3
                          sm:py-4
                          flex
                          items-center
                          gap-3
                          sm:gap-4
                          text-left
                          border-b
                          last:border-b-0
                          transition

                          ${
                            isDark
                              ? "border-gray-800 hover:bg-gray-800 text-white"
                              : "border-gray-100 hover:bg-gray-50 text-gray-800"
                          }
                        `}
                      >
                        {item.images?.[0] && (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="
                              w-7
                              h-7
                              sm:w-8
                              sm:h-8
                              rounded
                              object-cover
                              shrink-0
                            "
                          />
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium truncate">
                            {item.name}
                          </p>
                        </div>

                        <span
                          className={`
                            text-base
                            sm:text-lg

                            ${
                              isDark
                                ? "text-gray-500"
                                : "text-gray-400"
                            }
                          `}
                        >
                          →
                        </span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
