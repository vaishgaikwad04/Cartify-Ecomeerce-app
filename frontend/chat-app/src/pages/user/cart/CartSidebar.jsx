
import Button from "../../../components/ui/Button";
import { useCartSidebar } from "../../../hooks/user/useCartSidebar";
import { FiX } from "react-icons/fi";

const CartSidebar = ({ isOpen, onClose }) => {
  const {
    isDark,
    navigate,
    finalAmount,
    cartData,
    handleIncrease,
    handleDecrease,
    totalPrice,
  } = useCartSidebar();

  return (
    <div
      className={`
        h-full w-full max-w-full min-w-0
        overflow-x-hidden flex flex-col
        transition-colors duration-300
        ${isDark ? "bg-gray-950 text-white" : "bg-white text-gray-900"}
      `}
    >
      {/* HEADER */}
      <div
        className={`
          w-full min-w-0
          flex items-center justify-between gap-2
          px-3 sm:px-4
          py-3 sm:py-4
          border-b
          ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }
        `}
      >
        <h2 className="min-w-0 flex-1 truncate text-sm sm:text-base font-medium tracking-wide">
          Shopping Cart
          <span
            className={`
              ml-1 text-xs sm:text-sm
              uppercase tracking-wider
              ${isDark ? "text-gray-300" : "text-gray-800"}
            `}
          >
            ({cartData.length})
          </span>
        </h2>

        <button
          type="button"
          onClick={onClose}
          className={`
            w-7 h-7 sm:w-8 sm:h-8 shrink-0
            rounded-full flex items-center justify-center
            transition
            ${
              isDark
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }
          `}
          aria-label="Close cart"
        >
          <FiX className="text-sm" />
        </button>
      </div>

      {/* CART ITEMS */}
      <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden scrollbar-thin">
        {cartData.length === 0 ? (
          /* EMPTY CART */
          <div className="h-full w-full flex flex-col items-center justify-center px-4 text-center">
            <div
              className={`
                w-16 h-16 sm:w-20 sm:h-20
                rounded-full flex items-center justify-center
                text-2xl sm:text-3xl mb-3
                ${isDark ? "bg-gray-800" : "bg-gray-100"}
              `}
            >
              🛒
            </div>

            <h3 className="text-sm sm:text-base font-medium">
              Your cart is empty
            </h3>

            <p
              className={`
                text-xs sm:text-sm mt-2
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Add products to your shopping bag.
            </p>
          </div>
        ) : (
          /* CART ITEMS */
          cartData.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className={`
                w-full min-w-0
                flex gap-2 sm:gap-3
                p-3 sm:p-4
                border-b transition-colors
                ${
                  isDark
                    ? "border-gray-800 hover:bg-gray-900"
                    : "border-gray-100 hover:bg-gray-50"
                }
              `}
            >
              {/* PRODUCT IMAGE */}
              <img
                src={item.productImage}
                alt={item.productName}
                className="
                  w-16 h-16
                  sm:w-20 sm:h-20
                  shrink-0 object-cover rounded
                  bg-gray-100
                "
              />

              {/* PRODUCT DETAILS */}
              <div className="flex-1 min-w-0 max-w-full">
                {/* PRODUCT NAME */}
                <div className="w-full min-w-0 flex items-start justify-between gap-2">
                  <h3
                    className={`
                      min-w-0 flex-1
                      text-xs sm:text-sm
                      font-semibold leading-4 sm:leading-5
                      truncate
                      ${isDark ? "text-white" : "text-gray-900"}
                    `}
                  >
                    {item.productName}
                  </h3>
                </div>

                {/* PRODUCT PRICE */}
                <p
                  className={`
                    text-xs sm:text-sm font-semibold
                    mt-1.5 sm:mt-2
                    ${isDark ? "text-gray-400" : "text-gray-500"}
                  `}
                >
                  ₹{item.productPrice}
                </p>

                {/* QUANTITY + ITEM TOTAL */}
                <div className="w-full min-w-0 flex justify-between items-center gap-2 mt-2 sm:mt-3">
                  {/* QUANTITY */}
                  <div
                    className={`
                      flex items-center border rounded shrink-0
                      ${isDark ? "border-gray-700" : "border-gray-300"}
                    `}
                  >
                    <button
                      onClick={() =>
                        handleDecrease(item.productId, item.size)
                      }
                      className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>

                    <span className="w-6 sm:w-7 text-center text-xs">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleIncrease(item.productId, item.size)
                      }
                      className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-xs"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* ITEM TOTAL */}
                  <span className="min-w-0 text-xs sm:text-sm font-medium whitespace-nowrap">
                    ₹{item.productPrice * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      <div
        className={`
          w-full min-w-0 shrink-0
          border-t p-3 sm:p-4
          shadow-lg
          ${
            isDark
              ? "bg-gray-950 border-gray-800"
              : "bg-white border-gray-200"
          }
        `}
      >
        {/* SUMMARY */}
        <div
          className={`
            w-full min-w-0 rounded-lg
            p-3
            ${isDark ? "bg-gray-900" : "bg-gray-50"}
          `}
        >
          {/* SUBTOTAL */}
          <div className="flex justify-between gap-3 text-xs sm:text-sm mb-2">
            <span className={isDark ? "text-gray-400" : "text-gray-500"}>
              Subtotal
            </span>

            <span className="whitespace-nowrap">₹{totalPrice}</span>
          </div>

          {/* DIVIDER */}
          <div
            className={`
              border-t my-2
              ${isDark ? "border-gray-700" : "border-gray-200"}
            `}
          />

          {/* TOTAL */}
          <div className="flex justify-between gap-3 font-semibold text-sm sm:text-base">
            <span>Total</span>
            <span className="whitespace-nowrap">₹{finalAmount}</span>
          </div>
        </div>

        {/* VIEW CART BUTTON */}
        <Button
          onClick={() => navigate("/cart")}
          label="View Cart"
          variant={isDark ? "secondary" : "primary"}
          className="
            w-full mt-3
            text-xs sm:text-sm
            h-9 sm:h-10
          "
        />
      </div>
    </div>
  );
};

export default CartSidebar;
