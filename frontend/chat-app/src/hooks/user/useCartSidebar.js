import { useNavigate } from "react-router-dom";
import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from "react";

import {
  getCart,
  removeFromCart,
  updateCart,
} from "../../api/user/CartApi";

import { applyCoupon, getCoupons } from "../../api/user/CouponApi";
import { ThemeContext } from "../../context/ThemeContext";

export const useCartSidebar = ({isOpen}) => {
  // Used to navigate to different pages.
  const navigate = useNavigate();

  // Get the current theme.
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // Store cart products.
  const [cartData, setCartData] = useState([]);

  // Store available coupons.
  const [coupons, setCoupons] = useState([]);

  // Store the selected coupon.
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Store the discount amount.
  const [discountAmount, setDiscountAmount] = useState(0);

  // Store the final amount after discount.
  const [finalAmount, setFinalAmount] = useState(0);

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
  if (isOpen) {
    fetchCart();
  }
}, [isOpen, fetchCart]);

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

        // Reload cart if the update fails.
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

        // Reload cart if the update fails.
        fetchCart();
      }
    },
    [fetchCart],
  );

  // Remove a product from the cart.
  const handleRemove = useCallback(
    async (id) => {
      // Remove the product from the UI immediately.
      setCartData((prev) =>
        prev.filter((item) => item.productId !== id),
      );

      try {
        // Remove the product from the backend.
        await removeFromCart(id);
      } catch (error) {
        console.log(error);

        // Reload cart if removing fails.
        fetchCart();
      }
    },
    [fetchCart],
  );

  // Calculate the total price of all cart items.
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

  // Reset final amount when cart total changes.
  useEffect(() => {
    setFinalAmount(totalPrice);
  }, [totalPrice]);

  // Fetch available coupons.
  const fetchCouponsData = async () => {
    try {
      const res = await getCoupons();

      // Keep only active coupons.
      setCoupons(
        res.data.coupons.filter((coupon) => coupon.isActive),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch coupons when the hook loads.
  useEffect(() => {
    fetchCouponsData();
  }, []);

  // Apply a selected coupon.
  const handleSelectCoupon = async (code) => {
    try {
      // Send coupon code and cart total to backend.
      const res = await applyCoupon({
        code,
        cartTotal: totalPrice,
      });

      // Save coupon information.
      setSelectedCoupon(code);
      setDiscountAmount(res.data.discountAmount);
      setFinalAmount(res.data.finalAmount);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // Return data and functions to the component.
  return {
    isDark,
    navigate,
    handleSelectCoupon,
    fetchCouponsData,
    coupons,
    selectedCoupon,
    discountAmount,
    finalAmount,
    cartData,
    handleIncrease,
    handleDecrease,
    handleRemove,
    totalPrice,
  };
};