import React, { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const WishlistButton = ({
  productId,
  isWishlisted,
  onToggleWishlist = () => {},
}) => {
  const { user, authLoading } = useContext(AuthContext);

  const handleClick = (e) => {
    e.stopPropagation();

    // Don't do anything while authentication is being checked
    if (authLoading) return;

    // User is not logged in
    if (!user) {
      toast.error("Please login to add items to your wishlist.");
      return;
    }

    // User is logged in → toggle wishlist
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
      <span className="transition-transform duration-200 group-hover:scale-110">
        {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </span>

      {isWishlisted && (
        <span className="absolute inset-0 rounded-full bg-red-200 opacity-30 animate-ping" />
      )}
    </button>
  );
};

export default WishlistButton;
