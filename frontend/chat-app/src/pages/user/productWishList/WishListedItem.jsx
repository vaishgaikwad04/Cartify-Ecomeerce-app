
import { FaHeart } from "react-icons/fa";

import Card from "../../../components/ui/Card";
import { useWishlist } from "../../../hooks/user/useWishList";

const WishListedItem = () => {
  // ================= WISHLIST =================
  const {
    wishlist,
    isWishlisted,
    toggleWishlist,
    isDark,
  } = useWishlist();

  const itemCount = wishlist?.length || 0;

  return (
    <main
      className={`
        w-full
        min-h-screen
        transition-colors
        duration-300
        ${
          isDark
            ? "bg-gray-950 text-white"
            : "bg-white text-gray-900"
        }
      `}
    >
      {/* ================= INNER CONTAINER ================= */}
      <div
        className="
          w-full
          max-w-[1800px]
          mx-auto
          px-3
          py-7
          sm:px-4
          sm:py-9
          lg:px-6
          lg:py-10
        "
      >
        {/* ================= HEADER ================= */}
        <div className="mb-6 sm:mb-8">
          <h1
            className={`
              text-lg
              sm:text-xl
              lg:text-2xl
              font-semibold
              tracking-tight
              ${
                isDark
                  ? "text-gray-100"
                  : "text-gray-900"
              }
            `}
          >
            My Wishlist
          </h1>

          <p
            className={`
              mt-1
              text-xs
              sm:text-sm
              ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-500"
              }
            `}
          >
            {itemCount} {itemCount === 1 ? "item" : "items"} saved
          </p>
        </div>

        {/* ================= EMPTY WISHLIST ================= */}
        {itemCount === 0 ? (
          <div
            className="
              min-h-[320px]
              sm:min-h-[380px]
              flex
              flex-col
              items-center
              justify-center
              text-center
              px-4
            "
          >
            {/* HEART ICON */}
            <div
              className={`
                w-16
                h-16
                sm:w-20
                sm:h-20
                rounded-full
                flex
                items-center
                justify-center
                ${
                  isDark
                    ? "bg-gray-900"
                    : "bg-gray-50"
                }
              `}
            >
              <FaHeart
                className={`
                  text-2xl
                  sm:text-3xl
                  ${
                    isDark
                      ? "text-gray-700"
                      : "text-gray-300"
                  }
                `}
              />
            </div>

            {/* EMPTY TITLE */}
            <h2
              className={`
                mt-5
                text-base
                sm:text-lg
                font-semibold
                ${
                  isDark
                    ? "text-gray-100"
                    : "text-gray-800"
                }
              `}
            >
              Your wishlist is empty
            </h2>

            {/* EMPTY DESCRIPTION */}
            <p
              className={`
                mt-2
                max-w-xs
                text-xs
                sm:text-sm
                leading-relaxed
                ${
                  isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                }
              `}
            >
              Save your favourite products here
              and find them easily later.
            </p>
          </div>
        ) : (
          /* ================= WISHLIST PRODUCTS ================= */
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-3
              sm:gap-4
              lg:gap-5
            "
          >
            {wishlist.map((item) => {
              const product = item?.productId;

              if (!product) return null;

              return (
                <Card
                  key={item._id}
                  product={product}
                  isWishlisted={isWishlisted(product._id)}
                  onToggleWishlist={toggleWishlist}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default WishListedItem;
