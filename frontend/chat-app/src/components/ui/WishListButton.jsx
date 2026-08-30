import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const WishlistButton = ({ productId, isWishlisted, onToggleWishlist = () => {},}) => {
  const handleClick = (e) => {
    e.stopPropagation();

   onToggleWishlist(productId, isWishlisted);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle Wishlist"
      className={`
        relative
        flex items-center justify-center
        w-10 h-10
        rounded-full
        transition-all duration-200 ease-in-out
        shadow-sm
        hover:shadow-md
        hover:scale-110
        active:scale-95
        group
        ${
          isWishlisted
            ? "bg-red-50 text-red-500"
            : "bg-white text-gray-500 hover:text-red-500"
        }
      `}
    >
      {/* Icon with smooth transition */}
      <span className="transition-transform duration-200 group-hover:scale-110">
        {isWishlisted ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart />
        )}
      </span>

      {/* subtle pulse effect when wishlisted */}
      {isWishlisted && (
        <span className="absolute inset-0 rounded-full bg-red-200 opacity-30 animate-ping" />
      )}
    </button>
  );
};

export default WishlistButton;