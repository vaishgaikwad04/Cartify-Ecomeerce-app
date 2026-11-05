
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  FiSearch,
  FiPackage,
  FiX,
  FiBell,
  FiMenu,
  FiUser,
  FiArrowUpRight,
  FiArrowRight,
} from "react-icons/fi";

import {
  HiOutlineShoppingBag,
} from "react-icons/hi2";

import { FaChevronDown } from "react-icons/fa";

import { useHeader } from "../../hooks/user/useHeader";
import { AuthContext } from "../../context/AuthContext";

import Drawer from "../ui/drawer";
import CartSidebar from "../../pages/user/cart/CartSidebar";
import AuthModal from "../../components/ui/AuthModal";

const Header = ({ isOpen, setIsOpen, isLogin, setIsLogin }) => {
  const { user } = useContext(AuthContext);

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

  // ============================================================
  // NAVIGATION DATA
  // ============================================================

  const menus = [
    {
      title: "Home",
      subtitle: "Thoughtful spaces & living",
      heading: "The Living Edit",
      description: "Make every corner feel like home.",
      items: [
        { name: "Decor", path: "/decor" },
        { name: "Kitchen & Dining", path: "/kitchen-dining" },
        { name: "Pillows & Cushions", path: "/pillows-cushions" },
        { name: "Books", path: "/books" },
      ],
    },
    {
      title: "Clothing",
      subtitle: "Everyday, elevated",
      heading: "The Wardrobe",
      description: "Discover pieces for every occasion.",
      items: [
        { name: "Tops", path: "/tops" },
        { name: "Basics & Loungewear", path: "/basics-loungewear" },
        { name: "Pants & Shorts", path: "/pants-shorts" },
        { name: "Dresses & Skirts", path: "/dresses-skirts" },
        { name: "Sweaters", path: "/sweaters" },
        { name: "Kids", path: "/kids" },
        { name: "Sale", path: "/sale" },
      ],
    },
    {
      title: "Body",
      subtitle: "Beauty & self care",
      heading: "The Beauty Edit",
      description: "Everyday essentials, thoughtfully chosen.",
      items: [
        { name: "Body Care", path: "/body-care" },
        { name: "Beauty", path: "/beauty" },
        { name: "Accessories", path: "/accessories" },
        { name: "Trending", path: "/trending-now" },
      ],
    },
    {
      title: "New In",
      subtitle: "Freshly discovered",
      heading: "Just Arrived",
      description: "A fresh perspective on everyday style.",
      items: [
        { name: "New In Body", path: "/new-in-body" },
        { name: "New In Home", path: "/new-in-home" },
      ],
    },
  ];

  // ============================================================
  // LOCAL STATE
  // ============================================================

  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  // ============================================================
  // THEME
  // ============================================================

  const headerBg = isDark
    ? "bg-[#111111]/95 border-white/10"
    : "bg-[#FAF9F6]/95 border-[#EAE6DF]";

  const mainText = isDark
    ? "text-[#F1EEE8]"
    : "text-[#262522]";

  const secondaryText = isDark
    ? "text-gray-400"
    : "text-[#858078]";

  const menuBg = isDark
    ? "bg-[#171717] border-white/10"
    : "bg-[#FFFFFF] border-[#EAE6DF]";

  const mobileBg = isDark
    ? "bg-[#111111] text-white"
    : "bg-[#FAF9F6] text-[#262522]";

  const subtleHover = isDark
    ? "hover:bg-white/[0.06]"
    : "hover:bg-black/[0.035]";

  // ============================================================
  // HELPERS
  // ============================================================

  const handleLogin = () => {
    setIsLogin(true);
    setIsOpen(true);
  };

  const handleLogoClick = () => {
    setActiveMegaMenu(null);
    closeMobileMenu();
    navigate("/");
  };

  const handleMobileCategory = (title) => {
    setOpenMobileMenu(
      openMobileMenu === title ? null : title
    );
  };

  const handleMobileNavigation = () => {
    closeMobileMenu();
    setOpenMobileMenu(null);
    setActiveMegaMenu(null);
  };

  const handleDesktopMenuEnter = (title) => {
    setActiveMegaMenu(title);
  };

  const handleDesktopMenuLeave = () => {
    setActiveMegaMenu(null);
  };

  // ============================================================
  // NAV LINK STYLE
  // ============================================================

  const navClass = ({ isActive }) => `
    relative
    flex items-center
    gap-1.5
    py-5
    text-[10px]
    xl:text-[11px]
    font-medium
    uppercase
    tracking-[1.5px]
    whitespace-nowrap
    transition-colors duration-300
    ${
      isActive
        ? isDark
          ? "text-white"
          : "text-black"
        : isDark
          ? "text-gray-300 hover:text-white"
          : "text-[#5F5B55] hover:text-black"
    }
  `;

  // ============================================================
  // HEADER ICON STYLE
  // ============================================================

  const iconButtonClass = `
    group
    relative
    flex items-center justify-center
    w-9 h-9
    rounded-full
    transition-all duration-300
    ${subtleHover}
    ${mainText}
  `;

  // ============================================================
  // MEGA MENU
  // ============================================================

  const renderMegaMenu = (menu) => (
    <div
      className={`
        absolute
        top-full
        left-1/2
        -translate-x-1/2
        pt-3
        w-[680px]
        xl:w-[820px]
        z-50
        transition-all duration-300 ease-out
        ${
          activeMegaMenu === menu.title
            ? "visible opacity-100 translate-y-0"
            : "invisible opacity-0 translate-y-2 pointer-events-none"
        }
      `}
    >
      <div
        className={`
          relative
          grid grid-cols-[1fr_1.15fr]
          gap-10
          p-9 xl:p-11
          border
          shadow-[0_18px_55px_rgba(0,0,0,0.12)]
          ${menuBg}
        `}
      >
        {/* EDITORIAL INTRO */}

        <div className="flex flex-col justify-between min-h-[210px]">

          <div>
            <p
              className={`
                text-[9px]
                uppercase
                tracking-[2.5px]
                mb-5
                ${secondaryText}
              `}
            >
              Explore Cartify
            </p>

            <h3
              className={`
                
                text-3xl
                xl:text-[36px]
                leading-tight
                font-normal
                ${mainText}
              `}
            >
              {menu.heading}
            </h3>

            <p
              className={`
                mt-3
                text-xs
                leading-6
                max-w-[230px]
                ${secondaryText}
              `}
            >
              {menu.description}
            </p>
          </div>

          <div
            className={`
              flex items-center gap-2
              text-[9px]
              uppercase
              tracking-[1.5px]
              ${secondaryText}
            `}
          >
            DISCOVER MORE
            <FiArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* CATEGORY LINKS */}

        <div>
          <div
            className={`
              flex items-center justify-between
              pb-4 mb-2 border-b
              ${
                isDark
                  ? "border-white/10"
                  : "border-gray-200"
              }
            `}
          >
            <span
              className={`
                text-[9px]
                uppercase
                tracking-[2px]
                ${secondaryText}
              `}
            >
              Browse Categories
            </span>

            <span className={secondaryText}>
              <FiArrowUpRight size={14} />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-5">
            {menu.items.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => {
                  setActiveMegaMenu(null);
                }}
                className={({ isActive }) => `
                  group
                  flex items-center justify-between
                  py-3
                  border-b
                  text-[11px]
                  transition-all duration-200
                  ${
                    isDark
                      ? "border-white/[0.06]"
                      : "border-gray-100"
                  }
                  ${
                    isActive
                      ? isDark
                        ? "text-white"
                        : "text-black"
                      : secondaryText
                  }
                  ${
                    isDark
                      ? "hover:text-white"
                      : "hover:text-black"
                  }
                `}
              >
                <span>{item.name}</span>

                <FiArrowUpRight
                  className="
                    opacity-0
                    -translate-x-1
                    group-hover:opacity-100
                    group-hover:translate-x-0
                    transition-all duration-200
                    text-xs
                  "
                />
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      {/* =====================================================
          ANNOUNCEMENT BAR
      ===================================================== */}

      <div
        className={`
          relative
          flex items-center justify-center
          min-h-[29px]
          px-3
          text-center
          transition-colors duration-300
          ${
            isDark
              ? "bg-[#D7C5AA] text-[#29251F]"
              : "bg-[#292722] text-[#F7F3EB]"
          }
        `}
      >
        <p
          className="
            text-[8px]
            sm:text-[9px]
            uppercase
            tracking-[1.5px]
            font-medium
            leading-4
          "
        >
          A little something for your everyday
          <span className="mx-2 opacity-50">|</span>
          Discover the collection
        </p>
      </div>

      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <header
        className={`
          sticky top-0 z-50
          border-b
          backdrop-blur-xl
          transition-colors duration-300
          ${headerBg}
        `}
      >
        <div className="max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12">

          <div
            className="
              relative
              flex items-center justify-between
              h-[66px]
              sm:h-[72px]
              lg:h-[82px]
            "
          >

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              className={`
                lg:hidden
                flex items-center justify-center
                w-9 h-9
                rounded-full
                transition-all duration-300
                ${subtleHover}
                ${mainText}
              `}
            >
              <FiMenu size={21} strokeWidth={1.5} />
            </button>

            {/* =================================================
                BRAND WORDMARK
            ================================================= */}

            <div
              className="
                absolute
                left-1/2
                -translate-x-1/2
                lg:static
                lg:translate-x-0
                shrink-0
              "
            >
              <button
                type="button"
                onClick={handleLogoClick}
                aria-label="Cartify home"
                className={`
                  group
                  flex flex-col items-center
                  lg:items-start
                  transition-colors duration-300
                  ${mainText}
                `}
              >
                <span
                  className="
                    
                    text-[21px]
                    sm:text-[24px]
                    lg:text-[25px]
                    font-semibold
                    tracking-[3px]
                    leading-none
                    transition-all duration-300
                    group-hover:tracking-[3.8px]
                  "
                >
                  CARTIFY
                </span>

                <span
                  className={`
                    hidden lg:block
                    mt-1
                    text-[7px]
                    uppercase
                    tracking-[3.1px]
                    ${secondaryText}
                  `}
                >
                  Style in every detail
                </span>
              </button>
            </div>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <nav
              className="
                hidden lg:flex
                items-center justify-center
                flex-1
                gap-5 xl:gap-8
                h-full
                px-5 xl:px-8
              "
              onMouseLeave={handleDesktopMenuLeave}
            >
              {menus.map((menu) => (
                <div
                  key={menu.title}
                  className="relative flex items-center h-full"
                  onMouseEnter={() =>
                    handleDesktopMenuEnter(menu.title)
                  }
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMegaMenu(
                        activeMegaMenu === menu.title
                          ? null
                          : menu.title
                      )
                    }
                    aria-expanded={activeMegaMenu === menu.title}
                    className={`
                      relative
                      flex items-center gap-2
                      py-5
                      text-[10px]
                      xl:text-[11px]
                      font-medium
                      uppercase
                      tracking-[1.5px]
                      whitespace-nowrap
                      transition-colors duration-300
                      ${
                        activeMegaMenu === menu.title
                          ? mainText
                          : secondaryText
                      }
                      ${isDark ? "hover:text-white" : "hover:text-black"}
                    `}
                  >
                    {menu.title}

                    <FaChevronDown
                      className={`
                        text-[7px]
                        transition-transform duration-300
                        ${
                          activeMegaMenu === menu.title
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />

                    {/* ACTIVE UNDERLINE */}

                    <span
                      className={`
                        absolute bottom-[14px] left-0
                        h-[1px]
                        transition-all duration-300
                        ${
                          activeMegaMenu === menu.title
                            ? "w-full"
                            : "w-0"
                        }
                        ${isDark ? "bg-white" : "bg-[#292722]"}
                      `}
                    />
                  </button>

                  {renderMegaMenu(menu)}
                </div>
              ))}
            </nav>

            {/* =================================================
                RIGHT ACTIONS
            ================================================= */}

            <div
              className="
                flex items-center justify-end
                gap-0.5 sm:gap-1
                shrink-0
                lg:min-w-[150px]
                xl:min-w-[190px]
              "
            >

              {/* SEARCH */}

              <button
                type="button"
                onClick={() => {
                  setActiveMegaMenu(null);
                  setIsSearchModalOpen(true);
                }}
                aria-label="Search products"
                className={iconButtonClass}
              >
                <FiSearch
                  size={17}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </button>

              {/* DESKTOP ACTIONS */}

              <div className="hidden lg:flex items-center gap-0.5">

                {/* ORDERS */}

                <button
                  type="button"
                  onClick={() => navigate("/orders")}
                  aria-label="Orders"
                  className={iconButtonClass}
                >
                  <FiPackage size={17} strokeWidth={1.5} />
                </button>

                {/* NOTIFICATIONS */}

                {allowNotification && (
                  <button
                    type="button"
                    onClick={() => navigate("/notifications")}
                    aria-label="Notifications"
                    className={iconButtonClass}
                  >
                    <FiBell size={17} strokeWidth={1.5} />

                    {unreadCount > 0 && (
                      <span
                        className="
                          absolute top-[5px] right-[4px]
                          w-[7px] h-[7px]
                          rounded-full
                          bg-[#B85C50]
                          ring-2 ring-inherit
                        "
                      />
                    )}
                  </button>
                )}
              </div>

              {/* CART */}

              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                aria-label="Shopping bag"
                className={`
                  ${iconButtonClass}
                  ${!isDark ? "hover:bg-[#EEEAE3]" : ""}
                `}
              >
                <HiOutlineShoppingBag
                  size={19}
                  strokeWidth={1.5}
                />
              </button>

              {/* ACCOUNT */}

              {user ? (
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  aria-label="My profile"
                  className={`
                    ml-1
                    flex items-center justify-center
                    w-8 h-8
                    rounded-full
                    border
                    text-[10px]
                    font-semibold
                    uppercase
                    transition-all duration-300
                    ${
                      isDark
                        ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
                        : "border-[#DDD8CF] bg-[#F0EDE7] text-[#393630] hover:bg-[#E7E2D9]"
                    }
                  `}
                >
                  {profileData?.name?.charAt(0)?.toUpperCase() || "U"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLogin}
                  aria-label="Sign in"
                  className={`
                    ${iconButtonClass}
                    hidden sm:flex
                  `}
                >
                  <FiUser size={17} strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE NAVIGATION DRAWER
      ===================================================== */}

      {isMobileMenuOpen && (
        <div
          className="
            fixed inset-0 z-[100]
            lg:hidden
            bg-black/50
            backdrop-blur-[3px]
          "
          onClick={closeMobileMenu}
        >
          <div
            className={`
              absolute top-0 left-0
              h-full
              w-[86%] sm:w-[390px]
              max-w-[390px]
              overflow-y-auto
              shadow-2xl
              animate-[slideIn_.3s_ease-out]
              ${mobileBg}
            `}
            onClick={(e) => e.stopPropagation()}
          >

            {/* MOBILE DRAWER HEADER */}

            <div
              className={`
                sticky top-0 z-10
                flex items-center justify-between
                px-5 sm:px-6
                py-5
                border-b
                ${
                  isDark
                    ? "bg-[#111111] border-white/10"
                    : "bg-[#FAF9F6] border-[#EAE6DF]"
                }
              `}
            >
              <div>
                <button
                  type="button"
                  onClick={handleLogoClick}
                  className="
              
                    text-[23px]
                    tracking-[3px]
                    font-semibold
                  "
                >
                  CARTIFY
                </button>

                <p
                  className={`
                    mt-1
                    text-[8px]
                    uppercase
                    tracking-[2.5px]
                    ${secondaryText}
                  `}
                >
                  Style in every detail
                </p>
              </div>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className={`
                  flex items-center justify-center
                  w-9 h-9
                  rounded-full
                  transition-all duration-300
                  hover:rotate-90
                  ${subtleHover}
                `}
              >
                <FiX size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* MOBILE NAVIGATION */}

            <div className="px-5 sm:px-6 pt-7">

              <p
                className={`
                  mb-3
                  text-[9px]
                  uppercase
                  tracking-[2.5px]
                  ${secondaryText}
                `}
              >
                Explore Cartify
              </p>

              <nav>
                {menus.map((menu, index) => {
                  const isExpanded =
                    openMobileMenu === menu.title;

                  return (
                    <div
                      key={menu.title}
                      className={`
                        border-b
                        ${
                          isDark
                            ? "border-white/[0.08]"
                            : "border-[#EAE6DF]"
                        }
                      `}
                    >
                      {/* CATEGORY */}

                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          handleMobileCategory(menu.title)
                        }
                        className="
                          w-full
                          flex items-center justify-between
                          py-[19px]
                          text-left
                          group
                        "
                      >
                        <div className="flex items-center gap-3">

                          <span
                            className={`
                              text-[9px]
                              tracking-wider
                              ${secondaryText}
                            `}
                          >
                            0{index + 1}
                          </span>

                          <span
                            className={`
                          
                              text-[20px]
                              sm:text-[22px]
                              font-normal
                              transition-colors duration-300
                              ${
                                isExpanded
                                  ? isDark
                                    ? "text-white"
                                    : "text-black"
                                  : isDark
                                    ? "text-gray-200"
                                    : "text-[#38352F]"
                              }
                            `}
                          >
                            {menu.title}
                          </span>
                        </div>

                        <FaChevronDown
                          className={`
                            text-[9px]
                            transition-transform duration-300
                            ${isExpanded ? "rotate-180" : ""}
                            ${secondaryText}
                          `}
                        />
                      </button>

                      {/* EXPANDABLE LINKS */}

                      <div
                        className={`
                          grid
                          transition-all duration-300 ease-in-out
                          ${
                            isExpanded
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }
                        `}
                      >
                        <div className="overflow-hidden">

                          <div
                            className={`
                              pb-5
                              pl-7
                              ${
                                isDark
                                  ? "border-white/10"
                                  : "border-[#EAE6DF]"
                              }
                            `}
                          >
                            <p
                              className={`
                                text-[10px]
                                leading-5
                                mb-3
                                ${secondaryText}
                              `}
                            >
                              {menu.subtitle}
                            </p>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-3">

                              {menu.items.map((item) => (
                                <NavLink
                                  key={item.name}
                                  to={item.path}
                                  onClick={handleMobileNavigation}
                                  className={({ isActive }) => `
                                    text-[11px]
                                    leading-5
                                    transition-colors duration-200
                                    ${
                                      isActive
                                        ? isDark
                                          ? "text-white font-semibold"
                                          : "text-black font-semibold"
                                        : secondaryText
                                    }
                                    ${
                                      isDark
                                        ? "hover:text-white"
                                        : "hover:text-black"
                                    }
                                  `}
                                >
                                  {item.name}
                                </NavLink>
                              ))}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* MOBILE ACCOUNT SECTION */}

            <div className="px-5 sm:px-6 pt-7 pb-8">

              <p
                className={`
                  mb-4
                  text-[9px]
                  uppercase
                  tracking-[2.5px]
                  ${secondaryText}
                `}
              >
                Your Account
              </p>

              <div
                className={`
                  grid gap-2
                  ${
                    allowNotification
                      ? "grid-cols-3"
                      : "grid-cols-2"
                  }
                `}
              >

                {/* ORDERS */}

                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/orders");
                  }}
                  className={`
                    flex flex-col items-center gap-2
                    py-4 rounded-xl
                    text-[10px]
                    ${subtleHover}
                    ${secondaryText}
                  `}
                >
                  <FiPackage size={19} />
                  Orders
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
                      flex flex-col items-center gap-2
                      py-4 rounded-xl
                      text-[10px]
                      ${subtleHover}
                      ${secondaryText}
                    `}
                  >
                    <span className="relative">
                      <FiBell size={19} />

                      {unreadCount > 0 && (
                        <span
                          className="
                            absolute -top-1.5 -right-2
                            min-w-[14px] h-[14px]
                            px-1 rounded-full
                            bg-[#B85C50]
                            text-white text-[8px]
                            flex items-center justify-center
                          "
                        >
                          {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                      )}
                    </span>
                    Notifications
                  </button>
                )}

                {/* PROFILE / LOGIN */}

                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      navigate("/profile");
                    }}
                    className={`
                      flex flex-col items-center gap-2
                      py-4 rounded-xl
                      text-[10px]
                      ${subtleHover}
                      ${secondaryText}
                    `}
                  >
                    <FiUser size={19} />
                    Profile
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      handleLogin();
                    }}
                    className={`
                      flex flex-col items-center gap-2
                      py-4 rounded-xl
                      text-[10px]
                      ${subtleHover}
                      ${secondaryText}
                    `}
                  >
                    <FiUser size={19} />
                    Sign In
                  </button>
                )}
              </div>
            </div>

            {/* MOBILE FOOTER */}

            <div
              className={`
                px-5 sm:px-6
                py-5
                border-t
                ${
                  isDark
                    ? "border-white/10"
                    : "border-[#EAE6DF]"
                }
              `}
            >
              <p
                className={`
                
                  text-[17px]
                  italic
                  ${secondaryText}
                `}
              >
                Style in every detail.
              </p>
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
            fixed inset-0 z-[110]
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
              relative w-full
              px-3 sm:px-5 lg:px-8
              py-5 sm:py-7
              shadow-xl
              ${isDark ? "bg-[#171717]" : "bg-[#FAF9F6]"}
            `}
          >
            <div className="max-w-4xl mx-auto">

             
              {/* SEARCH INPUT */}

              <div className="relative">

                <FiSearch
                  className={`
                    absolute left-0
                    top-1/2 -translate-y-1/2
                    text-lg
                    ${secondaryText}
                  `}
                />

                <input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="What are you looking for?"
                  aria-label="Search products"
                  className={`
                    w-full
                    pl-8 pr-3
                    py-3
                    bg-transparent
                    border-b
                    outline-none
                    text-sm
                    transition-colors
                    ${
                      isDark
                        ? "border-white/20 text-white placeholder-gray-500 focus:border-white"
                        : "border-[#D9D4CA] text-[#292722] placeholder-gray-400 focus:border-black"
                    }
                  `}
                />
              </div>

              {/* SEARCH RESULTS */}

              {(searchLoading ||
                results.length > 0 ||
                (searchTerm.trim() && !searchLoading)) && (
                <div
                  className={`
                    mt-3
                    max-h-[65vh]
                    overflow-y-auto
                    border
                    ${
                      isDark
                        ? "bg-[#1D1D1D] border-white/10"
                        : "bg-white border-[#EAE6DF]"
                    }
                  `}
                >

                  {/* LOADING */}

                  {searchLoading && (
                    <div
                      className={`
                        py-7 text-center text-xs
                        ${secondaryText}
                      `}
                    >
                      Searching products...
                    </div>
                  )}

                  {/* RESULTS */}

                  {!searchLoading &&
                    results.map((item) => (
                      <button
                        key={item._id}
                        type="button"
                        onClick={() =>
                          handleProductClick(item._id)
                        }
                        className={`
                          w-full
                          flex items-center gap-4
                          px-4 sm:px-5
                          py-3
                          text-left
                          border-b last:border-b-0
                          transition-colors duration-200
                          ${
                            isDark
                              ? "border-white/[0.06] hover:bg-white/[0.04] text-white"
                              : "border-[#F0EDE8] hover:bg-[#FAF9F6] text-gray-900"
                          }
                        `}
                      >
                        {item.images?.[0] && (
                          <img
                            src={item.images[0]}
                            alt={item.name || "Product"}
                            className="
                              w-11 h-11
                              object-cover
                              shrink-0
                            "
                          />
                        )}

                        <span className="flex-1 min-w-0">
                          <span className="block text-xs sm:text-sm font-medium truncate">
                            {item.name}
                          </span>
                        </span>

                        <FiArrowUpRight
                          className={`
                            shrink-0
                            ${secondaryText}
                          `}
                        />
                      </button>
                    ))}

                  {/* EMPTY RESULTS */}

                  {!searchLoading &&
                    searchTerm.trim() &&
                    results.length === 0 && (
                      <div className="py-8 text-center">
                        <p
                          className={`
                             text-lg
                            ${mainText}
                          `}
                        >
                          Nothing found
                        </p>

                        <p
                          className={`
                            mt-1 text-xs
                            ${secondaryText}
                          `}
                        >
                          Try another product or category.
                        </p>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          AUTHENTICATION MODAL
      ===================================================== */}

      <AuthModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
    </>
  );
};

export default Header;
