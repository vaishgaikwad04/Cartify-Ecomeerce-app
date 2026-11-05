
import React, {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiXCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

import { ThemeContext } from "../../../context/ThemeContext";
import { getOrdersByUserId } from "../../../api/user/OrderApi";

const Order = () => {
  // ================= STATE =================
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // ================= THEME =================
  const { theme } = useContext(ThemeContext);
  const darkMode = theme === "Dark Mode";

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getOrdersByUserId();
      setOrders(res.data.fetchedOrder || []);
    } catch (error) {
      console.error(
        "Order error:",
        error.response?.data || error.message
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= STATUS CONFIG =================
  const getStatusConfig = (status) => {
    switch (status) {
      case "paid":
        return {
          label: "Confirmed",
          icon: FiCheckCircle,
          className: darkMode
            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
            : "border-emerald-200 bg-emerald-50 text-emerald-700",
        };

      case "shipped":
        return {
          label: "Shipped",
          icon: FiTruck,
          className: darkMode
            ? "border-blue-400/20 bg-blue-400/10 text-blue-400"
            : "border-blue-200 bg-blue-50 text-blue-700",
        };

      case "delivered":
        return {
          label: "Delivered",
          icon: FiCheckCircle,
          className: darkMode
            ? "border-green-400/20 bg-green-400/10 text-green-400"
            : "border-green-200 bg-green-50 text-green-700",
        };

      case "cancelled":
        return {
          label: "Cancelled",
          icon: FiXCircle,
          className: darkMode
            ? "border-red-400/20 bg-red-400/10 text-red-400"
            : "border-red-200 bg-red-50 text-red-700",
        };

      default:
        return {
          label: "Processing",
          icon: FiClock,
          className: darkMode
            ? "border-amber-400/20 bg-amber-400/10 text-amber-400"
            : "border-amber-200 bg-amber-50 text-amber-700",
        };
    }
  };

  // ================= FORMAT DATE =================
  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ================= FORMAT CURRENCY =================
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN");
  };

  // ================= THEME CLASSES =================
  const pageBg = darkMode
    ? "bg-gray-950"
    : "bg-white";

  const cardBg = darkMode
    ? "bg-gray-900 border-white/[0.08]"
    : "bg-white border-gray-200";

  const heading = darkMode
    ? "text-gray-100"
    : "text-gray-900";

  const bodyText = darkMode
    ? "text-gray-400"
    : "text-gray-500";

  const secondaryText = darkMode
    ? "text-gray-300"
    : "text-gray-700";

  const mutedText = darkMode
    ? "text-gray-500"
    : "text-gray-400";

  const border = darkMode
    ? "border-white/[0.08]"
    : "border-gray-200";

  const skeletonBg = darkMode
    ? "bg-white/[0.07]"
    : "bg-gray-200";

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <main
        className={`
          min-h-screen
          px-3 py-6
          sm:px-4 sm:py-8
          lg:px-6
          ${pageBg}
          transition-colors duration-300
        `}
      >
        <div className="mx-auto w-full max-w-[1800px] animate-pulse">
          {/* HEADER SKELETON */}
          <div className={`mb-6 border-b pb-5 ${border}`}>
            <div className={`h-5 w-28 rounded ${skeletonBg}`} />
            <div className={`mt-2 h-3 w-52 max-w-full rounded ${skeletonBg}`} />
          </div>

          {/* ORDER SKELETONS */}
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className={`h-44 rounded-xl border ${cardBg}`}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ================= MAIN UI =================
  return (
    <main
      className={`
        min-h-screen
        px-3 py-6
        sm:px-4 sm:py-8
        lg:px-6 lg:py-10
        ${pageBg}
        transition-colors duration-300
      `}
    >
      <div className="mx-auto w-full max-w-[1800px]">

        {/* ================= PAGE HEADER ================= */}
        <header className={`mb-6 border-b pb-4 sm:mb-7 sm:pb-5 ${border}`}>
          <h1
            className={`
              text-lg
              sm:text-xl
              font-semibold
              tracking-tight
              ${heading}
            `}
          >
            My Orders
          </h1>

          <p className={`mt-1 text-xs sm:text-sm ${bodyText}`}>
            View your order history and track your purchases.
          </p>

          {orders.length > 0 && (
            <p className={`mt-2.5 text-xs ${bodyText}`}>
              <span className={`font-semibold ${heading}`}>
                {orders.length}
              </span>{" "}
              {orders.length === 1 ? "order" : "orders"}
            </p>
          )}
        </header>

        {/* ================= EMPTY STATE ================= */}
        {orders.length === 0 ? (
          <div
            className={`
              flex
              min-h-[320px]
              flex-col
              items-center
              justify-center
              rounded-xl
              border
              px-4
              py-10
              text-center
              sm:min-h-[380px]
              ${cardBg}
            `}
          >
            <div
              className={`
                flex h-16 w-16
                items-center justify-center
                rounded-full
                ${darkMode ? "bg-gray-800" : "bg-gray-50"}
              `}
            >
              <FiPackage
                size={28}
                className={mutedText}
              />
            </div>

            <h2 className={`mt-5 text-base font-semibold sm:text-lg ${heading}`}>
              No orders yet
            </h2>

            <p className={`mt-2 max-w-sm text-xs leading-relaxed sm:text-sm ${bodyText}`}>
              Your purchases will appear here once you place an order.
            </p>
          </div>
        ) : (

          /* ================= ORDERS LIST ================= */
          <div className="space-y-4">

            {orders.map((order) => {
              const status = getStatusConfig(order.status);
              const StatusIcon = status.icon;

              const isExpanded = expandedOrder === order._id;

              const items = order.items || [];

              const visibleItems = isExpanded
                ? items
                : items.slice(0, 2);

              return (
                <article
                  key={order._id}
                  className={`
                    overflow-hidden
                    rounded-xl
                    border
                    ${cardBg}
                    transition-colors duration-300
                  `}
                >

                  {/* ================= ORDER HEADER ================= */}
                  <div className={`border-b px-3 py-3 sm:px-5 sm:py-4 ${border}`}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                      {/* ORDER DETAILS */}
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">

                        <div>
                          <p className={`text-[10px] font-medium uppercase tracking-wider ${mutedText}`}>
                            Order ID
                          </p>

                          <p className={`mt-1 font-mono text-xs ${secondaryText}`}>
                            #{order._id?.slice(-8) || "—"}
                          </p>
                        </div>

                        <div>
                          <p className={`text-[10px] font-medium uppercase tracking-wider ${mutedText}`}>
                            Order Date
                          </p>

                          <p className={`mt-1 text-xs ${secondaryText}`}>
                            {formatDate(order.createdAt)}
                          </p>
                        </div>

                      </div>

                      {/* STATUS BADGES */}
                      <div className="flex flex-wrap items-center gap-2">

                        <span
                          className={`
                            rounded-full
                            border
                            px-2.5 py-1
                            text-[10px]
                            font-medium
                            ${
                              order.paymentStatus === "paid"
                                ? darkMode
                                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : darkMode
                                ? "border-amber-400/20 bg-amber-400/10 text-amber-400"
                                : "border-amber-200 bg-amber-50 text-amber-700"
                            }
                          `}
                        >
                          {order.paymentStatus === "paid"
                            ? "Payment received"
                            : "Payment pending"}
                        </span>

                        <span
                          className={`
                            flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            px-2.5 py-1
                            text-[10px]
                            font-medium
                            ${status.className}
                          `}
                        >
                          <StatusIcon size={12} />
                          {status.label}
                        </span>

                      </div>
                    </div>
                  </div>

                  {/* ================= ORDER ITEMS ================= */}
                  <div
                    className={`
                      divide-y
                      ${
                        darkMode
                          ? "divide-white/[0.06]"
                          : "divide-gray-100"
                      }
                    `}
                  >
                    {visibleItems.map((item, index) => (
                      <div
                        key={
                          item._id ||
                          item.productId ||
                          `${order._id}-${index}`
                        }
                        className="
                          grid
                          grid-cols-[auto_minmax(0,1fr)_auto]
                          items-center
                          gap-3
                          px-3 py-3
                          sm:px-5 sm:py-3.5
                        "
                      >

                        {/* PRODUCT IMAGE */}
                        <div
                          className={`
                            h-12 w-12
                            shrink-0
                            overflow-hidden
                            rounded-lg
                            border
                            sm:h-14 sm:w-14
                            ${border}
                            ${darkMode ? "bg-gray-800" : "bg-gray-50"}
                          `}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.productName || "Product"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <FiPackage
                                size={17}
                                className={mutedText}
                              />
                            </div>
                          )}
                        </div>

                        {/* PRODUCT INFO */}
                        <div className="min-w-0">
                          <h3 className={`truncate text-xs font-medium sm:text-sm ${heading}`}>
                            {item.productName || "Product"}
                          </h3>

                          <p className={`mt-1 text-[10px] sm:text-xs ${bodyText}`}>
                            ₹{formatPrice(item.productPrice)} × {item.quantity}
                          </p>
                        </div>

                        {/* ITEM TOTAL */}
                        <p className={`shrink-0 text-xs font-semibold sm:text-sm ${heading}`}>
                          ₹
                          {formatPrice(
                            Number(item.productPrice || 0) *
                              Number(item.quantity || 0)
                          )}
                        </p>

                      </div>
                    ))}
                  </div>

                  {/* ================= SHOW MORE / LESS ================= */}
                  {items.length > 2 && (
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedOrder(
                          isExpanded ? null : order._id
                        )
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-1.5
                        border-t
                        py-2.5
                        text-xs
                        font-medium
                        transition-colors
                        ${border}
                        ${
                          darkMode
                            ? "text-gray-400 hover:bg-white/[0.03] hover:text-white"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                    >
                      {isExpanded ? (
                        <>
                          Show less
                          <FiChevronUp size={14} />
                        </>
                      ) : (
                        <>
                          View {items.length - 2} more{" "}
                          {items.length - 2 === 1 ? "item" : "items"}
                          <FiChevronDown size={14} />
                        </>
                      )}
                    </button>
                  )}

                  {/* ================= ORDER FOOTER ================= */}
                  <div
                    className={`
                      grid
                      grid-cols-2
                      items-center
                      gap-3
                      border-t
                      px-3 py-3
                      sm:px-5 sm:py-4
                      ${border}
                      ${darkMode ? "bg-white/[0.02]" : "bg-gray-50/70"}
                    `}
                  >

                    {/* PAYMENT */}
                    <div>
                      <p className={`text-[10px] font-medium uppercase tracking-wider ${mutedText}`}>
                        Payment
                      </p>

                      <p className={`mt-1 text-xs ${secondaryText}`}>
                        {order.paymentStatus === "paid"
                          ? "Paid securely online"
                          : "Payment pending"}
                      </p>
                    </div>

                    {/* TOTAL */}
                    <div className="text-right">
                      <p className={`text-[10px] font-medium uppercase tracking-wider ${mutedText}`}>
                        Order total
                      </p>

                      <p className={`mt-1 text-base font-semibold ${heading}`}>
                        ₹{formatPrice(order.total)}
                      </p>
                    </div>

                  </div>

                </article>
              );
            })}

          </div>
        )}
      </div>
    </main>
  );
};

export default Order;
