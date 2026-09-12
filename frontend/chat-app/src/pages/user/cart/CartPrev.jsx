import { RxCross2 } from "react-icons/rx";
import Button from "../../../components/ui/Button";
import { useCartPrev } from "../../../hooks/user/useCartPrev";

const CartPrev = () => {
  // Get cart data and functions from the custom hook.
  const {
    cartData,
    handleIncrease,
    handleDecrease,
    handleRemove,
    totalPrice,
    isDark,
    navigate,
    coupons,
    selectedCoupon,
    finalAmount,
    discountAmount,
    handleSelectCoupon,
    handleCheckout,
  } = useCartPrev();

  return (
    // Main page container
    <div
      className={`
        min-h-screen
        w-full

        transition-colors
        duration-300

        ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}
      `}
    >
      {/* Main content container */}
      <div
        className="
          w-full
          max-w-[1800px]
          mx-auto

          px-4
          sm:px-6
          lg:px-8

          py-4
          sm:py-6
          lg:py-8
        "
      >
        {/* Page header */}
        <div
          className={`
            sticky
            top-0
            z-10

            -mx-4
            sm:-mx-6
            lg:mx-0

            px-4
            sm:px-6
            lg:px-6

            py-4
            sm:py-5

            border-b

            ${
              isDark
                ? "bg-gray-950/95 border-gray-800"
                : "bg-gray-50/95 border-gray-200"
            }

            backdrop-blur-md
          `}
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            {/* Cart title and item count */}
            <div className="min-w-0">
              <h2
                className="
                  text-lg
                  sm:text-xl
                  lg:text-2xl

                  font-semibold
                  truncate
                "
              >
                Shopping Cart
              </h2>

              <span
                className={`
                  block
                  mt-1

                  text-xs
                  sm:text-sm

                  ${isDark ? "text-gray-400" : "text-gray-500"}
                `}
              >
                {cartData.length} {cartData.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>
        </div>

        {/* Show empty cart or cart items */}
        {cartData.length === 0 ? (
          /* Empty cart */
          <div
            className="
              min-h-[60vh]

              flex
              flex-col
              items-center
              justify-center

              px-4
              text-center
            "
          >
            {/* Empty cart icon */}
            <div
              className={`
                w-20
                h-20

                sm:w-24
                sm:h-24

                rounded-full

                flex
                items-center
                justify-center

                text-4xl
                sm:text-5xl

                mb-5

                ${isDark ? "bg-gray-800" : "bg-gray-100"}
              `}
            >
              🛒
            </div>

            <h3
              className="
                text-lg
                sm:text-xl
                font-semibold
              "
            >
              Your cart is empty
            </h3>

            <p
              className={`
                mt-2

                text-sm
                sm:text-base

                max-w-sm

                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Looks like you haven't added any products yet.
            </p>

            {/* Go back to shopping */}
            <Button
              label="Continue Shopping"
              onClick={() => navigate("/")}
              variant={isDark ? "secondary" : "primary"}
              className="
                mt-6
                px-6
              "
            />
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div
              className="
                mt-4
                sm:mt-6

                space-y-3
                sm:space-y-4
              "
            >
              {/* Loop through all cart products */}
              {cartData.map((item) => (
                <div
                  key={item.productId}
                  className={`
                    w-full
                    min-w-0

                    rounded-xl
                    sm:rounded-2xl

                    border
                    shadow-sm

                    transition-colors

                    ${
                      isDark
                        ? "bg-gray-900 border-gray-800"
                        : "bg-white border-gray-100"
                    }
                  `}
                >
                  <div
                    className="
                      flex
                      gap-3
                      sm:gap-4

                      p-3
                      sm:p-4
                      lg:p-5
                    "
                  >
                    {/* Product image */}
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className={`
                        w-20
                        h-20

                        sm:w-24
                        sm:h-24

                        lg:w-28
                        lg:h-28

                        shrink-0

                        rounded-lg
                        sm:rounded-xl

                        object-cover

                        ${isDark ? "bg-gray-800" : "bg-gray-100"}
                      `}
                    />

                    {/* Product details */}
                    <div
                      className="
                        flex-1
                        min-w-0
                      "
                    >
                      {/* Product name and remove button */}
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-2
                        "
                      >
                        <h3
                          className="
                            min-w-0
                            flex-1

                            text-sm
                            sm:text-base
                            lg:text-lg

                            font-medium
                            leading-5
                            sm:leading-6

                            line-clamp-2
                          "
                        >
                          {item.productName}
                        </h3>

                        {/* Remove product */}
                        <button
                          type="button"
                          onClick={() =>
                            handleRemove(item.productId, item.size)
                          }
                          className={`
                            shrink-0

                            w-8
                            h-8

                            rounded-full

                            flex
                            items-center
                            justify-center

                            transition-colors

                            ${
                              isDark
                                ? "text-gray-400 hover:bg-gray-800 hover:text-red-400"
                                : "text-gray-500 hover:bg-gray-100 hover:text-red-500"
                            }
                          `}
                          aria-label="Remove product"
                        >
                          <RxCross2 />
                        </button>
                      </div>

                      {/* Product price */}
                      <p
                        className={`
                          mt-2

                          text-sm
                          sm:text-base
                          lg:text-lg

                          font-semibold

                          ${isDark ? "text-gray-200" : "text-gray-800"}
                        `}
                      >
                        ₹{item.productPrice}
                      </p>

                      {/* Quantity controls and item total */}
                      <div
                        className="
                          mt-3
                          sm:mt-4

                          flex
                          flex-wrap

                          items-center
                          justify-between

                          gap-3
                        "
                      >
                        {/* Quantity buttons */}
                        <div
                          className={`
                            flex
                            items-center

                            border
                            rounded-lg
                            overflow-hidden

                            ${isDark ? "border-gray-700" : "border-gray-300"}
                          `}
                        >
                          {/* Decrease quantity */}
                          <button
                            type="button"
                            onClick={() =>
                              handleDecrease(item.productId, item.size)
                            }
                            className={`
                              w-8
                              h-8

                              sm:w-9
                              sm:h-9

                              flex
                              items-center
                              justify-center

                              text-sm
                              sm:text-base

                              transition-colors

                              ${
                                isDark
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-gray-100"
                              }
                            `}
                          >
                            -
                          </button>

                          {/* Current quantity */}
                          <span
                            className="
                              w-8
                              sm:w-10

                              text-center

                              text-sm
                              sm:text-base
                            "
                          >
                            {item.quantity}
                          </span>

                          {/* Increase quantity */}
                          <button
                            type="button"
                            onClick={() =>
                              handleIncrease(item.productId, item.size)
                            }
                            className={`
                              w-8
                              h-8

                              sm:w-9
                              sm:h-9

                              flex
                              items-center
                              justify-center

                              text-sm
                              sm:text-base

                              transition-colors

                              ${
                                isDark
                                  ? "hover:bg-gray-800"
                                  : "hover:bg-gray-100"
                              }
                            `}
                          >
                            +
                          </button>
                        </div>

                        {/* Total price for this product */}
                        <span
                          className="
                            text-sm
                            sm:text-base

                            font-semibold

                            whitespace-nowrap
                          "
                        >
                          ₹{item.productPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Available coupons */}
            <div
              className={`
                w-full

                rounded-xl
                sm:rounded-2xl

                border

                p-4
                sm:p-5

                mt-5
                sm:mt-6

                ${
                  isDark
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }
              `}
            >
              <h3
                className="
                  text-sm
                  sm:text-base

                  font-semibold
                "
              >
                Available Offers
              </h3>

              {/* Show coupons if available */}
              {coupons.length > 0 ? (
                <div
                  className="
                    grid

                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3

                    gap-3

                    mt-4
                  "
                >
                  {/* Loop through available coupons */}
                  {coupons.map((coupon) => (
                    <div
                      key={coupon._id}
                      className={`
                        min-w-0

                        flex
                        items-center
                        justify-between

                        gap-3

                        rounded-lg

                        px-3
                        py-3

                        border

                        ${
                          isDark
                            ? "bg-gray-800 border-gray-700"
                            : "bg-gray-50 border-gray-200"
                        }
                      `}
                    >
                      {/* Coupon information */}
                      <div className="min-w-0 flex-1">
                        <span
                          className="
                            block

                            text-sm
                            font-semibold

                            truncate
                          "
                        >
                          {coupon.code}
                        </span>

                        <p
                          className={`
                            mt-0.5

                            text-xs

                            ${isDark ? "text-gray-400" : "text-gray-500"}
                          `}
                        >
                          {coupon.discount}% OFF
                        </p>
                      </div>

                      {/* Apply coupon */}
                      <button
                        type="button"
                        onClick={() => handleSelectCoupon(coupon.code)}
                        className={`
                          shrink-0

                          px-3
                          py-1.5

                          text-xs
                          font-medium

                          rounded-md

                          transition

                          ${
                            isDark
                              ? "bg-white text-black hover:bg-gray-200"
                              : "bg-black text-white hover:bg-gray-800"
                          }
                        `}
                      >
                        Apply
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                // Message shown when there are no active coupons.
                <p
                  className={`
                    mt-3
                    text-sm

                    ${isDark ? "text-gray-400" : "text-gray-500"}
                  `}
                >
                  No offers available right now.
                </p>
              )}
            </div>

            {/* Order summary */}
            <div
              className={`
                w-full

                rounded-xl
                sm:rounded-2xl

                border

                p-4
                sm:p-5

                mt-5
                sm:mt-6

                mb-6

                ${
                  isDark
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }
              `}
            >
              {/* Subtotal */}
              <div
                className="
                  flex
                  items-center
                  justify-between

                  gap-4

                  text-sm
                  sm:text-base
                "
              >
                <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                  Subtotal
                </span>

                <span className="whitespace-nowrap">₹{totalPrice}</span>
              </div>

              {/* Coupon discount */}
              {discountAmount > 0 && (
                <div
                  className="
                    flex
                    items-center
                    justify-between

                    gap-4

                    mt-3

                    text-sm

                    text-green-600
                  "
                >
                  <span>Coupon Discount</span>

                  <span className="whitespace-nowrap">-₹{discountAmount}</span>
                </div>
              )}

              {/* Divider */}
              <hr
                className={`
                  my-4

                  ${isDark ? "border-gray-700" : "border-gray-200"}
                `}
              />

              {/* Final total */}
              <div
                className="
                  flex
                  items-center
                  justify-between

                  gap-4

                  text-base
                  sm:text-lg

                  font-semibold
                "
              >
                <span>Total</span>

                <span className="whitespace-nowrap">₹{finalAmount}</span>
              </div>

              {/* Show applied coupon message */}
              {selectedCoupon && (
                <p
                  className="
                    mt-3

                    text-xs
                    sm:text-sm

                    text-green-600

                    break-words
                  "
                >
                  Coupon "{selectedCoupon}" applied successfully
                </p>
              )}

              {/* Proceed to checkout */}
              <Button
                className="
                  w-full

                  mt-5

                  h-11
                  sm:h-12

                  text-sm
                  sm:text-base
                "
                label="Proceed to Checkout"
                onClick={handleCheckout}
                variant={isDark ? "secondary" : "primary"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPrev;
