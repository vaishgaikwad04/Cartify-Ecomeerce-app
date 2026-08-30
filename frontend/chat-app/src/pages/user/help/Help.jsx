
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

import {
  FiChevronDown,
  FiRefreshCcw,
  FiTruck,
  FiPackage,
  FiHelpCircle,
  FiCheck,
} from "react-icons/fi";

// =====================================================
// HELP DATA
// =====================================================

const helpData = {
  faqs: {
    title: "Frequently Asked Questions",
    description:
      "Answers to the most common questions about your orders, payments and deliveries.",
    icon: FiHelpCircle,
  },

  returns: {
    title: "Returns & Refunds",
    description:
      "Everything you need to know about returns, refunds and eligibility.",
    icon: FiRefreshCcw,
  },

  shipping: {
    title: "Shipping & Delivery",
    description:
      "Delivery information, shipping charges and address requirements.",
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
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Payments are securely processed through Stripe. Supported credit cards, debit cards and other available payment methods can be used during checkout.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Orders can usually be cancelled before they are shipped. Once the order has entered the shipping process, cancellation may no longer be possible.",
  },
  {
    question: "Where can I see my order status?",
    answer:
      "You can view your current order status from the Orders section of your account.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on your location, product availability and the shipping method selected at checkout.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Eligible products can be returned according to the applicable return conditions and return period.",
  },
  {
    question: "When will my refund arrive?",
    answer:
      "Once your return has been received and approved, the refund will be sent to your original payment method. Processing time depends on your payment provider.",
  },
  {
    question: "What should I do if my order arrives damaged?",
    answer:
      "Contact support as soon as possible and provide your order details along with clear photographs of the damaged product.",
  },
];

// =====================================================
// RETURNS
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
// SHIPPING
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
// ORDER STATUS
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
    description:
      "Your order is currently being prepared for shipment.",
  },
  {
    status: "Shipped",
    description:
      "Your package has been handed over to the shipping carrier.",
  },
  {
    status: "Out for Delivery",
    description:
      "Your package is currently on its way to your delivery address.",
  },
  {
    status: "Delivered",
    description:
      "Your order has been successfully delivered.",
  },
];

// =====================================================
// FAQ
// =====================================================

const FAQSection = ({ isDark }) => {
  const [open, setOpen] = useState(null);

  return (
    <div
      className={`divide-y ${
        isDark ? "divide-white/[0.07]" : "divide-gray-200"
      }`}
    >
      {faqData.map((item, index) => {
        const active = open === index;

        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(active ? null : index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <div className="flex items-start gap-5">
                <span
                  className={`pt-0.5 text-xs tabular-nums ${
                    isDark ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className={`text-[15px] font-medium ${
                    active
                      ? isDark
                        ? "text-white"
                        : "text-gray-950"
                      : isDark
                      ? "text-gray-300"
                      : "text-gray-800"
                  }`}
                >
                  {item.question}
                </span>
              </div>

              <FiChevronDown
                className={`shrink-0 transition-transform duration-200 ${
                  active ? "rotate-180" : ""
                } ${isDark ? "text-gray-500" : "text-gray-400"}`}
              />
            </button>

            {active && (
              <div className="pb-6 pl-10 pr-8">
                <p
                  className={`max-w-2xl text-sm leading-7 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// =====================================================
// RETURNS
// =====================================================

const ReturnsSection = ({ isDark }) => {
  return (
    <div
      className={`divide-y ${
        isDark ? "divide-white/[0.07]" : "divide-gray-200"
      }`}
    >
      {returnSections.map((section) => (
        <section key={section.title} className="py-8 first:pt-2">
          <div className="grid gap-5 md:grid-cols-[220px_1fr]">
            <div>
              <h2
                className={`text-sm font-semibold ${
                  isDark ? "text-white" : "text-gray-950"
                }`}
              >
                {section.title}
              </h2>
            </div>

            <div>
              <p
                className={`text-sm leading-6 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {section.text}
              </p>

              <ul className="mt-5 space-y-3">
                {section.points.map((point) => (
                  <li
                    key={point}
                    className={`flex gap-3 text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <FiCheck
                      className={`mt-0.5 shrink-0 ${
                        isDark
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    />

                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

// =====================================================
// SHIPPING
// =====================================================

const ShippingSection = ({ isDark }) => {
  return (
    <div
      className={`divide-y ${
        isDark ? "divide-white/[0.07]" : "divide-gray-200"
      }`}
    >
      {shippingSections.map((section) => (
        <section
          key={section.title}
          className="grid gap-4 py-7 first:pt-2 md:grid-cols-[220px_1fr]"
        >
          <h2
            className={`text-sm font-semibold ${
              isDark ? "text-white" : "text-gray-950"
            }`}
          >
            {section.title}
          </h2>

          <p
            className={`max-w-2xl text-sm leading-7 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {section.description}
          </p>
        </section>
      ))}
    </div>
  );
};

// =====================================================
// ORDER STATUS
// =====================================================

const OrderStatusSection = ({ isDark }) => {
  return (
    <div>
      {orderStatuses.map((item, index) => {
        const last = index === orderStatuses.length - 1;

        return (
          <div
            key={item.status}
            className="relative flex gap-5"
          >
            {!last && (
              <div
                className={`absolute left-[5px] top-3 h-full w-px ${
                  isDark
                    ? "bg-white/[0.08]"
                    : "bg-gray-200"
                }`}
              />
            )}

            <div
              className={`relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full ${
                isDark ? "bg-gray-400" : "bg-gray-900"
              }`}
            />

            <div className={last ? "" : "pb-9"}>
              <h2
                className={`text-sm font-semibold ${
                  isDark ? "text-white" : "text-gray-950"
                }`}
              >
                {item.status}
              </h2>

              <p
                className={`mt-1 text-sm leading-6 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// =====================================================
// MAIN
// =====================================================

const Help = ({ type = "faqs" }) => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  const data = helpData[type] || helpData.faqs;

  const Icon = data.icon;

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">

        {/* HEADER */}

        <header
          className={`border-b pb-8 ${
            isDark
              ? "border-white/[0.08]"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon
              className={`text-lg ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />

            <h1
              className={`text-2xl font-semibold tracking-tight ${
                isDark ? "text-white" : "text-gray-950"
              }`}
            >
              {data.title}
            </h1>
          </div>

          <p
            className={`mt-3 max-w-2xl text-sm leading-6 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {data.description}
          </p>
        </header>

        {/* CONTENT */}

        <div className="pt-8">
          {type === "faqs" && (
            <FAQSection isDark={isDark} />
          )}

          {type === "returns" && (
            <ReturnsSection isDark={isDark} />
          )}

          {type === "shipping" && (
            <ShippingSection isDark={isDark} />
          )}

          {type === "orders" && (
            <OrderStatusSection isDark={isDark} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Help;
