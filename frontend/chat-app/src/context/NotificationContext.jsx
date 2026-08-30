import { createContext, useEffect, useState } from "react";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../api/user/NotificationApi";

import { getUserSettings } from "../api/user/SettingsApi";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [allowNotification, setAllowNotification] = useState(true);

  const [notifications, setNotifications] = useState([]);

  const [unreadCount, setUnreadCount] = useState(0);

  const [notificationLoading, setNotificationLoading] = useState(true);

  // =====================================================
  // FETCH NOTIFICATION SETTING
  // =====================================================

  useEffect(() => {
    const fetchNotificationSetting = async () => {
      try {
        const res = await getUserSettings();

        console.log("Settings response:", res?.data);

        const user = res?.data?.user || res?.data?.data;

        //optional chaning If it doesn't exist, use false
        setAllowNotification(user?.notification ?? false);
      } catch (error) {
        console.error(
          "Notification setting error:",
          error?.response?.data || error.message,
        );

        // Don't break notification loading
        setAllowNotification(false);
      }
    };

    fetchNotificationSetting();
  }, []);

  // =====================================================
  // FETCH NOTIFICATIONS
  // =====================================================

  const fetchNotifications = async () => {
    try {
      setNotificationLoading(true);

      const res = await getNotifications();

      console.log("Notifications API response:", res?.data);

      const data = res?.data?.notifications || [];

      setNotifications(data);

      // Calculate unread count directly from notifications
      const unread = data.filter((notification) => !notification.isRead).length;

      setUnreadCount(unread);
    } catch (error) {
      console.error(
        "Notification fetch error:",
        error?.response?.data || error.message,
      );

      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setNotificationLoading(false);
    }
  };

  // =====================================================
  // FETCH NOTIFICATIONS ON MOUNT
  // =====================================================

  useEffect(() => {
    fetchNotifications();
  }, []);

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
            : notification,
        ),
      );

      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error(
        "Mark notification as read error:",
        error?.response?.data || error.message,
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
        })),
      );

      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Mark all notifications as read error:",
        error?.response?.data || error.message,
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

    setNotifications((prev) => [newNotification, ...prev]);

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
