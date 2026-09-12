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
  // =====================================================
  // STATE
  // =====================================================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // =====================================================
  // THEME
  // =====================================================

  const { theme } = useContext(ThemeContext);

  const darkMode = theme === "Dark Mode";

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getOrdersByUserId();

      console.log("Orders:", res.data.fetchedOrder);

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

  // =====================================================
  // STATUS CONFIG
  // =====================================================

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

  // =====================================================
  // FORMAT DATE
  // =====================================================

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

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN");
  };

  // =====================================================
  // THEME CLASSES
  // =====================================================

  const pageBg = darkMode
    ? "bg-[#09090b]"
    : "bg-[#f7f7f6]";

  const cardBg = darkMode
    ? "bg-gray-800 border-white/[0.08]"
    : "bg-white border-gray-200";

  const heading = darkMode
    ? "text-white"
    : "text-gray-950";

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

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <main
        className={`
          min-h-screen
          px-4
          py-6
          sm:px-6
          sm:py-8
          lg:px-8
          ${pageBg}
          transition-colors
          duration-300
        `}
      >
        <div className="mx-auto w-full max-w-6xl animate-pulse">

          {/* HEADER SKELETON */}

          <div className="border-b pb-6 border-gray-200 dark:border-white/[0.08]">
            <div
              className={`
                h-10
                w-10
                rounded-xl
                ${
                  darkMode
                    ? "bg-white/[0.08]"
                    : "bg-gray-200"
                }
              `}
            />

            <div
              className={`
                mt-5
                h-7
                w-32
                rounded
                ${
                  darkMode
                    ? "bg-white/[0.08]"
                    : "bg-gray-200"
                }
              `}
            />

            <div
              className={`
                mt-3
                h-4
                w-64
                max-w-full
                rounded
                ${
                  darkMode
                    ? "bg-white/[0.06]"
                    : "bg-gray-200"
                }
              `}
            />
          </div>

          {/* ORDER SKELETONS */}

          <div className="mt-6 space-y-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className={`
                  h-64
                  rounded-xl
                  border
                  ${cardBg}
                `}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <main
      className={`
        min-h-screen
        px-4
        py-6
        sm:px-6
        sm:py-8
        lg:px-8
        ${pageBg}
        transition-colors
        duration-300
      `}
    >
      <div className="mx-auto w-full max-w-[1800px]">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header
          className={`
            mb-6
            border-b
            pb-6
            sm:mb-8
            ${border}
          `}
        >
          <div className="flex items-start gap-3 sm:gap-4">

            {/* ICON */}

            <div
              className={`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                sm:h-11
                sm:w-11
                ${
                  darkMode
                    ? "bg-white text-black"
                    : "bg-gray-950 text-white"
                }
              `}
            >
              <FiPackage size={19} />
            </div>

            {/* TITLE */}

            <div className="min-w-0">

              <h1
                className={`
                  text-xl
                  font-semibold
                  tracking-tight
                  sm:text-2xl
                  ${heading}
                `}
              >
                My Orders
              </h1>

              <p
                className={`
                  mt-1
                  max-w-xl
                  text-xs
                  leading-5
                  sm:text-sm
                  ${bodyText}
                `}
              >
                View your order history and track your
                purchases.
              </p>

            </div>
          </div>

          {/* ORDER COUNT */}

          {orders.length > 0 && (
            <p
              className={`
                mt-5
                text-sm
                ${bodyText}
              `}
            >
              <span
                className={`
                  font-medium
                  ${heading}
                `}
              >
                {orders.length}
              </span>{" "}
              {orders.length === 1
                ? "order"
                : "orders"}
            </p>
          )}
        </header>

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {orders.length === 0 ? (
          <div
            className={`
              rounded-xl
              border
              px-5
              py-16
              text-center
              sm:px-6
              sm:py-20
              ${cardBg}
            `}
          >
            <FiPackage
              size={34}
              className={`
                mx-auto
                ${
                  darkMode
                    ? "text-gray-600"
                    : "text-gray-400"
                }
              `}
            />

            <h2
              className={`
                mt-5
                text-lg
                font-semibold
                ${heading}
              `}
            >
              No orders yet
            </h2>

            <p
              className={`
                mx-auto
                mt-2
                max-w-md
                text-sm
                leading-6
                ${bodyText}
              `}
            >
              Your completed purchases will appear
              here once you place an order.
            </p>
          </div>
        ) : (

          /* =================================================
             ORDERS LIST
          ================================================= */

          <div className="space-y-4">

            {orders.map((order) => {

              const status =
                getStatusConfig(order.status);

              const StatusIcon = status.icon;

              const isExpanded =
                expandedOrder === order._id;

              const visibleItems =
                isExpanded
                  ? order.items || []
                  : (order.items || []).slice(0, 2);

              return (
                <article
                  key={order._id}
                  className={`
                    overflow-hidden
                    rounded-xl
                    border
                    ${cardBg}
                    transition-colors
                    duration-300
                  `}
                >

                  {/* =================================================
                      ORDER HEADER
                  ================================================= */}

                  <div
                    className={`
                      border-b
                      px-4
                      py-4
                      sm:px-6
                      ${border}
                    `}
                  >
                    <div
                      className="
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >

                      {/* ORDER DETAILS */}

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-x-8
                          gap-y-3
                        "
                      >

                        {/* ORDER NUMBER */}

                        <div>
                          <p
                            className={`
                              text-[10px]
                              font-medium
                              uppercase
                              tracking-wider
                              ${mutedText}
                            `}
                          >
                            Order
                          </p>

                          <p
                            className={`
                              mt-1
                              font-mono
                              text-xs
                              ${secondaryText}
                            `}
                          >
                            #
                            {order._id?.slice(-8) ||
                              "—"}
                          </p>
                        </div>

                        {/* DATE */}

                        <div>
                          <p
                            className={`
                              text-[10px]
                              font-medium
                              uppercase
                              tracking-wider
                              ${mutedText}
                            `}
                          >
                            Date
                          </p>

                          <p
                            className={`
                              mt-1
                              text-sm
                              ${secondaryText}
                            `}
                          >
                            {formatDate(
                              order.createdAt
                            )}
                          </p>
                        </div>

                      </div>

                      {/* STATUS */}

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >

                        {/* PAYMENT STATUS */}

                        <span
                          className={`
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-[11px]
                            font-medium
                            ${
                              order.paymentStatus ===
                              "paid"
                                ? darkMode
                                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : darkMode
                                ? "border-amber-400/20 bg-amber-400/10 text-amber-400"
                                : "border-amber-200 bg-amber-50 text-amber-700"
                            }
                          `}
                        >
                          {order.paymentStatus ===
                          "paid"
                            ? "Payment received"
                            : "Payment pending"}
                        </span>

                        {/* ORDER STATUS */}

                        <span
                          className={`
                            flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-[11px]
                            font-medium
                            ${status.className}
                          `}
                        >
                          <StatusIcon size={13} />

                          {status.label}
                        </span>

                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      ORDER ITEMS
                  ================================================= */}

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

                    {visibleItems.map(
                      (item, index) => (
                        <div
                          key={
                            item.productId ||
                            `${order._id}-${index}`
                          }
                          className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-4
                            sm:gap-4
                            sm:px-6
                          "
                        >

                          {/* PRODUCT IMAGE */}

                          <div
                            className={`
                              h-14
                              w-14
                              shrink-0
                              overflow-hidden
                              rounded-lg
                              border
                              sm:h-16
                              sm:w-16
                              ${border}
                              ${
                                darkMode
                                  ? "bg-white/[0.04]"
                                  : "bg-gray-50"
                              }
                            `}
                          >
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={
                                  item.productName ||
                                  "Product"
                                }
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                "
                              />
                            ) : (
                              <div
                                className="
                                  flex
                                  h-full
                                  items-center
                                  justify-center
                                "
                              >
                                <FiPackage
                                  className={
                                    darkMode
                                      ? "text-gray-600"
                                      : "text-gray-400"
                                  }
                                />
                              </div>
                            )}
                          </div>

                          {/* PRODUCT INFO */}

                          <div
                            className="
                              min-w-0
                              flex-1
                            "
                          >
                            <h3
                              className={`
                                truncate
                                text-sm
                                font-medium
                                ${heading}
                              `}
                            >
                              {item.productName ||
                                "Product"}
                            </h3>

                            <p
                              className={`
                                mt-1
                                text-xs
                                ${bodyText}
                              `}
                            >
                              ₹
                              {formatPrice(
                                item.productPrice
                              )}{" "}
                              × {item.quantity}
                            </p>
                          </div>

                          {/* ITEM TOTAL */}

                          <p
                            className={`
                              shrink-0
                              text-sm
                              font-semibold
                              ${heading}
                            `}
                          >
                            ₹
                            {formatPrice(
                              Number(
                                item.productPrice || 0
                              ) *
                                Number(
                                  item.quantity || 0
                                )
                            )}
                          </p>
                        </div>
                      )
                    )}

                  </div>

                  {/* =================================================
                      SHOW MORE / LESS
                  ================================================= */}

                  {order.items?.length > 2 && (
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedOrder(
                          isExpanded
                            ? null
                            : order._id
                        )
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        border-t
                        py-3
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

                          <FiChevronUp
                            size={14}
                          />
                        </>
                      ) : (
                        <>
                          View{" "}
                          {order.items.length - 2}{" "}
                          more{" "}
                          {order.items.length - 2 ===
                          1
                            ? "item"
                            : "items"}

                          <FiChevronDown
                            size={14}
                          />
                        </>
                      )}
                    </button>
                  )}

                  {/* =================================================
                      ORDER FOOTER
                  ================================================= */}

                  <div
                    className={`
                      flex
                      flex-col
                      gap-4
                      border-t
                      px-4
                      py-4
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      sm:px-6
                      ${border}
                      ${
                        darkMode
                          ? "bg-white/[0.02]"
                          : "bg-gray-50/70"
                      }
                    `}
                  >

                    {/* PAYMENT */}

                    <div>
                      <p
                        className={`
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-wider
                          ${mutedText}
                        `}
                      >
                        Payment
                      </p>

                      <p
                        className={`
                          mt-1
                          text-sm
                          ${secondaryText}
                        `}
                      >
                        {order.paymentStatus ===
                        "paid"
                          ? "Paid securely online"
                          : "Payment pending"}
                      </p>
                    </div>

                    {/* TOTAL */}

                    <div
                      className="
                        text-left
                        sm:text-right
                      "
                    >
                      <p
                        className={`
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-wider
                          ${mutedText}
                        `}
                      >
                        Order total
                      </p>

                      <p
                        className={`
                          mt-1
                          text-lg
                          font-semibold
                          ${heading}
                        `}
                      >
                        ₹
                        {formatPrice(
                          order.total
                        )}
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