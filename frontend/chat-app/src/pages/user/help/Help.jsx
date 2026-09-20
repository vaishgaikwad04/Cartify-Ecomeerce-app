import React, { useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

import {
  FiChevronDown,
  FiRefreshCcw,
  FiTruck,
  FiPackage,
  FiHelpCircle,
  FiCheck,
  FiArrowLeft,
  FiArrowRight,
  FiSearch,
  FiMessageCircle,
  FiCreditCard,
  FiClock,
} from "react-icons/fi";

// =====================================================
// HELP DATA
// =====================================================

const helpData = {
  faqs: {
    title: "Frequently Asked Questions",
    description:
      "Quick answers to common questions about orders, payments and deliveries.",
    icon: FiHelpCircle,
  },

  returns: {
    title: "Returns & Refunds",
    description:
      "Learn about return eligibility, refund processing and return requests.",
    icon: FiRefreshCcw,
  },

  shipping: {
    title: "Shipping & Delivery",
    description:
      "Find information about delivery times, shipping charges and addresses.",
    icon: FiTruck,
  },

  orders: {
    title: "Order Status",
    description:
      "Understand each stage of your order from confirmation to delivery.",
    icon: FiPackage,
  },
};

// =====================================================
// FAQ DATA
// =====================================================

const faqData = [
  {
    question: "How can I place an order?",
    answer:
      "Select the products you want, add them to your cart and continue to checkout. Enter your delivery details and complete the payment to place your order.",
    category: "Orders",
  },

  {
    question: "What payment methods do you accept?",
    answer:
      "Payments are securely processed through Stripe. Supported credit cards, debit cards and other available payment methods can be used during checkout.",
    category: "Payments",
  },

  {
    question: "Can I cancel my order?",
    answer:
      "Orders can usually be cancelled before they are shipped. Once the order has entered the shipping process, cancellation may no longer be possible.",
    category: "Orders",
  },

  {
    question: "Where can I see my order status?",
    answer:
      "You can view your current order status from the Orders section of your account.",
    category: "Orders",
  },

  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on your location, product availability and the shipping method selected at checkout.",
    category: "Shipping",
  },

  {
    question: "Can I return a product?",
    answer:
      "Eligible products can be returned according to the applicable return conditions and return period.",
    category: "Returns",
  },

  {
    question: "When will my refund arrive?",
    answer:
      "Once your return has been received and approved, the refund will be sent to your original payment method. Processing time depends on your payment provider.",
    category: "Returns",
  },

  {
    question: "What should I do if my order arrives damaged?",
    answer:
      "Contact support as soon as possible and provide your order details along with clear photographs of the damaged product.",
    category: "Orders",
  },
];

// =====================================================
// RETURNS DATA
// =====================================================

const returnSections = [
  {
    title: "Eligibility",
    text: "Products must meet the applicable return conditions before a return can be approved.",
    points: [
      "Product must be eligible for return.",
      "Product should be unused and in original condition.",
      "Original packaging and accessories should be included where applicable.",
      "Request must be submitted within the return period.",
    ],
  },

  {
    title: "Request a return",
    text: "Return requests can be submitted directly from your Orders section.",
    points: [
      "Open your Orders section.",
      "Select the relevant order.",
      "Choose the return option.",
      "Select a reason and provide details.",
      "Submit the request.",
    ],
  },

  {
    title: "Refunds",
    text: "Approved refunds are returned through the original payment method.",
    points: [
      "Returned products are reviewed after receipt.",
      "Approved refunds are processed automatically.",
      "Your payment provider may require additional processing time.",
    ],
  },

  {
    title: "Restrictions",
    text: "Some products may have additional return restrictions.",
    points: [
      "Used or damaged products may not qualify.",
      "Missing packaging may affect eligibility.",
      "Some product categories may be non-returnable.",
    ],
  },
];

// =====================================================
// SHIPPING DATA
// =====================================================

const shippingSections = [
  {
    title: "Order processing",
    description:
      "Orders are processed after successful payment confirmation. Processing time may vary depending on product availability.",
  },

  {
    title: "Delivery estimates",
    description:
      "Delivery time depends on your location and selected shipping method. Your order page contains the latest available information.",
  },

  {
    title: "Shipping charges",
    description:
      "Applicable shipping charges are calculated during checkout and may depend on the delivery location and order.",
  },

  {
    title: "Delivery address",
    description:
      "Make sure your shipping address and contact information are correct before completing your order.",
  },

  {
    title: "Delayed delivery",
    description:
      "Courier issues, weather, holidays and other circumstances can occasionally affect delivery times.",
  },

  {
    title: "Incorrect address",
    description:
      "Contact support immediately if you notice an incorrect address. Changes may not be possible once an order has shipped.",
  },
];

// =====================================================
// ORDER STATUS DATA
// =====================================================

const orderStatuses = [
  {
    status: "Pending",
    description:
      "Your order has been received and is waiting for confirmation.",
  },

  {
    status: "Confirmed",
    description:
      "Your payment has been confirmed and your order is being prepared.",
  },

  {
    status: "Processing",
    description: "Your order is currently being prepared for shipment.",
  },

  {
    status: "Shipped",
    description: "Your package has been handed over to the shipping carrier.",
  },

  {
    status: "Out for Delivery",
    description:
      "Your package is currently on its way to your delivery address.",
  },

  {
    status: "Delivered",
    description: "Your order has been successfully delivered.",
  },
];

// =====================================================
// THEME
// =====================================================

const getTheme = (theme) => {
  const normalizedTheme = theme?.toString().toLowerCase();

  return {
    isDark: normalizedTheme === "dark" || normalizedTheme === "dark mode",
  };
};

// =====================================================
// COMMON STYLES
// =====================================================


const styles = {
  // =====================================================
  // PAGE
  // =====================================================

  page: (isDark) =>
    isDark
      ? "bg-[#111111] text-white"
      : "bg-[#f8f8f8] text-gray-900",

  // =====================================================
  // CARD
  // =====================================================

  card: (isDark) =>
    isDark
      ? "border-[#292929] bg-[#191919]"
      : "border-gray-200 bg-white",

  // =====================================================
  // CARD HOVER
  // =====================================================

  cardHover: (isDark) =>
    isDark
      ? "hover:border-[#363636] hover:bg-[#1d1d1d]"
      : "hover:border-gray-300 hover:shadow-sm",

  // =====================================================
  // MUTED TEXT
  // =====================================================

  muted: (isDark) =>
    isDark
      ? "text-gray-400"
      : "text-gray-500",

  // =====================================================
  // MAIN HEADING
  // =====================================================

  heading: (isDark) =>
    isDark
      ? "text-gray-100"
      : "text-gray-950",

  // =====================================================
  // BORDER
  // =====================================================

  border: (isDark) =>
    isDark
      ? "border-[#292929]"
      : "border-gray-200",

  // =====================================================
  // ICON BOX
  // =====================================================

  iconBox: (isDark) =>
    isDark
      ? "border-[#303030] bg-[#202020] text-gray-200"
      : "border-gray-200 bg-gray-50 text-gray-700",
};


// =====================================================
// PAGE WRAPPER
// =====================================================

// =====================================================
// PAGE WRAPPER
// =====================================================

const HelpPageWrapper = ({ isDark, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${styles.page(
        isDark,
      )}`}
    >
      <div className="mx-auto w-full max-w-[1800px] px-5 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* PAGE CONTENT */}
        <div className="mt-8">
          {children}
        </div>

        {/* =================================================
            BACK TO HELP
        ================================================= */}

        {location.pathname !== "/help" && (
          <div className="mt-10 flex justify-start">
            <button
              type="button"
              onClick={() => navigate("/help")}
              className={`
                group
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                px-4
                py-3
                text-sm
                font-medium
                transition-all
                duration-300

                ${
                  isDark
                    ? `
                      border-[#3a3c40]
                      bg-[#202124]
                      text-gray-400
                      hover:border-[#50535a]
                      hover:bg-[#292b2f]
                      hover:text-white
                      hover:shadow-md
                    `
                    : `
                      border-gray-200
                      bg-white
                      text-gray-500
                      hover:border-gray-300
                      hover:bg-gray-50
                      hover:text-gray-900
                      hover:shadow-md
                    `
                }
              `}
            >
              <FiArrowLeft
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-x-1
                "
              />

              <span>Back to Help</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// =====================================================
// PAGE HEADER
// =====================================================

const PageHeader = ({ isDark, icon, title, description }) => {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${styles.iconBox(
            isDark,
          )}`}
        >
          {icon}
        </div>

        <div>
          <h1
            className={`text-2xl font-bold tracking-tight sm:text-3xl ${styles.heading(
              isDark,
            )}`}
          >
            {title}
          </h1>

          <p
            className={`mt-1.5 max-w-2xl text-sm leading-6 ${styles.muted(
              isDark,
            )}`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// HELP HOME
// =====================================================

const HelpHome = ({ isDark }) => {
  const navigate = useNavigate();

  const handleSelect = (key) => {
    navigate(`/help/${key === "faqs" ? "faq" : key}`);
  };

  return (
    <HelpPageWrapper isDark={isDark}>
      {/* =================================================
          HERO
      ================================================= */}

      <section className="w-full">
        <div className="flex items-start gap-4">
          {/* ICON */}

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${styles.iconBox(
              isDark,
            )}`}
          >
            <FiHelpCircle size={22} />
          </div>

          {/* TITLE */}

          <div>
            <h1
              className={`text-2xl font-semibold font-serif-sarif tracking-tight sm:text-3xl ${styles.heading(
                isDark,
              )}`}
            >
              How can we help?
            </h1>

            <p
              className={`mt-2 max-w-2xl text-sm leading-6 ${styles.muted(
                isDark,
              )}`}
            >
              Find answers about your orders, payments, returns and deliveries.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================
          CATEGORIES
      ================================================= */}

      {
        <>
          <section className="mt-12 w-full">
            {/* CATEGORY GRID */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.entries(helpData).map(([key, item]) => {
                const Icon = item.icon;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelect(key)}
                    className={`group rounded-2xl border p-5 text-left transition-all duration-200 sm:p-6 ${styles.card(
                      isDark,
                    )} ${styles.cardHover(isDark)}`}
                  >
                    {/* TOP */}

                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl border ${styles.iconBox(
                          isDark,
                        )}`}
                      >
                        <Icon size={19} />
                      </div>

                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                          isDark
                            ? "bg-[#292b2f] text-gray-500 group-hover:bg-[#34363a] group-hover:text-gray-200"
                            : "bg-gray-50 text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-700"
                        }`}
                      >
                        <FiArrowRight
                          size={15}
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>

                    {/* TITLE */}

                    <h3
                      className={`mt-5 text-base font-semibold ${styles.heading(
                        isDark,
                      )}`}
                    >
                      {item.title}
                    </h3>

                    {/* DESCRIPTION */}

                    <p
                      className={`mt-2 max-w-xl text-sm leading-6 ${styles.muted(
                        isDark,
                      )}`}
                    >
                      {item.description}
                    </p>

                    {/* LINK */}

                    <div
                      className={`mt-5 inline-flex items-center gap-2 text-xs font-semibold ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      View details
                      <FiArrowRight
                        size={13}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      }
    </HelpPageWrapper>
  );
};

// =====================================================
// QUICK HELP CARD
// =====================================================

const QuickHelpCard = ({ isDark, icon, title, description }) => {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl border p-4 transition-colors ${styles.card(
        isDark,
      )} ${styles.cardHover(isDark)}`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles.iconBox(
          isDark,
        )}`}
      >
        {icon}
      </div>

      <div>
        <p
          className={`text-sm font-semibold ${
            isDark ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {title}
        </p>

        <p className={`mt-0.5 text-xs ${styles.muted(isDark)}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

// =====================================================
// FAQ PAGE
// =====================================================

const FAQPage = ({ isDark }) => {
  const [open, setOpen] = useState(null);

  return (
    <HelpPageWrapper isDark={isDark}>
      <PageHeader
        isDark={isDark}
        icon={<FiHelpCircle size={20} />}
        title="Frequently Asked Questions"
        description="Answers to common questions about your orders, payments and deliveries."
      />

      <div
        className={`overflow-hidden rounded-2xl border ${styles.card(isDark)}`}
      >
        {faqData.map((item, index) => {
          const active = open === index;

          return (
            <div
              key={item.question}
              className={`border-b last:border-b-0 ${
                isDark ? "border-[#34363a]" : "border-gray-100"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(active ? null : index)}
                className={`flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors sm:px-6 ${
                  isDark ? "hover:bg-[#27282b]" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex min-w-0 items-start gap-4">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${styles.iconBox(
                      isDark,
                    )}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <span
                      className={`block pt-1 text-sm font-semibold ${
                        active
                          ? isDark
                            ? "text-white"
                            : "text-gray-950"
                          : isDark
                            ? "text-gray-200"
                            : "text-gray-800"
                      }`}
                    >
                      {item.question}
                    </span>

                    <span
                      className={`mt-1 block text-[11px] ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                    active
                      ? isDark
                        ? "bg-[#3a3c40] text-white"
                        : "bg-gray-900 text-white"
                      : isDark
                        ? "bg-[#292b2f] text-gray-500"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <FiChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${
                      active ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              {active && (
                <div className="px-5 pb-6 pl-16 pr-8 sm:px-6 sm:pl-[4.5rem]">
                  <p
                    className={`max-w-3xl text-sm leading-7 ${styles.muted(
                      isDark,
                    )}`}
                  >
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </HelpPageWrapper>
  );
};

// =====================================================
// RETURNS PAGE
// =====================================================

const ReturnsPage = ({ isDark }) => {
  return (
    <HelpPageWrapper isDark={isDark}>
      <PageHeader
        isDark={isDark}
        icon={<FiRefreshCcw size={20} />}
        title="Returns & Refunds"
        description="Everything you need to know about returns, refunds and eligibility."
      />

      <div
        className={`overflow-hidden rounded-2xl border ${styles.card(isDark)}`}
      >
        {returnSections.map((section, index) => (
          <section
            key={section.title}
            className={`grid gap-6 border-b p-5 last:border-b-0 sm:p-6 md:grid-cols-[220px_1fr] ${
              isDark ? "border-[#34363a]" : "border-gray-100"
            }`}
          >
            <div>
              <div
                className={`mb-2 text-[10px] font-bold tracking-[0.16em] ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                SECTION {String(index + 1).padStart(2, "0")}
              </div>

              <h2 className={`text-sm font-semibold ${styles.heading(isDark)}`}>
                {section.title}
              </h2>
            </div>

            <div>
              <p className={`text-sm leading-7 ${styles.muted(isDark)}`}>
                {section.text}
              </p>

              <ul className="mt-5 space-y-3">
                {section.points.map((point) => (
                  <li
                    key={point}
                    className={`flex items-start gap-3 text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        isDark
                          ? "bg-[#292b2f] text-gray-300"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <FiCheck size={11} />
                    </span>

                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </HelpPageWrapper>
  );
};

// =====================================================
// SHIPPING PAGE
// =====================================================

const ShippingPage = ({ isDark }) => {
  return (
    <HelpPageWrapper isDark={isDark}>
      <PageHeader
        isDark={isDark}
        icon={<FiTruck size={20} />}
        title="Shipping & Delivery"
        description="Delivery information, shipping charges and address requirements."
      />

      <div
        className={`overflow-hidden rounded-2xl border ${styles.card(isDark)}`}
      >
        {shippingSections.map((section, index) => (
          <section
            key={section.title}
            className={`grid gap-6 border-b p-5 last:border-b-0 sm:p-6 md:grid-cols-[220px_1fr] ${
              isDark ? "border-[#34363a]" : "border-gray-100"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${styles.iconBox(
                  isDark,
                )}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h2
                className={`pt-1.5 text-sm font-semibold ${styles.heading(
                  isDark,
                )}`}
              >
                {section.title}
              </h2>
            </div>

            <p
              className={`max-w-3xl text-sm leading-7 ${styles.muted(isDark)}`}
            >
              {section.description}
            </p>
          </section>
        ))}
      </div>
    </HelpPageWrapper>
  );
};

// =====================================================
// ORDER STATUS PAGE
// =====================================================

const OrdersPage = ({ isDark }) => {
  return (
    <HelpPageWrapper isDark={isDark}>
      <PageHeader
        isDark={isDark}
        icon={<FiPackage size={20} />}
        title="Order Status"
        description="Understand each stage of your order from confirmation to delivery."
      />

      <div className={`rounded-2xl border p-5 sm:p-7 ${styles.card(isDark)}`}>
        {orderStatuses.map((item, index) => {
          const last = index === orderStatuses.length - 1;

          return (
            <div key={item.status} className="relative flex gap-5">
              {!last && (
                <div
                  className={`absolute left-[11px] top-7 h-[calc(100%-12px)] w-px ${
                    isDark ? "bg-[#3a3c40]" : "bg-gray-200"
                  }`}
                />
              )}

              <div
                className={`relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                  isDark
                    ? "border-[#4a4c51] bg-[#202124]"
                    : "border-gray-300 bg-white"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    isDark ? "bg-gray-300" : "bg-gray-600"
                  }`}
                />
              </div>

              <div className={last ? "" : "pb-9"}>
                <div className="flex flex-wrap items-center gap-2">
                  <h2
                    className={`text-sm font-semibold ${styles.heading(
                      isDark,
                    )}`}
                  >
                    {item.status}
                  </h2>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      isDark
                        ? "bg-[#292b2f] text-gray-500"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    Step {index + 1}
                  </span>
                </div>

                <p
                  className={`mt-1 max-w-2xl text-sm leading-7 ${styles.muted(
                    isDark,
                  )}`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </HelpPageWrapper>
  );
};

// =====================================================
// MAIN HELP COMPONENT
// =====================================================

const Help = () => {
  const { theme } = useContext(ThemeContext);

  const { isDark } = getTheme(theme);

  const location = useLocation();

  const path = location.pathname;

  // FAQ
  if (path === "/help/faq") {
    return <FAQPage isDark={isDark} />;
  }

  // RETURNS
  if (path === "/help/returns") {
    return <ReturnsPage isDark={isDark} />;
  }

  // SHIPPING
  if (path === "/help/shipping") {
    return <ShippingPage isDark={isDark} />;
  }

  // ORDERS
  if (path === "/help/orders") {
    return <OrdersPage isDark={isDark} />;
  }

  // HOME
  return <HelpHome isDark={isDark} />;
};

export default Help;
