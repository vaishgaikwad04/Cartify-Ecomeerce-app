import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";

export const useCartSidebar = () => {
  // NAVIGATION
  const navigate = useNavigate();

  // THEME
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // CART CONTEXT
  const {
    cartData,
    handleIncrease,
    handleDecrease,
    handleRemove,
    totalPrice,
    fetchCart,
  } = useCart();

 
  // RETURN
  return {
    // Theme
    isDark,
    // Navigation
    navigate,

    // Cart
    cartData,
    handleIncrease,
    handleDecrease,
    handleRemove,
    totalPrice,
    fetchCart,
  };
};
