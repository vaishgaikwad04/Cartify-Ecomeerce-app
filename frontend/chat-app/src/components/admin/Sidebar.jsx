// import React, { useState, useEffect, useContext } from "react";
// import { NavLink, Link } from "react-router-dom";

// import {
//   FiBox,
//   FiShoppingCart,
//   FiSettings,
//   FiUsers,
//   FiTag,
//   FiStar,
//   FiGift,
//   FiMenu,
//   FiX,
// } from "react-icons/fi";

// import { MdDashboard } from "react-icons/md";

// import { getAdminSettings } from "../../api/user/SettingsApi";
// import { ThemeContext } from "../../context/ThemeContext";

// const Sidebar = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "Dark Mode";

//   // ================= FETCH ADMIN SETTINGS =================
//   const fetchSettings = async () => {
//     try {
//       const res = await getAdminSettings();
//       setProfileData(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchSettings();
//   }, []);

//   // ================= CLOSE SIDEBAR =================
//   const closeSidebar = () => {
//     setIsSidebarOpen(false);
//   };

//   // ================= NAVIGATION STYLE =================
//   const navStyle = ({ isActive }) =>
//     `
//       flex items-center gap-3
//       px-4 py-3
//       rounded-xl
//       text-sm font-medium
//       transition-all duration-200

//       ${
//         isActive
//           ? "bg-black text-white shadow-md"
//           : isDark
//             ? "text-gray-300 hover:bg-gray-700 hover:text-white"
//             : "text-gray-600 hover:bg-gray-100 hover:text-black"
//       }
//     `;

//   return (
//     <>
//       {/* =====================================================
//           MOBILE HAMBURGER
//           Visible only below lg
//       ===================================================== */}
//       <button
//         type="button"
//         onClick={() => setIsSidebarOpen(true)}
//         aria-label="Open sidebar"
//         className={`
//           fixed
//           top-4
//           left-4
//           z-[100]

//           lg:hidden

//           p-2
//           rounded-lg
          

//           ${
//             isDark
//               ? "bg-gray-800 text-white hover:bg-gray-700"
//               : "bg-white text-gray-800 hover:bg-gray-100"
//           }
//         `}
//       >
//         <FiMenu size={24} />
//       </button>

//       {/* =====================================================
//           MOBILE BACKDROP
//       ===================================================== */}
//       {isSidebarOpen && (
//         <div
//           onClick={closeSidebar}
//           className="
//             fixed
//             inset-0
//             z-[90]

//             bg-black/40

//             lg:hidden
//           "
//         />
//       )}

//       {/* =====================================================
//           SIDEBAR
//       ===================================================== */}
//       <aside
//         className={`
//           fixed
//           top-0
//           left-0
//           z-[95]

//           w-72
//           h-screen

//           flex
//           flex-col

//           border-r

//           transition-transform
//           duration-300
//           ease-in-out

//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}

//           lg:static
//           lg:translate-x-0

//           ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
//         `}
//       >
//         {/* =====================================================
//             MOBILE CLOSE BUTTON
//         ===================================================== */}
//         <div className="flex justify-end p-3 lg:hidden">
//           <button
//             type="button"
//             onClick={closeSidebar}
//             aria-label="Close sidebar"
//             className={`
//               p-2
//               rounded-lg

//               ${
//                 isDark
//                   ? "text-gray-300 hover:bg-gray-800"
//                   : "text-gray-600 hover:bg-gray-100"
//               }
//             `}
//           >
//             <FiX size={22} />
//           </button>
//         </div>

//         {/* =====================================================
//             LOGO
//         ===================================================== */}
//         <div
//           className={`
//             px-6
//             py-6
//             border-b

//             ${isDark ? "border-gray-700" : "border-gray-100"}
//           `}
//         >
//           <Link to="
//           " onClick={closeSidebar}>
//             <h1
//               className={`
//                 text-2xl
//                 font-bold
//                 tracking-tight

//                 ${isDark ? "text-white" : "text-gray-900"}
//               `}
//             >
//               Ecommerce
//             </h1>

//             <p
//               className={`
//                 text-sm
//                 mt-1

//                 ${isDark ? "text-gray-400" : "text-gray-500"}
//               `}
//             >
//               Inventory Management
//             </p>
//           </Link>
//         </div>

//         {/* =====================================================
//             MENU
//         ===================================================== */}
//         <nav className="flex-1 px-4 py-6 overflow-y-auto">
//           {/* ================= MANAGEMENT ================= */}
//           <p
//             className={`
//               px-3
//               mb-3

//               text-xs
//               font-semibold
//               uppercase
//               tracking-wider

//               ${isDark ? "text-gray-500" : "text-gray-400"}
//             `}
//           >
//             Management
//           </p>

//           <div className="space-y-2">
//             {/* Dashboard */}
//             <NavLink to="/admin" className={navStyle} onClick={closeSidebar}>
//               <MdDashboard size={18} />
//               <span>Dashboard</span>
//             </NavLink>

//             {/* Products */}
//             <NavLink
//               to="/admin/products"
//               className={navStyle}
//               onClick={closeSidebar}
//             >
//               <FiBox size={18} />
//               <span>Products</span>
//             </NavLink>

//             {/* Categories */}
//             <NavLink
//               to="/admin/categories"
//               className={navStyle}
//               onClick={closeSidebar}
//             >
//               <FiTag size={18} />
//               <span>Categories</span>
//             </NavLink>

//             {/* Coupons */}
//             <NavLink
//               to="/admin/coupons"
//               className={navStyle}
//               onClick={closeSidebar}
//             >
//               <FiGift size={18} />
//               <span>Coupons</span>
//             </NavLink>

//             {/* Customers */}
//             <NavLink
//               to="/admin/customers"
//               className={navStyle}
//               onClick={closeSidebar}
//             >
//               <FiUsers size={18} />
//               <span>Customers</span>
//             </NavLink>

//             {/* Reviews */}
//             <NavLink
//               to="/admin/reviews"
//               className={navStyle}
//               onClick={closeSidebar}
//             >
//               <FiStar size={18} />
//               <span>Reviews</span>
//             </NavLink>

//             {/* Orders */}
//             <NavLink
//               to="/admin/orders"
//               className={navStyle}
//               onClick={closeSidebar}
//             >
//               <FiShoppingCart size={18} />
//               <span>Orders</span>
//             </NavLink>
//           </div>

//           {/* ================= ACCOUNT ================= */}
//           <p
//             className={`
//               px-3
//               mt-8
//               mb-3

//               text-xs
//               font-semibold
//               uppercase
//               tracking-wider

//               ${isDark ? "text-gray-500" : "text-gray-400"}
//             `}
//           >
//             Account
//           </p>

//           <div className="space-y-2">
//             {/* Settings */}
//             <NavLink
//               to="/admin/settings"
//               className={navStyle}
//               onClick={closeSidebar}
//             >
//               <FiSettings size={18} />
//               <span>Settings</span>
//             </NavLink>
//           </div>
//         </nav>

//         {/* =====================================================
//             USER CARD
//         ===================================================== */}
//         <div
//           className={`
//             p-4
//             border-t

//             ${isDark ? "border-gray-700" : "border-gray-100"}
//           `}
//         >
//           <div
//             className={`
//               flex
//               items-center
//               gap-3

//               p-3
//               rounded-xl

//               ${isDark ? "bg-gray-800" : "bg-gray-50"}
//             `}
//           >
//             {/* Avatar */}
//             <div
//               className="
//                 w-10
//                 h-10

//                 rounded-full

//                 bg-black
//                 text-white

//                 flex
//                 items-center
//                 justify-center

//                 font-semibold

//                 flex-shrink-0
//               "
//             >
//               {profileData?.name?.charAt(0).toUpperCase()}
//             </div>

//             {/* User Information */}
//             <div className="min-w-0">
//               <h4
//                 className={`
//                   text-sm
//                   font-semibold
//                   truncate

//                   ${isDark ? "text-white" : "text-gray-800"}
//                 `}
//               >
//                 {profileData?.name}
//               </h4>

//               <p
//                 className={`
//                   text-xs

//                   ${isDark ? "text-gray-400" : "text-gray-500"}
//                 `}
//               >
//                 Administrator
//               </p>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;


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

  useEffect(() => {
    let mounted = true;

    const fetchSettings = async () => {
      try {
        const res = await getAdminSettings();

        if (mounted) {
          setProfileData(res?.data?.data ?? null);
        }
      } catch (error) {
        console.error("Admin settings error:", error);
      }
    };

    fetchSettings();

    return () => {
      mounted = false;
    };
  }, []);

  const closeSidebar = () => setIsSidebarOpen(false);

  const navStyle = ({ isActive }) =>
    `
      group flex min-h-[38px] items-center gap-2.5
      rounded-lg px-3 py-2
      text-[13px] font-medium
      transition-colors duration-150
      ${
        isActive
          ? isDark
            ? "bg-blue-500/15 text-blue-300"
            : "bg-blue-50 text-blue-700"
          : isDark
            ? "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }
    `;

  const iconSize = 17;
  const name = profileData?.name || "Admin";
  const initial = name.charAt(0).toUpperCase();

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open sidebar"
        className={`
          fixed left-3 top-3 z-[100]
          flex h-9 w-9 items-center justify-center
          rounded-lg border shadow-sm
          transition-colors lg:hidden
          ${
            isDark
              ? "border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
          }
        `}
      >
        <FiMenu size={19} />
      </button>

      {/* MOBILE BACKDROP */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar backdrop"
          onClick={closeSidebar}
          className="fixed inset-0 z-[90] bg-black/50 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[95]
          flex h-dvh w-60 flex-col
          border-r transition-transform duration-200 ease-out
          lg:sticky lg:top-0 lg:z-40 lg:h-screen
          lg:translate-x-0
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }
          ${
            isDark
              ? "border-gray-800 bg-gray-950 text-gray-100"
              : "border-gray-200 bg-white text-gray-800"
          }
        `}
      >
        {/* BRAND */}
        <div
          className={`
            flex h-[60px] shrink-0 items-center justify-between
            border-b px-4
            ${isDark ? "border-gray-800" : "border-gray-200"}
          `}
        >
          <Link
            to="/admin"
            onClick={closeSidebar}
            className="min-w-0"
          >
            <h1
              className={`
                text-[19px] font-bold tracking-tight
                ${isDark ? "text-white" : "text-gray-900"}
              `}
            >
              Cartify
            </h1>
            <p
              className={`
                mt-0.5 text-[10px]
                ${isDark ? "text-gray-500" : "text-gray-500"}
              `}
            >
              Inventory Management
            </p>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className={`
              flex h-8 w-8 items-center justify-center
              rounded-md transition-colors lg:hidden
              ${
                isDark
                  ? "text-gray-400 hover:bg-gray-800"
                  : "text-gray-500 hover:bg-gray-100"
              }
            `}
          >
            <FiX size={18} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {/* MANAGEMENT */}
          <p
            className={`
              mb-2 px-3 text-[10px] font-semibold
              uppercase tracking-[0.12em]
              ${isDark ? "text-gray-500" : "text-gray-400"}
            `}
          >
            Management
          </p>

          <div className="space-y-1">
            <NavLink
              to="/admin"
              end
              className={navStyle}
              onClick={closeSidebar}
            >
              <MdDashboard size={iconSize} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/products"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiBox size={iconSize} />
              <span>Products</span>
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiTag size={iconSize} />
              <span>Categories</span>
            </NavLink>

            <NavLink
              to="/admin/coupons"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiGift size={iconSize} />
              <span>Coupons</span>
            </NavLink>

            <NavLink
              to="/admin/customers"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiUsers size={iconSize} />
              <span>Customers</span>
            </NavLink>

            <NavLink
              to="/admin/reviews"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiStar size={iconSize} />
              <span>Reviews</span>
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={navStyle}
              onClick={closeSidebar}
            >
              <FiShoppingCart size={iconSize} />
              <span>Orders</span>
            </NavLink>
          </div>

          {/* ACCOUNT */}
          <p
            className={`
              mb-2 mt-6 px-3 text-[10px] font-semibold
              uppercase tracking-[0.12em]
              ${isDark ? "text-gray-500" : "text-gray-400"}
            `}
          >
            Account
          </p>

          <NavLink
            to="/admin/settings"
            className={navStyle}
            onClick={closeSidebar}
          >
            <FiSettings size={iconSize} />
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* ADMIN PROFILE */}
        <div
          className={`
            shrink-0 border-t p-3
            ${isDark ? "border-gray-800" : "border-gray-200"}
          `}
        >
          <div
            className={`
              flex items-center gap-2.5 rounded-lg
              px-2 py-2
              ${
                isDark
                  ? "bg-gray-900"
                  : "bg-gray-50"
              }
            `}
          >
            <div
              className={`
                flex h-8 w-8 shrink-0 items-center
                justify-center rounded-full
                text-xs font-semibold
                ${
                  isDark
                    ? "bg-blue-500/15 text-blue-300"
                    : "bg-blue-100 text-blue-700"
                }
              `}
            >
              {initial}
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={`
                  truncate text-xs font-semibold
                  ${isDark ? "text-gray-100" : "text-gray-800"}
                `}
              >
                {name}
              </p>

              <p
                className={`
                  mt-0.5 text-[10px]
                  ${isDark ? "text-gray-500" : "text-gray-500"}
                `}
              >
                Administrator
              </p>
            </div>

            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
              title="Administrator"
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
