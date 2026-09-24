
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

  // ============================================
  // CART CONTEXT
  // ============================================

  const {
    cartData,
    handleIncrease,
    handleDecrease,
    handleRemove,
    totalPrice,
    fetchCart,
  } = useCart();

  // ============================================
  // FETCH CART WHEN CART PAGE OPENS
  // ============================================

  useEffect(() => {
    fetchCart();
  }, []);

  // ============================================
  // COUPON STATES
  // ============================================

  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  // ============================================
  // CALCULATE FINAL AMOUNT
  // ============================================

  useEffect(() => {
    setFinalAmount(
      Math.max(0, totalPrice - discountAmount)
    );
  }, [totalPrice, discountAmount]);

  // ============================================
  // FETCH AVAILABLE COUPONS
  // ============================================

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

  // ============================================
  // APPLY COUPON
  // ============================================

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

      toast.success("Coupon applied successfully");
    } catch (error) {
      console.error(
        "Coupon apply error:",
        error?.response?.data || error?.message
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to apply coupon"
      );
    }
  };

  // ============================================
  // CHECKOUT
  // ============================================

  const handleCheckout = () => {
    if (!cartData || cartData.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    toast.success("Proceeding to checkout!");

    navigate("/checkout");
  };

  // ============================================
  // RETURN
  // ============================================

  return {
    // Cart
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
