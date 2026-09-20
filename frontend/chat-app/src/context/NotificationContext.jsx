
import { createContext, useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";

import {
  getNotifications,
  getAdminPanelNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  markAllAdminNotificationsAsRead,
  markAdminNotificationAsRead,
} from "../api/user/NotificationApi";

import { AuthContext } from "./AuthContext";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // =====================================================
  // STATE
  // =====================================================

  const [allowNotification, setAllowNotification] = useState(true);

  const [notifications, setNotifications] = useState([]);

  const [unreadCount, setUnreadCount] = useState(0);

  const [notificationLoading, setNotificationLoading] = useState(false);

  // Get authenticated user
  const { user } = useContext(AuthContext);

  // =====================================================
  // FETCH NOTIFICATIONS
  // =====================================================

  const fetchNotifications = async () => {
    // If user is not authenticated, reset notifications
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    try {
      setNotificationLoading(true);

      let res;

      // Fetch notifications according to user role
      if (user.role === "user") {
        res = await getNotifications();
      } else if (user.role === "admin") {
        res = await getAdminPanelNotifications();
      } else {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }

      // Ensure notifications is an array
      const data = Array.isArray(res?.data?.notifications)
        ? res.data.notifications
        : [];

      // Store notifications
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
    } finally {
      setNotificationLoading(false);
    }
  };

  // =====================================================
  // FETCH WHEN USER CHANGES
  // =====================================================

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  // =====================================================
  // MARK SINGLE NOTIFICATION AS READ
  // =====================================================

  const handleMarkAsRead = async (id) => {
    if (!user || !id) return;

    // Find notification
    const selectedNotification = notifications.find(
      (notification) => notification._id === id
    );

    // Avoid unnecessary API request
    if (!selectedNotification || selectedNotification.isRead) {
      return;
    }

    try {
      // Call API according to user role
      if (user.role === "user") {
        await markNotificationAsRead(id);
      } else if (user.role === "admin") {
        await markAdminNotificationAsRead(id);
      } else {
        return;
      }

      // Update notification state
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

      // Decrease unread count
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
    if (!user) return;

    try {
      // Call API according to user role
      if (user.role === "user") {
        await markAllNotificationsAsRead();
      } else if (user.role === "admin") {
        await markAllAdminNotificationsAsRead();
      } else {
        return;
      }

      // Update all notifications
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      // Reset unread count for BOTH roles
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
  // PROVIDER
  // =====================================================

  return (
    <NotificationContext.Provider
      value={{
        // Notification permission
        allowNotification,
        setAllowNotification,

        // Notification data
        notifications,
        setNotifications,

        // Unread count
        unreadCount,
        setUnreadCount,

        // Fetch notifications
        fetchNotifications,

        // Mark as read
        handleMarkAsRead,
        handleMarkAllAsRead,

        // Loading
        notificationLoading,
        setNotificationLoading,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};