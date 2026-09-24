import React, { useContext } from "react";
import Carousel from "./ImageCarousel";
import WishlistButton from "./WishListButton";
import { ThemeContext } from "../../context/ThemeContext";

const Card = ({
  product,
  isWishlisted,
  onToggleWishlist,
}) => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  return (
    <div
      className={`
        group
        w-full
        min-w-0
        overflow-hidden

        rounded
        sm:rounded-md
        md:rounded-lg

        border

        transition-all
        duration-300

        ${
          isDark
            ? `
              bg-gray-900
              border-gray-800
              hover:border-gray-700
              hover:shadow-md
            `
            : `
              bg-white
              border-gray-200
              hover:border-gray-300
              hover:shadow-sm
            `
        }
      `}
    >
      {/* ================= PRODUCT IMAGE ================= */}
      <div className="relative w-full min-w-0">
        <Carousel
          product={product}
          images={product?.images || []}
        />

        {/* ================= WISHLIST ================= */}
        <div
          className="
            absolute
            top-1
            right-1
            sm:top-1
            sm:right-1
            md:top-1.5
            md:right-1.5
            lg:top-2
            lg:right-2
            z-20
          "
        >
          <WishlistButton
            productId={product._id}
            isWishlisted={isWishlisted}
            onToggleWishlist={onToggleWishlist}
          />
        </div>
      </div>

      {/* ================= PRODUCT DETAILS ================= */}
      <div
        className="
          w-full
          min-w-0
          text-center

          px-1
          py-1.5

          sm:px-1.5
          sm:py-2

          md:px-2
          md:py-2.5

          lg:px-3
          lg:py-3

          xl:px-3
          xl:py-3.5
        "
      >
        {/* Product Name */}
        <h2
          className={`
            text-[8px]
            sm:text-[9px]
            md:text-[11px]
            lg:text-xs
            xl:text-sm

            font-semibold
            leading-tight

            line-clamp-2

            min-h-[1.25rem]
            sm:min-h-[1.4rem]
            md:min-h-[1.7rem]

            mb-0.5
            sm:mb-1

            ${
              isDark
                ? "text-white"
                : "text-gray-900"
            }
          `}
        >
          {product?.name}
        </h2>

        {/* Brand */}
        <p
          className={`
            text-[7px]
            sm:text-[8px]
            md:text-[9px]
            lg:text-[10px]
            xl:text-[11px]

            leading-tight
            truncate

            mb-1
            sm:mb-1.5
            md:mb-2

            ${
              isDark
                ? "text-gray-400"
                : "text-gray-500"
            }
          `}
        >
          {product?.brand}
        </p>

        {/* ================= PRICE ================= */}
        <div
          className="
            flex
            items-center
            justify-center
            gap-0.5
            sm:gap-1
            md:gap-1.5
            lg:gap-2

            whitespace-nowrap
          "
        >
          {/* Original price */}
          <del
            className={`
              text-[7px]
              sm:text-[8px]
              md:text-[9px]
              lg:text-[10px]
              xl:text-[11px]

              ${
                isDark
                  ? "text-gray-500"
                  : "text-gray-400"
              }
            `}
          >
            ₹{product?.price}
          </del>

          {/* Discount price */}
          <span
            className={`
              text-[8px]
              sm:text-[9px]
              md:text-[10px]
              lg:text-xs
              xl:text-sm

              font-bold

              ${
                isDark
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            ₹{product?.discountPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);