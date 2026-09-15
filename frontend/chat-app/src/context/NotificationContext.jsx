// // 

// import { createContext, useEffect, useState, useContext } from "react";
// import toast from "react-hot-toast";

// import {
//   getNotifications,
//   markNotificationAsRead,
//   markAllNotificationsAsRead,
// } from "../api/user/NotificationApi";

// // IMPORTANT:
// // Change this import to wherever your AuthContext is located.
// import { AuthContext } from "./AuthContext";

// export const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [allowNotification, setAllowNotification] = useState(true);

//   const [notifications, setNotifications] = useState([]);

//   const [unreadCount, setUnreadCount] = useState(0);

//   const [notificationLoading, setNotificationLoading] = useState(false);

//   // Get currently authenticated user
//   const { user } = useContext(AuthContext);

//   // =====================================================
//   // FETCH NOTIFICATIONS
//   // =====================================================

//   const fetchNotifications = async () => {
//     // Don't make API request if user isn't logged in
//     if (!user) {
//       setNotifications([]);
//       setUnreadCount(0);
//       return;
//     }

//     // Only regular users should access user notifications
//     if (user.role !== "user") {
//       setNotifications([]);
//       setUnreadCount(0);
//       return;
//     }

//     try {
//       setNotificationLoading(true);

//       const res = await getNotifications();

//       const data = res?.data?.notifications || [];

//       setNotifications(data);

//       const unread = data.filter(
//         (notification) => !notification.isRead
//       ).length;

//       setUnreadCount(unread);
//     } catch (error) {
//       console.error(
//         "Notification fetch error:",
//         error?.response?.data || error?.message
//       );

//       setNotifications([]);
//       setUnreadCount(0);

//       // Don't show an annoying toast for background requests
//       // You can enable this if you want.
//       // toast.error(
//       //   error?.response?.data?.message ||
//       //   "Failed to fetch notifications"
//       // );
//     } finally {
//       setNotificationLoading(false);
//     }
//   };

//   // =====================================================
//   // FETCH NOTIFICATIONS WHEN USER IS AUTHENTICATED
//   // =====================================================

//   useEffect(() => {
//     if (!user) {
//       setNotifications([]);
//       setUnreadCount(0);
//       return;
//     }

//     if (user.role !== "user") {
//       setNotifications([]);
//       setUnreadCount(0);
//       return;
//     }

//     fetchNotifications();
//   }, [user]);

//   // =====================================================
//   // MARK SINGLE NOTIFICATION AS READ
//   // =====================================================

//   const handleMarkAsRead = async (id) => {
//     try {
//       await markNotificationAsRead(id);

//       setNotifications((prev) =>
//         prev.map((notification) =>
//           notification._id === id
//             ? {
//                 ...notification,
//                 isRead: true,
//               }
//             : notification
//         )
//       );

//       setUnreadCount((prev) => Math.max(prev - 1, 0));
//     } catch (error) {
//       console.error(
//         "Mark notification as read error:",
//         error?.response?.data || error?.message
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to mark notification as read"
//       );
//     }
//   };

//   // =====================================================
//   // MARK ALL NOTIFICATIONS AS READ
//   // =====================================================

//   const handleMarkAllAsRead = async () => {
//     try {
//       await markAllNotificationsAsRead();

//       setNotifications((prev) =>
//         prev.map((notification) => ({
//           ...notification,
//           isRead: true,
//         }))
//       );

//       setUnreadCount(0);
//     } catch (error) {
//       console.error(
//         "Mark all notifications as read error:",
//         error?.response?.data || error?.message
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to mark all notifications as read"
//       );
//     }
//   };

//   // =====================================================
//   // ADD NOTIFICATION
//   // =====================================================

//   const addNotification = (notification) => {
//     const newNotification = {
//       _id: notification?._id || Date.now(),

//       title: notification?.title || "Notification",

//       message: notification?.message || "",

//       type: notification?.type || "order",

//       order: notification?.order || null,

//       isRead: false,

//       createdAt: notification?.createdAt || new Date(),
//     };

//     setNotifications((prev) => [
//       newNotification,
//       ...prev,
//     ]);

//     setUnreadCount((prev) => prev + 1);
//   };

//   // =====================================================
//   // PROVIDER
//   // =====================================================

//   return (
//     <NotificationContext.Provider
//       value={{
//         allowNotification,
//         setAllowNotification,

//         notifications,
//         setNotifications,

//         unreadCount,
//         setUnreadCount,

//         addNotification,

//         fetchNotifications,

//         handleMarkAsRead,
//         handleMarkAllAsRead,

//         notificationLoading,
//         setNotificationLoading,
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };


import { createContext, useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";

import {
  getNotifications,
  getAdminPanelNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../api/user/NotificationApi";

import { AuthContext } from "./AuthContext";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [allowNotification, setAllowNotification] = useState(true);

  const [notifications, setNotifications] = useState([]);

  const [unreadCount, setUnreadCount] = useState(0);

  const [notificationLoading, setNotificationLoading] = useState(false);

  // Get currently authenticated user
  const { user } = useContext(AuthContext);

  // =====================================================
  // FETCH NOTIFICATIONS
  // =====================================================

  const fetchNotifications = async () => {
    // Don't make API request if user isn't logged in
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    try {
      setNotificationLoading(true);

      let res;

      // Regular user notifications
      if (user.role === "user") {
        res = await getNotifications();
      }

      // Admin notifications
      if (user.role === "admin") {
        res = await getAdminPanelNotifications();
      }

      const data = res?.data?.notifications || [];

      setNotifications(data);

      // Calculate unread notifications
      const unread = data.filter(
        (notification) => !notification.isRead
      ).length;

      setUnreadCount(unread);
    } catch (error) {
      console.error(
        "Notification fetch error:",
        error?.response?.data || error?.message
      );

      setNotifications([]);
      setUnreadCount(0);

      // Don't show an annoying toast for background requests
      // toast.error(
      //   error?.response?.data?.message ||
      //   "Failed to fetch notifications"
      // );
    } finally {
      setNotificationLoading(false);
    }
  };

  // =====================================================
  // FETCH NOTIFICATIONS WHEN USER IS AUTHENTICATED
  // =====================================================

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    fetchNotifications();
  }, [user]);

  // =====================================================
  // MARK SINGLE NOTIFICATION AS READ
  // =====================================================

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? {
                ...notification,
                isRead: true,
              }
            : notification
        )
      );

      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error(
        "Mark notification as read error:",
        error?.response?.data || error?.message
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to mark notification as read"
      );
    }
  };

  // =====================================================
  // MARK ALL NOTIFICATIONS AS READ
  // =====================================================

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Mark all notifications as read error:",
        error?.response?.data || error?.message
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to mark all notifications as read"
      );
    }
  };

  // =====================================================
  // ADD NOTIFICATION
  // =====================================================

  const addNotification = (notification) => {
    const newNotification = {
      _id: notification?._id || Date.now(),

      title: notification?.title || "Notification",

      message: notification?.message || "",

      type: notification?.type || "order",

      order: notification?.order || null,

      isRead: false,

      createdAt: notification?.createdAt || new Date(),
    };

    setNotifications((prev) => [
      newNotification,
      ...prev,
    ]);

    setUnreadCount((prev) => prev + 1);
  };

  // =====================================================
  // PROVIDER
  // =====================================================

  return (
    <NotificationContext.Provider
      value={{
        allowNotification,
        setAllowNotification,

        notifications,
        setNotifications,

        unreadCount,
        setUnreadCount,

        addNotification,

        fetchNotifications,

        handleMarkAsRead,
        handleMarkAllAsRead,

        notificationLoading,
        setNotificationLoading,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
