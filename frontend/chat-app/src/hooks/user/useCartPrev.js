import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import { useNavigate } from "react-router-dom";

import { applyCoupon, getCoupons } from "../../api/user/CouponApi";

import { ThemeContext } from "../../context/ThemeContext";

import { useCart } from "../../context/CartContext";

import toast from "react-hot-toast";

export const useCartPrev = () => {
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // Get cart data and cart functions from CartContext
  const {
    cartData,
    handleIncrease,
    handleDecrease,
    handleRemove,
    totalPrice,
    fetchCart,
  } = useCart();

  // Coupon states
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  // Calculate final amount
  useEffect(() => {
    setFinalAmount(
      Math.max(0, totalPrice - discountAmount)
    );
  }, [totalPrice, discountAmount]);

  // Fetch available coupons
  const fetchCouponsData = async () => {
    try {
      const res = await getCoupons();

      const activeCoupons =
        res?.data?.coupons?.filter(
          (coupon) => coupon.isActive
        ) || [];

      setCoupons(activeCoupons);
    } catch (error) {
      console.error(
        "Coupon error:",
        error?.response?.data || error?.message
      );

      setCoupons([]);
    }
  };

  useEffect(() => {
    fetchCouponsData();
  }, []);

  // Apply coupon
  const handleSelectCoupon = async (code) => {
    try {
      const res = await applyCoupon({
        code,
        cartTotal: totalPrice,
      });

      const discount =
        res?.data?.discountAmount || 0;

      const total =
        res?.data?.finalAmount ??
        Math.max(0, totalPrice - discount);

      setSelectedCoupon(code);
      setDiscountAmount(discount);
      setFinalAmount(total);
    } catch (error) {
      console.error(
        "Coupon apply error:",
        error?.response?.data || error?.message
      );
    }
  };

  // Checkout
  const handleCheckout = () => {
    if (!cartData || cartData.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    toast.success("Proceeding to checkout!");

    navigate("/checkout");
  };

  return {
    // Cart Context
    cartData,
    handleIncrease,
    handleDecrease,
    handleRemove,
    totalPrice,
    fetchCart,

    // Theme
    isDark,

    // Navigation
    navigate,

    // Coupons
    coupons,
    selectedCoupon,
    finalAmount,
    discountAmount,
    fetchCouponsData,
    handleSelectCoupon,

    // Checkout
    handleCheckout,
  };
};