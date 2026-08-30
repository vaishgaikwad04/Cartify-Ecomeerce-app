import { useContext } from "react";

import { NotificationContext } from "../../context/NotificationContext";
import { ThemeContext } from "../../context/ThemeContext";

export const useNotification = () => {
  // Get notification data and actions from NotificationContext
  const {
    notifications,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
    notificationLoading,
  } = useContext(NotificationContext);

  // Get the current application theme
  const { theme } = useContext(ThemeContext);

  // Convert the theme value into a boolean
  // for easier conditional styling
  const isDark = theme === "Dark Mode";

  // Return notification data, actions and theme information
  // to the component using this custom hook
  return {
    notifications,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
    notificationLoading,
    isDark,
  };
};