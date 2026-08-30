import {
  FiMapPin,
  FiCheck,
  FiPlus,
  FiArrowLeft,
  FiShoppingBag,
} from "react-icons/fi";

import { useAddress } from "../../../hooks/user/useAddress";
import { useCart } from "../../../hooks/user/useCart";
import { useCheckout } from "../../../hooks/user/useCheckout";

import Button from "../../../components/ui/Button";

const Checkout = () => {
  // Get address data.
  const { addresses = [], loading: addressLoading } = useAddress();

  // Get cart data and total price.
  const { cartData = [], totalPrice = 0 } = useCart();

  // Get checkout state and actions.
  const {
    isDark,
    navigate,
    selectedAddressId,
    handleSelectAddress,
    paymentLoading,
    handlePayment,
  } = useCheckout();

  return (
    <main
      className={`
        min-h-screen
        px-4
        py-6
        transition-colors
        duration-300
        sm:px-6
        sm:py-8
        lg:px-8

        ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}
      `}
    >
      {/* Main checkout container */}
      <div className="mx-auto w-full max-w-[1800px]">
        {/* Checkout header */}
        <header className="mb-6 sm:mb-8">
          {/* Back to cart */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`
              mb-4
              flex
              items-center
              gap-2
              text-sm
              transition-colors

              ${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }
            `}
          >
            <FiArrowLeft size={16} />
            Back to cart
          </button>

          {/* Page title */}
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Checkout
          </h1>

          {/* Page description */}
          <p
            className={`
              mt-2
              max-w-xl
              text-sm

              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
          >
            Select your delivery address and continue to secure payment.
          </p>
        </header>

        {/* Checkout content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Address section */}
          <section className="lg:col-span-2">
            <div
              className={`
                rounded-2xl
                border
                p-4
                sm:p-6

                ${
                  isDark
                    ? "border-gray-800 bg-gray-900"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              {/* Address heading */}
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Delivery Address</h2>

                  <p
                    className={`
                      mt-1
                      text-sm

                      ${isDark ? "text-gray-400" : "text-gray-500"}
                    `}
                  >
                    Select where you want your order delivered.
                  </p>
                </div>

                {/* Location icon */}
                <div
                  className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg

                    ${
                      isDark
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }
                  `}
                >
                  <FiMapPin size={18} />
                </div>
              </div>

              {/* Show loading state */}
              {addressLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className={`
                        h-32
                        animate-pulse
                        rounded-xl

                        ${isDark ? "bg-gray-800" : "bg-gray-100"}
                      `}
                    />
                  ))}
                </div>
              ) : addresses.length === 0 ? (
                /* Show message when no address exists */
                <div
                  className={`
                    rounded-xl
                    border
                    px-5
                    py-12
                    text-center

                    ${isDark ? "border-gray-700" : "border-gray-200"}
                  `}
                >
                  <FiMapPin
                    className={`
                      mx-auto
                      text-3xl

                      ${isDark ? "text-gray-600" : "text-gray-400"}
                    `}
                  />

                  <h3 className="mt-4 font-semibold">No address found</h3>

                  <p
                    className={`
                      mx-auto
                      mt-2
                      max-w-sm
                      text-sm

                      ${isDark ? "text-gray-400" : "text-gray-500"}
                    `}
                  >
                    Add a delivery address before placing your order.
                  </p>

                  {/* Go to address page */}
                  <Button
                    className="mt-5"
                    label="Add Address"
                    icon={<FiPlus />}
                    onClick={() => navigate("/addresses")}
                    variant={isDark ? "secondary" : "primary"}
                  />
                </div>
              ) : (
                /* Show available addresses */
                <div className="space-y-3">
                  {addresses.map((address) => {
                    // Check whether this address is selected.
                    const selected = selectedAddressId === address._id;

                    return (
                      <button
                        key={address._id}
                        type="button"
                        onClick={() => handleSelectAddress(address._id)}
                        className={`
                          w-full
                          rounded-xl
                          border
                          p-4
                          text-left
                          transition-all
                          duration-200
                          sm:p-5

                          ${
                            selected
                              ? isDark
                                ? "border-white bg-gray-800"
                                : "border-gray-900 bg-gray-50"
                              : isDark
                                ? "border-gray-800 bg-gray-900 hover:border-gray-600"
                                : "border-gray-200 bg-white hover:border-gray-300"
                          }
                        `}
                      >
                        <div className="flex gap-3 sm:gap-4">
                          {/* Selected address indicator */}
                          <div
                            className={`
                              mt-1
                              flex
                              h-5
                              w-5
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border

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
                              <FiCheck className="text-white" size={12} />
                            )}
                          </div>

                          {/* Address information */}
                          <div className="min-w-0 flex-1">
                            {/* Name and default label */}
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold">
                                {address.fullName}
                              </h3>

                              {address.isDefault && (
                                <span
                                  className={`
                                    rounded-full
                                    px-2
                                    py-0.5
                                    text-[10px]
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
                            </div>

                            {/* Phone number */}
                            <p
                              className={`
                                mt-1
                                text-sm

                                ${isDark ? "text-gray-300" : "text-gray-700"}
                              `}
                            >
                              {address.phone}
                            </p>

                            {/* Full address */}
                            <p
                              className={`
                                mt-2
                                text-sm
                                leading-6

                                ${isDark ? "text-gray-400" : "text-gray-600"}
                              `}
                            >
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

          {/* Order summary */}
          <aside>
            <div
              className={`
                rounded-2xl
                border
                p-4
                sm:p-6
                lg:sticky
                lg:top-6

                ${
                  isDark
                    ? "border-gray-800 bg-gray-900"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              {/* Summary heading */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Order Summary</h2>

                <span
                  className={`
                    text-xs

                    ${isDark ? "text-gray-400" : "text-gray-500"}
                  `}
                >
                  {cartData.length} {cartData.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Cart products */}
              <div className="mt-6 space-y-4">
                {cartData.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    {/* Product image */}
                    <div
                      className={`
                        h-14
                        w-14
                        shrink-0
                        overflow-hidden
                        rounded-lg

                        ${isDark ? "bg-gray-800" : "bg-gray-100"}
                      `}
                    >
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product details */}
                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-sm font-medium"
                        title={item.productName}
                      >
                        {item.productName}
                      </p>

                      <p
                        className={`
                          mt-1
                          text-xs

                          ${isDark ? "text-gray-400" : "text-gray-500"}
                        `}
                      >
                        Qty: {item.quantity}
                      </p>
                    </div>

                    {/* Product total */}
                    <span className="shrink-0 text-sm font-medium">
                      ₹
                      {(
                        Number(item.productPrice) * Number(item.quantity)
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <hr
                className={`
                  my-5

                  ${isDark ? "border-gray-700" : "border-gray-200"}
                `}
              />

              {/* Subtotal */}
              <div className="flex justify-between text-sm">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Subtotal
                </span>

                <span>₹{Number(totalPrice).toLocaleString("en-IN")}</span>
              </div>

              {/* Shipping */}
              <div className="mt-3 flex justify-between text-sm">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Shipping
                </span>

                <span className="text-green-500">Free</span>
              </div>

              {/* Divider */}
              <hr
                className={`
                  my-5

                  ${isDark ? "border-gray-700" : "border-gray-200"}
                `}
              />

              {/* Final total */}
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>

                <span className="text-xl font-semibold">
                  ₹{Number(totalPrice).toLocaleString("en-IN")}
                </span>
              </div>

              {/* Payment button */}
              <Button
                className="mt-6 w-full"
                variant={isDark ? "secondary" : "primary"}
                label={paymentLoading ? "Processing..." : "Continue to Payment"}
                onClick={handlePayment}
                disabled={paymentLoading || !selectedAddressId}
              />

              {/* Explain why payment is disabled */}
              {!selectedAddressId && addresses.length > 0 && (
                <p
                  className={`
                    mt-3
                    text-center
                    text-xs

                    ${isDark ? "text-gray-500" : "text-gray-400"}
                  `}
                >
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
