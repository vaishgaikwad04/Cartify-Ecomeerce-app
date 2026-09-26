import { useEffect, useState, useContext } from "react";

// API
import {
  fetchWishListedItem,
  createWishList,
  removeWishListedItem,
} from "../../api/user/WishListedItemApi";

// Context
import { ThemeContext } from "../../context/ThemeContext";

export const useWishlist = () => {
  // ================= WISHLIST STATE =================
  const [wishlist, setWishlist] = useState([]);

  // ================= THEME =================
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // ================= CHECK IF WISHLISTED =================
  const isWishlisted = (productId) => {
    return wishlist.some(
      (item) =>
        String(item.productId?._id || item.productId) ===
        String(productId)
    );
  };

  // ================= LOAD WISHLIST =================
  const loadWishlist = async () => {
    try {
      const res = await fetchWishListedItem();

      setWishlist(res?.data?.wishlistedItems || []);
    } catch (err) {
      console.log("Failed to load wishlist:", err);
    }
  };

  // ================= TOGGLE WISHLIST =================
  const toggleWishlist = async (productId) => {
    try {
      // Check current state directly from wishlist
      const alreadyWishlisted = isWishlisted(productId);

      // ================= REMOVE =================
      if (alreadyWishlisted) {
        const item = wishlist.find(
          (w) =>
            String(w.productId?._id || w.productId) ===
            String(productId)
        );

        if (item) {
          await removeWishListedItem(item._id);

          setWishlist((prev) =>
            prev.filter((w) => w._id !== item._id)
          );
        }

        return;
      }

      // ================= ADD =================
      await createWishList(productId);

      // Refresh wishlist after adding
      await loadWishlist();
    } catch (err) {
      console.log("Wishlist toggle failed:", err);
    }
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    loadWishlist();
  }, []);

  // ================= RETURN =================
  return {
    wishlist,
    isWishlisted,
    toggleWishlist,
    reloadWishlist: loadWishlist,
    isDark,
  };
};