import axios from "axios";

const NotificationAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/notifications`,
  withCredentials: true,
});

// Get all notifications
export const getNotifications = () =>
  NotificationAPI.get("/");

// Get unread count
export const getUnreadNotificationCount = () =>
  NotificationAPI.get("/unread-count");

// Mark one notification as read
export const markNotificationAsRead = (id) =>
  NotificationAPI.patch(`/${id}/read`);

// Mark all notifications as read
export const markAllNotificationsAsRead = () =>
  NotificationAPI.patch("/read-all");

// Delete notification
export const deleteNotification = (id) =>
  NotificationAPI.delete(`/${id}`);

export default NotificationAPI;