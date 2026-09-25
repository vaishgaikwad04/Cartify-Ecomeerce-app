import {
  FiBell,
  FiPackage,
  FiCheckCircle,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";

import { useNotification } from "../../../hooks/user/useNotification";

const Notifications = () => {
  // From the custom notification hook
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
        px-3
        py-4
        sm:px-4
        sm:py-5
        lg:px-5
        ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}
      `}
    >
      {/* Main page container */}
      <div className="mx-auto w-full max-w-[1200px]">

        {/* PAGE HEADER */}
        <div
          className={`
            mb-4
            flex
            items-center
            justify-between
            gap-3
            border-b
            pb-4
            sm:mb-5
            sm:pb-5
            ${isDark ? "border-white/[0.08]" : "border-gray-200"}
          `}
        >
          {/* Page title and description */}
          <div className="min-w-0">
            <h1
              className={`
                text-base
                font-semibold
                tracking-tight
                sm:text-lg
                md:text-xl
              `}
            >
              Notifications
            </h1>

            <p
              className={`
                mt-0.5
                text-[10px]
                leading-4
                sm:text-xs
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Stay updated with your orders.
            </p>
          </div>

          {/* Mark all as read */}
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className={`
                shrink-0
                text-[10px]
                font-medium
                transition-colors
                sm:text-xs
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

        {/* LOADING STATE */}
        {notificationLoading && (
          <div
            className={`
              py-12
              text-center
              text-[10px]
              sm:py-16
              sm:text-xs
              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
          >
            Loading notifications...
          </div>
        )}

        {/* EMPTY STATE */}
        {!notificationLoading && notifications.length === 0 && (
          <div
            className={`
              flex
              min-h-[260px]
              flex-col
              items-center
              justify-center
              rounded-xl
              border
              px-4
              py-10
              text-center
              sm:min-h-[300px]
              sm:px-5
              sm:py-12
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
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                sm:h-12
                sm:w-12
                ${isDark ? "bg-gray-800" : "bg-gray-100"}
              `}
            >
              <FiBell
                className={`
                  text-lg
                  sm:text-xl
                  ${isDark ? "text-gray-500" : "text-gray-400"}
                `}
              />
            </div>

            {/* Title */}
            <h2 className="mt-3 text-sm font-semibold sm:text-base">
              No notifications yet
            </h2>
          </div>
        )}

        {/* NOTIFICATION LIST */}
        <div className="space-y-2.5 sm:space-y-3">
          {!notificationLoading &&
            notifications.map((notification) => (
              <button
                type="button"
                key={notification._id}
                onClick={() => {
                  // Mark notification as read only if it has not already been read
                  if (!notification.isRead) {
                    handleMarkAsRead(notification._id);
                  }
                }}
                className={`
                  grid
                  w-full
                  grid-cols-[auto_1fr]
                  gap-2.5
                  rounded-xl
                  border
                  p-3
                  text-left
                  transition
                  sm:gap-3
                  sm:p-4

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
                {/* NOTIFICATION ICON */}
                <div
                  className={`
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    sm:h-9
                    sm:w-9
                    ${
                      isDark
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  <span className="text-sm sm:text-base">
                    {getNotificationIcon(notification)}
                  </span>
                </div>

                {/* NOTIFICATION CONTENT */}
                <div className="min-w-0">
                  {/* Notification title and unread indicator */}
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={`
                        min-w-0
                        truncate
                        text-[11px]
                        font-semibold
                        sm:text-xs
                        ${isDark ? "text-gray-100" : "text-gray-900"}
                      `}
                    >
                      {notification.title}
                    </h3>

                    {/* Red dot indicates an unread notification */}
                    {!notification.isRead && (
                      <span
                        className="
                          mt-1
                          h-1.5
                          w-1.5
                          shrink-0
                          rounded-full
                          bg-red-500
                          sm:h-2
                          sm:w-2
                        "
                      />
                    )}
                  </div>

                  {/* Notification message */}
                  <p
                    className={`
                      mt-0.5
                      break-words
                      text-[10px]
                      leading-4
                      sm:mt-1
                      sm:text-xs
                      sm:leading-5
                      ${isDark ? "text-gray-400" : "text-gray-600"}
                    `}
                  >
                    {notification.message}
                  </p>

                  {/* Notification date and time */}
                  <p
                    className={`
                      mt-1.5
                      text-[8px]
                      sm:mt-2
                      sm:text-[10px]
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