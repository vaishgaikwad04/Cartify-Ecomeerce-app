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
          px-3
          py-4
          sm:px-4
          sm:py-5
          lg:px-5
          ${pageBg}
          transition-colors
          duration-300
        `}
      >
        <div className="mx-auto w-full max-w-[1200px] animate-pulse">

          {/* HEADER SKELETON */}

          <div
            className={`
              mb-4
              border-b
              pb-4
              sm:mb-5
              sm:pb-5
              ${border}
            `}
          >
            <div className="grid grid-cols-[auto_1fr] items-center gap-2.5">

              <div
                className={`
                  h-8
                  w-8
                  rounded-lg
                  sm:h-9
                  sm:w-9
                  ${
                    darkMode
                      ? "bg-white/[0.08]"
                      : "bg-gray-200"
                  }
                `}
              />

              <div className="min-w-0">
                <div
                  className={`
                    h-4
                    w-24
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
                    mt-1.5
                    h-2.5
                    w-48
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
            </div>
          </div>

          {/* ORDER SKELETONS */}

          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className={`
                  h-48
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
        px-3
        py-4
        sm:px-4
        sm:py-5
        lg:px-5
        ${pageBg}
        transition-colors
        duration-300
      `}
    >
      <div className="mx-auto w-full max-w-[1200px]">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <header
          className={`
            mb-4
            border-b
            pb-4
            sm:mb-5
            sm:pb-5
            ${border}
          `}
        >
          <div
            className="
              grid
              grid-cols-[auto_1fr]
              items-center
              gap-2.5
            "
          >

            {/* ICON */}

            <div
              className={`
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                sm:h-9
                sm:w-9
                ${
                  darkMode
                    ? "bg-white text-black"
                    : "bg-gray-950 text-white"
                }
              `}
            >
              <FiPackage size={15} />
            </div>

            {/* TITLE */}

            <div className="min-w-0">

              <h1
                className={`
                  text-base
                  font-semibold
                  tracking-tight
                  sm:text-lg
                  md:text-xl
                  ${heading}
                `}
              >
                My Orders
              </h1>

              <p
                className={`
                  mt-0.5
                  text-[10px]
                  leading-4
                  sm:text-xs
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
                mt-2.5
                text-[10px]
                sm:text-xs
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
              px-4
              py-10
              text-center
              sm:px-5
              sm:py-12
              ${cardBg}
            `}
          >
            <FiPackage
              size={25}
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
                mt-3
                text-sm
                font-semibold
                sm:text-base
                ${heading}
              `}
            >
              No orders yet
            </h2>

            <p
              className={`
                mx-auto
                mt-1
                max-w-md
                text-[10px]
                leading-5
                sm:text-xs
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

          <div className="space-y-3 sm:space-y-4">

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
                      px-3
                      py-2.5
                      sm:px-4
                      sm:py-3
                      ${border}
                    `}
                  >
                    <div
                      className="
                        grid
                        gap-2.5
                        sm:grid-cols-[1fr_auto]
                        sm:items-center
                      "
                    >

                      {/* ORDER DETAILS */}

                      <div
                        className="
                          grid
                          grid-cols-2
                          gap-3
                          sm:flex
                          sm:flex-wrap
                          sm:items-center
                          sm:gap-5
                        "
                      >

                        {/* ORDER NUMBER */}

                        <div>
                          <p
                            className={`
                              text-[8px]
                              font-medium
                              uppercase
                              tracking-wider
                              sm:text-[9px]
                              ${mutedText}
                            `}
                          >
                            Order
                          </p>

                          <p
                            className={`
                              mt-0.5
                              font-mono
                              text-[10px]
                              sm:text-[11px]
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
                              text-[8px]
                              font-medium
                              uppercase
                              tracking-wider
                              sm:text-[9px]
                              ${mutedText}
                            `}
                          >
                            Date
                          </p>

                          <p
                            className={`
                              mt-0.5
                              text-[10px]
                              sm:text-xs
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
                          gap-1
                          sm:justify-end
                        "
                      >

                        {/* PAYMENT STATUS */}

                        <span
                          className={`
                            rounded-full
                            border
                            px-2
                            py-0.5
                            text-[9px]
                            font-medium
                            sm:px-2.5
                            sm:py-1
                            sm:text-[10px]
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
                            gap-1
                            rounded-full
                            border
                            px-2
                            py-0.5
                            text-[9px]
                            font-medium
                            sm:px-2.5
                            sm:py-1
                            sm:text-[10px]
                            ${status.className}
                          `}
                        >
                          <StatusIcon size={11} />

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
                            grid
                            grid-cols-[auto_1fr_auto]
                            items-center
                            gap-2
                            px-3
                            py-2.5
                            sm:gap-3
                            sm:px-4
                            sm:py-3
                          "
                        >

                          {/* PRODUCT IMAGE */}

                          <div
                            className={`
                              h-10
                              w-10
                              shrink-0
                              overflow-hidden
                              rounded-lg
                              border
                              sm:h-12
                              sm:w-12
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
                                  w-full
                                  items-center
                                  justify-center
                                "
                              >
                                <FiPackage
                                  size={14}
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

                          <div className="min-w-0">

                            <h3
                              className={`
                                truncate
                                text-[11px]
                                font-medium
                                sm:text-xs
                                ${heading}
                              `}
                            >
                              {item.productName ||
                                "Product"}
                            </h3>

                            <p
                              className={`
                                mt-0.5
                                text-[9px]
                                sm:text-[10px]
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
                              text-[11px]
                              font-semibold
                              sm:text-xs
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
                        gap-1
                        border-t
                        py-2
                        text-[10px]
                        font-medium
                        transition-colors
                        sm:py-2.5
                        sm:text-[11px]
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
                            size={12}
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
                            size={12}
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
                      grid
                      grid-cols-2
                      items-center
                      gap-3
                      border-t
                      px-3
                      py-2.5
                      sm:px-4
                      sm:py-3
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
                          text-[8px]
                          font-medium
                          uppercase
                          tracking-wider
                          sm:text-[9px]
                          ${mutedText}
                        `}
                      >
                        Payment
                      </p>

                      <p
                        className={`
                          mt-0.5
                          text-[10px]
                          sm:text-xs
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

                    <div className="text-right">

                      <p
                        className={`
                          text-[8px]
                          font-medium
                          uppercase
                          tracking-wider
                          sm:text-[9px]
                          ${mutedText}
                        `}
                      >
                        Order total
                      </p>

                      <p
                        className={`
                          mt-0.5
                          text-sm
                          font-semibold
                          sm:text-base
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