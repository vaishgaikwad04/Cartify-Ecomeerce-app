import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FiBox,
  FiShoppingCart,
  FiUser,
  FiSettings,
  FiUsers,
  FiTag,
  FiStar,
  FiGift,
  FiBarChart2,
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { getAdminSettings } from "../../api/user/SettingsApi";
import { ThemeContext } from "../../context/ThemeContext";

const Sidebar = () => {
  const [profileData, setProfileData] = useState(null);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

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

  const navStyle = ({ isActive }) =>
    `
    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
    ${
      isActive
        ? "bg-black text-white shadow-md"
        : isDark
          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-black"
    }
    `;

  return (
    <aside
      className={`
        w-72 h-full flex flex-col border-r
        ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
      `}
    >
      {/* Logo */}
      <div
        className={`
          px-6 py-6 border-b
          ${isDark ? "border-gray-700" : "border-gray-100"}
        `}
      >
        <Link to="/">
          <h1
            className={`
              text-2xl font-bold tracking-tight
              ${isDark ? "text-white" : "text-gray-900"}
            `}
          >
            Ecommerce
          </h1>

          <p
            className={`
              text-sm mt-1
              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
          >
            Inventory Management
          </p>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <p
          className={`
            px-3 mb-3 text-xs font-semibold uppercase tracking-wider
            ${isDark ? "text-gray-500" : "text-gray-400"}
          `}
        >
          Management
        </p>

        <div className="space-y-2">
          <NavLink to="/admin" className={navStyle}>
            <MdDashboard  size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/products" className={navStyle}>
            <FiBox size={18} />
            Products
          </NavLink>
          <NavLink to="/admin/categories" className={navStyle}>
            <FiTag size={18} />
            Categories
          </NavLink>

          <NavLink to="/admin/coupons" className={navStyle}>
            <FiGift size={18} />
            Coupons
          </NavLink>
        </div>

      

        <NavLink to="/admin/customers" className={navStyle}>
          <FiUsers size={18} />
        Customers
        </NavLink>

        <NavLink to="/admin/reviews" className={navStyle}>
          <FiStar size={18} />
          Reviews
        </NavLink>
          <NavLink to="/admin/orders" className={navStyle}>
          <FiShoppingCart size={18} />
          Orders
        </NavLink>

        <p
          className={`
          px-3 mt-8 mb-3 text-xs font-semibold uppercase tracking-wider
          ${isDark ? "text-gray-500" : "text-gray-400"}
          `}
        >
          Account
        </p>

        <div className="space-y-2">
          <NavLink to="/admin/settings" className={navStyle}>
            <FiSettings size={18} />
            Settings
          </NavLink>
        </div>
      </nav>

      {/* User Card */}
      <div
        className={`
          p-4 border-t
          ${isDark ? "border-gray-700" : "border-gray-100"}
        `}
      >
        <div
          className={`
            flex items-center gap-3 p-3 rounded-xl
            ${isDark ? "bg-gray-800" : "bg-gray-50"}
          `}
        >
          <div
            className="
              w-10 h-10 rounded-full bg-black 
              text-white flex items-center justify-center 
              font-semibold
            "
          >
            {profileData?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h4
              className={`
                text-sm font-semibold
                ${isDark ? "text-white" : "text-gray-800"}
              `}
            >
              {profileData?.name}
            </h4>

            <p
              className={`
                text-xs
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
