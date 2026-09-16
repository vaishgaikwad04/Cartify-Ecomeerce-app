import notificationModel from "./notificationModel.js";

// =====================================================
// GET USER NOTIFICATIONS
// =====================================================

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await notificationModel
      ///find based on userId
      .find({ user: userId })
      ///populate order data
      .populate("order", "orderId status total")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Notifications fetched successfully",
      notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// GET UNREAD NOTIFICATION COUNT
// =====================================================

export const getUnreadNotificationCount = async (req, res) => {
  try {
    ///find based on userId
    const userId = req.user.id;
    ////count matching records
    const count = await notificationModel.countDocuments({
      user: userId,
      isRead: false,
    });

    res.status(200).json({
      message: "Unread notification count fetched successfully",
      count,
    });
  } catch (error) {
    console.error("Unread notification count error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// MARK SINGLE NOTIFICATION AS READ
// =====================================================

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await notificationModel.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      {
        isRead: true,
      },
      {
        new: true,
      },
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("Mark notification read error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// MARK ALL NOTIFICATIONS AS READ
// =====================================================

export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await notificationModel.updateMany(
      {
        user: userId,
        isRead: false,
      },
      {
        isRead: true,
      },
    );

    res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Mark all notifications read error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// DELETE NOTIFICATION
// =====================================================

export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await notificationModel.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("Delete notification error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


export const getAdminPanelNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel
      .find({
        user: req.user.id,
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("GET NOTIFICATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


