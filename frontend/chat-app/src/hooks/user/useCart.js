import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";

import { getCart, removeFromCart, updateCart } from "../../api/user/CartApi";

export const useCart = () => {
  // Store cart items.
  const [cartData, setCartData] = useState([]);

  // Fetch cart data from the backend.
  const fetchCart = useCallback(async () => {
    try {
      const res = await getCart();

      // Save cart items in state.
      setCartData(res?.data?.items || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Fetch cart when the hook loads.
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Increase product quantity.
  const handleIncrease = useCallback(
    async (id) => {
      // Update the UI immediately.
      setCartData((prev) =>
        prev.map((item) =>
          item.productId === id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );

      try {
        // Update quantity in the backend.
        await updateCart({
          productId: id,
          type: "increase",
        });
      } catch (error) {
        console.log(error);

        // Fetch the cart again if the update fails.
        fetchCart();
      }
    },
    [fetchCart],
  );

  // Decrease product quantity.
  const handleDecrease = useCallback(
    async (id) => {
      // Decrease only when quantity is greater than 1.
      setCartData((prev) =>
        prev.map((item) =>
          item.productId === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );

      try {
        // Update quantity in the backend.
        await updateCart({
          productId: id,
          type: "decrease",
        });
      } catch (error) {
        console.log(error);

        // Fetch the cart again if the update fails.
        fetchCart();
      }
    },
    [fetchCart],
  );

  // Remove a product from the cart.
  const handleRemove = useCallback(
    async (id) => {
      // Remove the product from the UI immediately.
      setCartData((prev) => prev.filter((item) => item.productId !== id));

      try {
        // Remove the product from the backend.
        await removeFromCart(id);
      } catch (error) {
        console.log(error);

        // Fetch the cart again if removing fails.
        fetchCart();
      }
    },
    [fetchCart],
  );

  // Calculate the total cart price.
  const totalPrice = useMemo(
    () =>
      cartData.reduce(
        (acc, item) => acc + item.productPrice * item.quantity,
        0,
      ),
    [cartData],
  );

  // Store the previous total price.
  const prev = useRef();

  // Update the previous total whenever totalPrice changes.
  useEffect(() => {
    prev.current = totalPrice;
  }, [totalPrice]);

  console.log("PREV:", prev.current);

  // Return cart data and functions to the component.
  return {
    cartData,
    handleIncrease,
    handleDecrease,
    handleRemove,
    totalPrice,
    fetchCart,
  };
};
