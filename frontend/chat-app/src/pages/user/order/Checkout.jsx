
import {
  FiMapPin,
  FiCheck,
  FiPlus,
  FiArrowLeft,
} from "react-icons/fi";

import { useAddress } from "../../../hooks/user/useAddress";
import { useCheckout } from "../../../hooks/user/useCheckout";
import { useCart } from "../../../context/CartContext";

import Button from "../../../components/ui/Button";

const Checkout = () => {
  // ================= ADDRESS =================
  const {
    addresses = [],
    loading: addressLoading,
  } = useAddress();

  // ================= CART =================
  const {
    cartData = [],
    totalPrice = 0,
  } = useCart();

  // ================= CHECKOUT =================
  const {
    isDark,
    navigate,
    selectedAddressId,
    handleSelectAddress,
    paymentLoading,
    handlePayment,
  } = useCheckout();

  // ================= THEME CLASSES =================
  const pageBg = isDark
    ? "bg-gray-950 text-white"
    : "bg-white text-gray-900";

  const cardBg = isDark
    ? "border-white/[0.08] bg-gray-900"
    : "border-gray-200 bg-white";

  const heading = isDark
    ? "text-gray-100"
    : "text-gray-900";

  const bodyText = isDark
    ? "text-gray-400"
    : "text-gray-500";

  const secondaryText = isDark
    ? "text-gray-300"
    : "text-gray-700";

  const border = isDark
    ? "border-white/[0.08]"
    : "border-gray-200";

  const mutedBg = isDark
    ? "bg-gray-800"
    : "bg-gray-50";

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN");

  return (
    <main
      className={`
        min-h-screen
        px-3 py-6
        sm:px-4 sm:py-8
        lg:px-6 lg:py-10
        transition-colors duration-300
        ${pageBg}
      `}
    >
      <div className="mx-auto w-full max-w-[1800px]">

        {/* ================= PAGE HEADER ================= */}
        <header className="mb-6 sm:mb-8">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`
              mb-4
              flex
              items-center
              gap-2
              text-xs
              sm:text-sm
              transition-colors
              ${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }
            `}
          >
            <FiArrowLeft size={15} />
            Back to cart
          </button>

          <h1 className={`text-xl font-semibold tracking-tight sm:text-2xl ${heading}`}>
            Checkout
          </h1>

          <p className={`mt-1.5 text-xs sm:text-sm ${bodyText}`}>
            Select your delivery address and continue to secure payment.
          </p>
        </header>

        {/* ================= CHECKOUT CONTENT ================= */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3 lg:gap-6">

          {/* ================= ADDRESS SECTION ================= */}
          <section className="lg:col-span-2">
            <div className={`rounded-xl border p-4 sm:p-5 lg:p-6 ${cardBg}`}>

              {/* ADDRESS HEADER */}
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className={`text-base font-semibold sm:text-lg ${heading}`}>
                    Delivery Address
                  </h2>

                  <p className={`mt-1 text-xs sm:text-sm ${bodyText}`}>
                    Choose your preferred delivery location.
                  </p>
                </div>

                <div
                  className={`
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-lg
                    ${mutedBg}
                    ${secondaryText}
                  `}
                >
                  <FiMapPin size={17} />
                </div>
              </div>

              {/* ADDRESS LOADING */}
              {addressLoading ? (
                <div className="space-y-3 animate-pulse">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className={`h-28 rounded-lg ${mutedBg}`}
                    />
                  ))}
                </div>
              ) : addresses.length === 0 ? (

                /* ================= NO ADDRESS ================= */
                <div
                  className={`
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-lg
                    border
                    px-4 py-10
                    text-center
                    ${border}
                  `}
                >
                  <FiMapPin
                    size={27}
                    className={bodyText}
                  />

                  <h3 className={`mt-3 text-sm font-semibold ${heading}`}>
                    No address found
                  </h3>

                  <p className={`mt-1.5 max-w-sm text-xs leading-relaxed ${bodyText}`}>
                    Add a delivery address before placing your order.
                  </p>

                  <Button
                    className="mt-4"
                    label="Add Address"
                    icon={<FiPlus />}
                    onClick={() => navigate("/addresses")}
                    variant={isDark ? "secondary" : "primary"}
                  />
                </div>
              ) : (

                /* ================= ADDRESS LIST ================= */
                <div className="space-y-3">
                  {addresses.map((address) => {
                    const selected =
                      selectedAddressId === address._id;

                    return (
                      <button
                        key={address._id}
                        type="button"
                        onClick={() => handleSelectAddress(address._id)}
                        className={`
                          w-full
                          rounded-lg
                          border
                          p-3.5
                          text-left
                          transition-all
                          duration-200
                          sm:p-4
                          ${
                            selected
                              ? isDark
                                ? "border-gray-400 bg-gray-800/70"
                                : "border-gray-900 bg-gray-50"
                              : isDark
                                ? "border-white/[0.08] bg-gray-900 hover:border-gray-600"
                                : "border-gray-200 bg-white hover:border-gray-400"
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">

                          {/* SELECTED INDICATOR */}
                          <div
                            className={`
                              mt-0.5
                              flex h-5 w-5 shrink-0
                              items-center justify-center
                              rounded-full border
                              ${
                                selected
                                  ? "border-gray-900 bg-gray-900"
                                  : isDark
                                    ? "border-gray-600"
                                    : "border-gray-400"
                              }
                            `}
                          >
                            {selected && (
                              <FiCheck
                                size={12}
                                className="text-white"
                              />
                            )}
                          </div>

                          {/* ADDRESS DETAILS */}
                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className={`text-sm font-semibold ${heading}`}>
                                {address.fullName}
                              </h3>

                              {address.isDefault && (
                                <span
                                  className={`
                                    rounded-full
                                    px-2 py-0.5
                                    text-[9px]
                                    font-medium
                                    ${
                                      isDark
                                        ? "bg-green-400/10 text-green-400"
                                        : "bg-green-50 text-green-700"
                                    }
                                  `}
                                >
                                  Default
                                </span>
                              )}

                              {selected && (
                                <span className="text-[9px] font-medium text-green-500">
                                  Selected
                                </span>
                              )}
                            </div>

                            <p className={`mt-1 text-xs ${secondaryText}`}>
                              {address.phone}
                            </p>

                            <p className={`mt-2 text-xs leading-5 ${bodyText}`}>
                              {address.addressLine}
                              <br />
                              {address.city}, {address.state}
                              <br />
                              {address.postalCode}, {address.country}
                            </p>

                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* ================= ORDER SUMMARY ================= */}
          <aside>
            <div
              className={`
                rounded-xl
                border
                p-4
                sm:p-5
                lg:sticky
                lg:top-6
                ${cardBg}
              `}
            >

              {/* SUMMARY HEADER */}
              <div className="flex items-center justify-between">
                <h2 className={`text-base font-semibold ${heading}`}>
                  Order Summary
                </h2>

                <span className={`text-xs ${bodyText}`}>
                  {cartData.length}{" "}
                  {cartData.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* CART ITEMS */}
              <div className="mt-5 space-y-4">
                {cartData.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex items-center gap-3"
                  >

                    {/* PRODUCT IMAGE */}
                    <div
                      className={`
                        h-12 w-12
                        shrink-0
                        overflow-hidden
                        rounded-lg
                        ${mutedBg}
                      `}
                    >
                      {item.productImage ? (
                        <img
                          src={item.productImage}
                          alt={item.productName || "Product"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <FiMapPin className={bodyText} size={15} />
                        </div>
                      )}
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-xs font-medium ${heading}`}
                        title={item.productName}
                      >
                        {item.productName}
                      </p>

                      <p className={`mt-1 text-[10px] ${bodyText}`}>
                        Qty: {item.quantity}
                        {item.size && ` · Size: ${item.size}`}
                      </p>
                    </div>

                    {/* PRODUCT PRICE */}
                    <span className={`shrink-0 text-xs font-medium ${heading}`}>
                      ₹
                      {formatPrice(
                        Number(item.productPrice) *
                        Number(item.quantity)
                      )}
                    </span>

                  </div>
                ))}
              </div>

              {/* DIVIDER */}
              <div className={`my-5 border-t ${border}`} />

              {/* SUBTOTAL */}
              <div className="flex justify-between text-xs">
                <span className={bodyText}>Subtotal</span>
                <span className={secondaryText}>
                  ₹{formatPrice(totalPrice)}
                </span>
              </div>

              {/* SHIPPING */}
              <div className="mt-3 flex justify-between text-xs">
                <span className={bodyText}>Shipping</span>
                <span className="font-medium text-green-500">
                  Free
                </span>
              </div>

              {/* DIVIDER */}
              <div className={`my-5 border-t ${border}`} />

              {/* TOTAL */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${heading}`}>
                  Total
                </span>

                <span className={`text-lg font-semibold ${heading}`}>
                  ₹{formatPrice(totalPrice)}
                </span>
              </div>

              {/* PAYMENT BUTTON */}
              <Button
                className="mt-5 w-full"
                variant={isDark ? "secondary" : "primary"}
                label={
                  paymentLoading
                    ? "Processing..."
                    : "Continue to Payment"
                }
                onClick={handlePayment}
                disabled={
                  paymentLoading ||
                  !selectedAddressId ||
                  addressLoading ||
                  cartData.length === 0
                }
              />

              {/* ADDRESS VALIDATION MESSAGE */}
              {!selectedAddressId && addresses.length > 0 && (
                <p className={`mt-3 text-center text-[10px] ${bodyText}`}>
                  Please select a delivery address to continue.
                </p>
              )}

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
};

export default Checkout;
