import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCart,
  removeFromCart,
  updateCart,
} from "../api/user/CartApi";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Store all cart items.
  const [cartData, setCartData] = useState([]);

  // Store cart loading state.
  const [cartLoading, setCartLoading] = useState(false);

  // ==========================================
  // GET PRODUCT ID
  // ==========================================

  // Handles both:
  // productId: "123"
  // productId: { _id: "123" }
  const getProductId = (item) => {
    if (typeof item === "object" && item !== null) {
      return item._id || item.productId?._id || item.productId;
    }

    return item;
  };

  // ==========================================
  // FETCH CART
  // ==========================================

  const fetchCart = useCallback(async () => {
    try {
      setCartLoading(true);

      const res = await getCart();
      setCartData(res?.data?.items || []);
    } catch (error) {
      console.error(
        "Fetch cart error:",
        error?.response?.data || error?.message
      );
    } finally {
      setCartLoading(false);
    }
  }, []);

  // Fetch cart when provider loads.
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const handleIncrease = useCallback(
    async (productId, size) => {
      // Optimistically update UI.
      setCartData((prev) =>
        prev.map((item) => {
          const itemProductId = getProductId(item.productId);

          const sameProduct =
            itemProductId === productId;

          const sameSize =
            item.size === size;

          if (sameProduct && sameSize) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        })
      );

      try {
        await updateCart({
          productId,
          size,
          type: "increase",
        });
      } catch (error) {
        console.error(
          "Increase cart error:",
          error?.response?.data || error?.message
        );

        // Restore correct backend data.
        await fetchCart();
      }
    },
    [fetchCart]
  );

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const handleDecrease = useCallback(
    async (productId, size) => {
      // Find current item.
      const currentItem = cartData.find((item) => {
        const itemProductId = getProductId(item.productId);

        return (
          itemProductId === productId &&
          item.size === size
        );
      });

      if (!currentItem) return;

      // ========================================
      // QUANTITY = 1
      // REMOVE ITEM
      // ========================================

      if (currentItem.quantity === 1) {
        // Remove immediately from UI.
        setCartData((prev) =>
          prev.filter((item) => {
            const itemProductId =
              getProductId(item.productId);

            return !(
              itemProductId === productId &&
              item.size === size
            );
          })
        );

        try {
          await removeFromCart(productId, size);
        } catch (error) {
          console.error(
            "Remove cart error:",
            error?.response?.data || error?.message
          );

          // Restore cart if API fails.
          await fetchCart();
        }

        return;
      }

      // ========================================
      // QUANTITY > 1
      // DECREASE
      // ========================================

      setCartData((prev) =>
        prev.map((item) => {
          const itemProductId = getProductId(item.productId);

          const sameProduct =
            itemProductId === productId;

          const sameSize =
            item.size === size;

          if (sameProduct && sameSize) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        })
      );

      try {
        await updateCart({
          productId,
          size,
          type: "decrease",
        });
      } catch (error) {
        console.error(
          "Decrease cart error:",
          error?.response?.data || error?.message
        );

        // Restore correct backend data.
        await fetchCart();
      }
    },
    [cartData, fetchCart]
  );

  // ==========================================
  // REMOVE ITEM
  // ==========================================

  const handleRemove = useCallback(
    async (productId, size) => {
      // Remove exact product + size from UI.
      setCartData((prev) =>
        prev.filter((item) => {
          const itemProductId =
            getProductId(item.productId);

          return !(
            itemProductId === productId &&
            item.size === size
          );
        })
      );

      try {
        await removeFromCart(productId, size);
      } catch (error) {
        console.error(
          "Remove cart error:",
          error?.response?.data || error?.message
        );

        // Restore backend data if request fails.
        await fetchCart();
      }
    },
    [fetchCart]
  );

  // ==========================================
  // TOTAL PRICE
  // ==========================================

  const totalPrice = useMemo(() => {
    return cartData.reduce(
      (total, item) =>
        total +
        Number(item.productPrice || 0) *
          Number(item.quantity || 0),
      0
    );
  }, [cartData]);

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    cartData,
    setCartData,

    cartLoading,

    fetchCart,

    handleIncrease,
    handleDecrease,
    handleRemove,

    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// ==========================================
// CUSTOM HOOK
// ==========================================

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};