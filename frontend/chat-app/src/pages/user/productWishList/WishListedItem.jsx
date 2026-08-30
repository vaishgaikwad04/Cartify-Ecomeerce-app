
import { FaHeart } from "react-icons/fa";

import Card from "../../../components/ui/Card";
import { useWishlist } from "../../../hooks/user/useWishList";


const WishListedItem = () => {

  // WISHLIST
  const {
    wishlist,
    isWishlisted,
    toggleWishlist,
    isDark,
  } = useWishlist();


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
            : "bg-gray-50 text-gray-900"
        }
      `}
    >
      {/*INNER CONTAINER*/}
      <div
        className={`
          w-full
          max-w-[1800px]
          mx-auto

          px-4
          py-8

          sm:px-6
          sm:py-10

          lg:px-8
          lg:py-12
        `}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h1
            className={`
              text-2xl
              sm:text-3xl
              font-semibold
              tracking-tight

              ${
                isDark
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            My Wishlist
          </h1>

          <p
            className={`
              mt-2
              text-sm
              sm:text-base

              ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-500"
              }
            `}
          >
            {wishlist.length}{" "}
            {wishlist.length === 1
              ? "item"
              : "items"}
          </p>
        </div>

        {/* =================================================
            EMPTY WISHLIST
        ================================================= */}

        {wishlist.length === 0 ? (
          <div
            className="
              min-h-[400px]
              flex
              flex-col
              items-center
              justify-center
              text-center
              px-4
            "
          >
            {/* HEART */}

            <div
              className={`
                w-20
                h-20
                rounded-full

                flex
                items-center
                justify-center

                ${
                  isDark
                    ? "bg-gray-900"
                    : "bg-white"
                }
              `}
            >
              <FaHeart
                size={34}
                className={
                  isDark
                    ? "text-gray-700"
                    : "text-gray-300"
                }
              />
            </div>

            {/* TITLE */}

            <h2
              className={`
                mt-6
                text-lg
                sm:text-xl
                font-semibold

                ${
                  isDark
                    ? "text-white"
                    : "text-gray-800"
                }
              `}
            >
              Your wishlist is empty
            </h2>

            {/* DESCRIPTION */}

            <p
              className={`
                mt-2
                max-w-sm
                text-sm
                sm:text-base

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
          /* =================================================
             WISHLIST PRODUCTS
          ================================================= */

          <div
            className="
              grid

              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4

              gap-5
              sm:gap-6
              lg:gap-7
            "
          >
            {wishlist.map((item) => {
              // ===========================================
              // PRODUCT
              // ===========================================

              const product = item?.productId;

              // If product data is unavailable,
              // don't render the card.

              if (!product) {
                return null;
              }

              // ===========================================
              // PRODUCT CARD
              // ===========================================

              return (
                <Card
                  key={item._id}
                  product={product}
                  isWishlisted={isWishlisted(
                    product._id
                  )}
                  onToggleWishlist={
                    toggleWishlist
                  }
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