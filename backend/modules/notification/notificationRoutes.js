import express from "express";

import {
  getUserNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "./notificationController.js";

import {authMiddleware} from "../../middleware/authMiddleware.js";

const router = express.Router();

// Get all notifications
router.get(
  "/",
  authMiddleware,
  getUserNotifications
);

// Get unread count
router.get(
  "/unread-count",
  authMiddleware,
  getUnreadNotificationCount
);

// Mark all as read
router.patch(
  "/read-all",
  authMiddleware,
  markAllNotificationsAsRead
);

// Mark single notification as read
router.patch(
  "/:id/read",
  authMiddleware,
  markNotificationAsRead
);

// Delete notification
router.delete(
  "/:id",
  authMiddleware,
  deleteNotification
);

export default router;