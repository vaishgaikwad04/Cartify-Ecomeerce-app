import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import {
  FiBox,
  FiShoppingCart,
  FiSettings,
  FiUsers,
  FiTag,
  FiStar,
  FiGift,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { MdDashboard } from "react-icons/md";

import { getAdminSettings } from "../../api/user/SettingsApi";
import { ThemeContext } from "../../context/ThemeContext";

const Sidebar = () => {
  const [profileData, setProfileData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // ================= FETCH ADMIN SETTINGS =================
  const fetchSettings = async () => {
    try {
      const res = await getAdminSettings();
      setProfileData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // ================= CLOSE SIDEBAR =================
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // ================= NAVIGATION STYLE =================
  const navStyle = ({ isActive }) =>
    `
      flex items-center gap-3
      px-4 py-3
      rounded-xl
      text-sm font-medium
      transition-all duration-200

      ${
        isActive
          ? "bg-black text-white shadow-md"
          : isDark
            ? "text-gray-300 hover:bg-gray-700 hover:text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-black"
      }
    `;

  return (
    <>
      {/* =====================================================
          MOBILE HAMBURGER
          Visible only below lg
      ===================================================== */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open sidebar"
        className={`
          fixed
          top-4
          left-4
          z-[100]

          lg:hidden

          p-2
          rounded-lg
          

          ${
            isDark
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }
        `}
      >
        <FiMenu size={24} />
      </button>

      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="
            fixed
            inset-0
            z-[90]

            bg-black/40

            lg:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-[95]

          w-72
          h-screen

          flex
          flex-col

          border-r

          transition-transform
          duration-300
          ease-in-out

          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:static
          lg:translate-x-0

          ${
            isDark
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }
        `}
      >
        {/* =====================================================
            MOBILE CLOSE BUTTON
        ===================================================== */}
        <div className="flex justify-end p-3 lg:hidden">
          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className={`
              p-2
              rounded-lg

              ${
                isDark
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            <FiX size={22} />
          </button>
        </div>

        {/* =====================================================
            LOGO
        ===================================================== */}
        <div
          className={`
            px-6
            py-6
            border-b

            ${
              isDark
                ? "border-gray-700"
                : "border-gray-100"
            }
          `}
        >
          <Link
            to="/"
            onClick={closeSidebar}
          >
            <h1
              className={`
                text-2xl
                font-bold
                tracking-tight

                ${
                  isDark
                    ? "text-white"
                    : "text-gray-900"
                }
              `}
            >
              Ecommerce
            </h1>

            <p
              className={`
                text-sm
                mt-1

                ${
                  isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                }
              `}
            >
              Inventory Management
            </p>
          </Link>
        </div>

        {/* =====================================================
            MENU
        ===================================================== */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">

          {/* ================= MANAGEMENT ================= */}
          <p
            className={`
              px-3
              mb-3

              text-xs
              font-semibold
              uppercase
              tracking-wider

              ${
                isDark
                  ? "text-gray-500"
                  : "text-gray-400"
              }
            `}
          >
            Management
          </p>

          <div className="space-y-2">

            {/* Dashboard */}
            <NavLink
              to="/admin"
              className={navStyle}
              onClick={closeSidebar}
            >
              <MdDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>

            {/* Products */}
            <NavLink
              to="/admin/products"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiBox size={18} />
              <span>Products</span>
            </NavLink>

            {/* Categories */}
            <NavLink
              to="/admin/categories"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiTag size={18} />
              <span>Categories</span>
            </NavLink>

            {/* Coupons */}
            <NavLink
              to="/admin/coupons"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiGift size={18} />
              <span>Coupons</span>
            </NavLink>

            {/* Customers */}
            <NavLink
              to="/admin/customers"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiUsers size={18} />
              <span>Customers</span>
            </NavLink>

            {/* Reviews */}
            <NavLink
              to="/admin/reviews"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiStar size={18} />
              <span>Reviews</span>
            </NavLink>

            {/* Orders */}
            <NavLink
              to="/admin/orders"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiShoppingCart size={18} />
              <span>Orders</span>
            </NavLink>

          </div>

          {/* ================= ACCOUNT ================= */}
          <p
            className={`
              px-3
              mt-8
              mb-3

              text-xs
              font-semibold
              uppercase
              tracking-wider

              ${
                isDark
                  ? "text-gray-500"
                  : "text-gray-400"
              }
            `}
          >
            Account
          </p>

          <div className="space-y-2">

            {/* Settings */}
            <NavLink
              to="/admin/settings"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiSettings size={18} />
              <span>Settings</span>
            </NavLink>

          </div>
        </nav>

        {/* =====================================================
            USER CARD
        ===================================================== */}
        <div
          className={`
            p-4
            border-t

            ${
              isDark
                ? "border-gray-700"
                : "border-gray-100"
            }
          `}
        >
          <div
            className={`
              flex
              items-center
              gap-3

              p-3
              rounded-xl

              ${
                isDark
                  ? "bg-gray-800"
                  : "bg-gray-50"
              }
            `}
          >
            {/* Avatar */}
            <div
              className="
                w-10
                h-10

                rounded-full

                bg-black
                text-white

                flex
                items-center
                justify-center

                font-semibold

                flex-shrink-0
              "
            >
              {profileData?.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            {/* User Information */}
            <div className="min-w-0">
              <h4
                className={`
                  text-sm
                  font-semibold
                  truncate

                  ${
                    isDark
                      ? "text-white"
                      : "text-gray-800"
                  }
                `}
              >
                {profileData?.name}
              </h4>

              <p
                className={`
                  text-xs

                  ${
                    isDark
                      ? "text-gray-400"
                      : "text-gray-500"
                  }
                `}
              >
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;