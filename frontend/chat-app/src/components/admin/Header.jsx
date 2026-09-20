                                                                                                                

// import React, { useState, useEffect, useContext } from "react";
// import { FiBell } from "react-icons/fi";

// import { ThemeContext } from "../../context/ThemeContext";
// import { getAdminSettings } from "../../api/user/SettingsApi";
// import { NotificationContext } from "../../context/NotificationContext";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const navigate = useNavigate();
//   const { allowNotification, notifications,  // Unread count
//         unreadCount,     // Mark as read
//         handleMarkAsRead,
//         handleMarkAllAsRead} = useContext(NotificationContext);

//   const [profileData, setProfileData] = useState(null);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const { theme } = useContext(ThemeContext);

//   const isDark = theme === "Dark Mode";

//   // ==========================================
//   // FETCH ADMIN SETTINGS
//   // ==========================================

//   const fetchSettings = async () => {
//     try {
//       const res = await getAdminSettings();

//       setProfileData(res.data.data);
//     } catch (error) {
//       console.error("Admin settings error:", error);
//     }
//   };




//     useEffect(() => {
//     fetchSettings();
//   }, []);

 
//   return (
//      <header
//       className={`
//         px-6 py-4
//         flex
//         items-center
//         justify-between
//         border-b

//         ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
//       `}
//     >
//       {/* ==========================================
//           LEFT
//       ========================================== */}

//       <div>
//         <h1
//           className={`
//             text-2xl
//             font-bold

//             ${isDark ? "text-white" : "text-gray-900"}
//           `}
//         >
//           Products
//         </h1>

//         <p
//           className={`
//             text-sm

//             ${isDark ? "text-gray-400" : "text-gray-500"}
//           `}
//         >
//           Manage inventory and product listings
//         </p>
//       </div>

//       {/* ==========================================
//           RIGHT
//       ========================================== */}

//       <div className="flex items-center gap-4">
//         {/* ==========================================
//             NOTIFICATIONS
//         ========================================== */}

//         {allowNotification  &&  notifications.map((notification) => ( 
//           <div className="relative">
//              onClick={() => handleMarkAsRead(notification._id)}

//             <button
//               type="button"
//               onClick={() => setShowNotifications((prev) => !prev)}
//               className={`
//                 relative
//                 w-11
//                 h-11
//                 rounded-full
//                 flex
//                 items-center
//                 justify-center
//                 transition-all
//                 duration-300

//                 ${
//                   isDark
//                     ? "bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white hover:scale-105"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black hover:scale-105"
//                 }
//               `}
//               aria-label={`Notifications${
//                 unreadCount > 0 ? `, ${unreadCount} unread` : ""
//               }`}
//             >
//               <FiBell className="text-[21px]" />

//               {/* Unread Badge */}

//               {unreadCount > 0 && (
//                 <span
//                   className="
//                     absolute
//                     -top-1
//                     -right-1
//                     min-w-[19px]
//                     h-[19px]
//                     px-1
//                     rounded-full
//                     bg-red-500
//                     text-white
//                     text-[10px]
//                     font-bold
//                     flex
//                     items-center
//                     justify-center
//                     border-2
//                     border-white
//                     leading-none
//                   "
//                 >
//                   {unreadCount > 99 ? "99+" : unreadCount}
//                 </span>
//               )}
//             </button>

//             {/* ==========================================
//                 NOTIFICATION DROPDOWN
//             ========================================== */}

//             {showNotifications && (
//               <div
//               onClick={() => handleMarkAsRead(notification._id)}
//                 className={`
//                   absolute
//                   right-0
//                   top-14
//                   w-80
//                   rounded-xl
//                   border
//                   shadow-xl
//                   z-50
//                   overflow-hidden

//                   ${
//                     isDark
//                       ? "bg-gray-900 border-gray-700"
//                       : "bg-white border-gray-200"
//                   }
//                 `}
//               >
//                 {/* Dropdown Header */}

//                 <div
//                   className={`
//     px-4
//     py-3
//     border-b
//     flex
//     items-center
//     justify-between

//     ${isDark ? "border-gray-700" : "border-gray-200"}
//   `}
//                 >
//                   {/* Header Title */}
//                   <h3
//                     className={`
//       font-semibold

//       ${isDark ? "text-white" : "text-gray-900"}
//     `}
//                   >
//                     Notifications
//                   </h3>

//                   {/* View All Button */}
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowNotifications(false);
//                       navigate("/admin/notifications");
//                     }}
//                     className={`
//       text-xs
//       font-medium
//       hover:underline

//       ${isDark ? "text-gray-300" : "text-gray-600"}
//     `}
//                   >
//                     View all
//                   </button>
//                 </div>

//                 {/* Notification List */}

//                 <div className="max-h-96 overflow-y-auto">
//                   {notifications.length === 0 ? (
//                     <div
//                       className={`
//                         px-4
//                         py-8
//                         text-center
//                         text-sm

//                         ${isDark ? "text-gray-400" : "text-gray-500"}
//                       `}
//                     >
//                       No notifications
//                     </div>
//                   ) : (
//                     notifications.map((notification) => (
//                       <div
//                         key={notification._id}
//                         className={`
//                           px-4
//                           py-3
//                           border-b
//                           cursor-pointer
//                           transition

//                           ${
//                             isDark
//                               ? "border-gray-700 hover:bg-gray-800"
//                               : "border-gray-100 hover:bg-gray-50"
//                           }

//                           ${
//                             !notification.isRead
//                               ? isDark
//                                 ? "bg-gray-800/50"
//                                 : "bg-gray-50"
//                               : ""
//                           }
//                         `}
//                       >
//                         {/* Title */}

//                         <p
//                           className={`
//                             text-sm
//                             font-semibold

//                             ${isDark ? "text-white" : "text-gray-900"}
//                           `}
//                         >
//                           {notification.title}
//                         </p>

//                         {/* Message */}

//                         <p
//                           className={`
//                             mt-1
//                             text-xs

//                             ${isDark ? "text-gray-400" : "text-gray-500"}
//                           `}
//                         >
//                           {notification.message}
//                         </p>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )
//         )}

//         {/* ==========================================
//             PROFILE
//         ========================================== */}

//         <div
//           className={`
//             flex
//             items-center
//             gap-3
//             rounded-xl
//             px-3
//             py-2
//             cursor-pointer
//             border
//             transition

//             ${
//               isDark
//                 ? "border-gray-600 hover:bg-gray-800"
//                 : "border-gray-200 hover:bg-gray-50"
//             }
//           `}
//         >
//           {/* Profile Initial */}

//           <div
//             className="
//               w-9
//               h-9
//               bg-black
//               text-white
//               rounded-full
//               flex
//               items-center
//               justify-center
//               font-semibold
//             "
//           >
//             {profileData?.name?.charAt(0).toUpperCase()}
//           </div>

//           {/* Profile Information */}

//           <div className="hidden md:block">
//             <p
//               className={`
//                 text-sm
//                 font-medium

//                 ${isDark ? "text-white" : "text-gray-800"}
//               `}
//             >
//               {profileData?.name}
//             </p>

//             <p
//               className={`
//                 text-xs

//                 ${isDark ? "text-gray-400" : "text-gray-500"}
//               `}
//             >
//               Administrator
//             </p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



import React, { useState, useEffect, useContext } from "react";
import { FiBell } from "react-icons/fi";

import { ThemeContext } from "../../context/ThemeContext";
import { getAdminSettings } from "../../api/user/SettingsApi";
import { NotificationContext } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // =====================================================
  // CONTEXT
  // =====================================================

  const {
    allowNotification,
    unreadCount,
  } = useContext(NotificationContext);

  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  // =====================================================
  // STATE
  // =====================================================

  const [profileData, setProfileData] = useState(null);

  // =====================================================
  // FETCH ADMIN SETTINGS
  // =====================================================

  const fetchSettings = async () => {
    try {
      const res = await getAdminSettings();

      setProfileData(res.data.data);
    } catch (error) {
      console.error("Admin settings error:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // =====================================================
  // HANDLE NOTIFICATION CLICK
  // =====================================================

  const handleNotificationClick = () => {
    navigate("/admin/notifications");
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <header
      className={`
        sticky
        top-0
        z-40
        flex
        items-center
        justify-between
        border-b
        px-6
        py-4
        backdrop-blur-md
        transition-colors
        duration-300

        ${
          isDark
            ? "border-gray-800 bg-gray-900/95"
            : "border-gray-200 bg-white/95"
        }
      `}
    >

      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <div>
        <h1
          className={`
            text-2xl
            font-bold
            tracking-tight
            ${isDark ? "text-white" : "text-gray-900"}
          `}
        >
          Products
        </h1>

        <p
          className={`
            mt-1
            text-sm
            ${isDark ? "text-gray-400" : "text-gray-500"}
          `}
        >
          Manage inventory and product listings
        </p>
      </div>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <div className="flex items-center gap-4">

        {/* =====================================================
            NOTIFICATION
        ===================================================== */}

        {allowNotification && (
          <button
            type="button"
            onClick={handleNotificationClick}
            className={`
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              transition-all
              duration-200

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
            <FiBell className="text-[21px]" />

            {/* UNREAD BADGE */}

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-[19px]
                  min-w-[19px]
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  bg-red-500
                  px-1
                  text-[10px]
                  font-bold
                  leading-none
                  text-white
                "
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>
        )}

        {/* =====================================================
            PROFILE
        ===================================================== */}

        <div
          className={`
            flex
            cursor-pointer
            items-center
            gap-3
            rounded-xl
            border
            px-3
            py-2
            transition

            ${
              isDark
                ? "border-gray-700 hover:bg-gray-800"
                : "border-gray-200 hover:bg-gray-50"
            }
          `}
        >

          {/* PROFILE INITIAL */}

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-black
              font-semibold
              text-white
            "
          >
            {profileData?.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          {/* PROFILE INFORMATION */}

          <div className="hidden md:block">

            <p
              className={`
                text-sm
                font-medium
                ${
                  isDark
                    ? "text-white"
                    : "text-gray-800"
                }
              `}
            >
              {profileData?.name}
            </p>

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
    </header>
  );
};

export default Header;
