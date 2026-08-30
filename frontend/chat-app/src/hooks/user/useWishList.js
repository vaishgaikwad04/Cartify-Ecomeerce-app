import { useEffect, useState , useContext} from "react";
import {
  fetchWishListedItem,
  createWishList,
  removeWishListedItem,
} from "../../api/user/WishListedItemApi";
import { ThemeContext } from "../../context/ThemeContext";

export const useWishlist = () => {
  ///state to store wishlist item
  const [wishlist, setWishlist] = useState([]);
  //theme
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

    // CHECK IF WISHLISTED
  const isWishlisted = (productId) =>
    wishlist.some(
      (item) =>
        String(item.productId?._id || item.productId) === String(productId)
    );

  // TOGGLE
  const toggleWishlist = async (productId, isWishlisted) => {
    try {
      if (isWishlisted) {
        const item = wishlist.find(
          (w) =>
            String(w.productId?._id || w.productId) === String(productId)
        );

        if (item) {
          await removeWishListedItem(item._id);

          setWishlist((prev) =>
            prev.filter((w) => w._id !== item._id)
          );
        }
      } else {
        await createWishList(productId);

        // optional: re-fetch or optimistic add
        loadWishlist();
      }
    } catch (err) {
      console.log(err);
    }
  };

  ///fetch wishlist item
  const loadWishlist = async () => {
    try {
      const res = await fetchWishListedItem();
      setWishlist(res?.data?.wishlistedItems || []);
    } catch (err) {
      console.log(err);
    }
  };

  
  // LOAD WISHLIST
  useEffect(() => {
    loadWishlist();
  }, []);

  

  return {
    wishlist,
    isWishlisted,
    toggleWishlist,
    reloadWishlist: loadWishlist,
    isDark
  };
};