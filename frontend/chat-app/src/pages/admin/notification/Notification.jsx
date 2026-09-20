
import React, { useContext } from "react";

import {
  FiBell,
  FiCheckCircle,
  FiCreditCard,
  FiTruck,
  FiPackage,
  FiInfo,
  FiRefreshCw,
} from "react-icons/fi";

import { ThemeContext } from "../../../context/ThemeContext";
import { NotificationContext } from "../../../context/NotificationContext";

const Notification = () => {
  // =====================================================
  // CONTEXT
  // =====================================================

  const { theme } = useContext(ThemeContext);

  const {
    notifications,
    unreadCount,
    fetchNotifications,
    handleMarkAsRead,
    handleMarkAllAsRead,
    notificationLoading,
  } = useContext(NotificationContext);

  const isDark = theme === "Dark Mode";

  // =====================================================
  // NOTIFICATION ICON
  // =====================================================

  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return <FiPackage />;

      case "payment":
        return <FiCreditCard />;

      case "shipping":
        return <FiTruck />;

      case "delivery":
        return <FiCheckCircle />;

      case "system":
        return <FiInfo />;

      default:
        return <FiBell />;
    }
  };

  // =====================================================
  // NOTIFICATION STYLE
  // =====================================================

  const getNotificationStyle = (type) => {
    switch (type) {
      case "order":
        return isDark
          ? "bg-amber-500/15 text-amber-400"
          : "bg-amber-50 text-amber-600";

      case "payment":
        return isDark
          ? "bg-emerald-500/15 text-emerald-400"
          : "bg-emerald-50 text-emerald-600";

      case "shipping":
        return isDark
          ? "bg-blue-500/15 text-blue-400"
          : "bg-blue-50 text-blue-600";

      case "delivery":
        return isDark
          ? "bg-green-500/15 text-green-400"
          : "bg-green-50 text-green-600";

      case "system":
        return isDark
          ? "bg-purple-500/15 text-purple-400"
          : "bg-purple-50 text-purple-600";

      default:
        return isDark
          ? "bg-gray-700 text-gray-300"
          : "bg-gray-100 text-gray-600";
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "";

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) return "";

    return formattedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =====================================================
  // LOADING UI
  // =====================================================

  if (notificationLoading) {
    return (
      <div
        className={`min-h-screen p-6 transition-colors duration-300 ${
          isDark
            ? "bg-[#111111] text-white"
            : "bg-[#f8f8f8] text-gray-900"
        }`}
      >
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-8 h-8 w-56 animate-pulse rounded bg-gray-300/30" />

          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`h-28 animate-pulse rounded-2xl ${
                  isDark ? "bg-[#1c1c1c]" : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div
      className={`min-h-screen px-4 py-6 transition-colors duration-300 sm:px-6 lg:px-8 ${
        isDark
          ? "bg-[#111111] text-white"
          : "bg-[#f8f8f8] text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-[1800px]">

        {/* ================= HEADER ================= */}

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <div className="mb-2 flex items-center gap-3">

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  isDark
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
              >
                <FiBell size={20} />
              </div>

              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Notifications
              </h1>

            </div>

            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Stay updated with your store activities.
            </p>
          </div>

          {/* HEADER ACTIONS */}

          <div className="flex flex-wrap items-center gap-3">

            {/* MARK ALL AS READ */}

            <button
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40 ${
                isDark
                  ? "border-gray-700 bg-[#1c1c1c] text-gray-200"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              <FiCheckCircle size={16} />

              Mark all as read
            </button>

            {/* REFRESH */}

            <button
              onClick={fetchNotifications}
              disabled={notificationLoading}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40 ${
                isDark
                  ? "border-gray-700 bg-[#1c1c1c] text-gray-200"
                  : "border-gray-200 bg-white text-gray-700"
              }`}
            >
              <FiRefreshCw size={16} />

              Refresh
            </button>

          </div>

        </div>

        {/* ================= SUMMARY ================= */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* TOTAL */}

          <div
            className={`rounded-2xl border p-5 ${
              isDark
                ? "border-gray-800 bg-[#191919]"
                : "border-gray-200 bg-white"
            }`}
          >
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Total Notifications
            </p>

            <h2 className="mt-2 text-3xl font-semibold">
              {notifications.length}
            </h2>
          </div>

          {/* UNREAD */}

          <div
            className={`rounded-2xl border p-5 ${
              isDark
                ? "border-gray-800 bg-[#191919]"
                : "border-gray-200 bg-white"
            }`}
          >
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Unread Notifications
            </p>

            <h2 className="mt-2 text-3xl font-semibold">
              {unreadCount}
            </h2>
          </div>

        </div>

        {/* ================= NOTIFICATION LIST ================= */}

        {notifications.length === 0 ? (

          // EMPTY STATE

          <div
            className={`flex flex-col items-center justify-center rounded-2xl border px-6 py-16 text-center ${
              isDark
                ? "border-gray-800 bg-[#191919]"
                : "border-gray-200 bg-white"
            }`}
          >
            <div
              className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                isDark ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <FiBell
                size={28}
                className={
                  isDark ? "text-gray-400" : "text-gray-500"
                }
              />
            </div>

            <h2 className="text-lg font-semibold">
              No notifications yet
            </h2>

            <p
              className={`mt-2 text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              New store activities will appear here.
            </p>
          </div>

        ) : (

          // NOTIFICATION CARDS

          <div className="space-y-3">

            {notifications.map((notification) => (

              <div
                key={notification._id}
                className={`relative rounded-2xl border p-4 transition duration-200 hover:shadow-md sm:p-5 ${
                  isDark
                    ? "border-gray-800 bg-[#191919] hover:border-gray-700"
                    : "border-gray-200 bg-white hover:border-gray-300"
                } ${
                  !notification.isRead
                    ? isDark
                      ? "border-l-4 border-l-amber-400"
                      : "border-l-4 border-l-amber-500"
                    : ""
                }`}
              >

                <div className="flex items-start gap-4">

                  {/* ICON */}

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${getNotificationStyle(
                      notification.type
                    )}`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-sm font-semibold sm:text-base">
                        {notification.title}
                      </h3>

                      {!notification.isRead && (
                        <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          New
                        </span>
                      )}

                    </div>

                    <p
                      className={`mt-1 text-sm leading-6 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {notification.message}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">

                      {notification.type && (
                        <span
                          className={`rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                            isDark
                              ? "bg-gray-800 text-gray-400"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {notification.type}
                        </span>
                      )}

                      <span
                        className={`text-xs ${
                          isDark ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {formatDate(
                          notification.createdAt ||
                            notification.updatedAt
                        )}
                      </span>

                    </div>

                    {/* MARK SINGLE AS READ */}

                    {!notification.isRead && (
                      <button
                        onClick={() =>
                          handleMarkAsRead(notification._id)
                        }
                        className={`mt-3 text-xs font-medium underline underline-offset-4 transition hover:opacity-70 ${
                          isDark
                            ? "text-amber-400"
                            : "text-amber-600"
                        }`}
                      >
                        Mark as read
                      </button>
                    )}

                  </div>

                  {/* UNREAD INDICATOR */}

                  {!notification.isRead && (
                    <span
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500"
                      title="Unread notification"
                    />
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
};

export default Notification;