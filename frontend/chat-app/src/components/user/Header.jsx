
import { useContext } from "react";
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
  FiUser,
} from "react-icons/fi";

// Hooks
import { useHeader } from "../../hooks/user/useHeader";
import { AuthContext } from "../../context/AuthContext";

// Components
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
  // NAVIGATION MENU
  // ============================================================

  const menus = [
    {
      title: "Home",
      subtitle: "Interior Collection",
      heading: "Living",
      items: [
        { name: "Decor", path: "/decor" },
        { name: "Kitchen & Dining", path: "/kitchen-dining" },
        { name: "Pillows", path: "/pillows-cushions" },
        { name: "Books", path: "/books" },
      ],
    },
    {
      title: "Clothing",
      subtitle: "Everyday Essentials",
      heading: "Clothing",
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
      subtitle: "Beauty Essentials",
      heading: "Body",
      items: [
        { name: "Body Care", path: "/body-care" },
        { name: "Beauty", path: "/beauty" },
        { name: "Accessories", path: "/accessories" },
        { name: "Trending", path: "/trending-now" },
      ],
    },
    {
      title: "New In",
      subtitle: "Latest Arrivals",
      heading: "Latest",
      items: [
        { name: "New In Body", path: "/new-in-body" },
        { name: "New In Home", path: "/new-in-home" },
      ],
    },
  ];

  const visibleMenus = menus.slice(0, 5);
  const moreMenus = menus.slice(5);

  // ============================================================
  // THEME STYLES
  // ============================================================

  const headerTheme = isDark
    ? "bg-gray-950/95 border-gray-800"
    : "bg-[#FAF9F7]/95 border-gray-200";

  const textTheme = isDark
    ? "text-gray-300"
    : "text-neutral-700";

  const hoverTheme = isDark
    ? "hover:text-white"
    : "hover:text-black";

  const menuTheme = isDark
    ? "bg-gray-950 border-gray-800"
    : "bg-white border-gray-100";

  const mobileTheme = isDark
    ? "bg-gray-950 text-white"
    : "bg-white text-gray-900";

  // ============================================================
  // NAVIGATION LINK STYLE
  // ============================================================

  const navClass = ({ isActive }) => `
    relative
    flex items-center gap-1
    py-5 whitespace-nowrap
    transition-colors duration-300
    ${
      isActive
        ? isDark
          ? "text-white"
          : "text-gray-950"
        : isDark
          ? "text-gray-300 hover:text-white"
          : "text-neutral-700 hover:text-black"
    }
  `;

  // ============================================================
  // SHARED NAVIGATION LINKS
  // ============================================================

  const renderMenuItems = (items) =>
    items.map((item) => (
      <NavLink
        key={item.name}
        to={item.path}
        onClick={closeMobileMenu}
        className={({ isActive }) => `
          block
          text-[11px]
          normal-case
          tracking-normal
          transition-all duration-200
          hover:translate-x-1
          ${
            isActive
              ? isDark
                ? "text-white font-medium"
                : "text-gray-950 font-medium"
              : isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-black"
          }
        `}
      >
        {item.name}
      </NavLink>
    ));

  return (
    <>
      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <header
        className={`
          sticky top-0 z-50
          backdrop-blur-md
          border-b
          transition-colors duration-300
          ${headerTheme}
        `}
      >
        <div className="max-w-[1700px] mx-auto px-3 sm:px-5 lg:px-6">

          <div className="flex items-center justify-between h-16 sm:h-[66px] lg:h-[64px]">

            {/* =================================================
                DESKTOP LOGO
            ================================================= */}

            <div className="hidden lg:block lg:w-[180px] xl:w-[190px] shrink-0">

              <button
                type="button"
                onClick={() => navigate("/")}
                aria-label="Cartify home"
                className={`
                  group flex items-center gap-2.5
                  whitespace-nowrap
                  transition-colors duration-300
                  ${
                    isDark
                      ? "text-gray-100 hover:text-white"
                      : "text-gray-900 hover:text-black"
                  }
                `}
              >
                {/* MONOGRAM */}

                <span
                  className={`
                    flex items-center justify-center
                    w-8 h-8
                    border rounded-sm
                    text-xl font-medium
                    transition-all duration-300
                    group-hover:rotate-[-6deg]
                    ${
                      isDark
                        ? "border-gray-500 text-white"
                        : "border-gray-800 text-gray-900"
                    }
                  `}
                >
                  C
                </span>

                {/* BRAND NAME */}

                <span
                  className="
                    text-[18px]
                    tracking-[2.5px]
                    uppercase
                    font-bold
                    leading-none
                  "
                >
                  CARTIFY
                </span>
              </button>
            </div>

            {/* =================================================
                MOBILE HAMBURGER
            ================================================= */}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              className={`
                lg:hidden shrink-0 group
                flex h-10 w-10
                items-center justify-center
                rounded-xl border
                transition-all duration-200
                active:scale-95
                ${
                  isDark
                    ? "border-gray-800 bg-gray-900 text-gray-200 hover:bg-gray-800"
                    : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                }
              `}
            >
              <FiMenu
                className="text-[21px] transition-transform duration-200 group-hover:scale-110"
                strokeWidth={1.8}
              />
            </button>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <nav
              className={`
                hidden lg:flex flex-1
                justify-center items-center
                gap-5 xl:gap-7
                text-[11px]
                font-medium
                tracking-[1.5px]
                uppercase
                ${textTheme}
              `}
            >
              {visibleMenus.map((menu) => (
                <div
                  key={menu.title}
                  className="group relative flex items-center h-full"
                >

                  {/* CATEGORY LINK */}

                  <NavLink
                    to={menu.items[0]?.path || "/"}
                    className={navClass}
                  >
                    {menu.title}

                    <FaChevronDown
                      className="
                        text-[8px]
                        opacity-60
                        transition-transform duration-300
                        group-hover:rotate-180
                      "
                    />

                    {/* HOVER UNDERLINE */}

                    <span
                      className={`
                        absolute bottom-2 left-0
                        h-[1px] w-0
                        group-hover:w-full
                        transition-all duration-300
                        ${isDark ? "bg-white" : "bg-black"}
                      `}
                    />
                  </NavLink>

                  {/* MEGA MENU */}

                  <div
                    className="
                      absolute top-full left-1/2
                      -translate-x-1/2 pt-2
                      invisible opacity-0 translate-y-3
                      group-hover:visible group-hover:opacity-100
                      group-hover:translate-y-0
                      transition-all duration-300
                      z-50
                      w-[650px] xl:w-[800px]
                    "
                  >
                    <div
                      className={`
                        grid
                        ${
                          menu.items.length > 10
                            ? "grid-cols-3"
                            : menu.items.length > 5
                              ? "grid-cols-2"
                              : "grid-cols-1"
                        }
                        gap-x-10 gap-y-7
                        p-8
                        shadow-2xl border
                        ${menuTheme}
                      `}
                    >
                      {Array.from({
                        length: Math.ceil(menu.items.length / 5),
                      }).map((_, columnIndex) => {
                        const columnItems = menu.items.slice(
                          columnIndex * 5,
                          columnIndex * 5 + 5
                        );

                        return (
                          <div key={columnIndex}>
                            <h3
                              className={`
                                text-[12px]
                                font-semibold
                                mb-5
                                ${isDark ? "text-white" : "text-gray-900"}
                              `}
                            >
                              {columnIndex === 0
                                ? menu.heading
                                : columnIndex === 1
                                  ? `Explore ${menu.title}`
                                  : `Discover ${menu.title}`}
                            </h3>

                            <div className="space-y-4">
                              {renderMenuItems(columnItems)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* MORE MENU */}

              {moreMenus.length > 0 && (
                <div className="group relative flex items-center h-full">

                  <button
                    type="button"
                    className="flex items-center gap-1 py-5 whitespace-nowrap"
                  >
                    More

                    <FaChevronDown
                      className="
                        text-[8px] opacity-60
                        transition-transform duration-300
                        group-hover:rotate-180
                      "
                    />
                  </button>

                  <div
                    className="
                      absolute top-full right-0 pt-2
                      w-64
                      invisible opacity-0 translate-y-2
                      group-hover:visible group-hover:opacity-100
                      group-hover:translate-y-0
                      transition-all duration-300
                      z-50
                    "
                  >
                    <div
                      className={`
                        p-5 border shadow-2xl
                        ${menuTheme}
                      `}
                    >
                      {moreMenus.map((menu) => (
                        <div
                          key={menu.title}
                          className="mb-5 last:mb-0"
                        >
                          <p className="text-[11px] font-semibold mb-3">
                            {menu.title}
                          </p>

                          <div className="space-y-3">
                            {renderMenuItems(menu.items)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </nav>

            {/* =================================================
                RIGHT ACTIONS
            ================================================= */}

            <div
              className={`
                flex justify-end items-center
                gap-1 sm:gap-1.5
                shrink-0
                ${isDark ? "text-white" : "text-gray-900"}
              `}
            >

              {/* SEARCH */}

              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                aria-label="Search"
                className={`
                  group
                  w-8 h-8 sm:w-9 sm:h-9
                  rounded-full
                  flex items-center justify-center
                  transition-all duration-200
                  ${
                    isDark
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }
                `}
              >
                <FiSearch
                  className="
                    text-[15px] sm:text-[16px]
                    transition-transform duration-200
                    group-hover:scale-105
                  "
                />
              </button>

              {/* DESKTOP ACTION GROUP */}

              <div
                className={`
                  hidden lg:flex
                  items-center gap-0.5
                  rounded-full p-0.5 border
                  ${
                    isDark
                      ? "bg-gray-900/80 border-gray-800"
                      : "bg-gray-50 border-gray-200"
                  }
                `}
              >

                {/* CART */}

                <button
                  type="button"
                  onClick={() => setIsCartDrawerOpen(true)}
                  aria-label="Cart"
                  className={`
                    w-8 h-8 rounded-full
                    flex items-center justify-center
                    transition-all duration-200
                    ${
                      isDark
                        ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                        : "text-gray-600 hover:bg-white hover:text-black hover:shadow-sm"
                    }
                  `}
                >
                  <HiOutlineShoppingBag className="text-[15px]" />
                </button>

                {/* ORDERS */}

                <button
                  type="button"
                  onClick={() => navigate("/orders")}
                  aria-label="Orders"
                  className={`
                    w-8 h-8 rounded-full
                    flex items-center justify-center
                    transition-all duration-200
                    ${
                      isDark
                        ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                        : "text-gray-600 hover:bg-white hover:text-black hover:shadow-sm"
                    }
                  `}
                >
                  <FiPackage className="text-[14px]" />
                </button>

                {/* NOTIFICATIONS */}

                {allowNotification && (
                  <button
                    type="button"
                    onClick={() => navigate("/notifications")}
                    aria-label="Notifications"
                    className={`
                      relative
                      w-8 h-8 rounded-full
                      flex items-center justify-center
                      transition-all duration-200
                      ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                          : "text-gray-600 hover:bg-white hover:text-black hover:shadow-sm"
                      }
                    `}
                  >
                    <FiBell className="text-[14px]" />

                    {unreadCount > 0 && (
                      <span
                        className="
                          absolute top-0 right-0
                          min-w-[14px] h-[14px] px-1
                          rounded-full
                          bg-red-500 text-white
                          text-[7px] font-bold
                          flex items-center justify-center
                          border-2 border-white
                          leading-none
                        "
                      >
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </button>
                )}
              </div>

              {/* MOBILE CART */}

              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                aria-label="Open cart"
                className={`
                  lg:hidden
                  w-9 h-9 sm:w-10 sm:h-10
                  rounded-full
                  flex items-center justify-center
                  transition-all duration-200
                  ${
                    isDark
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }
                `}
              >
                <HiOutlineShoppingBag className="text-[17px]" />
              </button>

              {/* =================================================
                  PROFILE / SIGN IN
              ================================================= */}

              {user ? (

                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  aria-label="Open profile"
                  className={`
                    group
                    flex items-center gap-1.5
                    rounded-full border
                    px-1 py-1
                    transition-all duration-200
                    ${
                      isDark
                        ? "bg-gray-900/80 border-gray-800 hover:border-gray-700 hover:bg-gray-800"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }
                  `}
                >
                  {/* AVATAR */}

                  <div className="relative shrink-0">
                    <div
                      className="
                        w-7 h-7
                        rounded-full
                        flex items-center justify-center
                        text-[10px] font-semibold uppercase
                        text-white
                        transition-transform duration-200
                        group-hover:scale-105
                        bg-gradient-to-br from-gray-600 to-black
                      "
                    >
                      {profileData?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <span
                      className={`
                        absolute right-0 bottom-0
                        w-2 h-2 rounded-full
                        border-2 bg-green-500
                        ${isDark ? "border-gray-900" : "border-white"}
                      `}
                    />
                  </div>

                  {/* USER INFO */}

                  <div className="hidden xl:flex flex-col min-w-0 pr-1">
                    <span
                      className={`
                        max-w-[90px] truncate
                        text-[10px] font-semibold leading-none
                        ${isDark ? "text-gray-100" : "text-gray-900"}
                      `}
                    >
                      {profileData?.name || "User"}
                    </span>

                    <span
                      className={`
                        mt-1 text-[7px]
                        uppercase tracking-[0.12em]
                        ${isDark ? "text-gray-500" : "text-gray-400"}
                      `}
                    >
                      Profile
                    </span>
                  </div>

                  <span
                    className={`
                      hidden xl:block mr-1
                      text-[10px]
                      transition-transform duration-200
                      group-hover:translate-x-0.5
                      ${isDark ? "text-gray-500" : "text-gray-400"}
                    `}
                  >
                    ›
                  </span>
                </button>

              ) : (

                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setIsOpen(true);
                  }}
                  className={`
                    flex items-center gap-1.5
                    rounded-full border
                    px-2.5 py-1.5
                    transition-all duration-200
                    ${
                      isDark
                        ? "bg-gray-900/80 border-gray-800 text-gray-200 hover:bg-gray-800"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  <FiUser className="text-[14px]" />

                  <span className="hidden xl:block text-[10px] font-semibold">
                    Sign In
                  </span>
                </button>
              )}
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
            fixed inset-0 z-[100]
            lg:hidden
            bg-black/50
            backdrop-blur-[2px]
          "
          onClick={closeMobileMenu}
        >
          <div
            className={`
              absolute top-0 left-0
              h-full
              w-[85%] sm:w-[380px]
              max-w-[380px]
              overflow-y-auto
              shadow-2xl
              ${mobileTheme}
            `}
            onClick={(e) => e.stopPropagation()}
          >

            {/* MOBILE HEADER */}

            <div
              className={`
                sticky top-0 z-10
                flex items-center justify-between
                px-5 py-4 border-b
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
                    text-[9px] tracking-[2px]
                    uppercase mb-2
                    ${isDark ? "text-gray-500" : "text-gray-400"}
                  `}
                >
                  Navigation
                </p>

                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    navigate("/");
                  }}
                  className={`
                    text-lg tracking-[3px]
                    font-semibold uppercase
                    whitespace-nowrap
                    transition-colors
                    ${
                      isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-900 hover:text-black"
                    }
                  `}
                >
                  CARTIFY
                </button>
              </div>

              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className={`
                  group
                  w-9 h-9
                  rounded-full
                  flex items-center justify-center
                  transition-all duration-200
                  ${
                    isDark
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }
                `}
              >
                <FiX className="text-lg transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* SHOP NAVIGATION */}

            <div className="px-5 pt-6">

              <p
                className={`
                  text-[9px] tracking-[2.5px]
                  uppercase mb-3
                  ${isDark ? "text-gray-500" : "text-gray-400"}
                `}
              >
                Shop
              </p>

              <nav className="flex flex-col">

                {menus.map((menu) => {
                  const isExpanded = openMobileMenu === menu.title;

                  return (
                    <div key={menu.title}>

                      {/* CATEGORY BUTTON */}

                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setOpenMobileMenu(
                            isExpanded ? null : menu.title
                          )
                        }
                        className={`
                          w-full
                          flex items-center justify-between
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
                        <span className="text-sm sm:text-base font-medium tracking-wide">
                          {menu.title}
                        </span>

                        <FaChevronDown
                          className={`
                            text-[10px]
                            transition-transform duration-300
                            ${isExpanded ? "rotate-180" : ""}
                          `}
                        />
                      </button>

                      {/* SUB NAVIGATION */}

                      <div
                        className={`
                          grid transition-all duration-300 ease-in-out
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
                              ml-1 pl-4
                              border-l
                              pb-3
                              ${
                                isDark
                                  ? "border-gray-800"
                                  : "border-gray-200"
                              }
                            `}
                          >
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">

                              {menu.items.map((item) => (
                                <NavLink
                                  key={item.name}
                                  to={item.path}
                                  onClick={closeMobileMenu}
                                  className={({ isActive }) => `
                                    flex min-w-0 min-h-10
                                    items-center py-2
                                    text-[11px] sm:text-xs
                                    leading-5
                                    transition-colors duration-200
                                    ${
                                      isActive
                                        ? isDark
                                          ? "text-white font-medium"
                                          : "text-gray-950 font-medium"
                                        : isDark
                                          ? "text-gray-400 hover:text-white"
                                          : "text-gray-500 hover:text-gray-900"
                                    }
                                  `}
                                >
                                  <span className="break-words">
                                    {item.name}
                                  </span>
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

            {/* ACCOUNT ACTIONS */}

            <div className="px-5">

              <div
                className={`
                  mt-4 pt-5 border-t
                  ${isDark ? "border-gray-800" : "border-gray-200"}
                `}
              >
                <p
                  className={`
                    text-[9px] tracking-[2.5px]
                    uppercase mb-3
                    ${isDark ? "text-gray-500" : "text-gray-400"}
                  `}
                >
                  Account
                </p>

                <div
                  className={`
                    grid gap-1.5
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
                      flex flex-col items-center justify-center
                      gap-1.5 py-3 rounded-xl
                      transition-all
                      ${
                        isDark
                          ? "text-gray-400 hover:bg-gray-900 hover:text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }
                    `}
                  >
                    <FiPackage className="text-xl" />

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
                        flex flex-col items-center justify-center
                        gap-1.5 py-3 rounded-xl
                        transition-all
                        ${
                          isDark
                            ? "text-gray-400 hover:bg-gray-900 hover:text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                        }
                      `}
                    >
                      <div className="relative">
                        <FiBell className="text-xl" />

                        {unreadCount > 0 && (
                          <span
                            className="
                              absolute -top-2 -right-2
                              min-w-[16px] h-4 px-1
                              rounded-full
                              bg-red-500 text-white
                              text-[8px] font-bold
                              flex items-center justify-center
                            "
                          >
                            {unreadCount > 99 ? "99+" : unreadCount}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] sm:text-[11px]">
                        Notifications
                      </span>
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
                        flex flex-col items-center justify-center
                        gap-1.5 py-3 rounded-xl
                        transition-all
                        ${
                          isDark
                            ? "text-gray-400 hover:bg-gray-900 hover:text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                        }
                      `}
                    >
                      <div
                        className="
                          w-7 h-7 rounded-full
                          flex items-center justify-center
                          text-white text-[10px] font-semibold
                          bg-gradient-to-br from-gray-600 to-black
                        "
                      >
                        {profileData?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <span className="text-[10px] sm:text-[11px]">
                        Profile
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        closeMobileMenu();
                        setIsLogin(true);
                        setIsOpen(true);
                      }}
                      className={`
                        flex flex-col items-center justify-center
                        gap-1.5 py-3 rounded-xl
                        transition-all
                        ${
                          isDark
                            ? "text-gray-400 hover:bg-gray-900 hover:text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-black"
                        }
                      `}
                    >
                      <FiUser className="text-xl" />

                      <span className="text-[10px] sm:text-[11px]">
                        Login
                      </span>
                    </button>
                  )}

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
            fixed inset-0 z-[100]
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
              px-3 sm:px-5 lg:px-6
              py-4 sm:py-5
              shadow-xl
              ${isDark ? "bg-gray-900" : "bg-white"}
            `}
          >
            <div className="max-w-5xl mx-auto relative">

              {/* SEARCH INPUT */}

              <div className="relative">

                <FiSearch
                  className={`
                    absolute left-3 sm:left-4
                    top-1/2 -translate-y-1/2
                    text-base sm:text-lg
                    ${isDark ? "text-gray-400" : "text-gray-500"}
                  `}
                />

                <input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search products, brands, categories..."
                  aria-label="Search products"
                  className={`
                    w-full
                    pl-10 sm:pl-12 pr-12
                    py-3 sm:py-4
                    bg-transparent
                    border-b outline-none
                    text-xs sm:text-sm
                    font-medium
                    ${
                      isDark
                        ? "text-white border-gray-700 placeholder-gray-500 focus:border-white"
                        : "text-black border-gray-300 placeholder-gray-400 focus:border-black"
                    }
                  `}
                />

                {/* CLOSE SEARCH */}

                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Close search"
                  className={`
                    absolute right-2 top-1/2
                    -translate-y-1/2
                    w-8 h-8 rounded-full
                    flex items-center justify-center
                    transition-colors
                    ${
                      isDark
                        ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                        : "text-gray-500 hover:bg-gray-100 hover:text-black"
                    }
                  `}
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              {/* SEARCH RESULTS */}

              {(searchLoading ||
                results.length > 0 ||
                (searchTerm.trim() && !searchLoading)) && (
                <div
                  className={`
                    absolute top-full left-0 right-0
                    mt-2 rounded-xl
                    shadow-2xl border
                    overflow-hidden z-50
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
                        px-4 py-5 text-center text-xs sm:text-sm
                        ${isDark ? "text-gray-400" : "text-gray-500"}
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
                        onClick={() => handleProductClick(item._id)}
                        className={`
                          w-full
                          px-4 sm:px-5
                          py-3 sm:py-4
                          flex items-center gap-3 sm:gap-4
                          text-left
                          border-b last:border-b-0
                          transition-colors
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
                              w-9 h-9
                              rounded object-cover shrink-0
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
                            text-lg
                            ${isDark ? "text-gray-500" : "text-gray-400"}
                          `}
                        >
                          →
                        </span>
                      </button>
                    ))}

                  {/* EMPTY RESULTS */}

                  {!searchLoading &&
                    searchTerm.trim() &&
                    results.length === 0 && (
                      <div
                        className={`
                          px-4 py-6 text-center
                          text-xs sm:text-sm
                          ${
                            isDark
                              ? "text-gray-400"
                              : "text-gray-500"
                          }
                        `}
                      >
                        No products found. Try another search.
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          AUTH MODAL
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
