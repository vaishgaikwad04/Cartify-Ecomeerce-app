import express from "express";

import {
  // User notifications
  getUserNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,

  // Admin notifications
  getAdminPanelNotifications,
  getUnreadAdminNotificationCount,
  markAdminNotificationAsRead,
  markAllAdminNotificationAsRead,
  deleteAdminNotification,
} from "./notificationController.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// =====================================================
// USER NOTIFICATIONS
// =====================================================

// Get all user notifications
router.get(
  "/",
  authMiddleware,
  getUserNotifications
);

// Get unread user notification count
router.get(
  "/unread-count",
  authMiddleware,
  getUnreadNotificationCount
);

// Mark all user notifications as read
router.patch(
  "/read-all",
  authMiddleware,
  markAllNotificationsAsRead
);

// Mark single user notification as read
router.patch(
  "/:id/read",
  authMiddleware,
  markNotificationAsRead
);

// Delete user notification
router.delete(
  "/:id",
  authMiddleware,
  deleteNotification
);

// =====================================================
// ADMIN NOTIFICATIONS
// =====================================================

// Get all admin notifications
router.get(
  "/adminPanel/notification",
  authMiddleware,
  getAdminPanelNotifications
);

// Get unread admin notification count
router.get(
  "/adminPanel/unread-count",
  authMiddleware,
  getUnreadAdminNotificationCount
);

// Mark single admin notification as read
router.patch(
  "/adminPanel/:notificationId/read",
  authMiddleware,
  markAdminNotificationAsRead
);

// Mark all admin notifications as read
router.patch(
  "/adminPanel/read-all",
  authMiddleware,
  markAllAdminNotificationAsRead
);

// Delete admin notification
router.delete(
  "/adminPanel/:notificationId",
  authMiddleware,
  deleteAdminNotification
);

export default router;