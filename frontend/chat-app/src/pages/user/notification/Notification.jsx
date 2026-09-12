import {
  FiBell,
  FiPackage,
  FiCheckCircle,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";

import { useNotification } from "../../../hooks/user/useNotification";

const Notifications = () => {
  // from the custom notification hook
  const {
    notifications,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
    notificationLoading,
    isDark,
  } = useNotification();

 
  const getNotificationIcon = (notification) => {
    const title = notification?.title?.toLowerCase() || "";

    // Display truck icon for shipped orders
    if (title.includes("shipped")) {
      return <FiTruck />;
    }

    // Display check icon for delivered orders
    if (title.includes("delivered")) {
      return <FiCheckCircle />;
    }

    // Display X icon for cancelled orders
    if (title.includes("cancelled")) {
      return <FiXCircle />;
    }

    // Use package icon for other notification types
    return <FiPackage />;
  };

  return (
    <div
      className={`
        min-h-screen
        px-4
        py-10
        ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}
      `}
    >
      {/* Main page container */}
      <div className="max-w-[1800px] mx-auto">

        {/*
            PAGE HEADER
        */}

        <div className="flex items-center justify-between mb-8">

          {/* Page title and description */}
          <div>
            <h1 className="text-2xl font-semibold">
              Notifications
            </h1>

            <p
              className={`
                mt-1
                text-sm
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Stay updated with your orders.
            </p>
          </div>

          {/* Show "Mark all as read" only when
              unread notifications are available */}
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className={`
                text-sm
                font-medium
                ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                }
              `}
            >
              Mark all as read
            </button>
          )}
        </div>

      

        {/* Display loading message while
            notifications are being fetched */}
        {notificationLoading && (
          <div className="py-20 text-center">
            Loading notifications...
          </div>
        )}

     

        {/* Display empty state when loading is complete
            and there are no notifications */}
        {!notificationLoading && notifications.length === 0 && (
     <div
  className={`
    flex
    min-h-[360px]
    flex-col
    items-center
    justify-center
    rounded-xl
    border
    px-6
    py-12
    text-center

    ${
      isDark
        ? "border-gray-800 bg-gray-900"
        : "border-gray-200 bg-white"
    }
  `}
>
  {/* Empty notification icon */}
  <div
    className={`
      flex
      h-16
      w-16
      items-center
      justify-center
      rounded-full

      ${isDark ? "bg-gray-800" : "bg-gray-100"}
    `}
  >
    <FiBell
      className={`
        text-2xl

        ${isDark ? "text-gray-500" : "text-gray-400"}
      `}
    />
  </div>

  {/* Title */}
  <h2 className="mt-5 text-lg font-semibold">
    No notifications yet
  </h2>

</div>
        )}

        {/* ==================================
            NOTIFICATION LIST
        ================================== */}

        <div className="space-y-3">

          {/* Render notifications only after
              loading has finished */}
          {!notificationLoading &&
            notifications.map((notification) => (
              <button
                type="button"
                key={notification._id}
                onClick={() => {
                  // Mark notification as read only if
                  // it has not already been read
                  if (!notification.isRead) {
                    handleMarkAsRead(notification._id);
                  }
                }}
                className={`
                  w-full
                  text-left
                  rounded-xl
                  border
                  p-5
                  flex
                  gap-4
                  transition

                  ${
                    notification.isRead
                      ? isDark
                        ? "bg-gray-900 border-gray-800"
                        : "bg-white border-gray-200"
                      : isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-300"
                  }
                `}
              >
                {/* ==================================
                    NOTIFICATION ICON
                ================================== */}

                <div
                  className={`
                    w-10
                    h-10
                    shrink-0
                    rounded-full
                    flex
                    items-center
                    justify-center

                    ${
                      isDark
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {/* Select icon according to
                      notification type */}
                  {getNotificationIcon(notification)}
                </div>

                {/* ==================================
                    NOTIFICATION CONTENT
                ================================== */}

                <div className="flex-1">

                  {/* Notification title and unread indicator */}
                  <div className="flex items-start justify-between gap-4">

                    <h3
                      className={`
                        text-sm
                        font-semibold
                        ${isDark ? "text-gray-100" : "text-gray-900"}
                      `}
                    >
                      {notification.title}
                    </h3>

                    {/* Red dot indicates an unread notification */}
                    {!notification.isRead && (
                      <span
                        className="
                          w-2
                          h-2
                          rounded-full
                          bg-red-500
                          shrink-0
                          mt-1.5
                        "
                      />
                    )}
                  </div>

                  {/* Notification message */}
                  <p
                    className={`
                      mt-1
                      text-sm
                      ${isDark ? "text-gray-400" : "text-gray-600"}
                    `}
                  >
                    {notification.message}
                  </p>

                  {/* Notification date and time */}
                  <p
                    className={`
                      mt-2
                      text-xs
                      ${isDark ? "text-gray-500" : "text-gray-400"}
                    `}
                  >
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;