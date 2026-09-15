// // import React, { useState, useEffect, useContext } from "react";
// // import { FiBell, FiSearch } from "react-icons/fi";
// // import { ThemeContext } from "../../context/ThemeContext";
// // import { getAdminSettings } from "../../api/user/SettingsApi";
// // import { NotificationContext } from "../../context/NotificationContext";

// // const Header = () => {
// //   const { allowNotification, unreadCount } = useContext(NotificationContext);
// //   const [profileData, setProfileData] = useState(null);
// //   const { theme } = useContext(ThemeContext);
// //   const isDark = theme === "Dark Mode";

// //   const fetchSettings = async () => {
// //     try {
// //       const res = await getAdminSettings();
// //       setProfileData(res.data.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchSettings();
// //   }, []);

// //   return (
// //     <header
// //       className={`
// //                 px-6 py-4 flex items-center justify-between border-b
// //                 ${
// //                   isDark
// //                     ? "bg-gray-900 border-gray-700"
// //                     : "bg-white border-gray-200"
// //                 }
// //             `}
// //     >
// //       {/* Left */}

// //       <div>
// //         <h1
// //           className={`
// //                         text-2xl font-bold
// //                         ${isDark ? "text-white" : "text-gray-900"}
// //                     `}
// //         >
// //           Products
// //         </h1>

// //         <p
// //           className={`
// //                         text-sm
// //                         ${isDark ? "text-gray-400" : "text-gray-500"}
// //                     `}
// //         >
// //           Manage inventory and product listings
// //         </p>
// //       </div>

// //       {/* Right */}

// //       <div className="flex items-center gap-4">
// //         {/* NOTIFICATIONS */}

// //         {allowNotification && (
// //           <button
// //             type="button"
// //             onClick={() => navigate("/notifications")}
// //             className={`
// //                       relative
// //                       w-11
// //                       h-11
// //                       rounded-full
// //                       flex
// //                       items-center
// //                       justify-center
// //                       transition-all
// //                       duration-300

// //                       ${
// //                         isDark
// //                           ? "bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white hover:scale-105"
// //                           : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black hover:scale-105"
// //                       }
// //                     `}
// //             aria-label={`Notifications${
// //               unreadCount > 0 ? `, ${unreadCount} unread` : ""
// //             }`}
// //           >
// //             <FiBell className="text-[21px]" />

// //             {unreadCount > 0 && (
// //               <span
// //                 className="
// //                           absolute
// //                           -top-1
// //                           -right-1
// //                           min-w-[19px]
// //                           h-[19px]
// //                           px-1
// //                           rounded-full
// //                           bg-red-500
// //                           text-white
// //                           text-[10px]
// //                           font-bold
// //                           flex
// //                           items-center
// //                           justify-center
// //                           border-2
// //                           border-white
// //                           leading-none
// //                         "
// //               >
// //                 {unreadCount > 99 ? "99+" : unreadCount}
// //               </span>
// //             )}
// //           </button>
// //         )}

// //         {/* Profile */}

// //         <div
// //           className={`
// //                         flex items-center gap-3
// //                         rounded-xl px-3 py-2
// //                         cursor-pointer border transition

// //                         ${
// //                           isDark
// //                             ? "border-gray-600 hover:bg-gray-800"
// //                             : "border-gray-200 hover:bg-gray-50"
// //                         }
// //                     `}
// //         >
// //           <div
// //             className="
// //                             w-9 h-9
// //                             bg-black text-white
// //                             rounded-full
// //                             flex items-center justify-center
// //                             font-semibold
// //                         "
// //           >
// //             {profileData?.name?.charAt(0).toUpperCase()}
// //           </div>

// //           <div className="hidden md:block">
// //             <p
// //               className={`
// //                                 text-sm font-medium
// //                                 ${isDark ? "text-white" : "text-gray-800"}
// //                             `}
// //             >
// //               {profileData?.name}
// //             </p>

// //             <p
// //               className={`
// //                                 text-xs
// //                                 ${isDark ? "text-gray-400" : "text-gray-500"}
// //                             `}
// //             >
// //               Administrator
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;

// import React, { useState, useEffect, useContext } from "react";
// import { FiBell, FiSearch } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// import { ThemeContext } from "../../context/ThemeContext";
// import { getAdminSettings } from "../../api/user/SettingsApi";
// import { NotificationContext } from "../../context/NotificationContext";

// const Header = () => {
//   const navigate = useNavigate();

//   const { allowNotification, notifications, unreadCount } =
//     useContext(NotificationContext);

//   const [profileData, setProfileData] = useState(null);
//   const [showNotifications, setShowNotifications] = useState(false);

//   const { theme } = useContext(ThemeContext);

//   const isDark = theme === "Dark Mode";

//   // =====================================================
//   // FETCH ADMIN SETTINGS
//   // =====================================================

//   const fetchSettings = async () => {
//     try {
//       const res = await getAdminSettings();

//       setProfileData(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // =====================================================
//   // FETCH SETTINGS ON COMPONENT LOAD
//   // =====================================================

//   useEffect(() => {
//     fetchSettings();
//   }, []);

//   // =====================================================
//   // HEADER
//   // =====================================================

//   return (
//     <header
//       className={`
//         px-6 py-4
//         flex
//         items-center
//         justify-between
//         border-b

//         ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
//       `}
//     >
//       {/* =================================================
//           LEFT
//       ================================================= */}

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

//       {/* =================================================
//           RIGHT
//       ================================================= */}

//       <div className="flex items-center gap-4">
//         {/* =================================================
//             NOTIFICATIONS
//         ================================================= */}

//         {allowNotification && (
//           <button
//             type="button"
//             // We will add the notification dropdown here
//             // in the next step.
//             onClick={() => setShowNotifications((prev) => !prev)}
//             className={`
//               relative
//               w-11
//               h-11
//               rounded-full
//               flex
//               items-center
//               justify-center
//               transition-all
//               duration-300

//               ${
//                 isDark
//                   ? "bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white hover:scale-105"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black hover:scale-105"
//               }
//             `}
//             aria-label={`Notifications${
//               unreadCount > 0 ? `, ${unreadCount} unread` : ""
//             }`}
//           >
//             <FiBell className="text-[21px]" />

//             {/* UNREAD COUNT */}

//             {unreadCount > 0 && (
//               <span
//                 className="
//                   absolute
//                   -top-1
//                   -right-1
//                   min-w-[19px]
//                   h-[19px]
//                   px-1
//                   rounded-full
//                   bg-red-500
//                   text-white
//                   text-[10px]
//                   font-bold
//                   flex
//                   items-center
//                   justify-center
//                   border-2
//                   border-white
//                   leading-none
//                 "
//               >
//                 {unreadCount > 99 ? "99+" : unreadCount}
//               </span>
//             )}
//           </button>
//         )}
//         {/* =================================================
//     NOTIFICATIONS
// ================================================= */}

//         {allowNotification && (
//           <div className="relative">
//             {/* Notification Button */}

//             <button
//               type="button"
//               onClick={() => setShowNotifications((prev) => !prev)}
//               className={`
//         relative
//         w-11
//         h-11
//         rounded-full
//         flex
//         items-center
//         justify-center
//         transition-all
//         duration-300

//         ${
//           isDark
//             ? "bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white hover:scale-105"
//             : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black hover:scale-105"
//         }
//       `}
//               aria-label={`Notifications${
//                 unreadCount > 0 ? `, ${unreadCount} unread` : ""
//               }`}
//             >
//               <FiBell className="text-[21px]" />

//               {/* Unread Badge */}

//               {unreadCount > 0 && (
//                 <span
//                   className="
//             absolute
//             -top-1
//             -right-1
//             min-w-[19px]
//             h-[19px]
//             px-1
//             rounded-full
//             bg-red-500
//             text-white
//             text-[10px]
//             font-bold
//             flex
//             items-center
//             justify-center
//             border-2
//             border-white
//             leading-none
//           "
//                 >
//                   {unreadCount > 99 ? "99+" : unreadCount}
//                 </span>
//               )}
//             </button>

//             {/* Notification Dropdown */}

//             {showNotifications && (
//               <div
//                 className={`
//           absolute
//           right-0
//           top-14
//           w-80
//           rounded-xl
//           border
//           shadow-xl
//           z-50
//           overflow-hidden

//           ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
//         `}
//               >
//                 {/* Header */}

//                 <div
//                   className={`
//             px-4
//             py-3
//             border-b
//             flex
//             items-center
//             justify-between

//             ${isDark ? "border-gray-700" : "border-gray-200"}
//           `}
//                 >
//                   <h3
//                     className={`
//               font-semibold

//               ${isDark ? "text-white" : "text-gray-900"}
//             `}
//                   >
//                     Notifications
//                   </h3>

//                   <span
//                     className={`
//               text-xs

//               ${isDark ? "text-gray-400" : "text-gray-500"}
//             `}
//                   >
//                     {unreadCount} unread
//                   </span>
//                 </div>

//                 {/* Notification List */}

//                 <div className="max-h-96 overflow-y-auto">
//                   {notifications.length === 0 ? (
//                     <div
//                       className={`
//                 px-4
//                 py-8
//                 text-center
//                 text-sm

//                 ${isDark ? "text-gray-400" : "text-gray-500"}
//               `}
//                     >
//                       No notifications
//                     </div>
//                   ) : (
//                     notifications.map((notification) => (
//                       <div
//                         key={notification._id}
//                         className={`
//                   px-4
//                   py-3
//                   border-b
//                   cursor-pointer
//                   transition

//                   ${
//                     isDark
//                       ? "border-gray-700 hover:bg-gray-800"
//                       : "border-gray-100 hover:bg-gray-50"
//                   }

//                   ${
//                     !notification.isRead
//                       ? isDark
//                         ? "bg-gray-800/50"
//                         : "bg-gray-50"
//                       : ""
//                   }
//                 `}
//                       >
//                         <p
//                           className={`
//                     text-sm
//                     font-semibold

//                     ${isDark ? "text-white" : "text-gray-900"}
//                   `}
//                         >
//                           {notification.title}
//                         </p>

//                         <p
//                           className={`
//                     mt-1
//                     text-xs

//                     ${isDark ? "text-gray-400" : "text-gray-500"}
//                   `}
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
//         )}

//         {/* =================================================
//             PROFILE
//         ================================================= */}

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
//           {/* PROFILE IMAGE / INITIAL */}

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

//           {/* PROFILE INFORMATION */}

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

const Header = () => {
  const {
    allowNotification,
    notifications,
    unreadCount,
  } = useContext(NotificationContext);

  const [profileData, setProfileData] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  // ==========================================
  // FETCH ADMIN SETTINGS
  // ==========================================

  const fetchSettings = async () => {
    try {
      const res = await getAdminSettings();

      setProfileData(res.data.data);
    } catch (error) {
      console.error("Admin settings error:", error);
    }
  };

  // ==========================================
  // LOAD ADMIN SETTINGS
  // ==========================================

  useEffect(() => {
    fetchSettings();
  }, []);

  // ==========================================
  // HEADER
  // ==========================================

  return (
    <header
      className={`
        px-6 py-4
        flex
        items-center
        justify-between
        border-b

        ${
          isDark
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }
      `}
    >
      {/* ==========================================
          LEFT
      ========================================== */}

      <div>
        <h1
          className={`
            text-2xl
            font-bold

            ${isDark ? "text-white" : "text-gray-900"}
          `}
        >
          Products
        </h1>

        <p
          className={`
            text-sm

            ${isDark ? "text-gray-400" : "text-gray-500"}
          `}
        >
          Manage inventory and product listings
        </p>
      </div>

      {/* ==========================================
          RIGHT
      ========================================== */}

      <div className="flex items-center gap-4">

        {/* ==========================================
            NOTIFICATIONS
        ========================================== */}

        {allowNotification && (
          <div className="relative">

            {/* Notification Button */}

            <button
              type="button"
              onClick={() =>
                setShowNotifications((prev) => !prev)
              }
              className={`
                relative
                w-11
                h-11
                rounded-full
                flex
                items-center
                justify-center
                transition-all
                duration-300

                ${
                  isDark
                    ? "bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white hover:scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black hover:scale-105"
                }
              `}
              aria-label={`Notifications${
                unreadCount > 0
                  ? `, ${unreadCount} unread`
                  : ""
              }`}
            >
              <FiBell className="text-[21px]" />

              {/* Unread Badge */}

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    min-w-[19px]
                    h-[19px]
                    px-1
                    rounded-full
                    bg-red-500
                    text-white
                    text-[10px]
                    font-bold
                    flex
                    items-center
                    justify-center
                    border-2
                    border-white
                    leading-none
                  "
                >
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>
              )}
            </button>

            {/* ==========================================
                NOTIFICATION DROPDOWN
            ========================================== */}

            {showNotifications && (
              <div
                className={`
                  absolute
                  right-0
                  top-14
                  w-80
                  rounded-xl
                  border
                  shadow-xl
                  z-50
                  overflow-hidden

                  ${
                    isDark
                      ? "bg-gray-900 border-gray-700"
                      : "bg-white border-gray-200"
                  }
                `}
              >
                {/* Dropdown Header */}

                <div
                  className={`
                    px-4
                    py-3
                    border-b
                    flex
                    items-center
                    justify-between

                    ${
                      isDark
                        ? "border-gray-700"
                        : "border-gray-200"
                    }
                  `}
                >
                  <h3
                    className={`
                      font-semibold

                      ${
                        isDark
                          ? "text-white"
                          : "text-gray-900"
                      }
                    `}
                  >
                    Notifications
                  </h3>

                  <span
                    className={`
                      text-xs

                      ${
                        isDark
                          ? "text-gray-400"
                          : "text-gray-500"
                      }
                    `}
                  >
                    {unreadCount} unread
                  </span>
                </div>

                {/* Notification List */}

                <div className="max-h-96 overflow-y-auto">

                  {notifications.length === 0 ? (
                    <div
                      className={`
                        px-4
                        py-8
                        text-center
                        text-sm

                        ${
                          isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                        }
                      `}
                    >
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification._id}
                        className={`
                          px-4
                          py-3
                          border-b
                          cursor-pointer
                          transition

                          ${
                            isDark
                              ? "border-gray-700 hover:bg-gray-800"
                              : "border-gray-100 hover:bg-gray-50"
                          }

                          ${
                            !notification.isRead
                              ? isDark
                                ? "bg-gray-800/50"
                                : "bg-gray-50"
                              : ""
                          }
                        `}
                      >
                        {/* Title */}

                        <p
                          className={`
                            text-sm
                            font-semibold

                            ${
                              isDark
                                ? "text-white"
                                : "text-gray-900"
                            }
                          `}
                        >
                          {notification.title}
                        </p>

                        {/* Message */}

                        <p
                          className={`
                            mt-1
                            text-xs

                            ${
                              isDark
                                ? "text-gray-400"
                                : "text-gray-500"
                            }
                          `}
                        >
                          {notification.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            PROFILE
        ========================================== */}

        <div
          className={`
            flex
            items-center
            gap-3
            rounded-xl
            px-3
            py-2
            cursor-pointer
            border
            transition

            ${
              isDark
                ? "border-gray-600 hover:bg-gray-800"
                : "border-gray-200 hover:bg-gray-50"
            }
          `}
        >
          {/* Profile Initial */}

          <div
            className="
              w-9
              h-9
              bg-black
              text-white
              rounded-full
              flex
              items-center
              justify-center
              font-semibold
            "
          >
            {profileData?.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          {/* Profile Information */}

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
