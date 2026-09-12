import React, { useContext } from "react";
import Carousel from "./ImageCarousel";
import WishlistButton from "./WishListButton";
import { ThemeContext } from "../../context/ThemeContext";


const Card = ({ product, isWishlisted, onToggleWishlist }) => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  return (
    <div
      className={`
        w-full
        rounded-xl
        overflow-hidden
        transition-all
        duration-300

        ${
          isDark
            ? `
              bg-gray-900
              border
              border-gray-800
              hover:border-gray-700
              hover:shadow-2xl
              `
            : `
              bg-white
              border
              border-gray-200
              hover:border-gray-300
              hover:shadow-lg
              `
        }
      `}
    >
      {/* Product Images */}
    
     
      <div className="relative">
        
        <Carousel
          product={product}
          images={product.images}
        />
        

        <div className="absolute top-4 right-4 z-10">
          <WishlistButton
            productId={product._id}
            isWishlisted={isWishlisted}
            onToggleWishlist={onToggleWishlist}
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 text-center">
        <h2
          className={`
            text-lg
            font-semibold
            mb-2
            transition-colors

            ${
              isDark
                ? "text-white"
                : "text-gray-900"
            }
          `}
        >
          {product.name}
        </h2>

        <p
          className={`
            text-sm
            mb-4

            ${
              isDark
                ? "text-gray-400"
                : "text-gray-500"
            }
          `}
        >
          {product.brand}
        </p>

        <div className="flex items-center justify-center gap-3">
          <del
            className={`
              text-sm

              ${
                isDark
                  ? "text-gray-500"
                  : "text-gray-400"
              }
            `}
          >
            ₹{product.price}
          </del>

          <span
            className={`
              text-xl
              font-bold

              ${
                isDark
                  ? "text-white"
                  : "text-gray-900"
              }
            `}
          >
            ₹{product.discountPrice}
          </span>
        </div>
      </div>
     
    </div>
  );
};

export default React.memo(Card);