
import Button from "../../../components/ui/Button";
import { useCartSidebar } from "../../../hooks/user/useCartSidebar";

const CartSidebar = ({ isOpen }) => {
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
        h-full
        w-full
        max-w-full
        min-w-0
        overflow-x-hidden
        flex
        flex-col
        transition-colors
        duration-300
        ${isDark ? "bg-gray-950 text-white" : "bg-white text-gray-900"}
      `}
    >
      {/*HEADER */}
      <div
        className={`
          w-full
          min-w-0

          flex
          items-center
          justify-between
          gap-3

          px-4
          sm:px-6

          py-4
          sm:py-5

          border-b

          ${
            isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }
        `}
      >
        {/* TITLE */}

        <h2
          className="
            min-w-0
            flex-1
            truncate

            text-lg
            sm:text-xl

            font-medium
            tracking-wide
          "
        >
          Shopping Cart
          <span
            className={`
              ml-1
              sm:ml-2

              text-sm
              sm:text-lg

              uppercase
              tracking-widest

              ${isDark ? "text-gray-300" : "text-gray-800"}
            `}
          >
            ({cartData.length})
          </span>
        </h2>
      </div>

      {/*CART ITEMS */}
      <div
        className="
          flex-1
          min-w-0

          overflow-y-auto
          overflow-x-hidden

          scrollbar-thin
        "
      >
        {cartData.length === 0 ? (
          /* =================================================
             EMPTY CART
          ================================================= */

          <div
            className="
              h-full
              w-full

              flex
              flex-col
              items-center
              justify-center

              px-4
              sm:px-6

              text-center
            "
          >
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

                text-3xl
                sm:text-4xl

                mb-4

                ${isDark ? "bg-gray-800" : "bg-gray-100"}
              `}
            >
              🛒
            </div>

            <h3 className="text-base sm:text-lg font-medium">
              Your cart is empty
            </h3>

            <p
              className={`
                text-sm
                mt-2
                text-center

                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Add products to your shopping bag.
            </p>
          </div>
        ) : (
          /* =================================================
             CART ITEMS
          ================================================= */

          cartData.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className={`
                w-full
                min-w-0

                flex
                gap-3
                sm:gap-4

                p-4
                sm:p-5

                border-b

                transition-colors

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
                  w-20
                  h-20

                  sm:w-24
                  sm:h-24

                  shrink-0

                  object-cover
                  rounded

                  bg-gray-100
                "
              />

              {/* PRODUCT DETAILS */}

              <div
                className="
                  flex-1
                  min-w-0
                  max-w-full
                "
              >
                {/* PRODUCT NAME + REMOVE */}

                <div
                  className="
                    w-full
                    min-w-0

                    flex
                    items-start
                    justify-between
                    gap-2
                  "
                >
                  <h3
                    className={`
                      min-w-0
                      flex-1

                      text-sm
                      font-semibold
                      leading-5

                      truncate

                      ${isDark ? "text-white" : "text-gray-900"}
                    `}
                  >
                    {item.productName}
                  </h3>

                  {/*<button
                    onClick={() => handleRemove(item.productId)}
                    className={`
                      shrink-0

                      ${isDark ? "text-gray-400" : "text-gray-500"}

                      hover:text-red-500

                      transition-colors
                    `}
                  >
                    <RxCross2 />
                  </button>*/}
                </div>

                {/* PRODUCT PRICE */}

                <p
                  className={`
                    text-sm
                    font-semibold

                    mt-2
                    sm:mt-3

                    ${isDark ? "text-gray-400" : "text-gray-500"}
                  `}
                >
                  ₹{item.productPrice}
                </p>

                {/* QUANTITY + ITEM TOTAL */}

                <div
                  className="
                    w-full
                    min-w-0

                    flex
                    justify-between
                    items-center

                    gap-2

                    mt-3
                    sm:mt-4
                  "
                >
                  {/* QUANTITY */}

                  <div
                    className={`
                      flex
                      items-center

                      border
                      rounded

                      shrink-0

                      ${isDark ? "border-gray-700" : "border-gray-300"}
                    `}
                  >
                    <button
                      onClick={() => handleDecrease(item.productId, item.size)}
                      className="
                        w-7
                        h-7

                        sm:w-8
                        sm:h-8

                        flex
                        items-center
                        justify-center
                      "
                    >
                      -
                    </button>

                    <span
                      className="
                        w-7
                        sm:w-8

                        text-center
                        text-sm
                      "
                    >
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleIncrease(item.productId, item.size)}
                      className="
                        w-7
                        h-7

                        sm:w-8
                        sm:h-8

                        flex
                        items-center
                        justify-center
                      "
                    >
                      +
                    </button>
                  </div>

                  {/* ITEM TOTAL */}

                  <span
                    className="
                      min-w-0
                      text-sm
                      font-medium
                      whitespace-nowrap
                    "
                  >
                    ₹{item.productPrice * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    
      {/* FOOTER*/}
      <div
        className={`
          w-full
          min-w-0
          shrink-0
          border-t
          p-4
          sm:p-5
          shadow-lg
          ${isDark ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"}
        `}
      >
        {/* SUMMARY */}
        <div
          className={`
            w-full
            min-w-0
            rounded-xl
            p-3
            sm:p-4
            ${isDark ? "bg-gray-900" : "bg-gray-50"}
          `}
        >
          {/* SUBTOTAL */}

          <div
            className="
              flex
              justify-between
              gap-3
              text-sm
              mb-2
            "
          >
            <span className={isDark ? "text-gray-400" : "text-gray-500"}>
              Subtotal
            </span>

            <span className="whitespace-nowrap">₹{totalPrice}</span>
          </div>

    
          {/* DIVIDER */}
          <div
            className={`
              border-t
              my-3
              ${isDark ? "border-gray-700" : "border-gray-200"}
            `}
          />

          {/* TOTAL */}
          <div
            className="
              flex
              justify-between
              gap-3
              font-semibold
              text-base
              sm:text-lg
            "
          >
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
            w-full

            mt-4

            text-base
            sm:text-lg

            h-11
            sm:h-12
          "
        />
      </div>
    </div>
  );
};

export default CartSidebar;
