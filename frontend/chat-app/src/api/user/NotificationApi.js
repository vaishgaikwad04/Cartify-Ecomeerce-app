import axios from "axios";

const NotificationAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/notifications`,
  withCredentials: true,
});

// =====================================================
// USER NOTIFICATIONS
// =====================================================

// Get all user notifications
export const getNotifications = () =>
  NotificationAPI.get("/");

// Get unread user notification count
export const getUnreadNotificationCount = () =>
  NotificationAPI.get("/unread-count");

// Mark one user notification as read
export const markNotificationAsRead = (id) =>
  NotificationAPI.patch(`/${id}/read`);

// Mark all user notifications as read
export const markAllNotificationsAsRead = () =>
  NotificationAPI.patch("/read-all");

// Delete one user notification
export const deleteNotification = (id) =>
  NotificationAPI.delete(`/${id}`);

// =====================================================
// ADMIN PANEL NOTIFICATIONS
// =====================================================

// Get all admin notifications
export const getAdminPanelNotifications = () =>
  NotificationAPI.get("/adminPanel/notification");

// Get unread admin notification count
export const getUnreadAdminNotificationCount = () =>
  NotificationAPI.get("/adminPanel/unread-count");

// Mark one admin notification as read
export const markAdminNotificationAsRead = (notificationId) =>
  NotificationAPI.patch(`/adminPanel/${notificationId}/read`);

// Mark all admin notifications as read
export const markAllAdminNotificationsAsRead = () =>
  NotificationAPI.patch("/adminPanel/read-all");

// Delete one admin notification
export const deleteAdminNotification = (notificationId) =>
  NotificationAPI.delete(`/adminPanel/${notificationId}`);

export default NotificationAPI;