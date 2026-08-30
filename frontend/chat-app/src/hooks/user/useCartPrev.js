import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useContext,
  useCallback,
} from "react";
import { getCart, removeFromCart, updateCart } from "../../api/user/CartApi";
import { useNavigate } from "react-router-dom";
import { applyCoupon, getCoupons } from "../../api/user/CouponApi";
import { ThemeContext } from "../../context/ThemeContext";
import toast from "react-hot-toast";


export const useCartPrev = () => {
  // Provides navigation functionality for moving between pages.
  const navigate = useNavigate();

  // Get the current theme from ThemeContext.
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // Stores the products currently present in the user's cart.
  const [cartData, setCartData] = useState([]);

  // Stores all active coupons fetched from the backend.
  const [coupons, setCoupons] = useState([]);

  // Stores the coupon code selected by the user.
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Stores the amount deducted from the cart total after applying a coupon.
  const [discountAmount, setDiscountAmount] = useState(0);

  // Stores the final amount the user needs to pay after applying the discount.
  const [finalAmount, setFinalAmount] = useState(0);

  const fetchCart = useCallback(async () => {
    try {
      const res = await getCart();
      setCartData(res?.data?.items || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Increase the quantity of a specific product.
  const handleIncrease = useCallback(
    async (id) => {
      setCartData((prev) =>
        prev.map((item) =>
          item.productId === id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );

      try {
        // Update the product quantity in the backend.
        await updateCart({
          productId: id,
          type: "increase",
        });
      } catch (error) {
        console.log(error);
        fetchCart();
      }
    },
    [fetchCart],
  );

  // Decrease the quantity of a specific product.
  const handleDecrease = useCallback(
    async (id) => {
      // Quantity is only decreased when it is greater than 1.
      setCartData((prev) =>
        prev.map((item) =>
          item.productId === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );

      try {
        // Update the product quantity in the backend.
        await updateCart({
          productId: id,
          type: "decrease",
        });
      } catch (error) {
        console.log(error);
        fetchCart();
      }
    },
    [fetchCart],
  );

  // Remove a product completely from the cart.
  const handleRemove = useCallback(
    async (id) => {
      // Remove only the selected product from UI
      setCartData((prev) => prev.filter((item) => item.productId._id !== id));

      try {
        // Remove only the selected product from backend
        await removeFromCart(id);
      } catch (error) {
        console.log(error);

        // Restore cart from backend if API fails
        fetchCart();
      }
    },
    [fetchCart],
  );

  // Calculate the total price of all products in the cart.
  const totalPrice = useMemo(
    () =>
      cartData.reduce(
        (acc, item) => acc + item.productPrice * item.quantity,
        0,
      ),
    [cartData],
  );

  // Here it is used to keep track of the previous total price.
  const prev = useRef();

  // After this effect runs, prev.current contains the latest totalPrice.
  useEffect(() => {
    prev.current = totalPrice;
  }, [totalPrice]);

  // the cart total or discount amount changes.
  useEffect(() => {
    // Math.max prevents the final amount from becoming negative.
    setFinalAmount(Math.max(0, totalPrice - discountAmount));
  }, [totalPrice, discountAmount]);

  // Fetch available coupons from the backend.
  const fetchCouponsData = async () => {
    try {
      const res = await getCoupons();

      // Keep only coupons that are currently active.
      const activeCoupons =
        res?.data?.coupons?.filter((coupon) => coupon.isActive) || [];

      // Store active coupons in state.
      setCoupons(activeCoupons);
    } catch (error) {
      // Log the coupon API error for debugging.
      console.error("Coupon error:", error?.response?.data || error?.message);

      // Reset coupons to an empty array if the request fails.
      setCoupons([]);
    }
  };

  // Fetch coupons when the hook is first mounted.
  useEffect(() => {
    fetchCouponsData();
  }, []);

  // APPLY COUPON
  const handleSelectCoupon = async (code) => {
    try {
      // Send the coupon code and current cart total to the backend.
      const res = await applyCoupon({
        code,
        cartTotal: totalPrice,
      });
      const discount = res?.data?.discountAmount || 0;

      // Get the final amount returned by the backend.
      const total =
        res?.data?.finalAmount ?? Math.max(0, totalPrice - discount);
      // Store the selected coupon code.
      setSelectedCoupon(code);
      // Store the discount amount.
      setDiscountAmount(discount);
      // Store the final amount after applying the coupon.
      setFinalAmount(total);
    } catch (error) {
      // Log any error that occurs while applying the coupon.
      console.error(
        "Coupon apply error:",
        error?.response?.data || error?.message,
      );
    }
  };

  // CHECKOUT
 const handleCheckout = () => {
  if (!cartData || cartData.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

  toast.success("Proceeding to checkout!");
  navigate("/checkout");
};
  // Return
  return {
    cartData,
    handleIncrease,
    handleDecrease,
    handleRemove,
    totalPrice,
    fetchCart,
    isDark,
    navigate,
    coupons,
    selectedCoupon,
    finalAmount,
    discountAmount,
    fetchCouponsData,
    handleSelectCoupon,
    handleCheckout,
  };
};
